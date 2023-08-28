<template>
  <div class="job-board page-root">
    <div
      ref="mapRef"
      class="job-board__map"
    >
      <scene-control
        v-model:scene-value="sceneValue"
        @changeScene="changeScene"
      />
      <job-layer-control
        ref="jobLayerControlRef"
        :scene-value="sceneValue"
        @changeLayer="changeLayer"
      />
      <job-panel
        ref="jobPanelRef"
        :scene-value="sceneValue"
      />
      <on-duty-info
        ref="onDutyInfoRef"
        v-model:model-value="infoVisible"
        :cur-marker-data="curMarkerData"
      />
      <job-trajectory
        v-if="trajectoryVisible"
        v-model="trajectoryVisible"
        :cur-trajectory-data="curTrajectoryData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mesIndexQueryJobBoardMapUserOrCarInfo, mesIndexQueryJobBoardMapUserOrCarStatus } from "@/api/mes/indexController";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { defineComponent, onMounted, ref } from "vue";
import { JobLayerControl, JobPanel, JobTrajectory, OnDutyInfo, SceneControl } from "./components";

export default defineComponent({
  name: "JobBoard",
  components: {
    SceneControl,
    JobLayerControl,
    JobPanel,
    OnDutyInfo,
    JobTrajectory,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const mapRef = ref();
    const jobPanelRef = ref();
    const jobLayerControlRef = ref();
    const onDutyInfoRef = ref();
    const sceneValue = ref("Manual_cleaning");
    const infoVisible = ref(false);
    const trajectoryVisible = ref(false);
    const curMarkerData = ref();
    const curTrajectoryData = ref();
    const currentObjectId = ref();

    let map:AMap.Map;
    let geocoder:any;
    let mapMarkers:any[] = [];
    let mapMarkerNames:AMap.Text[] = [];
    let mapMarkerOverlay:AMap.OverlayGroup;
    let infoWindow:AMap.InfoWindow; // 信息窗体

    onMounted(async() => {
      await lazyAMapApiLoaderInstance;

      map = new AMap.Map(mapRef.value, {
        zooms: [3, 30],
      });

      mapMarkerOverlay = new AMap.OverlayGroup();
      infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        autoMove: true, // 是否自动调整信息窗体位置
        offset: new AMap.Pixel(142.5, 0),
      });

      await fetchMapData()
    })

    const changeScene = async(value:string) => {
      infoWindow?.close();
			
      sceneValue.value = value;

      jobLayerControlRef.value?.layerData.forEach((item:any) => {
        item.value = true;
      })
			
      await fetchMapData();
      await jobPanelRef.value?.fetchData();
    }

    const fetchMapData = async() => {
      try {
        const {data,} = await mesIndexQueryJobBoardMapUserOrCarStatus({
          projectId,
          type: sceneValue.value,
        });
        drawMap(data);
      } catch (error) {
				
      }
    }

    const drawMap = (data:MES.JobBoardMapUserOrCarStatusDTO[]) => {
      mapMarkerOverlay.clearOverlays();
      map.remove(mapMarkers);
      map.remove(mapMarkerNames);
      mapMarkers.length = 0;
      mapMarkerNames.length = 0;
      const onJobIcon = sceneValue.value === "Manual_cleaning" ? "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/manual-onJob.png" : "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/vehicle-onJob.png";
      const offLineIcon = sceneValue.value === "Manual_cleaning" ? "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/manual-offLine.png" : "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/vehicle-offLine.png";
      const offJobIcon = sceneValue.value === "Manual_cleaning" ? "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/manual-offJob.png" : "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/vehicle-offJob.png";

      mapMarkers = data.map(marker => {
        let onJob, offLine, offJob;
        if (marker.isOnJob) {
          onJob = new AMap.Marker({
            position: <any>[marker.longitude, marker.latitude],
            icon: new AMap.Icon({
              image: onJobIcon,
              size: new AMap.Size(54, 62),
              imageSize: new AMap.Size(54, 62),
            }),
            offset: new AMap.Pixel(-27, -62),
            bubble: true,
            extData: marker,
            cursor: "pointer",
            zIndex: 100,
          })

          onJob.on("mouseover",mouseoverMapObject);
          onJob.on("mouseout",mouseoutMapObject);
          onJob.on("click", clickMarker);

          return onJob;

        } else if (marker.isOffline) {
          offLine = new AMap.Marker({
            position: <any>[marker.longitude, marker.latitude],
            icon: new AMap.Icon({
              image: offLineIcon,
              size: new AMap.Size(54, 62),
              imageSize: new AMap.Size(54, 62),
            }),
            offset: new AMap.Pixel(-27, -62),
            bubble: true,
            extData: marker,
            cursor: "pointer",
            zIndex: 100,
          })

          offLine.on("mouseover",mouseoverMapObject);
          offLine.on("mouseout",mouseoutMapObject);
          offLine.on("click", clickMarker);

          return offLine;

        } else if (marker.isOffJob) {
          offJob = new AMap.Marker({
            position: <any>[marker.longitude, marker.latitude],
            icon: new AMap.Icon({
              image: offJobIcon,
              size: new AMap.Size(54, 62),
              imageSize: new AMap.Size(54, 62),
            }),
            offset: new AMap.Pixel(-27, -62),
            bubble: true,
            extData: marker,
            cursor: "pointer",
            zIndex: 100,
          })

          offJob.on("mouseover",mouseoverMapObject);
          offJob.on("mouseout",mouseoutMapObject);
          offJob.on("click", clickMarker);

          return offJob;
        }
      })
      mapMarkerOverlay.addOverlays(mapMarkers);

      mapMarkerNames = mapMarkerOverlay.getOverlays().map(object => {
        const name = new AMap.Text({
          text: `
									<span>${object.getExtData().objectName}</span>
									`,
          position: <any>object?.getBounds()?.getCenter(),
          offset: new AMap.Pixel(-(object.getExtData().objectName.length * 12 / 2), -86),
          style: {
            "background-color": "#fff",
            "font-size": "12px",
            "text-align": "center",
            "color": "#000",
            "padding": "5px 10px",
            "box-shadow": "0px 1px 4px 2px rgba(0,0,0,0.11)",
            "border-radius": "25px",
          },
          extData: object.getExtData(),
          zIndex: 13,
        });

        name.on("click", clickMarker);

        return name;
      });
      mapMarkerOverlay.addOverlays(mapMarkerNames);
      mapMarkerOverlay.getOverlays().forEach((item:any) => {
        item.type === "AMap.Text" && item.hide();
      })

      // @ts-ignore
      map.add(mapMarkerOverlay);
      map.setFitView(mapMarkerOverlay.getOverlays());
    }

    const getShowLayer = (userData:any,Ids:any) => {
      for (let i = 0; i < Ids.length; i++) {
        if (userData[Ids[i]]) {
          return true;
        }
      }
      return false; // 如果没有匹配到对应状态的图标链接，返回空字符串
    }

    const changeLayer = (e:any) => {
      const ids = e.filter((item:any) => item.value).map((item:any) => item.id);

      mapMarkerOverlay.getOverlays().forEach((item:any) => {
        if (getShowLayer(item.getExtData(),ids)) {
          item.show();
        } else {
          item.hide();
        }
      })

      infoWindow?.close();
    }

    const clickMarker = async (e:any) => {
      infoWindow?.close();

      try {
        const {data,} = await mesIndexQueryJobBoardMapUserOrCarInfo({
          projectId,
          objectId: e.target.getExtData().objectId,
          type: sceneValue.value,
        })

        await showInfoWindow(data,sceneValue.value);
				
      } catch (error) {
				
      }

    }

    const mouseoverMapObject = (e: any) => {
      let current = e.target.getExtData().objectId;	
      mapMarkerOverlay.getOverlays().forEach(object => {
        let selected = object.getExtData().objectId === current;
        if (object.type === "AMap.Text") {
          selected && object.show();
        } else {
          object.setOptions({
            outlineColor: selected ? "#E81D1D" : object.getExtData().color,
            fillColor: selected ? "#E81D1D" : object.getExtData().color,
          });
        }
      });
    };

    const mouseoutMapObject = () => {
      mapMarkerOverlay.getOverlays().forEach(object => {
        let selected = object.getExtData().objectId === currentObjectId.value;
        if (object.type === "AMap.Text") {
          object.hide();
        } else {
          object.setOptions({
            outlineColor: selected ? "#E81D1D" : object.getExtData().color,
            fillColor: selected ? "#E81D1D" : object.getExtData().color,
          });
        }
      });
    };

    const getAddress = (pointList:any) => {
      AMap.plugin("AMap.Geocoder", function() {
        // @ts-ignore
        geocoder = new AMap.Geocoder();
      })
      return new Promise((resolve, reject) => {
        geocoder.getAddress(pointList, function(status:any, result:any) {
          if (status === "complete" && result.info === "OK") {			
            const addr = result.regeocode ? result.regeocode.formattedAddress : null;
            resolve(addr);
          } else {
            reject();
          }
        });
      });
    };
    const getColor = (status:string) => {
      switch (status) {
      case "在岗":
        return {
          backgroundColor: "rgba(78, 181, 151, .1)",
          color: "#4EB597",
        };
      case "脱岗":
        return {
          backgroundColor: "rgba(181, 151, 78, .1)",
          color: "#B5974E",
        };
      case "离线":
        return {
          backgroundColor: "rgba(96, 96, 96, .1)",
          color: "#606060",
        };
      }
    }

    const showInfoWindow = async(e:any,type:string) => {
      const address = await getAddress([e.longitude, e.latitude]);
      const vehicleAvatar = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/car-icon.png"

      const manualContent = `
			<div class="info-window">
        <div class="info-window__header">
          <div class="info-window__header-left">
            <img
              src="${e.objectUrl}"
              alt=""
              width="61"
              height="61"
              class="info-window__header-left-avatar"
            >
            <span class="info-window__header-left-name">${e.objectName}</span>
            <span class="info-window__header-left-tag" style="background-color:${getColor(e.jobStatus)?.backgroundColor};color:${getColor(e.jobStatus)?.color}">${e.jobStatus}</span>
          </div>
          <div class="info-window__header-right" id="close"></div>
        </div>
        <div class="info-window__body">
          <div class="info-window__body-item">
            联系电话：<span>${e.mobile || "暂无"}</span>
          </div>
          <div class="info-window__body-item">
            人员类型：<span>${e.userType || "暂无"}</span>
          </div>
          <div class="info-window__body-item">
            所属组织：<span>${e.ordNames || "暂无"}</span>
          </div>
          <div class="info-window__body-item">
            <img src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/clock-icon.png" width="9" height="9" />
            <p>${e.reportTime}</p>
          </div>
          <div class="info-window__body-item">
            <img src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/location-icon.png" width="8" height="10" />
            <p class="address">
              ${address}
            </p>
          </div>
        </div>
        <div class="info-window__footer">
          <div
					class="info-window__footer-btn"
					id="info"
          >
            当班信息
          </div>
          <div
					class="info-window__footer-btn"
					id="trajectory"
          >
            作业轨迹
          </div>
        </div>
      </div>
			`
      const vehicleContent = `
			<div class="info-window">
        <div class="info-window__header">
          <div class="info-window__header-left">
            <img
              src="${vehicleAvatar}"
              alt=""
              width="61"
              height="61"
              class="info-window__header-left-avatar"
            >
            <span class="info-window__header-left-name">${e.objectName}</span>
            <span class="info-window__header-left-tag" style="background-color:${getColor(e.jobStatus)?.backgroundColor};color:${getColor(e.jobStatus)?.color}">${e.jobStatus}</span>
          </div>
          <div class="info-window__header-right" id="close"></div>
        </div>
        <div class="info-window__body">
          <div class="info-window__body-item">
            车辆类型：<span>${e.carType || "暂无"}</span>
          </div>
          <div class="info-window__body-item">
            所属组织：<span>${e.ordNames || "暂无"}</span>
          </div>
          <div class="info-window__body-item">
            <img src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/clock-icon.png" width="9" height="9" />
            <p>${e.reportTime}</p>
          </div>
          <div class="info-window__body-item">
            <img src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/location-icon.png" width="8" height="10" />
            <p class="address">
              ${address}
            </p>
          </div>
        </div>
        <div class="info-window__footer">
          <div
					class="info-window__footer-btn"
					id="info"
          >
            当班信息
          </div>
          <div
					class="info-window__footer-btn"
					id="trajectory"
          >
            作业轨迹
          </div>
        </div>
      </div>
			`
      const content = type === "Manual_cleaning" ? manualContent : vehicleContent;
      infoWindow.setContent(content);
      infoWindow.open(map, [e.longitude, e.latitude], 0);

      const closeBtn = document.getElementById("close");
      const infoBtn = document.getElementById("info");
      const trajectoryBtn = document.getElementById("trajectory");

      const clickClose = () => {
        infoWindow.close();
      }

      const clickInfo = async () => {
        infoWindow.close();

        const avatar = sceneValue.value === "Manual_cleaning" ? e.objectUrl : vehicleAvatar;
        curMarkerData.value = {avatar, name: e.objectName, type: sceneValue.value,}
        await onDutyInfoRef.value?.fetchData({projectId,type: sceneValue.value,objectId: e.objectId,})

        infoVisible.value = true;
      }

      const clickTrajectory = () => {
        infoWindow.close();

        curTrajectoryData.value = {
          projectId,
          sceneType: sceneValue.value,
          name: e.objectName,
          type: sceneValue.value === "Manual_cleaning" ? e.userType : e.carType,
          org:e.ordNames,
          objectId: e.objectId,
        }
				
        trajectoryVisible.value = true;
      }

      closeBtn?.addEventListener("click",clickClose);
      infoBtn?.addEventListener("click",clickInfo);
      trajectoryBtn?.addEventListener("click",clickTrajectory);
    }
		

    return {
      mapRef,
      jobPanelRef,
      jobLayerControlRef,
      onDutyInfoRef,
      sceneValue,
      infoVisible,
      trajectoryVisible,
      curMarkerData,
      curTrajectoryData,
      changeScene,
      changeLayer,
    }
  },
})
</script>

