<template>
    <div class="login-view">
        <div>
            <mu-appbar style="width: 100%;" :title="app_title" :color="bar_color">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>

        <mu-paper :z-depth="1">
            <mu-form ref="form" :model="validateForm" style="padding: 15px">
                <p>吉林大学珠海学院教务系统-模拟登陆</p>

                <mu-form-item label="教务系统账号" help-text="输入学号" prop="yhm" :rules="usernameRules">
                    <mu-text-field v-model="validateForm.yhm" prop="yhm"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="mm" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.mm" prop="mm" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="isAgree" :rules="argeeRules">
                    <mu-checkbox label="同意使用该模拟登陆服务" v-model="validateForm.isAgree"></mu-checkbox>
                </mu-form-item>
                <mu-flex justify-content="center" align-items="center" style="font-size: smaller">

                    <mu-button color="primary" @click="submit" style="margin-right: 20px;margin-bottom: 15px ">提交
                    </mu-button>
                    <mu-button @click="reset" style="margin-left: 20px;margin-bottom: 15px">重置</mu-button>
                </mu-flex>
            </mu-form>

        </mu-paper>
        <mu-flex justify-content="center" align-items="center" style="font-size: smaller;margin: 10px">
            <mu-button color="red" flat @click="openAlertDialog">已绑定？解除绑定</mu-button>
            <mu-dialog title="删除绑定" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
                删除绑定，应用的主题将会重置；缓存在本地的数据也会清空，继续吗？
                <mu-button slot="actions" flat color="primary" @click="closeAlertDialog(false)">否</mu-button>
                <mu-button slot="actions" flat color="primary" @click="closeAlertDialog(true)">是</mu-button>
            </mu-dialog>
        </mu-flex>
        <over-lay :progress="progress"></over-lay>

    </div>
</template>

<script>
    import Overlay from "../components/Overlay";

    export default {
        name: "Login",
        components: {'over-lay':Overlay},

        data() {
            return {
                app_title: this.$store.state.app_title + '-绑定',
                nav_style: this.$store.getters.navStyle,
                bar_color: this.$store.getters.barColor,
                usernameRules: [
                    {validate: (val) => !!val, message: '必须填写用户名'},
                    {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
                ],
                passwordRules: [
                    {validate: (val) => !!val, message: '必须填写密码'}

                ],
                argeeRules: [{validate: (val) => !!val, message: '必须同意用户协议'}],
                validateForm: {
                    yhm: localStorage.getItem('username'),
                    mm: '',
                    isAgree: false
                },
                progress: false,
                openAlert:false,
                visibility:false
            }
        },
        methods: {
            jsonpCallback:json =>{},
            submit() {
                this.$refs.form.validate().then((result) => {
                    if (result) {
                        this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_login, {
                            yhm: this.validateForm.yhm,
                            mm: this.validateForm.mm,
                            callbackName: 'jsonpCallback'
                        },).then(json => {
                            if (json.code == '0') {
                                this.$toast.success({message:'已绑定!',position:'top'})
                                this.clean()
                                localStorage.setItem('token',json.data.token)
                                localStorage.setItem('username',this.validateForm.yhm)
                                this.progress = false
                                location.href = '/jluzh/me'

                            } else {
                                this.$toast.error({message:'绑定失败!',position:'top'})
                                this.progress = false
                            }
                        }).catch(()=> {
                            this.$toast.error({message:'绑定失败!',position:'top'})
                            this.progress = false
                        })
                        this.progress = true
                    } else {
                        this.$toast.warning({message:'信息未完整!',position:'top'})
                    }

                });
            },
            reset() {
                this.$refs.form.clear();
                this.validateForm = {
                    yhm: '',
                    mm: '',
                    isAgree: false
                };
            },
            clean(){
                localStorage.clear()
                sessionStorage.clear()
                this.$jsonp(this.$store.state.app_host + this.$store.getters.urlPaths.u_logout,{
                    callbackName: 'jsonpCallback'
                })
            },

            openAlertDialog:function () {
                this.openAlert=true
            },
            closeAlertDialog:function (flag) {
                this.openAlert = false
                if(flag){
                    this.clean()
                }
            }
        }
    }
</script>

<style scoped>

</style>