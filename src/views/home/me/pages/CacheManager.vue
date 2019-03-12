<template>
    <div class="cache-view">
        <div>
            <mu-appbar :style="'width: 100%;color:'+navStyle.color" :title="app_title" :color="navStyle.backgroundColor">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>
        <div>
            缓存管理，可以清楚所有缓存
            <p>共{{jluzhLocalStorageInfo.count}}条，{{jluzhLocalStorageInfo.size}}字节</p>
            <p>键值</p>
            <ul>
                <li v-for="info in jluzhLocalStorageInfo.keys">{{info}}</li>
            </ul>
        </div>
    </div>

</template>

<script>
    import {getSessionStorageInfo} from "../../../../assets/util/jluzhSessionSorageInfo";

    export default {
        name: "CacheManager",
        data: function () {
            return {
                app_title: this.$store.state.app_title + '-Cache',
                navStyle: this.$store.getters.navStyle,
                jluzhLocalStorageInfo:this.$jluzhLocalStorage.info
            }
        },
        //2019/3/8 by cendeal
        methods: {
            getSessionStorageInfo:getSessionStorageInfo,
            cleanSessionStorege() {
                sessionStorage.clear()
            },
            cleanLocastorage() {
                this.$jluzhLocalStorage.clear()
            }
        }
    }
</script>

<style scoped>

</style>