import Vue from 'vue'
import VueRouter from 'vue-router'
import JluzhModule from "./modules/jluzh";

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        ...JluzhModule
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta) {
        document.title = to.meta
    }
    return next()
})
export default router
