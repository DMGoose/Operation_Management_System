//对axios进行二次封装: 使用其请求与响应拦截器
import axios from 'axios'

import { ElMessage } from 'element-plus'

//引入用户相关的仓库, 需要拿到token,登陆成功后携带给服务器
import useUserStore from '@/store/modules/user';

//第一步: 利用axios对象的create方法, 去创建axios实例(其她的配置:基础路径, 超时的时间)
//create()返回一个axios实例对象, 里面可以写一些其她配置
let request = axios.create({
  //基础路径, 可以用一些开发环境的变量
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000, //超时时间的设置, 发一个请求超过5s, 就是失败
})

//第二步: request实例添加 请求拦截器(可以理解为 request.use request interceptor())
request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  //要携带token
  if(userStore.token){
    config.headers.token = userStore.token
  }
  //config配置对象, headers属性请求头, 经常给服务器端携带公共参数
  //返回配置对象
  return config
})

//第三步:响应拦截器, 有两个callback, 成功的和失败的
request.interceptors.response.use(
  (response) => {
    //成功的callback
    //简化数据
    return response.data
  },
  
  (error) => {
    //失败得callback: 处理http网络错误
    //定义一个变量, 用于存储网络错误信息
    let message = ''
    //http状态码
    let status = error.response.status

    switch (status) {
      case 401:
        message = 'token is invalid'
        break
      case 403:
        message = 'invalid request'
        break
      case 404:
        message = 'not found'
        break
      case 500:
        message = 'server error'
        break
      default:
        message = 'network error'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })

    //要返回一个失败的promise对象,终结promise链
    return Promise.reject(new Error('发生错误了捏!'))
  },
)

//暴露
export default request
