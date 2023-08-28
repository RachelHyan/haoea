<template>
  <div class="app">
    <img
      src="@/assets/images/logo.png"
      alt="logo"
      style="width:180px"
      class="app-logo"
    >
    <h1 class="app-title">
      Vue3-TS-Template
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup () {
    
    return {}
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