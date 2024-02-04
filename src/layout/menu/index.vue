<template>
  <!-- template这个标签不会渲染到页面上 用div也行 -->
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path">
        <span>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
        </span>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由但只有一个 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由且数量大于一个 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 递归生成组件 -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
//获取parent组件传递过来的全部route数组
defineProps(['menuList'])
//点击菜单的callback, 参数: el-menu-item的实例
// const goRoute = (vc:any) => {
//     console.log(vc.index);
// }
</script>

<script lang="ts">
export default {
  name: 'Menu', //设置了组件的 name 为 'Menu'
}
</script>

<style scoped lang="scss">
el-menu-item {
  span {
    color: rgb(255, 255, 255);
  }
  el-icon {
    padding-right: 10px;
  }
}
</style>
