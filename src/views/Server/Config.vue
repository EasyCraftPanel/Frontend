<template>
  <v-container>
    <h4 class="text-h4">配置修改</h4>
    <h6 class="text-h6" v-text="config.display"/>
    <hr/>
    <br/>
    <server-data-comp v-for="data in configValues" :key="data.key" :data="data"/>
    <v-btn block color="primary" @click="submit">提交</v-btn>
  </v-container>
</template>

<script>
import ServerDataComp from "@/views/Server/ServerDataComp";

export default {
  components: {ServerDataComp},
  methods: {
    submit: function () {
      let data = new FormData()
      data.append("id", this.$route.params.id)
      data.append("config", this.$route.params.config)
      let obj = Object.create(null);
      for (let configValuesKey in this.configValues) {
        obj [this.configValues[configValuesKey].key] = this.configValues[configValuesKey].value
      }
      data.append("values", JSON.stringify(obj))
      this.$axios.post(this.$store.state.api + "/server/config/content/update", data).then(res => {
        this.$store.dispatch('snackbar/openSnackbar', {
          msg: res.data.msg,
          color: res.data.status ? 'blue' : 'red'
        })
      })
    }
  },
  data: () => {
    return {
      config: {display: "加载中"},
      configValues: []
    }
  },
  name: "Config",
  created() {
    let data = new FormData()
    data.append("id", this.$route.params.id)
    data.append("config", this.$route.params.config)
    this.$axios.post(this.$store.state.api + "/server/config/content", data).then(res => {
      if (res.data.status) {
        this.config = res.data.data.configInfo
        this.configValues = res.data.data.configValue
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

<style scoped>

</style>