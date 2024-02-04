<template>
  <div class="logo" v-show="setting.logoIsHidden">
    <img :src="setting.logo" />
    <p
      class="title1"
      :class="{ expand: LayOutSettingStore.expand ? true : false }"
    >
      {{ setting.title1 }}
    </p>
    <p
      class="title2"
      :class="{ expand: LayOutSettingStore.expand ? true : false }"
    >
      {{ setting.title2 }}
    </p>
  </div>
</template>

<script setup lang="ts">
//引入设置标题于logo的配置文件
import setting from '@/setting'
//引入小仓库, 要拿到菜单是否折叠的这个信息
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  padding: 15px;
  width: 100%;
  height: $base-logo-height;
  color: rgb(67, 67, 67);
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
  }
  .title1 {
    color: rgb(8, 18, 25);
    font-size: $base-logo-title-fontSize;
    padding-left: 3px;
    padding-right: 7px;
    &.expand {
      display: none;
      transition: all 0.2s;
    }
  }
  .title2 {
    font-size: 17px;
    &.expand {
      display: none;
      transition: all 0.2s;
    }
  }
}
</style>
