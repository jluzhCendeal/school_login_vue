import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
// noinspection JSValidateTypes
const host_name = 'https://www.cendeal.cn:5001/jlu/api'
const store = new Vuex.Store({
    state: {
        app_title: '吉机',
        theme: {
            nav_style: {
                backgroundColor: 'rgb(244, 67, 54)',
                color: 'white',
                'z-index': 999
            },
            nav_active_color: 'green',

            head_pic_style: {
                backgroundColor: '#ffca28',

                'position': 'relative',
                'top': '8px'
            },
            head_text_style: {
                'color': '#7cb342'
            },
            float_btn_style: {
                'bg': 'red',
                'text': 'yellow'
            }
        },
        url_paths: {
            u_login: host_name+'/login',
            u_schedule: host_name+'/querySchedule',
            u_score: host_name+'/queryScore',
            u_week: host_name+'/getCurrentWeek',
            u_lines: host_name+'/getStuTimeLines',
            u_auth: host_name+'/auth',
            u_logout: host_name+'/logout',
            u_head_pic:host_name+'/getPhoto'
        },
        jluzh_courses: '',
        current_week:1,

    },
    getters: {
        navStyle: state => {
            return state.theme.nav_style
        },
        barColor: state => {
            return state.theme.nav_style.backgroundColor
        },
        urlPaths: state => {
            return state.url_paths
        },
        headPicStyle: state => {
            return state.theme.head_pic_style
        },
        headTextStyle: state => {
            return state.theme.head_text_style
        },
        theme: state => {
            return state.theme
        }
    },
    mutations: {
        updateTheme: function (state, theme) {
            if (theme.hasOwnProperty('float_btn_bg'))
                state.theme.float_btn_style.bg = theme.float_btn_bg

            if (theme.hasOwnProperty('float_btn_text_color'))
                state.theme.float_btn_style.text = theme.float_btn_text_color

            if (theme.hasOwnProperty('nav_active_color'))
                state.theme.nav_active_color = theme.nav_active_color

            if (theme.hasOwnProperty("nav_bg"))
                state.theme.nav_style.backgroundColor = theme.nav_bg

            if (theme.hasOwnProperty('nav_text_color'))
                state.theme.nav_style.color = theme.nav_text_color

            if (theme.hasOwnProperty('head_pic_bg'))
                state.theme.head_pic_style.backgroundColor = theme.head_pic_bg

            if (theme.hasOwnProperty('head_pic_text_color'))
                state.theme.head_text_style.color = theme.head_pic_text_color
        },
        initTheme:function () {
            let theme = localStorage.getItem('jluzh_theme')
            if(theme != null || theme != undefined){
                store.commit('updateTheme',JSON.parse(theme))
            }
        },
        updateWeek:function (state,week) {
            state.current_week = week
        },
        updateCourses:function (state,courses) {
            if(courses==null){
                delete localStorage['jluzh_courses']
                delete localStorage['jluzh_current_week']
                delete localStorage['jluzh_total_week']
            }


            state.jluzh_courses = courses
        }
    },
    actions: {}
})
export default store
