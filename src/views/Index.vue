<template>
  <v-container>
    <v-card v-bind:loading="loading">
      <v-card-title>我的服务器</v-card-title>
      <v-card-text>共 {{ serverCount }} 个</v-card-text>
      <v-list>
        <v-list-item
            @click="serverClick(server.id)"
            v-ripple
            v-bind:key="server.id"
            v-for="server in servers">
          <v-list-item-avatar>
            <v-icon
                class="grey lighten-1"
                v-bind:color="server.baseInfo.expired ? 'red' : (server.startInfo.running ? 'green' : 'yellow')"
                dark
            >
              {{ server.baseInfo.expired ? 'mdi-alert' : (server.startInfo.running ? 'mdi-play' : 'mdi-pause') }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="server.baseInfo.name"></v-list-item-title>

            <v-list-item-subtitle>到期时间 {{ server.baseInfo.expireTime }}</v-list-item-subtitle>
            <v-list-item-subtitle>端口 {{ server.baseInfo.port }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>

        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Index",
  created() {
    this.$store.commit('changeTitle', "服务器")
    this.$axios.get(this.$store.state.api + "/servers").then((res) => {
      this.servers = res.data.data;
      this.serverCount = this.servers.length
      this.loading = false
    })
  },
  data: () => ({
    loading: true,
    servers: {},
    serverCount: 0
  }),
  methods: {
    serverClick: function (id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>