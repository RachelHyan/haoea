<template>
  <view class="work-track">
    <nav-bar title="工作轨迹" />
    <map
      id="map"
      ref="map"
      class="map"
      :style="{height: mapHeight}"
      :scale="14"
      :longitude="longitude"
      :latitude="latitude"
      show-compass
      show-location
      :polyline="polyline"
      :markers="markers"
    />
    <popup-modal
      :visible="true"
      :show-header="false"
    >
      <view
        class="work-track-popup"
        :style="{height: popupExpand ? '250px' : '140px'}"
      >
        <view
          class="work-track-popup-tap"
          @click="handleTop"
        >
          <!-- <view class="work-track-popup-tap-icon" /> -->
          <uni-icons
            :type="popupExpand ? 'bottom' : 'top'"
            color="#999"
            size="20"
          />
        </view>
        <view
          v-show="popupExpand"
          class="work-track-popup-head"
        >
          <view class="work-track-popup-user">
            <view class="work-track-popup-user-avatar">
              <image
                style="width: 100%;height: 100%;"
                :src="`https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/work-info-${ detailData.userId ? 'user' : 'car'}-icon.png`"
              />
            </view>
            <view class="work-track-popup-user-name ml20">
              {{ detailData.userId ? detailData.userName : detailData.carNumber }}
            </view>
          </view>
          <view class="work-track-popup-date">
            <uni-datetime-picker
              v-model="currentDate"
              type="date"
              :border="false"
              :start="dayjs().subtract(6, 'day').format('YYYY-MM-DD')"
              :end="dayjs().format('YYYY-MM-DD')"
              :clear-icon="false"
              @change="dateChange"
            />
          </view>
        </view>
        <view class="work-track-popup-card">
          <view
            v-show="popupExpand"
            class="work-track-popup-card-shift"
          >
            <view
              class="work-track-popup-card-shift-name"
              @click="shiftPopup = true"
            >
              <text>{{ detailData.shiftName || "暂无班次" }}</text>
              <uni-icons
                class="ml20"
                type="bottom"
                color="#999"
                size="20"
              />
            </view>
            <view class="work-track-popup-card-shift-time">
              <text>{{ detailData.taskId ? (detailData.startTime ?? '00:00:00') + ' - ' + (detailData.endTime ?? '00:00:00') : '' }}</text>
            </view>
          </view>
          <view class="work-track-popup-card-content">
            <view class="work-track-popup-card-speed">
              <view class="work-track-popup-card-speed-title">
                <text class="color-grey">
                  倍速
                </text>
                <view>
                  <text class="color-orange">
                    {{ sliderModel }}
                  </text>
                  <text class="color-grey">
                    倍
                  </text>
                </view>
              </view>
              <view class="work-track-popup-card-speed-slider">
                <slider
                  class="work-track-popup-card-speed-slider-bar"
                  :min="1"
                  :max="100"
                  :value="80"
                  active-color="#4788F7"
                  @changing="sliderChange"
                />
              </view>
            </view>
            <view
              class="work-track-popup-card-speedplay"
              @click="() => trackData.length && handlePlay()"
            >
              <image
                style="width: 38rpx;height: 40rpx;"
                :src="`https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/work-track-${ playStatus ? 'pause' : 'play' }-icon.png`"
              />
            </view>
          </view>
        </view>
      </view>
    </popup-modal>
    <selector-popup
      ref="selectorPopupRef"
      v-model:visible="shiftPopup"
      title="选择班次"
      :request="getShiftList"
    >
      <template #row="{row}: {row: MES.WechatJobTaskShiftDTO}">
        <view
          class="list-item"
          :class="{'list-item--active': row.taskId === detailData.taskId}"
          @click="handleShift(row)"
        >
          <view>{{ row.shiftName }}</view>
          <view>{{ row.startTime + ' - ' + row.endTime }}</view>
        </view>
      </template>
    </selector-popup>
  </view>
</template>
<script lang='ts'>
import { mesWechatJobStatusSelectShiftListByUserId, mesWechatJobStatusSelectTrackByTaskId } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import PopupModal from "@/components/popup-modal/index.vue";
import SelectorPopup from "@/components/selector-popup/index.vue";
import type { MarkerType } from "@/components/typings";
import { convertPointList } from "@/utils/map";
import { onLoad } from "@dcloudio/uni-app";
import type { MapMarker, MapPolyline } from "@yxgr/uni-app-types";
import dayjs from "dayjs";
import type { Ref } from "vue";
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref } from "vue";

