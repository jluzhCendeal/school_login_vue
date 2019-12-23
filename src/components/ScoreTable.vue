<template>
    <div class="table-contain">
        <div class="table-header">
            <span class="total">共{{total}}条数据</span>
            <span style="float: right">
                <mu-avatar size="12" color="green" style="margin: 1px"></mu-avatar>
                <mu-avatar size="12" color="red"></mu-avatar>
            </span>

        </div>

        <mu-paper :z-depth="1">

            <mu-data-table :height="height" :columns="columns"
                           :data="deleteId(list)">
                <template slot-scope="scope">
                    <td>{{scope.row.name}}</td>
                    <td class="is-center">{{scope.row.score}}</td>
                    <td class="is-center">{{scope.row.credit}}</td>
                    <td class="is-center">{{scope.row.gpa}}</td>
                    <td class="is-center">{{scope.row.exam_note}}</td>
                    <td class="is-center">{{scope.row.teacher}}</td>
                    <td class="is-center">{{scope.row.school_year}}</td>
                    <td class="is-center">{{course_type[scope.row.type]}}</td>

                    <td class="is-center">
                        <mu-avatar size="12" v-if="scope.row.percentile >=60" color="green"></mu-avatar>
                        <mu-avatar size="12" v-else color="red"></mu-avatar>
                    </td>
                </template>
            </mu-data-table>
        </mu-paper>
    </div>

</template>

<script>
    export default {
        name: "ScoreTable",
        data: function () {
            return {
                height: (`${document.documentElement.clientHeight}` - 56) * 0.75,
                course_type:{'01':'必修','06':'院公选','03':'选修'},
                columns: [
                    {title: '科目', name: 'name'},
                    {title: '成绩', name: 'score', width: 80, align: 'center'},
                    {title: '学分', name: 'credit', width: 80, align: 'center'},
                    {title: '绩点(gpa)', name: 'gpa', width: 95, align: 'center'},
                    {title: '备注', name: 'exam_note', width: 126, align: 'center'},
                    {title: '老师', name: 'teacher', width: 126, align: 'center'},
                    {title: '学年', name: 'school_year', width: 95, align: 'center'},
                    {title: '类型', name: 'type',width: 95, align: 'center'},
                    {title: '状态', name: 'state', align: 'center'}
                ]
            }
        },
        props: {
            list: Array,
            total:Number
        },
        methods: {
            deleteId(list){
                for (let i of list) {
                    list[i].id = i
                }
                return list
            }

        }
    }
</script>

<style scoped>

</style>
