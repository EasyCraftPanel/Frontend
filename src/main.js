import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import axios from "./plugins/http";
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
    axios,
    router,
    vuetify,
    store,
    Vuex,
    render: h => h(App),
    theme: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        dark: true
    }
}).$mount('#app')


