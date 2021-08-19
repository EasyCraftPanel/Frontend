<template>
  <v-container>
    <v-card
        class="justify-center card"
        v-if="seeicon"
        v-bind:loading="!seeicon">
      <v-row justify="center">
        <v-icon class="icon" size="100" color="primary">{{ iconname }}</v-icon>
      </v-row>

      <v-row justify="center">
        <h1> {{ msg }}</h1>
      </v-row>
    </v-card>
  </v-container>
</template>

<style>
.card > * {
  margin-top: 50px !important;
}
</style>

<script>
export default {
  name: 'Logout',
  data: () => ({
    seeicon: true,
    iconname: "mdi-check-circle",
    msg: "正在登出"
  }),
  created() {
    this.$store.commit('changeTitle', "登出")

    this.$axios.get("/logout").then((res) => {
      this.seeicon = true
      this.iconname = res.data.status ? "mdi-check-circle" : "alert-circle"
      this.msg = res.data.msg
      window.localStorage.removeItem("auth");
      this.$store.commit('onLogout')
      setTimeout(() => {
        this.$router.push("/login")
      }, 3000);
    });

  }
}
</script>