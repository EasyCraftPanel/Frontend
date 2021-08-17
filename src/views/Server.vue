<template>
  <v-container>
    <v-card style="margin-top: 12px">
      <v-card-title style="margin-left: 5px">
        {{ server.baseInfo.name }}
      </v-card-title>
      <v-card-subtitle>
        <v-icon>{{ serverStatusIcon }}</v-icon>
        {{ serverStatusText }}
      </v-card-subtitle>
      <!-- Side bar -->
      <v-row>
        <v-col cols="12" md="3">
          <v-list shaped>
            <v-list-item-group mandatory v-model="selectedItem" color="primary">
              <v-list-item :disabled="!canToggleServerStatus" @click="toggleServerStatus">
                <v-list-item-icon>
                  <v-icon v-text="actionStatusIcon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="actionName"></v-list-item-title>
              </v-list-item>
              <v-list-item
                  @click="changeSubRoute(selection.path)"
                  :key="selection.path"
                  v-for="selection in selections"
              >
                <v-list-item-icon>
                  <v-icon v-text="selection.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                      v-text="selection.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" md="9">
          <!-- Content -->
          <router-view style="margin-top: 15px" :key="$route.path"/>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Server",
  methods: {
    changeSubRoute(path) {
      this.$router.push("/server/" + this.server.id + "/" + path);
    },
    toggleServerStatus() {
      let data = new FormData();
      data.append("id", this.server.id)
      switch (this.server.statusInfo.status) {
        case 0:
          this.server.statusInfo.status = 1
          this.$axios.post(this.$store.state.api + "/server/start", data)
          break;
        case 2:
          this.server.statusInfo.status = 3
          this.$axios.post(this.$store.state.api + "/server/stop", data)
          break;
      }
    }
  },
  data: () => {
    return {
      timer: null,
      selections: [
        {
          path: "index",
          name: "信息",
          icon: "mdi-information",
        },
        {
          path: "console",
          name: "控制台",
          icon: "mdi-console",
        },
        {
          path: "starter",
          name: "开服配置",
          icon: "mdi-animation-play",
        },
        {
          path: "configs",
          name: "服务器配置项",
          icon: "mdi-cog",
        },
      ],
      server: {
        baseInfo: {
          name: "加载中",
        },
        statusInfo: {
          status: 5,
        },
      },
      selectedItem: 1,
    };
  },
  computed: {
    serverStatusIcon: function () {
      if (this.server.baseInfo.expired) return "mdi-alert";
      switch (this.server.statusInfo.status) {
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
    canToggleServerStatus: function () {
      return this.server.statusInfo.status === 0 || this.server.statusInfo.status === 2;
    },
    actionStatusIcon: function () {
      switch (this.server.statusInfo.status) {
        case 0:
          return "mdi-play";
        case 1:
          return "mdi-pause";
        case 2:
          return "mdi-pause";
        case 3:
          return "mdi-play";
        default:
          return "mdi-help-circle-outline";
      }
    },
    serverStatusText: function () {
      if (this.server.baseInfo.expired) return "已过期";
      switch (this.server.statusInfo.status) {
        case 0:
          return "已停止";
        case 1:
          return "启动中";
        case 2:
          return "已启动";
        case 3:
          return "停止中";
        default:
          return "未知";
      }
    },
    actionName: function () {
      switch (this.server.statusInfo.status) {
        case 0:
          return "启动";
        case 1:
          return "停止";
        case 2:
          return "停止";
        case 3:
          return "启动";
        default:
          return "未知";
      }
    }
  },
  created() {
    let data = new FormData();
    data.append("id", this.$route.params.id);
    this.$axios
        .post(this.$store.state.api + "/server", data)
        .then((response) => {
          if (response.data.status) {
            this.server = response.data.data;
            this.$store.commit("changeTitle", this.server.baseInfo.name);
          }
        });
    if (this.$route.name === 'server')
      this.$router.push("/server/" + this.$route.params.id + "/index")
    this.timer = setInterval(() => {
      let data = new FormData();
      data.append("id", this.$route.params.id);
      this.$axios.post(this.$store.state.api + "/server/status", data).then(res => {
        if (res.data.status)
          this.server.statusInfo = res.data.data;
        else {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'red'
          })
        }
      })
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
</style>