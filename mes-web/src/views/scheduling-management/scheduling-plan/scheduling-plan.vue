<template>
  <div class="scheduling-plan page-root">
    <div
      ref="mapRef"
      class="scheduling-plan__map"
    >
      <main-panel
        v-if="isMainPanel"
        v-model:active-tab="activeTab"
        class="scheduling-plan__card"
        @grid-click="handlerGridMap"
        @table-type="fetchGridAll"
      />
      <grid-panel
        v-else
        ref="gridPanelRef"
        class="scheduling-plan__card"
        :current-data="currentData"
        :card-type="cardType"
        @current-point="getCurrentPoint"
        @current-object="getCurrentObject"
        @shift-user-list="getShiftUserList"
        @shift-car-list="getShiftCarList"
        @current-shift="changeCurrentShift"
        @back="handlerPanelBack"
      /> 
      <el-pro-dialog
        v-model:model-value="pointDialogVisible"
        class="point-dialog"
        :title="currentPointOrObjectUserData.bindName"
        :width="'500px'"
        @closed="closeDialog"
      >
        <div
          class="point-dialog__operator item--container"
          :class="{'point-dialog__operator--dashed' : !currentPointOrObjectUserData.bindingStatus}"
        >
          <span class="point-dialog__title">
            作业人员{{ currentPointOrObjectUserData.bindingStatus ? '：' : '' }}
          </span>
          <span v-if="currentPointOrObjectUserData.bindingStatus && !editStatus">{{ currentPointBindingData?.userName }}</span>
          <div>
            <div
              v-if="shiftUserList.length > 0 && !currentPointOrObjectUserData.bindingStatus || editStatus"
              class="panel-info-content--item"
            >
              <div class="panel-info-content--item__btn">
                <el-button
                  class="panel-info-content--item__btn--left"
                  link
                  :disabled="userPagination.current <= 1"
                  @click="handlePageChange('prev','user',shiftUserList,userPagination)"
                >
                  <el-icon
                    size="24px"
                    :color="userPagination.current <= 1 ? 'rgba(0,0,0,0.11)' : '#409eff'"
                  >
                    <ArrowLeftBold />
                  </el-icon>
                </el-button>
              </div>
              <div class="panel-info-content--item-personnal">
                <div
                  v-for="(item, index) in currentUserList"
                  :key="item.userId"
                  style="cursor: pointer;"
                  :class="{'item--active' : item.userId === currentUserId}"
                  @click="showInspector(item)"
                >
                  <img
                    style="width: 36px;height: 36px;border-radius: 50%;"
                    :src="item.headUrl || 'https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/TX_19912345678.png'"
                  >
                  <el-icon v-show="item.userId === currentUserId">
                    <Check />
                  </el-icon>
                  <el-tooltip
                    class="personnal-user-name"
                    effect="light"
                    :content="item.userName"
                    placement="right"
                    :disabled="isShowTooltip"
                  >
                    <p @mouseenter="onMouseOver(userNameRef, index)">
                      <span ref="userNameRef">{{ item.userName }}</span>
                    </p>
                  </el-tooltip>
                </div>
              </div>
              <div class="panel-info-content--item__btn">
                <el-button
                  class="panel-info-content--item__btn--right"
                  link
                  :disabled="userPagination.current >= userPagination.pages"
                  @click="handlePageChange('next','user',shiftUserList,userPagination)"
                >
                  <el-icon
                    size="24px"
                    :color="userPagination.current >= userPagination.pages ? 'rgba(0,0,0,0.11)' : '#409eff'"
                  >
                    <ArrowRightBold />
                  </el-icon>
                </el-button>
              </div>
            </div>
            <div
              v-if="shiftUserList.length === 0 && !currentPointOrObjectUserData.bindingStatus"
              style="text-align: center; padding: 20px 0; color: rgba(0,0,0,0.45);"
            >
              暂无数据
            </div>
          </div>
        </div>
        <div
          v-if="cardType === 'Vehicle_operation'"
          class="point-dialog__operator item--container"
          :class="{'point-dialog__operator--dashed' : !currentPointOrObjectUserData.bindingStatus}"
        >
          <span class="point-dialog__title">
            作业车辆{{ currentPointOrObjectUserData.bindingStatus ? '：' : '' }}
          </span>
          <span v-if="currentPointOrObjectUserData.bindingStatus && !editStatus">{{ currentPointBindingData?.carNumber }}</span>
          <div>
            <div
              v-if="shiftCarList.length > 0 && !currentPointOrObjectUserData.bindingStatus || editStatus"
              class="panel-info-content--item"
            >
              <div class="panel-info-content--item__btn">
                <el-button
                  class="panel-info-content--item__btn--left"
                  link
                  :disabled="carPagination.current <= 1"
                  @click="handlePageChange('prev','car',shiftCarList,carPagination)"
                >
                  <el-icon
                    size="24px"
                    :color="carPagination.current <= 1 ? 'rgba(0,0,0,0.11)' : '#409eff'"
                  >
                    <ArrowLeftBold />
                  </el-icon>
                </el-button>
              </div>
              <div
                class="panel-info-content--item-personnal"
              >
                <div
                  v-for="(item, index) in currentCarList"
                  :key="item.carId"
                  style="cursor: pointer;width: 65px;"
                  :class="{'item--active' : item.carId === currentCarId}"
                  @click="currentCarId = item.carId"
                >
                  <!-- <img
                  style="width: 36px;height: 36px;border-radius: 50%;"
                  :src="item.headUrl || 'https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/TX_19912345678.png'"
                > -->
                  <el-icon v-show="item.carId === currentCarId">
                    <Check />
                  </el-icon>
                  <el-tooltip
                    class="personnal-user-name"
                    effect="light"
                    :content="item.carNumber"
                    placement="right"
                    :disabled="isShowTooltip"
                  >
                    <p @mouseenter="onMouseOver(carNameRef, index)">
                      <span ref="carNameRef">{{ item.carNumber }}</span>
                    </p>
                  </el-tooltip>
                </div>
              </div>
              <div class="panel-info-content--item__btn">
                <el-button
                  class="panel-info-content--item__btn--right"
                  link
                  :disabled="carPagination.current >= carPagination.pages"
                  @click="handlePageChange('next','car',shiftCarList,carPagination)"
                >
                  <el-icon
                    size="24px"
                    :color="carPagination.current >= carPagination.pages ? 'rgba(0,0,0,0.11)' : '#409eff'"
                  >
                    <ArrowRightBold />
                  </el-icon>
                </el-button>
              </div>
            </div>
            <div
              v-if="shiftCarList.length === 0 && !currentPointOrObjectUserData.bindingStatus"
              style="text-align: center; padding: 20px 0; color: rgba(0,0,0,0.45);"
            >
              暂无数据
            </div>
          </div>
        </div>
        <div>
          <div class="item--container">
            <div class="point-dialog__inspector">
              <span class="point-dialog__title">督查员：</span>
              <template v-if="currentPointOrObjectUserData.bindingStatus">
                <el-select 
                  v-model="currentPointBindingData.qualityInspectorUserId"
                  placeholder="请选择"
                  style="width: 150px;"
                  filterable
                  :disabled="!editStatus"
                >
                  <el-option
                    v-for="item in inspectorList"
                    :key="item.inspectorUserId"
                    :label="item.inspectorUserName"
                    :value="item.inspectorUserId"
                  />
                </el-select>
              </template>
              <template v-else>
                <el-select
                  v-model="currentPointOrObjectUserData.qualityInspectorUserId"
                  placeholder="请选择"
                  style="width: 150px;"
                  filterable
                  :class="{ 'empty-value': !currentPointOrObjectUserData.qualityInspectorUserId }"
                >
                  <el-option
                    v-for="item in inspectorList"
                    :key="item.inspectorUserId"
                    :label="item.inspectorUserName"
                    :value="item.inspectorUserId"
                  />
                </el-select>
              </template>
            </div>
            <div class="point-dialog__responsible">
              <span class="point-dialog__title">责任人：</span>
              <span
                v-if="shiftUserList.length === 0 && !currentPointOrObjectUserData.bindingStatus"
                style="color: rgba(0,0,0,0.45);"
              >
                暂无数据
              </span>
              <span>{{ currentPointOrObjectUserData.bindingStatus ? currentPointBindingData.chargeUserName : currentPointOrObjectUserData.responsible }}</span>
            </div>
          </div>
          <div class="point-dialog__time item--container">
            <span
              class="point-dialog__title"
            >
              督查时间：
            </span>
            <div
              v-if="shiftUserList.length === 0 && !currentPointOrObjectUserData.bindingStatus"
              style="color: rgba(0,0,0,0.45);"
            >
              暂无数据
            </div>
            <div>
              <time-picker-list
                v-if="currentPointOrObjectUserData.bindingStatus"
                :data="currentPointBindingData.qualityInspectorTime"
                :edit-status="editStatus"
                @delete="handlerDelete"
                @add="handlerAdd"
              />
              <time-picker-list
                v-else
                :data="currentPointOrObjectUserData.qualityInspectorTime"
                @delete="handlerDelete"
                @add="handlerAdd"
              />
            </div>
          </div>
        </div>
        <template #footer>
          <div>
            <el-button
              v-if="currentPointOrObjectUserData.bindingStatus"
              type="danger"
              :loading="pointUnbindLoading"
              @click="handlerUnbind"
            >
              解绑
            </el-button>
            <el-button
              type="primary"
              :loading="pointDialogLoading"
              :disabled="shiftUserList.length === 0 || (cardType === 'Vehicle_operation' && shiftCarList.length === 0)"
              @click="currentPointOrObjectUserData.bindingStatus ? (editStatus ? handlePointEdit() : editStatus = true) : handlePointSave()"
            >
              {{ currentPointOrObjectUserData.bindingStatus ? (editStatus ? '保存' : '编辑') : '保存' }}
            </el-button>
          </div>
        </template>
      </el-pro-dialog>	
    </div>
  </div>
