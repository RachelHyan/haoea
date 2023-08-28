<template>
  <view class="object-detail">
    <view class="object-detail-tab">
      <uni-segmented-control
        :current="current"
        :values="tabData"
        style-type="text"
        @click-item="onClickItem"
      />
    </view>
    <view class="object-detail-content">
      <today-schedule
        v-if="current === 0"
        :job-type="jobType"
        :object-id="objectId"
      />
      <today-inspection
        v-if="current === 1"
        :job-type="jobType"
        :object-id="objectId"
      />
    </view>
  </view>
</template>
<script lang='ts'>
import type { PropType, Ref } from "vue";
import { defineComponent, ref } from "vue";
import TodayInspection from "./components/today-inspection.vue";
import TodaySchedule from "./components/today-schedule.vue";

export default defineComponent({
  name: "ObjectDetail",
  components: { TodayInspection, TodaySchedule, },
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
  setup(){
    const userRole = uni.getStorageSync("userRole")
    const current: Ref<number> = ref<number>(userRole === "INSPECTOR" ? 1 :0)
    const tabData = ["今日排班", "今日督察"]

    const onClickItem = ({currentIndex,}: {currentIndex: number}) => {
      current.value = currentIndex
    }
		
    return {
      current,
      tabData,
      onClickItem,
    }
  },
})
</script>
<style lang='scss'>
.object-detail {
	&-tab {
		margin: 0 32rpx 20rpx;
	}
}
</style>
