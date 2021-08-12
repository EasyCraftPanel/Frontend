import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            Auth: false
        }
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            Auth: false
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('../views/Logout')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (window.localStorage.token) {
        next();
    } else {
        if (Object.prototype.hasOwnProperty.call(to.meta, "Auth") && !to.meta.Auth) {
            next()
        } else {
            next({
                path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: {redirect: to.fullPath}
            })

        }
    }

});


export default router
