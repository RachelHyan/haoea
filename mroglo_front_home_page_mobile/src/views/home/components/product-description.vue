<template>
  <div class="home-product-description">
    <div class="product-icon-box">
      <div
        v-for="(item, index) in productIcons"
        :key="index"
        class="product-icon"
      >
        <img :src="item.src">
        <p>{{ item.title }}</p>
      </div>
    </div>
    <van-swipe
      ref="productSwipeRef"
      class="product-swiper"
      lazy-render
      :autoplay="5000"
      @change="swipeChange"
    >
      <van-swipe-item
        v-for="(item, index) in productSwipes"
        :key="index"
      >
        <div class="swipe-item">
          <img
            :src="item.src"
            style="width: 100%;"
          >
          <div
            v-if="index === 0"
            class="product-intelligent-car"
            :class="currentKey === index ? 'swipe-animation ' : ''"
          >
            <div class="intelligent-car-title">
              无人驾驶环卫车
            </div>
            <div class="intelligent-car-content">
              高等级无人驾驶系统<br>
              > 无间断多源融合SLAM技术<br>
              > 自学习演进型复杂场景理解技<br>
              > 五层安全防护系统 车规级安全设计<br>
              > 自主/5G远程多作业模式<br>
              > 新能源动力驱动 节能减排<br>
              > 智能定制作业场景清扫与检测
            </div>
          </div>
          <div
            v-if="index === 1"
            class="product-intelligent-car"
            :class="currentKey === index ? 'swipe-animation ' : ''"
          >
            <div class="intelligent-car-title">
              数字环卫解决方案
            </div>
            <div class="intelligent-car-content">
              城市之光贯彻国家双碳双减的战略，遵循数字化时代的趋势，以建设智慧城市为动力，以绿色低碳创新技术为依托，以提升环卫作业质量为目标，以降低环卫运营成本为愿景，提供环卫全智能产业链一体化服务，实现环卫业务链全流程的信息化，流程化，精细化和智能化管理，在提高智慧城市管理水平的同时，改善城市人民的生活环境。
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script lang='ts'>
import type { SwipeInstance } from "vant"
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "ProductDescription",
  setup() {
    const productSwipeRef = ref<SwipeInstance>()
    const currentKey = ref<number>(0)

    const productIcons = [
      { src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Fhp-icon1.png", title: "无人驾驶环卫车", },
      { src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Fhp-icon2.png", title: "数字环卫解决方案", },
      { src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Fhp-icon3.png", title: "无人驾驶环卫优势", }
    ]
    const productSwipes = [
      { src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Flbt1.png", content: null, },
      { src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Flbt2.png", content: null, },
      { src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Flbt3.png", content: null, }
    ]

    const swipeChange = (index: number) => {
      currentKey.value = index
    }
    return {
      productSwipeRef,
      productIcons,
      productSwipes,
      swipeChange,
      currentKey,
    }
  },
})
</script>
<style lang='less'>
.home-product-description {
	color: #3E3A39;

	.product-icon-box {
		width: 342px;
		display: flex;
		justify-content: space-between;
		margin: 30px 16px;

		.product-icon {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			width: 105px;
			height: 105px;
			box-shadow: 0 0 5px 0 #ccc;

			img {
				width: 55px;
				height: 70px;
				margin: 0 auto;
			}

			p {
				text-align: center;
				font-size: 10px;
				font-weight: bold;
				line-height: 20px;
				margin: 0;
				padding: 0;
			}
		}

	}

	.product-swiper {
		position: relative;

		.swipe-item {
			height: 287px;
			background-size: 100% 100%;

			.product-intelligent-car {
				position: absolute;
				z-index: 1;
				left: 50px;
				top: 50px;
				color: #FFFFFF;
				width: 280px;

				.intelligent-car-title {
					font-size: 15px;
					font-weight: 800;
					line-height: 40px;
				}

				.intelligent-car-content {
					font-size: 10px;
					font-weight: 500;
					line-height: 20px;
				}
			}
		}
	}
}

.swipe-animation {
	animation-duration: 1.5s;
	animation-name: fadeInUpBig;
}



@keyframes fadeInUpBig {
	0% {
		opacity: 0;
		transform: translateY(2000px)
	}

	to {
		opacity: 1;
		transform: translateY(0)
	}
}
</style>
