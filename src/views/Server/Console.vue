<template>
  <v-container>
    <h4 class="text-h4">控制台</h4>
    <v-row justify="center" align="center">
      <v-col class="float-left">
        <v-checkbox
            v-model="focusnew"
            label="跟随滚动"
        ></v-checkbox>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn @click="cleanLog" class="float-right" small>{{ cleanLogMsg }}</v-btn>
      </v-col>

    </v-row>
    <div class="console-bg">
      <p
          :class="[`console-log${log.e?'-error':''}`]"
          v-for="log in logs"
          v-html="replaceColor(log.c)"
          :key="log.id"
      />
      <div ref="consoleend" class="console-space-holder"/>
    </div>
    <v-text-field
        @keyup.enter="sendCmd"
        outlined
        dense
        v-model="cmd"
        class="text-command"
        background-color="grey lighten-1"
        prepend-icon="mdi-console-line"/>

  </v-container>
</template>

<style scoped>
.text-command {
  margin-top: 15px !important;
}

.console-space-holder {
  height: 12px;
}

.console-bg {
  height: 420px;
  border-radius: 8px;
  background: rgb(0, 0, 0);
  overflow: auto;
  padding: 8px 16px;
  font-size: 0.8em;
}

.console-log {
  color: white;
  margin: 0;
  font-size: .85rem;
}

.console-log-error {
  color: red;
  margin: 0;
  font-size: .85rem;
}
</style>

<script>
var Convert = require('ansi-to-html')
var ConsoleConvert = new Convert();
export default {
  name: 'Console',
  data: () => {
    return {
      logs: [],
      lastCount: 0,
      timer: null,
      focusnew: true,
      cleanLogMsg: "清空日志",
      serverClean: false,
      cmd: ''
    }
  },
  methods: {
    replaceColor: function (text) {
      if (text === null) return ''
      return ConsoleConvert.toHtml(text);
    },
    sendCmd: function () {
      let data = new FormData();
      data.append("cmd", this.cmd)
      data.append("id", this.$route.params.id)
      this.$axios.post("/server/console/input", data).then(res => {
        if (res.data.status) {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'blue'
          })
          this.cmd = ''
        } else {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'red'
          })
        }
      })
    },
    freshLog: function () {
      let data = new FormData();
      data.append("last", this.lastCount)
      data.append("id", this.$route.params.id)
      this.$axios.post("/server/console", data).then(res => {
        if (res.data.status) {
          this.lastCount = res.data.data.lastid
          this.logs = this.logs.concat(res.data.data.logs)
          if (this.focusnew)
            if (this.$refs.consoleend !== undefined)
              this.$refs.consoleend.scrollIntoView()
        } else {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: res.data.msg,
            color: 'red'
          })
        }
      })
    },
    cleanLog: function () {
      if (this.serverClean) {
        let data = new FormData()
        data.append("id", this.$route.params.id)
        this.$axios.post("/server/console/clean", data).then(res => {
          if (res.data.status) {
            this.$store.dispatch('snackbar/openSnackbar', {
              msg: res.data.msg,
              color: 'blue'
            })
            this.cleanLogMsg = "清空日志"
            this.serverClean = false
          } else {
            this.$store.dispatch('snackbar/openSnackbar', {
              msg: res.data.msg,
              color: 'red'
            })
          }
        })
      } else {
        this.logs = []
        this.cleanLogMsg = "彻底清空日志"
        this.serverClean = true
      }
    }
  },
  created() {
    this.freshLog()
    this.timer = setInterval(() => {
      this.freshLog()
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>