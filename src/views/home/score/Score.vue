<template>
    <div class="score">

        <score-selection :grades="getNames(grades)"
                         :terms="getNames(terms)"
                         :user="user"
                         btn_name="查询"
                         @doSomething="openFullscreenDialog">
        </score-selection>

        <overlay :progress="progress"></overlay>

        <div class="score-show">
            <mu-dialog transition="slide-bottom" lock-scroll scrollable fullscreen :open.sync="openFullscreen">
                <mu-appbar :color="navStyle.backgroundColor" :style="{color:navStyle.color}" v-bind:title="dialog_title">
                    <mu-button slot="right" flat @click="closeFullscreenDialog">
                        <mu-icon value="close"></mu-icon>
                    </mu-button>
                </mu-appbar>
                <div style="padding: 24px;">

                    <score-table
                            :total="total"
                            :list="list">
                    </score-table>
                    <score-total-board :others="others"></score-total-board>
                </div>
            </mu-dialog>
        </div>
    </div>
</template>

<script>

    // 导入vue组件
    import ScoreTable from '@/components/ScoreTable'
    import ScoreSelection from '@/components/Selection'
    import ScoreTotalBoard from '@/components/ScoreTotalBoard'
    import Overlay from '@/components/Overlay'

    // 导入js
    import {getSelection, getScore, loginjs} from "../../../assets/util/jluzhRequest";
    import {getScheduleExpiration} from "../../../assets/util/jluzhStoreExpiration";

    export default {
        name: "Score",
        components: {
            'score-table': ScoreTable,
            'score-selection': ScoreSelection,
            'score-total-board': ScoreTotalBoard,
            'overlay': Overlay
        },
        data() {
            return {
                grades: [],
                terms: [],
                user: {
                    grade: '',
                    term: '',
                },
                openFullscreen: false,
                dialog_title: 'default',
                list: [],
                total: 0,
                others: {},
                progress: false,
                navStyle: this.$store.getters.navStyle
            }

        },
        methods: {
            getScheduleExpiration: getScheduleExpiration,
            getSelection: getSelection,
            getScore: getScore,
            login: loginjs,

            setSelection: function (selection) {
                this.grades = selection.Grades
                this.terms = selection.terms
                this.user.grade = selection.current.Grade
                this.user.term = selection.current.term
            },
            callbackLogin: function (json) {
                if (json.code === 0) {
                    sessionStorage.setItem('jluzh_is_login', true)
                }

            },
            callbackScore: function (json) {
                this.progress = false
                if (json.code === 0) {
                    this.list = json.data.list
                    this.others = json.data.others
                    this.total = json.data.total
                    this.dialog_title = this.getKey(this.grades[this.user.grade]) + '·' + this.getKey(this.terms[this.user.term])
                    this.openFullscreen = true
                } else {
                    this.$toast.info({message: '查询失败!', position: 'top'})
                }
            },
            callbackSelection: function (json) {
                if (json.code === 0) {
                    this.$jluzhLocalStorage.setItem(
                        'score_selection',
                        JSON.stringify(json.data),
                        this.getScheduleExpiration())
                    this.setSelection(json.data)
                }
            },

            getNames: function (obj) {
                let keys = []
                for (let index in obj) {
                    keys.push(Object.keys(obj[index])[0])
                }
                return keys
            },
            getKey: (obj, index = 0) => {
                return Object.keys(obj)[index]
            },


            getGrade: function () {
                let temp = this.$jluzhLocalStorage.getItem('score_selection')
                if (temp) {
                    let selection = JSON.parse(temp)
                    this.setSelection(selection)
                } else {
                    let is_login = sessionStorage.getItem('jluzh_is_login')
                    if (is_login) {
                        this.getSelection('callbackSelection')
                            .then(this.callbackSelection)
                    } else {
                        let token = this.$jluzhLocalStorage.getItem('token')
                        if (token != null) {
                            this.login(token,'callbackLogin')
                                .then(this.callbackLogin)
                                .then(() => {
                                    this.getSelection('callbackSelection')
                                        .then(this.callbackSelection)
                                })
                        } else {
                            this.$toast.info({message: '未绑定！', position: 'top'})
                        }
                    }
                }
            },

            openFullscreenDialog() {
                this.progress = true
                let is_login = sessionStorage.getItem('jluzh_is_login')
                if (is_login) {
                    this.getScore(this.user.grade, this.user.term,'callbackScore')
                        .then(this.callbackScore).catch(() =>{
                        this.progress = false
                        this.$toast.info({message: '查询失败!', position: 'top'})
                    }).then(()=>{
                        this.progress = false
                    })
                } else {
                    let token = this.$jluzhLocalStorage.getItem('token')
                    if (token != null) {
                        this.login(token,'callbackLogin')
                            .then(this.callbackLogin)
                            .then(() => {
                                this.getScore(this.user.grade, this.user.term,'callbackScore')
                                    .then(this.callbackScore).catch(() =>{
                                    this.progress = false
                                    this.$toast.info({message: '查询失败!', position: 'top'})
                                })
                            }).then( ()=> {
                            this.progress = false
                        })
                    } else {
                        this.progress = false
                        this.$toast.info({message: '未绑定!', position: 'top'})
                    }
                }
            },
            closeFullscreenDialog() {
                this.openFullscreen = false;
            }
        },
        mounted() {
            this.getGrade()
        }
    }
</script>

<style scoped>
    .score {
        margin-right: 8px;
        margin-left: 8px;
    }

    .mu-dialog-body {
        max-height: 100vh !important;
    }

</style>
