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
            v-for="server in servers"
        >
          <v-list-item-avatar>
            <v-icon
                class="grey lighten-1"
                v-bind:color="
                server.baseInfo.expired
                  ? 'red'
                  : server.statusInfo.status
                  ? 'green'
                  : 'yellow'
              "
                dark
            >
              {{ serverStatusIcon(server) }}
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
                v-text="server.baseInfo.name"
            ></v-list-item-title>

            <v-list-item-subtitle
            >到期时间 {{ server.baseInfo.expireTime }}
            </v-list-item-subtitle
            >
            <v-list-item-subtitle
            >端口: {{ server.baseInfo.port }} 最大玩家数:
              {{ server.baseInfo.player }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-row>
          <v-col align="left">
            <v-btn small @click="page--; loadServer()" v-if="previousPage">上一页</v-btn>
          </v-col>
          <v-col align="center">
            <p class="align-end">第 {{ page + 1 }} 页 / 共 {{ Math.floor((serverCount + 9) / 10) }} 页</p>
          </v-col>

          <v-col align="right">
            <v-btn small @click="page++; loadServer()" v-if="nextPage">下一页</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Index",
  created() {
    this.$store.commit("changeTitle", "服务器");
    this.loadServer()
  },
  data: () => ({
    loading: true,
    servers: {},
    serverCount: 0,
    page: 0,
    previousPage: false,
    nextPage: true
  }),
  methods: {
    loadServer: function () {
      if (this.page * 10 > this.serverCount) {
        this.page--;
        return
      }
      let data = new FormData();
      data.append("page", this.page)
      this.$axios.post("/servers", data).then((res) => {
        if (res.data.status) {
          this.nextPage = res.data.data.total > (this.page + 1) * 10;
          this.previousPage = this.page !== 0;
          this.servers = res.data.data.servers;
          this.serverCount = res.data.data.total;
          this.loading = false;
        } else {
          this.loading = false;
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'red'
          })
        }
      });
    },
    serverClick: function (id) {
      this.$router.push("/server/" + id);
    },
    serverStatusIcon: function (server) {
      if (server.baseInfo.expired) return "mdi-alert";
      switch (server.statusInfo.status) {
        case 0:
          return "mdi-pause";
        case 1:
          return "mdi-motion-play";
        case 2:
          return "mdi-play";
        case 3:
          return "mdi-motion-pause";
        default:
          return "mdi-help-circle-outline";
      }
    },
  },
};
</script>

<style scoped>
</style>