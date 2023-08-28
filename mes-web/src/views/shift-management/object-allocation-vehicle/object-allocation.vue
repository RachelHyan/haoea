<template>
  <div class="object-allocation page-root">
    <div
      ref="mapRef"
      class="object-allocation__map"
    >
      <!-- 左侧预警面板 -->
      <left-panel ref="leftPanelRef" />
      <!-- 右侧排班面板 -->
      <right-panel
        ref="rightPanelRef"
        :current-object-id="currentObjectId"
        @clickObject="clickRowOrMapObject"
        @handleObjectDetail="handleObjectDetail"
      />
      <!-- 地址搜索框 -->
      <address-search-bar
        class="object-allocation__address"
        @handleAddressChange="handleAddressChange"
        @selectInputAddress="selectInputAddress"
      />
      <!-- 图层控制 -->
      <layer-control
        v-show="currentGridId"
        :data="layerControlData"
        :position="{left: 500, top: 16,}"
        @changeLayer="changeLayer"
      />
    </div>
    <!-- 对象分配弹窗 -->
    <form-model
      ref="formRef"
      v-model:model-value="objectWindowVisible"
      title="对象分配"
      :current-object-id="currentObjectId"
      @close="formLoad"
      @load="leftPanelRef.tableRef.load()"
    />
  </div>
</template>

<script lang="ts">
import { mesJobObjectQueryJayaMapGridList } from "@/api/mes/jobObjectController";
import { mesObjectAllotQueryJayaMapObjectAllotList } from "@/api/mes/objectAllotController";
import { AddressSearchBar, LayerControl } from "@/components";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { FormModel, LeftPanel, RightPanel } from "./components";

