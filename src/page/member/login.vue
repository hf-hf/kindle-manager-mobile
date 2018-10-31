<template>
   <div class="wrapper">
      <div class="title">
          <span class="title">登录</span>
      </div>
      <div class="login">
          <mt-field label="用户名" placeholder="请输入用户名" v-model="loginForm.username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="loginForm.password"></mt-field>
          <mt-button size="large" type="primary" @click.native="handleLogin">登录</mt-button>
      </div>
   </div>
</template>

<script>
import { Toast, Indicator  } from 'mint-ui';
export default {
  data() {
    return {
      loginForm: {
        username: '553527481@qq.com',
        password: '123456'
      },
    };
  },
  methods: {
    // back() {
    //   this.$router.go("-1");
    // },
    handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        Toast({
          message: '请输入账号、密码！',
          iconClass: 'mint-toast-icon mintui mintui-field-warning',
          //position: 'top',
        });
        return;
      }
      Indicator.open('加载中...');
      this.$store.dispatch('Login', this.loginForm).then(() => {
        Indicator.close();
        this.$router.push({ path: '/' })
      }).catch(() => {
        Indicator.close();
      })
    }
  }
};
</script>