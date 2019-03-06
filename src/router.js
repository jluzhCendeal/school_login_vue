import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home'
import Login from '@/views/Login'
import Me from '@/views/home/me/Me'
import Score from '@/views/home/score/Score'
import Schedule from '@/views/home/schedule/Schedule'
import About from '@/views/home/me/pages/About'
import Theme from '@/views/home/me/pages/ThemeSetting'
import Contact from '@/views/home/me/pages/Contact'
import CacheManager from "@/views/home/me/pages/CacheManager";
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/jluzh',
            component: Home,
            children: [

                {
                    path: 'score',
                    component: Score
                },
                {
                    path: 'me',
                    component: Me,

                },
                {
                    path: 'schedule',
                    component: Schedule
                }

            ]
        },
        {
            path: '/jluzh/login',
            component: Login
        },
        {
            path: '/jluzh/about',
            component: About
        },
        {
            path:'/jluzh/theme',
            component:Theme
        },
        {
            path:'/jluzh/contact',
            component:Contact
        },
        {
            path:'/jluzh/cache',
            component:CacheManager
        }

    ]
})

export default router