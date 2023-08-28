<template>
  <view
    class="page-list"
    :style="{height: height}"
  >
    <view class="page-list-filter">
      <slot name="search">
        <view
          v-if="!customSearch"
          class="page-list-filter-search"
        >
          <uni-search-bar
            v-model="searchModel"
            :placeholder="searchPlaceholder"
            cancel-button="none"
            bg-color="#F1F1F1"
            @confirm="load"
            @clear="reload"
          />
        </view>
      </slot>
    </view>
    <slot name="head" />
    <scroll-view
      class="page-list-scroll"
      scroll-y
      :scroll-top="scrollTop"
      :refresher-enabled="pullRefresh"
      refresher-default-style="none"
      :refresher-triggered="triggered"
      scroll-with-animation
      @scrolltolower="() => (laypage && scrollToLower())"
      @refresherpulling="scrollPulling"
      @refresherrefresh="scrollRefresh"
      @scroll="scrollChange"
    >
      <template #refresher>
        <view class="page-list-scroll-refresh">
          <uni-load-more
            :status="loadMoreStatus"
            icon-type="circle"
            :icon-size="20"
            :show-text="false"
          />
          <text class="color-grey ml20">
            {{ refreshContent }}
          </text>
        </view>
      </template>
      <view
        v-for="(item,index) in listData"
        :key="index"
        class="page-list-scroll-item"
      >
        <slot
          name="row"
          :row="item"
          :index="index"
        />
      </view>
      <view
        v-if="(pagination.current > 1 || loadMoreStatus === 'loading') && triggered === false"
        class="page-list-scroll-item page-list-scroll-foot"
      >
        <uni-load-more
          :status="loadMoreStatus"
          icon-type="circle"
          :icon-size="20"
          :content-text="contentBottom"
        />
      </view>
      <template v-if="listData.length === 0 && loadMoreStatus !== 'loading'">
        <slot
          v-if="customEmpty"
          name="empty"
        />
        <view
          v-else
          class="data-none"
        >
          暂无数据
        </view>
      </template>
    </scroll-view>
    <view
      v-if="backTop && backTopVisible"
      class="back-top-fab"
      @click="backTopFn"
    >
      <uni-icons
        type="arrow-up"
        color="#fff"
        size="24"
      />
    </view>
  </view>
</template>
<script lang='ts'>
import { debounce, logger } from "@/utils/fn";
import { onLoad } from "@dcloudio/uni-app";
import type { PropType, Ref } from "vue";
import { defineComponent, reactive, ref } from "vue";

export type PageListRequestFn = (
  params: any
) => Promise<any> | { data: any[]; total?: number; current?: number; pageSize?: number }

export type PageListParam = {
	current?: number
	pageSize?: number
	searchValue?: string
}

