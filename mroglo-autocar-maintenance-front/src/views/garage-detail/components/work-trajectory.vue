<template>
  <div class="work-trajectory">
    <div class="work-trajectory-header">
      <div class="trajectory-header-change">
        <div
          class="header-change-item"
          :class="trajectoryModel === 'current'?'header-change-item-active':''"
          @click="trajectoryModelChange('current')"
        >
          作业轨迹
        </div>
        <div
          class="header-change-item"
          :class="trajectoryModel === 'history'?'header-change-item-active':''"
          @click="trajectoryModelChange('history')"
        >
          历史记录
        </div>
      </div>
      <ul class="trajectory-header-marks">
        <li
          v-for="(item,index) in trajectoryMarks"
          :key="index"
          class="header-marks-item"
          :style="`background-image: url('${item.icon}');`"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div
      ref="mapRef"
      class="work-trajectory-map"
    >
      <div
        v-if="trajectoryModel === 'current'"
        class="preset-task"
      >
        <a-select
          v-model="presetTaskValue"
          placeholder="请选择任务"
          :options="presetTask"
          popup-container=".work-trajectory-map"
        >
          <template #option="{ data }">
            <div class="preset-task-option-name">
              {{ data.raw.label }}
            </div>
            <div
              class="preset-task-option-tag"
              :class="`preset-task-option-tag-${data.raw.taskType}`"
            >
              {{ data.raw.taskType === "work"?'作业任务':'调度任务' }}
            </div>
          </template>
        </a-select>
        <a-button
          type="primary"
          style="padding: 0 10px;border: none;border-radius: 0;"
          :loading="presetTaskLoading"
          @click="issueTask"
        >
          确定
        </a-button>
      </div>
      <div
        v-if="trajectoryModel === 'history'"
        class="history-task"
      >
        <a-select
          v-model="historyValue"
          placeholder="请选择任务"
          :options="historyTask"
          popup-container=".work-trajectory-map"
          @change="handleHistoryChange"
        >
          <template #empty>
            {{ historyDate?'暂无数据':'请先选择日期' }}
          </template>
          <template #option="{ data }">
            <div class="preset-task-option-name">
              {{ data.raw.label }}
            </div>
            <div
              class="preset-task-option-time"
            >
              {{ `${data.raw.startTime} - ${data.raw.endTime}` }}
            </div>
          </template>
        </a-select>
        <a-date-picker
          v-model="historyDate"
          :disabled-date="(current:string) => dayjs(current).isAfter(dayjs())"
          @change="historyDatachange"
        >
          <div class="history-task-trigger">
            <icon-calendar
              style="color:#196BFB"
              :size="14"
            />
          </div>
        </a-date-picker>
      </div>
      <div
        class="trajectory-full-screen"
        @click="fullScreen.toggle"
      >
        <icon-fullscreen-exit v-if="fullScreen.isFullscreen.value" />
        <icon-fullscreen v-else />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { issueTaskUsingPOST, queryHistoryTaskListUsingGET, queryHistoryTrackByIdUsingGET, queryRealTimeTrackUsingGET, queryTaskListUsingGET, queryTaskTrackUsingGET } from "@/api/zuoyerenwu";
import "@amap/amap-jsapi-types";
import { Message } from "@arco-design/web-vue";
import { IconCalendar, IconFullscreen, IconFullscreenExit } from "@arco-design/web-vue/es/icon";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { useFullscreen } from "@vueuse/core";
import coordtransform from "coordtransform";
import dayjs from "dayjs";
import type { Ref } from "vue";
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

type TrajectoryMark = {
	name:string
	icon:string
}

