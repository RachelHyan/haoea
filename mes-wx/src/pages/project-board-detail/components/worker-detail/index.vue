<template>
  <view class="worker-detail">
    <page-list
      ref="pageListRef"
      :request="() => ({data: <any[]>detailData.shiftList})"
      custom-search
      :pull-refresh="false"
    >
      <template #head>
        <view class="project-board-detail-title">
          <text>今日排班</text>
        </view>
        <view class="project-board-detail-report">
          <view class="project-board-detail-report-item">
            <text class="project-board-detail-report-item-nums">
              {{ secondsFormat(detailData.jobDuration) }}
            </text>
            <text class="project-board-detail-report-item-title">
              应作业时长
            </text>
          </view>
          <view class="project-board-detail-report-item">
            <text class="project-board-detail-report-item-nums">
              {{ secondsFormat(detailData.actualJobDuration) }}
            </text>
            <text class="project-board-detail-report-item-title">
              实际作业时长
            </text>
          </view>
          <view class="project-board-detail-report-item">
            <text class="project-board-detail-report-item-nums">
              {{ detailData.allotCount ?? '-' }}
            </text>
            <text class="project-board-detail-report-item-title">
              预警次数
            </text>
          </view>
        </view>
      </template>
      <template #row="{row}:{row: MES.WechatUserShiftVo}">
        <view class="project-board-detail-card">
          <view class="project-board-detail-card-row">
            <text class="color-grey">
              作业对象：
            </text>
            <text style="flex: 1;">
              {{ row.objectName ?? '-' }}
            </text>
          </view>
          <view
            v-show="jobType === 'Vehicle_operation'"
            class="project-board-detail-card-row"
          >
            <text class="color-grey">
              作业车辆：
            </text>
            <text>{{ row.carNumber ?? '-' }}</text>
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
                应作业时长
              </text>
              <text class="color-blue ml20">
                {{ secondsFormat(row.jobDuration) }}
              </text>
            </view>
            <view class="project-board-detail-card-bottom-tag">
              <text class="color-grey">
                实际作业时长
              </text>
              <text class="color-blue ml20">
                {{ secondsFormat(row.actualJobDuration) }}
              </text>
            </view>
          </view>
        </view>
      </template>
    </page-list>
  </view>
</template>
<script lang='ts'>
import { mesWechatIndexSelectUserShiftInfo } from "@/api/mes/wechatController";
import PageList from "@/components/page-list/index.vue";
import { secondsFormat } from "@/utils/fn";
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
    const detailData: Ref<MES.WechatUserShiftInfo> = ref<MES.WechatUserShiftInfo>({})

    onMounted(async () => {
      await getDetailData()
      pageListRef.value.load()
    })

    const getDetailData = async () => {
      try {
        const {data,} = await mesWechatIndexSelectUserShiftInfo({projectId, userId: <number>props.userId,})
        detailData.value = data ?? {}
      } catch (error) {
      }
    }
    
    return {
      pageListRef,
      detailData,
      secondsFormat,
    }
  },
})
</script>