export default defineComponent({
  name: "PageList",
  props: {
    /** 数据请求的方法 */
    request: {
      type: Function as PropType<PageListRequestFn>,
      required: true,
    },
    /** 自定义搜索框,默认 false; 该项设置为 true,自定义搜索框使用插槽 #search ,不需要搜索框则不使用插槽 */
    customSearch: {
      type: Boolean,
      default: false,
    },
    /** 搜索框占位内容 默认 "请输入" (customSearch为false时有效) */
    searchPlaceholder: {
      type: String,
      default: "请输入",
    },
    /** 是否启用下拉刷新 默认 true */
    pullRefresh: {
      type: Boolean,
      default: true,
    },
    /** 是否开启分页 默认 false */
    laypage: {
      type: Boolean,
      default: false,
    },
    /** 是否显示回到顶部按钮 默认 true */
    backTop: {
      type: Boolean,
      default: true,
    },
    /** 是否自定义空数据内容 默认 false * 数据为空数组时的自定义插槽 #empty * */
    customEmpty: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String || Number,
      default: `calc(100vh - ${getApp().globalData?.customBarHeight}px)`,
    },
  },
  emits: ["reset"],
  options: { styleIsolation: "shared", },
  setup(props, {emit,}){
    const pagination = reactive({current: 1,pageSize: 15,total: 0,pages: 0,})
    const searchModel: Ref<string> = ref<string>("")
    const listData: Ref<any[]> = ref<any[]>([])
    const scrollTop: Ref<number> = ref<number>(0)
    const triggered: Ref<boolean> = ref<boolean>(false)
    const loadMoreStatus: Ref<"more"|"loading"|"no-more"> = ref<"more"|"loading"|"no-more">("more")
    const refreshContent: Ref<string> = ref<string>("")
    const contentBottom = {
      contentdown: "上拉查看更多",
      contentrefresh: "加载中...",
      contentnomore: "--- 实在没有了 ---",
    }
    const backTopVisible: Ref<boolean> = ref<boolean>(false)
		
    const load = async () => {
      if (props.request && typeof props.request === "function") {
        loadMoreStatus.value = "loading"
        const params: PageListParam = {}
        searchModel.value !== "" && (params.searchValue = searchModel.value)
        try {
          if(props.laypage){
            params.current = pagination.current
            params.pageSize = pagination.pageSize
            const { data, pageSize, total, current, pages, } = await props.request(params)
            pagination.pageSize = pageSize ?? pagination.pageSize ?? 15
            pagination.total = total
            pagination.current = current
            pagination.pages = pages
            data.forEach((item: MES.WechatObjectDTO) => listData.value.push(item))
          } else {
            const { data, } = await props.request(params)
            listData.value = data || []
          }
        } catch (error) {
          logger.error("pagelist->"+props.request.name,error)
        } finally { 
          loadMoreStatus.value = pagination.current < pagination.pages ? "more" : "no-more"
          refreshContent.value = ""
          triggered.value = false
        }
      }
    }

    /** 有一些页面需要上一个页面的参数，作为入参，进行查询列表，所以使用onLoad */
    onLoad(load)

    /** 滚动到底部的事件 */
    const scrollToLower = () => {
      pagination.current++;
      if(pagination.current <= pagination.pages){
        load()
      }
    }

    /** 下拉触发 */
    const scrollPulling = ({detail,}: any) => {
      const scrollY = detail.dy
      if(scrollY === 0){
        refreshContent.value = ""
      }else if(scrollY < 45){
        refreshContent.value = "下拉刷新"
      } else if(scrollY > 45) {
        refreshContent.value = "释放更新"
      }
    }
		
    /** 下拉刷新被触发 */
    const scrollRefresh = async () => {
      pagination.current = 1
      refreshContent.value = "刷新加载中..."
      triggered.value = true
      listData.value = []
      await load()
    }

    /** 滚动监听 */
    const scrollChange = ({detail,}: any) => {
      if((!props.backTop) || (!props.laypage)) return;
      if(detail.scrollTop > 1500) {
        backTopVisible.value = true
      } else {
        backTopVisible.value = false
      }
      debounce(() => (scrollTop.value = detail.scrollTop), 300)
    }
			

    /** 重新加载 */
    const reload = () => {
      searchModel.value = ""
      pagination.current = 1
      pagination.total = 0
      listData.value = []
      emit("reset")
      load()
    }

    /** 回到顶部 */
    const backTopFn = () => {
      scrollTop.value = 0
    }
		
    return {
			 pagination,
			 searchModel,
			 listData,
			 scrollTop,
			 triggered,
			 loadMoreStatus,
			 refreshContent,
			 contentBottom,
			 backTopVisible,
			 load,
			 reload,
			 scrollToLower,
			 scrollPulling,
			 scrollRefresh,
			 scrollChange,
			 backTopFn,
    }
  },
})
</script>
<style lang='scss'>
.page-list {
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&-filter {
		&-search {
			padding: 20rpx 32rpx;
		}
	}

	&-scroll {
		flex: 1;
    overflow: scroll;
    height: 0;

		&-refresh {
			width: 100vw;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26rpx;
		}

		&-item {
			font-size: 28rpx;
			padding: 0 32rpx;
			min-height: 60rpx;
			box-sizing: border-box;

			&:last-child {
				padding-bottom: 40rpx;
			}
		}

		&-foot {
			height: 100rpx;
		}
	}

	.back-top-fab {
		position: fixed;
		right: 36rpx;
		bottom: 100rpx;
		width: 80rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		background-color: #cccccc80;
	}
}
</style>