</template>

<script lang="ts">
import { mesPlanAddJobPlan, mesPlanQueryPlanBindingInfo, mesPlanQueryPlanInspectorUserList, mesPlanQueryPlanViewMapGridList, mesPlanQueryPlanViewMapObjectList, mesPlanUnbind, mesPlanUpdatePlanInspectorBindingInfo } from "@/api/mes/planController";
import { mesPointQueryPlanGridPointList } from "@/api/mes/pointController";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { ElMessage } from "element-plus";
import { Ref, defineComponent, onMounted, reactive, ref, shallowRef, watch } from "vue";
import GridPanel from "./components/grid-panel.vue";
import MainPanel from "./components/main-panel.vue";
import TimePickerList from "./components/time-picker-list.vue";

interface CurrentPointOrObjectData {
  userId?: number;
  bindId?: number;
  bindingStatus?: number; // 0: save, 1: edit
  bindName?: string;
  responsible?: string;
  inspectorPointList?: any;
  jobStartTime?: string;
  jobDuration?: string;
  checkingInspectorUserId?: number;
  checkingInspectorTime?: any;
  qualityInspectorUserId?: number;
  qualityInspectorUserName?: string;
  qualityInspectorTime?: any;
}

interface CurrentPointBindingData {
  chargeUserName?: string;
  planPointId?: number;
  bindId?: number;
  bindName?: string;
  qualityInspectorTime?: any;
  qualityInspectorUserId?: number;
  qualityInspectorUserName?: string;
  userId?: number;
  userName?: string;
	bindType?: string;
	planId?: number;
	carNumber?:string;
	planCarId?: number;
}

