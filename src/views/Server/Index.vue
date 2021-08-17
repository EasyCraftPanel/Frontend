<template>
  <v-container>
    <h4 class="text-h4">服务器信息</h4>
    <v-form>
      <div v-for="data in datas" :key="data.id">
        <server-data-comp :data="data"/>
      </div>
      <v-btn block @click="submit" color="primary">提交</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import ServerDataComp from "@/views/Server/ServerDataComp";

export default {
  name: "Index",
  components: {ServerDataComp},
  methods: {
    submit: function () {
      let subdata = new FormData()
      subdata.append("serverId", this.$route.params.id)
      for (let index in this.datas) {
        if (this.datas[index].editable)
          subdata.append(this.datas[index].id, this.datas[index].value)
      }
      this.$axios.post(this.$store.state.api + "/server/base/info/update", subdata).then(res => {
            if (res.data.status) {
              this.$store.dispatch('snackbar/openSnackbar', {
                msg: res.data.msg,
                color: 'primary'
              })
              let data2 = new FormData()
              data2.append("id", this.$route.params.id)
              this.$axios
                  .post(this.$store.state.api + "/server/base/columns", data2)
                  .then((response) => {
                    this.datas = response.data.data;
                  });
            } else {
              this.$store.dispatch('snackbar/openSnackbar', {
                msg: res.data.msg,
                color: 'red'
              })
            }
          }
      )
    }
  },
  data: () => {
    return {
      server: {},
      datas: [],
      snackbar: false,
      text: null
    };
  },
  created() {
    let data = new FormData();
    data.append("id", this.$route.params.id);
    this.$axios
        .post(this.$store.state.api + "/server", data)
        .then((response) => {
          if (response.data.status) {
            this.server = response.data.data;
          } else {
            this.$store.dispatch('snackbar/openSnackbar', {
              msg: response.data.msg,
              color: 'red'
            })
          }
        });
    this.$axios
        .post(this.$store.state.api + "/server/base/columns", data)
        .then((response) => {
          this.datas = response.data.data;
        });
  },
};
</script>

<style scoped>
</style>