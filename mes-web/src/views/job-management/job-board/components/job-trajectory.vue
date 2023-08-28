<template>
  <el-pro-dialog
    class="job-trajectory"
    :model-value="modelValue"
    title="作业轨迹"
    width="80%"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
    @closed="$emit('closed')"
  >
    <div
      ref="mapRef"
      class="job-trajectory__map"
    >
      <div class="job-trajectory__bottom">
        <el-date-picker
          v-model="dateValue"
          class="job-trajectory__bottom-date"
          type="date"
          placeholder="选择日期"
          @change="handleDateChange"
        />
        <el-select
          v-model="shiftValue"
          class="job-trajectory__bottom-shift"
          placeholder="选择班次"
          @change="handleShiftChange"
        >
          <el-option
            v-for="shift in shiftList"
            :key="shift.taskId"
            :label="`${shift.shiftName} ${shift.jobStartTime}-${shift.jobEndTime}`"
            :value="shift.taskId"
          />
        </el-select>
        <el-select
          v-model="doubleSpeedValue"
          class="job-trajectory__bottom-speed"
          placeholder="请选择倍速"
          @change="handleDoubleSpeedChange"
        >
          <el-option
            v-for="speed in doubleSpeedList"
            :key="speed"
            :label="speed.label"
            :value="speed.value"
          />
        </el-select>
        <el-button
          v-show="!isAnimation"
          type="primary"
          @click="startAnimation"
        >
          播放
        </el-button>
        <el-button
          v-show="isAnimation"

          type="danger"
          @click="pauseAnimation"
        >
          停止
        </el-button>
      </div>
      <div class="job-trajectory__right">
        <div class="job-trajectory__right-top">
          <div class="job-trajectory__right-top--item">
            人员名称：<span>{{ curTrajectoryData.name }}</span>
          </div>
          <div class="job-trajectory__right-top--item">
            人员类型：<span>{{ curTrajectoryData.type }}</span>
          </div>
          <div class="job-trajectory__right-top--item">
            所属组织：<span>{{ curTrajectoryData.org || '暂无' }}</span>
          </div>
        </div>
        <div class="job-trajectory__right-shift">
          <div class="job-trajectory__right-shift--header">
            <div class="job-trajectory__right-shift--header-title">
              作业班次
            </div>
            <div
              class="job-trajectory__right-shift--header-toggle"
              @click="shiftVisible = !shiftVisible;"
            >
              <span>展开</span>
              <el-icon
                size="12"
                :class="shiftVisible ? 'rotate180' : 'rotate0'"
              >
                <ArrowDownBold />
              </el-icon>
            </div>
          </div>
          <div
            v-show="shiftVisible"
            class="job-trajectory__right-shift--body"
          >
            <div
              v-for="item in curShift"
              :key="item.taskId"
              class="job-trajectory__right-shift--body-item"
            >
              <div class="job-trajectory__right-shift--body-item__name">
                {{ item.shiftName }}（{{ item.jobStartTime }} - {{ item.jobEndTime }}）
              </div>
              <div class="job-trajectory__right-shift--body-item__label">
                作业时长：<span>{{ formatSeconds(item.actualJobDuration || 0) }}</span>
              </div>
              <div class="job-trajectory__right-shift--body-item__label">
                作业里程：<span>{{ parseFloat((item.actualJobMileage / 1000).toFixed(2)) }}km</span>
              </div>
              <el-progress
                class="job-trajectory__right-shift--body-item__progress"
                :percentage="Math.round(item.finishRate * 100)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesIndexQueryUserOrCarJobTrackList } from "@/api/mes/indexController";
