<template>
  <div class="point-config page-root">
    <div
      ref="mapRef"
      class="point-config-map"
    >
      <div class="point-config-card">
        <div class="point-config-card-header">
          <el-icon
            v-if="cardType === 'point'"
            :size="20"
            @click="cardType = 'grid'"
          >
            <ArrowLeftBold />
          </el-icon>
          <h5 class="config-card-header-title">
            {{ cardType === 'grid'?"网格列表":"点位列表" }}
          </h5>
        </div>
        <div class="point-config-card-body">
          <el-pro-table
            v-if="cardType === 'grid'"
            ref="gridTableRef"
            :request="remoteGridList"
            :columns="gridColumns"
            :with-tools="[]"
            row-key="gridId"
            :show-index="true"
            :hidden-label="true"
            default-size="small"
            @row-click="handlerGridTable"
          />
          <el-pro-table
            v-else
            ref="pointTableRef"
            :request="remotePointList"
            :columns="pointColumns"
            default-size="small"
            :with-tools="[]"
            row-key="pointId"
            :show-index="true"
            :hidden-label="true"
            @row-click="handlerPointMap"
          />
        </div>
      </div>
    </div>
    <app-drawer
      v-model="dialogVisible"
      :form-rules="rules"
      :form-model="pointModel"
      :title="pointMethod === 'update' ? '编辑点位信息' : '新增点位信息'"
      :cancel-text="cancelText"
      :ok-text="okText"
      @submit="handlerPointRemote"
      @cancel="handlerCancel"
      @closed="resetFields"
    >
      <template #form>
        <el-form-item
          label="所属网格"
          prop="gridId"
        >
          <el-select
            v-model="pointModel.gridId"
            :disabled="pointMethod === 'update'"
            @change="handlerGridTable(pointModel)"
          >
            <el-option
              v-for="item in gridList"
              :key="item.gridId"
              :label="item.gridName"
              :value="item.gridId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="点位名称"
          prop="pointName"
        >
          <el-input
            v-model="pointModel.pointName"
          />
        </el-form-item>
        <el-form-item
          label="经度"
          prop="longitude"
        >
          <el-input
            v-model="pointModel.longitude"
            readonly
          />
        </el-form-item>
        <el-form-item
          label="纬度"
          prop="latitude"
        >
          <el-input
            v-model="pointModel.latitude"
            readonly
          />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            v-model="pointModel.fullAddress"
            readonly
          />
        </el-form-item>
        <el-form-item
          label="点位类型"
          prop="pointType"
        >
          <el-select
            v-model="pointModel.pointType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in pointTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="督查类型"
          prop="pointType"
        >
          <el-select
            v-model="pointModel.inspectionType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in inspectionTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </template>
    </app-drawer>
  </div>
</template>
<script lang="ts">
import { mesPlanQueryPlanViewGridPageList, mesPlanQueryPlanViewMapGridList } from "@/api/mes/planController";
import { mesPointAddPoint, mesPointDeletePoint, mesPointPointInfo, mesPointPointPageList, mesPointUpdatePoint } from "@/api/mes/pointController";
import { AppDrawer } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { ElMessage, ElMessageBox, FormRules, ProTableColumn } from "element-plus";
import { computed, defineComponent, nextTick, onMounted, reactive, ref, shallowRef, watch } from "vue";

