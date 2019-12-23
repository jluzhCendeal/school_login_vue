<template>
    <div class="table-contain" style="position: relative">
        <!--课表主体-->
        <div class="table-main">
            <mu-paper :z-depth="2" style="position:fixed;z-index:10;top: 54px">
                <table class="table-center">
                    <tr class="table-center">
                        <td class="table-first" rowspan="2">
                            {{choose_week}}周
                        </td>
                        <td v-for="(w,index) in table_rows_cols.rows.weekdays" :key="index">
                            {{w}}
                        </td>
                    </tr>
                    <tr class="table-center table-date">
                        <td v-for="(d,index) in table_rows_cols.rows.dates" :key="index" :style="d.color_style">
                            {{d.date}}
                        </td>
                    </tr>
                </table>
            </mu-paper>
            <mu-paper :z-depth="2" style="margin-bottom:30px;position: relative;top: 46px">
                <swiper style="margin: 0" :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="i in 3" :key="i">
                        <table class="table-center">
                            <tr v-for="(r,index) in table_rows_cols.cols.courses" :key="index"
                                class="table-course-head">
                                <td class="table-first">
                                    {{r.time}}
                                </td>
                                <td v-for="(c,index) in r.list" :key="index" class="course-row" :style="c.color"
                                    v-show="r.show"
                                    :rowspan="r.rows"
                                    @click="detail(c.detail,index)">
                                    <span v-show="c.day == index+1">{{c.simple}}</span>
                                </td>
                            </tr>
                        </table>
                    </swiper-slide>
                </swiper>
            </mu-paper>
        </div>

        <!--今天按钮-->
        <mu-button fab small v-show="choose_week!==changeCurrentWeek" :color="float_btn_style.bg"
                   style="position: fixed;bottom: 62px;right:8px;z-index:999" @click="toThisWeek(500)">
            <mu-icon value="今" :color="float_btn_style.text"></mu-icon>
        </mu-button>


        <!--对话详情-->
        <schedule-datail-dialog
                :openDetail="openDetail"
                :detail_title="detail_title"
                :course_detail="course_detail"
                @doSomething="closeDetail">
        </schedule-datail-dialog>
    </div>
</template>

