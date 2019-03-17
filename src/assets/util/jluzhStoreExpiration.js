/**
 * 计算生存时间
 * @param Date now-当前时间
 * @param Number day-天数
 * @return Number
 */
function calculateExpiration(now,day) {
    let future = new Date()
    future.setHours(0,0,0,0)
    future.setDate(now.getDate()+day)

    return Math.floor((future - now)/1000)
}

/**
 * 获取当前周的生存时间
 * @return Number  生存时间-秒
 *
 */
function getCurrentWeekExpiration() {
    let now = new Date()
    let day=now.getDay()-1
    if(day<0){
        day=6
    }
    return calculateExpiration(now,7-day)
}

/**
 * 获取课表的生存周期
 * @param Number totalWeek-总周数
 * @return Number 生存时间-秒
 */
function getScheduleExpiration(totalWeek=21) {
    let now = new Date()
    return calculateExpiration(now,totalWeek*7)
}

export {getCurrentWeekExpiration,getScheduleExpiration}