<template>
  <div class="page-404">
    <div>
      <img
        src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/data-center/404.png"
        alt=""
      >
      <div style="margin-bottom: 20px;">
        页面不存在
      </div>
      <el-button
        type="primary"
        link
        @click="router.back()"
      >
        返回
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'PageNotFind',
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
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
