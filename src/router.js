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
                    component: ()=>import('@/views/home/score/Score')
                },
                {
                    path: 'me',
                    component: ()=>import('@/views/home/me/Me'),

                },
                {
                    path: 'schedule',
                    component: ()=>import('@/views/home/schedule/Schedule')
                }

            ]
        },
        {
            path: '/jluzh/login',
            component: ()=>import('@/views/Login')
        },
        {
            path: '/jluzh/about',
            component: ()=>import('@/views/home/me/pages/About')
        },
        {
            path:'/jluzh/theme',
            component:()=>import('@/views/home/me/pages/ThemeSetting')
        },
        {
            path:'/jluzh/contact',
            component:()=>import('@/views/home/me/pages/Contact')
        },
        {
            path:'/jluzh/cache',
            component:()=>import("@/views/home/me/pages/CacheManager")
        }

    ]
})

export default router