function getSessionStorageInfo() {
    let info = {
        size:0,
        count:sessionStorage.length,
        keys:[]
    }
    let temp = 0
    for(let i in sessionStorage){
        temp+=1
        if(temp>info.count){
            break
        }
        let blob = new Blob([sessionStorage[i]])
        info.size+=blob.size
        info.keys.push(i)
    }
    return info
}

export {getSessionStorageInfo}