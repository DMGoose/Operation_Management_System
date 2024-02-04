<template>
    <!-- 顶部左侧的静态 -->
    <el-icon style="margin-right:10px" @click="changeIcon">
        <!-- 用component动态渲染和加载相应的组件 -->
        <component :is="LayOutSettingStore.expand? 'Expand':'Fold'"></component>

    </el-icon>
    <!-- 左侧的breadcrumb -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 需要动态展示路由名字,点了之后要能跳转, 因为要通过路由对象去获取 -->
        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key=index v-show="item.meta.title" :to="item.path">
            <!-- 图标 -->
            <el-icon  style="vertical-align:top; margin-right: 3px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 展示匹配路由的标题 -->
            <span> {{ item.meta.title }}  </span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
  
<script setup lang="ts">
//引入vue提供的方法来获取路由对象
import {useRoute} from 'vue-router'
let $route = useRoute();

//定义一个响应式数据控制图标切换, 这个数据未来layout要用, 所以定义到仓库去了
//所以现在变成了引入仓库
import useLayOutSettingStore from '@/store/modules/setting'
//接下来要使用
let LayOutSettingStore = useLayOutSettingStore();
//点击图标的方法
const changeIcon = ()=>{
    //图标进行切换
    LayOutSettingStore.expand = !LayOutSettingStore.expand
}



</script>

<script lang="ts">
    export default {
        name:"Breadcrumb"
    }
</script>
  
<style scoped lang="scss"></style>