export default defineComponent({
  name:"WorkTrajectory",
  components:{
    IconCalendar,
    IconFullscreen,
    IconFullscreenExit,
  },
  props:{
    carId:{
      type: Number,
      required: true,
    },
  },
  setup(props) {
    let map:AMap.Map;
    const trajectoryModel:Ref<"current" | "history"> = ref<"current" | "history">("current");
    const trajectoryMarks:Ref<TrajectoryMark[]> = ref<TrajectoryMark[]>([]);
    const mapRef = ref<HTMLElement| null>(null);
    const currentTaskTracks:Ref<AMap.LngLatLike[][] | number[][]> = ref<AMap.LngLatLike[][] | number[][]>([])
    const presetTask:Ref<any[]> = ref<any[]>([])
    const presetTaskValue:Ref = ref()
    const presetTaskLoading:Ref<boolean> = ref<boolean>(false)
    const presetTaskTracks:Ref<AMap.LngLatLike[][] | number[][]> = ref<AMap.LngLatLike[][] | number[][]>([])
    const vehicleLocation:Ref<[number,number]> = ref<[number,number]>([0,0])
    const vehicleLocationLoading:Ref<boolean> = ref<boolean>(false)
    const taskTrackLoading:Ref<boolean> = ref<boolean>(false)
    const historyDate:Ref<string | undefined> = ref<string | undefined>()
    const historyTask:Ref<any[]> = ref<any[]>([])
    const historyValue:Ref<number | undefined> = ref<number>()
    const isManualZoom:Ref<boolean> = ref<boolean>(false)
    const fullScreen = useFullscreen(mapRef)
    const interval:Ref<string | number | NodeJS.Timeout | undefined> = ref<string | number | NodeJS.Timeout | undefined>(undefined);
    
    let vehicleMark:AMap.Marker;
    let currentTracks:AMap.Polyline;
    let presetTracks:AMap.Polyline;
    let workLayer:AMap.OverlayGroup;
    let pointLayer:AMap.OverlayGroup;
    let landfillIcon:AMap.Icon;
    let waterIcon:AMap.Icon;
    let chargeIcon:AMap.Icon;
    let startIcon:AMap.Icon;
    let endIcon:AMap.Icon;
    let historyLayer:AMap.OverlayGroup;
    let historyTracks:AMap.Polyline;
    let historyPresetTracks:AMap.Polyline;
    let historyMark:AMap.Marker;

    trajectoryMarks.value.push({name:"垃圾点",icon:"https://img.gejiba.com/images/4796f606ada3db5cb3c2c10f5f462d0c.png",});
    trajectoryMarks.value.push({name:"加水点",icon:"https://img.gejiba.com/images/d8db66903ac40f8d97abe6462f783080.png",});
    trajectoryMarks.value.push({name:"充电点",icon:"https://img.gejiba.com/images/622caf77ca9a1ebb60e60a785553b21f.png",});
    trajectoryMarks.value.push({name:"停车点",icon:"https://img.gejiba.com/images/c408eea99fda9111a6fb5dd6fc0d4af3.png",});
    trajectoryMarks.value.push({name:"起点",icon:"https://img.gejiba.com/images/8f0e14cbeabf299d1c7283fa71ef2291.png",});
    trajectoryMarks.value.push({name:"终点",icon:"https://img.gejiba.com/images/53b7a53cfbf9c7ca07a3149de48a2a1f.png",});
    trajectoryMarks.value.push({name:"轨迹",icon:"https://img.gejiba.com/images/2924ba6953838e1cb12f0bbdd657994f.png",});
    trajectoryMarks.value.push({name:"预设轨迹",icon:"https://img.gejiba.com/images/3a5d601790dd33fad91bed3b0e13833a.png",});
    trajectoryMarks.value.push({name:"环卫车",icon:"https://img.gejiba.com/images/d078fdd75b776b423df90ef1f08e768a.png",});


    const getPresetTask = async () => {
      try {
        let { data, } = await queryTaskListUsingGET({
          taskName: "",
        })
        presetTask.value = data.map(({vehicleTaskId,taskName,taskType,}) => {
          return {
            value:vehicleTaskId,
            label:taskName,
            taskType,
          }
        })
      } catch (error) {
				
      }
    }	

    const issueTask = async () => {
      if (presetTaskValue.value) {
        let task = presetTask.value?.find(({value,}) => value === presetTaskValue.value)
        let params = {
          taskName: task.label,
          vehicleTaskId: task.value,
          carId: props.carId,
        }
        presetTaskLoading.value = true
        try {
          await issueTaskUsingPOST(params)
          presetTaskLoading.value = false
          Message.success("指令下发成功")
        } catch (error) {
          presetTaskLoading.value = false
        }
      } else {
        Message.info("请先选择任务!")
      }
    }

    const trajectoryModelChange = (model:"current" | "history") => {
      trajectoryModel.value = model;
      if (model === "history") {
        workLayer.hide()
      } else {
        historyLayer.hide()
        workLayer.show()
      }
    };

    const historyDatachange = async (value:string) => {
      try {
        let { data, } = await queryHistoryTaskListUsingGET({carId:props.carId,taskTime:value,})
        historyValue.value = undefined
        historyTask.value = data.map(({taskId,taskName,startTime,endTime,}) => {
          return {
            value: taskId,
            label: taskName,
            startTime,
            endTime,
          }
        })
      } catch (error) {
        
      }
    };

    onMounted( async () => {
      try {
        await lazyAMapApiLoaderInstance;
        map = new AMap.Map(<HTMLDivElement>mapRef.value, {
          zoom:16,
        });

        const vehicleIcon = new AMap.Icon({
          size: new AMap.Size(24, 42),    // 图标尺寸
          image: "https://img.gejiba.com/images/d078fdd75b776b423df90ef1f08e768a.png",  // Icon的图像
          imageSize: new AMap.Size(24, 42),   // 根据所设置的大小拉伸或压缩图片
        });
        const carIcon = new AMap.Icon({
          size: new AMap.Size(26, 52),    // 图标尺寸
          image: "https://img.gejiba.com/images/d078fdd75b776b423df90ef1f08e768a.png",  // Icon的图像
          imageSize: new AMap.Size(26, 52),  // 根据所设置的大小拉伸或压缩图片
        });
        landfillIcon = new AMap.Icon({
          size: new AMap.Size(30, 30),    // 图标尺寸
          image: "https://img.gejiba.com/images/4796f606ada3db5cb3c2c10f5f462d0c.png",  // Icon的图像
          imageSize: new AMap.Size(30, 30),   // 根据所设置的大小拉伸或压缩图片
        });
        waterIcon = new AMap.Icon({
          size: new AMap.Size(30, 30),    // 图标尺寸
          image: "https://img.gejiba.com/images/d8db66903ac40f8d97abe6462f783080.png",  // Icon的图像
          imageSize: new AMap.Size(30, 30),   // 根据所设置的大小拉伸或压缩图片
        });
        chargeIcon = new AMap.Icon({
          size: new AMap.Size(30, 30),    // 图标尺寸
          image: "https://img.gejiba.com/images/622caf77ca9a1ebb60e60a785553b21f.png",  // Icon的图像
          imageSize: new AMap.Size(30, 30),   // 根据所设置的大小拉伸或压缩图片
        });
        startIcon = new AMap.Icon({
          size: new AMap.Size(30, 30),    // 图标尺寸
          image: "https://img.gejiba.com/images/8f0e14cbeabf299d1c7283fa71ef2291.png",  // Icon的图像
          imageSize: new AMap.Size(30, 30),   // 根据所设置的大小拉伸或压缩图片
        });
        endIcon = new AMap.Icon({
          size: new AMap.Size(30, 30),    // 图标尺寸
          image: "https://img.gejiba.com/images/53b7a53cfbf9c7ca07a3149de48a2a1f.png",  // Icon的图像
          imageSize: new AMap.Size(30, 30),   // 根据所设置的大小拉伸或压缩图片
        });

        // 点标记图层
        pointLayer = new AMap.OverlayGroup()

        // 作业轨迹图层
        workLayer = new AMap.OverlayGroup()
        // 作业轨迹车辆mark
        vehicleMark = new AMap.Marker({
          offset: new AMap.Pixel(-10, -10),
          icon: vehicleIcon,// 添加 Icon 实例#6CF8FF
        });
        // 作业轨迹线段
        currentTracks = new AMap.Polyline({
          strokeColor: "#10DA6B",
          strokeWeight:5,
        })
        // 预设轨迹线段
        presetTracks = new AMap.Polyline({
          strokeColor:"#4865FF",
          strokeWeight:8,
        })
        workLayer.addOverlay(vehicleMark)
        workLayer.addOverlay(presetTracks)
        workLayer.addOverlay(currentTracks)
				
        // 历史记录图层
        historyLayer = new AMap.OverlayGroup()
        // 作业轨迹
        historyTracks =  new AMap.Polyline({
          strokeColor:"10DA6B",
          strokeWeight:4,
        })
        // 预设轨迹
        historyPresetTracks =  new AMap.Polyline({
          strokeColor:"#4865FF",
          strokeWeight:8,
        })
        historyMark = new AMap.Marker({
          offset: new AMap.Pixel(-10, -10),
          icon: carIcon,// 添加 Icon 实例#6CF8FF
          visible:false,
        });
        historyLayer.addOverlay(historyMark)
        historyLayer.addOverlay(historyTracks)
        historyLayer.addOverlay(historyPresetTracks)
        
        map.on("mousewheel",() => {
          isManualZoom.value = true;
          map.clearEvents("mousewheel")
        })
        map.on("complete",() => {
          // @ts-ignore
          map.add([workLayer,historyLayer,pointLayer])
        })
        historyMark.on("moving", function (e) {
          historyTracks.setPath(e.passedPath);
          map.setCenter(e.target.getPosition(),true)
        })
        getPoint()
        initAndInterval()
        AMap.plugin(["AMap.ToolBar"],function(){
          // @ts-ignore
          var tool = new AMap.ToolBar();
          map.addControl(tool);
        });
      } catch (error) {
        console.log(error);
      }
    })

    onUnmounted( () => {
      clearInterval(interval.value)
    })

    const getVehicleLocation = async () => {
      try {
        vehicleLocationLoading.value = true
        let { data, } = await queryRealTimeTrackUsingGET({carId:props.carId,})
        vehicleLocationLoading.value = false
        vehicleLocation.value = coordtransform.wgs84togcj02(data.longtitude,data.latitude)
        if (data.tracks) {
          data.tracks = data.tracks.map(track => coordtransform.wgs84togcj02(...track))
          currentTaskTracks.value = data.tracks
        } else {
          currentTaskTracks.value = []
        }
      } catch (error) {
        vehicleLocationLoading.value = false
      }
    }

    const getTaskTrack = async () => {
      try {
        taskTrackLoading.value = true
        let {data,} = await queryTaskTrackUsingGET({carId:props.carId,})
        taskTrackLoading.value = false
        presetTaskTracks.value = data
      } catch (error) {
        taskTrackLoading.value = false
      }
    }

    const getPoint = async () => {
      try {
        pointLayer.addOverlay(new AMap.Marker({
          offset: new AMap.Pixel(-10, -10),
          icon: landfillIcon,
          position: [113.901758,22.519208],
        }))
        pointLayer.addOverlay(new AMap.Marker({
          offset: new AMap.Pixel(-10, -10),
          icon: waterIcon,
          position: [113.901574,22.517979],
        }))
        pointLayer.addOverlay(new AMap.Marker({
          offset: new AMap.Pixel(-30, -10),
          icon: chargeIcon,
          position: [113.901548,22.517924],
        }))
        pointLayer.addOverlay(new AMap.Marker({
          offset: new AMap.Pixel(-10, -10),
          icon: startIcon,
          position: [113.901441,22.519459],
        }))
        pointLayer.addOverlay(new AMap.Marker({
          offset: new AMap.Pixel(-30, -10),
          icon: endIcon,
          position: [113.90143,22.519478],
        }))
      } catch (error) {
				
      }
    }

    const handleHistoryChange = async () => {
      try {
        let { data, } = await queryHistoryTrackByIdUsingGET({taskId:<number>historyValue.value,})
        data = data.map((item) => coordtransform.wgs84togcj02(item.at(0),item.at(1)))
        if (data.length) {
          historyPresetTracks.setPath(<AMap.LngLatLike[]>data)
          historyLayer.show()
          map.setFitView(<any>historyTracks)
          AMap.plugin(["AMap.MoveAnimation"],function(){
            historyMark.moveAlong(data,{
					 duration: 200,//可根据实际采集时间间隔设置
              // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
              autoRotation: true,
            })
          });
        } else {
          Message.info("暂无数据上报，请联系管理员")
        }
      } catch (error) {
        console.log(error);
				
      }
    }


    const initAndInterval = async () => {
      if (trajectoryModel.value === "current") {			
        !vehicleLocationLoading.value && await getVehicleLocation()
        !taskTrackLoading.value && await getTaskTrack()
        if (vehicleLocation.value.length) {
          vehicleMark.setPosition(vehicleLocation.value);
        }
        if (currentTaskTracks.value.length) {		
          currentTracks.setPath(<AMap.LngLatLike[][]>currentTaskTracks.value)
        }
        if (presetTaskTracks.value.length) {
          presetTracks.setPath(<AMap.LngLatLike[][]>presetTaskTracks.value)
        }
        if (!isManualZoom.value && vehicleLocation.value) {
          map.setFitView([vehicleMark])
        }
      }
    }

    interval.value = setInterval(initAndInterval,3000)

    getPresetTask()

    return {
      trajectoryModel,
      trajectoryMarks,
      mapRef,
      presetTask,
      presetTaskValue,
      presetTaskLoading,
      historyDate,
      historyTask,
      historyValue,
      dayjs,
      fullScreen,
      issueTask,
      trajectoryModelChange,
      historyDatachange,
      handleHistoryChange,
    };
  },
});
</script>
<style lang="less">
.work-trajectory {
	height: 100%;
	display: flex;
	flex-direction: column;

	&-header {
		display: flex;
		justify-content: space-between;
		padding-bottom: 6px;
		margin-bottom: 10px;
	}

	&-map {
		flex: 1;
		position: relative;

		.arco-select-option-content {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.preset-task-option-tag {
				height: 20px;
				font-size: 12px;
				
				line-height: 20px;
				padding: 0 6px;
				border-radius: 10px;
			}

			.preset-task-option-tag-work {
				border: 1px solid #327BFB;
				color: #327BFB;
			}

			.preset-task-option-tag-schedul {
				border: 1px solid #12af3c;
				color: #12af3c;
			}

		}

    .arco-select-dropdown-empty {
      padding: 50px 0;
      font-size: 14px;
      font-weight: normal;
      color: #666;
      line-height: 32px;
      text-align: center;
    }
	}
}
.trajectory-header-change {
	display: flex;
	column-gap: 24px;

	.header-change-item {
		font-size: 16px;
		font-family: PingFang SC;
		font-weight: normal;
		color: rgba(102,102,102,1);
		line-height: 18px;
		cursor: pointer;
		position: relative;
	}

	.header-change-item-active {
		color: #000;

		&::after {
			content: "";
			width: 16px;
			height: 2px;
			background: #1769fa;
			position: absolute;
			bottom: -6px;
			left: calc( 50% - 8px );
		}
	}
}
.trajectory-header-marks {
	display: flex;
	align-items: center;
	column-gap: 24px;
	
	.header-marks-item {
		height: 14px;
		display: flex;
		padding-left: 18px;
		background-repeat: no-repeat;
		background-size: 14px;
		background-position: left center;
		font-size: 14px;
		font-weight: normal;
		color: #333;
	}
}

.preset-task,.history-task {
	width: 240px;
	height: 32px;
	background: #fff;
	position: absolute;
	top: 16px;
	left: 16px;
	z-index: 9;
	display: flex;
}

.history-task {
	width: 280px;
  height: 30px;
  border: 1px solid #DFE5EB;

  .arco-select-view-single {
    border: none;
  }

  &-trigger {
    height: 18px;
    margin: 6px 0;
    padding: 0 8px;
    cursor: pointer;
    border-left: 1px solid #F0F0F0;
  }
}

.trajectory-full-screen {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  z-index: 9;
  top: 16px;
  right: 26px;
  text-align: center;
  cursor: pointer;
  
  .arco-icon {
    font-size: 24px;
    color: #515152;
    margin: 10px auto;
    cursor: pointer;
  }
}

</style>
