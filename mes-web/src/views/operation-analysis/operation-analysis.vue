<template>
  <data-layout class="operation-analysis">
    <template #data-layout-header>
      <div class="header-card">
        <div class="header-card__tabs">
          <div
            v-for="tab in tabs"
            :key="tab.value" 
            :class="['header-card__tabs-item', { 'active': activeTab === tab.value }]"
            @click="clickActiveTab(tab.value)"
          >
            {{ tab.label }}
          </div>
        </div>
        <div class="header-card__title">
          <div class="header-card__title-text">
            洁亚智慧城市服务运营大屏
          </div>
        </div>
        <div class="header-card__right">
          <div class="header-card__right-project">
            <el-select
              v-model="projectId"
              placeholder="请选择项目"
              popper-class="header-card__right-project-popper"
              filterable
              @change="handleProjectChange"
            >
              <el-option
                v-for="item in projectData"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              />
            </el-select>
          </div>
          <img
            class="header-card__right-back"
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/data-back.png"
            @click="backHome"
          >
        </div>
      </div>
    </template>
    <template #data-layout-body>
      <div
        ref="mapRef"
        class="operation-analysis__map"
      />
      <layer-control-model
        v-if="activeTab === 0"
        ref="overviewLayerRef"
        :data="overviewLayer"
        :position="{left: 443, top: 42,}"
        @changeLayer="changeOverviewLayer"
      />
      <layer-control-model
        v-if="activeTab === 1 && footerTab === 'Manual_cleaning'"
        :data="manualLayer"
        :position="{right: 443, top: 42,}"
        is-icon
        @changeLayer="changePersonnelLayer"
        @changeLayerVisible="changePersonnelLayerVisible"
      />
      <layer-control-model
        v-if="activeTab === 1 && footerTab === 'Vehicle_operation'"
        :data="vehicleLayer"
        :position="{right: 443, top: 42,}"
        is-icon
        @changeLayer="changePersonnelLayer"
        @changeLayerVisible="changePersonnelLayerVisible"
      />
      <monitor-tabs
        v-if="activeTab === 1 && footerTab !== 'Site_monitoring'"
        v-model:tabClick="monitorTab"
        :footer-tab="footerTab"
        @handleTabClick="handleTabClick"
      />
    </template>
    <template #data-layout-left>
      <div class="operation-analysis__left">
        <basic-overview
          v-if="activeTab === 0"
          :project-name="projectName"
          :city="projectCity"
          :project-person-total="projectPersonTotal"
        />
        <job-object
          v-if="activeTab === 0"
        />
        <basic-information
          v-if="activeTab === 1"
          :footer-tab="footerTab"
        />
        <personnel-attendance
          v-if="activeTab === 1"
          :footer-tab="footerTab"
        />
        <work-completion-status
          v-if="activeTab === 1"
          :footer-tab="footerTab"
        />
      </div>
    </template>
    <template #data-layout-right>
      <div class="operation-analysis__right">
        <staffing-panel
          v-if="activeTab === 0"
          ref="staffingPanelRef"
        />
        <vehicle-configuration
          v-if="activeTab === 0"
          ref="vehicleConfigurationRef"
        />
        <personnel-operation-situation
          v-if="activeTab === 1"
          :footer-tab="footerTab"
        />
        <shift-assignment
          v-if="activeTab === 1"
          :footer-tab="footerTab"
        />
      </div>
    </template>
    <template #data-layout-footer>
      <footer-tabs
        v-if="activeTab === 1"
        v-model:currentPoint="footerTab"
        @handlePointTypeClick="handlePointTypeClick"
      />
    </template>
  </data-layout>
  <jrajectory-model
    v-if="trajectoryVisible"
    v-model="trajectoryVisible"
    :cur-trajectory-data="curTrajectoryData"
  />
  <monitor-model
    v-if="monitorVisible"
    ref="monitorRef"
    v-model="monitorVisible"
    :cur-monitor-data="curMonitorData"
  />
</template>

