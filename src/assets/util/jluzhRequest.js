/**
 * created by cendeal 2019/3/7
 * 通过vue-jsonp 进行跨域请求数据
 * 所有函数返回的都是promise对象
 * 要求:全局使用vue-jsonp,vuex
 */
import axios from 'axios'
// 登陆
function loginjs(token, callbackName = 'jsonpCallback') {
    return this.$jsonp(this.$store.getters.urlPaths.u_auth, {
        token: token,
        callbackName: callbackName
    })
}


// 获取选项
function getSelection(callbackName = 'jsonpCallback') {
    return this.$jsonp(this.$store.getters.urlPaths.u_lines,
        {callbackName: callbackName})
}

// 获取分数
function getScore(grade, term, callbackName = 'jsonpCallback') {
    return this.$jsonp(this.$store.getters.urlPaths.u_score,
        {
            Grade: grade,
            term: term,
            callbackName: callbackName
        })
}

// 获取课表
function getScheduleJs(Grade = null, term = null, callbackName = 'jsonpCallback') {
    let data = {Grade: '0', term: '0', callbackName: callbackName}
    if (Grade != null && term != null) {
        data.Grade = Grade
        data.term = term
    }
    return this.$jsonp(this.$store.getters.urlPaths.u_schedule, data)
}

// 获取当前周
function getCurrentWeek(callbackName = 'jsonpCallback') {
    let data = {callbackName: callbackName}
    return this.$jsonp(this.$store.getters.urlPaths.u_week, data)
}

function getPhoto(token) {

    return axios.get( this.$store.getters.urlPaths.u_head_pic,{
        headers:{
            'Cookie':"token="+token
        },
        withCredentials:true
    })

    // return this.$jsonp(this.$store.getters.urlPaths.u_head_pic,data)

}

export {loginjs, getSelection, getScore, getScheduleJs, getCurrentWeek, getPhoto}