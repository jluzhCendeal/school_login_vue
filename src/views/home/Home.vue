<template>
    <div>
        <mu-appbar :style="'width: 100%;color:'+nav_style.color" :title="app_title" :color="bar_color">
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
    import Selection from '@/components/Selection'
    // 导入js
    import {getSelection} from "../../assets/util/jluzhRequest";
    import {getScheduleExpiration} from "../../assets/util/jluzhStoreExpiration";

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
            resize() {
                this.height = `${document.documentElement.clientHeight}`
                this.$refs.main.style.height = (this.height - 56 * 2) + 'px';
            },

            getSelection: getSelection,
            getScheduleExpiration: getScheduleExpiration,

            callbackSelection: function (json) {
                if (json.code == 0) {
                    this.$jluzhLocalStorage.setItem('score_selection', JSON.stringify(json.data), this.getScheduleExpiration())
                    this.selection_data = json.data
                }
            },
            callbackLogin: function (json) {
                if (json.code == 0) {
                    sessionStorage.setItem('jluzh_is_login', true)
                }

            },

            getNames: function (obj, index = 0) {
                let keys = []
                for (let i = index; i < obj.length; i++) {
                    keys.push(Object.keys(obj[i])[0])
                }
                return keys
            },

            closeBottomSheet() {
                this.open = !this.open
            },
            closeSelectionDialog() {
                this.selection_dialog = !this.selection_dialog
                if (this.selection_dialog) {
                    this.initSelection()
                }

            },
            updateSchedule: function () {
                this.$store.commit('updateCourses', null)
            },


            //修改时间：2019/3/7
            nextDo() {
                this.$jluzhLocalStorage.setItem('schedule_grade', this.user.grade + 1,this.getScheduleExpiration())
                this.$jluzhLocalStorage.setItem('schedule_term', this.user.term + 1,this.getScheduleExpiration())
                this.selection_dialog=false
                this.updateSchedule()
            },

            initSelection() {
                let temp = this.$jluzhLocalStorage.getItem('score_selection')
                if (temp != null || temp != undefined) {
                    this.selection_data = JSON.parse(temp)
                    this.user.grade = this.selection_data.current.Grade - 1
                    this.user.term = this.selection_data.current.term - 1
                } else {
                    let is_login = sessionStorage.getItem('jluzh_is_login')
                    if (is_login != null || is_login != undefined) {
                        this.getSelection().then(this.callbackSelection)
                    } else {
                        this.login()
                            .then(this.callbackLogin)
                            .then(() => {
                                this.getSelection().then(this.callbackSelection)
                            })
                    }
                }
            }
        },
        created() {
            this.$store.commit('initTheme')
        },
        mounted() {

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