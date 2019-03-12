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
    return Math.floor(future - now)
}

/**
 * 获取当前周的生存时间
 * @return Number  生存时间-秒
 *
 */
function getCurrentWeekExpiration() {
    let now = new Date()
    return calculateExpiration(now,8-now.getDay())
}

/**
 * 获取课表的生存周期
 * @param Number totalWeek-总周数
 * @return Number 生存时间-秒
 */
function getScheduleExpiration(totalWeek=22) {
    let now = new Date()
    return calculateExpiration(now,totalWeek*7)
}

export {getCurrentWeekExpiration,getScheduleExpiration}