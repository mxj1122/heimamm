<template>
  <div id="enterprise">
    <el-card>
      <el-form :model="enterpriseForm" ref="enterpriseFormRef" label-width="80px" inline>
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="enterpriseForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="enterpriseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="enterpriseForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="enterpriseForm.status" placeholder="请选择">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>

      <!-- card body -->
    </el-card>
    <el-card>
      <el-table :data="enterpriseList" style="width: 100%">
        
        <el-table-column prop="eid" label="企业编号" width="80"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="280"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status===0" style="color:red">禁用</span>
            <span v-if="scope.row.status===1" style="color:green">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit">编辑</el-button>
            <el-button
              :type="scope.row.status===0?'success':'info'"
            >{{scope.row.status===0?'启用':'禁用'}}</el-button>
            <el-button type="danger" @click="edit">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
      <!-- card body -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enterpriseForm: {
        eid: "",
        name: "",
        status: ""
      },
      page: 1,
      limit: 5,
      total: 0,
      enterpriseList: []
    };
  },
  methods: {
    async getEnterpriseIfo() {
      const res = await this.$axios.get("/enterprise/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.enterpriseForm
        }
      });
      if (res.data.code === 200) {
        // console.log(res);

        this.enterpriseList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    search() {
      this.page = 1;
      this.getEnterpriseIfo();
    },
    clear() {
      this.$refs.enterpriseFormRef.resetFields();
      this.getEnterpriseIfo();
    },
    add() {},
    edit() {},
    sizeChange(val) {
      this.limit = val;
      this.search();
    },
    currentChange(val) {
      this.page = val;
      this.getEnterpriseIfo();
    }
  },
  created() {
    this.getEnterpriseIfo();
  }
};
</script>

<style>
</style>