<template>
  <div>
    <!-- 文本型 -->
    <v-row
        v-if="data.type === 'text' || data.type === 'number'">
      <v-col cols="12" md="2">
        <v-subheader> {{ data.display }}</v-subheader>
      </v-col>
      <v-col cols="12" md="10">
        <v-text-field
            :placeholder="data.display"
            v-model="data.value"
            :readonly="data.noedit"
        />
      </v-col>
    </v-row>
    <!-- 开关型 -->
    <v-row class="align-center" v-if="data.type === 'toggle'">
      <v-col cols="12" md="2">
        <v-subheader> {{ data.display }}</v-subheader>
      </v-col>
      <v-col cols="12" md="10">
        <v-switch
            v-model="data.value"
            :disabled="data.noedit"
        ></v-switch>
      </v-col>
    </v-row>
    <!-- 单选按钮 -->
    <v-row v-if="data.type === 'radio'">
      <v-col cols="12" md="2">
        <v-subheader> {{ data.display }}</v-subheader>
      </v-col>
      <v-col cols="12" md="10">
        <v-radio-group :disabled="data.noedit">
          <v-radio
              v-for="s in data.selection"
              :key="s.value"
              :value="s.value"
              v-model="data.value"
              :label="s.display"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <!-- 选择框 -->
    <v-row v-if="data.type === 'checkbox'">
      <v-col cols="12" md="2">
        <v-subheader> {{ data.display }}</v-subheader>
      </v-col>
      <v-col cols="12" md="10">
        <v-checkbox
            v-model="data.value"
            :label="data.display"
            :disabled="data.noedit"
        ></v-checkbox>
      </v-col>
    </v-row>
    <!-- 单选框 -->
    <v-row align="center" v-if="data.type === 'select'">
      <v-col cols="12" md="2">
        <v-subheader> {{ data.display }}</v-subheader>
      </v-col>

      <v-col cols="12" md="10">
        <v-select
            :disabled="data.noedit"
            v-model="data.value"
            item-text="display"
            item-value="value"
            :items="data.selection"
            :label="data.display"
            persistent-hint
            single-line
        ></v-select>
      </v-col>
    </v-row>
    <!-- 文本域 -->
    <v-textarea
        v-if="data.type === 'textarea'"
        v-model="data.value"
        :label="data.display"
        :readonly="data.noedit"
    ></v-textarea>
    <!-- 日期选择 -->
    <v-row v-if="data.type === 'date'">
      <v-col cols="12" md="2">
        <v-subheader> {{ data.display }}</v-subheader>
      </v-col>
      <v-col cols="12" md="10">
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
                :placeholder="data.display"
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
      </v-col>
    </v-row>
    <!-- 时间选择 - not done -->
    <v-row v-if="data.type === 'time'">
      <v-col cols="12" md="2">
        <v-subheader> {{ data.display }}</v-subheader>
      </v-col>
      <v-col cols="12" md="10">
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
      </v-col>
    </v-row>
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