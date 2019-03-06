<template>
    <mu-dialog width="350" height="350" scrollable :open.sync="openDetail" ref="detail_dialog">
        <mu-list style="margin: 0px;padding: 0px">
            <mu-sub-header style="font-size: 12px;margin-top:0px;line-height: 12px;">周·{{detail_title}}
            </mu-sub-header>
            <mu-list-item>
                <mu-list-item-action>
                    <mu-icon value="school" color="red500"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content>
                    <span class="content-name">{{course_detail.name}}</span>
                </mu-list-item-content>
            </mu-list-item>

            <mu-list-item>
                <mu-list-item-action avatar>
                    <mu-icon value="domain" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content>
                    <span class="content-name">{{course_detail.place}}</span>
                </mu-list-item-content>
            </mu-list-item>

            <mu-list-item>
                <mu-list-item-action avatar>
                    <mu-icon value="access_time" color="lime"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content>
                    <span class="content-name">{{course_detail.class_start_to_end}}</span>
                </mu-list-item-content>
            </mu-list-item>

            <mu-list-item>
                <mu-list-item-action avatar>
                    <mu-icon value="date_range" color="pinkA200"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content>
                    <span class="content-name">{{course_detail.weeks_start_to_end}}</span>
                </mu-list-item-content>
            </mu-list-item>

            <mu-list-item>
                <mu-list-item-action avatar>
                    <mu-icon value="person" color="green"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content>
                    <span class="content-name">{{course_detail.teacher}}</span>
                </mu-list-item-content>
            </mu-list-item>

            <mu-list-item>
                <mu-list-item-action avatar>
                    <mu-icon value="flag" color="deepPurple400"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content>
                    <span class="content-name">{{course_type_str[course_detail.typename]}}</span>
                </mu-list-item-content>
            </mu-list-item>


        </mu-list>

        <mu-button style="float: right" flat color="primary" @click="doSomething">我知道了</mu-button>
    </mu-dialog>
</template>

<script>
    export default {
        name: "ScheduleDetailDialog",
        data: function () {
            return {
                course_type_str: {
                    '01': '理论',
                    '02': '实验',
                    '05': '体育',
                    '04': '实践',
                    '03': '上机',
                }
            }
        },
        props: {
            course_detail:Object,
            detail_title:String,
            openDetail:Boolean
        },
        methods:{
            doSomething:function () {
                this.$emit('doSomething')
            }
        }
    }
</script>

<style scoped>

    .content-name {
        word-wrap: break-word;
    }
</style>
