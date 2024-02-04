<template>
  <!-- 顶部右侧的静态 -->

  <el-button size="default" icon="Refresh" circle @click="updateRefresh" />
  <el-button size="default" icon="FullScreen" circle @click="fullScreen" />
  <el-popover
    placement="bottom"
    title="Theme Setting"
    :width="200"
    trigger="hover"
  >
    <!-- 表单组件 -->
    <el-form>
      <el-form-item label="Theme Color">
        <!-- 颜色选择器 -->
        <el-color-picker
          @change="changeColor"
          v-model="color"
          show-alpha
          :predefine="predefineColors"
        />
      </el-form-item>
      <el-form-item label="Dark Mode">
        <!-- 暗黑模式按钮 -->
        <el-switch
          @change="changeDark"
          v-model="dark"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunrise"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="default" icon="Setting" circle />
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="width: 30px; height: 30px; margin: 0px 13px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown style="margin-right: 15px">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOut">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

//颜色组件需要的东西
import { ref } from 'vue'

const color = ref('rgba(0,0,0,100)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

let LayOutSettingStore = useLayOutSettingStore()

//获取用户相关的仓库
let userStore = useUserStore()

//获取路由器对象
let $router = useRouter()

//获取路由对象
let $route = useRoute()

//暗黑模式切换button, 收集开关数据
let dark = ref<boolean>(false)

//updateRefsh刷新按钮点击的时间
const updateRefresh = () => {
  LayOutSettingStore.refresh = !LayOutSettingStore.refresh
}

//全屏按钮点击的callback
const fullScreen = () => {
  //DOM对象的一个属性, 用来判断当前是否是全屏, 全屏true,不是全屏false
  let full = document.fullscreenElement
  //切换为全屏
  if (!full) {
    //利用requestFullscreen实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //退出fullscreen
    document.exitFullscreen()
  }
}

//暗黑模式切换: switch开关的change事件(用于暗黑模式)
const changeDark = () => {
  //需要拿到根节点
  let html = document.documentElement
  console.log(html)
  //判断html是否有为dark的class
  dark.value ? (html.className = 'dark') : (html.className = '')
}

//主题颜色设置
const changeColor = () => {
  //通过js修改根节点的央视对象的属性和属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}

//log out callback
const logOut = async () => {
  //第一件事: 需要向服务器发送请求, 目前没有退出登录的接口
  //第二件事: 仓库中关于用户相关的数据要清空 [token\username\avatar]
  //第三件事: 跳转到登录页面
  await userStore.userLogOut()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss"></style>
