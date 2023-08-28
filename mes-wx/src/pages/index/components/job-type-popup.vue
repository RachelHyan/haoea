<template>
  <popup-modal
    :visible="visible"
    :is-border-bottom="false"
    :show-header="false"
    :show-close-icon="false"
    mask
    bottom-cancel-item
    @update:visible="(val) => $emit('update:visible',val)"
  >
    <view class="popup-menu">
      <view
        class="popup-menu-item"
        @click="handleJobType('Manual_cleaning')"
      >
        <view class="popup-menu-item-title">
          <text>人工清扫</text>
        </view>
      </view>
      <view
        class="popup-menu-item"
        @click="handleJobType('Vehicle_operation')"
      >
        <view class="popup-menu-item-title">
          <text>车辆作业</text>
        </view>
      </view>
      <view style="height: 50rpx;font-size: 28rpx;line-height: 50rpx;text-align: center;color: #9B9797;">
        当前作业类型：{{ jobType === "Manual_cleaning" ? "人工清扫" : "车辆作业" }}
      </view>
    </view>
  </popup-modal>
</template>
<script lang='ts'>
import PopupModal from "@/components/popup-modal/index.vue";
import type { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "JobTypePopup",
  components: { PopupModal, },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    jobType: {
      type: String as PropType<"Manual_cleaning"|"Vehicle_operation">,
      required: true,
    },
  },
  emits: ["update:visible", "change"],
  setup(props,{emit,}){
		 const handleJobType = (val: "Manual_cleaning" | "Vehicle_operation") => {
      emit("update:visible", false)
      if(props.jobType === val) return
      emit("change", val)
    }

    return {
      handleJobType,
    }
  },
})
</script>
