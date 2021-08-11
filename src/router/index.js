import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            noAuth: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () => import('../views/Logout')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (!to.meta.noAuth) {  // 判断该路由是否需要登录权限
        if (localStorage.token) {  // 获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: {redirect: to.fullPath}
            })
        }
    } else { // 如果不需要权限校验，直接进入路由界面
        next();
    }
});


export default router
