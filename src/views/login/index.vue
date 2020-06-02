<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/images/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单 -->
      <el-form class="login-form">
        <el-form-item label>
          <el-input prefix-icon="el-icon-user-solid" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input prefix-icon="el-icon-s-goods" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" src='@/assets/images/login_captcha.png' alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/images/login_bg.png" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>