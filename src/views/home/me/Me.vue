<template>
    <div class="me">
        <div class="head">
            <mu-paper class="head-area" :z-depth="1" :style="headPicStyle">
                <mu-flex justify-content="center" align-items="center">
                    <mu-avatar style="width: 12vh;height: 12vh;margin: 2px"  size="20%">
                        <img  ref='head_pic' :src="head_pic">
                    </mu-avatar>
                </mu-flex>
                <mu-flex justify-content="center" align-items="center" style="padding: 2px">
                    <span>{{username}}</span>
                </mu-flex>
            </mu-paper>

            <div class="command-area" style="margin-top: 15px;">
                <mu-list>
                    <mu-list-item button to="/jluzh/login" replace>
                        <mu-list-item-action>
                            <mu-icon value="person"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>绑定账号</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button to="/jluzh/cache">
                        <mu-list-item-action>
                            <mu-icon value="sd_card"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>缓存管理</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button to="/jluzh/theme">
                        <mu-list-item-action>
                            <mu-icon value="grade"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>主题设置</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button to="/jluzh/about">
                        <mu-list-item-action>
                            <mu-icon value="live_help"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>关于应用</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button to="/jluzh/contact">
                        <mu-list-item-action>
                            <mu-icon value="drafts"></mu-icon>
                        </mu-list-item-action>
                        <mu-list-item-title>反馈信息</mu-list-item-title>
                    </mu-list-item>
                </mu-list>
            </div>
        </div>

    </div>

</template>

<script>
    import headPic from '@/assets/logo.jpg'
    import {mapGetters} from 'vuex'

    export default {
        name: 'me',
        data: function () {
            return {
                username: localStorage.getItem('username'),
                head_pic: this.$jluzhLocalStorage.getItem('token') ? `${process.env.VUE_APP_API}/getPhoto?token=${this.$jluzhLocalStorage.getItem('token')}` : headPic
            }
        },
        computed: {
            ...mapGetters(['headPicStyle', 'headTextStyle'])
        }
    }
</script>

<style scoped>
    .me {
        margin-right: 8px;
        margin-left: 8px;
    }
</style>
