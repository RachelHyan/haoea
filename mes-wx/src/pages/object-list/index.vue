<template>
  <view class="object-list">
    <nav-bar title="对象列表" />
    <page-list
      ref="pageListRef"
      :request="getObjectList"
      laypage
      custom-search
    >
      <template #search>
        <view class="object-list-filter">
          <view
            class="object-list-filter-type"
            @click="objectTypeVisible = true"
          >
            <text
              v-if="objectTypeModel === ''"
              class="color-grey"
            >
              对象类型
            </text>
            <text v-else>
              {{ objectTypeList.find(item => item.value == objectTypeModel)?.label }}
            </text>
            <uni-icons
              type="bottom"
              color="#999"
              size="20"
            />
          </view>
          <view class="object-list-filter-search">
            <uni-search-bar
              v-model="searchModel"
              placeholder="对象名称"
              cancel-button="none"
              bg-color="#F1F1F1"
              @confirm="pageListRef.reload()"
              @clear="() => (searchModel = '', pageListRef.reload())"
            />
          </view>
        </view>
      </template>
      <template #row="{row}: {row: MES.WechatObjectDTO}">
        <view
          class="object-list-item"
          @click="handleObject(row)"
        >
          <view style="flex: 1;">
            <uni-icons
              class="mr20"
              type="gear-filled"
              color="#999"
              size="20"
            />
            <text>{{ row.objectName }}</text>
          </view>
          <view style="padding-left: 20rpx;">
            <text class="color-grey">
              {{ objectTypeList.find(type => type.value == row.objectType)?.label }}
            </text>
          </view>
        </view>
      </template>
    </page-list>
    <popup-modal
      v-if="objectTypeVisible"
      v-model:visible="objectTypeVisible"
      :is-border-bottom="false"
      :show-header="false"
      mask
    >
      <scroll-view
        scroll-y
        style="max-height: 900rpx;padding-bottom: 20rpx;"
      >
        <view class="object-type-list">
          <view
            class="object-type-list-item"
            @click="handleObjectType('')"
          >
            全部
          </view>
          <view
            v-for="(item,index) in objectTypeList"
            :key="index"
            class="object-type-list-item"
            @click="handleObjectType(item.value)"
          >
            <text>{{ item.label }}</text>
          </view>
          <view
            class="popup-modal-bottom-cancel-item"
            @click="objectTypeVisible = false"
          >
            <text>取消</text>
          </view>
        </view>
      </scroll-view>
    </popup-modal>
    <popup-modal
      v-if="objectDetailVisible"
      v-model:visible="objectDetailVisible"
      :is-border-bottom="false"
      :show-header="false"
      mask
      bottom-cancel-item
    >
      <view class="object-detail">
        <view class="object-detail-item color-grey">
          {{ objectDetail.objectName }}
        </view>
        <view
          class="object-detail-item"
          style="color: #57B787;"
          @click="handleObjectLocation"
        >
          定位到对象
        </view>
      </view>
    </popup-modal>
  </view>
</template>
<script lang='ts'>
import { mesWechatCaptainSimpleSelectCaptainObjectPageList, mesWechatCaptainSimpleSelectInspectionObjectPageList, mesWechatCaptainSimpleSelectRectificationObjectPageList, mesWechatProjectManagerSimpleSelectObjectPageList } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import type { PageListParam } from "@/components/page-list/index.vue";
import PageList from "@/components/page-list/index.vue";
import PopupModal from "@/components/popup-modal/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, getCurrentInstance, ref } from "vue";

export default defineComponent({
  name: "ObjectList",
  components: { PopupModal, NavBar, PageList, },
  setup(){
    // @ts-ignore
    const channel = getCurrentInstance()?.proxy?.getOpenerEventChannel()
    const userRole = uni.getStorageSync("userRole")
    const projectId = uni.getStorageSync("projectInfo").projectId
    const objectTypeVisible: Ref<boolean> = ref<boolean>(false)
    const objectTypeModel: Ref<string> = ref<string>("")
    const objectTypeList: {label: string, value: string}[] = uni.getStorageSync("dict").scene_type
    const objectDetailVisible: Ref<boolean> = ref<boolean>(false)
    const objectDetail: Ref<MES.WechatObjectDTO> = ref<MES.WechatObjectDTO>({})
    const jobType: Ref<"Manual_cleaning"|"Vehicle_operation"> = ref<"Manual_cleaning"|"Vehicle_operation">("Manual_cleaning")
    const pageListRef = ref()
    const searchModel: Ref<string> = ref<string>("") 

    onLoad((option)=> jobType.value = option.jobType as any)

    const getObjectList = async (params: PageListParam & MES.WechatProjectManagerSimpleSelectObjectPageListParams) => {
      params.projectId = projectId
      params.jobType = jobType.value
      objectTypeModel.value !== "" && (params.objectType = objectTypeModel.value)
      searchModel.value !== "" && (params.objectName = searchModel.value)

      const { data, current, pages, total, pageSize, } = await (
        userRole === "INSPECTOR" ? mesWechatCaptainSimpleSelectInspectionObjectPageList(params) :
          userRole === "PROJECT_MANAGER" ? mesWechatProjectManagerSimpleSelectObjectPageList(params) : 
            userRole === "CAPTAIN" ? mesWechatCaptainSimpleSelectCaptainObjectPageList(params) :
              mesWechatCaptainSimpleSelectRectificationObjectPageList(params))
      return {data, current, pages, total, pageSize,}
    }

    const handleObjectType = (val: any) => {
      objectTypeVisible.value = false
      objectTypeModel.value = val
      pageListRef.value.reload()
    }

    const handleObject = (val: any) => {
      objectDetail.value = val
      objectDetailVisible.value = true
    }

    const handleObjectLocation = () => {
      channel.emit("openDetail",objectDetail.value)
      uni.navigateBack()
    }

    return {
      pageListRef,
      objectTypeModel,
      objectTypeVisible,
      objectTypeList,
      objectDetailVisible,
      objectDetail,
      searchModel,
      getObjectList,
      handleObject,
      handleObjectType,
      handleObjectLocation,
    }
  },
})
</script>
<style lang='scss'>
.object-list {
	&-filter {
		height: 100rpx;
		border-bottom: 2rpx solid #e5e5e5;
		padding-left: 32rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&-type {
			width: 50%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 20rpx;
			border-right: 2rpx solid #eee;
		}

		&-search {
			width: 50%;
		}
	}

	&-item {
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 27rpx 0;
		border-bottom: 2rpx solid #e5e5e5;
	}

	.object-type-list, .object-detail {
		&-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			font-size: 28rpx;
			border-bottom: 2rpx solid #e5e5e5;
		}
	}
}
</style>
