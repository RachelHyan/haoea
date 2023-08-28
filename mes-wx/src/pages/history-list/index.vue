<template>
  <view class="history-list">
    <nav-bar :title="tempData.objectName" />
    <page-list
      :request="getList"
      custom-search
    >
      <template #search>
        <view class="history-list-head">
          <picker
            :value="monthModel"
            mode="date"
            fields="month"
            @change="monthChange"
          >
            <view class="uni-input history-list-picker-content">
              <text>{{ monthModel }}</text>
              <uni-icons
                type="bottom"
                color="#999"
                size="20"
              />
            </view>
          </picker>
        </view>
      </template>
      <template #row="{ row }: {row: MES.SimpleWechatInspectionRecordDTO}">
        <view
          class="history-list-item"
          @click="handleItem(row)"
        >
          <view>
            <image
              style="width: 26rpx;height: 26rpx;margin-right: 15rpx;"
              src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/task-icon.png"
            />
            <text :style="{color: row.isProblem ? '#EC4543' : '#000'}">
              {{ row.createTime }}
            </text>
          </view>
          <view>
            <text style="color: #ADABB4;">
              {{ row.inspectionUserName }}
            </text>
          </view>
        </view>
      </template>
    </page-list>
  </view>
</template>
<script lang='ts'>
import { mesWechatCaptainSimpleSelectInspectionRecordList } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import PageList from "@/components/page-list/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HistoryList",
  components: { NavBar, PageList, },
  setup(){
    const projectId = uni.getStorageSync("projectInfo").projectId
    const pageListRef = ref()
    const tempData = ref<{objectId?: number,objectName?: string}>({})
    const monthModel: Ref<string> = ref<string>(dayjs().format("YYYY-MM"))

    onLoad((option) => {
      tempData.value = JSON.parse(decodeURIComponent(<any>option.data))
    })

    const getList = async () => {
      const {data,} = await mesWechatCaptainSimpleSelectInspectionRecordList({
        month: monthModel.value,
        objectId: <number>tempData.value.objectId,
        projectId,
      })
      return {data,}
    }

    const monthChange = ({detail,}: any) => {
      monthModel.value = detail.value
      pageListRef.value.load()
    }

    const handleItem = (val: MES.SimpleWechatInspectionRecordDTO) => {
      const params = {
        ...val,
        objectName: tempData.value.objectName,
        objectId: tempData.value.objectId,
        pageMethod: "detail",
      }
      uni.navigateTo({url: `/pages/supervise-form/index?data=${encodeURIComponent(JSON.stringify(params))}`,})
    }

    return {
      pageListRef,
      tempData,
      monthModel,
      monthChange,
      handleItem,
      getList,
    }
  },
})
</script>
<style lang='scss'>
.history-list {
	&-head {
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 2rpx solid #e5e5e5;
		padding: 0 32rpx;
		font-size: 28rpx;
	}

	&-picker-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&-item {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
