<template>
  <v-container>
    <h4 class="text-h4">开服配置</h4>
    <v-form>
      <v-row align="center">
        <v-col cols="12" md="2">
          <span>开服器</span>
        </v-col>

        <v-col cols="12" md="10">
          <v-select
              v-model="starter"
              :items="starters"
              item-text="name"
              item-value="id"
              label="开服器"
              persistent-hint
              single-line
          ></v-select>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="12" md="2">
          <span>核心</span>
        </v-col>

        <v-col cols="12" md="10">
          <v-text-field
              label="核心"
              @click="dialog = true"
              :value="corename"
              filled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn block color="primary" @click="submit">提交</v-btn>
    </v-form>

    <v-dialog
        max-width="1000px"
        v-model="dialog"
    >
      <v-card :loading="loading" style="height: 80vh; overflow-x: hidden" class="md12 xs8">
        <v-card-title class="text-h5 grey lighten-2">
          选择核心
        </v-card-title>
        <v-tabs fixed-tabs>
          <v-tab @click="loadCoreBranches(0)">PC</v-tab>
          <v-tab @click="loadCoreBranches(1)">基岩</v-tab>
          <v-tab @click="loadCoreBranches(2)">双端</v-tab>
        </v-tabs>
        <v-row>
          <v-col cols="4">
            <v-list>
              <v-list-item
                  @click="loadCoresInBranch(branch)"
                  v-text="branch"
                  v-for="branch in branches"
                  :key="branch"/>
            </v-list>
          </v-col>
          <v-col cols="8">
            <v-list>
              <v-list-item
                  @click="selectCore(core)"
                  v-for="core in cores"
                  :key="core.id"
                  v-text="core.info.name"
              />
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Starter",
  data: () => {
    return {
      dialog: false,
      corename: null,
      startdata: {},
      starters: [],
      branches: [],
      cores: [],
      core: null,
      starter: null,
      loading: false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData: function () {
      let data = new FormData();
      data.append("id", this.$route.params.id)
      this.$axios.post("/starters").then((res) => {
        if (res.data.status) {
          this.starters = res.data.data;
        } else {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'red'
          })
        }
      })
      this.$axios.post("/server/info/start", data).then((res) => {
            if (res.data.status) {
              this.startdata = res.data.data
              this.starter = res.data.data.starter
              this.core = res.data.data.core
              this.corename = res.data.data.coreInfo.name
            } else {
              this.$store.dispatch('snackbar/openSnackbar', {
                msg: res.data.msg,
                color: 'red'
              })
            }
          }
      )
    },
    selectCore: function (core) {
      this.core = core.id
      this.corename = core.info.name
      this.dialog = false
    },
    loadCoreBranches: function (device) {
      this.loading = true
      let data = new FormData();
      data.append("device", device)
      this.$axios.post("/cores/branches", data).then(res => {
        if (res.data.status) {
          this.cores = []
          this.branches = res.data.data
        } else {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'red'
          })
        }
        this.loading = false
      })
    },
    loadCoresInBranch: function (branch) {
      this.loading = true
      let data = new FormData();
      data.append("branch", branch)
      this.$axios.post("/cores/branch/item", data).then(res => {
        if (res.data.status) {
          this.cores = res.data.data;
        } else {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'red'
          })
        }
        this.loading = false
      })
    },
    submit: function () {
      let data = new FormData();
      data.append("serverId", this.$route.params.id)
      data.append("Core", this.core)
      data.append("Starter", this.starter)
      this.$axios.post("/server/start/info/update", data).then(res => {
        if (res.data.status) {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'blue'
          })
          this.loadData()
        } else {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'red'
          })
        }
      })

    }
  }
}
</script>

<style scoped>

</style>