<template>
  <div class="layout-header">
    <img
      src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage/logo.png"
      alt="logo"
      class="layout-header-logo"
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name:"LayoutHeader",
})
</script>
<style lang="less">
	.layout-header {
		width: 100vw;
		height: 57px;
		padding: 0 17px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: fixed;
		background-color: #000;

		&-logo {
			height: 34px;
		}
	}
</style>
