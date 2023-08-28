<template>
  <view class="nav-bar">
    <uni-nav-bar
      :title="title"
      status-bar
      fixed
      :border="border"
      :height="height"
      :color="color"
      :background-color="backgroundColor"
      @clickLeft="clickLeft"
    >
      <template #left>
        <slot name="left">
          <view
            v-if="!customLeft && existBack"
            class="navbar-left"
          >
            <uni-icons
              type="left"
              color="#333"
              size="25"
            />
            <text style="font-size: 28rpx;">
              返回
            </text>
          </view>
        </slot>
      </template>
    </uni-nav-bar>
  </view>
</template>
<script lang='ts'>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  props: {
    /** [title]：导航栏中央标题 */
    title: {
      type: String,
      default: "",
    },
    /** [height]：导航栏高度,默认 55 */
    height: {
      type: [Number, String],
      default: 55,
    },
    /** [click-left]：点击左侧区域的事件，默认 uni.navigateBack */
    clickLeft: {
      type: Function,
      default: uni.navigateBack,
    },
    /** [custom-left]：自定义左侧内容区 默认 false (如左侧不需要内容，则不适用插槽 name=left)*/
    customLeft: {
      type: Boolean,
      default: false,
    },
    /** [border]：导航栏下是否有边框 默认 true */
    border: {
      type: Boolean,
      default: true,
    },
    /** [shadow]：导航栏下是否有阴影 默认 false */
    shadow: {
      type: Boolean,
      default: false,
    },
    /** [color]：文字颜色 默认 #000 */
    color: {
      type: String,
      default: "#000000",
    },
    /** [backgroundColor]：导航栏背景颜色 默认 #FFF */
    backgroundColor: {
      type: String,
      default: "#FFFFFF",
    },
  },
  options: { styleIsolation: "shared", },
  setup(props) {
    const existBack = computed(() => getCurrentPages().length > 1 ? true : false)
		
    // @ts-ignore
    // eslint-disable-next-line vue/no-setup-props-destructure
    getApp().globalData.navBarHeight = props.height,getApp().globalData.customBarHeight = props.height + uni.getSystemInfoSync().statusBarHeight;

    return { existBack, }
  },
})
</script>
<style lang='scss'>
.nav-bar {
	.navbar-left {
		display: flex;
		align-items: center;
	}

	.uni-navbar__header,
	.uni-navbar__placeholder-view {
		background-color: transparent !important;

		.uni-nav-bar-text,
		.uni-navbar__header-btns {
			font-size: 36rpx !important;
		}

		.uni-navbar__header-container {
			font-size: 36rpx;
			font-weight: bold;

			&-inner {
				text-align: center;
			}
		}
	}

	.uni-navbar--border {
		border-bottom-color: #eee !important;
	}
}
</style>
