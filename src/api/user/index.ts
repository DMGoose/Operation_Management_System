//统一管理项目的 用户相关 的接口
//接口需要带参数, 比如形参, 服务器返回的数据之类的, 就需要定义ts类型
//发请求需要axios, 所以这里要引入


import request from '@/utils/request'

//引入数据类型
import {loginFormData, loginResponseData, userInfoResponseData} from './type'
//项目用户相关的请求地址
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout"
}

//登录接口, 第二个参数是服务器返回的数据
export const reqLogin = (data:loginFormData)=> request.post<any,loginResponseData>(API.LOGIN_URL,data);

//获取用户信息的接口, 不需要带参数, 请求直接带token
export const reqUserInfo = () => request.get<any,userInfoResponseData>(API.USERINFO_URL)

//退出登录
export const reqLogout = () => request.post<any,any>(API.LOGOUT_URL);