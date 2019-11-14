import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/jluzh',
            component: ()=>import('@/views/home/Home'),
            children: [
                {
                    path: 'score',
                    meta: '查询成绩',
                    token: true,
                    component: ()=>import('@/views/home/score/Score')
                },
                {
                    path: 'me',
                    meta: '我',
                    token: true,
                    component: ()=>import('@/views/home/me/Me'),

                },
                {
                    path: 'schedule',
                    meta: '查询课表',
                    token: true,
                    component: ()=>import('@/views/home/schedule/Schedule')
                }

            ]
        },
        {
            path: '/jluzh/login',
            meta: '登录',
            token: false,
            component: ()=>import('@/views/Login')
        },
        {
            path: '/jluzh/about',
            token: false,
            meta: '关于',
            component: ()=>import('@/views/home/me/pages/About')
        },
        {
            path:'/jluzh/theme',
            meta: '主题',
            token: true,
            component:()=>import('@/views/home/me/pages/ThemeSetting')
        },
        {
            path:'/jluzh/contact',
            meta: '联系',
            token: false,
            component:()=>import('@/views/home/me/pages/Contact')
        },
        {
            path:'/jluzh/cache',
            meta: '缓存管理',
            token: true,
            component:()=>import("@/views/home/me/pages/CacheManager")
        }

    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta) {
        document.title = to.meta
    }
    return next()
})
export default router
