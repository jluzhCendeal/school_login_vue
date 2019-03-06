function queryScore(grade, term) {
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_score,
        {
            Grade: grade,
            term: term,
            callbackName: 'jsonpCallback'
        })
}

export {queryScore}