import { formatSeconds } from "@/utils/fn";
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { ElMessage, dayjs } from "element-plus";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "JobTrajectory",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    curTrajectoryData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [ "update:modelValue", "closed" ],
  setup (props) {
    const mapRef = ref();
    const dateValue = ref(dayjs().format("YYYY-MM-DD"));
    const shiftValue = ref();
    const doubleSpeedValue = ref(256);
    const shiftVisible = ref(false);
    const isAnimation = ref(false);
    const curShift = ref<MES.UserOrCarJobTrackDTO[]>();
    const shiftList = ref<MES.UserOrCarJobTrackDTO[]>();
    const trajectoryList = ref<MES.UserOrCarJobTrackDTO[]>();
    const curTrajectoryData = ref<MES.UserOrCarJobTrackDTO>();
    const doubleSpeedList = [
      {label:"正常",value:1,},
      {label:"2倍速",value:2,},
      {label:"4倍速",value:4,},
      {label:"8倍速",value:8,},
      {label:"16倍速",value:16,},
      {label:"32倍速",value:32,},
      {label:"64倍速",value:64,},
      {label:"128倍速",value:128,},
      {label:"256倍速",value:256,},
      {label:"512倍速",value:512,}
    ]
    let map:AMap.Map;
    let marker:AMap.Marker;
    let trajectory:AMap.Polyline;
    let passedTrajectory:AMap.Polyline;

    onMounted(async() => {
      await lazyAMapApiLoaderInstance;

      map = new AMap.Map(mapRef.value, {
        zooms: [3, 30],
      });

      await  fetchShiftList();
      await fetchTrajectoryData();
    })

    // 速率
    const animationSpeed = computed(() => {
      return (Number(curTrajectoryData.value?.actualJobDuration) / 8) * 1000 * (doubleSpeedValue.value / 512)
    })

    const fetchShiftList = async() => {
      try {
        const {data,} = await mesIndexQueryUserOrCarJobTrackList({
          projectId: props.curTrajectoryData.projectId,
          type: props.curTrajectoryData.sceneType,
          jobDate: dayjs().format("YYYY-MM-DD"),
          objectId: props.curTrajectoryData.objectId,
        })
        curShift.value = data;
      } catch (error) {
				
      }
    }

    const fetchTrajectoryData = async() => {
      try {
        const {data,} = await mesIndexQueryUserOrCarJobTrackList({
          projectId: props.curTrajectoryData.projectId,
          type: props.curTrajectoryData.sceneType,
          jobDate: dayjs(dateValue.value).format("YYYY-MM-DD"),
          objectId: props.curTrajectoryData.objectId,
        })

        if (data.length) {
          shiftList.value = data;
          trajectoryList.value = data;
					
          shiftValue.value = data[0].taskId;
          curTrajectoryData.value = data[0];
        } else {
          shiftList.value = [];
          trajectoryList.value = [];
					
          shiftValue.value = "";
          curTrajectoryData.value = {} as MES.UserOrCarJobTrackDTO;
        }


        drawTrajectory();
      } catch (error) {
				
      }
    }

    const handleDateChange = (val:string) => {
      dateValue.value = val;

      fetchTrajectoryData();
    }

    const handleShiftChange = (val:number) => {
      shiftValue.value = val;
			
      curTrajectoryData.value = trajectoryList.value?.find(item => item.taskId === val);
      drawTrajectory();
    }

    const handleDoubleSpeedChange = (val:number) => {
      doubleSpeedValue.value = val;
      marker && marker.stopMove();
    }

    const drawTrajectory = () => {
      marker && marker.stopMove();
      marker && map.remove(marker);
      trajectory && map.remove(trajectory);
      passedTrajectory && map.remove(passedTrajectory);

      if(!curTrajectoryData.value?.trackList) return

      const icon = props.curTrajectoryData.sceneType === "Manual_cleaning" ? "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/trajectory-user-icon.png" : "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/trajectory-car-icon.png"
				
      marker = new AMap.Marker({
        position: curTrajectoryData.value?.trackList[0] as any,
        icon: new AMap.Icon({
          size: new AMap.Size(51, 65),
          image: icon,
          imageSize: new AMap.Size(51, 65),
        }),
        offset: new AMap.Pixel(-25.5, -65),
      });      

      trajectory = new AMap.Polyline({
        path: curTrajectoryData.value?.trackList as any,
        strokeColor: "#26D3A1",
        strokeWeight: 8,
        strokeOpacity: 1,
      });

      passedTrajectory = new AMap.Polyline({
        strokeColor: "#FF6B6B",
        strokeWeight: 8,
        strokeOpacity: 1,
      });

      map.add(marker);
      map.add(trajectory);
      map.add(passedTrajectory);

      marker.on("moving", function (e) {
        passedTrajectory.setPath(e.passedPath);
      });

      map.setFitView([ marker, trajectory, passedTrajectory ]);
    }

    const startAnimation = () => {
      if (curTrajectoryData.value?.trackList) {
        isAnimation.value = true;
        marker.moveAlong(curTrajectoryData.value?.trackList, {
          speed: animationSpeed.value,
          autoRotation: false,
        });
      } else {
        ElMessage.warning("暂无轨迹数据");
      }
    }

    const pauseAnimation = () => {
      isAnimation.value = false;
      marker.pauseMove();
    }

    return {
      mapRef,
      dateValue,
      shiftValue,
      doubleSpeedValue,
      doubleSpeedList,
      shiftVisible,
      curShift,
      shiftList,
      isAnimation,
      formatSeconds,
      handleDateChange,
      handleShiftChange,
      handleDoubleSpeedChange,
      startAnimation,
      pauseAnimation,
    }
  },
})
</script>

