<template>
  <body id="login-page">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login-title">系统登录</h3>
    <el-form-item>
      <el-input
          type="text"
          v-model="loginForm.loginName"
          auto-complete="off"
          placeholder="账号"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
      ></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button
          type="primary"
          style="width: 100%;  border: none"
          @click="login"
      >登录
      </el-button
      >
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginName: "",
        password: "",
      },
      responseResult: [],
    };
  },
  methods: {
    login () {
      this.$axios
          .post('/login', {
            loginName: this.loginForm.loginName,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$router.replace({path: '/home'})
            }
          })
          .catch(failResponse => {
          })
    }
  },
};
</script>

<style scoped>
#login-page {
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;

}
body {
  margin: 0px;

}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

</style>