export default defineComponent({
  name:"SchedulingPlan",
  components: {
    MainPanel,
    GridPanel,
    TimePickerList,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId  as number;

    const map = shallowRef<AMap.Map>();
    const mapRef: Ref<HTMLDivElement | string> = ref("");
    const gridPanelRef = ref();
    const qualityRef = ref();
    const userNameRef = ref();
    const carNameRef = ref();
    const isMainPanel = ref(true);
    const activeTab = ref(1);
    const cardType = ref("");
    const inspectorList = ref<MES.PlanInspectorUserDTO[]>([]);
    const currentData = reactive<{ gridId?: number, teamId?: number}>({});
    const currentShift = ref({shiftId: 0,jobDuration: 0,jobStartTime: "",});
    const gridList = ref<MES.PlanViewMapGridDTO[]>([]);
    const objectList = ref<MES.PlanViewMapObjectDTO[]>([]);
    const pointList = ref<MES.PlanGridPointDTO[]>([]);
    const pointDialogVisible = ref<boolean>(false);
    const remoteUserLoading = ref<boolean>(false);
    const isShowTooltip = ref<boolean>(false);
    const shiftUserList = ref<any[]>([]);
    const shiftCarList = ref<any[]>([]);
    const pointDialogLoading = ref<boolean>(false);
    const pointUnbindLoading = ref<boolean>(false);
    const userPagination = reactive({ pageSize: 6, current: 1, pages: 0, total: 0, });
    const carPagination = reactive({ pageSize: 4, current: 1, pages: 0, total: 0, });
    const currentUserList = ref<MES.PlanUserDTO[]>([]);
    const currentCarList = ref<MES.PlanCarDTO[]>([]);
    const currentUserId = ref<number | undefined>();
    const currentCarId = ref<number | undefined>();
    const editStatus = ref<boolean>(false);
    const currentPoint = ref<number[]>([]);
    const currentObject = ref<number[]>([]);
    const currentPointOrObjectUserData = reactive<CurrentPointOrObjectData>({});
    const currentPointBindingData = reactive<CurrentPointBindingData>({});

    let gridPolygons:AMap.Polygon[];
    let gridPoint:AMap.Marker[] = [];
    let userMarkers:AMap.Marker[] = [];
    let objectOverlayGroup: AMap.OverlayGroup;
    // @ts-ignore
    let cluster: AMap.MarkerCluster;
    let gridNameMarkers: { lnglat: number[], weight: number, extData: object, polygon: AMap.Polygon }[];
		
    onMounted(async () => {
      await lazyAMapApiLoaderInstance;
      map.value = new AMap.Map(mapRef.value, {});
      objectOverlayGroup = new AMap.OverlayGroup();
      fetchGridAll("Manual_cleaning");

      map.value.on("zoomchange", () => {
        const zoom = map.value?.getZoom();
        if (zoom && zoom < 14.8) {
          gridPoint.forEach((item) => item.hide());
          objectOverlayGroup.hide();
          userMarkers.forEach((item) => item.hide());
        } else {
          gridPoint.forEach((item) => item.show());
          objectOverlayGroup.show();
          userMarkers.forEach((item) => item.show());
        }
      });
    });
		
    const fetchGridAll = async (type:string) => {
      cardType.value = type;
      try {
        let { data, } = await mesPlanQueryPlanViewMapGridList({projectId,});
        gridList.value = data;
        drawGrid(gridList.value,type);
      } catch (error) {
        console.error(error);
      }
    };

    const drawGrid = (data:MES.PlanViewMapGridDTO[],type:string) => {
      gridPolygons && map.value?.remove(gridPolygons);
      const filteredData = data?.filter((item) => item.type === type);
      gridPolygons = filteredData?.map((item) => {
        const polygon: AMap.Polygon = new AMap.Polygon({
          path: <any>item.gridPointList,
          fillColor: item.gridColor,
          fillOpacity: 0.2,
          extData: item,
          bubble: true,
          cursor: "pointer",
        });
        polygon.on("click",(e) => {
          if (<number>map.value?.getZoom() >= 16.4) return;
          handlerGridMap(e);
        })
        return polygon;
      });
      map.value?.add(gridPolygons);
      map.value?.setFitView(gridPolygons);
      gridPolygons.length !== 0 ? drawMarkerCluster() : cluster.setMap(null);
    };

    const drawMarkerCluster = () => {
      cluster && cluster.setMap(null);

      gridNameMarkers = gridPolygons.map((item) => {				
        let center = <any>item.getBounds()?.getCenter();
        return {
          lnglat: [center.lng, center.lat],
          weight: 1,
          extData: item.getExtData(),
          polygon: item,
        };
      });
      if (!gridNameMarkers) return;
      // @ts-ignore
      cluster = new AMap.MarkerCluster(map.value, gridNameMarkers, {
        maxZoom: 13.68,
        renderMarker: ({ data, marker, }: { data: any, marker: AMap.Marker }) => {
          let content = `<div class="cluster-marker" style="color: ${data[0].extData.gridColor};border-color: ${data[0].extData.gridColor};width: ${12 * data[0].extData.gridName.length}px;">
							${data[0].extData.gridName}
						</div>`;
          marker.setOffset(new AMap.Pixel(-45, -20));
          marker.setzIndex(10);
          if (<number>map.value?.getZoom() > 16.4) {
            marker.setContent(" ");
          } else {
            marker.setContent(content);
          }

          marker.on("click", () => {
            map.value?.setFitView([marker]);
          });
        },
      });
      cluster.on("click", ({ clusterData, marker, }: { clusterData: any, marker: any }) => {
        if (clusterData.length > 1) {
          let southWest = [0, 0];
          let northEast = [0, 0];
          clusterData.forEach(({ lnglat, }: { lnglat: { lng: number, lat: number } }, index: number) => {
            let { lng, lat, } = lnglat;
            if (index === 0) {
              northEast[1] = lat;
              southWest[1] = lat;
              southWest[0] = lng;
              northEast[0] = lng;
            } else {
              if (lat > northEast[1]) {
                northEast[1] = lat;
              } else if (lat < southWest[1]) {
                southWest[1] = lat;
              }
              if (lng > northEast[0]) {
                northEast[0] = lng;
              } else if (lng < southWest[0]) {
                southWest[0] = lng;
              }
            }
          });
          let bounds = new AMap.Bounds(southWest, northEast);
          let res = <any[]>map.value?.getFitZoomAndCenterByBounds(bounds);

          map.value?.setZoomAndCenter(res[0] - 1, res[1]);
        } else {
          let zoom = <number>map.value?.getZoom(); 
          if (zoom < 14) {
            map.value?.setZoomAndCenter(14, marker.getPosition());
          }
        }
      });
    };

    const handlerGridMap = (e:MES.PlanViewMapGridDTO | any) => {
      if (e.target) {
        currentData.gridId = e.target.getExtData().gridId;
        currentData.teamId = e.target.getExtData().teamId;
      } else {
        currentData.gridId = e.gridId;
      	currentData.teamId = e.teamId;
      }

      isMainPanel.value = false;

      gridPanelRef.value?.getGridInfo();

      let polygon = gridPolygons.find((item) => item.getExtData().gridId === currentData.gridId);
			
      polygon?.setOptions({ zIndex: 10, });
      map.value?.setFitView([<AMap.Polygon>polygon]);

    };

    const fetchPointList = async () => {
      if (cardType.value === "Vehicle_operation") return;
      const params = {
        projectId: projectId,
        shiftId: currentShift.value.shiftId,
        gridId: currentData.gridId as number,
      };
      try {
        let res = await mesPointQueryPlanGridPointList(params);
        pointList.value = res.data;
        drawGridPoint();
      } catch (error) {
        console.error(error);
				
      }
    };

    const drawGridPoint = () => {
      if (cardType.value === "Vehicle_operation") return;
      map.value?.remove(gridPoint);
      gridPoint = pointList.value.filter(({longitude,latitude,}) => longitude && latitude).map((item) => {
        let marker = new AMap.Marker({
          position: [parseFloat(item.longitude),parseFloat(item.latitude)],
          extData: item,
          title: item.pointName,
          icon: new AMap.Icon({
            image: currentPoint.value.includes(item.pointId) ? "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/point-user-active.png" : item.bindingStatus ? "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/point-bound.png" : "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/point-unbound.png",
            size: new AMap.Size(20, 30),
            imageSize: new AMap.Size(20, 30),
          }),
        });
        marker.on("click",(e:any) => {
          handlePointOrObjectMap(e,e.target.getExtData().pointId, e.target.getExtData().pointName,"point");
        });
        return marker;
      })
      map.value?.add(gridPoint);
    };

    const remoteObjectList = async () => {
      const params = {
        projectId: projectId,
        shiftId: currentShift.value.shiftId,
        gridId: currentData.gridId as number,
        type: cardType.value,
      };
      try {
        let res = await mesPlanQueryPlanViewMapObjectList(params);
        objectList.value = res.data;
        drawGridObject();
        drawObjectUser();
      } catch (error) {
        console.error(error);
				
      }
    };

    const drawGridObject = () => {
      objectOverlayGroup.clearOverlays();
      objectList.value?.forEach((item) => {
        switch (item.geometryType) {
        case 1:
          const point: AMap.Marker = new AMap.Marker({
            position: <any>item.routePointList[0],
            icon: new AMap.Icon({
              image:currentObject.value.includes(item.objectId) ? "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/object-point-active.png" : "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/object-point.png",
              size: new AMap.Size(20, 30),
              imageSize: new AMap.Size(20, 30),
            }),
            extData: item,
            bubble: true,
            cursor: "pointer",
          });
          point.on("click",(e:any) => {
            handlePointOrObjectMap(e,e.target.getExtData().objectId, e.target.getExtData().objectName,"object");
          });
          objectOverlayGroup.addOverlay(point);
          break;
        case 2:
          const line: AMap.Polyline = new AMap.Polyline({
            path: <any>item.routePointList,
            strokeColor: currentObject.value.includes(item.objectId) ? "#B22222" : item.color,
            strokeWeight:item.strokeWidth,
            strokeOpacity: 1,
            extData: item,
            bubble: true,
            cursor: "pointer",
          });
          line.on("click",(e:any) => {
            getPointBindingInfo(e.target.getExtData().objectId, "object");

            handlePointOrObjectMap(e,e.target.getExtData().objectId, e.target.getExtData().objectName,"object");
          });
          objectOverlayGroup.addOverlay(line);
          break;
        case 3:
          const plane: AMap.Polygon = new AMap.Polygon({
            path: <any>item.routePointList,
            strokeColor: currentObject.value.includes(item.objectId) ? "#B22222" : item.color,
            fillColor: currentObject.value.includes(item.objectId) ? "#B22222" : item.color,
            strokeWeight:item.strokeWidth,
            fillOpacity: 1,
            extData: item,
            bubble: true,
            cursor: "pointer",
          });
          plane.on("click",(e:any) => {
            getPointBindingInfo(e.target.getExtData().objectId, "object");

            handlePointOrObjectMap(e,e.target.getExtData().objectId, e.target.getExtData().objectName,"object");
          });
          objectOverlayGroup.addOverlay(plane);
          break;
        default:
          break;
        }
      });

      map.value?.remove(<any>objectOverlayGroup);
      map.value?.add(<any>objectOverlayGroup);
      map.value?.on("zoomend", () => (<number>map.value?.getZoom() <= 14.8 ? objectOverlayGroup.hide() : objectOverlayGroup.show()));
      
    };

    const drawObjectUser = () => {
      userMarkers && map.value?.remove(userMarkers);
      let objectUser: any[] = shiftUserList.value;
			
      objectUser.forEach(item => {
        item.userPointList.forEach((user:any) => {
          user.inspectorPointList.filter((point:any) => {
            if(point.bindType === "object") { 
              objectOverlayGroup.getOverlays().forEach((object:any) => {
								
                if (object.getExtData().objectId === point.bindId) {
                  // 将人员随机分布在巡检对象上
                  let randomPoint = object.getExtData().routePointList[Math.floor(Math.random() * object.getExtData().routePointList.length)];
                  let marker: AMap.Marker = new AMap.Marker({
                    position: randomPoint,
                    title: item.userName,
                    icon: new AMap.Icon({
                      image: item.headUrl,
                      size: new AMap.Size(20, 20),
                      imageSize: new AMap.Size(20, 20),
                    }),
                    zIndex: 100,
                    // 偏移
                    offset: new AMap.Pixel(0, 0),
                    extData: object.getExtData(),
                    bubble: true,
                    cursor: "pointer",
                  });
                  marker.on("click", (e:any) => {
                    handlePointOrObjectMap(e,e.target.getExtData().objectId, e.target.getExtData().objectName,"object");

                    // 所在的对象设置为红色
                    objectOverlayGroup.getOverlays().forEach((object:any) => {
                      if (object.getExtData().objectId === point.bindId) {
                        if (object.className === "AMap.Marker") {
                          object.setIcon(new AMap.Icon({
                            image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/object-point-active.png",
                            size: new AMap.Size(20, 30),
                            imageSize: new AMap.Size(20, 30),
                          }));
                        } else {
                          object.setOptions({
                            strokeColor: "#B22222",
                            fillColor: "#B22222",
                          });
                        }
                      } else if (object.className === "AMap.Marker") {
                        object.setIcon(new AMap.Icon({
                          image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/object-point.png",
                          size: new AMap.Size(20, 30),
                          imageSize: new AMap.Size(20, 30),
                        }));
                      } else {
                        object.setOptions({
                          strokeColor: object.getExtData().color,
                          fillColor: object.getExtData().color,
                        });
                      }
                    });
                  });
                  userMarkers.push(marker);
                  map.value?.add(marker);
                }
              });
            }
          });
        });
      });
    };

    const handlePointOrObjectMap =  (e:any,bindId:number,bindName:string,bindType:string) => {
      // 所在的对象设置为红色
      objectOverlayGroup.getOverlays().forEach((object:any) => {
        if (object.getExtData().objectId === bindId) {
          if (object.className === "AMap.Marker") {
            object.setIcon(new AMap.Icon({
              image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/object-point-active.png",
              size: new AMap.Size(20, 30),
              imageSize: new AMap.Size(20, 30),
            }));
          } else {
            object.setOptions({
              strokeColor: "#B22222",
              fillColor: "#B22222",
            });
          }
        } else if (object.className === "AMap.Marker") {
          object.setIcon(new AMap.Icon({
            image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/object-point.png",
            size: new AMap.Size(20, 30),
            imageSize: new AMap.Size(20, 30),
          }));
        } else {
          object.setOptions({
            strokeColor: object.getExtData().color,
            fillColor: object.getExtData().color,
          });
        }
      });

      e.target.getExtData().bindingStatus ? getPointBindingInfo(bindId, bindType) : currentPointBindingData.bindType = bindType;
			
      currentPointOrObjectUserData.bindName = bindName;
      currentPointOrObjectUserData.bindId = bindId;
      currentPointOrObjectUserData.bindingStatus = e.target.getExtData().bindingStatus;
			
      pointDialogVisible.value = true;

      userPagination.total = shiftUserList.value.length;
      userPagination.pages = Math.ceil(shiftUserList.value.length / userPagination.pageSize);
      userPagination.current = 1
      currentUserList.value = shiftUserList.value.slice((userPagination.current - 1) * userPagination.pageSize, userPagination.current * userPagination.pageSize);
      
      carPagination.total = shiftCarList.value.length;
      carPagination.pages = Math.ceil(shiftCarList.value.length / carPagination.pageSize);
      carPagination.current = 1;
      currentCarList.value = shiftCarList.value.slice((carPagination.current - 1) * carPagination.pageSize, carPagination.current * carPagination.pageSize);

      showInspector(currentUserList.value[0]);
      editStatus.value = false;
    };



    const remoteUser = async () => {
      try {
        const {data,} = await mesPlanQueryPlanInspectorUserList({projectId,});
        inspectorList.value = data;
      } catch(e) {
        console.error(e);
      }
    };

    const handlerAdd = () => {
      const arr = currentPointOrObjectUserData.bindingStatus ? currentPointBindingData.qualityInspectorTime : currentPointOrObjectUserData.qualityInspectorTime;
      arr.push({ruleValue: "",});
    };

    const handlerDelete = (index:number) => {
      const arr = currentPointOrObjectUserData.bindingStatus ? currentPointBindingData.qualityInspectorTime : currentPointOrObjectUserData.qualityInspectorTime;
      arr.splice(index,1);
    };

    const handlePageChange = (operation:"prev" | "next",type:"car" | "user",list:any,pagination:any) => {
      let currentList = type === "car" ? currentCarList : currentUserList;
      pagination.current += operation === "prev" ? -1 : 1;
      currentList.value = list.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize);
    };

    const onMouseOver = (ref: any, index: number) => {
      let parentWidth = ref[index].parentNode.offsetWidth;
      let contentWidth = ref[index].offsetWidth;
      isShowTooltip.value = contentWidth <= parentWidth;
    };

    const getPointBindingInfo = async (bindId:number,bindType:string) => {
      currentPointBindingData.bindType = bindType;
			
      try {
        const {data,} = await mesPlanQueryPlanBindingInfo({
          projectId: projectId as number,
          shiftId: currentShift.value.shiftId,
          bindId,
          bindType,
        });
				
        currentPointBindingData.chargeUserName = data.chargeUserName;
        currentPointBindingData.planPointId = data.planPointId;
        currentPointBindingData.planCarId = data.planCarId;
        currentPointBindingData.bindId = data.bindId;
        currentPointBindingData.bindName = data.bindName;
        currentPointBindingData.planId = data.planId;
        currentPointBindingData.qualityInspectorTime = data.qualityInspectorTime.split(",").map((item:string) => {
          return {
            ruleValue: item.split(":").slice(0,2).join(":"),
          }
        });

        currentPointBindingData.qualityInspectorUserId = data.qualityInspectorUserId;
        currentPointBindingData.qualityInspectorUserName = data.qualityInspectorUserName;
        currentPointBindingData.userId = data.userId;
        currentPointBindingData.userName = data.userName;
        currentPointBindingData.carNumber = data.carNumber;

        currentCarId.value = data.carId;
        currentUserId.value = data.userId;

      } catch (error) {
        console.error(error);
      }
    };

    const showInspector = (data:any) => {
      if (!data) {
        currentUserId.value = undefined;
        currentPointOrObjectUserData.userId = undefined;
        currentPointOrObjectUserData.checkingInspectorUserId = undefined;
        currentPointOrObjectUserData.checkingInspectorTime = undefined;
        currentPointOrObjectUserData.responsible = undefined;
        currentPointOrObjectUserData.inspectorPointList = [];

        currentPointOrObjectUserData.qualityInspectorTime = undefined;
        currentPointOrObjectUserData.qualityInspectorUserName = undefined;
        currentPointOrObjectUserData.qualityInspectorUserId = undefined;
      } else {
        const {userId, userPointList,} = data;
			
        currentUserId.value = userId;
        currentPointOrObjectUserData.userId = userId;

        const {checkingInspectorUserId, checkingInspectorTime,checkingInspectorUserName,inspectorPointList,} = userPointList[0] || {};
        currentPointOrObjectUserData.checkingInspectorUserId = checkingInspectorUserId;
        currentPointOrObjectUserData.checkingInspectorTime = checkingInspectorTime;
        currentPointOrObjectUserData.responsible = checkingInspectorUserName;
        currentPointOrObjectUserData.inspectorPointList = [...inspectorPointList];

        const {qualityInspectorTime, qualityInspectorUserName, qualityInspectorUserId,} = inspectorPointList?.[0] || {};
        currentPointOrObjectUserData.qualityInspectorTime = qualityInspectorTime?.split(",").map((item:any) => ({ruleValue: item.split(":").slice(0,2).join(":"),}));
        currentPointOrObjectUserData.qualityInspectorUserName = qualityInspectorUserName;
        currentPointOrObjectUserData.qualityInspectorUserId = qualityInspectorUserId;
      }
      
    };

    const handlePointSave =  async () => {
      if(!currentPointOrObjectUserData.qualityInspectorUserId) return;
      const {gridId,} = currentData;
      const {jobDuration, jobStartTime, shiftId,} = currentShift.value;
      const {bindId, qualityInspectorTime, qualityInspectorUserId,checkingInspectorTime,checkingInspectorUserId,userId,} = currentPointOrObjectUserData;
      if (qualityInspectorTime.some((item:any) => !item.ruleValue)) {
        ElMessage.warning("请选择时间");
        return;
      }
      const params = {
        carId: currentCarId.value,
        checkingInspectorTime,
        checkingInspectorUserId,
        gridId,
        jobDuration,
        jobStartTime: `${jobStartTime}:00`,
        bindId,
        bindType: currentPointBindingData.bindType,
        projectId,
        qualityInspectorTime: qualityInspectorTime.map((item:any) => `${item.ruleValue}:00`).join(","),
        qualityInspectorUserId,
        shiftId: shiftId,
        teamId: currentData.teamId,
        userId,
        type:cardType.value,
      };
      pointDialogLoading.value = true;
      try {
        await mesPlanAddJobPlan(params);
        await gridPanelRef.value.getShiftUserData();
        await fetchPointList();
        await remoteObjectList();
        ElMessage.success("保存成功");
        pointDialogVisible.value = false;
      } catch (error) {
        console.error(error);
      }finally{
        pointDialogLoading.value = false;
      }
    };

    const handlePointEdit = async () => {
      if(!currentPointBindingData.qualityInspectorUserId) return;
      const {planPointId, qualityInspectorTime, qualityInspectorUserId,} = currentPointBindingData;
      if (qualityInspectorTime.some((item:any) => !item.ruleValue)) {
        ElMessage.warning("请选择时间");
        return;
      }
      const params = {
        planPointId,
        qualityInspectorTime: qualityInspectorTime.map((item:any) => `${item.ruleValue}:00`).join(","),
        qualityInspectorUserId,
        userId: currentUserId.value,
        planId: currentPointBindingData.planId,
        carId: currentCarId.value,
        bindType:currentPointBindingData.bindType,
        planCarId:currentPointBindingData.planCarId,
      };
			
      pointDialogLoading.value = true;
      try {
        await mesPlanUpdatePlanInspectorBindingInfo(params);
        await gridPanelRef.value.getShiftUserData();
        await fetchPointList();
        await remoteObjectList();
        ElMessage.success("编辑成功");
        pointDialogVisible.value = false;
      } catch (error) {
        console.error(error);
      }finally{
        pointDialogLoading.value = false;
        editStatus.value = false;
      }
    };

    const handlerUnbind = async () => {
      const params = {
        planId:currentPointBindingData.planId,
        bindId:currentPointBindingData.bindId,
        bindType:currentPointBindingData.bindType,
      };
      pointUnbindLoading.value = true;
      try {
        await mesPlanUnbind(params);
        await gridPanelRef.value.getShiftUserData();
        await fetchPointList();
        await remoteObjectList();
        ElMessage.success("解绑成功");
        pointDialogVisible.value = false;
      } catch(error) {
        console.error(error);
      } finally {
        pointUnbindLoading.value = false;
      }
    };

    const closeDialog = () => {
      pointDialogVisible.value = false;
      currentUserId.value = undefined;
      currentCarId.value = undefined;
      remoteObjectList();
    };

    const changeCurrentShift = (data:any) => {
      currentShift.value = data;
      fetchPointList();
      remoteObjectList();
    };

    const getCurrentPoint = (data:any) => {
      currentPoint.value = data;
    };

    const getCurrentObject = (data:any) => {
      currentObject.value = data;
    };

    const getShiftUserList = (data:any) => {
      shiftUserList.value = data;
    };

    const getShiftCarList = (data:any) => {
      shiftCarList.value = data;
    };

    const handlerPanelBack = () => {
      isMainPanel.value = true;
      activeTab.value = cardType.value === "Manual_cleaning" ? 1 : 2;
      objectOverlayGroup.clearOverlays();
      map.value?.remove([...userMarkers,...gridPoint]);
      fetchGridAll(cardType.value);
    };

    watch(() => currentPoint.value,drawGridPoint);
    watch(() => currentObject.value,drawGridObject);
		

    remoteUser();

    return {
      mapRef,
      userNameRef,
      carNameRef,
      gridPanelRef,
      qualityRef,
      activeTab,
      cardType,
      shiftUserList,
      shiftCarList,
      currentData,
      isMainPanel,
      pointDialogVisible,
      pointDialogLoading,
      pointUnbindLoading,
      userPagination,
      carPagination,
      currentUserList,
      currentCarList,
      currentUserId,
      currentCarId,
      isShowTooltip,
      inspectorList,
      remoteUserLoading,
      currentPointOrObjectUserData,
      currentPointBindingData,
      currentShift,
      editStatus,
      currentPoint,
      fetchGridAll,
      handlerGridMap,
      handlePointSave,
      onMouseOver,
      showInspector,
      handlePageChange,
      handlerAdd,
      handlerDelete,
      handlePointEdit,
      handlerUnbind,
      closeDialog,
      changeCurrentShift,
      getCurrentPoint,
      getShiftUserList,
      getShiftCarList,
      handlerPanelBack,
      getCurrentObject,
    }
  },
})
</script>
<style lang="less">
.scheduling-plan {
	height: calc(100vh - 160px);

	&__map {
		height: 100%;
		position: relative;
	}

	&__card {
		width: 388px;
		min-height: 150px;
		max-height: calc(100vh - 180px);
		background-color: #fff;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 16px;
  	left: 16px;
		box-shadow: 0 1px 4px 2px rgb(0 0 0 / 11%);
		z-index: 9;
	}

	.cluster-marker {
		max-width:72px;
		font-size: 12px;
		background-color: #fff; 
		border-radius: 5px; 
		font-weight: 500; 
		padding: 5px;
		box-shadow: 0px 1px 4px 2px rgba(0,0,0,0.11);
		border: 1px solid;
	}

	.amap-icon {
		border-radius: 50%;
	}
	
	.el-pagination {
		justify-content: flex-end;
	}

	.item--active {
		background-color: #f5f7fa;
	}

	.point-dialog {
		width: 440px;

		.item--container {
			padding: 10px;
		}

		&__title {
			display: inline-block;
			width: 70px;
		}

		&__point {
			font-weight: bolder;
		}

		&__operator--dashed {
			border-top: 1px dashed #F1F2F3;
			border-bottom: 1px dashed #F1F2F3;
		}

		&__inspector {
			margin-bottom: 10px;
		}

		&__time {
			display: flex;
		}

		.empty-value .el-input{
			--el-input-border-color:red;
		}
	}
}
</style>
