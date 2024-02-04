//之前的删了, 现在把mock替换成真实接口, 重新写的
//定义用户相关的数据的ts类型

//用户登录接口携带参数的类型
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回数据(get, post请求, 服务器都都给了response) 都拥有的ts类型, 唯一的不同就是登录成功返回的 data: "这是token的string"
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定义登录接口类型
export interface loginResponseData extends ResponseData {
  data: string
}

//定义 获取用户信息(get Info) 返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
