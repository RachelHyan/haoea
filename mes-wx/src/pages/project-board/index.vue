<template>
  <view class="project-board">
    <nav-bar
      title="项目看板"
      background-color="transparent"
    />
    <view class="project-board-base">
      <view class="project-board-title">
        <text>基础台账</text>
      </view>
      <view class="project-board-base-box">
        <template v-if="userRole === 'CAPTAIN' || userRole === 'PROJECT_MANAGER'">
          <view
            class="project-board-base-item"
            style="color: #316EC7;"
          >
            <text>{{ projectData.baseData?.grid || 0 }}</text>
            <text style="font-size: 24rpx;">
              作业网格
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #40CFD7;"
          >
            <text>{{ projectData.baseData?.object || 0 }}</text>
            <text style="font-size: 24rpx;">
              作业对象
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #F5A655;"
          >
            <text>{{ projectData.baseData?.user || 0 }}</text>
            <text style="font-size: 24rpx;">
              作业人员
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #6053C3;"
          >
            <text>{{ projectData.baseData?.car || 0 }}</text>
            <text style="font-size: 24rpx;">
              作业车辆
            </text>
          </view>
        </template>
        <template v-if="userRole === 'PROJECT_MANAGER'">
          <view
            class="project-board-base-item"
            style="color: #316EC7;"
          >
            <text>{{ projectData.baseData?.inspectionCount || 0 }}</text>
            <text style="font-size: 24rpx;">
              应督查次数
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #40CFD7;"
          >
            <text>{{ projectData.baseData?.actualInspectionCount || 0 }}</text>
            <text style="font-size: 24rpx;">
              已督查次数
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #F5A655;"
          >
            <text>{{ projectData.baseData?.rectificationCount || 0 }}</text>
            <text style="font-size: 24rpx;">
              应整改次数
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #6053C3;"
          >
            <text>{{ projectData.baseData?.actualRectificationCount || 0 }}</text>
            <text style="font-size: 24rpx;">
              已整改次数
            </text>
          </view>
        </template>
        <template v-if="userRole === 'INSPECTOR'">
          <view
            class="project-board-base-item"
            style="color: #316EC7;"
          >
            <text>{{ projectData.baseData?.object || 0 }}</text>
            <text style="font-size: 24rpx;">
              作业对象
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #40CFD7;"
          >
            <text>{{ projectData.baseData?.inspectionCount || 0 }}</text>
            <text style="font-size: 24rpx;">
              应督查次数
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #F5A655;"
          >
            <text>{{ projectData.baseData?.actualInspectionCount || 0 }}</text>
            <text style="font-size: 24rpx;">
              已督查次数
            </text>
          </view>
          <view
            class="project-board-base-item"
            style="color: #6053C3;"
          >
            <text>{{ projectData.baseData?.unInspectionCount || 0 }}</text>
            <text style="font-size: 24rpx;">
              未督查次数
            </text>
          </view>
        </template>
      </view>
    </view>
    <view class="project-board-body">
      <view class="project-board-title">
        <text>{{ jobType === 'Manual_cleaning' ? '人工清扫' : '车辆作业' }}</text>
      </view>
      <view
        v-if="userRole !== 'INSPECTOR'"
        class="project-board-content"
      >
        <view class="project-board-content-title">
          <text>作业人员</text>
          <text class="color-blue ml20">
            {{ projectData.baseData?.user || 0 }}人
          </text>
        </view>
        <view class="project-board-content-box">
          <view
            class="project-board-content-item"
            @click="goToList('worker', 'shift')"
          >
            <text class="project-board-content-item-nums">
              {{ projectData.workerData?.shiftUser || 0 }}
            </text>
            <text class="project-board-content-item-title">
              已排班
            </text>
          </view>
          <view
            class="project-board-content-item"
            @click="goToList('worker', 'noShift')"
          >
            <text class="project-board-content-item-nums">
              {{ projectData.workerData?.noShiftUser || 0 }}
            </text>
            <text class="project-board-content-item-title">
              未排班
            </text>
          </view>
          <template v-if="jobType === 'Manual_cleaning'">
            <view
              class="project-board-content-item"
              @click="goToList('worker','onJob')"
            >
              <text class="project-board-content-item-nums">
                {{ projectData.workerData?.onJobUser || 0 }}
              </text>
              <text class="project-board-content-item-title">
                在岗
              </text>
            </view>
            <view
              class="project-board-content-item"
              @click="goToList('worker','offJob')"
            >
              <text class="project-board-content-item-nums">
                {{ projectData.workerData?.offJobUser || 0 }}
              </text>
              <text class="project-board-content-item-title">
                脱岗
              </text>
            </view>
            <view
              class="project-board-content-item"
              @click="goToList('worker','offline')"
            >
              <text class="project-board-content-item-nums">
                {{ projectData.workerData?.offlineUser || 0 }}
              </text>
              <text class="project-board-content-item-title">
                离线
              </text>
            </view>
          </template>
        </view>
      </view>
      <view
        v-if="userRole === 'PROJECT_MANAGER'"
        class="project-board-content"
      >
        <view class="project-board-content-title">
          <text>督查人员</text>
          <text class="color-blue ml20">
            {{ (projectData.inspectorData?.inspectionUser || 0) + (projectData.inspectorData?.noInspectionUser || 0) || 0 }}人
          </text>
        </view>
        <view class="project-board-content-box">
          <view
            class="project-board-content-item"
            @click="goToList('inspector', 'inspection')"
          >
            <text class="project-board-content-item-nums">
              {{ projectData.inspectorData?.inspectionUser || 0 }}
            </text>
            <text class="project-board-content-item-title">
              已督查
            </text>
          </view>
          <view
            class="project-board-content-item"
            @click="goToList('inspector', 'unInspection')"
          >
            <text class="project-board-content-item-nums">
              {{ projectData.inspectorData?.noInspectionUser || 0 }}
            </text>
            <text class="project-board-content-item-title">
              未督查
            </text>
          </view>
        </view>
      </view>
      <view class="project-board-content">
        <view class="project-board-content-title">
          <text>作业对象</text>
          <text class="color-blue ml20">
            {{ projectData.baseData?.object || 0 }}个
          </text>
        </view>
        <view class="project-board-content-box">
          <template v-if="userRole !== 'INSPECTOR'">
            <view
              class="project-board-content-item"
              @click="goToList('object', 'shift')"
            >
              <text class="project-board-content-item-nums">
                {{ projectData.jobObjectData?.shiftObject || 0 }}
              </text>
              <text class="project-board-content-item-title">
                已排班
              </text>
            </view>
            <view
              class="project-board-content-item"
              @click="goToList('object', 'noShift')"
            >
              <text class="project-board-content-item-nums">
                {{ projectData.jobObjectData?.noShiftObject || 0 }}
              </text>
              <text class="project-board-content-item-title">
                未排班
              </text>
            </view>
          </template>
          <template v-else>
            <view
              class="project-board-content-item"
              @click="goToList('object', 'allInspection')"
            >
              <text class="project-board-content-item-nums">
                {{ projectData.jobObjectData?.inspection || 0 }}
              </text>
              <text class="project-board-content-item-title">
                应督查
              </text>
            </view>
            <view
              class="project-board-content-item"
              @click="goToList('object', 'inspection')"
            >
              <text class="project-board-content-item-nums">
                {{ projectData.jobObjectData?.actualInspection || 0 }}
              </text>
              <text class="project-board-content-item-title">
                已督查
              </text>
            </view>
          </template>
          <view
            class="project-board-content-item"
            @click="goToList('object','unInspection')"
          >
            <text class="project-board-content-item-nums">
              {{ projectData.jobObjectData?.unInspection || 0 }}
            </text>
            <text class="project-board-content-item-title">
              未督查
            </text>
          </view>
          <view
            class="project-board-content-item"
            @click="goToList('object','unRectification')"
          >
            <text class="project-board-content-item-nums">
              {{ projectData.jobObjectData?.unRectification || 0 }}
            </text>
            <text class="project-board-content-item-title">
              未整改
            </text>
          </view>
        </view>
      </view>
    </view>
    <!-- <view class="project-board-card">
      <view class="project-board-card-title">
        <text>
          作业完成情况
        </text>
      </view>
      <view class="project-board-card-progress">
        <text>{{ jobType === 'Manual_cleaning' ? '人工清扫' : '车辆作业' }}</text>
        <progress
          :percent="0"
          show-info
          :border-radius="13"
          :stroke-width="8"
          font-size="13"
          activeColor="#0487FF"
          backgroundColor="#D8D8D88A"
          class="project-board-card-progress-bar"
        />
      </view>
    </view>
    <view class="project-board-card">
      <view class="project-board-card-title">
        <text>
          督查完成情况
        </text>
      </view>
      <view class="project-board-card-progress">
        <text>全部督查</text>
        <progress
          :percent="20"
          show-info
          :border-radius="13"
          :stroke-width="8"
          font-size="13"
          activeColor="#0487FF"
          backgroundColor="#D8D8D88A"
          class="project-board-card-progress-bar"
        />
      </view>
      <view class="project-board-card-progress">
        <text>甲方评测</text>
        <progress
          :percent="0"
          show-info
          :border-radius="13"
          :stroke-width="8"
          font-size="13"
          activeColor="#0487FF"
          backgroundColor="#D8D8D88A"
          class="project-board-card-progress-bar"
        />
      </view>
    </view> -->
  </view>
