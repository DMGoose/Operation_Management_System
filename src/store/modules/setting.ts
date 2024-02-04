// 一个小仓库,关于layout组件配置相关
import {defineStore} from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore',{
    state:() => {
        return{
            expand:false,  //用于控制菜单折叠还是收起
            refresh:false, //用于控制刷新
        }
    }
    
})

export default useLayOutSettingStore;