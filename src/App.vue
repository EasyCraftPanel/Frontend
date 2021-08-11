<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar dark color="indigo" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>EasyCraft</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({drawer: false}),
  store: {
    state: {
      siteTitle: "EasyCraft",
      api: "http://127.0.0.1/api",
      isLogin: false
    }
  },
  computed: {
    siteTitle() {
      return this.$store.state.siteTitle;
    }
  },
  created() {
    this.$http.get(this.$store.state.api + "/login/status")
        .then(res => {
          this.$store.state.isLogin = res.data.status;
          if (!res.data.status){
            this.$router.push("/login")
          }
        })
  }
}
</script>
