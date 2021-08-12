<template>
  <v-container>
    <v-col
        lg="5"
        offset-lg="8"
    >
      <v-card
          shaped
          v-bind:loading="loading"
          class="easycraft-login-card"
      >
        <v-card-title class="card-title">登录</v-card-title>
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
              @keyup.enter="login"
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
export default {
  name: "Login",
  created() {
    this.$store.commit('changeTitle', "登录")
    if (this.$store.getters.isLogin) {
      this.$router.push("index")
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loginerror: false,
      errormsg: "",
      tipseen: false,
      loading: false
    }
  },
  methods: {
    login: function () {
      let data = new FormData();
      data.append("username", this.form.username)
      data.append("password", this.form.password)
      this.loading = true
      this.$axios.post(this.$store.state.api + "/login", data)
          .then(data => {
            this.tipseen = true
            if (!data.data.status) {
              this.loginerror = true
              this.errormsg = data.data.msg
            } else {
              this.loginerror = false
              this.errormsg = data.data.msg
              window.localStorage["token"] = data.data.data.UserRequest.auth;
              this.$store.commit('onLogin', data.data.data.UserInfo)
              setTimeout(() => {
                this.$router.push("index")
              }, 3000);
            }
            this.loading = false
          }).catch(e => {
        this.tipseen = true
        this.loginerror = true
        this.errormsg = e.toString()
        this.loading = false
      });
    }
  }
}
</script>

<style scoped>
.easycraft-login-card {
  margin-top: 10vh;
  padding-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
}

.card-title {
  margin-top: 15px;
}

.easycraft-login-from {
  margin: 15px;
}
</style>