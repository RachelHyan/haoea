<template>
  <uni-popup
    ref="popupRef"
    type="bottom"
    :is-mask-click="isMaskClick"
    :mask-background-color="maskBackgroundColor"
    :safe-area="false"
    @change="popupChange"
    @maskClick="isMaskClick && maskClick()"
  >
    <view
      class="popup-modal"
      :style="{ backgroundColor }"
    >
      <view
        v-if="showHeader"
        class="popup-modal-header"
        :style="{ borderBottom: isBorderBottom ? '2rpx solid #F0F0F0' : 'none', textAlign: title ? 'center' : 'left', padding: '30rpx 30rpx 14rpx' }"
      >
        <text v-if="title">
          {{ title }}
        </text>
        <slot
          v-else
          name="header"
        />
        <view
          v-if="showCloseIcon"
          class="popup-modal-header--close"
          @click="close"
        >
          <image
            class="popup-modal-header--close_icon"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/popup-close.png"
          />
        </view>
      </view>
      <view class="popup-modal-body">
        <slot />
      </view>
      <view
        v-if="bottomCancelItem"
        class="popup-modal-bottom-cancel-item"
        @click="close"
      >
        <text>取消</text>
      </view>
    </view>
  </uni-popup>
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "PopupModal",
  props: {
    /** [v-model:visible]：弹窗显示/隐藏，默认 false |*** 使用了mask的需用v-if,否则概率性点击mask无效 */
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    /** [title]：弹窗标题 */
    title: {
      type: String,
      default: undefined,
    },
    /** [is-border-bottom]：弹窗头部的底部边框线 默认 true */
    isBorderBottom: {
      type: Boolean,
      default: true,
    },
    /** [mask]：遮罩层 默认 false */
    mask: {
      type: Boolean,
      default: false,
    },
    /** [is-mask-click]：蒙版点击是否关闭弹窗 默认 true */
    isMaskClick: {
      type: Boolean,
      default: true,
    },
    /** [show-header]：是否显示头部 默认 true */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /** [show-close-icon]：是否显示头部的删除按钮 默认 true */
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
    /** [bottom-cancel-item]：是否显示底部'取消'按钮 默认 false */
    bottomCancelItem: {
      type: Boolean,
      default: false,
    },
    /** [background-color]：背景颜色 默认 #fff */
    backgroundColor: {
      type: String,
      default: "#fff",
    },
  },
  emits: ["update:visible", "close", "maskClick", "change"],
  options: { styleIsolation: "shared", },
  setup(props, { emit, expose, }) {
    const popupRef = ref();
    const maskBackgroundColor = computed(()=> props.mask ? "#9999994d" : "transparent")

    onMounted(() => {
      props.visible ? popupRef.value.open() : popupRef.value.close()
      props.mask ? null : popupRef.value.closeMask()
    })

    const close = async () => {
      popupRef.value.close()
      emit("close")
      // 解决使用 v-if 关闭弹窗的副作用: 需在父组件绑定ref,通过 ref.value.close()关闭
      await new Promise((resolve) => setTimeout(resolve, 300))			
      emit("update:visible", false)
    }

    /** 
		 * 禁止滚动穿透：(页面)根据 @change 事件接受到的开关状态并修改 page-meta 的 overflow 属性
		 * (IOS的map) 根据 @change 事件接受到的开关状态并修改 map 属性 enable-scroll
		 * <page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
		 */
    const popupChange = ({show,}: {show: boolean}) => emit("change", show)

    const maskClick = () => props.isMaskClick && close()

    watch(() => props.visible, (val) => val ? popupRef.value.open() : popupRef.value.close())

    expose({ close, })

    return {
      popupRef,
      maskBackgroundColor,
      popupChange,
      close,
      maskClick,
    }
  },
})
</script>
<style lang='scss'>
.popup-modal {
  width: 100%;
  // min-height: 400rpx;
  max-height: 1100rpx;
  padding-bottom: 40rpx;
  box-shadow: 0 10rpx 100rpx 0 rgba(3, 35, 69, 0.34);
  border-radius: 15rpx 15rpx 0 0;
  box-sizing: border-box;

	&-header {
		position: relative;
		color: #383131;
		z-index: 11;
		font-size: 36rpx;

		&--close {
			position: absolute;
			right: 30rpx;
			top: 20rpx;
			width: 100rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: right;

			&_icon {
				width: 50rpx;
				height: 50rpx;
				border-radius: 100%;
				vertical-align: middle;
			}
		}
	}

	.popup-modal-bottom-cancel-item {
		border-top: 16rpx solid #ebebeb;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 28rpx;
	}

	.popup-foot {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;

		&-cancel {
			width: 330rpx;
			height: 76rpx;
			line-height: 76rpx;
			font-size: 28rpx;
			border-radius: 100rpx;
			border: 1rpx solid #37A3FF;
			background: #F7FBFF;
			color: #37A3FF;
		}

		&-confirm {
			width: 330rpx;
			height: 76rpx;
			line-height: 76rpx;
			font-size: 28rpx;
			border-radius: 100rpx;
			border: 1rpx solid #37A3FF;
			background: linear-gradient(132deg, #1CA5FD 0%, #2691FF 100%);
			color: #fff;
		}
	}

	.popup-menu {
		&-item {
			text-align: center;
			border-bottom: 2rpx solid #eee;
			padding: 20rpx 0;

			&:last-child {
				border: none;
			}

			&-title {
				font-size: 32rpx;
				margin-bottom: 10rpx;
			}

			&-tip {
				font-size: 28rpx;
			}
		}
	}
}
</style>
