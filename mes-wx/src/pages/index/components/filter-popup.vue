<template>
  <view class="filter-popup">
    <popup-modal
      ref="popupRef"
      :visible="visible"
      :is-border-bottom="false"
      mask
      title="筛选"
      @update:visible="(val) => $emit('update:visible',val)"
    >
      <view class="popup-filter">
        <!-- <view
          class="popup-filter-row"
          @click="() => (popupList.grid = true,gridSelectorRef.load())"
        >
          <view>
            <text>队别</text>
          </view>
          <view class="color-grey">
            <text>{{ filterModel.gridName || "全部" }}</text>
            <uni-icons
              type="right"
              color="#313131"
              size="12"
            />
          </view>
        </view> -->
        <template v-if="userRole === 'INSPECTOR'">
          <view
            class="popup-filter-row"
            @click="popupList.inspection = true"
          >
            <view>
              <text>作业对象督查状态</text>
            </view>
            <view class="color-grey">
              <text>{{ filterModel.inspection === "all" ? '全部' : filterModel.inspection ? '已督查' : "未督查" }}</text>
              <uni-icons
                type="right"
                color="#313131"
                size="12"
              />
            </view>
          </view>
        </template>
        <template v-else-if="coverageElement.object.length">
          <view
            class="popup-filter-row"
            @click="popupList.problem = true"
          >
            <view>
              <text>作业对象问题控制</text>
            </view>
            <view class="color-grey">
              <text>{{ filterModel.problem === "all" ? '全部' : "问题对象" }}</text>
              <uni-icons
                type="right"
                color="#313131"
                size="12"
              />
            </view>
          </view>
          <view
            class="popup-filter-row"
            @click="popupList.schedule = true"
          >
            <view>
              <text>作业对象排班状态</text>
            </view>
            <view class="color-grey">
              <text>{{ filterModel.schedule === 'all' ? '全部' : filterModel.schedule ? '已排班' : '未排班' }}</text>
              <uni-icons
                type="right"
                color="#313131"
                size="12"
              />
            </view>
          </view>
        </template>
        <template v-else>
          <view
            class="popup-filter-row"
            @click="popupList.jobStatus = true"
          >
            <view>
              <text>{{ coverageElement.worker ? '人员' : '车辆' }} 作业状态</text>
            </view>
            <view class="color-grey">
              <text>{{ filterModel.jobStatus === "onJob" ? '在岗' : filterModel.jobStatus === 'offJob' ? '脱岗' : filterModel.jobStatus === 'offline' ? '离线' : '全部' }}</text>
              <uni-icons
                type="right"
                color="#313131"
                size="12"
              />
            </view>
          </view>
        </template>
        <view class="popup-foot">
          <button
            class="popup-foot-cancel popup-foot-btn"
            @click="$emit('update:visible', false)"
          >
            取消
          </button>
          <button
            class="popup-foot-confirm popup-foot-btn"
            @click="confirmFilter"
          >
            确认
          </button>
        </view>
      </view>
    </popup-modal>
    <!-- 队别选择 -->
    <selector-popup
      v-model:visible="popupList.grid"
      :request="getGridList"
      title="请选择队别"
      search
      search-placeholder="请输入关键字搜索"
      background-color="#F6F7F9"
      class="grid-selector"
    >
      <template #row="{row}">
        <view
          class="grid-selector-item"
          @click="handleGridItem(row)"
        >
          <view>
            <text>{{ row.gridName || "全部" }}</text>
          </view>
          <view
            class="select-icon"
            :class="{'select-icon-active': row.gridId === filterModel.gridId}"
          >
            <uni-icons
              v-if="row.gridId === filterModel.gridId"
              type="checkmarkempty"
              color="#fff"
              size="12"
            />
          </view>
        </view>
      </template>
    </selector-popup>
    <!-- 问题对象选择 -->
    <popup-modal
      v-model:visible="popupList.problem"
      :show-header="false"
      :show-close-icon="false"
      mask
      bottom-cancel-item
    >
      <view class="popup-menu">
        <view
          class="popup-menu-item"
          @click="handleProblem('all')"
        >
          <view class="popup-menu-item-title">
            <text>全部</text>
          </view>
        </view>
        <view
          class="popup-menu-item"
          @click="handleProblem(true)"
        >
          <view class="popup-menu-item-title">
            <text>问题对象</text>
          </view>
        </view>
      </view>
    </popup-modal>
    <!-- 排班情况选择 -->
    <popup-modal
      v-model:visible="popupList.schedule"
      :is-border-bottom="false"
      :show-header="false"
      :show-close-icon="false"
      mask
      bottom-cancel-item
    >
      <view class="popup-menu">
        <view
          class="popup-menu-item"
          @click="handleSchedule('all')"
        >
          <view class="popup-menu-item-title">
            <text>全部</text>
          </view>
        </view>
        <view
          class="popup-menu-item"
          @click="handleSchedule(false)"
        >
          <view class="popup-menu-item-title">
            <text>未排班</text>
          </view>
        </view>
        <view
          class="popup-menu-item"
          @click="handleSchedule(true)"
        >
          <view class="popup-menu-item-title">
            <text>已排班</text>
          </view>
        </view>
      </view>
    </popup-modal>
    <!-- 作业状态选择 -->
    <popup-modal
      v-model:visible="popupList.jobStatus"
      :is-border-bottom="false"
      :show-header="false"
      :show-close-icon="false"
      mask
      bottom-cancel-item
    >
      <view class="popup-menu">
        <view
          class="popup-menu-item"
          @click="handleJobStatus('all')"
        >
          <view class="popup-menu-item-title">
            <text>全部</text>
          </view>
        </view>
        <view
          class="popup-menu-item"
          @click="handleJobStatus('onJob')"
        >
          <view class="popup-menu-item-title">
            <text>在岗</text>
          </view>
        </view>
        <view
          class="popup-menu-item"
          @click="handleJobStatus('offJob')"
        >
          <view class="popup-menu-item-title">
            <text>脱岗</text>
          </view>
        </view>
      </view>
      <view
        class="popup-menu-item"
        @click="handleJobStatus('offline')"
      >
        <view class="popup-menu-item-title">
          <text>离线</text>
        </view>
      </view>
    </popup-modal>
    <!-- 督查情况选择 -->
    <popup-modal
      v-model:visible="popupList.inspection"
      :is-border-bottom="false"
      :show-header="false"
      :show-close-icon="false"
      mask
      bottom-cancel-item
    >
      <view class="popup-menu">
        <view
          class="popup-menu-item"
          @click="handleInspection('all')"
        >
          <view class="popup-menu-item-title">
            <text>全部</text>
          </view>
        </view>
        <view
          class="popup-menu-item"
          @click="handleInspection(false)"
        >
          <view class="popup-menu-item-title">
            <text>未督查</text>
          </view>
        </view>
        <view
          class="popup-menu-item"
          @click="handleInspection(true)"
        >
          <view class="popup-menu-item-title">
            <text>已督查</text>
          </view>
        </view>
      </view>
    </popup-modal>
  </view>
