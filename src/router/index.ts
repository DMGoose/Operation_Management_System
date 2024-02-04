//通过vue-router插件实现模板路由配置
import {createRouter, createWebHashHistory} from 'vue-router';
import {constantRoute} from './routes.ts';


//创建router
let router = createRouter({
    //路由的模式:默认是hash模式
    history:createWebHashHistory(),
    routes:constantRoute,
    //添加一个滚动行为
    scrollBehavior(){
        return{
            left:0,
            top:0,
        }
    }
});

console.log(router);

export default router;