<template>
    <div class="theme-view">
        <div>
            <mu-appbar :style="'width: 100%;color:'+theme_config.nav_text_color" :title="app_title"
                       :color="theme_config.nav_bg">
                <mu-button icon slot="left" to="/jluzh/me">
                    <mu-icon value="navigate_before"></mu-icon>
                </mu-button>
            </mu-appbar>
        </div>
        <div>
            <mu-list>
                <mu-sub-header>
                    <span>导航-背景色</span>
                    <span style="float: right;margin-right: 8px">
                             <mu-avatar size="12" :color="theme_config.nav_bg"></mu-avatar>
                        </span>
                </mu-sub-header>
                <mu-paper class="theme-paper" :z-depth="1">
                    <mu-row gutter>
                        <mu-col v-for="v,k in themes.bar_colors " span="4">
                            <mu-flex align-items="center">
                                <mu-radio v-model="theme_config.nav_bg" :value="v"></mu-radio>
                                <span :style="'width: 100%;height: 22px;background-color:'+v"></span>
                                <!--<mu-button small color="success"></mu-button>-->
                            </mu-flex>
                        </mu-col>
                    </mu-row>
                </mu-paper>
            </mu-list>

            <mu-list>
                <mu-sub-header>
                    <span>导航-字体色</span>
                    <span style="float: right;margin-right: 8px">
                             <mu-avatar size="12" :color="theme_config.nav_text_color"></mu-avatar>
                        </span>
                </mu-sub-header>
                <mu-paper class="theme-paper" :z-depth="1">
                    <mu-row gutter>
                        <mu-col v-for="v in themes.nav_text_colors " span="4">
                            <mu-flex align-items="center">
                                <mu-radio v-model="theme_config.nav_text_color" :value="v"></mu-radio>
                                <span :style="'width: 100%;height: 22px;background-color:'+v"></span>
                            </mu-flex>
                        </mu-col>
                    </mu-row>
                </mu-paper>
            </mu-list>

            <mu-list>
                <mu-sub-header>
                    <span>导航-选中色</span>
                    <span style="float: right;margin-right: 8px">
                             <mu-avatar size="12" :color="theme_config.nav_active_color"></mu-avatar>
                        </span>
                </mu-sub-header>
                <mu-paper class="theme-paper" :z-depth="1">
                    <mu-row gutter>
                        <mu-col v-for="v in themes.nav_active_colors " span="4">
                            <mu-flex align-items="center">
                                <mu-radio v-model="theme_config.nav_active_color" :value="v"></mu-radio>
                                <span :style="'width: 100%;height: 22px;background-color:'+v"></span>
                            </mu-flex>
                        </mu-col>

                    </mu-row>
                    <mu-row gutter style="padding-top: 10px">
                        <mu-col span="6">
                            <mu-flex align-items="center" style="float: right">
                                <span>选中：</span>
                                <mu-icon value="person" :color="theme_config.nav_active_color"></mu-icon>
                            </mu-flex>
                        </mu-col>
                        <mu-col span="6">
                            <mu-flex align-items="center">
                                <span>未选：</span>
                                <mu-icon value="person" :color="theme_config.nav_text_color"></mu-icon>
                            </mu-flex>
                        </mu-col>

                    </mu-row>

                </mu-paper>
            </mu-list>

            <mu-list>
                <mu-sub-header>
                    <span>账号板-背景色</span>
                    <span style="float: right;margin-right: 8px">
                             <mu-avatar size="12" :color="theme_config.head_pic_bg"></mu-avatar>
                        </span>
                </mu-sub-header>
                <mu-paper class="theme-paper" :z-depth="1">
                    <mu-row gutter>
                        <mu-col v-for="v in themes.head_pic_bg_colors " span="4">
                            <mu-flex align-items="center">
                                <mu-radio v-model="theme_config.head_pic_bg" :value="v"></mu-radio>
                                <span :style="'width: 100%;height: 22px;background-color:'+v"></span>
                            </mu-flex>
                        </mu-col>

                    </mu-row>
                    <mu-row gutter style="padding-top: 10px">
                        <mu-col span="12">
                            <mu-paper class="head-area" :z-depth="1"
                                      :style="'background-color:'+theme_config.head_pic_bg">
                                <mu-flex justify-content="center" align-items="center">
                                    <mu-avatar size="20%" style="margin: 2px">
                                        <img src="@/assets/logo.jpg">
                                    </mu-avatar>
                                </mu-flex>
                            </mu-paper>
                        </mu-col>
                    </mu-row>

                </mu-paper>
            </mu-list>

            <mu-list>
                <mu-sub-header>
                    <span>浮动按钮</span>
                </mu-sub-header>
                <mu-paper class="theme-paper" :z-depth="1">
                    背景色
                    <mu-row gutter>

                        <mu-col v-for="v in themes.float_btn_bg_colors" span="4">
                            <mu-flex align-items="center">
                                <mu-radio v-model="theme_config.float_btn_bg" :value="v"></mu-radio>
                                <span :style="'width: 100%;height: 22px;background-color:'+v"></span>
                            </mu-flex>
                        </mu-col>

                    </mu-row>
                    字体色
                    <mu-row gutter>

                        <mu-col v-for="v in themes.float_btn_text_colors " span="4">
                            <mu-flex align-items="center">
                                <mu-radio v-model="theme_config.float_btn_text_color" :value="v"></mu-radio>
                                <span :style="'width: 100%;height: 22px;background-color:'+v"></span>
                            </mu-flex>
                        </mu-col>

                    </mu-row>
                    <div align="center" style="padding-top: 10px">
                        <mu-button fab small :color="theme_config.float_btn_bg">
                            <mu-icon value="今" :color="theme_config.float_btn_text_color"></mu-icon>
                        </mu-button>
                    </div>

                </mu-paper>
            </mu-list>
        </div>

    </div>
    <!--


                    theme_config{
                    nav_bg:'',
                    nav_text_color:'',
                    nav_active_color:'',
                    head_pic_bg:'',
                    head_pic_text_color:'',
                    float_btn_bg:'',
                    float_btn_text_color:''
                    }


    -->
