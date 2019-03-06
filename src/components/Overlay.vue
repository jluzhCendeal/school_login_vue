<template>
    <mu-dialog width="100%" fullscreen :open.sync="progress" style="-webkit-filter: opacity(0.9)">
        <div ref="my_dialog"></div>
        <mu-flex justify-content="center" :style="style">

            <mu-circular-progress  color="warning" :stroke-width="7" :size="56"></mu-circular-progress>


        </mu-flex>
        <mu-flex justify-content="center" style="margin-top: 10px">
            <mu-avatar size="12" color="red" style="margin: 5px"></mu-avatar>
            <mu-avatar size="12" color="green" style="margin: 5px"></mu-avatar>
            <mu-avatar size="12" color="yellow" style="margin: 5px"></mu-avatar>


        </mu-flex>

    </mu-dialog>
</template>

<script>
    export default {
        name: "Overlay",
        props: {
            progress: Boolean
        },
        data:()=>{
            return{
                style:{}
            }
        },
        mounted:function () {
            this.style={'margin-top':`${document.documentElement.clientHeight}`*0.3+'px'}

        }
    }
</script>

<style scoped>

</style>