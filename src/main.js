import Vue from 'vue'
import App from './App.vue'
import VueJsonp from 'vue-jsonp'
import router from './router'
import store from './store/index'

import '@/assets/material-icons.css'
import VueCookie from 'vue-cookie'

import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'

import  NProgress  from 'muse-ui-progress'
import 'muse-ui-progress/dist/muse-ui-progress.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import jluzhLocalStorage from '@/assets/util/jluzhLocalStorage'
Vue.prototype.$jluzhLocalStorage = jluzhLocalStorage
Vue.use(VueAwesomeSwiper)
Vue.use(VueCookie)
Vue.use(MuseUI)
Vue.use(VueJsonp,3500)
Vue.use(NProgress)
Vue.use(Toast)

Vue.config.productionTip = false
new Vue({
  Toast,
  VueCookie,
  router,
  store,
  NProgress,
  VueJsonp,
  VueAwesomeSwiper,
  render: h => h(App),
}).$mount('#app')

