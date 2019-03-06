<template>
    <div class="cache-view">
        <div>
            <mu-appbar style="width: 100%;" :title="app_title" :color="bar_color">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>
        <div>
            缓存管理，可以清楚所有缓存
        </div>
    </div>

</template>

<script>
    export default {
        name: "CacheManager",
        data: function () {
            return {
                app_title: this.$store.state.app_title + '-Cache',
                bar_color: this.$store.getters.barColor
            }
        },
    }
</script>

<style scoped>

</style>