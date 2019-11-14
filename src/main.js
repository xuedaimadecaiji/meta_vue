// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vuex from 'vuex'
import store from './store/store'
import axios from 'axios'
import api from './fetch/api'
import router from './router'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.prototype.api = api
Vue.prototype.$http = axios
// 定义全局变量
Vue.use(Vuex)
Vue.prototype.api = api
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

function beforeEachFunc () {
  if (store.state.categories === null) {
    api.get({url: 'system/categories/tree'}).then(res => {
      store.commit('setCategories', res)
    })
  }
  if (store.state.systemTable === null) {
    api.get({url: 'system/tables'}).then(res => {
      store.commit('setSystemTable', res)
    })
  }
  if (store.state.baseTableMap === null) {
    api.get({url: 'system/all'}).then(res => {
      store.commit('setBaseTableMap', res)
    })
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
    if (store.state.auth) {
      beforeEachFunc()
      next() // 已登录
    } else {
      next({
        name: 'Login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    beforeEachFunc()
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
