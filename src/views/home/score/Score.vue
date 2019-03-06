<template>
    <div class="score">



        <score-selection :grades="getNames(grades)"
                         :terms="getNames(terms)"
                         :user="user"
                         btn_name="查询"
                         @doSomething="openFullscreenDialog">
        </score-selection>
        <overlay :progress="progress"></overlay>
        <div class="score-show" >
            <mu-dialog   transition="slide-bottom" lock-scroll scrollable fullscreen :open.sync="openFullscreen">

                <mu-appbar color="red500" v-bind:title="dialog_title">
                    <mu-button slot="right" flat @click="closeFullscreenDialog">
                        <mu-icon value="close"></mu-icon>
                    </mu-button>
                </mu-appbar>
                <div style="padding: 24px;" >

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
    import ScoreTable from '@/components/ScoreTable'
    import ScoreSelection from '@/components/Selection'
    import ScoreTotalBoard from '@/components/ScoreTotalBoard'
    import Overlay from '@/components/Overlay'


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
                progress: false
            }

        },
        methods: {
            jsonpCallback: function (json) {},
            setSelection: function (selection) {
                this.grades = selection.Grades
                this.terms = selection.terms
                this.user.grade = selection.current.Grade
                this.user.term = selection.current.term
            },
            callbackScore:json => {
                    if (json.code == 0) {
                        this.list = json.data.list
                        this.others = json.data.others
                        this.total = json.data.total
                        this.dialog_title = this.getKey(this.grades[this.user.grade]) + '·' + this.getKey(this.terms[this.user.term])
                        this.openFullscreen = true
                    } else {
                        this.$toast.info({message: '查询失败!', position: 'top'})
                    }
            },
            getGrade: function () {

                let temp = sessionStorage.getItem('score_selection')

                if (temp != null||temp!=undefined) {
                    let selection = JSON.parse(temp)
                    this.setSelection(selection)
                }else{
                    this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_lines,
                        {callbackName: 'jsonpCallback'}).then(json => {
                        if (json.code == 0) {
                            sessionStorage.setItem('score_selection', JSON.stringify(json.data))
                            this.setSelection(json.data)

                        }
                    })
                }
            },
            getNames: function (obj) {
                let keys = []
                for (let index in obj) {
                    keys.push(Object.keys(obj[index])[0])
                }
                return keys
            },
            openFullscreenDialog() {
                this.progress = true
                try {
                    if(localStorage.getItem('token')!=undefined){
                        this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_score,
                            {
                                Grade: this.user.grade,
                                term: this.user.term,
                                callbackName: 'jsonpCallback'
                            }).then(json => {
                            if (json.code == 0) {
                                this.list = json.data.list
                                this.others = json.data.others
                                this.total = json.data.total
                                this.dialog_title = this.getKey(this.grades[this.user.grade]) + '·' + this.getKey(this.terms[this.user.term])
                                this.openFullscreen = true
                            } else {
                                this.$toast.info({message: '查询失败!', position: 'top'})
                            }

                        }).catch(() => {
                            this.$toast.info({message:  '网络超时，稍后再试！', position: 'top'})
                        }).finally(() => {
                                this.progress = false
                            }
                        )
                    }
                    else {
                        this.progress = false
                        this.$toast.info({message: '未绑定!', position: 'top'})
                    }
                } catch (e) {
                    this.$toast.info({message: '网络超时，稍后再试！', position: 'top'})
                }

            },
            getKey: (obj, index = 0) => {
                return Object.keys(obj)[index]
            },
            closeFullscreenDialog() {
                this.openFullscreen = false;
            }
        },
        mounted() {
            this.getGrade()
        },
        created() {

        }
    }
</script>

<style>
    .score{
        margin-right: 8px;
        margin-left: 8px;
    }

     .mu-dialog-body{
         max-height:100vh !important;
     }

</style>