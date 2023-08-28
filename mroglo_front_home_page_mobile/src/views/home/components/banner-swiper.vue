<template>
  <div class="home-banner">
    <div class="home-banner-title">
      <p class="banner-title-left">
        L4级无人驾驶领军者
      </p>
      <p class="banner-title-right">
        专注智慧环卫领域
      </p>
    </div>
    <van-swipe
      ref="swipeRef"
      class="home-banner-swiper"
      :autoplay="3000"
      :lazy-render="true"
    >
      <van-swipe-item
        v-for="(item, index) in swipeArr"
        :key="index"
      >
        <img
          class="home-banner-img"
          :src="item"
        >
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script lang='ts'>
import type { SwipeInstance } from "vant";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "BannerSwiper",	// 轮播图
  setup() {
    const swipeRef = ref<SwipeInstance>()
    const swipeArr = reactive<string[]>([
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Fhp-lbt1.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Fhp-lbt2.png",
      "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Fhp-lbt3.png"
    ])

    return {
      swipeArr,
      swipeRef,
    }
  },
})
</script>
<style lang='less'>
.home-banner {
	position: relative;
	width: 100vw;

	.home-banner-title {
		width: 209px;
		position: absolute;
		z-index: 1;
		top: 26px;
		left: calc(50vw - 104px);
		font-size: 17px;
		font-weight: 800;
		color: #ffffff;
		line-height: 30px;

		.banner-title-left {
			text-align: left;
		}

		.banner-title-right {
			text-align: right;
		}
	}

	.home-banner-swiper {
		height: 267px;
		
		.home-banner-img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
