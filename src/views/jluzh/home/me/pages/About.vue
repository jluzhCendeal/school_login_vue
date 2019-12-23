<template>

    <div class="about-view">
        <div>
            <mu-appbar :style="'width: 100%;color:'+navStyle.color" :title="app_title"
                       :color="navStyle.backgroundColor">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>
        <div>
            <mu-card-title title="数据来源" sub-title="2019/3/13"></mu-card-title>
            <mu-card-text>
                数据是通过模拟登陆学校教务系统，获取其数据。每次更新数据服务都需要提交密码和账号。
                所以用户的账号和密码会保存在本地浏览器，使用的是localStorage的保存方式，当然数据不会直接明文保存。
                用户浏览器清除缓存，所有数据都会清除。本webapp的服务器是不会保存用户任何信息，一点信息也不会保存，所以请放心。
            </mu-card-text>
            <mu-card-title title="技术说明" sub-title="2019/3/13"></mu-card-title>
            <mu-card-text>
                后台搭建使用的是python flask web框架，提供的数据接口均是http协议的get请求方法，
                主要是因为这里采用jsonp跨域解决方案（js可跨域请求的原理）设计的api。
                前端使用的是vue.js框架。
                前端服务和后台服务部署都在腾讯云的香港服务器，配置为1cpu和1g内存、系统为ubuntu，
                所以有时候数据获取很慢，甚者无法请求，这都没关系啦，主要是想实践一下最近学的vue.js。
            </mu-card-text>
            <mu-card-title title="项目地址" sub-title="2019/3/13"></mu-card-title>
            <mu-card-text>
                <p>前端：<a href="https://github.com/jluzhCendeal/school_login_vue">school_login_vue</a></p>
                <p>后端：<a href="https://github.com/jluzhCendeal/school_login">school_login</a></p>
            </mu-card-text>

        </div>

    </div>
</template>

<script>
    export default {
        name: "About",
        data: function () {
            return {
                app_title: this.$store.state.theme.app_title + '-关于',
                navStyle: this.$store.getters.navStyle
            }
        }
    }
</script>

<style scoped>

</style>
