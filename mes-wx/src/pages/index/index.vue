<template>
  <view class="supervise">
    <status-bar />
    <view class="supervise-head">
      <text style="font-size: 36rpx;">
        行运创城
      </text>
    </view>
    <map
      id="map"
      ref="map"
      class="map"
      :style="{height: mapHeight + 'px'}"
      :scale="14"
      :longitude="longitude"
      :latitude="latitude"
      show-compass
      show-location
      :polygons="mapData.polygons"
      :polyline="mapData.polyline"
      :markers="mapData.markers"
      :enable-scroll="enableScroll"
      @callouttap="callouttap"
      @markertap="callouttap($event)"
      @tap="mapClick"
    >
      <uni-transition
        class="message-top"
        :mode-class="['fade', 'slide-top']"
        :show="loading"
      >
        <view
          class="message-top-content"
          :style="{ backgroundColor: objectList.length ? '#57BB73' : '#6A98F7'}"
        >
          <text>{{ objectList.length ? '对象加载成功' : '正在加载对象数据……' }}</text>
        </view>
      </uni-transition>
    </map>
    <view
      v-show="showMenu"
      class="right-menu"
    >
      <!-- 返回按钮 -->
      <view
        v-if="showAddDot"
        class="right-menu-item"
        @click="showAddDot = !showAddDot"
      >
        <image
          class="right-menu-item--img"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/back-icon.png"
        />
      </view>
      <template v-else>
        <!-- 切换作业类型 -->
        <view
          class="right-menu-item"
          @click="openPopup('jobType')"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.8/switch-jobType.png"
          />
        </view>
        <!-- 图层切换 -->
        <!-- <view
          class="right-menu-item"
          @click="popupList.coverage = true"
        >
          <image
            class="right-menu-item--img"
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/coverage.png"
          />
        </view> -->
        <!-- 图层元素 -->
        <view
          v-if="userRole !== 'INSPECTOR'"
          class="right-menu-item"
          @click="openPopup('coverage')"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/coverage.png"
          />
        </view>
        <!-- 筛选 -->
        <view
          class="right-menu-item"
          @click="openPopup('filter')"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/filter.png"
          />
        </view>
        <!-- 网格切换 -->
        <!-- <view
          class="right-menu-item"
          @click="popupList.grid = true"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/coverage.png"
          />
        </view> -->
        <!-- 聚焦项目中心 -->
        <view
          class="right-menu-item"
          @click="handleProjectCenter"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/project-for-map-center.png"
          />
        </view>
        <!-- 对象列表 -->
        <view
          class="right-menu-item"
          @click="goToList"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/list.png"
          />
        </view>
        <!-- 人员采集 -->
        <view
          v-if="userRole === 'CAPTAIN'"
          class="right-menu-item"
          @click="goToPersonnelCollect"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/personnel-collect.png"
          />
        </view>
        <!-- 项目看板 -->
        <view
          class="right-menu-item"
          @click="goToProjectBoard"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/project-board-icon.png"
          />
        </view>
        <!-- 打点 -->
        <view
          v-if="userRole === 'PROJECT_MANAGER'"
          class="right-menu-item"
          @click="showAddDot = !showAddDot"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/add.png"
          />
        </view>
        <!-- 打卡 -->
        <view
          v-if="userRole === 'CAPTAIN'"
          class="right-menu-item"
          @click="goToPunchClock"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.9/punch-clock.png"
          />
        </view>
        <!-- 请假 -->
        <view
          v-if="userRole === 'CAPTAIN'"
          class="right-menu-item"
          @click="openPopup('leave')"
        >
          <image
            class="right-menu-item--img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/leave-icon.png"
          />
        </view>
      </template>
    </view>
    <view v-show="showMenu">
      <view
        v-if="userRole === 'PROJECT_MANAGER'"
        class="notice-fab"
        @click="noticeRef.open()"
      >
        <image
          class="right-menu-item--img"
          style="width: 50rpx;height: 50rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/notice-message.png"
        />
      </view>
      <view
        class="location-fab"
        @click="handleLocation"
      >
        <image
          class="right-menu-item--img"
          style="width: 44rpx;height: 52rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/location.png"
        />
      </view>
      <view
        class="user-fab"
        @click="goToMine"
      >
        <image
          style="width: 52rpx;height: 52rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/user.png"
        />
      </view>
    </view>
    <template v-if="showAddDot">
      <view class="map-center-dot-fab">
        <image
          class="map-center-dot-fab--img"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/map-center-dot-icon.png"
        />
      </view>
      <view class="map-center-dot-box">
        <button
          class="map-center-dot-box--btn"
          type="button"
          @click="handleAddPoint"
        >
          打点
        </button>
      </view>
    </template>
    <job-type-popup
      v-if="popupList.jobType"
      v-model:visible="popupList.jobType"
      :job-type="jobType"
      @change="jobTypeChange"
    />
    <coverage-popup
      v-if="popupList.coverage"
      v-model:visible="popupList.coverage"
      :coverage-element="coverageElement"
      :job-type="jobType"
      @confirm="coverageConfirm"
    />
    <filter-popup
      v-if="popupList.filter"
      v-model:visible="popupList.filter"
      :coverage-element="coverageElement"
      :filter-data="filterModel"
      :job-type="jobType"
      @confirm="filterConfirm"
    />
    <leave-popup
      v-if="popupList.leave"
      v-model:visible="popupList.leave"
      :job-type="jobType"
    />
    <supervise-info
      v-if="popupList.superviseInfo"
      v-model:visible="popupList.superviseInfo"
      :data="objectInfo"
      @marker-reload="() => (getObjectList())"
      @close="closeInfoPopup()"
    />
    <work-info
      v-if="popupList.workInfo"
      v-model:visible="popupList.workInfo"
      :data="workInfo"
      @close="closeInfoPopup()"
    />
    <uni-popup
      ref="noticeRef"
      type="dialog"
    >
      <uni-popup-dialog
        mode="base"
        title="消息公告"
        type="info"
        before-close
        @confirm="noticeMessage"
        @close="() => noticeRef.close()"
      >
        <view class="notice-message">
          <textarea
            v-model="noticeModel"
            class="notice-message-textarea"
            placeholder="请输入公告内容，提交后全体一线人员将会收到该公告"
            placeholder-class="textarea-placeholder"
            auto-height
          />
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>
<script lang="ts">
import { mesWechatCaptainSimpleSelectCaptainObjectList, mesWechatCaptainSimpleSelectInspectionObjectList, mesWechatCaptainSimpleSelectRectificationObjectList, mesWechatJobStatusSelectUserMapList, mesWechatProjectManagerSendMsgNotice, mesWechatProjectManagerSimpleSelectObjectList } from "@/api/mes/wechatController";
import StatusBar from "@/components/status-bar/index.vue";
import type { MapData, MarkerType, PolygonType, PolylineType } from "@/components/typings";
import { logger } from "@/utils/fn";
import { convertPointList, isPointInPolygon, isPointOnPolyline } from "@/utils/map";
import type { Ref } from "vue";
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
import CoveragePopup from "./components/coverage-popup.vue";
import type { FilterObjectType } from "./components/filter-popup.vue";
import FilterPopup from "./components/filter-popup.vue";
import JobTypePopup from "./components/job-type-popup.vue";
import LeavePopup from "./components/leave-popup.vue";
import SuperviseInfo from "./components/supervise-info.vue";
import WorkInfo from "./components/work-info.vue";

