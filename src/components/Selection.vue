<template>
    <div class="selection">

        <mu-row gutter>
            <mu-col fluid>
                <mu-select label="年级" v-model="user.grade" full-width>
                    <mu-option v-for="grade,index in grades" avatar :key="grade" :label="grade"
                               :value="index">
                        <mu-list-item-action avatar>
                            <mu-avatar :size="36" color="primary">
                                {{grade.substring(1, 2)}}
                            </mu-avatar>
                        </mu-list-item-action>
                        <mu-list-item-content>
                            <mu-list-item-title>{{grade}}</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-option>
                </mu-select>

                <mu-select label="学期" v-model="user.term" full-width>
                    <mu-option v-for="term,index in terms" avatar :key="term" :label="term"
                               :value="index">
                        <mu-list-item-action avatar>
                            <mu-avatar :size="36" color="primary">
                                {{term.substring(1, 2)}}
                            </mu-avatar>
                        </mu-list-item-action>
                        <mu-list-item-content>
                            <mu-list-item-title>{{term}}</mu-list-item-title>
                        </mu-list-item-content>
                    </mu-option>
                </mu-select>
            </mu-col>
        </mu-row>
        <mu-flex justify-content="center" align-items="center">
            <mu-button round color="red" @click="doSomething">查询</mu-button>
        </mu-flex>
    </div>
</template>

<script>
    export default {
        name: "ScoreSelection",
        props:{
            grades: Array,
            terms:Array,
            user: Object,
        },
        methods:{
            doSomething:function () {
                this.$emit("doSomething")
            }

        }
    }
</script>

<style scoped>

</style>