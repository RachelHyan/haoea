<template>
  <popup-modal
    ref="popupRef"
    :visible="visible"
    :is-border-bottom="false"
    :show-header="false"
    mask
    @update:visible="$emit('update:visible')"
  >
    <view class="selector-popup">
      <view class="selector-popup-head">
        <view><text>{{ title }}</text></view>
        <view class="selector-popup-search">
          <uni-search-bar
            v-model="searchModel"
            placeholder="关键字过滤"
            cancel-button="none"
            bg-color="#F1F1F1"
            @confirm="getList"
            @clear="searchClear"
          />
        </view>
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
          v-else-if="list.length || Object.keys(list).length"
          class="list"
        >
          <template
            v-for="(item,index) in list"
            :key="index"
          >
            <slot
              name="list-item"
              :row="item"
              :index="index"
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

export default defineComponent({
  name: "SelectorPopup",
  components: {PopupModal,},
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      default: "", 
    },
    request: {
      type: Function,
      required: true,
    },
  },
  emit: ["update:visible"],
  options: { styleIsolation: "shared", },
  setup(props){
    const popupRef = ref()
    const searchModel: Ref<string> = ref<string>("")
    const list: Ref<any[]> = ref<any[]>([])
    const loading: Ref<boolean> = ref<boolean>(false)

    const getList = async () => {
      loading.value = true
      const params: Record<string,string> = {}
      searchModel.value !== "" && (params.name = searchModel.value)
      try {
        const {data,} = await props.request(params)
        list.value = data
      } catch (error) {
        console.log(props.request.name,error);
      } finally {
        loading.value = false
      }
    }

    const searchClear = () => {
      searchModel.value = ""
      getList()
    }

    const close = () => popupRef.value.close()
		
    getList()
		
    return {
      popupRef,
      searchModel,
      list,
      loading,
      getList,
      searchClear,
      close,
    }
  },
})
</script>
<style lang='scss'>
.selector-popup {
	&-head {
		padding: 30rpx 30rpx 10rpx;
		border-bottom: 2rpx solid #e5e5e5;
		font-size: 28rpx;
	}

	&-search {
		padding: 10rpx 0;

		.uni-searchbar {
			padding: 10rpx 0;
		}

		.uni-searchbar .uni-searchbar__box {
			background-color: #f1f1f1 !important;
		}
	}

	&-scroll {
		height: 500rpx;
	}

	.list-item {
		height: 80rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		border-bottom: 2rpx solid #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.list-item--active {
		background-color: #3E79F7;
		color: #fff !important;
	}

	.list-item-red {
		color: #E81D1D;
	}
}
</style>
