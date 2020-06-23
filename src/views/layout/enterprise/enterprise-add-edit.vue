<template>
  <div class="enterprise-edit">
    <el-dialog :visible.sync="dialogVisible" width="35%" center>
      <div slot="title" class="title">{{model==='add'? '新增企业':'编辑企业'}}</div>
      <!-- 内容 -->
      <el-form :model="enterpriseForm" ref="enterpriseEditRef" label-width="80px" :rules="rules">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="enterpriseForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="enterpriseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="enterpriseForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="enterpriseForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="enterpriseForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      model: "add",
      enterpriseForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "企业备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.enterpriseEditRef.validate(async valid => {
        if (!valid) {
          return;
        }
        let res = null;
        if (this.model === "add") {
          res = await this.$axios.post("/enterprise/add", this.enterpriseForm);
        } else {
          res = await this.$axios.post("/enterprise/edit", this.enterpriseForm);
        }
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: this.mode === "add" ? "新增成功~" : "修改成功~"
          });
          this.dialogVisible = false;
          this.$parent.search();
        }
      });
    }
  },
  watch: {
      dialogVisible(newval) {
          console.log(newval);
          if (!newval) {
            //   在关闭的时候清除校验，所以不需要写在$nextTick里面
              this.$refs.enterpriseEditRef.clearValidate();
          }
      }
  },
};
</script>

<style lang='less'>
.enterprise-edit {
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
  .el-icon-close:before {
    color: #fff;
  }
}
</style>