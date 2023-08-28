<template>
  <div class="object-partitioning page-root">
    <div
      ref="mapRef"
      class="object-partitioning__map"
    >
      <!-- 地址搜索框 -->
      <address-search-bar
        class="object-partitioning__address"
        @handleAddressChange="handleAddressChange"
        @selectInputAddress="selectInputAddress"
      />
      <!-- 绘制工具 -->
      <draw-tool
        ref="drawToolRef"
        :draw-type="drawType"
        :card-type="cardType"
        :is-draw="isDraw"
        :is-setting="isSetting"
        :is-ajustment="isAjustment"
        :cunt-history="cuntHistory"
        :redo-history="redoHistory"
        :point-redo="pointRedo"
        :point-undo="pointUndo"
        @changeColor="changeColor"
        @changeWeight="changeWeight"
        @selectType="selectType"
        @selectEdit="selectEdit"
      />
      <!-- 左侧列表 -->
      <table-panel
        ref="tablePanelRef"
        v-model:cardType="cardType"
        :current-district-name="currentDistrictName"
        @clickGrid="clickRowOrMapGrid"
        @clickObject="clickRowOrMapObject"
        @clickPanelBack="clickPanelBack"
        @showInfoWindow="showInfoWindow"
      />
      <!-- 网格表单 -->
      <grid-form
        ref="gridFormRef"
        v-model:model-value="gridFormVisible"
        :form-methods="formMethods"
        @submit="gridFormSubmit"
        @close="gridFormClosed"
      />
      <!-- 对象表单 -->
      <object-form
        ref="objectFormRef"
        v-model:model-value="objectFormVisible"
        :form-methods="formMethods"
        :grid-options="gridOptions"
        :charge-options="chargeOptions"
        :is-point="isPoint"
        :work-array="workArray"
        :object-addr="objectAddr"
        @submit="objectFormSubmit"
        @close="objectFormClosed"
      />
      <!-- 图层控制 -->
      <layer-control
        v-show="currentGridId"
        :data="layerControlData"
        :position="{left: 443, top: 16,}"
        @changeLayer="changeLayer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mesGridAddGrid, mesGridDeleteGrid, mesGridUpdateGrid } from "@/api/mes/gridController";
import { mesJobObjectAddJobObject, mesJobObjectDeleteJobObject, mesJobObjectQueryJayaChargeSwitchList, mesJobObjectQueryJayaGridSwitchList, mesJobObjectQueryJayaMapGridList, mesJobObjectQueryJayaMapObjectList, mesJobObjectUpdateJobObject } from "@/api/mes/jobObjectController";
import { AddressSearchBar, LayerControl } from "@/components";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { ElMessage, ElMessageBox } from "element-plus";
import { computed, defineComponent, nextTick, onMounted, reactive, ref, watch } from "vue";
import { DrawTool, GridForm, ObjectForm, TablePanel } from "./components";
import { districtList } from "./district";