</template>
<script lang='ts'>
import { mesWechatCaptainSimpleSelectCaptainObjectList, mesWechatCaptainSimpleSelectInspectionObjectList, mesWechatCaptainSimpleSelectRectificationObjectList, mesWechatProjectManagerSimpleSelectObjectList } from "@/api/mes/wechatController";
import PopupModal from "@/components/popup-modal/index.vue";
import SelectorPopup from "@/components/selector-popup/index.vue";
import type { PropType } from "vue";
import { defineComponent, reactive, ref } from "vue";

export declare type FilterObjectType = {
	gridId?: number
	gridName?: string
	/** 问题对象 all: 全部; true: 问题对象; */
	problem: "all" | true
	/** 排班情况 all: 全部; true: 已排班; false: 未排班;*/
	schedule: "all" | boolean
	/** 作业状态 all:  全部; onJob: 在岗; offline: 离线; offJob: 脱岗; */
	jobStatus: "all" | "onJob" | "offline" | "offJob"
	/** 督查情况 all: 全部; true: 已督查; false: 未督查; */
	inspection: "all" | boolean
}

export default defineComponent({
  name: "FilterPopup",
  components: { PopupModal, SelectorPopup, },
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
    filterData: {
      type: Object as PropType<FilterObjectType>,
      required: true,
    },
  },
  emits: ["update:visible", "confirm"],
  setup(props, {emit,}){
    const popupRef = ref()
    const projectId = uni.getStorageSync("projectInfo").projectId
    const userRole = uni.getStorageSync("userRole")
    const popupList = reactive({
      grid: false,
      problem: false,
      schedule: false,
      jobStatus: false,
      inspection: false,
    })
    const filterModel = reactive<FilterObjectType>({problem: props.filterData.problem,schedule: props.filterData.schedule,jobStatus: props.filterData.jobStatus,inspection: props.filterData.inspection,})

    const getGridList = async (val: { name: string }) => {
      const params = {projectId,}
      const {data,} = await (userRole === "INSPECTOR" ? mesWechatCaptainSimpleSelectInspectionObjectList(params) : 
        userRole === "PROJECT_MANAGER" ? mesWechatProjectManagerSimpleSelectObjectList(params) :
          userRole === "CAPTAIN" ? mesWechatCaptainSimpleSelectCaptainObjectList(params) : mesWechatCaptainSimpleSelectRectificationObjectList(params));
      const list = data.map(item => item.gridList).flat().filter((value, index, self) => index === self.findIndex(i => JSON.stringify(i) === JSON.stringify(value))).sort((a: any,b: any) => a.gridId - b.gridId)
      list.unshift({gridId: undefined, gridName: "",})
      return {data: list.filter(item => item?.gridName?.includes(val.name||"")),}
    }

		 /** 筛选 ->  队别列表的单项点击事件 */
		 const handleGridItem = (row: any) => {
      filterModel.gridId = row.gridId
      filterModel.gridName = row.gridName
      popupList.grid = false
    }

    /** 筛选 -> 对象问题控制抽屉的单项点击事件 */
    const handleProblem = (val: true | "all") => {
      filterModel.problem = val
      popupList.problem = false
    }

    /** 筛选 -> 对象排班情况抽屉的单项点击事件 */
    const handleSchedule = (val: "all" | boolean) => {
      filterModel.schedule = val
      popupList.schedule = false
    }

    /** 筛选 -> 人员/车辆作业状态抽屉的单项点击事件 */
    const handleJobStatus = (val: "all" | "onJob" | "offline" | "offJob") => {
      filterModel.jobStatus = val
      popupList.jobStatus = false
    }

    /** 筛选 -> 督查情况抽屉的单项点击事件 */
    const handleInspection = (val: "all" | boolean) => {
      filterModel.inspection = val
      popupList.inspection = false
    }

    const confirmFilter = () => {
      emit("confirm", filterModel)
      popupRef.value.close()
    }

    return {
      userRole,
      popupRef,
      popupList,
      filterModel,
      handleGridItem,
      handleProblem,
      handleSchedule,
      handleJobStatus,
      handleInspection,
      confirmFilter,
      getGridList,
    }
  },
})
</script>
<style lang='scss'>
.filter-popup{
	.popup-filter {
		font-size: 32rpx;

		&-row {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 2rpx solid #e5e5e5;
			padding: 0 32rpx;
			box-sizing: border-box;

			&:first-child {
				border: none;
			}
		}
	}

	.grid-selector {
		&-item {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 32rpx;
			background-color: #fff;
			padding: 0 20rpx;

			&:first-child {
				border-radius: 16rpx 16rpx 0 0;
			}

			&:last-child {
				border-radius: 0 0 16rpx 16rpx;
			}

			.select-icon {
				width: 34rpx;
				height: 34rpx;
				border: 1rpx solid #707070;
				border-radius: 100%;
			}
			
			.select-icon-active {
				width: 38rpx;
				height: 38rpx;
				border: none;
				background: linear-gradient(150deg, #03AFFC 0%, #0486FF 100%);
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>
