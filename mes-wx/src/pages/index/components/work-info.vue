<template>
  <popup-modal
    ref="popupRef"
    :visible="visible"
    :is-border-bottom="false"
    :background-color="showPunchClock ? '#FFF' : '#F6F7F9'"
    @update:visible="(val: boolean) => $emit('update:visible', val)"
    @close="$emit('close')"
  >
    <view
      v-if="!showPunchClock"
      class="work-info"
    >
      <view class="work-info-head">
        <view class="work-info-user">
          <view class="work-info-user-avatar">
            <image
              style="width: 100%;height: 100%;"
              :src="`https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/work-info-${ data.userId ? 'user' : 'car'}-icon.png`"
            />
          </view>
          <view>
            <view class="work-info-user-name">
              <text>{{ data.userId ? data.userName : data.carNumber }}</text>
              <view class="work-info-tag">
                <view
                  v-if="data.isOnJob"
                  class="work-info-tag-success"
                >
                  在岗
                </view>
                <view
                  v-if="data.isOffJob"
                  class="work-info-tag-warn"
                >
                  脱岗
                </view>
                <view
                  v-if="data.isOffline"
                  class="work-info-tag-info"
                >
                  离线
                </view>
              </view>
            </view>
            <view class="work-info-user-type">
              {{ data.carId ? data.carType : data.jobType === 'Manual_cleaning' ? '人工清扫' : '车辆作业' }}
            </view>
          </view>
        </view>
      </view>
      <scroll-view
        scroll-y
        class="work-info-scroll"
      >
        <view
          v-if="loadingModel.shift"
          class="loading"
        >
          正在加载数据......
        </view>
        <template v-else-if="workList.length">
          <view
            v-for="(item,index) in workList"
            :key="index"
            class="work-info-card"
          >
            <view class="work-info-card-head">
              <view class="work-info-card-time">
                <image
                  style="width: 25rpx;height: 25rpx;"
                  src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/work-info-time-icon.png"
                />
                <text class="ml20">
                  {{ item.startTime?.slice(11) || '00:00:00' }} - {{ item.endTime?.slice(11) || '00:00:00' }}
                </text>
              </view>
              <view
                v-if="data.jobType === 'Vehicle_operation'"
                class="color-grey"
                style="font-size: 20rpx;"
              >
                {{ data.carId ? `司机：${ item.userName ?? '-'}` : `车牌号：${ item.carNumber ?? '-'}` }}
              </view>
            </view>
            <view class="work-info-card-content">
              <view class="work-info-card-content-col">
                <text class="work-info-card-content-col-title">
                  {{ secondsFormat(item.actualJobDuration) }}
                </text>
                <text class="work-info-card-content-col-tip">
                  作业时长
                </text>
              </view>
              <view class="work-info-card-content-col">
                <text class="work-info-card-content-col-title">
                  {{ converMeterToKm(item.actualJobMileage??0) }} km
                </text>
                <text class="work-info-card-content-col-tip">
                  作业里程
                </text>
              </view>
              <view class="work-info-card-content-col">
                <text class="work-info-card-content-col-title">
                  {{ false || 0 }}
                </text>
                <text class="work-info-card-content-col-tip">
                  预警次数
                </text>
              </view>
            </view>
            <view class="work-info-card-progress">
              <progress
                :percent="convertToPercent(<number>item.actualJobDuration,<number>item.jobDuration)"
                show-info
                font-size="12"
                :border-radius="13"
                :stroke-width="10"
                activeColor="#0487FF"
                backgroundColor="#D8D8D88A"
                class="work-info-card-progress-bar"
              />
            </view>
          </view>
        </template>
        <view
          v-else
          class="work-info-card-none color-grey"
        >
          暂无班次信息
        </view>
      </scroll-view>
      <view class="work-info-foot">
        <button
          v-if="data.userId"
          class="popup-foot-cancel"
          @click="makePhoneCall({name: <string>data.userName,phone: <string>data.phone})"
        >
          <view class="phone-icon">
            <image
              class="phone-icon__img"
              src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/make_phone-icon.png"
            />
          </view>
        </button>
        <button
          v-if="data.userId"
          class="popup-foot-confirm"
          @click="handlePunchRecord"
        >
          打卡记录
        </button>
        <button
          class="popup-foot-confirm"
          @click="handleWorkTrack"
        >
          作业轨迹
        </button>
      </view>
    </view>
    <view
      v-else
      class="punch-clock-record"
    >
      <view class="punch-clock-record-head">
        <view
          class="punch-clock-record-head-left"
          @click="showPunchClock = false"
        >
          <uni-icons
            type="left"
            color="#000"
            size="24"
          />
        </view>
        <view class="punch-clock-record-head-mid">
          今日打卡记录
        </view>
        <view class="punch-clock-record-head-right" />
      </view>
      <scroll-view
        scroll-y
        class="punch-clock-record-scroll"
      >
        <view
          v-if="loadingModel.punchClock"
          class="loading"
        >
          正在加载数据......
        </view>
        <template v-else-if="punchClockList.length">
          <view
            v-for="(item, index) in punchClockList"
            :key="index"
            class="punch-clock-record-item"
          >
            <view class="punch-clock-record-item-circle" />
            <view class="punch-clock-record-item-content">
              <text class="mr20">
                {{ item.clockingTime || '00:00:00' }}
              </text>
              <text>{{ item.clockingUserName || '张三' }}</text>
            </view>
          </view>
        </template>
        <view
          v-else
          class="data-none"
        >
          暂无打卡记录
        </view>
      </scroll-view>
    </view>
  </popup-modal>
