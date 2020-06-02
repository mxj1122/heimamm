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
      <el-form class="login-form" :model="inputInfo" :rules="rules" status-icon>
        <el-form-item label prop="phone">
          <el-input v-model="inputInfo.phone" prefix-icon="el-icon-user-solid" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            v-model="inputInfo.password"
            prefix-icon="el-icon-s-goods"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="code">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="inputInfo.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" src="@/assets/images/login_captcha.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="inputInfo.isCheck"></el-checkbox>我已阅读并同意
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
export default {
  name: "Login",
  data() {
    return {
      inputInfo: {
        phone: "",
        password: "",
        code: "",
        isCheck:false
      },
      rules: {
        phone: [
          // { required: true, message: "请输入手机号", trigger: "blur" },
          // { min: 11, max: 11, message: "手机号不正确", trigger: "blur" }
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空！"));
              }
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("请填写正确的手机号！"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少需要6位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码必须为4位", trigger: "blur" }
        ],
        isCheck:[
          {validator:(rule,value,callback)=>{
            if (!value) {
              return callback(new Error("必须同意用户协议！"));
            }
            callback()
          },trigger:'change'}
        ]
      }
    };
  }
};
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