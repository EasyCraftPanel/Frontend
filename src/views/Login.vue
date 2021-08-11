<template>
  <v-container>
    <v-col
        lg="5"
        offset-lg="8"
    >
      <v-card
          class="easycraft-login-card align-center"
      >
        <v-card-title>登录</v-card-title>
        <v-card-subtitle>登录到 EasyCraft</v-card-subtitle>
        <v-form
            class="easycraft-login-from"
            ref="form"
        >
          <v-text-field
              v-model="form.username"
              prepend-icon="mdi-account"
              label="用户名"/>
          <v-text-field
              v-model="form.password"
              type="password"
              prepend-icon="mdi-lock"
              label="密码"/>
          <v-alert
              border="left"
              v-if="tipseen"
              v-bind:type="loginerror ? 'error' : 'success'"
          >{{ errormsg }}
          </v-alert>
          <v-btn
              @click="login"
              block
              color="primary">
            登录
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loginerror: false,
      errormsg: "",
      tipseen: false
    }
  },
  methods: {
    login: function () {
      this.tipseen = true
      let data = new FormData();
      data.append("username", this.form.username)
      data.append("password", this.form.password);
      axios.post(this.$store.state.api + "/login", data)
          .then(data => {
            if (!data.data.status) {
              this.loginerror = true
              this.errormsg = data.data.msg
            } else {
              this.loginerror = false
              this.errormsg = data.data.msg
              window.localStorage["token"] = data.data.data.UserRequest.auth;
              this.$store.state.isLogin = true
            }
          }).catch(e => {
        this.loginerror = true
        this.errormsg = e.toString()
      });
    }
  }
}
</script>

<style scoped>
.easycraft-login-card {
  padding: 15px;
}

.easycraft-login-from {
  margin: 10px;
}
</style>