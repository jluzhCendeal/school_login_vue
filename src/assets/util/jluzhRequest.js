/**
 * created by cendeal 2019/3/7
 * 通过vue-jsonp 进行跨域请求数据
 * 所有函数返回的都是promise对象
 * 要求:全局使用vue-jsonp,vuex
 */

// 登陆
function loginjs(token) {
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_auth, {
        token: token,
        callbackName: 'jsonpCallback'
    })

}


// 获取选项
function getSelection() {
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_lines,
        {callbackName: 'jsonpCallback'})
}

// 获取分数
function getScore(grade, term) {
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_score,
        {
            Grade: grade,
            term: term,
            callbackName: 'jsonpCallback'
        })
}

// 获取课表
function getScheduleJs(Grade = null, term = null) {
    let data = {Grade: '0', term: '0', callbackName: 'jsonpCallback'}
    if (Grade != null && term != null) {
        data.Grade = Grade
        data.term = term
    }
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_schedule, data)
}

// 获取当前周
function getCurrentWeek() {
    let data = {callbackName: 'jsonpCallback'}
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_week, data)
}


export {loginjs,getSelection,getScore,getScheduleJs,getCurrentWeek}