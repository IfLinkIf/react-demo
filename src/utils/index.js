// 先把所有的工具函数导出的模块在这里导入
// 然后再统一导出
import { httpHelper } from './http'
import { getCache, setCache, removeCache } from './cache'
// import {
//   setToken,
//   getToken,
//   removeToken
// } from './token'

import { history } from './history'

export {
 httpHelper,
 getCache, setCache, removeCache, history
}