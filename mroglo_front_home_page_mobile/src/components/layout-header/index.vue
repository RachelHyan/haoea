<template>
  <div class="layout-header">
    <img
      src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage/logo.png"
      alt="logo"
      class="layout-header-logo"
      @click="backHome"
    >
    <van-icon
      name="bars"
      color="#fff"
      size="25"
      @click="$emit('show')"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name:"LayoutHeader",
  emits:["show"],
  setup() {
    const router = useRouter()

    const backHome = () => {
      router.push("/")
    }

    return {
      backHome,
    }
  },
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
		justify-content: space-between;
		position: fixed;
		z-index: 9;
		background-color: #000;

		&-logo {
			height: 34px;
		}
	}
</style>