export default defineComponent({
  name: "PointConfig",
  components: {
    AppDrawer,
  },
  setup() {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const pointTypes = dict.$state.pointType;
    const inspectionTypes = dict.$state.inspectionType;
    const projectCode = project.$state.projectCode;
    const mapRef = ref();
    const gridTableRef = ref();
    const pointTableRef = ref();
    const map = shallowRef<AMap.Map>();
    const gridList = ref<MES.PlanViewGridDTO[]>([]);
    const cardType = ref<"grid" | "point">("grid");
    const currentGridId = ref<number>(-1);
    const currentPointId = ref<number>(-1);
    const dialogVisible = ref<boolean>(false);
    const dialogLoading = ref<boolean>(false);
    const pointList = ref<MES.InspectionPointDTO[]>([]);
    const pointModel = reactive<MES.InspectionPointInParam>({});
    const pointMethod = ref<"add" | "update">("add");
    const isEdit = ref<boolean>(false);
    
    let gridPolygons:AMap.Polygon[];
    let oncePoint:AMap.Marker | undefined;
    let gridPoint:AMap.Marker[] = [];
    let geocoder:any;
    // @ts-ignore
    let cluster: AMap.MarkerCluster;
    let gridNameMarkers: { lnglat: number[], weight: number, extData: object, polygon: AMap.Polygon }[];
		
    const gridColumns:ProTableColumn[] = [
      {
        title:"网格名称",
        dataIndex:"gridName",
        valueType:"string",
        search:true,
        placeholder: "网格名称",
      },
      {
        title:"所属班组",
        dataIndex:"teamName",
        valueType:"string",
      }
    ];

    const pointColumns:ProTableColumn[] = [
      {
        title: "点位编号",
        dataIndex: "pointCode",
        valueType: "string",
      },
      {
        title: "点位名称",
        dataIndex: "pointName",
        valueType: "string",
        search:true,
        placeholder: "点位名称",
      },
      {
        title: "点位类型",
        dataIndex: "pointType",
        valueType: "enum",
        valueEnum: pointTypes,
      }
    ];

    const rules = reactive<FormRules>({
      gridId: [
        { required: true, message: "请选择所属网格", trigger: "change", }
      ],
      pointName: [
        { required: true, message: "请输入点位名称", trigger: "change", }
      ],
      longitude: [
        { required: true, message: "请在地图上选择位置", trigger: "change",}
      ],
      latitude: [
        { required: true, message: "请在地图上选择位置", trigger: "change", }
      ],
      pointType: [
        { required: true, message: "请选择点位类型", trigger: "change", }
      ],
    });

    onMounted( async () => {
      gridTableRef.value.formLayout.maxCol = 1;
      gridTableRef.value.formLayout.span = 12;
      await lazyAMapApiLoaderInstance;
      map.value = new AMap.Map(mapRef.value, {});
      map.value.on("click",handlerMapAndGrid);
      remoteGridAll();
      AMap.plugin("AMap.Geocoder", function() {
        // @ts-ignore
        geocoder = new AMap.Geocoder();
      });
    });

    watch(cardType,(val) => {
      if (val === "grid") {
        nextTick(() => {
          gridTableRef.value.formLayout.maxCol = 1;
          gridTableRef.value.formLayout.span = 12;
        });
      } else {
        nextTick(() => {
          pointTableRef.value.formLayout.maxCol = 1;
          pointTableRef.value.formLayout.span = 12;
        });
      }
    });

    const cancelText = computed(() => {
      return pointMethod.value === "add" ? "取消" : "删除";
    });

    const okText = computed(() => {
      return pointMethod.value === "add" ? "确定"  : "保存";
    });

    const remoteGridList = async (params:MES.PlanQueryPlanViewGridPageListParams) => {
      params.projectId = projectId;
      try {
        return await mesPlanQueryPlanViewGridPageList(params);
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const remoteGridAll = async () => {
      try {
        let { data, } = await mesPlanQueryPlanViewMapGridList({projectId,});
        // @ts-ignore
        gridList.value = data.reduce((prev:MES.PlanViewGridDTO[],item:MES.PlanViewGridDTO) => {
          let index = prev.findIndex((prevItem) => prevItem.gridId === item.gridId);
          if (index === -1) {
            prev.push(item);
          }
          return prev;
        },[]);
        gridPolygons = data.map((item) => {
          let polygon =  new AMap.Polygon({
            path: <any>item.gridPointList,
            fillColor: item.gridColor,
            fillOpacity: 0.2,
            extData: item,
            cursor: "pointer",
          });
          polygon.on("click",handlerMapAndGrid);
          return polygon;
        });
        map.value?.add(gridPolygons);
        map.value?.setFitView(gridPolygons);
        drawMarkerCluster();
      } catch (error) {
        console.error(error);
        return [];
      }
    };
		
    const drawMarkerCluster = () => {
      gridNameMarkers = gridPolygons.map((item) => {
        let center = <any>item.getBounds()?.getCenter();
        return {
          lnglat: [center.lng, center.lat],
          weight: 1,
          extData: item.getExtData(),
          polygon: item,
        };
      });

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

    const remotePointList = async (params:MES.PointPointPageListParams) => {
      params.projectId = projectId;
      params.gridId = currentGridId.value;
      try {
        let res = await mesPointPointPageList(params);
        pointList.value = res.data;
        drawGridPoint();
        return res;
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    const drawGridPoint = () => {
      map.value?.remove(gridPoint);
      gridPoint = pointList.value.filter(({longitude,latitude,}) => longitude && latitude).map((item) => {
        let marker = new AMap.Marker({
          title: item.pointName,
          position: [parseFloat(item.longitude),parseFloat(item.latitude)],
          extData: item,
          icon: new AMap.Icon({
            image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/point-unbound.png",
            size: new AMap.Size(20, 30),
            imageSize: new AMap.Size(20, 30),
          }),
        });
        marker.on("click",handlerPointMap);
        return marker;
      })
      map.value?.add(gridPoint);
    }

    const handlerCancel = () => {
      if (pointMethod.value === "update"){
        ElMessageBox.confirm("若点位已绑定人员，则同步删除人员的排班计划，请确认是否删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          removePoint(currentPointId.value);
        }).catch(() => {
          ElMessage.info("已取消删除");
          resetFields();
        });
      } else {
        resetFields();
      }
    };

    const handlerPointRemote = async (params:MES.InspectionPointInParam | MES.InspectionPointInParam) => {
      try {
        if (pointMethod.value === "add") {
          await mesPointAddPoint(params);
          ElMessage.success("新增配置点成功");
        } else {
          await mesPointUpdatePoint(params);
          ElMessage.success("更新配置点成功");
        }
        pointTableRef.value.load();
        dialogVisible.value = false;

        gridPoint.forEach((item) => {
          item.setIcon(new AMap.Icon({
            image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/point-user-active.png",
            size: new AMap.Size(20, 30),
            imageSize: new AMap.Size(20, 30),
          }));
        });
      } catch (error) {
        console.error(error);
      }
    };

    const handlerGridTable = (row:MES.PlanViewGridDTO | MES.InspectionPointInParam) => {
      currentGridId.value = <number>row.gridId;
      cardType.value = "point";
      let polygon = gridPolygons.find((item) => item.getExtData().gridId === row.gridId);
      map.value?.setFitView([<AMap.Polygon>polygon]);
    };

    const handlerMapAndGrid = (e:any) => {
      if (pointMethod.value === "update" && dialogVisible.value) return;
			
      // 初始化逻辑
      if (!pointModel.longitude) {
        pointMethod.value = "add";
        dialogVisible.value = true;
      }

      // 事件来源处理
      if (e.target.getExtData) {
        currentGridId.value = e.target.getExtData().gridId;
        pointModel.gridId = currentGridId.value;
      }
     
      //通用逻辑
      pointModel.projectId = projectId;
      pointModel.projectCode = projectCode;
      pointModel.longitude = e.lnglat.lng;
      pointModel.latitude = e.lnglat.lat;

      if (pointMethod.value === "add") {
        // add逻辑
        if (oncePoint) {
          oncePoint.setPosition(e.lnglat);
        } else {
          oncePoint = new AMap.Marker({
            position: e.lnglat,
            icon: new AMap.Icon({
              image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/point-user-active.png",
              size: new AMap.Size(20, 30),
              imageSize: new AMap.Size(20, 30),
            }),
          });
          map.value?.add(oncePoint);
        }
      }else {
        // update逻辑
        gridPoint.find((marker) => marker.getExtData().pointId === pointModel.pointId)?.setPosition(e.lnglat);
      }
      
      // 更新详细地址
      geocoder.getAddress(e.lnglat, (status:any, result:any) => {
        if (status === "complete" && result.info === "OK") {
        	// result为对应的地理位置详细信息
          pointModel.fullAddress = result.regeocode.formattedAddress;
        }
      });
    };

    const handlerPointMap = async (e:MES.InspectionPointDTO | any) => {
      // 如果当前抽屉已经打开
      if (dialogVisible.value) {
        return ElMessage.warning("请先关闭或提交已打开的点位信息!");
      }
      let pointId;
      if (e.target) {
        pointId = e.target.getExtData().pointId;
        currentPointId.value = pointId;
        e.target.setIcon(new AMap.Icon({
          image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/point-user-active.png",
          size: new AMap.Size(20, 30),
          imageSize: new AMap.Size(20, 30),
        	})
        );
      } else {
        pointId = e.pointId;
        currentPointId.value = pointId;
      }
      try {
        let {data,} = await mesPointPointInfo({pointId,});
        // pointModel.projectId = projectId;
        // pointModel.projectCode = projectCode;
        // pointModel.gridId = data.gridId;
        // pointModel.pointId = data.pointId;
        // pointModel.pointName = data.pointName;
        // pointModel.latitude = data.latitude;
        // pointModel.longitude = data.longitude;
        // pointModel.fullAddress = data.fullAddress;
        // pointModel.pointType = data.pointType;
        // pointModel.inspectionType = data.inspectionType;
        Object.assign(pointModel,{
          projectId,
          projectCode,
          ...data,
        });

        pointMethod.value = "update";
        dialogVisible.value = true;
      } catch (error) {
        console.error(error);
      }
    };

    const removePoint = async (pointId:number) => {
      try {
        await mesPointDeletePoint({pointId,});
        ElMessage.success("删除成功");
        isEdit.value = false;
        remotePointList({gridId:currentGridId.value,projectId:projectId,current:1,pageSize:10,});
        pointTableRef.value?.load();
      } catch (error) {
        console.error(error);
      }
    };

    const resetFields = () => {
      isEdit.value = false;
      if (oncePoint) {
        map.value?.remove(oncePoint);
        oncePoint = undefined;
      }
      Object.keys(pointModel).map((key) => {
        // @ts-ignore
        delete pointModel[key];
      });
      gridPoint.forEach((item) => {
        item.setIcon(new AMap.Icon({
          image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/point-unbound.png",
          size: new AMap.Size(20, 30),
          imageSize: new AMap.Size(20, 30),
        }));
      });
    };
		
    return {
      mapRef,
      gridColumns,
      gridTableRef,
      pointTableRef,
      gridList,
      cardType,
      dialogVisible,
      dialogLoading,
      pointColumns,
      pointTypes,
      inspectionTypes,
      pointModel,
      rules,
      pointMethod,
      isEdit,
      cancelText,
      okText,
      remoteGridList,
      handlerGridTable,
      remotePointList,
      handlerPointMap,
      handlerCancel,
      resetFields,
      handlerPointRemote,
    }
  },
})
</script>
<style lang="less">

.point-config {
	height: calc(100vh - 160px);

	&-map {
		height: 100%;
		position: relative;
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

	&-card {
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

		&-header {
			height: 38px;
			padding: 0 24px;
			border-bottom: 1px solid #F2F3F4;
			display: flex;
			align-items: center;

			.el-icon {
				cursor: pointer;
			}

			.config-card-header-title {
				flex: 1;
				text-align: center;
				font-size: 18px;
			}
		}

		&-body {
			flex: 1;

			.el-pro-table-body {
				width: 100%;
				box-sizing: border-box;
			}
		}
	}

	.point-config-form {
		padding: 12px 24px;
	}
}
</style>