</template>
<script lang='ts'>
import { mesWechatIndexQueryBaseBoard, mesWechatIndexSelectInspectionUserStatistic, mesWechatIndexSelectJobObjectStatistic, mesWechatIndexSelectJobUserStatistic } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import { makePhoneCall } from "@/utils/fn";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, reactive, ref } from "vue";

/** shift: 已排班; unShift: 未排班; inspection: 已督查; unInspection: 未督查; unrectified: 未整改; onJob: 在岗; offJob: 脱岗; offline: 离线; rest: 休息; allInspection: 应督查 */
export declare type ProjectBoardFilterType = "shift" | "noShift" | "inspection" | "unInspection" | "unRectification" | "onJob" | "offJob" | "offline" | "rest" | "actualInspection" | "allInspection" | ""

type ProjectDataType = {
	baseData?: MES.WechatBaseBoardDTO
	inspectorData?: MES.WechatInspectionUserStatisticDTO
	jobObjectData?: MES.WechatJobObjectStatisticDTO
	workerData?: MES.WechatJobUserStatisticDTO
}

export default defineComponent({
  name: "PersonnelList",
  components: { NavBar, },
  setup(){
    const projectId = uni.getStorageSync("projectInfo").projectId
    const userRole = uni.getStorageSync("userRole")
    const jobType: Ref<"Manual_cleaning"|"Vehicle_operation"> = ref<"Manual_cleaning"|"Vehicle_operation">("Manual_cleaning")
    const projectData = reactive<ProjectDataType>({})

    onLoad((option) => {
      jobType.value = option.jobType as any
      getBaseData()
      getObjectData()
      userRole === "PROJECT_MANAGER" && getInspectorData()
      userRole !== "INSPECTOR" && getWorkerData()
    })

    const getBaseData = async () => {
      try {
        const { data, } = await mesWechatIndexQueryBaseBoard({projectId,role: userRole,})
        projectData.baseData = data
		 } catch (error) {
		 }
    }

    const getObjectData = async () => {
      try {
        const { data, } = await mesWechatIndexSelectJobObjectStatistic({ projectId, jobType: jobType.value, role: userRole,})
        projectData.jobObjectData = data
      } catch (error) {
      }
    }

    const getInspectorData = async () => {
      try {
        const { data, } = await mesWechatIndexSelectInspectionUserStatistic({projectId, jobType: jobType.value, })
        projectData.inspectorData = data
      } catch (error) {
      }
    }

    const getWorkerData = async () => {
      try {
        const { data, } = await mesWechatIndexSelectJobUserStatistic({projectId, jobType: jobType.value, role: userRole,})
        projectData.workerData = data
      } catch (error) {
      }
    }

    /**
		 * @desc 已排班、未排班盒子的点击事件
		 * @param {String} type 数据类型
		 * @param {Object} filter.left 列表的左侧筛选器内容
		 * @param {Object} filter.right 列表的右侧筛选器内容
		 */
    const goToList = (type: "worker"|"inspector"|"object", status: ProjectBoardFilterType) => {
      uni.navigateTo({ url: `/pages/project-board-list/index?pageType=${type}&jobType=${jobType.value}&status=${status}`, })
    }
		

    return {
      userRole,
      jobType,
      projectData,
      makePhoneCall,
      goToList,
    }
  },
})
</script>
<style lang='scss'>
.project-board {
	position: relative;
	padding-bottom: 40rpx;
	min-height: 100vh;
	box-sizing: border-box;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100vw;
		height: 686rpx;
		background-image: linear-gradient(181deg, #B3DBFE 0%, #D5EBFA 32%, #E5EEFF 58%, rgba(229,238,255,0) 100%);
	}

	&-title {
		font-size: 32rpx;
		font-weight: 500;
		margin: 0 32rpx 30rpx;
	}

	&-base {
		margin: 60rpx 0;

		&-box{
			display: grid;
			grid-template-columns: repeat(4,1fr);
			grid-row-gap: 40rpx;
			padding: 22rpx 36rpx;
			background: rgba(255,255,255,0.3);
			border-radius: 15rpx;
			border: 2rpx solid #FFFFFF;
			backdrop-filter: blur(50px);
			box-shadow: 0rpx 2rpx 9rpx 0rpx rgba(5,45,75,0.15);
			margin: 0 32rpx;
		}

		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;
		}
	}

	&-content {
		margin: 30rpx 32rpx;

		&-title {
			margin-bottom: 30rpx;
			font-size: 28rpx;
		}

		&-box {
			display: grid;
			grid-template-columns: repeat(5,1fr);
			column-gap: 22rpx;
		}

		&-item {
			width: 120rpx;
			height: 156rpx;
			padding: 25rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: column;
			background: #F3F4F8;
			border-radius: 16rpx;
			box-sizing: border-box;

			&-nums {
				font-size: 42rpx;
			}

			&-title {
				font-size: 28rpx;
			}

			&:active {
				color: #fff;
				background: linear-gradient(138deg, #03B1FC 0%, #0488FF 100%);
			}
		}
	}

	&-card {
		margin: 10rpx 32rpx 0;

		&-title {
			font-size: 28rpx;
			font-weight: 500;
		}

		&-progress {
			padding: 30rpx 0;
			border-bottom: 2rpx solid #E5E5E5;
			display: flex;
			align-items: center;
			font-size: 26rpx;

			&-bar {
				margin-left: 40rpx;
				flex: 1;
			}

			&:last-child {
				border-bottom: none;
			}
		}
	}
}
</style>
