<template>
  <div class="register">
    <!-- 顶部区域 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div slot="title" class="title">注册</div>

      <!-- form表单 -->
      <el-form label-position="left" label-width="80px" :model="registerForm">
        <el-form-item label="昵称">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码">
            <el-row >
                <el-col :span="15">
                    <el-input v-model="registerForm.code"></el-input>
                </el-col>
                <el-col :span="7" style="margin-left:36px">
                    <img class="captcha" src="@/assets/images/login_captcha.png" alt="">
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="验证码">
            <el-row >
                <el-col :span="15">
                    <el-input v-model="registerForm.rcode"></el-input>
                </el-col>
                <el-col :span="7" style="margin-left:36px">
                    <el-button>获取手机验证码</el-button>
                </el-col>
            </el-row>
        </el-form-item>
      </el-form>

      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      registerForm: {
        username: "",
        email: "",
        phone: "",
        password: "",
        code:'',
        rcode:''
      }
    };
  }
};
</script>

<style lang="less">
.register {
  .title {
    height: 53px;
    background: #03c0f9;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100%;
    height: 40px;
  }
}
</style>