export default defineComponent({
  name: "ObjectAllocation",
  components: {
    AddressSearchBar,
    LeftPanel,
    RightPanel,
    FormModel,
    LayerControl,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const mapRef = ref();
    const leftPanelRef = ref();
    const rightPanelRef = ref();
    const formRef = ref();
    const currentGridId = ref();
    const currentObjectId = ref();
    const objectWindowVisible = ref<boolean>(false);
    const gridListForMap = ref<MES.PlanViewGridDTO[]>([]); // 地图上的网格列表
    const objectListForMap = ref<MES.JayaMapObjectDTO[]>([]);
    const layerControlData = reactive([
      {value: "must",label: "甲方测评", status:true,},
      {value: "census",label: "非必要检查",status:true,},
      {value: "other",label: "其它",status:true,},
      {value: "inside",label: "内部检查",status:true,}
    ])
    let map: AMap.Map;
    let electronicFence:AMap.Polygon; // 电子围栏
    let mapGrids:AMap.Polygon[] = [];
    let mapGridNames:AMap.Text[] = []; 
    let mapGridOverlay:AMap.OverlayGroup; 
    let mapObjects:any[] = [];
    let mapObjectOverlay:AMap.OverlayGroup;

    let userOverlayGroup: AMap.OverlayGroup; // 绘制完成后的覆盖物组人员
    let objectName:AMap.Marker;

    onMounted(async () => {
      await lazyAMapApiLoaderInstance;
      map = new AMap.Map(mapRef.value, {
        zooms: [3, 30],
      });

      drawElectronicFence();

      mapGridOverlay = new AMap.OverlayGroup();
      await fetchMapGrid();
      drawMapGrid();

      mapObjectOverlay = new AMap.OverlayGroup();
      await fetchMapObject();
      drawMapObject();

      userOverlayGroup = new AMap.OverlayGroup();
      objectName = new AMap.Marker();


      mapObjectOverlay.hide();
				
      map.on("zoomend", () => changeMapZoom(map.getZoom()));
    });

    /**
     * 
     * @param lnglat AMap.LngLat 鼠标点击到对象时的经纬度
     * @param gridIds number[] 从对象上获取到的网格id列表(跨网格情况下)
     */
    const findGridByLngLat = (lnglat: AMap.LngLat, gridIds: number[]):number => {
      if (!gridIds || gridIds.length === 0) {
        return 0;
      }
      let gridIdndex = 0;
      const gridList = mapGridOverlay.getOverlays().filter((item) => {
        if (item.type !== "AMap.Text") {
          return gridIds.includes(item.getExtData().gridId);
        }
      });
      gridIdndex = gridList.findIndex((item) => {
        return item.contains(lnglat);
      })
      return gridList[gridIdndex === -1 ? 0 : gridIdndex].getExtData().gridId;
    };
		
    /**
		 * 地图层级缩放
		 */
		 const changeMapZoom = (zoom: number) => {
      if (zoom < 10.8) {
        currentGridId.value = undefined;
        currentObjectId.value = undefined;

        mapGridOverlay.getOverlays().forEach(grid => {
          if (grid.type !== "AMap.Text") {
            grid.setOptions({
              zIndex: 10, 
              strokeColor: grid.getExtData().gridColor,
              fillOpacity:  0.45,
              strokeStyle: "solid",
              strokeWeight: 1,
            });
          } else {
            grid.setStyle({
              "background-color": "#fff",
              "color": `${grid.getExtData().gridColor}`,
              "border": "1px solid" + `${grid.getExtData().gridColor}`,
            });
          }
        });

        mapObjectOverlay.getOverlays().forEach(object => {
          if (object.type !== "AMap.Text") {
            object.setOptions({
              outlineColor: object.getExtData().color,
              fillColor: object.getExtData().color,
            });
          }
        });

        mapObjectOverlay?.hide();
				
      }
    };
		
    /**
		 * 电子围栏绘制
		 */
    const drawElectronicFence = () => {
      electronicFence = new AMap.Polygon({
        path: <any>project.$state.electronicFenceList,
        fillColor: "#7B70AA",
        fillOpacity: 0.1,
        strokeColor: "#7B70AA",
        strokeWeight: 8,
        bubble: true,
        zIndex: 9,
      });
      map?.add(electronicFence);
      map?.setFitView([electronicFence]);
    };

    /**
		 * 获取地图网格列表
		 */
    const fetchMapGrid = async () => {
      const params:MES.JobObjectQueryJayaMapGridListParams = {
        projectId,
        type: "Vehicle_operation",
      };
      try {
        const {data,} = await mesJobObjectQueryJayaMapGridList(params);
        gridListForMap.value = data;
      } catch (error) {
				
      }
    };

    /**
		 * 网格绘制
		 */
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
      })
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
      currentGridId.value = e.target.getExtData().gridId;	
			
      mapGridOverlay.getOverlays().forEach(grid => {
        let selected = grid.getExtData().gridId === currentGridId.value;
        if (grid.type === "AMap.Overlay") {
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

      setObjectDefaultStyle();
			
      mapObjectOverlay.getOverlays().forEach(object => {
        if (object.getExtData().gridIds && object.getExtData().gridIds.includes(currentGridId.value) && object.type !== "AMap.Text") {
          object.show();
        } else {
          object.hide();
        }
      })
			
    };

    const fetchMapObject = async () => {
      const params:MES.ObjectAllotQueryJayaMapObjectAllotListParams = {
        projectId,
        type: "Vehicle_operation",
      };
      try {
        const {data,} = await mesObjectAllotQueryJayaMapObjectAllotList(params);
        objectListForMap.value = data;
      } catch (error) {
				
      }
    };
    
    const drawMapObject = () => {
      mapObjectOverlay.clearOverlays();
      map.remove(mapObjects);
      
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
    	})
      mapObjectOverlay.addOverlays(mapObjects);
      // @ts-ignore
      map.add(mapObjectOverlay);
    };

    const clickRowOrMapObject = (e:MES.JobObjectDTO | any) => {
      if (e.target) {
        currentObjectId.value = e.target.getExtData().objectId;	
        currentGridId.value = findGridByLngLat(e.lnglat,e.target.getExtData().gridIds);
				
      } else {
        currentObjectId.value = e.objectId;
        currentGridId.value = e.gridId;
      }

      userOverlayGroup.clearOverlays();
      userMarkers(e);


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
        } else {
          grid.setStyle({
            "background-color": selected ? "#409EFF" : "#fff",
            "color": `${selected ? "#fff" : grid.getExtData().gridColor}`,
            "border":selected ? "none" : "1px solid" + `${grid.getExtData().gridColor}`,
          });
        }
      });
						
      mapObjectOverlay.getOverlays().forEach(object => {
        if (object.type !== "AMap.Text") {
          if (object.getExtData().gridIds && object.getExtData().gridIds.includes(currentGridId.value)) {
            object.show();
          } else {
            object.hide();
          }
          let selected = object.getExtData().objectId === currentObjectId.value;
          object.setOptions({
            outlineColor: selected ? "#E81D1D" : object.getExtData().color,
            fillColor: selected ? "#E81D1D" : object.getExtData().color,
          });
          selected && map.setFitView(object);
        }
      });
    };

    const mouseoverMapObject = (e: any) => {
      let current = e.target.getExtData().objectId;	
      mapObjectOverlay.getOverlays().forEach(object => {
        let selected = object.getExtData().objectId === current;
        object.setOptions({
          outlineColor: selected ? "#E81D1D" : object.getExtData().color,
          fillColor: selected ? "#E81D1D" : object.getExtData().color,
        });
        
				
        if (selected) {
          if (object.getExtData().planUserList.length) {
            object.getExtData().planUserList.forEach((user:any) => {
              if(user.gridId === currentGridId.value) {
                objectName = new AMap.Marker({
                  content:`<div class="object-infowindow">
            	<div class="object-infowindow-name" style="width: ${14 * object.getExtData().objectName.length}px;">${object.getExtData().objectName}</div>
            	<div style="width: ${(object.getExtData().chargeUserNames ? (14 * (object.getExtData().chargeUserNames.length + 3)) : 0)+(user.userName ? (14 * (user.userName.length + 6)) : 0)}px">${object.getExtData().chargeUserNames ? "队长：" + object.getExtData().chargeUserNames : ""} ${object.getExtData().chargeUserNames && user.userName ? "|" : ""} ${user.userName ? "作业人员：" + user.userName : ""}</div>
            	<div>${user.inspectorUserName ? "督查员：" + user.inspectorUserName : ""}</div>
            </div>`,
                  position: <any>object.getExtData().routePointList[0],
                  offset: new AMap.Pixel(0, -20),
                  extData: object.getExtData(),
                  isCustom: true,
                });
              } 
            });
          } else {	
            objectName = new AMap.Marker({
              content:`<div class="object-infowindow">
            	<div class="object-infowindow-name" style="width: ${14 * object.getExtData().objectName.length}px;">${object.getExtData().objectName}</div>
            	<div style="width: ${object.getExtData().chargeUserNames ? (14 * (object.getExtData().chargeUserNames.length + 3)) : 0}px">${object.getExtData().chargeUserNames ? "队长：" + object.getExtData().chargeUserNames : ""}</div>
            </div>`,
              position: <any>object.getExtData().routePointList[0],
              offset: new AMap.Pixel(0, -20),
              extData: object.getExtData(),
              isCustom: true,
            });
          }
        }
      });
      map.add(objectName);
      objectName.on("click", clickRowOrMapObject);

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

      objectName && map.remove(objectName);
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

    const userMarkers = (e:any) => {
      if (e.target) {
        e.target.getExtData().planUserList.forEach((user:any) => {
          if (user.objectId === currentObjectId.value) {
            let randomPoint = e.target.getExtData().routePointList[Math.floor(Math.random() * e.target.getExtData().routePointList.length)];
            let content = `<div class="cluster-marker" style="color:blue;border:none;width: ${12 * user.userName.length}px;">
				${user.userName}
				</div>`;
            let marker: AMap.Marker = new AMap.Marker({
              position: <any>randomPoint,
              title: user.userName,
              content,
              zIndex: 100,
              // 偏移
              offset: new AMap.Pixel(0, 0),
              bubble: true,
              cursor: "pointer",
            });
            userOverlayGroup.addOverlay(marker);
          }
        });
      } else {
        mapObjectOverlay.getOverlays().forEach((object:any) => {
          if (object.getExtData().objectId === currentObjectId.value) {
            let randomPoint = object.getExtData().routePointList[Math.floor(Math.random() * object.getExtData().routePointList.length)];
            let content = `<div class="cluster-marker" style="color:blue;border:none;width: ${12 * (e.userName?.length??0)}px;">
				${e.userName || ""}
				</div>`;
            let marker: AMap.Marker = new AMap.Marker({
              position: <any>randomPoint,
              title: e.userName || "",
              content,
              zIndex: 100,
              // 偏移
              offset: new AMap.Pixel(0, 0),
              bubble: true,
              cursor: "pointer",
            });
            e.userName && userOverlayGroup.addOverlay(marker);
          }
        });
      }

      //@ts-ignore
      map.add(userOverlayGroup);
    };

    /**
		 * 
		 * @param e 列表对象详情
		 */
    const handleObjectDetail = (e:MES.JayaMapObjectPlanDTO) => {
      clickRowOrMapObject(e);
      formRef.value.fetchObjectInfo(e.objectId,e.gridId);
      objectWindowVisible.value = true;
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

    /**
		 * 
		 * @param lnglat 搜索框搜索的地址经纬度
		 */
		 const handleAddressChange = (lnglat: any) => map?.setZoomAndCenter(17.4, lnglat);
    const selectInputAddress = (lnglat: any) => map?.setZoomAndCenter(17.4, lnglat);

    /**
		 * 对象分配表单加载
		 */
    const formLoad = () => {
      objectWindowVisible.value = false;
      currentGridId.value = undefined;

      setObjectDefaultStyle();

      mapObjectOverlay.hide();
    };
		

    return {
      mapRef,
      leftPanelRef,
      rightPanelRef,
      formRef,
      objectWindowVisible,
      layerControlData,
      currentObjectId,
      currentGridId,
      handleObjectDetail,
      changeLayer,
      handleAddressChange,
      selectInputAddress,
      formLoad,
      clickRowOrMapObject,
    }
  },
})
</script>

