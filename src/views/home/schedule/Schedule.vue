<template>
    <div class="table-contain">
        <!--课表主体-->
        <div class="table-main">
            <mu-paper :z-depth="2" style="position:fixed;z-index:999;top: 56px">
                <table class="table-center">
                    <tr class="table-center">
                        <td class="table-first" rowspan="2">
                            {{choose_week}}周
                        </td>
                        <td v-for="w in table_rows_cols.rows.weekdays">
                            {{w}}
                        </td>
                    </tr>
                    <tr class="table-center table-date">
                        <td v-for="d in table_rows_cols.rows.dates" :style="d.color_style">
                            {{d.date}}
                        </td>
                    </tr>
                </table>
            </mu-paper>
            <mu-paper :z-depth="1" style="margin-bottom:30px;position: relative;top: 46px">
                <swiper style="margin: 0px" :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="i in total_week">
                        <table class="table-center">
                            <tr v-for="r in table_rows_cols.cols.courses" class="table-course-head">
                                <td class="table-first">
                                    {{r.time}}
                                </td>
                                <td v-for="(c,index) in r.list" class="course-row" :style="c.color"
                                    v-show="r.show != false"
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
        <mu-button fab small v-show="choose_week!=changeCurrentWeek" :color="float_btn_style.bg"
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
    import ScheduleDetailDialog from '@/components/ScheduleDetailDialog'


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
                total_week: 21,
                current_date: new Date(),
                swiperOption: {
                    on: {
                        transitionStart: () => {
                            if (this.mySwiper.activeIndex != this.page.activate) {
                                if (this.mySwiper.activeIndex - this.mySwiper.previousIndex > 0) {
                                    this.nextPage()

                                } else if (this.mySwiper.activeIndex - this.mySwiper.previousIndex < 0) {
                                    this.prePage()
                                }
                                this.page.activate = this.mySwiper.activeIndex
                                this.page.pre = this.mySwiper.previousIndex
                            }
                        }
                    },
                    effect: 'cube'
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
        created() {
            this.initCourse()
            this.analysisCourse()
            this.calculateDate()
        },
        //监听 同步数据
        computed: {
            mySwiper: function () {
                return this.$refs.mySwiper.swiper
            },
            changeCurrentWeek:function () {
                return this.$store.state.current_week
            }
        },
        watch:{
            changeCurrentWeek:function () {
                this.choose_week = this.changeCurrentWeek
                this.toThisWeek(0)
            }
        },

        mounted() {
            this.toThisWeek(0)
        },

        methods: {
            nextPage: function () {
                this.choose_week += 1
                this.calculateDate(this.choose_week - 1)
                this.analysisCourse()
            },
            prePage: function () {
                this.choose_week -= 1
                this.calculateDate(this.choose_week - 1)
                this.analysisCourse()
            },
            calculateDate(next = 0) {
                let index = this.current_date.getDay()
                let date_rows = this.table_rows_cols.rows.dates

                for (let i in date_rows) {

                    let day = i - index + 1
                    let now = new Date()
                    now.setDate(this.current_date.getDate() + day + next * 7 - (this.changeCurrentWeek - 1) * 7)
                    let month = now.getMonth() + 1
                    let date = now.getDate()

                    if (this.current_date.getMonth() + 1 == month && this.current_date.getDate() == date) {
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
                } else if (name == 'notset') {
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
            initCourse: function () {
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
            analysisCourse: function () {
                let list = JSON.parse(localStorage.getItem('jlu_courses'))
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
                        if (week.length == 2) {
                            max = Number(week[1].replace(/[^0-9]/ig, ''))
                        }

                        if (this.choose_week >= min && this.choose_week <= max) {
                            if (list[i].times_type[index] == 0) {
                                is_now = true
                            } else if (list[i].times_type[index] == 2 && this.choose_week % 2 == 0) {
                                is_now = true
                            } else if (list[i].times_type[index] == 1 && this.choose_week % 2 != 0) {
                                is_now = true
                            }
                            break
                        }
                    }


                    if (numbers.length == 2) {
                        let rows = numbers[1] - numbers[0] + 1
                        let time = Number(numbers[0]) - 1
                        let course = this.table_rows_cols.cols.courses[time]
                        course.rows = rows
                        for (let i = time; i < numbers[1]; i++) {
                            this.table_rows_cols.cols.courses[i].show = false
                        }
                        course.show = true
                        let obj = course['list'][Number(list[i].day) - 1]
                        if (obj.detail != null && (obj.detail.name != list[i].name && !is_now))
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
            }
        }
    }
</script>

<style scoped>
    .table-first {
        text-align: left;
        width: 1%;
    }

    .table-center {
        width: 100%;
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