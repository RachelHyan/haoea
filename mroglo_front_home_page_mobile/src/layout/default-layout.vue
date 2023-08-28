<template>
  <div class="default-layout">
    <layout-header @show="showSider = true" />
    <van-popup
      v-model:show="showSider"
      position="right"
      class="default-sider"
    >
      <layout-sider @hidden="showSider = false" />
    </van-popup>
    <router-view />
    <layout-footer />
    <div
      v-show="backTopFlag"
      class="back-top--top"
      @touchend="backTop"
    >
      <van-icon
        name="arrow-up"
        color="#1989fa"
        size="0.6rem"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { LayoutFooter, LayoutHeader, LayoutSider } from "@/components";
import type { Ref } from "vue";
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "DefaultLayout",
  components:{
    LayoutHeader,
    LayoutSider,
    LayoutFooter,
  },
  setup() {
    const showSider:Ref<boolean> = ref<boolean>(false)
    const backTopFlag = ref(false)//用来判断样式

    const backTop = () => {
      let top = document.documentElement.scrollTop//获取点击时页面的滚动条纵坐标位置
      const timeTop = setInterval(() => {
        document.documentElement.scrollTop = top -= 30//一次减50往上滑动
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 5)//定时调用函数使其更顺滑
    }
    const handleScroll = () => {
      if (document.documentElement.scrollTop > 50) {
        backTopFlag.value = true
      } else {
        backTopFlag.value = false
      }
      //往下滑超过20则显示 否则则不显示按钮
    }

    onMounted(() => {
      window.addEventListener("scroll", handleScroll)
    })//监听滚动事件
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll)
    })//离开页面时移除监听事件

    return {
      showSider,
      backTopFlag,
      backTop,
    }
  },
})
</script>
<style lang="less">
	.default-layout {
		background-color: #fff;
		position: relative;
	}
	.default-sider {
		width: 312px;
		height: 100%;
	}
	.root-page {
		padding-top: 57px;
	}

	.back-top--top {
		width: 32px;
		height: 32px;
		background-color: #fff;
		border-radius: 50%;
		position: fixed;
		right: 24px;
		bottom: 24px;
		text-align: center;
		line-height: 32px;
		border: 1px solid #1989fa;
	}
</style>
