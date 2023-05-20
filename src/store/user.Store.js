import { makeAutoObservable } from "mobx"
import { httpHelper } from '@/utils'


class UserStore {
 //构造函数
 userinfo = {}
 constructor() {
  makeAutoObservable(this)
 }
 getUser = async () => {
  //const res = await httpHelper.get('/user/profile')
  //this.userinfo = res.data
  this.userinfo = { name: 'admin' }
 }

}
export default UserStore