export default defineComponent({
  name: "ObjectPartitioning",
  components: {
    AddressSearchBar,
    TablePanel,
    GridForm,
    ObjectForm,
    DrawTool,
    LayerControl,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const projectCode = project.$state.projectCode as string;

    const mapRef = ref();
    const tablePanelRef = ref();
    const currentGridId = ref();
    const currentObjectId = ref();
    const currentDistrictName = ref(); // 仅项目7使用
    const gridListForMap = ref<MES.PlanViewGridDTO[]>([]);
    const objectListForMap = ref<MES.JobObjectDTO[]>([]);

    const gridFormRef = ref();
    const gridFormVisible = ref(false);
    const objectFormRef = ref();
    const objectFormVisible = ref(false);
    const formMethods = ref<"add"| "update">("add");
    const cardType = ref<"grid" | "object">("grid");
    const gridOptions = ref<{ value: any; label: any; }[]>([]);
    const chargeOptions = ref<{ value: any; label: any; }[]>([]);
    const isPoint = ref(true);

    const drawToolRef = ref();
    const currentColor = ref("#D2C233");
    const currentWeight = ref(3);
    const drawType = ref<"grid"| "point" | "line" | "plane" | "undo" | "redo" | "exit" | "">("");
    const isDraw = ref(false);
    const isSetting = ref(false);
    const isAjustment = ref(false);
    const workArray = ref<any[]>([]);
    const cuntHistory = ref<number>(0);
    const redoHistory = ref<any[]>([]);
    const pointRedo = ref<any[]>([]);
    const pointUndo = ref<any[]>([]);
    const objectAddr = ref<string | any>();

    let map: AMap.Map;
    let geocoder:any;
    let electronicFence:AMap.Polygon; // 电子围栏
    let districts:AMap.Polygon[] = []; // 仅项目7使用
    let districtNames:AMap.Text[] = []; // 仅项目7使用
    let districtOverlay:AMap.OverlayGroup; // 仅项目7使用
    let mapGrids:AMap.Polygon[] = [];
    let mapGridNames:AMap.Text[] = []; 
    let mapGridOverlay:AMap.OverlayGroup; 
    let mapObjects:any[] = [];
    let mapObjectNames:AMap.Marker[] = [];
    let mapObjectOverlay:AMap.OverlayGroup;
    let infoWindow:AMap.InfoWindow; // 信息窗体
    let drawGrid:AMap.Polygon; 
    let drawPoint:AMap.Marker; 
    let drawLine:AMap.Polyline; 
    let drawPlane:AMap.Polygon;
    // @ts-ignore
    let mapGridEditor:AMap.PolygonEditor;
    // @ts-ignore
    let mapPlaneEditor:AMap.PolygonEditor;
    // @ts-ignore
    let mapLineEditor:AMap.PolylineEditor;

    const layerControlData = reactive([
      {value: "must",label: "甲方测评", status:true,},
      {value: "census",label: "非必要检查",status:true,},
      {value: "other",label: "其它",status:true,},
      {value: "inside",label: "内部检查",status:true,}
    ])

    const lineStyle = computed(() => {
      return {
        outlineColor: currentColor.value,
        strokeColor: "#fff",
        strokeWeight: currentWeight.value,
        lineCap: "round",
        lineJoin: "round",
        isOutline: true,
        borderWeight: 3,
        strokeOpacity: 1,
      };
    });

    const planeStyle = computed(() => {
      return {
        strokeColor: currentColor.value,
        strokeWeight: currentWeight.value,
        fillColor: currentColor.value,
        fillOpacity: 0.15,
      };
    });

    const initMap = async () => {
      await lazyAMapApiLoaderInstance;
      map = new AMap.Map(mapRef.value, {
        zooms: [3, 30],
      });

      map?.on("keydown", (e: any) => {
        e.stopPropagation();
      });
						
      mapGridOverlay = new AMap.OverlayGroup();
      mapObjectOverlay = new AMap.OverlayGroup();

      await Promise.all([fetchGridList(),fetchChargeList()]);
      await Promise.all([fetchMapGrid(),fetchMapObject()]);

      drawElectronFence();
      drawMapGrid();
      drawMapObject();

      // 仅项目7使用
      if (projectId === 7){
        districtOverlay = new AMap.OverlayGroup();
        drawDistrict();				
				
        mapGridOverlay.hide();
      } 

      mapObjectOverlay.hide();
				
      map.on("zoomend", () => changeMapZoom(map.getZoom()));
			
      infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        autoMove: true, // 是否自动调整信息窗体位置
        offset: new AMap.Pixel(120, 0),
      });

    };

    onMounted(initMap);

    const changeMapZoom = (zoom: number) => {
      if (zoom < 10.8) {
        currentDistrictName.value = undefined;
        currentGridId.value = undefined;
        currentObjectId.value = undefined;

        mapObjectOverlay.getOverlays().forEach(object => {
          if (object.type !== "AMap.Text") {
            object.setOptions({
              outlineColor: object.getExtData().color,
              fillColor: object.getExtData().color,
            });
          }
        });

        mapGridOverlay?.hide();
        mapObjectOverlay?.hide();
        districtOverlay?.show();
        infoWindow?.close();
				
				
        nextTick(() => {
          tablePanelRef.value?.clickPanelBack();

          tablePanelRef.value?.gridTableRef?.load(currentDistrictName.value);
        });
      }
    };

    const drawElectronFence = () => {
      electronicFence = new AMap.Polygon({
        path: <any>project.$state.electronicFenceList,
        fillColor: "#7B70AA",
        fillOpacity: 0.1,
        strokeColor: "#7B70AA",
        strokeWeight: 8,
        bubble: true,
        zIndex:9,
      });

      map.add(electronicFence);
      map.setFitView([electronicFence]);
    };

    const drawDistrict = () => {
      districtOverlay.clearOverlays();
      map.remove(districts);
      map.remove(districtNames);
      districts.length = 0;
      districtNames.length = 0;

      districts = districtList.map(district => {
        const polygon = new AMap.Polygon({
          path: <any>district.pointList,
          strokeColor: district.color,
          fillColor: district.color,
          fillOpacity: 0.6,
          extData: district,
          bubble: true,
          cursor: "pointer",
          zIndex: 10,
        });

        polygon.on("click", clickDistrict);

        return polygon;
      });
      districtOverlay.addOverlays(districts);

      districtNames = districtOverlay.getOverlays().map(district => {
        const name = new AMap.Text({
          text: district.getExtData().cnName,
          position: <any>district?.getBounds()?.getCenter(),
          offset: new AMap.Pixel(0, -20),
          style: {
            "background-color": "#fff",
            "border-width": 0,
            "font-size": "12px",
            "text-align": "center",
            "color": "#000000",
            "padding": "5px 10px",
            "box-shadow": "0px 2px 17px 0px rgba(0,0,0,0.16)",
            "border-radius": "25px",
          },
          extData: district.getExtData(),
        });

        name.on("click", clickDistrict);

        return name;
      });
      districtOverlay.addOverlays(districtNames);

      // @ts-ignore
      map.add(districtOverlay);
    };

    const clickDistrict = (e: MES.PlanViewGridDTO |any) => {
      let grids:AMap.Polygon[] = [];
      currentDistrictName.value = e.target ? e.target.getExtData().name : e.district;
      infoWindow?.close();

      districtOverlay.getOverlays().forEach(district => {
        if (district.getExtData().name === currentDistrictName.value) {
          district.hide();
        } else {
          district.show();
        }
      });

      mapGridOverlay.getOverlays().forEach(grid => {
        if (grid.getExtData().district === currentDistrictName.value) {
          grid.show();
          grids.push(grid);
        } else {
          grid.hide();
        }
      });

      map.setFitView(grids);
			
      nextTick(() => {
        e.target && tablePanelRef.value?.clickPanelBack();

        tablePanelRef.value?.gridTableRef?.load(currentDistrictName.value);
      });
    };

    const fetchMapGrid = async () => {
      const params:MES.JobObjectQueryJayaMapGridListParams = {
        projectId,
        type: "Manual_cleaning",
      };
      try {
        const {data,} = await mesJobObjectQueryJayaMapGridList(params);
        gridListForMap.value = data;
      } catch (error) {
				
      }
    };

    const drawMapGrid = () => {
      mapGridOverlay.clearOverlays();
      map.remove(mapGrids);
      map.remove(mapGridNames);
      mapGrids.length = 0;
      mapGridNames.length = 0;

      mapGrids = gridListForMap.value.map(grid => {
        const polygon = new AMap.Polygon({
          path: <any>grid.gridPointList,
          strokeColor: grid.gridColor,
          fillColor: grid.gridColor,
          fillOpacity: 0.45,
          extData: grid,
          bubble: true,
          cursor: "pointer",
          zIndex: 10,
        });

        polygon.on("click", clickRowOrMapGrid);

        return polygon;
      });
      mapGridOverlay.addOverlays(mapGrids);

      mapGridNames = mapGridOverlay.getOverlays().map(grid => {
        const name = new AMap.Text({
          text: grid.getExtData().gridName,
          position: <any>grid?.getBounds()?.getCenter(),
          offset: new AMap.Pixel(0, -20),
          style: {
            "background-color": "#fff",
            "border": "1px solid" + `${grid.getExtData().gridColor}`,
            "font-size": "12px",
            "text-align": "center",
            "color": `${grid.getExtData().gridColor}`,
            "padding": "5px 10px",
            "box-shadow": "0px 1px 4px 2px rgba(0,0,0,0.11)",
            "border-radius": "25px",
          },
          extData: grid.getExtData(),
          zIndex: 11,
        });

        name.on("click", clickRowOrMapGrid);

        return name;
      });
      mapGridOverlay.addOverlays(mapGridNames);
			
			
      // @ts-ignore
      map.add(mapGridOverlay);
    };

    const clickRowOrMapGrid = (e: MES.PlanViewGridDTO | any) => {	
      infoWindow?.close();
      if (e.target) {
        currentGridId.value = e.target.getExtData().gridId;	

        tablePanelRef.value?.clickGridRow(e.target.getExtData());
        tablePanelRef.value?.objectTableRef?.load(currentGridId.value);

        exitDrawing();
      } else {
        projectId === 7 && clickDistrict(e);
        exitDrawing();
        currentGridId.value = e.gridId;
      }
			
      mapGridOverlay.getOverlays().forEach(grid => {
        let selected = grid.getExtData().gridId === currentGridId.value;
        if (grid.type !== "AMap.Text") {
          grid.setOptions({
            zIndex: selected ? 11 : 10, 
            strokeColor: selected ? "#409EFF" : grid.getExtData().gridColor,
            fillOpacity: selected ? 0.25 : 0.45,
            strokeStyle: selected ? "dashed" : "solid",
            strokeWeight: selected ? 6 : 1,
          });
          selected && map.setFitView([grid]);
        } else {
          grid.setStyle({
            "background-color": selected ? "#409EFF" : "#fff",
            "color": `${selected ? "#fff" : grid.getExtData().gridColor}`,
            "border":selected ? "none" : "1px solid" + `${grid.getExtData().gridColor}`,
          });
        }
      });
			
      mapObjectOverlay.getOverlays().forEach(object => {
        if (object.getExtData().gridIds && object.getExtData().gridIds.includes(currentGridId.value) && object.type !== "AMap.Text") {
          object.show();
        } else {
          object.hide();
        }
      });
    };

    const fetchMapObject = async () => {
      const params:MES.JobObjectQueryJayaMapObjectListParams = {
        projectId,
        type: "Manual_cleaning",
      };
      try {
        const {data,} = await mesJobObjectQueryJayaMapObjectList(params);
        objectListForMap.value = data;
      } catch (error) {
				
      }
    };
    
    const drawMapObject = () => {
      mapObjectOverlay.clearOverlays();
      map.remove(mapObjects);
      map.remove(mapObjectNames);
      mapObjects.length = 0;
      mapObjectNames.length = 0;
      
      mapObjects = objectListForMap.value.map(object => {
        let point, line, plane;
        switch (object.geometryType) {
        case 1:
          point = new AMap.Marker({
            position: <any>object.routePointList[0],
            icon: new AMap.Icon({
              image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-blue.png",
              size: new AMap.Size(30, 40),
              imageSize: new AMap.Size(30, 40),
            }),
            offset:[-15,-20],
            extData: object,
            bubble: true,
            cursor: "pointer",
            zIndex:12,
          });
					
          point.on("mouseover",mouseoverMapObject);
          point.on("mouseout",mouseoutMapObject);
          point.on("click", clickRowOrMapObject);

          break;
        case 2:
          line = new AMap.Polyline({
            path: <any>object.routePointList,
            strokeColor: "#FFFFFF",
            strokeWeight:object.strokeWidth,
            strokeOpacity: 1,
            extData: object,
            bubble: true,
            lineCap: "round",
            lineJoin: "round",
            cursor: "pointer",
            zIndex:12,
            isOutline: true,
            borderWeight: 3,
            outlineColor: object.color,
          });

          line.on("mouseover",mouseoverMapObject);
          line.on("mouseout",mouseoutMapObject);
          line.on("click", clickRowOrMapObject);

          break;
        case 3:
          plane = new AMap.Polygon({
            path: <any>object.routePointList,
            strokeColor: object.color,
            fillColor: object.color,
            strokeWeight:object.strokeWidth,
            fillOpacity: 0.55,
            extData: object,
            bubble: true,
            cursor: "pointer",
            zIndex:12,
          });

          plane.on("mouseover",mouseoverMapObject);
          plane.on("mouseout",mouseoutMapObject);
          plane.on("click", clickRowOrMapObject);
					
          break;
        default:
          break;
        }
        return point || line || plane;
    	});
      mapObjectOverlay.addOverlays(mapObjects);

      mapObjectNames = mapObjectOverlay.getOverlays().map(object => {
        const name = new AMap.Text({
          text: `
									<span>${object.getExtData().objectName}</span>
									<br>
									<span>${object.getExtData().chargeUserNames || ""}</span>
									`,
          position: <any>object?.getBounds()?.getCenter(),
          offset: new AMap.Pixel(0, -20),
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

        name.on("click", clickRowOrMapObject);

        return name;
      });
      mapObjectOverlay.addOverlays(mapObjectNames);

      // @ts-ignore
      map.add(mapObjectOverlay);
    };

    const clickRowOrMapObject = (e:MES.JobObjectDTO | any) => {
      let objectData;
      infoWindow?.close();

      if (e.target) {
        currentObjectId.value = e.target.getExtData().objectId;	
        objectData = e.target.getExtData();
      } else {
        exitDrawing();
        currentObjectId.value = e.objectId;
        objectData = e;
      }

      showInfoWindow(objectData,"object");


      mapObjectOverlay.getOverlays().forEach(object => {
        if (object.type !== "AMap.Text") {
          let selected = object.getExtData().objectId === currentObjectId.value;
          object.setOptions({
            outlineColor: selected ? "#E81D1D" : object.getExtData().color,
            fillColor: selected ? "#E81D1D" : object.getExtData().color,
          })
          selected && map.setFitView([object]);
        }
      });
    };

    const mouseoverMapObject = (e: any) => {
      let current = e.target.getExtData().objectId;	
      mapObjectOverlay.getOverlays().forEach(object => {
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
      mapObjectOverlay.getOverlays().forEach(object => {
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

    const clickPanelBack = () => {
      currentGridId.value = undefined;

      exitDrawing();
      setDistrictGridDefaultStyle();
      setObjectDefaultStyle();
      
      mapObjectOverlay.hide();
      infoWindow.close();
    };

    const setGridStyle = (grid: any) => {
      if (grid.type === "AMap.Overlay") {
        grid.setOptions({
          zIndex: 10,
          strokeColor: grid.getExtData().color,
          fillOpacity: 0.45,
          strokeStyle: "solid",
          strokeWeight: 1,
        });
      } else {
        grid.setStyle({
          "background-color": "#fff",
          "border": "1px solid" + `${grid.getExtData().gridColor}`,
          "color": `${grid.getExtData().gridColor}`,
        });
      }
    };
			
    const setDistrictGridDefaultStyle = () => {
      if (projectId === 7) {
        let grids:AMap.Polygon[] = [];
        tablePanelRef.value?.gridTableRef?.load(currentDistrictName.value);

        mapGridOverlay.getOverlays().forEach(grid => {
          setGridStyle(grid);
	
          if (grid.getExtData().district === currentDistrictName.value) {
            grids.push(grid);
          } else {
            grid.hide();
          }
        });

        map.setFitView(grids);
      } else {
        mapGridOverlay.getOverlays().forEach(grid => {
          setGridStyle(grid);
        })
      }
      
    };

    const setObjectDefaultStyle = () => {
      currentObjectId.value = undefined;

      mapObjectOverlay.getOverlays().forEach(object => {
        if (object.type !== "AMap.Text") {
          object.setOptions({
            outlineColor: object.getExtData().color,
            fillColor: object.getExtData().color,
          });
        }
      });
    };

    const changeLayer = (e:any) => {
      const selected = e.filter((item:any) => item.status).map((item:any) => item.value);

      mapObjectOverlay.getOverlays().forEach((object:any) => {
        if (object.getExtData().gridIds && object.getExtData().gridIds.includes(currentGridId.value) && object.type !== "AMap.Text" && selected.includes(object.getExtData().inspectionType)) {
          object.show();
        } else {
          object.hide();
        }
      })
    }
		
    const handleAddressChange = (lnglat: any) => map.setZoomAndCenter(17.4, lnglat);
    const selectInputAddress = (lnglat: any) => {
      map.setZoomAndCenter(17.4, lnglat);
			
      if (isDraw.value && drawType.value === "point") {
        drawPoint.setPosition(lnglat)
        addActionToHistory({lnglat:{...drawPoint.getPosition(),},});
      }
    }

    const updateStyle = (planeStyle:any,lineStyle:any) => {
      if (cardType.value === "grid") {
        switch (formMethods.value) {
        case "add":
          drawType.value === "grid" && drawGrid.setOptions(planeStyle);
          break;
        case "update":
          mapGridOverlay.getOverlays().find(grid => grid.getExtData().gridId === currentGridId.value)?.setOptions(planeStyle);
          break;
        default:
          break;
        }
      } else {
        switch (formMethods.value) {
        case "add":
          if (drawType.value === "line") {
            drawLine.setOptions(lineStyle);
          } else if (drawType.value === "plane") {
            drawPlane.setOptions(planeStyle);
          }
          break;
        case "update":
          mapObjectOverlay.getOverlays().forEach((item:any) => {
            if (item.getExtData().objectId === currentObjectId.value) {
              switch (item.getExtData().geometryType) {
              case 2:
                item.setOptions(lineStyle);
                break;
              case 3:
                item.setOptions(planeStyle);
                break;
              }
            }
          });
          break;
        default:
          break;
        }
      }
    };

    const changeColor = (color:string) => {
      currentColor.value = color;
      updateStyle(planeStyle.value,lineStyle.value);
    };

    const changeWeight = (weight:number) => {
      currentWeight.value = weight;
      updateStyle(planeStyle.value,lineStyle.value);
    };

    const selectType = (type:"grid"| "point" | "line" | "plane") => {
      if (projectId === 7 && !currentDistrictName.value && type === "grid") return;
      exitDrawing();

      drawType.value = type;
      formMethods.value = "add";
      workArray.value = [];
      

      // 判断是否为绘制类型
      const isDrawType = ["grid", "point", "line", "plane"].includes(type);
      isDraw.value = isDrawType;

      // 判断是否为设置类型
      const isSetType = ["grid", "line", "plane"].includes(type);
      isSetting.value = isSetType;

      mapGridOverlay.off("click",clickRowOrMapGrid);
      mapObjectOverlay.off("click",clickRowOrMapObject);

      switch (type) {
      case "grid":
        drawGrid = new AMap.Polygon();
        // @ts-ignore
        drawGrid.setOptions(planeStyle.value);
        map.add(drawGrid);
        map.on("click",(e) => {
          addActionToHistory(e);
        });
        break;
      case "point":
        drawPoint = new AMap.Marker({
					  icon: new AMap.Icon({
            size: new AMap.Size(30, 40),
            image: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-blue.png",
            imageSize: new AMap.Size(30, 40),
          }),
          offset:[-15,-20],
        });
        map.add(drawPoint);
        map.on("click",(e) => {
          drawPoint.setPosition(e.lnglat);
          addActionToHistory(e);
        });
        break;
      case "line":
        drawLine = new AMap.Polyline();
        // @ts-ignore
        drawLine.setOptions(lineStyle.value);
        map.add(drawLine);
        map.on("click",(e) => {
          addActionToHistory(e);
        });
        break;
      case "plane":
        drawPlane = new AMap.Polygon();
        // @ts-ignore
        drawPlane.setOptions(planeStyle.value);
        map.add(drawPlane);
        map.on("click",(e) => {
          addActionToHistory(e);
        });
        break;
      default:
        break;
      }
    };

    const selectEdit = (type:"undo" | "redo" | "exit") => {
      isDraw.value = true;
			
      const isSetType = ["grid", "line", "plane"].includes(drawType.value);
      isSetting.value = isSetType;

      switch (type) {
      case "undo":
        undoLastAction();
        break;
      case "redo":
        redoLastAction();
        break;
      case "exit":
        exitDrawing();
        break;
      default:
        break;
      }
    };

    const redrawComponent = (type:string) => {
      const drawComponents:any = {
        grid: drawGrid,
        line: drawLine,
        plane: drawPlane,
      };

      const drawComponent = drawComponents[type];
      if (drawComponent) {
        drawComponent.setPath(workArray.value);
      }
    };

    const addActionToHistory = (e:any) => {
      if (drawType.value === "point") {
        !drawPoint && map.add(drawPoint);

        pointUndo.value.push({...drawPoint.getPosition(),});
        drawPoint.setPosition(e.lnglat);
				
        pointRedo.value = [];
        workArray.value = [e.lnglat.lng,e.lnglat.lat];

        workArray.value.length > 0 && registerEvents();
      } else {
        workArray.value.push([e.lnglat.lng,e.lnglat.lat]);

        redrawComponent(drawType.value);

        cuntHistory.value++;
        redoHistory.value = [];

        drawType.value === "line" ? workArray.value.length > 1 && registerEvents() : workArray.value.length > 2 && registerEvents();
      }
    };

    const undoLastAction = () => {

      if (drawType.value === "point") {
        const lastPosition = pointUndo.value.pop();
        if (lastPosition?.lat && lastPosition?.lng) {
          pointRedo.value.push({ ...drawPoint.getPosition(), });
          drawPoint.setPosition(lastPosition);

          workArray.value = [lastPosition.lng,lastPosition.lat];

          workArray.value.length > 0 && registerEvents();
        }
      } else {
        if (cuntHistory.value === 0) return;

        redoHistory.value.push(workArray.value.pop());

        redrawComponent(drawType.value);
				
      	cuntHistory.value--;

        if (drawType.value === "line" )  {
          workArray.value.length > 1 ?	registerEvents() : window.removeEventListener("keydown", keydownHandler);
        } else {
          workArray.value.length > 2 ?	registerEvents() : window.removeEventListener("keydown", keydownHandler);
        }
      }
    };

    const redoLastAction = () => {
      if (drawType.value === "point") {
        const nextPosition = pointRedo.value.pop();
        if (nextPosition) {
          pointUndo.value.push({ ...drawPoint.getPosition(), });
          drawPoint.setPosition(nextPosition);

          workArray.value = [nextPosition.lng,nextPosition.lat];

          workArray.value.length > 0 && registerEvents();
        }
      } else {
        if (cuntHistory.value === 0) return;

        workArray.value.push(redoHistory.value.pop());

        redrawComponent(drawType.value);
				
        cuntHistory.value++;

        if (drawType.value === "line" )  {
          workArray.value.length > 1 ?	registerEvents() : window.removeEventListener("keydown", keydownHandler);
        } else {
          workArray.value.length > 2 ?	registerEvents() : window.removeEventListener("keydown", keydownHandler);
        }
      }
    };

    const exitDrawing = () => {
      currentColor.value = "#D2C233";
      currentWeight.value = 3;
      drawToolRef.value?.changeColor(currentColor.value);
      drawToolRef.value?.changeWeight(currentWeight.value);

      drawType.value = "";
      isDraw.value = false;
      isSetting.value = false;
      isAjustment.value = false;

      workArray.value = [];
      cuntHistory.value = 0;
      redoHistory.value = [];
      pointRedo.value = [];
      pointUndo.value = [];
			

      map.clearEvents("click");
      mapGridOverlay.on("click",clickRowOrMapGrid);
      mapObjectOverlay.on("click",clickRowOrMapObject);
			
      drawGrid && map.remove(drawGrid);
      drawPoint && map.remove(drawPoint);
      drawLine && map.remove(drawLine);
      drawPlane && map.remove(drawPlane);

      infoWindow.close();


      if (cardType.value === "grid") {
        mapGridEditor && mapGridEditor.close();
        drawMapGrid();
        setDistrictGridDefaultStyle();
        mapObjectOverlay.hide();
      } else {
        mapLineEditor && mapLineEditor.close();
        mapPlaneEditor && mapPlaneEditor.close();
        drawMapObject();
        setObjectDefaultStyle();
        mapObjectOverlay.getOverlays().forEach(object => {
          if (object.getExtData().gridIds && object.getExtData().gridIds.includes(currentGridId.value) && object.type !== "AMap.Text") {
            object.show();
          } else {
            object.hide();
          }
        })
      }

      gridFormClosed();
      objectFormClosed();
    };

    const getAddress = (routePointList:any) => {
      AMap.plugin("AMap.Geocoder", function() {
        // @ts-ignore
        geocoder = new AMap.Geocoder();
      })
      return new Promise((resolve, reject) => {
        geocoder.getAddress(routePointList, function(status:any, result:any) {
          if (status === "complete" && result.info === "OK") {			
            const addr = result.regeocode ? result.regeocode.formattedAddress : null;
            resolve(addr);
          } else {
            reject();
          }
        });
      });
    };

    const finishDrawing = async () => {
      switch (cardType.value) {
      case "grid":
        if (isAjustment.value) {
          await gridFormSubmit(gridFormRef.value?.formModel);
          mapGridOverlay.on("click",clickRowOrMapGrid);
        } else {
          gridFormVisible.value = true;
        }
        break;
      case "object":
        if (drawType.value === "point") {
          isPoint.value = true;
          objectAddr.value = await getAddress(workArray.value);
          workArray.value = [...workArray.value];
        }else {
          isPoint.value = false;
          objectAddr.value = "";
        }
				
        objectFormRef.value?.fetchShiftList();
        if (isAjustment.value) {
          await objectFormSubmit({...objectFormRef.value?.formModel,...objectFormRef.value?.shiftInParams,})
          mapGridOverlay.on("click",clickRowOrMapGrid);
          mapObjectOverlay.on("click",clickRowOrMapObject);
          mapObjectOverlay.on("mouseover",mouseoverMapObject);
        } else {
          objectFormVisible.value = true;
          if(formMethods.value === "add") {
            objectFormRef.value.formModel.gridIds = [currentGridId.value];
          }
        }
        break;
      default:
        break;
      }
    };

    const keydownHandler = (e: KeyboardEvent): void => {
      const { key, ctrlKey, } = e;

      switch (key) {
      case "Escape":
        exitDrawing();
        break;
      case "Enter":
        finishDrawing();
        break;
      case "z":
        if (ctrlKey) undoLastAction();
        break;
      case "y":
        if (ctrlKey) redoLastAction();
        break;
      default:
        break;
      }
    };

    const registerEvents = (): void => {
      window.addEventListener("keydown", keydownHandler);
    };

		

    const getPointCenter = (points:any) => {
      let lngArr = [];
      let latArr = [];
      for (let i = 0; i < points.length; i++) {
        lngArr.push(points[i][0]);
        latArr.push(points[i][1]);
      }
      const lngCenter = (Math.max.apply(Math, lngArr) + Math.min.apply(Math, lngArr)) / 2;
      const latCenter = (Math.max.apply(Math, latArr) + Math.min.apply(Math, latArr)) / 2;
      return [lngCenter, latCenter];
    }

    const showInfoWindow = (e: any,type:string) => {
      const isGrid = type === "grid";
      const id = isGrid ? e.gridId : e.objectId;
      const name = isGrid ? e.gridName : e.objectName;
      const pointList = isGrid ? e.gridPointList : e.routePointList;

      isGrid && clickRowOrMapGrid(e);

      const content = `
					<div class="info-window">
						<div class="title">
							<div class="text">${name}</div>
							<div class="cross" id="close"></div>
						</div>
						<div class="buttons">
							<button type="primary" id="edit">编辑</button>
							<button id="adjustment">图形调整</button>
							<button id="del">删除</button>
						</div>
					</div>
				`;
      infoWindow.setContent(content);
      // @ts-ignore
      infoWindow.open(map, getPointCenter(pointList),100);

      const closeBtn = document.getElementById("close");
      const editBtn = document.getElementById("edit");
      const adjustmentBtn = document.getElementById("adjustment");
      const delBtn = document.getElementById("del");

      const clickClose = () => {
        infoWindow.close();
        isGrid ? clickPanelBack() : setObjectDefaultStyle();
		 };

		 const clickEdit = async () => {
        formMethods.value = "update";

        if (isGrid) {
          gridFormVisible.value = true;
         	await gridFormRef.value?.fetchInfo(id);
        } else {
          objectFormVisible.value = true;
          try {
            const res = await objectFormRef.value?.fetchInfo(id);
            workArray.value = res.geometryType === 1 ? res.routePointList.flat() : res.routePointList;
            objectAddr.value = res.addr;
            isPoint.value =	res.geometryType === 1 ? true : false;
          } catch (error) {
          }
        }
		 };

		 const clickAdjustment = async () => {
        formMethods.value = "update";
        isDraw.value = true;
        isSetting.value = true;
        isAjustment.value = true;

        infoWindow.close();

        isGrid ? gridAjustment() : objectAjustment();
		 };

		 const clickDel = async () => {
        isGrid ?  handleDelGrid(id) :  handleDelObject(id);
		 };

		 closeBtn?.addEventListener("click",clickClose);
		 editBtn?.addEventListener("click",clickEdit);
		 adjustmentBtn?.addEventListener("click",clickAdjustment);
		 delBtn?.addEventListener("click",clickDel);
    };

    const gridAjustment = async() => {
      mapObjectOverlay.hide();
      mapGridEditor?.close();
      mapGridOverlay.off("click",clickRowOrMapGrid);
			
      const data = await gridFormRef.value?.fetchInfo(currentGridId.value);
      drawToolRef.value?.changeColor(data?.color);
      workArray.value = data?.gridPointList;
			
      //	@ts-ignore
      mapGridEditor = new AMap.PolygonEditor(map);
      mapGridOverlay.getOverlays().forEach(grid => {
        if (grid.getExtData().gridId === currentGridId.value && grid.type === "AMap.Overlay") {
          mapGridEditor.setTarget(grid);
          mapGridEditor.open();
					
          registerEvents();
          mapGridEditor.on(["adjust", "addnode", "removenode"], (event:any) => {
            workArray.value = event.target.getPath();
          });
        }
      });
    };

    const objectAjustment = async () => {
      mapGridOverlay.off("click",clickRowOrMapGrid);
      mapObjectOverlay.off("click",clickRowOrMapObject);
      mapObjectOverlay.off("mouseover",mouseoverMapObject)

      const data = await objectFormRef.value?.fetchInfo(currentObjectId.value);
      drawToolRef.value?.changeColor(data?.color);
      drawToolRef.value?.changeWeight(data?.strokeWidth);
      workArray.value = data?.routePointList;

      mapObjectOverlay.getOverlays().forEach(object => {
        if (object.getExtData().objectId === currentObjectId.value && object.type !== "AMap.Text") {
          switch (object.getExtData().geometryType) {
          case 1:
            drawType.value = "point";
            object.setDraggable(true);
            registerEvents();
            object.on("dragend", (e:any) => {
              workArray.value = [e.lnglat.lng,e.lnglat.lat];
            });
            break;
          case 2:
            drawType.value = "line";
            // @ts-ignore
            mapLineEditor = new AMap.PolylineEditor(map, object);
            mapLineEditor.open();
            registerEvents();
            mapLineEditor.on(["adjust", "addnode", "removenode"], (event:any) => {
              workArray.value = event.target.getPath();
            });
            break;
          case 3:
            drawType.value = "plane";
            // @ts-ignore
            mapPlaneEditor = new AMap.PolygonEditor(map, object);
            mapPlaneEditor.open();
            registerEvents();
            mapPlaneEditor.on(["adjust", "addnode", "removenode"], (event:any) => {
              workArray.value = event.target.getPath();
            });
            break;
          default:
            break;
          }
        }		
      });
    };

    const fetchGridList = async () => {
      const params = {
        projectId,
        type: "Manual_cleaning",
      };
      try {
        const {data,} = await mesJobObjectQueryJayaGridSwitchList(params);
        gridOptions.value = data.map((item:any) => ({
          value: item.gridId,
          label: item.gridName,
        }));
      } catch (error) {
      }
    };

    const fetchChargeList = async () => {
      try {
        const {data,} = await mesJobObjectQueryJayaChargeSwitchList({projectId,});

        chargeOptions.value = data.map((item:any) => ({
          value: item.chargeUserId,
          label: item.chargeUserName,
        }));
      } catch (error) {
      }
    };

    const gridFormSubmit = async (data?:{gridName:string,gridPointList:any,color:string}) => {
      const params = {
        gridId: currentGridId.value,
        gridName:data?.gridName,
        gridPointList: formMethods.value === "update" && !isAjustment.value ? data?.gridPointList : workArray.value,
        color: formMethods.value === "update" && !isAjustment.value ? data?.color : currentColor.value ,
        district: currentDistrictName.value,
        projectId,
        type: "Manual_cleaning",
      };
			
      try {
        if (formMethods.value === "add") {
          await mesGridAddGrid(params);
          ElMessage.success("添加成功");
        } else {
          await mesGridUpdateGrid(params);
          ElMessage.success("修改成功");
        }
      } catch (error) {
      } finally {
        gridFormVisible.value = false;
        tablePanelRef.value?.gridTableRef?.load();
        await fetchMapGrid();
        await fetchGridList();
        exitDrawing();
      }
    };

    const objectFormSubmit = async (data?:{color:string,strokeWidth:number,chargeUserIds:number[],gridIds:number[],objectName:string,sceneType:string,inspectionType:string,shiftInParams:any,addr:string,geometryType:number,routePointList:any,shiftList:any}) => {
      const routePointList = formMethods.value === "update" && !isAjustment.value 
        ? data?.routePointList 
        : isPoint.value 
          ? [workArray.value]
          : workArray.value
			
      const params = {
        addr: formMethods.value === "update" && !isAjustment.value ? data?.addr : objectAddr.value,
        chargeUserIds: data?.chargeUserIds,
        color: formMethods.value === "update" && !isAjustment.value ? data?.color : currentColor.value,
        geometryType: formMethods.value === "update" ? data?.geometryType : (drawType.value === "point" ? 1 : drawType.value === "line" ? 2 : 3),
        gridIds: data?.gridIds,
        inspectionType: data?.inspectionType,
        objectId: currentObjectId.value,
        objectName: data?.objectName,
        projectId,
        projectCode,
        reportMode: 1,
        routePointList: routePointList,
        sceneType: data?.sceneType,
        strokeWidth: formMethods.value === "update" && !isAjustment.value ? data?.strokeWidth : currentWeight.value,
        type: "Manual_cleaning",
        shiftInParams: !isAjustment.value ? data?.shiftInParams : data?.shiftList,
      };
			

      try {
        if (formMethods.value === "add") {
          await mesJobObjectAddJobObject(params);
          ElMessage.success("添加成功");
        } else {
          await mesJobObjectUpdateJobObject(params);
          ElMessage.success("修改成功");
        }
      } catch (error) {
      } finally {
        objectFormVisible.value = false;
        tablePanelRef.value?.objectTableRef?.load(currentGridId.value);
        await fetchMapObject();
        exitDrawing();
      }
    };

    const handleDelGrid = async (gridId:string) => {
      ElMessageBox.confirm("删除网格时对象将同步删除，请确认是否删除？","提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesGridDeleteGrid({gridIds:gridId,projectId,});
              done();
              instance.confirmButtonLoading = false;
              infoWindow.close();
              ElMessage.success("删除成功");
              tablePanelRef.value?.gridTableRef?.load();
              await fetchMapGrid();
        			await fetchGridList();
        			exitDrawing();
            } catch (error) {
              done();
            }
          } else {
            done();
          }
        },
      }).catch(() => {
        // 为了不让控制台报 Uncaught (in promise) cancel
      });
    };

    const handleDelObject = async (objectId:any) => {
      ElMessageBox.confirm("若对象已绑定人员，则同步删除人员的排班计划，请确认是否删除？","提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesJobObjectDeleteJobObject({objectId,});
              done();
              instance.confirmButtonLoading = false;
              infoWindow.close();
              ElMessage.success("删除成功");
              tablePanelRef.value?.objectTableRef?.load(currentGridId.value);
              await fetchMapObject();
              exitDrawing();
            } catch (error) {
              done();
            }
          } else {
            done();
          }
        },
      }).catch(() => {
        // 为了不让控制台报 Uncaught (in promise) cancel
      });
    };

    const gridFormClosed = () => {
      Object.assign(gridFormRef.value?.formModel,{
        gridId: undefined,
        gridName:undefined,
        gridPointList: undefined,
        color: undefined,
        district: undefined,
      });
    };

    const objectFormClosed = () => {
      Object.assign(objectFormRef.value?.formModel,{
        addr:"",
        chargeUserIds:[],
        color:"",
        geometryType:undefined,
        gridIds:[],
        inspectionType:undefined,
        objectId:undefined,
        objectName: undefined,
        routePointList: undefined,
        sceneType: undefined,
        strokeWidth: undefined,
        shiftInParams: undefined,
      });
    };

    watch(() => isDraw.value, (val) => {
      if (!val) {
        window.removeEventListener("keydown", keydownHandler);
      }
    });

    return {
      mapRef,
      tablePanelRef,
      currentDistrictName,
      gridFormRef,
      gridFormVisible,
      objectFormRef,
      objectFormVisible,
      cardType,
      formMethods,
      gridOptions,
      chargeOptions,
      drawToolRef,
      drawType,
      isDraw,
      isSetting,
      isAjustment,
      cuntHistory,
      redoHistory,
      pointRedo,
      pointUndo,
      workArray,
      objectAddr,
      isPoint,
      layerControlData,
      currentGridId,
      clickRowOrMapGrid,
      clickRowOrMapObject,
      clickPanelBack,
      changeLayer,
      handleAddressChange,
      selectInputAddress,
      changeColor,
      changeWeight,
      selectType,
      selectEdit,
      showInfoWindow,
      objectFormSubmit,
      gridFormSubmit,
      gridFormClosed,
      objectFormClosed,
    }
  },
})
</script>

