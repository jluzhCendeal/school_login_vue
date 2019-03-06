<template>

    <div class="about-view">
        <div>
            <mu-appbar style="width: 100%;" :title="app_title" :color="bar_color">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>

    </div>
</template>

<script>
    export default {
        name: "About",
        data: function () {
            return {
                app_title: this.$store.state.app_title + '-关于',
                bar_color: this.$store.getters.barColor
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>