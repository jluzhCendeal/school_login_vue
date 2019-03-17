#### 已完成功能
-  绑定登陆
-   缓存管理
-  主题设置
-   课表查询
-   分数查询
#### 项目演示
gif演示:
![gif演示](https://upload-images.jianshu.io/upload_images/4413333-33a1b38008b5fda5.gif?imageMogr2/auto-orient/strip)

不同主题:
![蓝](https://upload-images.jianshu.io/upload_images/4413333-bf1e726d8876222f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![白](https://upload-images.jianshu.io/upload_images/4413333-3d5810f916154760.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![粉](https://upload-images.jianshu.io/upload_images/4413333-9df8a68a2889a2fd.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![黄](https://upload-images.jianshu.io/upload_images/4413333-2975cad28ccb13d3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![红](https://upload-images.jianshu.io/upload_images/4413333-29f330e7aec901e3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 浏览地址
部署地址预览: [shool_login_vue][1]
#### 项目说明
最近在学vue.js，就是想练练手而已，所以结合python flask web框架搭建的后台服务写了这个项目，这个项目现在用nginx进行部署，部署在我租用的腾讯云服务器，这服务器是在香港区域，有时候访问会比较吃力，加上配置也不高，玩玩而已，无所谓了哈哈。
#### 项目技术要点
##### 1.前后端分离，跨域问题解决方案

    这个项目采用的是jsonp解决方案，其实就是利用了js文件可以跨域请求的原理。我这里使用了vue-jsonp的插件，使用方法非常简单：
    1.安装npm i -s vue-jsonp
    2.注册全局
    3.调用的时候：this.$jsonp(url,data)，这里返回的是 Promise对象，可以使用.then()进行串行异步任务，这个特点很重要，比如我需要先登录请求，再有其他的请求，那么这时候就很有用了。
项目内封装好的：[jluzhRequest.js][2]
*这里透露一个bug:使用异步请求第一次登陆后，直接打开课表页面时，会没办法获取课表，按f12终端提示回调函数没有定义,莫名其妙。但是，切换其他界面，再回来就成功了，又不报错了，不知道是为什么，哈哈*
#### 2.这个项目使用的是什么样式框架

    这个项目是基于Muse-UI样式开发的,但是由于Muse-ui自带的轮播不满足我想要的效果，比如课表的切换。所以，这里也用到了另外的切换插件vue-awesome-swiper
UI地址: [Muse-UI][3]
swiper插件: [vue-awesome-swiper][4]
#### 3.项目大概都用到那些vue知识
    0.基本知识：
    语法：v-bind、v-for、v-show、v-if、v-else-if、v-else、v-on、v-resize(屏幕大小变化是触发)、vue实例的生命周期(created钩子函数,mounted钩子函数)、监听属性(computed,watch)，data数据属性、metchod方法属性 
    结构：template(视图模板)、script(js代码逻辑)、style(样式，带有scoped的区别)
    
    1.组件化:传参props;子组件$emit()触发父组件函;组件的数据属性data一定是函数,返回的是对象
    
    2.vuex:主要是用于多页面变量共用，主要是state属性、mutations属性、getters属性
    
    3.vue-router:页面路由，这里的话要注意的是子页面配置，如果一个页面要有子页面，那么这个页面需要有一个或多个<router-view></router-view>出口
最后项目地址: [school_login_vue][5]


  [1]: http://www.cendeal.cn/jluzh/me
  [2]: https://github.com/jluzhCendeal/school_login_vue/blob/master/src/assets/util/jluzhRequest.js
  [3]: https://muse-ui.org/#/zh-CN
  [4]: https://github.com/surmon-china/vue-awesome-swiper
  [5]: https://github.com/jluzhCendeal/school_login_vue
