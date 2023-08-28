<template>
  <view
    class="status-bar"
    :style="{ height: statusBarHeight }"
  >
    <slot />
  </view>
</template>
<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatusBar",
  setup(){
    const statusBarHeight = (uni.getSystemInfoSync().statusBarHeight ?? 20) + "px"
		
    return {
      statusBarHeight,
    }
  },
})
</script>