<style lang="less">
.job-board {
	height: calc(100vh - 160px);

	&__map {
		height: 100%;
		position: relative;
	}

	.info-window {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 285px;
		background-color: #fff;
		border-radius: 3px;
		box-shadow: 0px 6px 30px 5px rgba(0,0,0,0.05), 0px 16px 24px 2px rgba(0,0,0,0.04), 0px 8px 10px -5px rgba(0,0,0,0.08);
		z-index: 1000;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 16px;

			&-left {
				display: flex;
				align-items: center;

				&-avatar {
					width: 36px;
					height: 36px;
					border-radius: 50%;
				}

				&-name {
					font-size: 15px;
					font-weight: bold;
					margin: 0 6px 0 8px;
				}

				&-tag {
					width: 32px;
					height: 16px;
					border-radius: 2px;
					font-size: 10px;
					text-align: center;
					line-height: 16px;
				}
			}

			&-right {
				position: relative;
				width: 16px;
				height: 16px;
				cursor: pointer;
				margin-left: 11px;
			}
			&-right::before,
			&-right::after {
				content: '';
				position: absolute;
				width: 2px;
				height: 16px;
				background-color: #ccc
			}

			&-right::before {
				right: 13px;
				top: 0;
				transform: rotate(45deg);

			}

			&-right::after {
				right: 13px;
				top: 0;
				transform: rotate(-45deg);
			}
		}

		&__body {
			padding: 0 16px;

			&-item {
				margin-bottom: 15px;
				font-size: 12px;				
				color: #6F7074;
				display: flex;
				align-items: center;

				img {
					margin-right: 5px;
				}

				span {
					color: #000;
				}

				.address {
					padding: 0;
					display: inline-block;
					flex:1;
					height: auto;
					// white-space: nowrap;
					// overflow: hidden;
					// text-overflow: ellipsis;
				}

				&:last-child {
					margin-bottom: 20px;
				}
			}
		}

		&__footer {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			padding: 13px 20px;
			border-top: 1px solid rgba(211, 211, 211, .4);

			&-btn {
				width: 61px;
				height: 23px;
				border-radius: 2px;
				border: 1px solid #246FF8;
				color: #246FF8;
				font-size: 12px;
				text-align: center;
				line-height: 23px;
				cursor: pointer;
			}
		}
	}
}
</style>
