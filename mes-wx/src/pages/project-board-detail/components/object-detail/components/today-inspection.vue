<template>
  <view class="today-supervise">
    <page-list
      ref="pageListRef"
      :request="() => ({ data: <any[]>detailData.shiftList })"
      custom-search
      :height="height"
      :pull-refresh="false"
    >
      <template #head>
        <view class="project-board-detail-report">
          <view class="project-board-detail-report-item">
            <text class="project-board-detail-report-item-nums">
              {{ detailData.unInspectionCount ?? '-' }}
            </text>
            <text class="project-board-detail-report-item-title">
              待督查
            </text>
          </view>
          <view class="project-board-detail-report-item">
            <text class="project-board-detail-report-item-nums">
              {{ detailData.unRectificationCount ?? '-' }}
            </text>
            <text class="project-board-detail-report-item-title">
              待整改
            </text>
          </view>
        </view>
      </template>
      <template #row="{row}:{row: MES.WechatJobObjectVo}">
        <view class="project-board-detail-card">
          <view class="project-board-detail-card-row">
            <view class="color-grey">
              督查人员：
            </view>
            <view style="flex: 1;">
              <text>{{ row.userName ?? '-' }}</text>
            </view>
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
                待督查
              </text>
              <text class="color-blue ml20">
                {{ row.unInspectionCount ?? '-' }} 次
              </text>
            </view>
            <view class="project-board-detail-card-bottom-tag">
              <text class="color-grey">
                待整改
              </text>
              <text class="color-blue ml20">
                {{ row.unRectificationCount ?? '-' }} 次
              </text>
            </view>
          </view>
        </view>
      </template>
    </page-list>
  </view>
</template>
<script lang='ts'>
import { mesWechatIndexSelectJobObjectInfo } from "@/api/mes/wechatController";
import PageList from "@/components/page-list/index.vue";
import type { PropType, Ref } from "vue";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "TodaySupervise",
  components: { PageList, },
  props: {
    jobType: {
      type: String as PropType<"Manual_cleaning"|"Vehicle_operation">,
      required: true,
    },
    objectId: {
      type: Number,
      required: true,
    },
  },
  setup(props){
    const pageListRef = ref()
    const detailData: Ref<MES.WechatJobObjectInfo> = ref<MES.WechatJobObjectInfo>({})

    onMounted(async () => {
      await getDetailData()
      pageListRef.value.load()
    })

    const getDetailData = async () => {
      try {
        const {data,} = await mesWechatIndexSelectJobObjectInfo({ objectId: props.objectId, type: "inspection",})
        detailData.value = data ?? {}
      } catch (error) {
      }
    }

		
    return {
      pageListRef,
      detailData,
      height: `calc(100vh - ${getApp().globalData?.customBarHeight}px - 90rpx)`,
    }
  },
})
</script>