</template>

<script>
    export default {
        name: "ThemeSetting",
        data: function () {
            return {
                app_title: this.$store.state.app_title + '-主题',

                themes: {
                    bar_colors: {
                        main: 'rgb(244, 67, 54)',
                        cute_pink: '#ec407a',
                        sky: '#42a5f5',
                        yellow: '#ffeb3b',
                        white: 'white',
                        light_green: '#76ff03'
                    },
                    nav_text_colors: {
                        white: 'white',
                        grey: '#757575',
                        lime: '#f4ff81'
                    }
                    ,
                    nav_active_colors: {
                        green: "green",
                        blue: "#42a5f5",
                        orange: "orange"

                    },
                    head_pic_bg_colors: {
                        orange: "#ffca28",
                        white: "white",
                        red: "rgb(244, 67, 54)",
                        sky: '#42a5f5',
                        cute_pink: '#ec407a',
                        light_green: '#76ff03'
                    },
                    float_btn_bg_colors: {
                        red: 'red',
                        sky: '#42a5f5',
                        light_green: '#76ff03'
                    },
                    float_btn_text_colors:{
                        yellow:"yellow",
                        white: "white",
                        grey: '#757575',
                    }
                },
                theme_config: {
                    nav_bg: '',
                    nav_text_color: '',
                    nav_active_color: '',
                    head_pic_bg: '',
                    head_pic_text_color: '',
                    float_btn_bg: '',
                    float_btn_text_color: ''
                },
                //choose_bar_color: '',
                // choose_names:{
                //     nav_bg:'main',
                //     nav_active_color:'',
                //     nav_text_color:'white',
                //     head_pic_bg:'',
                //     head_pic_text_color:'',
                //     float_btn_bg_name:'',
                //     float_btn_text_color:''
                // }
            }
        },
        methods: {

            initTheme: function () {
                let state = this.$store.state
                let theme_config = this.theme_config


                theme_config.float_btn_bg = state.theme.float_btn_style.bg
                theme_config.float_btn_text_color = state.theme.float_btn_style.text
                theme_config.nav_active_color = state.theme.nav_active_color
                theme_config.nav_bg = state.theme.nav_style.backgroundColor
                theme_config.nav_text_color = state.theme.nav_style.color
                theme_config.head_pic_bg = state.theme.head_pic_style.backgroundColor
                theme_config.head_pic_text_color = state.theme.head_text_style.color


            },
            changeTheme: function () {

                this.$store.commit('updateTheme', this.theme_config)
                localStorage.setItem('jluzh_theme', JSON.stringify(this.theme_config))
            }
        },
        watch: {
            theme_config: {
                handler() {
                    console.log(this.theme_config.nav_active_color)
                    this.changeTheme()

                },
                deep: true
            }
        },
        created() {
            this.initTheme()

        }
    }
</script>

<style scoped>
    .theme-paper {
        width: 100%;
        padding: 12px;
        background-color: #f1e9ec;

    }
</style>