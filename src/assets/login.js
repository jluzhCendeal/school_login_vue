function loginjs() {
    let token = localStorage.getItem('token')
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_auth, {
        token: token,
        callbackName: 'jsonpCallback'
    })

}



function getSelection() {
    return this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_lines,
        {callbackName: 'jsonpCallback'})
}

export {loginjs, getSelection}
