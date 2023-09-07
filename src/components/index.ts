//引入项目中的全局组件(有几个引入几个, 我这里只有一个)
import SvgIcon from './SvgIcon/index.vue'

//全局组件对象,, 把引入的组件全部放入
const allGloablComponent = {SvgIcon}

//对外暴露插件对象
export default{
    //务必叫做install方法, app传进来, 这样就可以用app的component方法来注册全局组件
    //@ts-ignore
    install(app){
        //注册项目全部的全局组件
        Object.keys(allGloablComponent).forEach(key=>{
            //注册全局组件, key是组件的名字
            app.component(key,allGloablComponent[key]);
        });
    }
}