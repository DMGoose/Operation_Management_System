<template>
    <!-- 展示二级组件(主内容)的地方 -->
    <router-view v-slot="{ Component}">
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" v-if="flag"/>
        </transition>
    </router-view>
    
</template>
  
<script setup lang="ts">
import {watch,ref, nextTick} from 'vue'
    import useLayOutSettingStore from '@/store/modules/setting';
    let LayOutSettingStore = useLayOutSettingStore();

    //控制当前组件是否销毁
    let flag = ref(true);
    //监听仓库内部的数据是否变换, 来判断是否要刷新
    watch(()=>LayOutSettingStore.refresh, ()=>{  
        //点击刷新按钮, 路由组件需要销毁
        flag.value = false;
        //当渲染完毕之后
        nextTick(()=>{
            flag.value = true;
        })
    })  
</script>

<script lang="ts">
    export default {
        name:"Main"
    }
</script>
  
<style scoped lang="scss">
.fade-enter-from {
    opacity: 0.1;
    transform: scale(0.5);
}

.fade-enter-active {
    transition: all 0.5s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}

</style>