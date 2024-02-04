<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="el_form_component"
        >
          <h1>Hej!</h1>
          <h2>Welcome to Guig</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              Login in
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
//引入要用的图标
import { User } from '@element-plus/icons-vue'
import { Lock } from '@element-plus/icons-vue'

//引入用户相关的小仓库, 并创建(这样的话才有逻辑和数据在里面)
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

//引入router
import { useRouter, useRoute } from 'vue-router'
//获取router
let $router = useRouter()

//获取路由对象, 用于实现检查query然后跳转
let $route = useRoute()

//引入EL组件的一个消息包(用来提示一些消息)
import { ElNotification } from 'element-plus'

//引入获取时间的函数
import { getTime } from '@/utils/time'

//获取el-form的组件
let el_form_component = ref() //定义变量名需要与ref内命名一致

//收集账号与密码
import { reactive, ref } from 'vue'

let loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})

//自定义校验规则需要的函数
let validatorUsername = (rule: any, value: any, callback: any) => {
  //rule为校验规则的对象
  //value为表单元素的文本内容
  //callback: 如果符合条件通过callback放行, 不符合条件调用callback注入错误信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('Length should be 3 to 10'))
  }
}

let validatorPassword = (rule: any, value: any, callback: any) => {
  //rule为校验规则的对象
  //value为表单元素的文本内容
  //callback: 如果符合条件通过callback放行, 不符合条件调用callback注入错误信息
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('Length should be 6 to 10'))
  }
}

//定义表单需要的校验的对象和规则(rules)
//(记得还要在相应的form item处标注,告诉他我需要校验这个item, 使用props attributes)
const rules = {
  username: [
    //trigger(触发的时机): blur(失去焦点的时候)
    // {required: true, min: 5, max: 10, message: 'Length should be 3 to 10', trigger: 'change' }
    { trigger: 'change', validator: validatorUsername }, //validatorUsername是个方法
  ],
  password: [
    // { required: true, min: 6, max: 10, message: 'Length should be 6 to 10', trigger: 'change' }
    { trigger: 'change', validator: validatorPassword },
  ],
}

//定义变量控制按钮加载的效果
let loading = ref(false)

//登录按钮的callback
const login = async () => {
  //保证全部的表单校验通过才能发请求
  await el_form_component.value.validate() //接收一个callback或返回一个promise, await是接受的Promise成功的结果

  //按钮的加载效果
  loading.value = true
  //点击登陆以后需要做什么? 失败呢?
  //请求成功->展示首首页, 请求失败=>弹出登录失败信息
  //这里要用到try catch, 处理不同的promise结果, 也可以写 .then(), 我写了then

  //通知仓库发登录请求,(注userlogin方法是你自己定义的)
  userStore.userLogin(loginForm).then(
    () => {
      //判断登录的时候是否有query参数, 如果有, 就往query参数跳转, 没有就跳转到首页
      let redirect: any = $route.query.redirect
      $router.push({ path: redirect || '/' })
      //保证登陆成功, 那就跳转到展示数据的页面(需要用到router,去引入), 利用编程式导航跳转到首页
      $router.push('/')
      //登录成功的提示信息
      ElNotification({
        type: 'success',
        message: 'Login Successfully',
        title: `${getTime()}!`,
      })
      //登陆成功, 按钮的加载效果也消失
      loading.value = false
    },
    (error) => {
      //登陆失败, 按钮loading效果消失
      loading.value = false
      ElNotification({
        type: 'error',
        message: (error as Error).message, //断言, 因为error没有ts类型, 我们写成 message: error.message 会报错
      })
    },
  )
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
