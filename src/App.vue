<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        class="app-drawer"
        app
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img v-bind:src="$store.getters.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ $store.state.userInfo.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ $store.getters.userTypeStr }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="logout" icon v-bind="attrs"
                       v-on="on">
                  <v-icon>{{ $store.getters.isLogin ? "mdi-exit-to-app" : "mdi-account" }}</v-icon>
                </v-btn>
              </template>
              <span>{{ $store.getters.isLogin ? "登出" : "登录" }}</span>
            </v-tooltip>

          </v-list-item-action>
        </v-list-item>

        <v-list-item @click="$router.push('/index')">
          <v-list-item-icon>
            <v-icon>mdi-server</v-icon>
          </v-list-item-icon>
          <v-list-item-content>服务器</v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar dark color="indigo" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $store.getters.siteTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <snackbar/>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </v-col>
      </v-row>

    </v-main>
  </v-app>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#inspire {
  background-image: url("https://i.loli.net/2021/08/12/hJMAIbZiBn4sRq2.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;
}

.app-drawer {
  background-color: rgba(255, 255, 255, 0.6) !important;
}
</style>

<script>
import snackbar from '@/components/snackbar.vue'

export default {
  name: 'App',
  components: {snackbar},
  data: () => ({drawer: false}),
  created() {
    this.$axios.get("/apiurl").then((res) => {
      this.$axios.defaults.baseURL = res.data;
      this.$axios.get("/login/status")
          .then(res => {
            if (!res.data.status) {
              window.localStorage.removeItem("auth")
              if (this.$route.name !== "login")
                this.$router.push("/login")
            } else {
              this.$store.commit('onLogin', res.data.data.UserInfo)
            }
          }).catch(() => {
      })
    })

  },
  methods: {
    logout: function () {
      if (this.$store.getters.isLogin)
        this.$router.push('/logout')
      else
        this.$router.push('/login')
    }
  }
}
</script>
