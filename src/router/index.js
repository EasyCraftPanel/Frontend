import Vue from 'vue'
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter

Vue.use(VueRouter)

// 重复导航报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(failure => {
    if (!isNavigationFailure(failure, NavigationFailureType.duplicated)) {
        console.error(failure)
    }
  })
}
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
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
        component: () => import(/* webpackChunkName: "logout" */ '../views/Logout')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "logout" */ '../views/Index')
    },
    {
        path: '/server/:id',
        name: 'server',
        children: [
            {
                path: 'index',
                component: () => import(/* webpackChunkName: "serverIndex" */ '../views/Server/Index')
            },
            {
                path: 'console',
                component: () => import(/* webpackChunkName: "serverIndex" */ '../views/Server/Console')
            },
            {
                path: 'configs',
                component: () => import(/* webpackChunkName: "serverConfigs" */ '../views/Server/Configs')
            },
            {
                path: 'starter',
                component: () => import(/* webpackChunkName: "serverStarter" */ '../views/Server/Starter')
            },
            {
                path: 'config/:config',
                component: () => import (/* webpackChunkName: "serverConfig" */ '../views/Server/Config')
            }
        ],
        component: () => import(/* webpackChunkName: "server" */ '../views/Server')
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
                query: { redirect: to.fullPath }
            })

        }
    }

});


export default router
