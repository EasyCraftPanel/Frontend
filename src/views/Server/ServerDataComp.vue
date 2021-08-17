<template>
  <div>
    <!-- 文本型 -->
    <v-text-field
        v-if="data.type === 'text' || data.type === 'number'"
        :label="data.display"
        v-model="data.value"
        v-bind:readonly="!data.editable"
    />
    <!-- 开关型 -->
    <v-row class="align-center" v-if="data.type === 'toggle'">
      <v-col>
        <span>{{ data.display }}</span>
      </v-col>
      <v-col>
        <v-switch
            v-model="data.value"
            v-bind:disabled="!data.editable"
        ></v-switch>
      </v-col>
    </v-row>
    <!-- 单选按钮 -->
    <div v-if="data.type === 'radio'">
      <p>{{ data.display }}</p>
      <v-radio-group v-bind:disabled="!data.editable">
        <v-radio
            v-for="s in data.selection"
            :key="s.value"
            :value="s.value"
            v-model="data.value"
            :label="s.display"
        ></v-radio>
      </v-radio-group>
    </div>
    <!-- 选择框 -->
    <v-checkbox
        v-if="data.type === 'checkbox'"
        v-model="data.value"
        :label="data.display"
        v-bind:disabled="!data.editable"
    ></v-checkbox>
    <!-- 单选框 -->
    <v-row align="center" v-if="data.type === 'select'">
      <v-col cols="12" md="2">
        <v-subheader> {{ data.display }}</v-subheader>
      </v-col>

      <v-col cols="12" md="10">
        <v-select
            v-bind:disabled="!data.editable"
            v-model="data.value"
            :items="data.selection"
            :label="data.display"
            persistent-hint
            return-object
            single-line
        ></v-select>
      </v-col>
    </v-row>
    <!-- 文本域 -->
    <v-textarea
        v-if="data.type === 'textarea'"
        v-model="data.value"
        :label="data.display"
        v-bind:readonly="!data.editable"
    ></v-textarea>
    <!-- 日期选择 -->
    <div v-if="data.type === 'date'">
      <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="data.value"
              :label="data.display"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="data.value"
            @input="menu = false"
        ></v-date-picker>
      </v-menu>
    </div>
    <!-- 时间选择 - not done -->
    <div v-if="data.type === 'time'">
      <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="data.value"
          persistent
          width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="time"
              :label="data.display"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-if="modal2" v-model="time" full-width>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal2 = false"> Cancel</v-btn>
          <v-btn text color="primary" @click="modal2 = false"> OK</v-btn>
        </v-time-picker>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ServerDataComp',
  props: ['data'],
  data: () => {
    return {
      time: null,
      date: null,
      menu: false,
      modal: false,
      menu2: false,
      modal2: false,
    }
  }
}
</script>