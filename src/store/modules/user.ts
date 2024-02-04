//创建用户相关的小仓库(需要有登录,获取用户信息)
import { defineStore } from 'pinia'

//引入登录API
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
//引入数据类型
import type { UserState } from './types/type';
import { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type'

//引入要用的读取和存储token的方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';

//引入要用的路由组件（菜单就可以动态获取route）
import { constantRoute } from '@/router/routes';

//引入服务器登陆后返回的数据类型(loginResponseData )
//创建小仓库
let useUserStore = defineStore('User', {
    //小仓库存储数据的地方, 要记得返回(这是规定,需要返回内容)
    state: (): UserState => {
        return {
            token: GET_TOKEN(),//用户唯一标识token
            menuRoutes: constantRoute, //仓库生成菜单要用的数组
            username: '',
            avatar: ''
        }
    },

    //处理逻辑
    actions: {
        //Login的方法
        async userLogin(data: loginFormData) {
            //怎么发登录请求呢? 用我们之前的api,在user文件夹里面, 里面封装了登录的接口方法
            let result: loginResponseData = await reqLogin(data); //返回的是一个promise
            //登陆成功: 成功200-> token要存起来(存到哪里? 放数据的地方, 也就是state)
            if (result.code === 200) {
                //通过pinia仓库存储一下token, token就是data
                this.token = (result.data as string);
                //用于pinia/vuex存数据其实是利用的js对象, js存数据并非持续化, 所以还需要本地存储(持久化)
                SET_TOKEN((result.data as string))
                //因为async函数返回的是一个promise, 这个ok保证当前async函数返回一个成功的promise
                return 'OK'
            }
            //登陆失败: 失败201 -> 登陆失败的错误信息
            else {
                return Promise.reject(new Error('Incorrect Username or Password'))
            }
        },
        //获取用户信息的方法
        async userInfo() {
            //获取用户信息存到store, 头像 名字之类的
            let result: userInfoResponseData = await reqUserInfo(); //这返回一个promise

            //如果成功就开始存数据, 存到上面的state
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                return 'ok'
            } else {
                return Promise.reject(new Error('Error'))
            }
        },
        //退出登录的方法
        async userLogOut() {
            //要告诉服务器, 现在这个token不要了
            let result: any = await reqLogout();
            if (result.code == 200) {
                this.token = '';
                this.username = '';
                this.avatar = '';
                REMOVE_TOKEN();
                return 'ok';//返回一个成功的promise
            } else {
                //退出失败
                return Promise.reject(new Error('Error'))
            }
        }
    },
    getters: {

    },
})

//暴露获取小仓库的方法
export default useUserStore;