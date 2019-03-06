<template>
    <div class="score-total" style="padding: 10px;height: 25%">
        <mu-row>
            <mu-col span="4" style="font-size: smaller">
                <!--<mu-flex justify-content="center" align-items="center">-->
                总学分:
                <mu-badge :content="String(others.total_credit[0])" color="blue"></mu-badge>
                <!--</mu-flex>-->
            </mu-col>
            <mu-col span="4" style="font-size: smaller">

                平均绩点:
                <mu-badge :content="String(others.per_gpa)" color="blue" ></mu-badge>

            </mu-col>

            <mu-col span="4" style="font-size: smaller">

                平均成绩:
                <mu-badge :content="String(others.per_percentile)" color="blue"></mu-badge>

            </mu-col>
        </mu-row>
        <mu-divider></mu-divider>

        <mu-row>
            <mu-col span="4">
                <mu-flex justify-content="center" align-items="center" style="font-size: smaller">
                    必修
                    <mu-button small fab color="success" style="margin: 2px" @click="show(true,others.required_credit,'必修')">
                        {{others.required_credit[0]}}
                    </mu-button>

                    <mu-button small fab color="deepOrange900" style="margin: 2px" @click="show(false,others.required_credit,'必修')">
                        {{others.required_credit[1]}}
                    </mu-button>
                </mu-flex>
            </mu-col>
            <mu-col span="4">
                <mu-flex justify-content="center" align-items="center" style="font-size: smaller">
                    选修
                    <mu-button small fab color="success" style="margin: 2px" @click="show(true,others.selected_major_credit,'选修')">
                        {{others.selected_major_credit[0]}}
                    </mu-button>

                    <mu-button small fab color="deepOrange900" style="margin: 2px" @click="show(false,others.selected_major_credit,'选修')">
                        {{others.selected_major_credit[1]}}
                    </mu-button>


                </mu-flex>
            </mu-col>

            <mu-col span="4">
                <mu-flex justify-content="center" align-items="center" style="font-size: smaller">
                    公选
                    <mu-button small fab color="success" style="margin: 2px" @click="show(true,others.public_credit,'公选')">
                        {{others.public_credit[0]}}
                    </mu-button>

                    <mu-button small fab color="deepOrange900" style="margin: 2px" @click="show(false,others.public_credit,'公选')">
                        {{others.public_credit[1]}}
                    </mu-button>

                </mu-flex>
            </mu-col>
        </mu-row>

    </div>
</template>

<script>
    export default {
        name: "ScoreTotalBoard",
        props:{
            others:Object
        },
        methods:{
            show: function (flag,msg,name='') {
                if (flag === true)
                    this.$toast.success(name+'通过 '+msg[2]+' 门 : '+ msg[0]+' 学分')
                else
                    this.$toast.error(name+'挂科 '+msg[3]+' 门 : '+msg[1]+' 学分')
            },
        }
    }
</script>

<style scoped>

</style>