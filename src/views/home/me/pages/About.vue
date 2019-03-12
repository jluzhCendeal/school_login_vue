<template>

    <div class="about-view">
        <div>
            <mu-appbar :style="'width: 100%;color:'+navStyle.color" :title="app_title" :color="navStyle.backgroundColor">
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
                navStyle: this.$store.getters.navStyle
            }
        }
    }
</script>

<style scoped>

</style>