<style lang="less">
.object-partitioning {
	height: calc(100vh - 160px);

	&__map {
		height: 100%;
		position: relative;
	}

	.object-name {
		background: #FFFFFF;
		box-shadow: 0px 2px 17px 0px rgba(0,0,0,0.16);
		border-radius: 5px;
		padding: 5px 15px;
	}

	&__address {
		position: absolute;
		top: 16px;
		right: 450px;
		z-index: 9;
	}

	.info-window {
		width: 200px;
		background-color: #fff;
		padding: 10px;
		border-radius: 5px;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.text {
				font-size: 16px;
				font-weight: bold;
				text-align: center;
			}

			.cross {
				position: relative;
				width: 20px;
				height: 20px;
				cursor: pointer;
				margin-left: 11px;
			}
			.cross::before,
			.cross::after {
				content: '';
				position: absolute;
				width: 2px;
				height: 20px;
				background-color: #ccc
			}

			.cross::before {
				right: 12px;
				top: 0;
				transform: rotate(45deg);

			}

			.cross::after {
				right: 13px;
				top: 0;
				transform: rotate(-45deg);
			}
		}
		.buttons {
			border-top: 1px solid #000;
			margin-top: 5px;
			padding-top: 10px;
			display: flex;
			justify-content: space-around;
		}

		#edit,#adjustment,#del {
			background-color: transparent;
			border: none;
			border-radius: 5px;
			padding: 5px 10px;
			cursor: pointer;
		}

		#edit {
			color: #1890ff;
		}

		#adjustment {
			color: #52c41a;
		}

		#del {
			color: #ff4d4f;
		}
	}
}
</style>
