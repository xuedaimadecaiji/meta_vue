import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    default: {
      'user_background': 'http://cselife.oss-cn-beijing.aliyuncs.com/img/sys/user/profile_background.jpg'
    },
    // root: 'http://114.115.238.65/api/',
    root: 'http://localhost:8000/api/manage/',
    // root: 'http://192.168.1.103:8000/api/manage/',
    posting: false,
    pageLoading: false,
    scrollLoading: false,
    loginTime: JSON.parse(localStorage.getItem('loginTime')) || null,
    systemTime: JSON.parse(localStorage.getItem('systemTime')) || null,
    auth: JSON.parse(localStorage.getItem('auth')) || null,
    token: JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')).token : null,
    metadata: JSON.parse(localStorage.getItem('metadata')) || null,
    systemTable: JSON.parse(localStorage.getItem('systemTable')) || null,
    categories: JSON.parse(localStorage.getItem('categories')) || null,
    baseTableMap: JSON.parse(localStorage.getItem('baseTableMap')) || null
  },
  mutations: {
    clear (state) {
      localStorage.removeItem('systemTable')
      localStorage.removeItem('categories')
      localStorage.removeItem('baseTableMap')
      state.systemTable = null
      state.categories = null
      state.baseTableMap = null
    },
    setSystemTime (state) {
      localStorage.setItem('systemTime', JSON.stringify(new Date().getTime()))
      state.systemTime = JSON.parse(localStorage.getItem('systemTime'))
    },
    setSystemTable (state, systemTable) {
      localStorage.setItem('systemTable', JSON.stringify(systemTable))
      state.systemTable = JSON.parse(localStorage.getItem('systemTable'))
    },
    removeSystemTable (state) {
      localStorage.removeItem('systemTable')
      state.systemTable = null
    },
    setCategories (state, categories) {
      localStorage.setItem('categories', JSON.stringify(categories))
      state.categories = JSON.parse(localStorage.getItem('categories'))
    },
    removeCategories (state) {
      localStorage.removeItem('categories')
      state.categories = null
    },
    setBaseTableMap (state, baseTableMap) {
      localStorage.setItem('baseTableMap', JSON.stringify(baseTableMap))
      state.baseTableMap = JSON.parse(localStorage.getItem('baseTableMap'))
    },
    removeBaseTableMap (state) {
      localStorage.removeItem('baseTableMap')
      state.baseTableMap = null
    },
    setMetadata (state, metadata) {
      localStorage.setItem('metadata', JSON.stringify(metadata))
      state.metadata = JSON.parse(localStorage.getItem('metadata'))
    },
    removeMetadata (state) {
      localStorage.removeItem('metadata')
      localStorage.removeItem('categories')
      state.metadata = null
    },
    setLoginTime (state) {
      localStorage.setItem('loginTime', JSON.stringify(new Date().getTime()))
      state.loginTime = JSON.parse(localStorage.getItem('loginTime'))
    },
    login (state, auth) {
      localStorage.setItem('auth', JSON.stringify(auth))
      state.token = JSON.parse(localStorage.getItem('auth')).token
      state.auth = JSON.parse(localStorage.getItem('auth'))
      this.commit('setLoginTime')
    },
    logout (state) {
      localStorage.removeItem('auth')
      localStorage.removeItem('loginTime')
      state.auth = null
      state.loginTime = null
    },
    updateAuth (state, user) {
      let auth = JSON.parse(localStorage.getItem('auth'))
      auth['user'] = user
      localStorage.setItem('auth', JSON.stringify(auth))
      state.auth = JSON.parse(localStorage.getItem('auth'))
    }
  }
})
