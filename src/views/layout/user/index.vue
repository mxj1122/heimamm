<template>
  <div id="user">
    <!-- 头部 -->
    <el-card shadow="hover">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="userFormRef">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formInline.username" placeholder="根据姓名查询"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email" placeholder="根据邮箱查询"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="removeIfo">清除</el-button>
          <el-button type="primary" @click="add">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card shadow="hover" style="margin-top:20px">
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="role" label="角色" width="180"></el-table-column>
        <el-table-column prop="remake" label="备注" width="180"></el-table-column>
        <!-- 作用域插槽 -->
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0" style="color:red">禁用</span>
            <span v-if="scope.row.status===1" style="color:green">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status===0?'success':'info'"
            >{{scope.row.status===0?'启用':'禁用'}}</el-button>
            <el-button type="danger" @click="removeUser(scope.row.id,scope.row.username)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px;text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 15]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <useredit ref="userEdigRef"></useredit>
  </div>
</template>
<script>
import useredit from "./user-del-edig.vue";
export default {
  name: "user",
  components: {
    useredit
  },
  data() {
    return {
      formInline: {
        username: "",
        email: "",
        role_id: ""
      },
      page: 1, //第几页
      limit: 5, //总共多少页
      userList: [], //用户数据列表
      total: 0 //分页总条数
    };
  },
  created() {
    this.getUserFormData();
  },
  methods: {
    // 获取用户列表信息
    async getUserFormData() {
      const res = await this.$axios("/user/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.formInline
        }
      });
      if (res.data.code === 200) {
        this.userList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    search() {
      this.page = 1; //必须加载第一页，如果获取的用户信息只有一页，加载其页没有信息
      this.getUserFormData();
    },
    // 每页多少条事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      // 渲染第一页 调用sharch
      this.search();
    },
    // 加载第几页事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      // 不是渲染第一页 调用getUserFormData
      this.getUserFormData();
    },
    // 清空按钮事件
    removeIfo() {
      // 调用elementUi表单清空事件事件resetFields，必须有prop否则此事件无效， 官方demo没有写
      this.$refs.userFormRef.resetFields();
      this.search();
    },
    // 改变启用/禁用状态 事件
    async changeStatus(id) {
      const res = await this.$axios.post("/user/status", { id });
      // console.log(res);
      if (res.data.code === 200) {
        this.$message({
          message: "状态修改成功！",
          type: "success"
        });
        this.search();
      }
    },
    // 删除用户事件
    removeUser(id, username) {
      this.$confirm(
        `此操作将永久删除用户 ${username} 的信息, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const res = await this.$axios.post("/user/remove", { id });
          if (res.data.code === 200) {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.search();
          }
        })
        .catch(() => {});
    },
    // 新增用户
    add() {
      this.$refs.userEdigRef.model='add'
      this.$refs.userEdigRef.centerDialogVisible = true;
      // 解决第二次打开新增/编辑窗口还是会保留上次填写信息和校验的问题
      this.$nextTick(()=>{
        this.$refs.userEdigRef.$refs.userFormRef.resetFields()
      })
    },
    // 编辑用户
    editUser(row) {
      this.$refs.userEdigRef.model='edit'
      this.$refs.userEdigRef.centerDialogVisible = true;
      // 在user-del-edig.vue 的el-form表单中使用绑定使相应的字符串转换为数字 和深浅拷贝
      // this.$refs.userEdigRef.formLabelAlign=row
      this.$refs.userEdigRef.formLabelAlign=JSON.parse(JSON.stringify(row))
      
      // 解决第二次打开编辑窗口还是会保留上次校验的问题
      this.$nextTick(()=>{
        this.$refs.userEdigRef.$refs.userFormRef.clearValidate()
      })
    }
  }
};
</script>