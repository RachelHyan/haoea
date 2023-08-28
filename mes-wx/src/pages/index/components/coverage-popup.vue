<template>
  <popup-modal
    ref="popupRef"
    :visible="visible"
    :is-border-bottom="false"
    mask
    title="图层元素"
    @update:visible="(val) => $emit('update:visible',val)"
  >
    <view class="coverage-menu">
      <view
        v-if="jobType === 'Manual_cleaning'"
        class="coverage-menu-row"
      >
        <view class="coverage-menu-row-label">
          <text>作业人员</text>
        </view>
        <view class="coverage-menu-row-content">
          <view
            class="coverage-menu-row-content-tag"
            :class="{'tag-active': coverageModel.worker}"
            @click="coverageChange('worker')"
          >
            <text>作业人员</text>
          </view>
        </view>
      </view>
      <view
        v-if="jobType === 'Vehicle_operation'"
        class="coverage-menu-row"
      >
        <view class="coverage-menu-row-label">
          <text>作业车辆</text>
        </view>
        <view class="coverage-menu-row-content">
          <view
            class="coverage-menu-row-content-tag"
            :class="{'tag-active': coverageModel.vehicle}"
            @click="coverageChange('vehicle')"
          >
            <text>作业车辆</text>
          </view>
        </view>
      </view>
      <view class="coverage-menu-row">
        <view class="coverage-menu-row-label">
          <text>作业对象</text>
        </view>
        <view class="coverage-menu-row-content">
          <view
            v-for="(item,index) in inspectionTypes"
            :key="index"
            class="coverage-menu-row-content-tag"
            :class="{'tag-active': coverageModel.object.includes(item.value)}"
            @click="coverageChange('object', item.value)"
          >
            <text>{{ item.label }}</text>
          </view>
        </view>
      </view>
      <view class="popup-foot">
        <button
          class="popup-foot-cancel popup-foot-btn"
          @click="cancelCoverage"
        >
          取消
        </button>
        <button
          class="popup-foot-confirm popup-foot-btn"
          @click="confirmCoverage"
        >
          确认
        </button>
      </view>
    </view>
  </popup-modal>
</template>
<script lang='ts'>
import PopupModal from "@/components/popup-modal/index.vue";
import type { PropType } from "vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "CoveragePopup",
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
    coverageElement: {
      type: Object as PropType<{ worker: boolean, object: string[], vehicle: boolean}>,
      required: true,
    },
  },
  emits: ["update:visible", "confirm"],
  setup(props, {emit,}){
    const popupRef = ref()
    const inspectionTypes: {label: string, value: string}[] = uni.getStorageSync("dict").inspection_type
    const coverageModel = reactive({ worker: props.coverageElement.worker, object: props.coverageElement.object, vehicle: props.coverageElement.vehicle, })

    /** 当图层元素状态改变时 */
    const coverageChange = (label: "worker"|"object"|"vehicle", value?: string) => {
      if(label === "object"){
        coverageModel.vehicle = false
        coverageModel.worker = false
        const index = coverageModel.object.indexOf(<string>value)
        if(index === -1) {
          coverageModel.object.push(<string>value)
        } else {
          coverageModel.object.splice(index,1)
        }
      } else if (label === "worker") {
        coverageModel.worker = !coverageModel.worker
        coverageModel.vehicle = false
        coverageModel.object = []
      } else if (label === "vehicle") {
        coverageModel.worker = false
        coverageModel.vehicle = !coverageModel.vehicle
        coverageModel.object = []
      }
    }

	  const	cancelCoverage = () => {
      popupRef.value.close()
    }

    const confirmCoverage = () => {
      popupRef.value.close()
      emit("confirm", coverageModel)
    }
		
    return {
      popupRef,
      inspectionTypes,
      coverageModel,
      coverageChange,
      cancelCoverage,
      confirmCoverage,
    }
  },
})
</script>
<style lang='scss'>
.coverage-menu {
	padding: 0 32rpx;

	&-row {
		padding: 30rpx 0 0 20rpx;
		background-color: #fff;
		margin: 10rpx 0;

		&-label {
			width: 130rpx;
			font-size: 32rpx;
			margin-bottom: 26rpx;
		}

		&-content {
			flex: 1;
			display: flex;
			flex-wrap: wrap;

			&-tag {
				font-size: 28rpx;
				background: #F3F5F7;
				border-radius: 30rpx;
				color: #595959;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 8rpx 20rpx;
				margin: 0 20rpx 10rpx 0;
			}

			.tag-active {
				color: #fff;
				background: #03AFFC;
			}
		}
	}
}
</style>
