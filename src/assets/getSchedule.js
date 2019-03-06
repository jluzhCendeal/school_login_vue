function getScheduleJs(Grade = null, term = null) {
    let data = {Grade: '0', term: '0', callbackName: 'jsonpCallback'}
    if (Grade != null && term != null) {
        data.Grade = Grade
        data.term = term
    }
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_schedule, data)
}


function getCurrentWeek() {
    let data = {callbackName: 'jsonpCallback'}
    let that = this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_week, data)
    return that
}

export {getScheduleJs, getCurrentWeek}