class JluzhLocalStorage {

    //获取值
    getItem(key) {

        let now = new Date()
        let data = JSON.parse(localStorage.getItem(key))
        if (data != null) {
            if (data.expiration != null) {
                let expiration = new Date(data.expiration)
                if (expiration - now <= 0) {
                    delete localStorage['key']
                    return undefined
                }

            }

            return data.val
        } else {
            return null
        }


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

    get info() {
        let data = {
            size: 0,
            count: localStorage.length,
            keys: []
        }
        let temp = 0
        for (let i in localStorage) {
            temp += 1

            if (temp > data.count) {
                break
            }
            let blob = new Blob([localStorage[i]])
            data.size += blob.size
            data.keys.push(i)

        }
        return data
    }

}

const jluzhLocalStorage = new JluzhLocalStorage()
export default jluzhLocalStorage