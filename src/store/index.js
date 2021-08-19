import Vue from 'vue'
import Vuex from 'vuex'
import md5 from 'js-md5'

Vue.use(Vuex)
import snackbar from "@/plugins/snackbar";

export default new Vuex.Store({
    strict: true,
    state: {
        siteTitle: "EasyCraft",
        isLogin: false,
        userInfo: {}
    },
    getters: {
        avatar: (state) => {
            return state.isLogin ? "https://cn.gravatar.com/avatar/" + md5(state.userInfo.email) : "https://i.loli.net/2021/08/14/mtXc7WeME6vKJQp.png"
        },
        siteTitle(state) {
            return state.siteTitle;
        },
        isLogin: (state) => {
            return state.isLogin
        },
        userInfo: (state) => {
            return state.userInfo
        },
        userTypeStr: (state) => {
            let ret = "未登录";
            switch (state.userInfo.type) {
                case 1:
                    ret = "注册用户"
                    break;
                case 2:
                    ret = "技术员"
                    break;
                case 3:
                    ret = "管理员"
                    break;
                case 4:
                    ret = "超级用户"
                    break;
            }
            return ret
        }
    },
    mutations: {
        onLogin: (state, userInfo) => {
            state.isLogin = true
            state.userInfo = userInfo
        },
        onLogout: (state) => {
            state.isLogin = false
            state.userInfo = {}
        },
        changeTitle: (state, newTitle) => {
            state.siteTitle = newTitle
        }
    },
    actions: {},
    modules: {snackbar}
})
