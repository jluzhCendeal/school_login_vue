<template>
    <div class="contact-view">
        <div>
            <mu-appbar :style="'width: 100%;color:'+navStyle.color" :title="app_title"
                       :color="navStyle.backgroundColor">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>
        <div class="content">
            <mu-list>
                <mu-card-title sub-title="为什么主题在不同浏览器打开之前保存的样式不一样了？"></mu-card-title>
                <mu-card-text>
                   这是因为数据都是保存在本地的，不会保存到服务器，所以不会同步。而本地保存依赖浏览器的localStorage，
                    每个浏览器的每一个源的localStorage是不一样的，所以用不同的浏览器打开样式是不能同步的。
                    建议使用常用的浏览器就好。
                </mu-card-text>

                <mu-card-title sub-title="为什么绑定成功了，课表数据没有出来？"></mu-card-title>
                <mu-card-text>
                    如果遇到，这样的情况，可能是网路问题，可能是服务器问题。可以试一下点击右上角的菜单，选择更新课表试试。
                    如果还是不行，稍后再试吧。
                </mu-card-text>
            </mu-list>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Contact",
        data: function () {
            return {
                app_title: this.$store.state.theme.app_title + '-反馈',
                navStyle: this.$store.getters.navStyle
            }
        },
    }
</script>

<style scoped>

</style>
