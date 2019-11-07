<template>
    <div class="cache-view">
        <div>
            <mu-appbar :style="'width: 100%;color:'+navStyle.color" :title="app_title"
                       :color="navStyle.backgroundColor">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>
        <div>
            <mu-list>
                <mu-list-item>
                    <mu-list-item-title><strong>LocalStorage</strong>-<span style="color: orange">{{jluzhLocalStorageInfo.size}}</span>
                        Byte
                        <mu-badge color="blue" :content="String(jluzhLocalStorageInfo.count)"></mu-badge>
                    </mu-list-item-title>

                    <mu-list-item-action>
                        <mu-icon right value="delete"  v-on:click="cleanLocastorage"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item-content>
                    <mu-paper :z-depth="1">

                        <mu-chip class="item-chip" v-for="(info, index) in  jluzhLocalStorageInfo.keys" :key="info"
                                 :color="color_chip_for_loc[index]" @delete="removeLocKey(index)" delete>{{info}}
                        </mu-chip>
                    </mu-paper>
                </mu-list-item-content>
                <mu-list-item>
                    <mu-list-item-title><strong>SessionStorage共</strong>-<span style="color: orange">{{sessionStorageInfo.size}}</span>
                        Byte
                        <mu-badge color="blue" :content="String(sessionStorageInfo.count)"></mu-badge>
                    </mu-list-item-title>

                    <mu-list-item-action>
                        <mu-icon right value="delete" v-on:click="cleanSessionStorege"></mu-icon>
                    </mu-list-item-action>
                </mu-list-item>
                <mu-list-item-content>
                    <mu-paper :z-depth="1">
                        <mu-chip class="item-chip" v-for="(info, index) in  sessionStorageInfo.keys" :key="info"
                                 :color="color_chip_for_ses[index]" @delete="removeSessionKey(index)" delete>{{info}}
                        </mu-chip>
                    </mu-paper>
                </mu-list-item-content>
            </mu-list>
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
                jluzhLocalStorageInfo: this.$jluzhLocalStorage.info,
                sessionStorageInfo:this.getSessionStorageInfo(),
                color_chip_for_loc: [],
                color_chip_for_ses: []
            }
        },

        //2019/3/8 by cendeal
        methods: {
            getSessionStorageInfo: getSessionStorageInfo,
            cleanSessionStorege() {
                sessionStorage.clear()
                this.sessionStorageInfo=this.getSessionStorageInfo()

            },
            cleanLocastorage() {
                this.$jluzhLocalStorage.clear()
                this.jluzhLocalStorageInfo=this.$jluzhLocalStorage.info
            },
            randomColor: function () {
                return '#' + (Math.floor(Math.random() * 0xffffff)).toString(16)
            },
            removeSessionKey(index){
                delete sessionStorage[this.sessionStorageInfo.keys[index]]
                this.sessionStorageInfo=this.getSessionStorageInfo()
            },
            removeLocKey(index){
                delete localStorage[this.jluzhLocalStorageInfo.keys[index]]
                this.jluzhLocalStorageInfo = this.$jluzhLocalStorage.info
            }

        },
        mounted() {
            for (let i = 0; i < this.jluzhLocalStorageInfo.count; i++) {
                this.color_chip_for_loc.push(this.randomColor())
            }
            for (let i = 0; i < this.sessionStorageInfo.count; i++) {
                this.color_chip_for_ses.push(this.randomColor())
            }
        }
    }
</script>

<style scoped>
    .item-chip {
        margin: 8px;
    }
</style>
