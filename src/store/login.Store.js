import { makeAutoObservable } from "mobx"
import { httpHelper, setCache, getCache, removeCache } from '@/utils'

class LoginStore {
 //构造函数
 token = getCache("UFO_TOKEN") || ''
 constructor() {
  makeAutoObservable(this)
 }
 logIn = async ({ mobile, code }) => {

  const res = await httpHelper.post('/authorizations', { mobile, code })
  console.log(res)
  if (res.data !== null) {
   this.token = res.data.token
   setCache("UFO_TOKEN", this.token)
   return "OK"
  } else {
   return res.message
  }
 }
 logOut = () => {
  this.token = ''
  removeCache("UFO_TOKEN")
 }

}
export default LoginStore