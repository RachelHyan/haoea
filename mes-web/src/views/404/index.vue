<template>
  <div class="page-404">
    <div>
      <img
        src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/data-center/404.png"
        alt=""
      >
      <div>
        页面不存在
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageNotFind",
})
</script>
<style lang="less">
.page-404 {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #F6F8FA;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 26px;

		img {
			margin-bottom: 46px	;
		}
	}

}

</style>