type DetailDataType = {
	userId?: number
	userName?: string
	carId?: number
	carNumber?: string
	taskId?: number
	shiftName?: string
	startTime?: string
	endTime?: string
	jobDuration?: number
}

export default defineComponent({
  name: "WorkTrack",
  components: { NavBar, PopupModal, SelectorPopup, },
  setup() {
    const map = uni.createMapContext("map", getCurrentInstance())
    const polyline: Ref<MapPolyline[]> = ref<MapPolyline[]>([])
    const markers: Ref<MapMarker[]> = ref<MapMarker[]>([])
    const longitude: Ref<number> = ref<number>(0)
    const latitude: Ref<number> = ref<number>(0)
    const currentDate: Ref<string> = ref<string>(dayjs().format("YYYY-MM-DD"))
    const playStatus: Ref<boolean> = ref<boolean>(false) // true: 播放； false: 暂停
    const sliderModel: Ref<number> = ref<number>(256)
    const popupExpand: Ref<boolean> = ref<boolean>(true)
    const trackData: Ref<number[][]> = ref<number[][]>([])
    const shiftPopup: Ref<boolean> = ref<boolean>(false)
    const selectorPopupRef = ref()
    const detailData = reactive<DetailDataType>({})

    const mapHeight = computed(() => {
      const screenHeight = getApp().globalData?.screenHeight - getApp().globalData?.customBarHeight
      const popupHeight = popupExpand.value ? 270 : 160
      return  screenHeight - popupHeight  + "px"
    })

    const startAndEndMarker = computed(() => [
			{
			  id: 1,
			  longitude: trackData.value[0][0],
			  latitude: trackData.value[0][1],
			  width: 32,
			  height: 38,
			  iconPath: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/work-track-start-icon.png",	
			} as MarkerType,
			{
			  id: 2,
			  longitude: trackData.value[trackData.value.length - 1][0],
			  latitude: trackData.value[trackData.value.length - 1][1],
			  width: 32,
			  height: 38,
			  iconPath: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/work-track-end-icon.png",
			} as MarkerType
    ])
    
    onLoad((option) => {
      const data = JSON.parse(decodeURIComponent(<any>option.data))
      detailData.carId = data.carId ? Number(data.carId) : undefined
      detailData.carNumber = data.carId ? data.carNumber : undefined
      detailData.userId = data.userId ? Number(data.userId) : undefined
      detailData.userName = data.userId ? data.userName : undefined
    })
    
    onMounted(async () => {
      await selectorPopupRef.value.load()
      getTrackData()
    })
		
    const getTrackData = async () => {
      if(!detailData.taskId) return;
      try {
        const {data,} = await mesWechatJobStatusSelectTrackByTaskId({taskId: <number>detailData.taskId,})
        if(data.length){
          trackData.value = data
          drawMapElement(trackData.value)
        } else {
          uni.showToast({title: "当前班次暂无轨迹", icon: "none",})
          markers.value = []
          polyline.value = []
        }
      } catch (error) {
      }
    }

    const getShiftList = async () => {
      const params: MES.WechatJobStatusSelectShiftListByUserIdParams = { date: currentDate.value,} as any
      detailData.userId && (params.userId = detailData.userId)
      detailData.carId && (params.carId = detailData.carId)
      const {data,} = await mesWechatJobStatusSelectShiftListByUserId(params)
      if(data && data.length) {
        detailData.taskId = data[0].taskId
        detailData.shiftName = data[0].shiftName
        detailData.startTime = data[0].startTime
        detailData.endTime = data[0].endTime
        detailData.jobDuration = data[0].jobDuration
      } else {
        uni.showToast({title: "当前日期没有工作轨迹",icon: "none",})
        markers.value = []
        polyline.value = []
        detailData.taskId = undefined
        detailData.shiftName = undefined
        detailData.startTime = undefined
        detailData.endTime = undefined
        detailData.jobDuration = undefined
      }
      return { data, }
    }

    const drawMapElement = (data: number[][]) => {
      polyline.value = [{
        points: convertPointList(data),
        color: "#2692FF",
        width: 4, 
      }]
      markers.value = startAndEndMarker.value
      map.includePoints({points: convertPointList(data),padding: [50,50,100,50],})
    }

    const dateChange = async (val: any) => {
      currentDate.value = val
      resetMapData()
      await selectorPopupRef.value.load()
      getTrackData()
    }

    const sliderChange = ({ detail, }: any) => {
      sliderModel.value = detail === 1 ? 1 : 2 ** (Math.ceil(detail.value / 10) - 1)
    }

    const resetMapData = () => {
      playStatus.value = false
      map.removeMarkers({markerIds: [3],})
    }

    const handlePlay = () => {
      playStatus.value = !playStatus.value
      if(playStatus.value) {
        map.addMarkers({
          markers: [{
            id: 3,
            longitude: trackData.value[0][0],
            latitude: trackData.value[0][1],
            width: 32,
            height: 38,
            iconPath: `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/${ detailData.userId ? "personnal" : "car"}-icon-green.png`,
            callout: {
              content: detailData.userId ? detailData.userName : detailData.carNumber,
              display: "ALWAYS",
              borderRadius: 5,
              bgColor: "#fff",
              color: "#000",
              padding: 5,
              fontSize: 12,
            },
          } as MapMarker],
          clear: true,
          success: () => {
						 map.moveAlong({
              markerId: 3,
              path: convertPointList(trackData.value),
              duration: <number>detailData.jobDuration / sliderModel.value * 1000,
              autoRotate: false,
              success: async () => {
                await new Promise((resolve) => setTimeout(resolve, <number>detailData.jobDuration / sliderModel.value * 1000))
                playStatus.value = false
              },
            })
          },
        })
      } else {
        map.addMarkers({
          markers: startAndEndMarker.value,
          clear: true,
        })
      }
    }

    const handleTop = () => {
      popupExpand.value = !popupExpand.value
    }

    const handleShift = async (row: MES.WechatJobTaskShiftDTO) => {
      detailData.shiftName = row.shiftName
      detailData.taskId = row.taskId
      detailData.startTime = row.startTime
      detailData.endTime = row.endTime
      shiftPopup.value = false
      resetMapData()
      getTrackData()
    }

    uni.getLocation({
      type: "gcj02",
      success: (res) => {
        longitude.value = res.longitude
        latitude.value = res.latitude
      },
    })

    return {
      map,
      mapHeight,
      longitude,
      latitude,
      polyline,
      markers,
      popupExpand,
      currentDate,
      trackData,
      playStatus,
      sliderModel,
      shiftPopup,
      selectorPopupRef,
      detailData,
      dateChange,
      sliderChange,
      handlePlay,
      handleTop,
      getShiftList,
      handleShift,
      dayjs,
    }
  },
})
</script>
<style lang='scss'>
.work-track {
	.map {
		width: 100vw;
		transition: height 0.3s;
	}

	&-popup {
		transition: all 0.3s;
		&-tap {
			padding: 10rpx 0;
			display: flex;
			justify-content: center;			
			&-icon {
				width: 80rpx;
				height: 8rpx;
				background: #CBCBCB;
				border-radius: 4rpx;
			}
		}

		&-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 32rpx 34rpx;
		}

		&-user {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&-avatar {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}

			&-name {
				font-size: 32rpx;
				font-weight: 500;
			}
		}

		&-date {
			.uni-date {
				width: 250rpx;
			}
			.uni-date-x--border,.uni-date-x  {
				border-radius: 40rpx !important;
			}
			.uni-date__x-input {
				height: 60rpx !important;
				line-height: 60rpx !important;
				margin-left: 10rpx !important;
				font-weight: 500;
			}
		}

		&-card {
			margin: 0 32rpx;
			background: linear-gradient(180deg, #E4EFFF 0%, #FFFFFF 100%);
			box-shadow: inset 0rpx 1rpx 3rpx 0rpx rgba(255,255,255,0.5);
			border-radius: 28rpx;
			border: 1rpx solid #4b96f959;
			border-bottom: none;

			&-shift {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 26rpx 0;
				margin: 0 26rpx;
				border-bottom: 2rpx solid #97979736;

				&-name {
					font-size: 28rpx;
				}

				&-time {
					font-size: 22rpx;
					color: rgba(0,0,0,0.6);
				}
			}

			&-content {
				margin: 46rpx 32rpx;
				display: flex;
				justify-content: space-between;
			}

			&-speed {
				width: 422rpx;
				
				&-title {
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
				}

				&-slider {
					width: 100%;

					&-bar {
						margin: 10rpx 0;
					}
				}
			}

			&-speedplay {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				background: #2A79F9;
				border: 10rpx solid #DAE8FF;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #fff;
			}
		}
	}
}
</style>
