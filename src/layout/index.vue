<template>
    <div class="layout_container">

       <!-- 左侧菜单 -->
       <div class="layout_slider" :class="{expand:LayOutSettingStore.expand? true:false}">
            <Logo> </Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">  <!--我们发现滚动组件会把页面撑出去, 所以要给这个滚动条设置一个高度-->
                <!-- 菜单组件 -->
                <el-menu :router="true" :default-active="$route.path" :collapse="LayOutSettingStore.expand? true:false">  
                    <!-- el-menu有个router属性，直接可以开启vue路由模式 -->
                    <!-- 根据route动态的生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
       </div>

       <!-- 顶部导航 -->
       <div class="layout_tabbar" :class="{expand:LayOutSettingStore.expand? true:false}">
            <Tabbar></Tabbar>
       </div>

       <!-- 内容展示区 -->
       <div class="layout_content" :class="{expand:LayOutSettingStore.expand? true:false}">
            <Main></Main>
       </div>
    </div>
</template>
  
<script setup lang="ts" >
//引入左侧菜单的logo组件
import Logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//引入右侧内容展示区(组件)
import Main from './main/index.vue'
//引入顶部的tabbar组件
import Tabbar from './tabbar/index.vue'

//获取路由对象
import {useRoute} from 'vue-router'
let $route = useRoute();  

//引入小仓库, 因为我要从仓库中获取相关的路由(生成菜单用)
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

//引入小仓库, 要拿到菜单是否折叠的这个信息
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore();



</script>
  
<script lang="ts">
    export default {
        name:"Layout"
    }
</script>


<style scoped lang="scss">
.layout_container{
    width: 100%;
    height: 100vh;
}

.layout_slider{
    color: white;
    height: 100vh;
    width: $base-menu-width;
    background:$base-menu-background;
    transition: all 0.2s;
    .scrollbar{
        width:100%;
        height:calc(100vh - $base-logo-height);
        .el-menu{
            background-color: transparent;
            border-right: none;
            //el-menu有class也叫el-menu所以可以通过类名修改，应该是elemnt自带的, 所以前面加了.
        }
    }
    &.expand{
        width: $base-menu-min-width;
    }
}

.layout_tabbar{
    position:fixed;
    top:0px ;
    left:$base-menu-width;
    width:calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.2s;
    &.expand{
        width: calc(100vw - $base-menu-min-width);
        left: $base-menu-min-width;
        
    }
}

.layout_content{
    height: calc(100vh - $base-tabbar-height);
    width:calc(100% - $base-menu-width);
    position: absolute;
    left:$base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;  //这样内容就可以把content这个box撑开
    transition: all 0.2s;
    &.expand{
        width: calc(100vw - $base-menu-min-width);
        left: $base-menu-min-width;
    }
}

</style>