<script lang="ts">
import { mesIndexQueryJobBoardMapUserOrCarInfo, mesIndexQueryJobBoardMapUserOrCarStatus } from "@/api/mes/indexController";
import { mesProjectQueryProjectSelectList } from "@/api/mes/projectController";
import { mesScreenQueryMapObject, mesScreenQueryMapVideoCamera, mesScreenQueryMapVideoDevice } from "@/api/mes/screenController";
import { mesVideoQueryVideoDeviceList } from "@/api/mes/videoController";
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { useFullscreen } from "@vueuse/core";
import { defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { BasicInformation, BasicOverview, DataLayout, FooterTabs, JobObject, JrajectoryModel, LayerControlModel, MonitorModel, MonitorTabs, PersonnelAttendance, PersonnelOperationSituation, ShiftAssignment, StaffingPanel, VehicleConfiguration, WorkCompletionStatus } from "./components";

export default defineComponent({
  name: "OperationAnalysis",
  components: {
    DataLayout,
    BasicOverview,
    JobObject,
    StaffingPanel,
    VehicleConfiguration,
    LayerControlModel,
    BasicInformation,
    PersonnelAttendance,
    WorkCompletionStatus,
    PersonnelOperationSituation,
    MonitorTabs,
    FooterTabs,
    ShiftAssignment,
    JrajectoryModel,
    MonitorModel,
  },
  setup () {
    const router = useRouter();
    const fullscreen = useFullscreen();
    const mapRef = ref();
    const overviewLayerRef = ref();
    const staffingPanelRef = ref();
    const vehicleConfigurationRef = ref();
    const monitorRef = ref();
    const activeTab = ref(0); // 0 - 概览 1 - 分析
    const monitorTab = ref("dynamic"); // dynamic - 动态监控  cover - 覆盖监控
    const footerTab = ref("Manual_cleaning"); // 底部切换
    const projectId = ref<number>();
    const projectName = ref<string>();
    const projectData = ref<MES.ProjectSelectDTO[]>([]);
    const projectCity = ref();
    const projectPersonTotal = ref(0);
    const currentOverviewObjectId = ref();
    const currentMonitorId = ref();
    const overviewUserGenderData = ref<MES.UserGenderCountDTO[]>([]);
    const trajectoryVisible = ref(false);
    const curTrajectoryData = ref();
    const monitorVisible = ref(false);
    const curMonitorData = ref();

    const overviewLayer = reactive([
      {
        id:1,
        title: "图层控制",
        data:[
          { id: "1", value: true,label: "7类场所",},
          { id:	"2", value: true,label: "公共厕所",},
          {	id: "3", value: true,label: "集贸市场及周边",},
          {	id: "4", value: true,label: "垃圾转运站及周边",},
          {	id: "5", value: true,label: "建筑工地周边",},
          {	id: "6", value: true,label: "环卫作业车",}
        ],
      }
    ])

    const manualLayer = reactive([
      {
        id:1,
        title: "图层控制",
        data: [],
        children: [
          {
            id:1,
            title: "作业人员",
            expanded:true,
            data: [
              {id:"isOnJob",label:"在岗",value:true, icon: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/layer-control/manual-on-job.png",width:15,height:27,},
              {id:"isOffline",label:"离线",value:true, icon: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/layer-control/manual-off-line.png",width:15,height:27,},
              {id:"isOffJob",label:"异常",value:true, icon: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/layer-control/manual-off-job.png",width:15,height:27,}
            ],
          }
        ],
      }
    ])

    const vehicleLayer = reactive([
      {
        id:1,
        title: "图层控制",
        data: [],
        children:[
          {
            id:2,
            title: "作业车辆",
            expanded:true,
            data: [
              {id:"isOnJob",label:"在岗",value:true, icon: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/layer-control/vehicle-on-job.png",width:21,height:14,},
              {id:"isOffline",label:"离线",value:true, icon: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/layer-control/vehicle-off-line.png",width:21,height:14,},
              {id:"isOffJob",label:"异常",value:true, icon: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/layer-control/vehicle-off-job.png",width:21,height:14,}
            ],
          }
        ],
      }
    ])

    let map:AMap.Map;
    let electronicFence:AMap.Polygon; // 电子围栏
    // @ts-ignore
    let geocoder:AMap.Geocoder;
    let overviewObjects:any[] = [];
    let overviewObjectNames:AMap.Marker[] = [];
    let overviewObjectText:AMap.Text;
    let overviewObjectOverlay:AMap.OverlayGroup;
    let personnelVehicleObjects:any[] = [];
    let monitorObjectText:AMap.Text;
    let personnelVehicleOverlay:AMap.OverlayGroup;
    let infoWindow:AMap.InfoWindow; // 信息窗体
    let siteMonitoringMarkers:AMap.Marker[] = []; // 场所监控
    let siteMonitoringOverlay:AMap.OverlayGroup;

    const tabs = [
      {
        label: "项目概况",
        value: 0,
      },
      {
        label: "运营分析",
        value: 1,
      }
    ];

    if (!fullscreen.isFullscreen.value) {
      fullscreen.enter();
    }

    onMounted(async () => {
      await lazyAMapApiLoaderInstance;
      map = new AMap.Map(mapRef.value, {
        mapStyle: "amap://styles/darkblue",
        viewMode: "3D",
        pitch:41,
        rotation: -60,
      });
      map.setZoom(18);

      overviewObjectOverlay = new AMap.OverlayGroup();
      personnelVehicleOverlay = new AMap.OverlayGroup();
      siteMonitoringOverlay = new AMap.OverlayGroup();

      try {
        await remoteProject();
      } catch (error) {
				
      }
    })

    const clickActiveTab = async (value: number) => {
      activeTab.value = value;
      footerTab.value = "Manual_cleaning";
      if (value === 0) {
        personnelVehicleOverlay.clearOverlays();
        map.remove(personnelVehicleObjects);
        personnelVehicleObjects.length = 0;
        clearInterval(timer);
				
        await fetchOverviewObj();
        await staffingPanelRef.value?.fetchGender(projectId.value);
        await staffingPanelRef.value?.fetchAge(projectId.value);
        await staffingPanelRef.value?.fetchPersonnel(projectId.value);
        await vehicleConfigurationRef.value?.fetchType(projectId.value);
      } else {
        overviewObjectOverlay.hide();
        fetchPersonnelVehicleObject(projectId.value as number);
      }
    };

    const mapObjects = () => {
      if(activeTab.value === 0) {
        overviewObjectOverlay.show();
      } else {
        overviewObjectOverlay.hide();
      }
    }

    const backHome = () => {
      if (fullscreen.isFullscreen.value) {
        fullscreen.exit();
      }
      router.replace({name:"data-dashboard",});
    };

    const getAddress = (routePointList:any) => {
      // @ts-ignore
      geocoder = new AMap.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.getAddress(routePointList, function(status:any, result:any) {
          if (status === "complete" && result.info === "OK") {	
            const addressComponent = result.regeocode.addressComponent;
            const addr = addressComponent.province + addressComponent.city;
            const address = result.regeocode ? result.regeocode.formattedAddress : null;
            resolve({addr, address,});
          } else {
            reject();
          }
        });
      });
    };

    const remoteProject = async () => {
      try {
        let { data, } = await mesProjectQueryProjectSelectList({});
        projectData.value = data;
        projectId.value = data[0].projectId;
        projectName.value = data[0].projectName;

        projectCity.value = await getAddress([data[0].longitude, data[0].latitude]).then((res:any) => res.addr);
        projectPersonTotal.value = data[0].projectPersonTotal;

        drawElectronFence(data[0].electronicFenceList)
				
        await fetchOverviewObj();
        await staffingPanelRef.value?.fetchPersonnel(projectId.value);
        await staffingPanelRef.value?.fetchGender(projectId.value);
        await staffingPanelRef.value?.fetchAge(projectId.value);
        await vehicleConfigurationRef.value?.fetchType(projectId.value);
        // await fetchPersonnelVehicleObject(projectId.value as number);
        handlePointTypeClick()
      } catch (error) {
        console.error(error);
      }
    };
		
    const handleProjectChange = async (value: any) => {
      const project = projectData.value.find(item => item.projectId === value);
      projectId.value = value;
      projectName.value = project?.projectName;
      projectCity.value = await getAddress([project?.longitude, project?.latitude]).then((res:any) => res.addr);
      projectPersonTotal.value = project?.projectPersonTotal as number;
			
      drawElectronFence(project?.electronicFenceList)
      await fetchOverviewObj();

      await staffingPanelRef.value?.fetchPersonnel(projectId.value);
      await staffingPanelRef.value?.fetchGender(projectId.value);
      await staffingPanelRef.value?.fetchAge(projectId.value);
      await vehicleConfigurationRef.value?.fetchType(projectId.value);
      // await fetchPersonnelVehicleObject(projectId.value as number);
      handlePointTypeClick()
      mapObjects();
    };

    const drawElectronFence = (electronicFenceList:any) => {
      electronicFence &&  map.remove(electronicFence);

      electronicFence = new AMap.Polygon({
        path: electronicFenceList,
        fillOpacity: 0,
        strokeColor: "#3A7ECF",
        strokeWeight: 5,
        bubble: true,
      });

      map.add(electronicFence);
      map.setFitView([electronicFence]);
    };

    // 项目概况
    const fetchOverviewObj = async () => {
      try {
        const {data,} = await mesScreenQueryMapObject({projectId:projectId.value as number,});
        drawOverviewObject(data);
      } catch (error) {
				
      }
    }

    const drawOverviewObject = (objectList:MES.MapObjectDTO[]) => {
      currentOverviewObjectId.value = null;
      overviewObjectOverlay.clearOverlays();
      map.remove(overviewObjects);
      map.remove(overviewObjectNames);
      overviewObjects.length = 0;
      overviewObjectNames.length = 0;

      
      overviewObjects = objectList.map(object => {
        let point, line, plane;
        switch (object.geometryType) {
        case 1:
          point = new AMap.Marker({
            position: <any>object.routePointList[0],
            icon: new AMap.Icon({
              image: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-object.png",
              size: new AMap.Size(33, 60),
              imageSize: new AMap.Size(33, 60),
            }),
            offset:[-16.5,-60],
            extData: object,
            bubble: true,
            cursor: "pointer",
            zIndex:99,
          });

          point.on("mouseover",mouseoverMapObject);
          point.on("mouseout",mouseoutMapObject);

          break;
        case 2:
          line = new AMap.Polyline({
            path: <any>object.routePointList,
            strokeColor: "#2280FF",
            strokeWeight:4,
            strokeOpacity: 1,
            extData: object,
            bubble: true,
            lineCap: "round",
            lineJoin: "round",
            cursor: "pointer",
            zIndex:99,
          });

          line.on("mouseover",mouseoverMapObject);
          line.on("mouseout",mouseoutMapObject);

          break;
        case 3:
          plane = new AMap.Polygon({
            path: <any>object.routePointList,
            fillColor: "#006CFF",
            strokeWeight:0,
            fillOpacity: 0.25,
            extData: object,
            bubble: true,
            cursor: "pointer",
            zIndex:99,
          });
					
          plane.on("mouseover",mouseoverMapObject);
          plane.on("mouseout",mouseoutMapObject);
					
          break;
        default:
          break;
        }
        return point || line || plane;
    	});
      overviewObjectOverlay.addOverlays(overviewObjects);

      // @ts-ignore
      map.add(overviewObjectOverlay);
    };

    const mouseoverMapObject = (e: any) => {
      let current = e.target.getExtData().objectId;	
      currentOverviewObjectId.value = current;
      overviewObjectOverlay.getOverlays().forEach(object => {
        let selected = object.getExtData().objectId === current;
        if (selected) {
          overviewObjectText = new AMap.Text({
            text: `
        					<span>${object.getExtData().objectName}</span>
        					`,
            position: <any>object?.getBounds()?.getCenter(),
            offset: object.getExtData().geometryType === 1 ? new AMap.Pixel(-(object.getExtData().objectName.length * 16 / 2), -90) : new AMap.Pixel(-(object.getExtData().objectName.length * 16 / 2), 0),
            style: { 
              "background": "linear-gradient(180deg, #E79100 0%, rgba(33,16,0,0.91) 16%, #211200 55%, rgba(33,25,0,0.92) 81%, #E79100 100%)",
              "font-size": "14px",
              "text-align": "center",
              "color": "#E79100",
              "padding": "5px 10px",
              "border": "none",
            },
            extData: object.getExtData(),
            zIndex: 13,
          });

          map.add(overviewObjectText);

          switch (object.getExtData().geometryType) {
          case 1:
            object.setIcon(new AMap.Icon({
              image: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-object-active.png",
              size: new AMap.Size(33, 60),
              imageSize: new AMap.Size(33, 60),
            }));
            break;
          case 2:
            object.setOptions({
              strokeColor: "#E79100",
              fillColor: "#006CFF",
              fillOpacity: 0.4,
            });
            break;
          default:
            break;
          }
        }
      });
    };

    const mouseoutMapObject = () => {
      overviewObjectOverlay.getOverlays().forEach(object => {
        let selected = object.getExtData().objectId === currentOverviewObjectId.value;
          
        if (selected) {
          map.remove(overviewObjectText);
          switch (object.getExtData().geometryType) {
          case 1:
            object.setIcon(new AMap.Icon({
              image: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-object.png",
              size: new AMap.Size(33, 60),
              imageSize: new AMap.Size(33, 60),
            }));
            break;
          case 2:
            object.setOptions({
              strokeColor:"2280FF",
              fillColor: "006CFF",
              fillOpacity: 0.25,
            });
            break;
          default:
            break;
          }
        }
      });
    };

    const changeOverviewLayer = (e:any) => {
      const ids = e[0].data.filter((item:any) => item.value).map((item:any) => item.id);

      overviewObjectOverlay.getOverlays().forEach((item:any) => {
        if (ids.includes(item.getExtData().place)) {
          item.show();
        } else {
          item.hide();
        }
      })
    }


    // 运营分析
    const fetchPersonnelVehicleObject = async (projectId:number) => {
      infoWindow?.close();
      try {
        if (activeTab.value === 1 && monitorTab.value === "dynamic") {
          const {data,} = await mesIndexQueryJobBoardMapUserOrCarStatus({projectId,type:footerTab.value,});
          drawPersonnelVehicleObject(data);
        } 
      } catch (error) {
				
      }
    }

    const getShowLayer = (userData:any,Ids:any) => {
      for (let i = 0; i < Ids.length; i++) {
        if (userData[Ids[i]]) {
          return true;
        }
      }
      return false; // 如果没有匹配到对应状态的图标链接，返回空字符串
    }

    const drawPersonnelVehicleObject = (objectList:MES.JobBoardMapUserOrCarStatusDTO[]) => {
      cleraMap();

      personnelVehicleObjects = objectList.map(marker => {
        let onJob, offLine, offJob;
        const onJobIcon = footerTab.value === "Manual_cleaning" ? `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-icon/manual-onJob-${marker.direction}.gif` : `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-icon/vehicle-onJob-${marker.direction}.gif`;
        const offLineIcon = footerTab.value === "Manual_cleaning" ? `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-icon/manual-offLine-${marker.direction}.png` : `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-icon/vehicle-offLine-${marker.direction}.png`;
        const offJobIcon = footerTab.value === "Manual_cleaning" ? `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-icon/manual-offJob-${marker.direction}.gif` : `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-icon/vehicle-offJob-${marker.direction}.gif`;

        if (marker.isOnJob) {
          onJob = new AMap.Marker({
            position: <any>[marker.longitude, marker.latitude],
            icon: new AMap.Icon({
              image: onJobIcon,
              size: footerTab.value === "Manual_cleaning" ? new AMap.Size(40, 74) : new AMap.Size(85, 50),
              imageSize: footerTab.value === "Manual_cleaning" ? new AMap.Size(40, 74) : new AMap.Size(85, 50),
            }),
            offset: footerTab.value === "Manual_cleaning" ? new AMap.Pixel(-20, -74) : new AMap.Pixel(-42.5, -50),
            bubble: true,
            extData: marker,
            cursor: "pointer",
            zIndex: 100,
          })

          onJob.on("click", clickVehicleMarker);
          onJob.on("mouseover", mouseoverMonitorObject);
          onJob.on("mouseout", mouseoutMonitorObject);

          return onJob;

        } else if (marker.isOffline) {
          offLine = new AMap.Marker({
            position: <any>[marker.longitude, marker.latitude],
            icon: new AMap.Icon({
              image: offLineIcon,
              size: footerTab.value === "Manual_cleaning" ? new AMap.Size(40, 74) : new AMap.Size(85, 50),
              imageSize: footerTab.value === "Manual_cleaning" ? new AMap.Size(40, 74) : new AMap.Size(85, 50),
            }),
            offset: footerTab.value === "Manual_cleaning" ? new AMap.Pixel(-20, -74) : new AMap.Pixel(-42.5, -50),
            bubble: true,
            extData: marker,
            cursor: "pointer",
            zIndex: 100,
          })

          offLine.on("click", clickVehicleMarker);
          offLine.on("mouseover", mouseoverMonitorObject);
          offLine.on("mouseout", mouseoutMonitorObject);

          return offLine;

        } else if (marker.isOffJob) {
          offJob = new AMap.Marker({
            position: <any>[marker.longitude, marker.latitude],
            icon: new AMap.Icon({
              image: offJobIcon,
              size: footerTab.value === "Manual_cleaning" ? new AMap.Size(40, 74) : new AMap.Size(85, 50),
              imageSize: footerTab.value === "Manual_cleaning" ? new AMap.Size(40, 74) : new AMap.Size(85, 50),
            }),
            offset: footerTab.value === "Manual_cleaning" ? new AMap.Pixel(-20, -74) : new AMap.Pixel(-42.5, -50),
            bubble: true,
            extData: marker,
            cursor: "pointer",
            zIndex: 100,
          })

          offJob.on("click", clickVehicleMarker);
          offJob.on("mouseover", mouseoverMonitorObject);
          offJob.on("mouseout", mouseoutMonitorObject);

          return offJob;
        }
      })

      personnelVehicleOverlay.addOverlays(personnelVehicleObjects);

      // @ts-ignore
      map.add(personnelVehicleOverlay);
    }

    const clickVehicleMarker = async (e:any) => {
      infoWindow?.close();

      try {
        const {data,} = await mesIndexQueryJobBoardMapUserOrCarInfo({
          projectId: projectId.value as number,
          objectId: e.target.getExtData().objectId,
          type: footerTab.value,
        })

        await showInfoWindow(data,footerTab.value);
				
      } catch (error) {
				
      }

    }

    const getColor = (status:string) => {
      switch (status) {
      case "在岗":
        return {
          background: "linear-gradient(146deg, #91F8CD 0%, #30BC61 100%)",
        };
      case "脱岗":
        return {
          background: "linear-gradient(146deg, #FF8A64 0%, #FA645D 100%, #FA625D 100%, #FA645D 100%)",
        };
      case "离线":
        return {
          background: "linear-gradient(146deg, #CDCDCD 0%, #787878 100%)",
        };
      }
    }

    const showInfoWindow = async(e:any,type:string) => {
      const address = await getAddress([e.longitude, e.latitude]).then((res:any) => res.address);
      const vehicleAvatar = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/car-icon.png"

      const manualContent = `
			<div class="operation-analysis__info-window">
        <div class="operation-analysis__info-window__header">
          <div class="operation-analysis__info-window__header-left">
            <img
              src="${e.objectUrl}"
              alt=""
              width="61"
              height="61"
              class="operation-analysis__info-window__header-left-avatar"
            >
            <span class="operation-analysis__info-window__header-left-name">${e.objectName}</span>
            <span class="operation-analysis__info-window__header-left-tag" style="background:${getColor(e.jobStatus)?.background};">${e.jobStatus}</span>
          </div>
          <div class="operation-analysis__info-window__header-right" id="close"></div>
        </div>
        <div class="operation-analysis__info-window__body">
          <div class="operation-analysis__info-window__body-item">
            联系电话：<span>${e.mobile || "暂无"}</span>
          </div>
          <div class="operation-analysis__info-window__body-item">
            人员类型：<span>${e.userType || "暂无"}</span>
          </div>
          <div class="operation-analysis__info-window__body-item">
            所属组织：<span>${e.ordNames || "暂无"}</span>
          </div>
          <div class="operation-analysis__info-window__body-item">
            <img src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/clock-icon.png" width="9" height="9" />
            <p class="time">${e.reportTime}</p>
          </div>
          <div class="operation-analysis__info-window__body-item">
            <img src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/location-icon.png" width="8" height="10" />
            <p class="address">
              ${address}
            </p>
          </div>
        </div>
        <div class="operation-analysis__info-window__footer">
				<div	class="operation-analysis__info-window__footer-btn"
					id="trajectory"
					style="color: #10CDFF;"
          >
            工作轨迹
          </div>
        </div>
      </div>
			`
      const vehicleContent = `
			<div class="operation-analysis__info-window">
        <div class="operation-analysis__info-window__header">
          <div class="operation-analysis__info-window__header-left">
            <img
              src="${vehicleAvatar}"
              alt=""
              width="61"
              height="61"
              class="operation-analysis__info-window__header-left-avatar"
            >
            <span class="operation-analysis__info-window__header-left-name">${e.objectName}</span>
            <span class="operation-analysis__info-window__header-left-tag" style="background:${getColor(e.jobStatus)?.background};">${e.jobStatus}</span>
          </div>
          <div class="operation-analysis__info-window__header-right" id="close"></div>
        </div>
        <div class="operation-analysis__info-window__body">
          <div class="operation-analysis__info-window__body-item">
            车辆类型：<span>${e.carType || "暂无"}</span>
          </div>
          <div class="operation-analysis__info-window__body-item">
            所属组织：<span>${e.ordNames || "暂无"}</span>
          </div>
          <div class="operation-analysis__info-window__body-item">
            <img src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/clock-icon.png" width="9" height="9" />
            <p class="time">${e.reportTime}</p>
          </div>
          <div class="operation-analysis__info-window__body-item">
            <img src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/map/location-icon.png" width="8" height="10" />
            <p class="address">
              ${address}
            </p>
          </div>
        </div>
        <div class="operation-analysis__info-window__footer">
          <div
					class="operation-analysis__info-window__footer-btn"
					id="trajectory"
          >
            工作轨迹
          </div>
					<div
					class="operation-analysis__info-window__footer-btn"
					id="monitor"
          >
            车辆监控
          </div>
        </div>
      </div>
			`
      const content = type === "Manual_cleaning" ? manualContent : vehicleContent;
      const offsetY = type === "Manual_cleaning" ? -325 : -300;
			
      infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        autoMove: true, // 是否自动调整信息窗体位置
        offset: new AMap.Pixel(150, offsetY),
      });
      infoWindow.setContent(content);
      infoWindow.open(map, [e.longitude, e.latitude], 0);

      const closeBtn = document.getElementById("close");
      const trajectoryBtn = document.getElementById("trajectory");
      const monitorBtn = document.getElementById("monitor");

      const clickClose = () => {
        infoWindow.close();
      }

      const clickMonitor = async () => {
        infoWindow.close();

        try {
          const {data,} = await mesVideoQueryVideoDeviceList({deviceSerial:"G38186086",})
          curMonitorData.value = data[0].list;

          monitorVisible.value = true;

        } catch (error) {
					
        }

      }

      const clickTrajectory = () => {
        infoWindow.close();

        curTrajectoryData.value = {
          projectId,
          sceneType: footerTab.value,
          name: e.objectName,
          type: footerTab.value === "Manual_cleaning" ? e.userType : e.carType,
          org:e.ordNames,
          objectId: e.objectId,
        }
        trajectoryVisible.value = true;
      }

      closeBtn?.addEventListener("click",clickClose);
      monitorBtn?.addEventListener("click",clickMonitor);
      trajectoryBtn?.addEventListener("click",clickTrajectory);
    }

    const mouseoverMonitorObject = (e: any) => {
      let current = e.target.getExtData().objectId;	
      currentMonitorId.value = current;

      personnelVehicleOverlay.getOverlays().forEach(object => {
        let selected = object.getExtData().objectId === current;
        if (selected) {
          monitorObjectText = new AMap.Text({
            text: `
									<span>${object.getExtData().objectName}</span>
									`,
            position: [object.getExtData().longitude, object.getExtData().latitude],
            offset: footerTab.value === "Manual_cleaning" ? new AMap.Pixel(-(object.getExtData().objectName.length * 20 / 2), -114) : new AMap.Pixel(-(object.getExtData().objectName.length * 16 / 2), -90),
            style: { 
              "background": "#003063",
              "font-size": "14px",
              "text-align": "center",
              "color": "#FFFFFF",
              "padding": "5px 10px",      
              "border": "1px solid #0FC6F8",
            },
            extData: object.getExtData(),
            zIndex: 13,
          });
          map.add(monitorObjectText);
        }
      });
    }

    const mouseoutMonitorObject = () => {
      personnelVehicleOverlay.getOverlays().forEach(object => {
        let selected = object.getExtData().objectId === currentMonitorId.value;
          
        if (selected) {
          map.remove(monitorObjectText);
        }
      });
    };

    const changePersonnelLayer = (e:any) => {
      const trueIds:any[] = [];

      for (const layer of e) {
        for (const child of layer.children) {
          for (const item of child.data) {
            if (item.value === true) {
              trueIds.push(item.id);
            }
          }
        }
      }
      personnelVehicleOverlay.getOverlays().forEach((item:any) => {
        if (getShowLayer(item.getExtData(),trueIds)) {
          item.show();
        } else {
          item.hide();
        }
      })
    }

    const changePersonnelLayerVisible = () => {
      manualLayer.forEach((layer:any) => {
        layer.children.forEach((item:any) => {
          item.expanded = true
        })
      })
    }

    // 运营分析-场地监控
    const fetchSiteMonitoring = async() => {
      try {
        const { data, } = await mesScreenQueryMapVideoDevice();
        drawSiteMonitoring(data)
      } catch (error) {
				
      }
    }

    const drawSiteMonitoring = (data:MES.MapVideoDeviceDTO[]) => {
      cleraMap();

      siteMonitoringMarkers = data.map(marker => {
        const item = new AMap.Marker({
          position: <any>[marker.longitude, marker.latitude],
          icon: new AMap.Icon({
            image: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/map-icon/site-monitoring-icon.png",
            size: new AMap.Size(33, 56),
            imageSize: new AMap.Size(33, 56),
          }),
          offset: new AMap.Pixel(-16.5, -56),
          bubble: true,
          extData: marker,
          cursor: "pointer",
          zIndex: 100,
        })

        item.on("click", clickSiteMonitoringMarker);

        return item;
      })

      siteMonitoringOverlay.addOverlays(siteMonitoringMarkers);
      // @ts-ignore
      map.add(siteMonitoringOverlay);
    }

    const clickSiteMonitoringMarker = async(e:any) => {
      try {
        const {data,} = await mesScreenQueryMapVideoCamera({deviceSerial:e.target.getExtData().deviceSerial,})
        curMonitorData.value = data;

        monitorVisible.value = true;
      } catch (error) {
				
      }			
    }
		

    // footerTab切换
    const handlePointTypeClick = async () => {
      cleraMap();
			
      if (footerTab.value === "Manual_cleaning" || footerTab.value === "Vehicle_operation") {
        await  fetchPersonnelVehicleObject(projectId.value as number);
      } else if (footerTab.value === "Site_monitoring") {
        await fetchSiteMonitoring();
      }
    }

    // 动态or覆盖监控切换
    const handleTabClick = async (value:string) => {
      if (footerTab.value === "Manual_cleaning" || footerTab.value === "Vehicle_operation") {
        await fetchPersonnelVehicleObject(projectId.value as number);
      }
    }

    const cleraMap = () => {
      personnelVehicleOverlay.clearOverlays();
      map.remove(personnelVehicleObjects);
      personnelVehicleObjects.length = 0;

      siteMonitoringOverlay.clearOverlays();
      map.remove(siteMonitoringMarkers);
      siteMonitoringMarkers.length = 0;
    }

    // 5分钟
    const timer = setInterval(() => {
      fetchPersonnelVehicleObject(projectId.value as number);
    }, 300000);
		
    onUnmounted(() => {
      clearInterval(timer);
    });
		
    return {
      mapRef,
      overviewLayerRef,
      staffingPanelRef,
      vehicleConfigurationRef,
      monitorRef,
      activeTab,
      tabs,
      projectId,
      projectName,
      projectCity,
      projectPersonTotal,
      projectData,
      overviewLayer,
      manualLayer,
      vehicleLayer,
      monitorTab,
      footerTab,
      overviewUserGenderData,
      trajectoryVisible,
      curTrajectoryData,
      monitorVisible,
      curMonitorData,
      clickActiveTab,
      backHome,
      handleProjectChange,
      changeOverviewLayer,
      changePersonnelLayer,
      changePersonnelLayerVisible,
      handlePointTypeClick,
      handleTabClick,
    }
  },
})
</script>

<style lang="less">
.operation-analysis {
	position: relative;

	.header-card {
		height: 70px;
		padding: 0 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: linear-gradient(180deg, #104695 0%, #0C274E 100%);
		position: relative;

		&__tabs {
			display: flex;
			margin-left: calc(50% - 315.5px - 168px * 2);

			&-item {
				width: 126px;
				height: 48px;
				line-height: 48px;
				font-size: 22px;
				font-weight: 500;
				color: #D0D0D0;
				text-align: center;
				cursor: pointer;
				position: relative;

				&:not(:last-child) {
					margin-right: 42px;
				}
			}

			&-item:before,
			&-item:after {
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				height: 2px;
				background-image: linear-gradient(to right, rgba(63, 145, 216, 0) 0%,  rgba(63, 145, 216, 0.6) 50%, rgba(63, 145, 216, 0) 100%);
			}

			&-item:before {
				top: 0;
			}

			&-item:after {
				bottom: 0;
			}

			&-item.active {
				color: #25E3FF;
				background-image: linear-gradient(to right, rgba(63, 145, 216, 0) 0%, rgba(63, 145, 216, 0.2) 50%, rgba(63, 145, 216, 0) 100%);
			}
		}

		&__title {
			width: 631px;
			height: 113px;
			position: absolute;
			top: 0;
			left: calc(50% - 315.5px);
			z-index: 999;
			background-image: url('https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/top-center.png');
			background-size: 100%;
			background-position: center;
			background-repeat: no-repeat;

			&-text {
				font-size: 36px;
				color: #B0D8F5;
				line-height: 113px;
				text-align: center;
				letter-spacing: 5px;
				-webkit-text-stroke: 1px #3F91D8;
				-webkit-text-fill-color: #B0D8F5;

				&::after, &::before {
					content: '';
					display: inline-block;
					vertical-align: middle;
					width: 12px;
					height: 12px;
					background: #EAB309;
					border-radius: 50%;
				}
			}
		}

		&__right {
			display: flex;
			margin-right: 40px;

			&-back {
				cursor: pointer;
			}

			&-project {
				margin-right: 60px;

				.el-select,.el-input__wrapper {
					width: 100%;
					--el-select-border-color-hover: transparent;
				}

				.el-select:hover{
						outline: none !important;
					}

				.el-popper.is-pure {
					background-color: #232b35;
					border: none;
				}

				.el-popper.is-light .el-popper__arrow::before {
					border-color: #232b35;
					background-color: #232b35;
				}

				.el-input__wrapper {
					box-shadow: none;
					background-color: transparent;
					&:focus-visible {
						outline: none;
					}
				}

				.el-input.is-focus:focus-visible {
					outline: none;
				}

				.el-select .el-input.is-focus .el-input__wrapper {
					box-shadow: none !important;
				}

				.el-select .el-input__wrapper.is-focus {
					box-shadow: none !important;
				}

				.el-input__inner {
					// background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
					background: #D0D0D0;
					-webkit-background-clip: text;
					background-clip: text;
					text-align: center;
					font-size: 24px;
					color: transparent;

					&:-ms-input-placeholder {
						color: #FFF;
					}
				}
			}
		}
	}

	&__map {
		width: 100%;
		height: 100%;
	}

	&__left, &__right {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	&__info-window {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 260px;
		background: #0D3063;
		border-radius: 5px;	
		border: 1px solid #0FB0E2;
		z-index: 1000;
		padding: 12px;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 13px;

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
					color: #fff;
					margin: 0 6px 0 8px;
				}

				&-tag {
					width: 40px;
					height: 17px;
					font-size: 12px;
					text-align: center;
					line-height: 17px;
					border-radius: 7px;
					color: #fff;
				}
			}

			&-right {
				position: relative;
				width: 14px;
				height: 14px;
				background: #0FB0E2;
				border-radius: 50%;
				cursor: pointer;
				margin-right: -5px;
				margin-top: -30px;
			}
			&-right::before,
			&-right::after {
				content: '';
				position: absolute;
				width: 1px;
				height: 10px;
				background: #000;
				left:6px;
				margin-top: 2px;
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

			&-item {
				margin-bottom: 8px;
				font-size: 12px;				
				color: #fff;
				display: flex;
				align-items: center;

				img {
					margin-right: 5px;
				}

				span {
					color: #fff;
				}

				.time,.address {
					color: #8596AF;
				}

				.address {
					padding: 0;
					display: inline-block;
					flex:1;
					height: auto;
					background-color: transparent;
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
			padding-top: 12px;
			border-top: 1px solid rgba(211, 211, 211, .4);

			&-btn {
				border-radius: 2px;
				font-size: 12px;
				text-align: center;
				cursor: pointer;			
				color: #10CDFF;

				&:last-child {
					color: #fff;
				}
			}
		}
	}
}

.header-card__right-project-popper {
	background: transparent !important;
	backdrop-filter: blur(10px);
	border: none !important;
	
	.el-popper__arrow::before{
		background: transparent !important;
		border: none !important;
	}

	.el-select-dropdown__item {
		color: #fff;
		text-align: center;
		font-size: 16px;
	}

	.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
		background-color: #363D47;
	}

	.el-popper.is-light .el-popper__arrow::before {
		border-color: #232b35;
		background-color: #232b35;
	}
}
</style>
