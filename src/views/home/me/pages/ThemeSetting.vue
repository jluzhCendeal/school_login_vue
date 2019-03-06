<template>
    <div class="theme-view">
        <div>
            <mu-appbar style="width: 100%;" :title="app_title" :color="bar_color">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>

    </div>
    <!--<div>-->
        <!--进行主题设置包括-->
        <!--theme:{-->
        <!--nav_style:{-->
        <!--'background-color': 'rgb(244, 67, 54)',//导航栏颜色-->
        <!--'color': 'white',//字体颜色-->
        <!--'z-index':99999-->
        <!--},-->
        <!--nav_active_color:'green',//选中颜色-->

        <!--head_pic_style:{-->
        <!--'background-color': '#ffca28',//图片背景色-->
        <!--'position': 'relative',-->
        <!--'top':'8px'-->
        <!--},-->
        <!--head_text_style:{-->
        <!--'color':'#7cb342'//账号字体颜色-->
        <!--},-->
        <!--float_bnt_color_style://漂浮按钮颜色-->
        <!--},-->
    <!--</div>-->
</template>

<script>
    export default {
        name: "ThemeSetting",
        data: function () {
            return {
                app_title: this.$store.state.app_title + '-主题',
                bar_color: this.$store.getters.barColor
            }
        },
    }
</script>

<style scoped>

</style>