</template>
<script lang='ts'>
import { mesWechatJobStatusSelectClockingListByUserId, mesWechatJobStatusSelectJobTaskInfo } from "@/api/mes/wechatController";
import PopupModal from "@/components/popup-modal/index.vue";
import { makePhoneCall, secondsFormat } from "@/utils/fn";
import type { PropType, Ref } from "vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "WorkInfo",
  components: { PopupModal, },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as PropType<MES.WechatUserCarMapDTO & {jobType?: "Manual_cleaning"|"Vehicle_operation"}>,
      required: true,
    },
  },
  emits: ["update:visible", "close"],
  setup(props){
    const popupRef = ref()
    const showPunchClock: Ref<boolean> = ref<boolean>(false)
    const loadingModel = reactive({shift: false, punchClock: false,})
    const workList: Ref<MES.WechatUserCarMapInfo[]> = ref<MES.WechatUserCarMapInfo[]>([])
    const punchClockList: Ref<MES.WechatClockingRecordDTO[]> = ref<MES.WechatClockingRecordDTO[]>([])

    const getWorkInfo = async () => {
      loadingModel.shift = true
      try {
        const {data,} = await mesWechatJobStatusSelectJobTaskInfo({jobType: <string>props.data.jobType,userId: props.data.userId, carId: props.data.carId,})
        workList.value = data
      } catch (error) {
      } finally { loadingModel.shift = false }
    }

    const getPunchData = async () => {
      loadingModel.punchClock = true
      try {
        const {data,} = await mesWechatJobStatusSelectClockingListByUserId({userId: <number>props.data.userId,})
        punchClockList.value = data || []
      } catch (error) {
      } finally { loadingModel.punchClock = false }
    }

    const handlePunchRecord = () => {
      showPunchClock.value = true
      getPunchData()
    }

    const handleWorkTrack = () => {
      const params = {
        userId: props.data.userId,
        userName: props.data.userName,
        carId: props.data.carId,
        carNumber: props.data.carNumber,
      }
      uni.navigateTo({url: `/pages/work-track/index?data=${encodeURIComponent(JSON.stringify(params))}`,})
    }

    const convertToPercent = (current:number, total:number) => {
      return Math.round(current / total * 100)
    }

    const converMeterToKm = (val: number) => {
      return parseFloat((val / 1000).toFixed(2))
    }

    getWorkInfo()
		
    return {
      popupRef,
      showPunchClock,
      workList,
      punchClockList,
      loadingModel,
      makePhoneCall,
      handlePunchRecord,
      handleWorkTrack,
      convertToPercent,
      converMeterToKm,
      secondsFormat,
    }
  },
})
</script>
<style lang='scss'>
.work-info {

	&-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 32rpx 20rpx;
	}

	&-user {
		display: flex;
		align-items: center;

		&-avatar {
			width: 90rpx;
			height: 90rpx;
			border-radius: 100%;
			margin-right: 20rpx;
		}

		&-name {
			font-size: 32rpx;
			display: flex;
			align-items: center;
			font-weight: 500;
		}

		&-type {
			font-size: 20rpx;
			color: #2E7BFD;
		}
	}

	&-tag {
		display: flex;
		justify-content: flex-end;

		&-success, &-warn, &-info {
			width: 60rpx;
			height: 34rpx;
			line-height: 34rpx;
			text-align: center;
			border-radius: 6rpx;
			margin-left: 10rpx;
      font-size: 22rpx;
			color: #fff;
		}
		
		&-success {
			background: #86CDB8;
		}

		&-warn {
			background: #DAB77F;
		}

		&-info {
			background: #BFBFBF;
		}
	}

	&-scroll {
		height: 560rpx;
	}

	&-card {
		padding: 24rpx;
		border-radius: 16rpx;
		background-color: #fff;
		margin: 0 32rpx 20rpx;

		&-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 24rpx;
			border-bottom: 2rpx solid rgba(151, 151, 151, 0.21);
		}
		
		&-time {
			display: flex;
			align-items: center;
			font-size: 24rpx;
		}

		&-content {
			display: flex;
			justify-content: space-around;
			align-items: center;

			&-col {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 24rpx 0 32rpx;

				&-title {
					font-size: 32rpx;
					font-weight: 500;
					margin-bottom: 14rpx;
				}

				&-tip {
					font-size: 24rpx;
					color: rgba(0,0,0,0.6);
				}
			}
		}

		&-progress {
			display: flex;
			font-size: 24rpx;
			justify-content: center;

			&-bar {
				width: 560rpx;
				margin-right: 12rpx;
			}
		}

		&::after {
			display: block;
			content: "";
			height: 0;
		}

		&-none {
			width: 684rpx;
			height: 256rpx;
			background: #FFFFFF;
			border-radius: 15rpx;
			margin: 0 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
		}
	}

	&-foot {
		margin-bottom: -40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 20rpx 32rpx 40rpx;
		box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, .16), 0 0 rgba(0, 0, 0, .16);

		.popup-foot-cancel, .popup-foot-confirm {
			width: 215rpx !important;
			height: 65rpx !important;
			line-height: 65rpx !important;
		}
	}
}

.punch-clock-record {
	&-head {
		display: flex;
    justify-content: space-between;
		align-items: center;
		padding: 40rpx 32rpx;
		margin-top: -44rpx;

		&-left, &-right {
			width: 100rpx;
		}
	}

	&-scroll {
		height: 666rpx;
		background-color: #F6F7F9;
	}

	&-item {
		margin: 0 32rpx;

		&-circle {
			width: 16rpx;
			height: 16rpx;
			background: #50B89A;
			border-radius: 100%;
			display: inline-block;
			margin-right: 20rpx;
		}

		&-content {
			display: inline-block;
		}

		&::after {
			display: block;
			content: "";
			width: 2rpx;
			height: 60rpx;
			background: #D5D5D5;
			margin-left: 6rpx;
		}

		&:first-child {
			margin-top: 30rpx;
		}

		&:last-child {
			&::after {
				display: none;
			}
		}
	}
}
</style>
