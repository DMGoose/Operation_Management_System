//登录接口需要携带的参数ts类型
//回顾: ts中的接口就是用于定义一个类的结构(包含哪些属性和方法)
export interface loginFrom {
  username: string
  password: string
}

//登录接口返回的数据的类型, 一个code, 一个对象(对象里面放着token, 是一个字符串)
interface dataType {
  token: string
}
export interface loginResponseData {
  code: number
  data: dataType
}

//定义服务器返回用户信息相关的数据类型, 一个code, 一个对象(对象里面放着checkUser, 即为用户的信息对象)

//定义用户信息对象的类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  tokens: string
}

interface user {
  checkUser: userInfo
}
export interface userResponseData {
  code: number
  data: user
}
