<template>
  <div class="register">
    <!-- 顶部区域 -->
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div slot="title" class="title">注册</div>

      <!-- form表单 -->
      <el-form
        label-position="left"
        ref="registerFormRef"
        label-width="80px"
        :model="registerForm"
        :rules="rules"
        status-icon
      >
        <!-- 头像上传 -->
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            name="image"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row>
            <el-col :span="15">
              <el-input v-model.number="registerForm.code"></el-input>
            </el-col>
            <el-col :span="7" style="margin-left:36px">
              <img class="captcha" :src="codeURL" @click="codeClick" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="15">
              <el-input v-model="registerForm.rcode"></el-input>
            </el-col>
            <el-col :span="7" style="margin-left:36px">
              <el-button @click="rcodeClick">获取手机验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      imageUrl: "", // 上传成功之后服务器返回的头像的url
      uploadAction: process.env.VUE_APP_BASEURL + "/uploads",
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      dialogVisible: false,
      registerForm: {
        username: "asdasdd",
        email: "asddasd@qq.com",
        phone: "19925236566",
        password: "000000",
        code: "",
        rcode: "",
        avatar: ""
      },
      rules: {
        avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
        username: [
          //   {requried:true,message:'请输入昵称',trigger:'blur'}
          { required: true, message: "请输入昵称", trigger: "blur" }
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
        code: [
          //   { required: true, message: "请输入图形码", trigger: "blur" },
          //   { min: 4, max: 4, message: "图形码为4位", trigger: "blur" }
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请输入图形码"));
              }
              if (value.toString().trim().length !== 4) {
                return callback(new Error("图形码是四位数"));
              }
              if (!Number.isInteger(value)) {
                return callback(new Error("图形码是数字"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        rcode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度不能小于6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    codeClick() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&r=" +
        Math.random();
    },
    async rcodeClick() {
      // this.$axios
      //   .post("/sendsms", {
      //     code: this.registerForm.code,
      //     phone: this.registerForm.phone
      //   })
      //   .then(res => {
      //     if (res.data.code == 200) {
      //       this.registerForm.rcode = res.data.data.captcha;
      //     } else {
      //       this.$message.error(res.data.message);
      //       this.codeURL =
      //         process.env.VUE_APP_BASEURL +
      //         "/captcha?type=sendsms&r=" +
      //         Math.random();
      //     }
      //   });
      const res = await this.$axios.post("/sendsms", {
        code: this.registerForm.code,
        phone: this.registerForm.phone
      });
      if (res.data.code == 200) {
        this.registerForm.rcode = res.data.data.captcha;
      } else {
        this.$message.error(res.data.message);
        this.codeURL =
          process.env.VUE_APP_BASEURL +
          "/captcha?type=sendsms&r=" +
          Math.random();
      }
    },
    beforeAvatarUpload(file) {
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      // 给图片地址赋值要加上"/"
      this.imageUrl = process.env.VUE_APP_BASEURL + "/" + res.data.file_path;
      // 给avater赋值。是服务器返回的文件地址。发送注册请求时使用
      this.registerForm.avatar = res.data.file_path;
    },
    submit() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) {
          return;
        }
        const res = await this.$axios.post("/register", this.registerForm);
        console.log(res);

        if (res.data.code === 200) {
          this.$message({
            message: "注册成功！",
            type: "success"
          });
          // 关闭注册窗口
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader {
    text-align: center;
  }
}
</style>