//用于定义小仓库state 的数据 的类型

import type { RouteRecordRaw } from "vue-router" //这个路由对象的类型, 人家帮我们写好了
export interface UserState{
    token: string | null   //成功返回token string, 失败就是null
    menuRoutes:RouteRecordRaw[] //数组里面的是路由对象
    username: string
    avatar: string
}