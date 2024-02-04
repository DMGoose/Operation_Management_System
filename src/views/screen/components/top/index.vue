<template>
    <div class="top">
        <div class="left">
            <span class="lbtn hoverable-element" @click="goHome" @mouseover="isHovered = true"
                @mouseleave="isHovered = false">Back Home</span>
        </div>
        <div class="center">
            <div class="title">Guig Data Visualization</div>
        </div>
        <div class="right">
            <span class="rbtn">Statistical Report</span>
            <span class="time">Current time:{{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import moment from 'moment';
//点击首页按钮回到首页
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';
//获取路由器对象
let $router = useRouter();
let isHovered = ref(false);

//存储当前时间 // pnpm i moment
let time = ref(moment().format('YYYY-MM-DD HH:mm:ss'));
let timer = ref(0);
//按钮的点击回调
const goHome = () => {
    $router.push('/home')
}
//组件挂载完毕更新当前的事件
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(timer.value);  //销毁定时器
})
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 40px;
    display: flex;

    .left {
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .lbtn {
            width: 150px;
            height: 40px;
            float: right;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }

        .hoverable-element:hover {
            cursor: pointer;
        }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 30px;
        }
    }

    .right {
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .rbtn {
            width: 150px;
            height: 40px;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
        }

        .time {
            color: #29fcff;
            font-size: 20px;
        }


    }
}</style>