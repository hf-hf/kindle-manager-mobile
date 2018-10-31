import axios from 'axios'
import {Indicator, Toast} from 'mint-ui';
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    console.log(getToken())
    // config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers.Authorization = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  } else{
    config.headers.Authorization = ""
  }
  console.log(config)
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code !== 200) {
      Toast({
          message: res.message,
          iconClass: 'mint-toast-icon mintui mintui-field-error'
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      if (res.code === 401 || res.code === 403) {
        Toast({
            message: "你已被登出，可以取消继续留在该页面，或者重新登录",
            iconClass: 'mint-toast-icon mintui mintui-field-error'
        });

        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload()// 为了重新实例化vue-router对象 避免bug
        //   })
        // })

      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Toast({
        message: error.message,
        iconClass: 'mint-toast-icon mintui mintui-field-error'
    });
    return Promise.reject(error)
  }
)

export default service
