<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { defineComponent } from 'vue';

export default defineComponent({
  setup () {
    const locale = zhCn

    return {
      locale,
    }
  },
})
</script>
<style lang="less">
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
</style>