<script>
    //导入vue组件
    import ScheduleDetailDialog from '@/components/ScheduleDetailDialog'
    // 导入js
    import {getScheduleJs, loginjs, getCurrentWeek} from "../../../../assets/util/jluzhRequest";
    import {getScheduleExpiration, getCurrentWeekExpiration} from "../../../../assets/util/jluzhStoreExpiration";


    export default {
        name: "Schedule",
        components: {
            'schedule-datail-dialog': ScheduleDetailDialog
        },
        data() {
            return {
                courses_color_selection: {},
                float_btn_style: this.$store.getters.theme.float_btn_style,
                page: {
                    activate: -1,
                    pre: 1
                },
                date_style: {},
                choose_week: 1,
                table_rows_cols: {
                    rows: {
                        dates: [
                            {date: '1/1', color_style: {}},
                            {date: '1/2', color_style: {}},
                            {date: '1/3', color_style: {}},
                            {date: '1/4', color_style: {}},
                            {date: '1/5', color_style: {}},
                            {date: '1/6', color_style: {}},
                            {date: '1/7', color_style: {}}
                        ],
                        weekdays: ['一', '二', '三', '四', '五', '六', '日']
                    },
                    cols: {
                        courses: []

                    }
                },
                total_week: this.$jluzhLocalStorage.getItem('jluzh_total_week') != null ? this.$jluzhLocalStorage.getItem('jluzh_total_week') : 20,
                current_date: new Date(),
                current_week: this.$jluzhLocalStorage.getItem('jluzh_current_week') != null ? this.$jluzhLocalStorage.getItem('jluzh_current_week') : 1,
                swiperOption: {
                    init: false,

                    on: {
                        transitionStart: () => {
                            if (this.mySwiper.activeIndex !== this.page.activate) {
                                if ((this.mySwiper.activeIndex !== 3 || this.mySwiper.previousIndex !== 0)
                                    && this.mySwiper.activeIndex - this.mySwiper.previousIndex > 0
                                ) {
                                    this.mySwiper.allowSlideNext = this.choose_week <= this.total_week;
                                    if (this.mySwiper.isEnd) {
                                        this.mySwiper.slideNext(500, false)
                                    } else {
                                        this.nextPage()
                                    }
                                } else if ((this.mySwiper.activeIndex !== 1 || this.mySwiper.previousIndex !== 4)
                                    && this.mySwiper.activeIndex - this.mySwiper.previousIndex < 0) {
                                    this.mySwiper.allowSlidePrev = this.choose_week >= 1;
                                    if (this.mySwiper.isBeginning) {
                                        this.mySwiper.slidePrev()
                                    } else {
                                        this.prePage()
                                    }
                                }
                                this.page.activate = this.mySwiper.activeIndex
                                this.page.pre = this.mySwiper.previousIndex
                            }

                        }

                    },
                    effect: 'cube',
                    cubeEffect: {
                        slideShadows: false,
                    },
                },
                openDetail: false,
                detail_title: 'default',
                course_detail: {
                    openDetail: false,
                    name: '',
                    place: '',
                    teacher: '',
                    class_start_to_end: '',
                    weeks_start_to_end: '',
                    typename: ''
                }
            };
        },
        methods: {
            getScheduleExpiration: getScheduleExpiration,
            getCurrentWeekExpiration: getCurrentWeekExpiration,
            login: loginjs,
            getSchedule: getScheduleJs,
            getCurrentWeek: getCurrentWeek,
            callbackSchedule: function (json) {
                if (json.code === 0) {
                    let list = json.data
                    if (list) {
                        this.$jluzhLocalStorage.setItem('jluzh_courses', JSON.stringify(list.list), this.getScheduleExpiration())
                        this.$store.commit('updateCourses', this.$jluzhLocalStorage.getItem('jluzh_courses'))
                        this.$toast.info({message: "更新成功,200！", position: 'top'})
                        this.analysisCourse()
                    } else {
                        this.$toast.info({message: json.msg, position: 'top'})
                    }

                }
            },
            callbackCurrentWeek: function (json) {
                this.$jluzhLocalStorage.setItem('jluzh_current_week', json.weeks, this.getCurrentWeekExpiration())
                this.$jluzhLocalStorage.setItem('jluzh_total_week', json.total_weeks, this.getScheduleExpiration())
                this.$store.commit('updateWeek', Number(json.weeks))
            },
            callbackLogin: function (json) {
                if (json.code === 0) {
                    sessionStorage.setItem('jluzh_is_login', true)
                }

            },

            nextPage: function () {
                if (this.choose_week < this.total_week) {
                    this.choose_week += 1
                    this.calculateDate(this.choose_week - 1)
                    this.analysisCourse()
                }

            },
            prePage: function () {
                if (this.choose_week > 1) {
                    this.choose_week -= 1
                    this.calculateDate(this.choose_week - 1)
                    this.analysisCourse()
                }
            },
            calculateDate(next = 0) {

                let index = this.current_date.getDay() - 1
                if (index < 0) {
                    index = 6
                }
                let date_rows = this.table_rows_cols.rows.dates

                for (let i in date_rows) {

                    let day = i - index
                    let now = new Date()
                    now.setDate(this.current_date.getDate() + day + next * 7 - (this.changeCurrentWeek - 1) * 7)
                    let month = now.getMonth() + 1
                    let date = now.getDate()

                    if (this.current_date.getMonth() + 1 === month && this.current_date.getDate() === date) {
                        date_rows[i].color_style = {backgroundColor: 'pink'}

                    } else {
                        date_rows[i].color_style = {}
                    }

                    date_rows[i].date = (month < 10 ? ('0' + month) : month) + '/' + (date < 10 ? ('0' + date) : date)
                }
            },
            getCourseColor: function (name = null) {
                if (name == null) {
                    return {backgroundColor: 'white'}
                } else if (name === 'notset') {
                    this.courses_color_selection[name] = 'lightgrey'

                } else if (!this.courses_color_selection.hasOwnProperty(name)) {
                    let rgb = (Math.floor(Math.random() * 0xffffff))
                    while (rgb <= 0x808080) {
                        rgb = (Math.floor(Math.random() * 0xffffff))
                    }
                    this.courses_color_selection[name] = '#' + rgb.toString(16);
                }
                return {backgroundColor: this.courses_color_selection[name]}
            },
            closeDetail() {
                this.openDetail = false
            },
            detail(obj, index) {
                if (obj != null) {
                    this.openDetail = true
                    this.detail_title = this.table_rows_cols.rows.weekdays[index]
                    this.course_detail = obj
                }
            },
            toThisWeek: function (times = 500) {
                this.mySwiper.slideTo(this.changeCurrentWeek - 1, times);
                this.choose_week = this.changeCurrentWeek
                this.calculateDate(this.choose_week - 1)
                this.analysisCourse()

            },
            initCurrentWeek: async function () {
                let current = this.$jluzhLocalStorage.getItem('jluzh_current_week')
                if (current == null) {
                    await this.getCurrentWeek('callbackCurrentWeek').then(this.callbackCurrentWeek)
                } else {
                    this.$store.commit('updateWeek', Number(current))
                }
                this.choose_week = this.changeCurrentWeek

            },
            initCourse: function () {
                this.table_rows_cols.cols.courses = []
                for (let i = 0; i < 12; i++) {
                    let courserObj = {
                        time: String(i + 1),
                        show: true,
                        rows: 1,
                        list: [
                            {day: '1', simple: '', detail: null, color: this.getCourseColor()},
                            {day: '2', simple: '', detail: null, color: this.getCourseColor()},
                            {day: '3', simple: '', detail: null, color: this.getCourseColor()},
                            {day: '4', simple: '', detail: null, color: this.getCourseColor()},
                            {day: '5', simple: '', detail: null, color: this.getCourseColor()},
                            {day: '6', simple: '', detail: null, color: this.getCourseColor()},
                            {day: '7', simple: '', detail: null, color: this.getCourseColor()},
                        ],
                    }
                    this.table_rows_cols.cols.courses.push(courserObj)
                }
            },
            beforeAnalysis: function () {
                let course = this.$jluzhLocalStorage.getItem('jluzh_courses')
                if (!course) {
                    let is_login = sessionStorage.getItem('jluzh_is_login')
                    let grade = this.$jluzhLocalStorage.getItem('schedule_grade')
                    let term = this.$jluzhLocalStorage.getItem('schedule_term')
                    this.initCourse()
                    if (is_login) {
                        this.getSchedule(grade, term, 'callbackSchedule')
                            .then(this.callbackSchedule)
                    } else {
                        // 检测是否已经绑定
                        let token = this.$jluzhLocalStorage.getItem('token')
                        if (token != null) {
                            this.login(token, 'callbackLogin')
                                .then(this.callbackLogin)
                        } else {
                            this.$toast.info({message: '未绑定！', position: 'top'})
                        }
                    }
                } else {
                    this.$store.commit('updateCourses', course)
                    this.initCurrentWeek()
                    this.analysisCourse()
                }
            },
            analysisCourse: function () {
                try {
                    let list = JSON.parse(this.changeScheduleData)
                    let temp = sessionStorage.getItem('courses_color_selection')
                    if (temp != null) {
                        this.courses_color_selection = JSON.parse(temp)
                    }
                    for (let i in list) {
                        let numbers = list[i].class_start_to_end.split('-')
                        let weeks = list[i].weeks_start_to_end
                        let is_now = false
                        for (let index in weeks) {
                            let week = weeks[index].replace('周', '').split('-')
                            let min = Number(week[0])
                            let max = min
                            if (week.length === 2) {
                                max = Number(week[1].replace(/[^0-9]/ig, ''))
                            }
                            if (this.choose_week >= min && this.choose_week <= max) {
                                if (list[i].times_type[index] === 0) {
                                    is_now = true
                                } else if (list[i].times_type[index] === 2 && this.choose_week % 2 === 0) {
                                    is_now = true
                                } else if (list[i].times_type[index] === 1 && this.choose_week % 2 !== 0) {
                                    is_now = true
                                }
                                break
                            }
                        }

                        if (numbers.length === 2) {
                            let rows = numbers[1] - numbers[0] + 1
                            let time = Number(numbers[0]) - 1
                            let course = this.table_rows_cols.cols.courses[time]
                            course.rows = rows
                            for (let i = time; i < numbers[1]; i++) {
                                this.table_rows_cols.cols.courses[i].show = false
                            }
                            course.show = true
                            let obj = course['list'][Number(list[i].day) - 1]
                            if (obj.detail != null && (obj.detail.name !== list[i].name && !is_now))
                                continue

                            obj.simple = list[i].name + '|' + list[i].place
                            if (is_now) {
                                obj.color = this.getCourseColor(list[i].name)
                            } else {
                                obj.color = this.getCourseColor('notset')
                            }
                            obj.detail = list[i]
                            obj.detail.weeks_start_to_end = String(obj.detail.weeks_start_to_end).replace('"', '')

                        }
                    }
                    sessionStorage.setItem('courses_color_selection', JSON.stringify(this.courses_color_selection))

                } catch (err) {
                    return err
                }
            }
        },

        //监听 同步数据
        computed: {
            mySwiper: function () {
                return this.$refs.mySwiper.swiper
            },
            changeCurrentWeek: function () {
                return this.$store.state.theme.current_week
            },
            changeScheduleData: function () {
                return this.$store.state.theme.jluzh_courses
            }
        },
        watch: {
            changeCurrentWeek: function () {
                this.choose_week = this.changeCurrentWeek
                this.toThisWeek(0)
            },
            changeScheduleData: function () {
                this.beforeAnalysis()
            }
        },
        created() {
            this.initCourse()
            this.beforeAnalysis()
            this.calculateDate()

        },
        mounted() {
            this.mySwiper.params.loop = true
            this.mySwiper.init()
            this.toThisWeek(0)
        },
    }

</script>

<style scoped>
    .table-first {
        text-align: left;
        width: 1%;
    }

    .table-center {
        width: 100vw;
        text-align: center;
    }

    .table-date {
        font-size: x-small;
    }

    .course-row {
        background-color: lightgrey;
        color: white;
        width: 50px;
        height: 100px;
        font-size: small;
        word-wrap: break-word;
        border-radius: 5px;
    }
</style>
