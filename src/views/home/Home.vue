<template>
    <div>
        <mu-appbar style="width: 100%;" :title="app_title" :color="bar_color">
            <mu-menu slot="right">
                <mu-button flat @click="closeBottomSheet">菜单</mu-button>
            </mu-menu>
        </mu-appbar>


        <mu-list style="margin-top: 0px;padding: 0px">
            <div ref="main" v-resize="resize">
                <router-view></router-view>
            </div>
        </mu-list>


        <div ref="nav">
            <mu-bottom-nav :color="nav_active_color" :style="nav_style" :value.sync="shift">
                <mu-bottom-nav-item value="schedule" title="课表" to="/jluzh/schedule" icon="view_list" replace>
                </mu-bottom-nav-item>
                <mu-bottom-nav-item value="score" title="分数" icon="insert_chart_outlined" to="/jluzh/score" replace>
                </mu-bottom-nav-item>
                <mu-bottom-nav-item value="me" title="我" icon="person" to="/jluzh/me" replace>
                </mu-bottom-nav-item>
            </mu-bottom-nav>
        </div>

        <mu-bottom-sheet :open.sync="open">
            <mu-list @item-click="closeBottomSheet">
                <mu-sub-header>选择你的操作</mu-sub-header>
                <mu-list-item id="update" button @click="updateSchedule">
                    <mu-list-item-action>
                        <mu-icon value="update" color="orange"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>更新课表</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button @click="closeSelectionDialog">
                    <mu-list-item-action>
                        <mu-icon value="local_florist" color="red"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>选择学期</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>

        <mu-dialog title="选择学期" width="360" :open.sync="selection_dialog">
            <selection
                    :grades="getNames(selection_data.Grades,1)"
                    :terms="getNames(selection_data.terms,1)"
                    :user="user"
                    btn_name="确定"
                    @doSomething="nextDo">
            </selection>
        </mu-dialog>


    </div>

</template>

<script>
    import {loginjs} from '@/assets/login.js'
    import {getScheduleJs, getCurrentWeek} from '@/assets/getSchedule'
    import Selection from '@/components/Selection'

    export default {
        name: "Home",
        components: {
            'selection': Selection
        },
        data: function () {
            return {
                app_title: this.$store.state.app_title,
                nav_style: this.$store.getters.navStyle,
                bar_color: this.$store.getters.barColor,
                nav_active_color: this.$store.getters.theme.nav_active_color,
                shift: '',
                height: `${document.documentElement.clientHeight}`,
                open: false,
                selection_dialog: false,
                selection_data: {
                    Grades: [],
                    terms: [],
                },
                user: {
                    grade: '',
                    term: '',
                }
            }
        },
        methods: {
            jsonpCallback: json => {
            },
            loginjs: loginjs,
            resize() {
                this.height = `${document.documentElement.clientHeight}`
                this.$refs.main.style.height = (this.height - 56 * 2) + 'px';
            },
            getScheduleJs: getScheduleJs,
            getCurrentWeek: getCurrentWeek,

            callback: function (json) {
                if (json.code == 0) {
                    let list = json.data
                    if (list != undefined) {
                        localStorage.setItem('jlu_courses', JSON.stringify(list.list))
                        location.reload()
                        this.$toast.info({message: "更新成功！", position: 'top'})
                    } else {
                        this.$toast.info({message: json.msg, position: 'top'})
                    }

                }
            },
            callbackCurrentWeek: function (json) {
                this.$store.commit('updateWeek', Number(json.weeks))
            },
            callbackLogin: function (json) {
                this.$progress.done()
                sessionStorage.setItem('token', 'true')
            },
            closeBottomSheet() {
                this.open = !this.open
            },
            updateSchedule: function () {
                let Grade = localStorage.getItem('schedule_grade')
                let term = localStorage.getItem('schedule_term')
                this.getScheduleJs(Grade, term).then(this.callback)
            },
            closeSelectionDialog() {
                this.selection_dialog = !this.selection_dialog
                if (this.selection_dialog) {
                    this.initSelection()
                }

            },
            nextDo() {
                localStorage.setItem('schedule_grade', this.user.grade + 1)
                localStorage.setItem('schedule_term', this.user.term + 1)
                this.updateSchedule()
            },
            getNames: function (obj, index = 0) {
                let keys = []
                for (let i = index; i < obj.length; i++) {
                    keys.push(Object.keys(obj[i])[0])
                }
                return keys
            },
            initSelection() {
                let temp = sessionStorage.getItem('home_selection')
                if (temp != null || temp != undefined) {
                    this.selection_data = JSON.parse(temp)
                    this.user.grade = this.selection_data.current.Grade - 1
                    this.user.term = this.selection_data.current.term - 1
                } else {
                    this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_lines,
                        {callbackName: 'jsonpCallback'}).then(json => {
                        if (json.code == 0) {
                            sessionStorage.setItem('home_selection', JSON.stringify(json.data))
                            this.selection_data = json.data
                        }
                    })
                }
            },
            initSchedule: function () {
                let temp = localStorage.getItem('jlu_courses')
                if (temp == null || temp == undefined) {
                    this.getScheduleJs().then(this.callback)
                }
            }
        },
        created() {},
        mounted() {
            this.getCurrentWeek()
                .then(this.callbackCurrentWeek).then(
                () => {
                    this.$progress.start()
                    this.loginjs().then(this.callbackLogin)
                        .then(this.initSchedule)
                }
            )




            let height = `${document.documentElement.clientHeight}`
            this.$refs.main.style.height = (height - 56 * 2) + 'px';
            let shifts = this.$router.history.current.path
            let point_to = {
                '/jluzh/schedule': 'schedule',
                '/jluzh/score': 'score',
                '/jluzh/me': 'me'
            }

            let current_state = point_to[shifts]
            if (current_state == undefined) {
                current_state = 'schedule'
                this.$router.push('/jluzh/schedule')
            }
            this.shift = current_state


        }
    }
</script>
<style scoped>

</style>