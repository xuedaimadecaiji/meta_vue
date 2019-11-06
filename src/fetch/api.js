import store from '../store/store'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入elm组件
import { Message } from 'element-ui'

axios.interceptors.request.use(config => {
// 让每个请求携带token--['token']为自定义key
  if (store.state.token) {
    let token = store.state.token
    Object.assign(config.headers, {
      'authorization': 'Token ' + token,
      'Content-Security-Policy': 'upgrade-insecure-requests'
    })
  }
  return config
}, error => {
// Do something with request error
  console.log(error) // for debug
  Promise.reject(error).then(r => {
    return r
  })
})

function get (args) {
  return new Promise((resolve, reject) => {
    // 判断是传入的url中是否包含地址头
    let url = args.url
    let root = store.state.root
    if (url.search('http') !== -1) {
      root = ''
    }
    axios.get(root + url, {params: args['params']})
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
function post (args) {
  return new Promise((resolve, reject) => {
    let root = store.state.root
    if (!args['config']) {
      args['config'] = {}
    }
    if (args['progressCallback']) {
      args['config']['onUploadProgress'] = function (progressEvent) {
        // 进度值
        // var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
        args['progressCallback'](complete)
      }
    }
    axios.post(root + args.url, args['params'], args['config'])
      .then(response => {
        if (response.data !== 0) {
          Message.success('成功！')
        } else {
          Message.error('失败！')
        }
        resolve(response.data)
      })
      .catch((error) => {
        // 关闭  loading图片消失
        NProgress.done()
        reject(error)
      })
  })
}
function put (args) {
  return new Promise((resolve, reject) => {
    // 判断是传入的url中是否包含地址头
    let url = args.url
    let root = store.state.root
    if (url.search('http') !== -1) {
      root = ''
    }
    axios.put(root + url, args['params'])
      .then(response => {
        if (response.data === 1) {
          Message.success('成功！')
        } else {
          Message.error('失败！')
        }
        resolve(response.data)
      })
      .catch((error) => {
        NProgress.done()
        reject(error)
      })
  })
}
function del (args) {
  return new Promise((resolve, reject) => {
    let url = args.url
    let root = store.state.root
    if (url.search('http') !== -1) {
      root = ''
    }
    axios.delete(root + url, {data: args['params']})
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        NProgress.done()
        reject(error)
      })
  })
}
function all (list) {
  return new Promise((resolve) => {
    let root = store.state.root
    let reqList = []
    for (let item in list) {
      reqList.push(axios.get(root + list[item]['url'], {params: list[item]['params']}))
    }
    axios.all(reqList).then(axios.spread(function (...resList) {
      for (let j = 0, len = resList.length; j < len; j++) {
        if (resList[j].data['next'] === null) {
          resList[j].data['next'] = 0
        }
      }
      resolve(resList)
    }))
  })
}
export default {
  get (args) {
    return get(args)
  },
  post (args) {
    return post(args)
  },
  put (args) {
    return put(args)
  },
  delete (args) {
    return del(args)
  },
  all (list) {
    store.commit('startPageLoading')
    NProgress.start()
    NProgress.configure({easing: 'ease', speed: 500, showSpinner: false})
    list.forEach((item) => {
      item['url'] = item['url']
    })
    return all(list)
  }
}
