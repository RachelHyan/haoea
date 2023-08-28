<template>
  <el-pro-dialog
    class="trajectory-model"
    :model-value="modelValue"
    width="80%"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
    @closed="$emit('closed')"
  >
    <template #header>
      <p class="trajectory-model__header">
        作业轨迹
      </p>
    </template>
    <div
      ref="mapRef"
      class="trajectory-model__map"
    >
      <div class="trajectory-model__right">
        <div class="trajectory-model__right-top">
          <div class="trajectory-model__right-top--item">
            人员名称：<span>{{ curTrajectoryData.name }}</span>
          </div>
          <div class="trajectory-model__right-top--item">
            人员类型：<span>{{ curTrajectoryData.type }}</span>
          </div>
          <div class="trajectory-model__right-top--item">
            所属组织：<span>{{ curTrajectoryData.org || '暂无' }}</span>
          </div>
        </div>
        <div class="trajectory-model__right-shift">
          <div class="trajectory-model__right-shift--header">
            <div class="trajectory-model__right-shift--header-title">
              作业班次
            </div>
            <div
              class="trajectory-model__right-shift--header-toggle"
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
            class="trajectory-model__right-shift--body"
          >
            <div
              v-for="item in curShift"
              :key="item.taskId"
              class="trajectory-model__right-shift--body-item"
            >
              <div class="trajectory-model__right-shift--body-item__name">
                {{ item.shiftName }}（{{ item.jobStartTime }} - {{ item.jobEndTime }}）
              </div>
              <div class="trajectory-model__right-shift--body-item__label">
                作业时长：<span>{{ formatSeconds(item.actualJobDuration || 0) }}</span>
              </div>
              <div class="trajectory-model__right-shift--body-item__label">
                作业里程：<span>{{ parseFloat((item.actualJobMileage / 1000).toFixed(2)) }}km</span>
              </div>
              <el-progress
                class="trajectory-model__right-shift--body-item__progress"
                :percentage="Math.round(item.finishRate * 100)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="trajectory-model__bottom">
        <div class="trajectory-model__bottom-right">
          <el-date-picker
            v-model="dateValue"
            class="trajectory-model__bottom-right-date"
            type="date"
            placeholder="选择日期"
            size="small"
            @change="handleDateChange"
          />
          <el-select
            v-model="shiftValue"
            class="trajectory-model__bottom-right-shift"
            placeholder="选择班次"
            size="small"
            popper-class="dropdown"
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
            placeholder="请选择倍速"
            size="small"
            class="trajectory-model__bottom-right-speed"
            popper-class="dropdown"
            @change="handleDoubleSpeedChange"
          >
            <el-option
              v-for="speed in doubleSpeedList"
              :key="speed"
              :label="speed.label"
              :value="speed.value"
            />
          </el-select>
        </div>
        <!-- <div class="trajectory-model__bottom-left"> -->
        <img
          v-show="!isAnimation"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/data-dashboard/map/track-playback-icon.png"
          alt=""
          height="29"
          @click="startAnimation"
        >
        <img
          v-show="isAnimation"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/data-dashboard/map/track-pause-icon.png"
          alt=""
          height="29"
          @click="pauseAnimation"
        >
        <!-- </div> -->
      </div>
    </template>
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
  name: "TrajectoryModel",
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
        mapStyle: "amap://styles/darkblue",
        viewMode: "3D",
        pitch:41,
        rotation: -60,
      });
      map.setZoom(18);

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
      isAnimation.value = false;
      fetchTrajectoryData();
    }

    const handleShiftChange = (val:number) => {
      shiftValue.value = val;
      isAnimation.value = false;
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

      const icon = props.curTrajectoryData.sceneType === "Manual_cleaning" ? "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/data-dashboard/map/manual-offJob.png" : "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/data-dashboard/map/vehicle-onJob.png"
				
      marker = new AMap.Marker({
        position: curTrajectoryData.value?.trackList[0] as any,
        icon: new AMap.Icon({
          size: new AMap.Size(31, 47),
          image: icon,
          imageSize: new AMap.Size(31, 47),
        }),
        offset: new AMap.Pixel(-15.5, -47),
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
.trajectory-model {
	height: 710px;
	background:#1C4996;
	box-shadow: 0px 2px 15px 0px #066EFF;
	border-radius: 10px;
	border: 2px solid #006CFF;
	backdrop-filter: blur(5px);

	&__header {
		font-size: 20px;
		font-weight: bold;
		color: #FFFFFF;
	}

	&__map {
		height: 600px;
		position: relative;
	}

	&__bottom {
		position: absolute;
		bottom: 0;
		left: 16px;
		z-index: 999;
		width: 97%;
		height: 50px;
		display: flex;
		// justify-content: space-between;
		align-items: center;

		// &-left {

			img {
				cursor: pointer;
				margin-left: 22px;
			}

		// }

		&-right {
			display: flex;
			align-items: center;
			&-date {
				width: 156px !important;
				.el-input__wrapper {
					background-color: transparent;
					box-shadow: 0 0 0 1px #DDE0E3 inset;
				}
			}

			&-shift {
				width: 290px !important;
				margin: 0 10px;
				.el-input__wrapper {
					background-color: transparent;
					box-shadow: 0 0 0 1px #DDE0E3 inset;
				}
			}

			&-speed {
				width: 94px !important;
				.el-input__wrapper {
					background: rgba(12,107,255,0.4);
					box-shadow: 0 0 0 1px #87B0FF inset;
				}
			}

			.el-input__inner {
				color: #FFFFFF;
			}
		}
	}

	&__right {
		position: absolute;
		top: 16px;
		right: 16px;
		z-index: 999;
		width: 327px;
		background: #123673;
		box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
		border-radius: 5px;
		
		&-top {
			padding: 20px 24px;

			&--item {
				font-size: 16px;
				color: rgba(255,255,255,0.8);
				line-height: 30px;

				span {
					color: rgb(255,255,255);
				}
			}
		}

		&-shift {

			&--header {
				height: 36px;
				background: #1B5FB7;
				position: relative;
				display: flex;
				align-items: center;

				&-title {
					font-size: 16px;
					color: #FFFFFF;
					padding-left: 24px;
				}

				&-toggle {
					position: absolute;
					right: 10px;
					cursor: pointer;					
					color: #01B4FD;
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
				height: 130px;
				box-sizing: border-box;
				font-size: 16px;
				margin: 24px;

				&__name {
					color: rgb(255,255,255);
					line-height: 30px;
				}

				&__label {
					color: rgba(255,255,255,0.8);
					line-height: 30px;

					span {
						color: rgb(255,255,255);
					}
				}

				&__progress {

					.el-progress__text {
						font-size: 12px;			
						color: rgba(255,255,255,0.8);
					}
					
					.el-progress-bar__inner {			
						background: linear-gradient(270deg, #01B6FE 0%, rgba(1,112,254,0.3) 100%);
					}

					.el-progress-bar__outer {							
						background: rgba(1,110,249,0.26);
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

	.el-dialog__header {
		border: none;
		padding: 14px 25px;
	}

	.el-drawer__close-btn {
		height: 24px;
		width: 24px;
		border-radius: 50%;
		background: #0FB0E2;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.el-dialog__body {
		padding: 0;
	}

	.el-dialog__footer {
		border: none;
		height: 50px;
	}
}

.dropdown {
	background: rgba(21, 86, 192, 0.57) !important;
	border: none !important;
	
	.el-popper__arrow::before{
		background: rgba(21, 86, 192, 0.57) !important;
		border: none !important;
	}

	.el-select-dropdown__item {
		color: #fff;
	}

	.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {		
		background: #1556C0;
	}
}
</style>
