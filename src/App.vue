<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        created() {
            this.$store.dispatch('theme/initTheme')
        }
    }

</script>

<style>

</style>
