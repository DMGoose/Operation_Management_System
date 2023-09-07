import { createApp } from 'vue'
import App from '@/App.vue'

//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//配置element-plus国际化,我就不配置了, 可以把组件的默认语言设为你想要的语言

//获取应用instance
const app = createApp(App)

//使用element-plus
app.use(ElementPlus)

//获取当前是什么环境
// console.log(import.meta.env);

//SVG插件的配置代码
import 'virtual:svg-icons-register'

//引入自定义插件对象, 注册整个项目的全局组件
import globalComponent from '@/components'
//安装自定义插件, 它就会触发install方法
app.use(globalComponent)

//引用模板的全局样式
import '@/styles/index.scss'

//测试代码: 测试假的接口是否能使用
import axios from 'axios'
//登录接口
axios({
    url: '/api/user/login',
    method: 'post',
    data:{
        username:'admin',
        password:'111111'
    }
})

//mounted
app.mount('#app')


