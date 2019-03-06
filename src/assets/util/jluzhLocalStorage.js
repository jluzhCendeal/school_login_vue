class JluzhLocalStorage {

    //获取值
    getItem(key) {
        let now = new Date()
        let data = JSON.parse(localStorage.getItem(key))
        if (data.expiration != null) {
            let expiration = new Date(data.expiration)
            if (expiration - now <= 0) {
                delete localStorage['key']
                return undefined
            }
        }

        return data.val
    }

    //默认无限时间
    setItem(key, val, expiration = null) {
        let time = null
        if (expiration != null) {
            let now = new Date()
            time = now.setSeconds(now.getSeconds() + expiration)
        }
        let data = {val: val, expiration: time}
        localStorage.setItem(key, JSON.stringify(data))
    }

    //清空
    clear() {
        localStorage.clear()
    }

    //获取长度
    get length() {
        return localStorage.length
    }

}

const jluzhLocalStorage = new JluzhLocalStorage()
export default jluzhLocalStorage