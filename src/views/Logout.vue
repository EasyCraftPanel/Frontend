<template>
  <v-container>
    <v-icon class="icon" x-large color="primary">mdi-check-circle</v-icon>
  </v-container>
</template>

<script>
export default {
  name: 'Logout',
  created() {
    console.log(this.$vuetify)
    /*
    setTimeout(() => {
      window.localStorage.removeItem("auth");
      this.$router.push("/login")
    }, 3000);
    */

  }
}
</script>