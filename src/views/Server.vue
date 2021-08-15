<template>
  <v-container>
    <v-card style="margin-top: 12px">
      <v-card-title style="margin-left: 5px">
        {{ server.baseInfo.name }}
      </v-card-title>
      <v-card-subtitle>
        <v-icon>{{ serverStatusIcon }}</v-icon> {{ serverStatusText }}
      </v-card-subtitle>
      <!-- Side bar -->
      <v-row>
        <v-col cols="12" md="3">
          <v-list shaped>
            <v-list-item-group mandatory v-model="selectedItem" color="primary">
              <v-list-item>
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
          <router-view style="margin: 15px" :key="$route.path" />
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
  },
  data: () => {
    return {
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
      selectedItem: null,
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
        case 4:
          return "mdi-motion-pause";
        default:
          return "mdi-help-circle-outline";
      }
    },
    actionStatusIcon: function () {
      switch (this.server.statusInfo.status) {
        case 0:
          return "mdi-play";
        case 1:
          return "mdi-pause";
        case 2:
          return "mdi-pause";
        case 4:
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
  },
};
</script>

<style scoped>
</style>