export default defineComponent({
  name: "SupervisePage",
  components: { StatusBar, SuperviseInfo, WorkInfo, CoveragePopup, FilterPopup, JobTypePopup, LeavePopup, },
  options: { styleIsolation: "shared", },
  setup() {
    const userRole = uni.getStorageSync("userRole")
    const projectInfo: MES.WechatProjectDTO = uni.getStorageSync("projectInfo")
    const inspectionTypes: {label: string, value: string}[] = uni.getStorageSync("dict").inspection_type
    const screenHeight = getApp().globalData?.screenHeight - getApp().globalData?.statusBarHeight - 55
    const map = uni.createMapContext("map", getCurrentInstance());
    const longitude: Ref<number> = ref<number>(Number(projectInfo.longitude));
    const latitude: Ref<number> = ref<number>(Number(projectInfo.latitude));
    const enableScroll: Ref<boolean> = ref<boolean>(true)
    const isIos = getApp().globalData?.osName === "ios" ? true : false;
    const mapHeight = ref<number>(screenHeight)
    const mapData = reactive<MapData>({ polyline: [], polygons: [], markers: [],});
    const loading: Ref<boolean> = ref<boolean>(true)
    const showMenu = computed(() => !Object.values(popupList).includes(true))
    const showAddDot: Ref<boolean> = ref<boolean>(false)
    const jobType = ref<"Manual_cleaning"|"Vehicle_operation">("Manual_cleaning")
    const currentList = ref<MES.SimpleWechatObjectDTO[]>([])
    const coverageElement = reactive({ worker: false, object: inspectionTypes.map(item => item.value), vehicle: false, })
    const filterModel = reactive<FilterObjectType>({problem: "all",schedule: "all",jobStatus: "all",inspection: "all",})
    const objectInfo: Ref<MES.SimpleWechatObjectDTO> = ref<MES.SimpleWechatObjectDTO>({})
    const workInfo = ref<MES.WechatUserCarMapDTO & {jobType?: "Manual_cleaning"|"Vehicle_operation"}>({})
    const objectList: Ref<MES.SimpleWechatObjectDTO[]> = ref<MES.SimpleWechatObjectDTO[]>([])
    const userList = ref<MES.WechatUserCarMapDTO[]>([])
    const carList = ref<MES.WechatUserCarMapDTO[]>([])
    const popupList = reactive({
      jobType: false,
      grid: false,
      coverage: false,
      filter: false,
      problem: false,
      schedule: false,
      jobStatus: false,
      inspection: false,
      superviseInfo: false,
      workInfo: false,
      leave: false,
    });
    const noticeModel = ref<string>("")
    const noticeRef = ref()

    onMounted(() => {
      /** 如果没有项目中心位置，即定位当前位置 */
      !(projectInfo.latitude || projectInfo.longitude) && handleLocation()
    })
		
    const getObjectList = async () => {
      loading.value = true
      const params: any = {projectId: projectInfo.projectId,}
      try {
        const {data,} = await (userRole === "INSPECTOR" ? mesWechatCaptainSimpleSelectInspectionObjectList(params) : 
          userRole === "PROJECT_MANAGER" ? mesWechatProjectManagerSimpleSelectObjectList(params) :
            userRole === "CAPTAIN" ? mesWechatCaptainSimpleSelectCaptainObjectList(params) : mesWechatCaptainSimpleSelectRectificationObjectList(params));
        
        objectList.value = data
        currentList.value = data.filter(item => item.jobType === jobType.value)
        filterDataFn()
      } catch (error) {
        logger.error("getObjectList", error)
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 800))
        loading.value = false
      }
    }

    const getUserOrCarList = async (type: "user"|"car") => {
      loading.value = true
      try {
        const {data,} = await mesWechatJobStatusSelectUserMapList({jobType: jobType.value,projectId: <number>projectInfo.projectId,role: userRole,type,})
        type === "user" ? (userList.value = data) : (carList.value = data)
      } catch (error) {
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 800))
        loading.value = false
      }
    }
		
    const drawObject = async (data: MES.SimpleWechatObjectDTO[]) => {
      resetMapData()
      mapData.markers = data.map(object => {
        if (object.geometryType === 2) {
          mapData.polyline.push({
            points: convertPointList(<number[][]>object.routePointList),
            // color: object.objectColor,
            color: "#FFFFFF",
            width: object.strokeWidth, 
            data: object,
            borderWidth: 3,
            borderColor: object.objectColor,
          } as PolylineType)
        }
        if (object.geometryType === 3) {
          mapData.polygons.push({
            points: convertPointList(<number[][]>object.routePointList),
            fillColor: object.objectColor + "26",
            strokeColor: object.objectColor,
            strokeWidth: 1,
            data: object,
          })
        }
				
        /** 绘制名称气泡以及点位类型的对象 */
        let iconPath = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-blue.png"
        let fontColor = "#000"
        let statusText = ""

        if(userRole === "CAPTAIN" && object.status !== "none"){
          statusText = "(已排班)"
          iconPath = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-green.png"
          fontColor = "#6CB69C"
        }else if (object.status === "undone") {
          statusText = "(待督查)"
          iconPath = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-blue.png"
          fontColor = "#5977B3"
        } else if (object.status === "overdue") {
          statusText = "(逾期待整改)"
          iconPath = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-red.png"
          fontColor = "#AB5653"
        } else if (object.status === "done") {
          statusText = "(已督查)"
          iconPath = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-green.png"
          fontColor = "#6CB69C"
        } else if(object.status === "today") {
          statusText = ""
          iconPath = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-orange.png"
          fontColor = "#C78743"
        } else if(object.status === "none") {
          statusText = "(未排班)"
          iconPath = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.7/point-grey.png"
          fontColor = "#A1A1A1"
        }

        return {
          id: object.objectId,
          latitude: Number(object.routePointList ? object.routePointList[0][1] : 0),
          longitude: Number(object.routePointList ? object.routePointList[0][0] : 0),
          width: object.geometryType === 1 ? 32 : 1,
          height: object.geometryType === 1 ? 38 : 1,
          title: object.objectName,
          iconPath,
          alpha: 1,
          joinCluster: false,
          callout: {
            content: " " + object.objectName + (userRole !== "PROJECT_MANAGER" ? statusText : "") + " ",
            display: "ALWAYS",
            borderRadius: 5,
            bgColor: "#fff",
            color: fontColor,
            padding: 5,
            fontSize: 12,
          },
          data: object,
          type: "object",
        } as MarkerType
      })
    }

    const drawUserOrCar = (data: MES.WechatUserCarMapDTO[],type: "car"| "user") => {
      resetMapData()
      mapData.markers = data.map(item => {
        let statusText = ""
        let iconPath = `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/${ type === "car" ? "car" : "personnal"}-icon-green.png`
        let fontColor = "#000"
        if(item.isOnJob) {
          statusText = "(在岗)"
          iconPath = `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/${type === "user" ? "personnal" : "car"}-icon-green.png`
          fontColor = "#6CB69C"
        } else if(item.isOffJob) {
          statusText = "(脱岗)"
          iconPath = `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/${type === "user" ? "personnal" : "car"}-icon-orange.png`
          fontColor = "#C78743"
        } else if(item.isOffline) {
          statusText = "(离线)"
          iconPath = `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/${type === "user" ? "personnal" : "car"}-icon-grey.png`
          fontColor = "#A1A1A1"
        }

        return {
          id: type === "car" ? item.carId : item.userId,
          longitude: item.longitude,
          latitude: item.latitude,
          width: 32,
          height: 38,
          title: type === "car" ? item.carNumber : item.userName,
          iconPath,
          alpha: 1,
          joinCluster: false,
          callout: {
            content: " " + (type === "car" ? item.carNumber : item.userName) + (userRole !== "PROJECT_MANAGER" ? statusText : "") + " ",
            display: "ALWAYS",
            borderRadius: 5,
            bgColor: "#fff",
            color: fontColor,
            padding: 5,
            fontSize: 12,
          },
          data: item,
          type,
        } as any
      })
    }

    const mapClick = ({ detail, }: { detail: { latitude: number, longitude: number } }) => {
      if(showAddDot.value) return
      const resPolygon = mapData.polygons.find((item) => {
        return isPointInPolygon([detail.longitude, detail.latitude], item.points.map(item => [item.longitude, item.latitude]));
      })
      const resPolyline = mapData.polyline.find((item) => {
        return isPointOnPolyline(detail, item.points);
      });
      if (resPolygon) {
        highLightObject(resPolygon.data)
        objectInfo.value = resPolygon.data
      }
      if (resPolyline) {
        highLightObject(resPolyline.data)
        objectInfo.value = resPolyline.data
      }
      (resPolygon || resPolyline) && openPopup("superviseInfo")
    }

    const callouttap = (e: { detail: { markerId: number } }) => {
      if(showAddDot.value) return
      const marker = mapData.markers.find(item => item.id === e.detail.markerId)
      if(marker?.type === "object") {
        highLightObject(marker?.data)
        objectInfo.value = marker?.data
        openPopup("superviseInfo")
      } else {
        map.includePoints({points: [{longitude: Number(marker?.longitude),latitude: Number(marker?.latitude) - 0.0000001,},{longitude: Number(marker?.longitude),latitude: Number(marker?.latitude) + 0.0000001,}],})
        workInfo.value = {...marker?.data, jobType: jobType.value,}
        openPopup("workInfo")
      }
    }

    const resetMapData = () => {
      mapData.markers = []
      mapData.polygons = []
      mapData.polyline = []
    }

    /** 高亮已选中的对象并聚焦 */
    const highLightObject = (object: MES.SimpleWechatObjectDTO & any) => {
      switch(object.geometryType){
      case 1:
        mapData.markers.forEach(item => {
          if (item.data.objectId == object.objectId) {
            item.iconPath = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.8/point-active.png"
          }
        })
        map.includePoints({points: [{longitude: object.routePointList[0][0],latitude: object.routePointList[0][1] - 0.0000001,},{longitude: object.routePointList[0][0],latitude: object.routePointList[0][1] + 0.0000001,}],})
        break;
      case 2: 
        mapData.polyline.forEach(item => {
          if (item.data.objectId == object.objectId) {
            item.color = "#E81D1D"
            item.borderWidth = 0
          } 
        })
        map.includePoints({points: convertPointList(<number[][]>object.routePointList),padding: [19,19,19,19],})
        break;
      case 3:
        const objData = mapData.polygons.find(item => item.data.objectId == object.objectId)
        const objIndex = mapData.polygons.findIndex(item => item.data.objectId == object.objectId)			
        mapData.polygons.splice(objIndex, 1)
        mapData.polygons.push({ ...objData, fillColor: "#E81D1D4d", } as PolygonType)
        map.includePoints({points: convertPointList(<number[][]>object.routePointList),padding: [19,19,19,19],})
        break;
      } 
    }

    const openPopup = async (val: "superviseInfo" | "coverage" | "jobType" | "grid"| "filter" | "problem" | "schedule" | "workInfo" | "leave") => {
      //@ts-ignore
      Object.keys(popupList).forEach(key => (popupList[key] = false))
      popupList[val] = true
      if (val === "superviseInfo" || val === "workInfo") mapHeight.value = screenHeight - 419
      isIos && (enableScroll.value = true)
    }

    const closeInfoPopup = () => {
      mapHeight.value = screenHeight
      filterDataFn()
    }

    /** 聚焦到项目中心 */
    const handleProjectCenter = () => {
      map.includePoints({points: [{latitude: Number(projectInfo.latitude) + 0.07, longitude: Number(projectInfo.longitude),}, {latitude: Number(projectInfo.latitude) - 0.07, longitude: Number(projectInfo.longitude),}],})
      uni.showToast({title: "已跳转到工作区域", icon: "none",})
    }
		
    /** 定位 */
    const handleLocation = () => {
      uni.getLocation({
        type: "gcj02",
        success: ({longitude,latitude,}) => {
          map.moveToLocation({longitude,latitude,})
        },
      })
    }

    const goToMine = () => {
      uni.navigateTo({url: "/pages/mine/index",})
    }

    /** 对象列表 */
    const goToList = () => {
      uni.navigateTo({
        url: "/pages/object-list/index?jobType=" + jobType.value,
        events: {
          openDetail: (data: MES.SimpleWechatObjectDTO) => {
            objectInfo.value = objectList.value.find(item => data.objectId === item.objectId) as any
            drawObject([objectInfo.value])
            highLightObject(objectInfo.value)
            openPopup("superviseInfo")
          },
        },
      })
    }

    /** 打卡 */
    const goToPunchClock = () => {
      uni.navigateTo({ url: "/pages/punch-clock/index?jobType=" + jobType.value, })
    }

    /** 切换作业类型 */
    const jobTypeChange = (val: "Manual_cleaning" | "Vehicle_operation") => {
      jobType.value = val
      currentList.value = objectList.value.filter(item => item.jobType === val)
      filterModel.problem = "all"
      filterModel.schedule = "all"
      filterModel.jobStatus = "all"
      filterModel.inspection = "all"
      coverageElement.worker = false
      coverageElement.vehicle = false
      coverageElement.object = inspectionTypes.map(item => item.value)
      filterDataFn()
    }

    /** 打点按钮 */
    const handleAddPoint = () => {
      const params: any = {
        pageMethod: "add",
        routePointList: [],
        jobType: jobType.value,
      }
      map.getCenterLocation({
        success: (res) => {
          const latitude = res.latitude.toFixed(6).toString()
          const longitude = res.longitude.toFixed(6).toString()
          params.routePointList = [[longitude, latitude]]

          uni.navigateTo({url: `/pages/object-config/index?data=${encodeURIComponent(JSON.stringify(params))}`,events: {reload: () => getObjectList(),},})
          showAddDot.value = false
        },})
    }

    /** 人员列表 */
    const goToPersonnelCollect = () => {
      uni.navigateTo({url: "/pages/personnel-list/index?jobType="+jobType.value,})
    }
		
    /** 项目看板 */
    const goToProjectBoard = () => {
      uni.navigateTo({url: "/pages/project-board/index?jobType="+jobType.value,})
    }

    /** 筛选的确认 */
    const filterConfirm = (val: FilterObjectType) => {
      filterModel.gridId = val.gridId
      filterModel.gridName = val.gridName
      filterModel.problem = val.problem
      filterModel.schedule = val.schedule
      filterModel.jobStatus = val.jobStatus
      filterModel.inspection = val.inspection
      filterDataFn()
    }

    /** 消息公告 */
    const noticeMessage = async () => {
      if(!noticeModel.value.length) {
        uni.showToast({title: "消息内容不能为空", icon: "none",})
        return;
      }
      try {
        const {success,} = await mesWechatProjectManagerSendMsgNotice({projectId: projectInfo.projectId, msgNotice: noticeModel.value,})
        if(success) {
          uni.showToast({title: "发送成功", icon: "success",})
          noticeRef.value.close()
        }
      } catch (error) {
        logger.error("noticeMessage",error)
      }
    }

    /** 图层元素的确认 */
    const coverageConfirm = async (val: { worker: boolean, object: string[], vehicle: boolean}) => {
      if(val.worker && coverageElement.worker !== val.worker) await getUserOrCarList("user")
      else if(val.vehicle && coverageElement.vehicle !== val.vehicle) await getUserOrCarList("car")
      // else if(val.object.length && JSON.stringify(coverageElement.object) !== JSON.stringify(val.object)) getObjectList() // 因数据量可能会过大，所以不考虑更新对象列表
      coverageElement.worker = val.worker
      coverageElement.object = val.object
      coverageElement.vehicle = val.vehicle
      filterModel.problem = "all"
      filterModel.schedule = "all"
      filterModel.jobStatus = "all"
      filterModel.inspection = "all"
      filterDataFn()
    }

    /** 处理作业类型、图层元素、筛选后的地图元素数据 */
    const filterDataFn = () => {
      if(userRole === "INSPECTOR"){
        if(filterModel.inspection === "all") {
          drawObject(currentList.value)
        } else if(filterModel.inspection) {
          const list = currentList.value.filter(item => item.status !== "undone")
          drawObject(list)
        } else {
          const list = currentList.value.filter(item => item.status === "undone")
          drawObject(list)
        }
      } else if(coverageElement.object.length) {
        const list = currentList.value.filter(item => coverageElement.object.includes(<string>item.inspectionType))
        if(filterModel.schedule === "all") {
          if(filterModel.problem === true) {
            const newList = list.filter(item => item.status !== "done")
            drawObject(newList)
          } else if(filterModel.problem === "all")  {
            drawObject(list)
          }
        } else if (filterModel.schedule === true) {
          if(filterModel.problem === true) {
            const newList = list.filter(item => item.status !== "none" && item.status !== "done" )
            drawObject(newList)
          } else if(filterModel.problem === "all")  {
            const newList = list.filter(item => item.status !== "none")
            drawObject(newList)
          }
        } else if (filterModel.schedule === false) {
          const newList = list.filter(item => item.status === "none")
          drawObject(newList)
        }
      } else if(coverageElement.worker) {
        switch (filterModel.jobStatus) {
        case "all": 
          drawUserOrCar(userList.value,"user")
          break;
        case "onJob":
          const onJobList = userList.value.filter(item => item.isOnJob === 1)
          drawUserOrCar(onJobList,"user")
          break;
        case "offline":
          const offlineList = userList.value.filter(item => item.isOffline === 1)
          drawUserOrCar(offlineList,"user")
          break;
        case "offJob":
          const offJobList = userList.value.filter(item => item.isOffJob === 1)
          drawUserOrCar(offJobList,"user")
          break;
        }
      } else if(coverageElement.vehicle) {
        switch (filterModel.jobStatus) {
        case "all": 
          drawUserOrCar(carList.value,"car")
          break;
        case "onJob":
          const onJobList = carList.value.filter(item => item.isOnJob === 1)
          drawUserOrCar(onJobList,"car")
          break;
        case "offline":
          const offlineList = carList.value.filter(item => item.isOffline === 1)
          drawUserOrCar(offlineList,"car")
          break;
        case "offJob":
          const offJobList = carList.value.filter(item => item.isOffJob === 1)
          drawUserOrCar(offJobList,"car")
          break;
        }
      }
    }

    getObjectList()
    uni.getLocation({})

    if(!userRole){
      uni.redirectTo({ url: "/pages/login/index", })
    }
    if(!projectInfo.projectId){
      uni.redirectTo({ url: "/pages/project-select/index",})
    }

    isIos && watch(popupList, (val) => enableScroll.value = Object.values(val).includes(true))

    return {
      loading,
      popupList,
      objectList,
      userRole,
      map,
      longitude,
      latitude,
      enableScroll,
      mapData,
      objectInfo,
      showMenu,
      showAddDot,
      mapHeight,
      jobType,
      filterModel,
      coverageElement,
      inspectionTypes,
      workInfo,
      noticeRef,
      noticeModel,
      openPopup,
      callouttap,
      mapClick,
      handleProjectCenter,
      handleLocation,
      handleAddPoint,
      goToMine,
      goToList,
      goToPersonnelCollect,
      goToProjectBoard,
      getObjectList,
      drawObject,
      closeInfoPopup,
      jobTypeChange,
      goToPunchClock,
      coverageConfirm,
      filterConfirm,
      noticeMessage,
    }
  },
})
</script>
<style lang="scss">
.supervise {
	position: relative;
	overflow: hidden;

	&-head {
		height: 110rpx;
		line-height: 110rpx;
		padding-left: 20rpx;
	}

	.map {
		width: 100vw;
		transition: all 0.35s;
		position: relative;
	}
	
	.right-menu {
		position: absolute;
		right: 32rpx;
		top: 300rpx;

		&-item {
			width: 80rpx;
			height: 80rpx;
			border-radius: 15rpx;
			background-color: #ffffffee;
			box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(3,35,69,0.21);
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 20rpx;

			&--img {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

	.location-fab, .user-fab {
		position: absolute;
		bottom: 100rpx;
		width: 80rpx;
		height: 80rpx;
		background: #ffffffee;
		box-shadow: -1px 11px 76px 0px rgba(3, 35, 69, 0.21);
		border-radius: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.location-fab {
		left: 32rpx;
	}
	.user-fab {
		right: 32rpx;
	}

	.notice-fab {
		position: absolute;
		top: 300rpx;
		left: 32rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 15rpx;
		background-color: #ffffffee;
		box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(3,35,69,0.21);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.notice-message {
		width: 100%;
		padding: 16rpx;
		background: #f6f6f6;
		border-radius: 10rpx;

		&-textarea {
			width: auto;
			min-height: 200rpx;
			background: #f6f6f6;
		}

		.textarea-placeholder {
			font-size: 24rpx;
		}
	}

	.message-top {
		position: absolute;
		top: 0;
		left: 0;
		
		&-content {
			width: 100vw;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
		}
	}

	.map-center-dot-fab {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 50rpx;
		height: 50rpx;

		&--img {
			width: 100%;
			height: 100%;
		}
	}

	.map-center-dot-box {
		position: absolute;
		bottom: 100rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 376rpx;
		height: 80rpx;

		&--btn {
			background: #4075F5;
			border-radius: 8rpx;
			color: #fff;
		}
	}
}
</style>
