<template>
    <div class="contact-view">
        <div>
            <mu-appbar style="width: 100%;" :title="app_title" :color="bar_color">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>
        <div>
            这里打算使用的是websocket,进行交互
        </div>
    </div>

</template>

<script>
    export default {
        name: "Contact",
        data: function () {
            return {
                app_title: this.$store.state.app_title + '-反馈',
                bar_color: this.$store.getters.barColor
            }
        },
    }
</script>

<style scoped>

</style>