//这个文件是用来 路由鉴权 的
//指: 项目当中的route能不能被访问的权限, 某个路由什么条件下可以访问, 什么条件下不可以访问
import router from '@/router';

//引入进度条相关的插件 和 样式(颜色可以自己调)
import nprogress from 'nprogress'
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false }); //没有加载的圈圈

//引入setting(里面有title信息)
import setting from './setting';

//去获取用户store里的token数据, 来判断是否登陆成功
import useUserStore from './store/modules/user';
import pinia from './store';
let userStore = useUserStore(pinia)

//全局守卫, 项目中任意路由切换都会触发的hook

//全局前置守卫: 访问某一个route之前会执行的
router.beforeEach(async (to: any, from: any, next: any) => {
    
    //to: 你将要访问的route, 是一个路由对象
    //from: 你从哪个路由而来
    //next: 路由的放行函数
    nprogress.start();
    //获取token, 去判断用户登录, 还是没登录
    let token = userStore.token;

    //获取用户信息
    let username = userStore.username;
    if (token) {
        //用户登录, 成功后就不能去login了, 
        if (to.path == '/login') {
            next({ path: '/' }); //你要去login? 不行, 给你指向首页
        } else {
            //登录成功, 可以访问其它六个路由(登陆排除), 要发请求获取用户信息
            //有用户信息, 放行
            if (username) {
                next();
            } else {
                //没有用户信息, 发请求获取, 这个函数返回一个promise
                try {
                    //获取用户信息之后
                    await userStore.userInfo();
                    //放行
                    next();
                } catch (e) {
                    //token过期: 获取不到用户信息, 退出登录(清空登陆数据), 回到登陆页面
                    //用户手动修改了本地token
                    await userStore.userLogOut();
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        //用户未登录
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login' })
        }
    }
})

//全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
    document.title = `${setting.title1} - ${to.meta.title}`;
    nprogress.done();
})

//问题一: 任意的路由的切换要实现进度条业务  --nprogress, 需要安装
//问题二: 路由鉴权(路由组件访问权限的设置)
//全部的路由组件: 登录\404\任意路由\首页\数据大屏\权限管理(三个children)\商品管理(四个children)

//用户未登录, 可以访问login, 其余六个都不能访问, 需要指向login
//用户登陆成功: 不可以访问login(指向首页)  其它的都可以访问