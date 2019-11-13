import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    default: {
      'user_background': 'http://cselife.oss-cn-beijing.aliyuncs.com/img/sys/user/profile_background.jpg'
    },
    // root: 'http://114.115.238.65:8000/',
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
    material: JSON.parse(localStorage.getItem('material')) || null,
    parameter: JSON.parse(localStorage.getItem('parameter')) || null,
    other: JSON.parse(localStorage.getItem('other')) || null,
    energy: JSON.parse(localStorage.getItem('energy')) || null,
    device: JSON.parse(localStorage.getItem('device')) || null,
    envLoad: JSON.parse(localStorage.getItem('envLoad')) || null,
    unit: JSON.parse(localStorage.getItem('unit')) || null
  },
  mutations: {
    clear (state) {
      localStorage.removeItem('systemTable')
      localStorage.removeItem('categories')
      localStorage.removeItem('material')
      localStorage.removeItem('parameter')
      localStorage.removeItem('other')
      localStorage.removeItem('energy')
      localStorage.removeItem('device')
      localStorage.removeItem('envLoad')
      localStorage.removeItem('unit')
      state.systemTable = null
      state.categories = null
      state.material = null
      state.parameter = null
      state.other = null
      state.energy = null
      state.device = null
      state.envLoad = null
      state.unit = null
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
    setMaterial (state, material) {
      localStorage.setItem('material', JSON.stringify(material))
      state.material = JSON.parse(localStorage.getItem('material'))
    },
    removeMaterial (state) {
      localStorage.removeItem('material')
      state.material = null
    },
    setEnergy (state, energy) {
      localStorage.setItem('energy', JSON.stringify(energy))
      state.energy = JSON.parse(localStorage.getItem('energy'))
    },
    removeEnergy (state) {
      localStorage.removeItem('energy')
      state.energy = null
    },
    setParam (state, parameter) {
      localStorage.setItem('parameter', JSON.stringify(parameter))
      state.parameter = JSON.parse(localStorage.getItem('parameter'))
    },
    removeParam (state) {
      localStorage.removeItem('parameter')
      state.parameter = null
    },
    setOther (state, other) {
      localStorage.setItem('other', JSON.stringify(other))
      state.other = JSON.parse(localStorage.getItem('other'))
    },
    removeOther (state) {
      localStorage.removeItem('other')
      state.other = null
    },
    setDevice (state, device) {
      localStorage.setItem('device', JSON.stringify(device))
      state.device = JSON.parse(localStorage.getItem('device'))
    },
    removeDevice (state) {
      localStorage.removeItem('device')
      state.device = null
    },
    setEnvLoad (state, envLoad) {
      localStorage.setItem('envLoad', JSON.stringify(envLoad))
      state.envLoad = JSON.parse(localStorage.getItem('envLoad'))
    },
    removeEnvLoad (state) {
      localStorage.removeItem('envLoad')
      state.envLoad = null
    },
    setUnit (state, unit) {
      localStorage.setItem('unit', JSON.stringify(unit))
      state.unit = JSON.parse(localStorage.getItem('unit'))
    },
    removeUnit (state) {
      localStorage.removeItem('unit')
      state.unit = null
    },
    setCategories (state, categories) {
      localStorage.setItem('categories', JSON.stringify(categories))
      state.categories = JSON.parse(localStorage.getItem('categories'))
    },
    removeCategories (state) {
      localStorage.removeItem('categories')
      state.categories = null
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