<style lang="less">
.job-trajectory {
	height: 729px;

	&__map {
		height: 624px;
		position: relative;
	}

	&__bottom {
		position: absolute;
		bottom: 16px;
		left: 16px;
		z-index: 999;
		width: 100%;
		display: flex;

		&-date {
			width: 156px !important;
		}

		&-shift {
			width: 290px !important;
			margin: 0 10px;
		}

		&-speed {
			width: 94px !important;
			margin-right: 10px;
		}
	}

	&__right {
		position: absolute;
		top: 16px;
		right: 16px;
		z-index: 999;
		width: 327px;
		background: #FFFFFF;
		box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
		border-radius: 5px;
		
		&-top {
			padding: 20px 24px;

			&--item {
				font-size: 16px;
				color: rgba(0,0,0,0.5);
				line-height: 30px;

				span {
					color: rgb(0,0,0);
				}
			}
		}

		&-shift {

			&--header {
				height: 36px;
				background: rgba(51,154,235,0.1);
				position: relative;
				display: flex;
				align-items: center;

				&::before {
					content: "";
					display: block;
					width: 5px;
					height: 36px;
					background: #247AFF;
					position: absolute;
					left: 0;
					top: 0;
				}

				&-title {
					font-size: 16px;
					color: rgba(0,0,0,0.65);
					padding-left: 24px;
				}

				&-toggle {
					position: absolute;
					right: 10px;
					cursor: pointer;	
					color: #1D51F4;
					font-size: 12px;

					span {
						margin-right: 5px;
					}
				}
			}


		&--body {
			max-height: 370px;
			overflow: auto;

			&::-webkit-scrollbar {
				display: none;
			}

			&-item {
				width: 277px;
				// height: 130px;
				box-sizing: border-box;
				border: 1px dashed #BBBFC3;
				font-size: 16px;
				margin: 10px 24px;
				padding: 10px;

				&__name {
					color: #000000;
					line-height: 30px;
				}

				&__label {
					color: rgba(0,0,0,0.5);
					line-height: 30px;

					span {
						color: rgb(0,0,0);
					}
				}

				&__progress {

					.el-progress__text {
						font-size: 12px;		
						color: #A0A0A0;
					}
					
					.el-progress-bar__inner {	
						background: linear-gradient(270deg, #01B6FE 0%, rgba(1,112,254,0.3) 100%);
					}

					.el-progress-bar__outer {		
						background: #D8D8D8;
					}
				}
			}
		}
		}
	}

	.rotate180 {
		transform: rotate(180deg);
		transition: transform 0.3s ease-in-out;
	}

	.rotate0 {
		transform: rotate(360deg);
		transition: transform 0.3s ease-in-out;
	}
}
</style>
