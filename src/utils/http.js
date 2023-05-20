import axios from 'axios'
import { getCache } from './cache'
import { history } from './history'
const httpHelper = axios.create({
 baseURL: 'http://geek.itheima.net/v1_0',
 timeout: 5000
})

// 添加请求拦截器
httpHelper.interceptors.request.use((config) => {
 // if not login add token
 const token = getCache('UFO_TOKEN')
 if (token) {
  config.headers.Authorization = `Bearer ${token}`
 }
 return config
}, (error) => {
 return Promise.reject(error)
})

// 添加响应拦截器
httpHelper.interceptors.response.use((response) => {
 // 2xx 范围内的状态码都会触发该函数。
 // 对响应数据做点什么
 return response.data
}, (error) => {
 // 超出 2xx 范围的状态码都会触发该函数。
 // 对响应错误做点什么
 if (error.response.status === 401) {
  // 跳回到登录 reactRouter默认状态下 并不支持在组件之外完成路由跳转
  // 需要自己来实现
  history.push('/login')
 }
 //console.log(error)
 //message.error(error.response.data.message + "<br />" + error.message)
 return error.response.data
 //return Promise.reject(error)
})

export { httpHelper }