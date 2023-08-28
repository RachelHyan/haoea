<template>
  <view class="inspector-detail">
    <page-list
      ref="pageListRef"
      :request="() => ({data: <any[]>detailData.inspectionList})"
      custom-search
      :pull-refresh="false"
    >
      <template #head>
        <view class="project-board-detail-title">
          <text>今日督查</text>
        </view>
        <view class="project-board-detail-report">
          <view class="project-board-detail-report-item">
            <text class="project-board-detail-report-item-nums">
              {{ detailData.inspectionCount ?? '-' }}
            </text>
            <text class="project-board-detail-report-item-title">
              应督查次数
            </text>
          </view>
          <view class="project-board-detail-report-item">
            <text class="project-board-detail-report-item-nums">
              {{ detailData.actualInspectionCount ?? '-' }}
            </text>
            <text class="project-board-detail-report-item-title">
              已督查次数
            </text>
          </view>
          <view class="project-board-detail-report-item">
            <text class="project-board-detail-report-item-nums">
              {{ detailData.unInspectionCount ?? '-' }}
            </text>
            <text class="project-board-detail-report-item-title">
              未督查次数
            </text>
          </view>
        </view>
      </template>
      <template #row="{row}:{row: MES.WechatUserInspectionVo}">
        <view class="project-board-detail-card">
          <view class="project-board-detail-card-row">
            <text class="color-grey">
              作业对象：
            </text>
            <text style="flex: 1;">
              {{ row.objectName ?? '-' }}
            </text>
          </view>
          <view class="project-board-detail-card-row">
            <text class="color-grey">
              作业班次：
            </text>
            <text style="flex: 1;">
              {{ row.shiftName ?? '-' }}
              ({{ (row.startTime ?? '00:00:00') + '-' + (row.endTime ?? '00:00:00') }})
            </text>
          </view>
          <view class="project-board-detail-card-bottom">
            <view class="project-board-detail-card-bottom-tag">
              <text class="color-grey">
                已督查次数
              </text>
              <text class="color-blue ml20">
                {{ row.actualCount ?? '-' }}次
              </text>
            </view>
            <view class="project-board-detail-card-bottom-tag">
              <text class="color-grey">
                未督查次数
              </text>
              <text class="color-blue ml20">
                {{ row.unInspectionCount ?? "-" }}次
              </text>
            </view>
          </view>
        </view>
      </template>
    </page-list>
  </view>
</template>
<script lang='ts'>
import { mesWechatIndexSelectUserInspectionInfo } from "@/api/mes/wechatController";
import PageList from "@/components/page-list/index.vue";
import type { PropType, Ref } from "vue";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "WorkerDetail",
  components: { PageList, },
  props: {
    jobType: {
      type: String as PropType<"Manual_cleaning"|"Vehicle_operation">,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  setup(props){
    const projectId = uni.getStorageSync("projectInfo").projectId
    const pageListRef = ref()
    const detailData: Ref<MES.WechatUserInspectionInfo> = ref<MES.WechatUserInspectionInfo>({})
		
    onMounted(async () => {
      await getDetailData()
      pageListRef.value.load()
    })

    const getDetailData = async () => {
      try {
        const {data,} = await mesWechatIndexSelectUserInspectionInfo({projectId, userId: props.userId,})
        detailData.value = data ?? {}
      } catch (error) {
      }
    }
		
    return {
      pageListRef,
      detailData,
    }
  },
})
</script>
