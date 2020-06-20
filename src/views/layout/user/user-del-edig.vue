<template>
  <div class="userEdig">
    <el-dialog :visible.sync="centerDialogVisible" width="35%" center>
      <div slot="title" class="title">{{model=="add"? '新增用户' : '编辑用户'}}</div>
      <el-form
        label-position="left"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="userFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select placeholder="请选择" v-model="formLabelAlign.role_id">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择" v-model="formLabelAlign.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="formLabelAlign.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "useredit",
  data() {
    return {
      model: "",
      centerDialogVisible: false,
      formLabelAlign: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      // 表单校验
      rules: {
        username: [
          { required: true, message: "请输入昵称！", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请输入邮箱账号"));
              }
              const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
              if (!reg.test(value)) {
                return callback(new Error("邮箱账号不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }
              const reg = /^(1)[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        role_id: [
          { required: true, message: "请选择角色！", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态！", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注！", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) {
          return;
        }
        let res = null;
        if (this.model === "add") {
          // 新增
          res = await this.$axios.post("/user/add", this.formLabelAlign);
        } else {
          // 修改
          res = await this.$axios.post('/user/edit',this.formLabelAlign)
        }

        // 成功判断
        if (res.data.code == 200) {
          this.$message({
            message: this.model === "add" ? "新增成功！" : "编辑成功！",
            type: "success"
          });

          this.centerDialogVisible=false
          this.$parent.search()
        }else {
          this.$message({
          message: res.data.message,
          type: 'warning'
        });
        }
      });
    }
  }
};
</script>

<style lang='less'>
.userEdig {
  .title {
    height: 53px;
    background: #03c0f9;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>