<style lang="less">
.object-allocation  {
	height: calc(100vh - 160px);
	
	&__map {
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

	.object-infowindow {
		// width: 87px;
		// height: 29px;
		background: #FFFFFF;
		box-shadow: 0px 2px 17px 0px rgba(0,0,0,0.16);
		border-radius: 5px;
		padding: 5px 15px;
	}

	
	.icon-collapsed {
		width: 24px;
		height: 24px;
		background-color: #fff;
		border-radius: 50%;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 1px 4px 2px rgb(0 0 0 / 11%);

		.el-icon {
			cursor: pointer;
		}
	}

	.el-pro-table .el-pro-table-body {
		padding: 0 24px;
	}

	.table-body {
		height: 350px;
		overflow: hidden;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 3px;
		}

			&::-webkit-scrollbar-thumb {
				background: rgba(0,0,0,0.2);
				border-radius: 50px;
			}

			&::-webkit-scrollbar-track {
					border-radius: 0;
					background: rgba(0,0,0,0.1);
			}

		&-item {
			display: flex;
			align-items: center;
			padding: 10px 0;
			width: 390px;
			// padding-bottom: 10px;
			// border-bottom: 1px solid #E6E6E6;
			// justify-content: space-between;

			&--left {
				width: 35px;
				height: 35px;
				border-radius: 50%;
			}

			&--center {
				margin: 0 10px;
				width: 290px;

				&__flex {
					display: flex;

					&--item {
						width: 200px;
						// 省略号
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					

				}
			}

			&--right {
				color: #ff0000;
			}
		}
	}

	&__address {
      position: absolute;
      top: 16px;
      right: 50px;
      z-index: 9;
		}
}
</style>
