//统一管理项目的 用户相关 的接口
//接口需要带参数, 比如形参, 服务器返回的数据之类的, 就需要定义ts类型
// 发请求需要axios, 所以这里要引入

import request from '@/utils/request'
//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

//引入需要的data类型(这是ts的语法)
import type { loginFrom, loginResponseData, userResponseData } from './type'

//暴露请求函数.(其她组件可以直接拿)
//登录的接口方法
export const reqLogin = (data: loginFrom) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//这里是接收一个请求参数any类型和响应数据loginResponseData类型

//获取用户信息的接口方法, 通过请求头携带公共参数, 这里不需要写参数
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
