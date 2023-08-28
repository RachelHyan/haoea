<template>
  <view class="loading-page">
    <view class="loading-page__image">
      <image
        style="width: 100%;height: 100%;"
        src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/loading-page-mini.gif"
      />
    </view>
    <view class="loading-page__text">
      <text>
        加载中，稍后片刻...
      </text>
    </view>
  </view>
</template>
<script lang='ts'>
import { effectWeixinTokenUsingPOST } from "@/utils/api";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingPage",
  setup() {
    const userRole = uni.getStorageSync("userRole")
    const token = uni.getStorageSync("token")
    const projectInfo = uni.getStorageSync("projectInfo")

    const checkToken = async () => {
      try {
        const { data, } = await effectWeixinTokenUsingPOST({ token: token, tokenType: "web", })
        if (data) {
          if (!projectInfo.projectId) {
            uni.redirectTo({ url: "/pages/login/index", })
          } else if (userRole === "ONE_PERSONNEL"){
            uni.redirectTo({ url: "/pages/punch-clock-personnal/index", })
          } else if (userRole === "RECTIFIER"){
            uni.redirectTo({ url: "/pages/rectify-list/index", })
          } else {
            uni.redirectTo({ url: "/pages/index/index", })
          }
        } else {
          uni.redirectTo({ url: "/pages/login/index", })
        }
      } catch (error: any) {
        uni.redirectTo({ url: "/pages/login/index", })
      }
    }

    token !== "" ? checkToken() : uni.redirectTo({ url: "/pages/login/index", })

    return { }
  },
})
</script>
<style lang='scss'>
.loading-page {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;

	&__image {
		width: 203rpx;
		height: 361rpx;
		margin: 0 auto 55rpx;
	}

	&__text {
		width: 100vw;
		text-align: center;
		font-size: 28rpx;
	}
}
</style>
