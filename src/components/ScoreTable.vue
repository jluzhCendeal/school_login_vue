<template>

    <mu-paper :z-depth="1">
        <mu-data-table height="100%" :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list">
            <template slot-scope="scope">
                <td>{{scope.row.name}}</td>
                <td class="is-right">{{scope.row.calories}}</td>
                <td class="is-right">{{scope.row.fat}}</td>
                <td class="is-right">{{scope.row.carbs}}</td>
                <td class="is-right">{{scope.row.protein}}</td>
                <td class="is-right">{{scope.row.iron}}%</td>
            </template>
        </mu-data-table>
    </mu-paper>
</template>

<script>
    export default {
        name: "ScoreList",
        props: {
            sort: Object,
            columns: Array,
            list: Array
        },
        methods: {
            handleSortChange({name, order}) {
                this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
            }
        }
    }
</script>

<style scoped>

</style>