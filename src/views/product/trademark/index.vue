<template>
    <el-card class="box-card">
        <!-- 卡片顶部, 有一个添加的按钮 -->
        <el-button type="primary" plain icon="Plus">
            Add
        </el-button>

        <!-- 表格, 用于展示已有的品牌数组 -->
        <el-table style="margin:10px 0" :data="trademarkArr">
            <!-- 
             --border: 设置表格纵向是否有分隔栏
             -- table-column
                -- lable 设置标题
                -- width 设置宽度
                -- align 设置对齐方式 -->
            <el-table-column label="No" width="100px" align="center" type="index"></el-table-column>
            <!-- table-column 默认展示数据用的div, 不想用div就用slot传 -->
            <el-table-column label="Band" prop="tmName"></el-table-column>
            <el-table-column label="IMG">
                <!-- <template #="{ row, $index }">
                    <img :src="row.logoUrl" style="width: 50px; height: 50px;" alt="img missing">
                </template> -->
            </el-table-column>
            <el-table-column label="Description" ></el-table-column>
            <el-table-column label="Edit">
                <template #="{ row, $index }">
                    <el-button type="primary" plain size="small" icon="Edit"></el-button>
                    <el-button type="primary" plain size="small" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>


        <!-- 分页器 -->
        <!-- 
            page-sizes="[1, 3, 5, 7]" 用于设置下拉菜单的数据
            layout="total, sizes, prev, pager, next, jumper" 调整分页器组件的顺序
            `->` 这个箭头的作用就是顶到最右侧去, 见下
        -->
        <el-pagination 
            v-model:current-page="currentPage" 
            v-model:page-size="pageSize" 
            :page-sizes="[1, 3, 5, 7]"
            layout="prev, pager, next, jumper, ->, sizes, total" 
            :total="total" 
            @current-change="getHasTrademark"
            
        />
    </el-card>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入api
import { reqHasTrademark } from '@/api/product/trademark/index';
//引入ts类型

import type {Records, TradeMarkResponseData} from '@/api/product/trademark/type'
//当前页码
const currentPage = ref<number>(1)
//设置每页显示多少条数据
const pageSize = ref<number>(5)

//存储已有品牌的数据的总数(接服务器返回的数据的)
let total = ref<number>(0);

//存储已有品牌的数组
let trademarkArr = ref<Records>([]);

//获取已有品牌的接口, 封装为一个函数 ,想要数据, 就调\这个函数(挂在完毕发请求, 分页器页码变化也发请求)
//这里不走仓库了, 直接把方法内容写在这里
const getHasTrademark = async () => {
    let result: TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value);
    if (result.code == 200) {
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
    }
}

//组件挂载完毕, 发一次请求, 获取第一页, 一页有五个品牌数据
onMounted(() => {
    getHasTrademark();
})

//分页器页面发生变化, 就会触发
//可以传参, pagination给parent组件回传了数据(当前的页码)
// const changePageNo = (a) =>{
//     console.log(a); //这个就是页码
    
//     //页码一变化, 就发请求, 获取对应的数据展示
//     getHasTrademark();
// }
</script>
  
<style scoped lang="scss"></style>