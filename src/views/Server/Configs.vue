<template>
  <v-container>
    <h4 class="text-h4">服务器配置</h4>
    <v-list>
      <v-list-item
          @click="jumpToConfig(index)"
          v-for="(config,index)  in configs"
          :key="index">
        <v-list-item-icon>
          <v-icon>mdi-file-document-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="config.display"></v-list-item-title>
          <v-list-item-subtitle v-text="config.file"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'Configs',
  data: () => {
    return {
      configs: []
    }
  },
  methods: {
    jumpToConfig: function (config) {
      this.$router.push("/server/" + this.$route.params.id + "/config/" + config)
    }
  },
  created() {
    let data = new FormData();
    data.append("id", this.$route.params.id)
    this.$axios.post(this.$store.state.api + "/server/configs/list", data).then(res => {
      if (res.data.status) {
        this.configs = res.data.data
      } else {
        this.$store.dispatch('snackbar/openSnackbar', {
          msg: res.data.msg,
          color: 'red'
        })
      }
    })
  }
}
</script>