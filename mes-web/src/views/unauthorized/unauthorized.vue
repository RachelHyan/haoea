<template>
  <default-layout class="unauthorized">
    <div class="unauthorized-content">
      <img
        src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/unauthorized.png"
        alt=""
        width="321"
      >
      <div>
        暂无权限
      </div>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { DefaultLayout } from "@/layout";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UnauthorizedPage",
  components: {
    DefaultLayout,
  },
  setup () {
		

    return {}
  },
})
</script>

<style lang="less">
.unauthorized {
		
	&-content {
		width: 100%;
		height: calc(100vh - 160px);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 20px;

		img {
			margin-bottom: 46px	;
		}

		div {
			margin-left: 40px;
		}
	}
}
</style>
