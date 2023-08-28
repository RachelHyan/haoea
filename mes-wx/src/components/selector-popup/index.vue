<template>
  <popup-modal
    v-if="visible"
    ref="popupRef"
    :visible="visible"
    :title="title"
    mask
    :is-mask-click="isMaskClick"
    :background-color="backgroundColor"
    :is-border-bottom="false"
    @update:visible="(val:boolean) => $emit('update:visible', val)"
  >
    <view class="selector-popup">
      <view class="selector-popup-search">
        <uni-search-bar
          v-if="search"
          v-model="searchModel"
          :placeholder="searchPlaceholder"
          :focus="focus"
          cancel-button="none"
          bg-color="#F1F1F1"
          @confirm="load"
          @clear="()=> (searchModel = '',load())"
        />
      </view>
      <scroll-view
        scroll-y
        class="selector-popup-scroll"
      >
        <view
          v-if="loading"
          class="loading"
        >
          正在加急获取数据
        </view>
        <view
          v-else-if="list.length"
          class="list"
          :class="{'list-grid': gridLayout}"
        >
          <template
            v-for="(item,index) in list"
            :key="index"
          >
            <slot
              name="row"
              :row="item"
              :close="close"
            />
          </template>
        </view>
        <view
          v-else
          class="data-none"
        >
          {{ searchModel !== "" ? '暂无数据' : '暂无数据' }}
        </view>
      </scroll-view>
      <slot
        name="foot"
        :close="close"
      />
    </view>
  </popup-modal>
</template>
<script lang='ts'>
import PopupModal from "@/components/popup-modal/index.vue";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";

export declare type PageListRequestFn = (params: any) => Promise<{ data: any[] }> | { data: any[]; }

export default defineComponent({
  name: "SelectorPopup",
  components: { PopupModal, },
  props: {
    /** v-model:visible 弹窗显示/隐藏，默认 false  */
    visible: {
      type: Boolean,
      required: true,
    },
    request: {
      type: Function,
      required: true,
      default: () => undefined,
    },
    isMaskClick: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: undefined,
    },
    firstLoad: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
    searchPlaceholder: {
      type: String,
      default: "",
    },
    gridLayout: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: "#fff",
    },
  },
  emits: ["update:visible"],
  options: { styleIsolation: "shared", },
  setup(props,{ expose, }){
    const popupRef = ref()
    const loading: Ref<boolean> = ref<boolean>(false)
    const list = ref<any[]>([])
    const searchModel = ref<string>("")
		
    const load = async () => {
      if (props.request && typeof props.request === "function") {
        loading.value = true
        try {
          const {data,} = await props.request({name: searchModel.value,})
          list.value = data
        } catch (error) {
          console.error(props.request.name, error);
        } finally { loading.value = false }
      }
    }

    const close = () => popupRef.value.close()

    props.firstLoad && load()
    expose({ load, close, })

    return {
      popupRef,
      loading,
      list,
      searchModel,
      load,
      close,
    }
  },
})
</script>
<style lang='scss'>
.selector-popup {
	font-size: 28rpx;

	&-search {
		padding: 20rpx 32rpx;

		.uni-searchbar .uni-searchbar__box {
			background: #f1f1f1 !important;
		}
	}

	&-scroll {
		max-height: 860rpx;
		min-height: 500rpx;
	}

	.list {
		font-weight: 400;
	}

	.list-item {
		height: 98rpx;
		box-sizing: border-box;
		padding: 0 36rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-item--active, .list-item:active {
		background-color: #F7FBFF;
		color: $color-blue;
	}

	.list-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		padding: 0 20rpx;

		&-item {
			width: 150rpx;
			height: 200rpx;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			box-sizing: border-box;
			border: 2rpx solid transparent;

			&-avatar {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				border: 1rpx solid #eee;
				overflow: hidden;
			}

			&-text {
				margin-top: 10rpx;
				font-size: 24rpx;
				font-weight: 300;
				text-align: center;
				color: #232121;
			}
		}
	}

	.list-grid-item--active {
		background: rgba(0, 122, 254, 0.04);
		border-radius: 14rpx;
		border-color: rgba(0, 122, 254, 0.15);
	}

	&-foot-btn {
		width: 90vw;
		height: 76rpx;
		background: #2E7BFD;
		border-radius: 100rpx;
		font-size: 28rpx;
		color: #fff;
		padding: 0;
		margin: 0 auto;
	}
}
</style>
