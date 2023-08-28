<template>
  <div class="map-render">
    <div
      ref="mapRef"
      class="home-page-map"
    />
  </div>
</template>
<script lang='ts'>
import { randomPointOnPolyline } from "@/utils/map";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { dayjs } from "element-plus";
import { defineComponent, onMounted, reactive, Ref, ref, watch } from "vue";

export default defineComponent({
  name: "MapRender",
  props: {
    view:{
      type: String,
      default: "task",
    },
    currentData: {
      type: Object,
      default: () => ({
        gridId: 0,
        objectId: 0,
        shiftId: 0,
        teamId: 0,
        taskId: 0,
        userId: 0,
      }),
    },
    time: {
      type: String,
      default: dayjs().add(1, "day").format("YYYY-MM-DD"),
    },
    request: {
      type: Function,
      default: () => [],
    },
    editStatus: {
      type: Boolean,
      default: false,
    },
    showPanel: {
      type: String,
      default: "main",
    },
  },
  emits: ["update:currentData", "update:editStatus", "setShowPanel"],
  setup(props, { emit, }) {
    let map: AMap.Map
    const mapRef: Ref<HTMLDivElement | string> = ref<HTMLDivElement | string>("");
    const currentInfo = reactive(props.currentData)
    let overlayGroup: AMap.OverlayGroup
    let gridNameMarkers: { lnglat: number[], weight: number, extData: object, polygon: AMap.Polygon }[]
    let infoWindow: AMap.InfoWindow
    let userMarker: AMap.Marker
    // @ts-ignore
    let cluster: AMap.MarkerCluster

    onMounted(async () => {
      await lazyAMapApiLoaderInstance;
      map = new AMap.Map(mapRef.value, {});
      map.setZoom(14.8)
      overlayGroup = new AMap.OverlayGroup()
      infoWindow = new AMap.InfoWindow({
        isCustom: true,
        zooms: [16.4, 20],
        autoMove: false,
      })
      userMarker = new AMap.Marker({ visible: false, zIndex: 25, zooms: [16.4, 20], })
      getMapGridList()
      map.on("click", () => emit("update:editStatus", false))
      map.add(userMarker)
    })

    const getMapGridList = async () => {
      try {
        const { data, } = await props.request()
        gridNameMarkers = []
        data.forEach((item: any) => {
          drawGridPolygon(item)
          item.objectList.forEach((obj: any) => {
            drawObjPolyline(obj, item)
            obj.userList && obj.userList.forEach((user: any) => {
              drawPersonnel(user, obj, item.gridId)
            })
          })
        })
        drawMarkerCluster()
        map.add(<any>overlayGroup)
      } catch (error) {
        console.error(error)
      } finally {
        // ElMessage.closeAll()
      }
    };

    const drawGridPolygon = (data: any) => {
      const gridPolygon = new AMap.Polygon({
        path: <AMap.LngLatLike[]>data.gridPointList,
        strokeColor: data.gridColor,
        strokeOpacity: 1,
        strokeWeight: 2,
        fillOpacity: 0.2,
        fillColor: data.gridColor,
        zIndex: 10,
        bubble: true,
        extData: data,
      });
      const position = gridPolygon.getBounds()?.getCenter()

      gridNameMarkers.push({
        lnglat: [<number>position?.lng, <number>position?.lat],
        weight: 1,
        extData: data,
        polygon: gridPolygon,
      })

      gridPolygon.on("click", (e) => {
        if (e.target.getExtData().gridId !== currentInfo.gridId || props.showPanel !== "grid") {
          map.getZoom() < 17.4 && map.setFitView([e.target], false, [0, 0, 0, 0], 17.4)
          currentInfo.gridId = e.target.getExtData().gridId
          currentInfo.objectId = e.target.getExtData().objectList.length ? e.target.getExtData().objectList[0].objectId : 0
          emit("update:currentData", currentInfo)
          emit("setShowPanel", "obj")

          // 点击网格时默认选中第一个对象
          let currentObjPolyline = overlayGroup.getOverlays().filter(item => item.className === "Overlay.Polyline" && item.getExtData().objectId === currentInfo.objectId)[0]
          if (currentObjPolyline.getExtData().objectId === currentInfo.objectId) {
            infoWindow.setContent(`<div class="grid-name" style="color: ${currentObjPolyline.getExtData().objectColor};border-color: ${currentObjPolyline.getExtData().objectColor};width: ${12 * currentObjPolyline.getExtData().objectName.length}px;">
							${currentObjPolyline.getExtData().objectName}
						</div>`)
            infoWindow.open(map, currentObjPolyline.getExtData().routePointList[0], 100)
            currentObjPolyline.setOptions({ strokeOpacity: 1, })
          } else {
            currentObjPolyline.setOptions({ strokeOpacity: 0.5, })
          }
        } else {
          map.getZoom() < 17.4 && map.setFitView([e.target], false, [0, 0, 0, 0], 17.4)
        }
      })

      overlayGroup.addOverlays([gridPolygon])
      props.view !== "abnormal" && (map.getZoom() <= 14.8 ? gridPolygon.hide() : gridPolygon.show())
      map.on("zoomend", () => (map.getZoom() <= 14.8 ? gridPolygon.hide() : gridPolygon.show()))
    };

    const drawObjPolyline = (objData: any, grid: any) => {
      const objPolyline = new AMap.Polyline({
        path: <AMap.LngLatLike[]>objData.routePointList,
        strokeWeight: objData.strokeWidth,
        strokeColor: objData.objectColor,
        zIndex: 15,
        extData: { ...objData, gridId: grid.gridId, },
        cursor: "pointer",
      })

      props.view !== "abnormal" && objPolyline.on("click", (e) => {
        userMarker.hide()
        infoWindow.setContent(`<div class="grid-name" style="color: ${e.target.getExtData().objectColor};border-color: ${e.target.getExtData().objectColor};	width: ${12 * e.target.getExtData().objectName.length}px;">
        		${e.target.getExtData().objectName}
        </div>`)
        infoWindow.open(map, <any>e.target.getExtData().routePointList[0], 100)
        currentInfo.gridId = e.target.getExtData().gridId
        currentInfo.objectId = e.target.getExtData().objectId
        emit("setShowPanel", "obj")
        emit("update:currentData", currentInfo)
        // 清除所有对象高亮状态并设置单个高亮
        overlayGroup.getOverlays().filter(item => item.className === "Overlay.Polyline").forEach(item => item.setOptions({ strokeOpacity: 0.5, }))
        objPolyline.setOptions({ strokeOpacity: 1, })
        userMarker.setContent(" ")
      })

      props.view !== "abnormal" && objPolyline.on("mouseover", (e) => {
        if (currentInfo.objectId !== e.target.getExtData().objectId) {
          infoWindow.setContent(`<div class="grid-name" style="color: ${e.target.getExtData().objectColor};border-color: ${e.target.getExtData().objectColor};width: ${12 * e.target.getExtData().length}px;">
      			${e.target.getExtData().objectName}
      			</div>`)
          infoWindow.open(map, <any>objData.routePointList[0], 100)
        }
        objPolyline.setOptions({ strokeOpacity: 1, })
      })

      props.view !== "abnormal" && objPolyline.on("mouseout", (e) => {
        if (!userMarker.getVisible()) {
          if (currentInfo.objectId === 0) {
            infoWindow.close()
            objPolyline.setOptions({ strokeOpacity: 0.5, })
          }
          else if (e.target.getExtData().objectId !== currentInfo.objectId) {
            objPolyline.setOptions({ strokeOpacity: 0.5, })
            let objLine = overlayGroup.getOverlays().filter(item => (item.className === "Overlay.Polyline") && (item.getExtData().objectId === currentInfo.objectId))[0]
            infoWindow.setContent(`<div class="grid-name" 
							style="color: ${objLine ? objLine.getExtData().objectColor : e.target.getExtData().objectColor};
							border-color: ${objLine ? objLine.getExtData().objectColor : e.target.getExtData().objectColor}};
							width: ${12 * (objLine ? objLine.getExtData().objectName.length : e.target.getExtData().objectName)}px;">
							${objLine ? objLine.getExtData().objectName : e.target.getExtData().objectName}
      			</div>`)
            let lnglat = objLine ? objLine.getPath()[0] : e.target.getPath()[0]
            infoWindow.open(map, lnglat, 100)
          }
        } else if (e.target.getExtData().objectId !== currentInfo.objectId) {
          infoWindow.close()
          objPolyline.setOptions({ strokeOpacity: 0.5, })
        } else {
          infoWindow.close()
        }
      })
      map.getZoom() <= 14.8 && objPolyline.hide()
      overlayGroup.addOverlay(objPolyline)
      map.on("zoomend", () => (map.getZoom() <= 14.8 ? objPolyline.hide() : objPolyline.show()))
    }

    const drawPersonnel = (data: any, object: any, gridId: number) => {
      if(props.view === "abnormal" && data.userTrack === null) return;
      const personnelMarker = new AMap.Marker({
        map: map,
        icon: new AMap.Icon({
          size: new AMap.Size(40, 40),
          image: data.headUrl || "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/TX_19912345678.png",
          imageSize: new AMap.Size(40, 40),
        }),
        position: <any>data.userTrack || randomPointOnPolyline(object.routePointList),
        extData: { ...data, objectId: object.objectId, gridId, },
        zIndex: 15,
        offset: new AMap.Pixel(-20, -20),
        zooms: [16.4, 20],
      })

      personnelMarker.on("click", (e) => {
        currentInfo.gridId = e.target.getExtData().gridId
        currentInfo.objectId = e.target.getExtData().objectId
        currentInfo.userId = e.target.getExtData().userId
        props.view !== "plan" && emit("setShowPanel", "user")
        emit("update:editStatus", false)
        emit("update:currentData", currentInfo)

        let userContent = `<div class="grid-name" style="width: ${e.target.getExtData().userName.length * 12}px;border-color: ${object.objectColor};color: ${object.objectColor};"><em style="border-color: ${object.objectColor} transparent transparent"></em><span></span>${e.target.getExtData().userName}</div>`;
        let userAbnormalContent = `<div class="abnormal-info">
					<div class="abnormal-info-body">
						作业人员: ${e.target.getExtData().userName} （${e.target.getExtData().userType}）<br>
						作业状态: ${((e.target.getExtData().offJobStatus === 1) && "脱岗") || ((e.target.getExtData().offlineStatus === 1) && "信号丢失") || ((e.target.getExtData().onJobStatus === 1) && "在岗") || "无"} <br>
						手机号码: ${e.target.getExtData().phone}
					</div>
				</div>`;
        props.view === "abnormal" ? userMarker.setContent(userAbnormalContent) : userMarker.setContent(userContent)
        userMarker.setPosition(e.target.getPosition())
        props.view === "abnormal" ? userMarker.setOffset(new AMap.Pixel(0, 110)) : userMarker.setOffset(new AMap.Pixel(0, -25))
        userMarker.show()
        infoWindow.close()
        // 清除所有对象高亮，并点击人员高亮当前人员所在对象
        overlayGroup.getOverlays().filter(item => item.className === "Overlay.Polyline").forEach(item => item.setOptions({ strokeOpacity: 0.5, }))
        overlayGroup.getOverlays().filter(item => (item.className === "Overlay.Polyline") && (item.getExtData().objectId === e.target.getExtData().objectId))[0].setOptions({ strokeOpacity: 1, })
      })

      overlayGroup.addOverlay(personnelMarker)
      map.getZoom() <= 16.4 && personnelMarker.hide()
      map.on("zoomend", () => (map.getZoom() <= 16.4 ? personnelMarker.hide() : personnelMarker.show()))
    }

    const drawMarkerCluster = () => {
      // @ts-ignore
      cluster = new AMap.MarkerCluster(map, gridNameMarkers, {
        maxZoom: 13.68,
        renderMarker: ({ data, marker, }: { data: any, marker: AMap.Marker }) => {
          let content = `<div class="grid-name" style="color: ${data[0].extData.gridColor};border-color: ${data[0].extData.gridColor};width: ${12 * data[0].extData.gridName.length}px;">
							${data[0].extData.gridName}
						</div>`
          marker.setOffset(new AMap.Pixel(-45, -20))
          marker.setzIndex(10)

          if (data[0].polygon.getExtData().gridId === currentInfo.gridId && map.getZoom() > 16.4) {
            marker.setContent(" ")
          } else {
            marker.setContent(content)
          }

          // 点击网格时将网格名称隐藏
          overlayGroup.getOverlays().filter(overlay => (overlay.className === "Overlay.Polygon")).forEach(((item: any) => {
            item.on("click", (e: any) => {
              if (props.view !== "abnormal" && (e.target.getExtData().gridId === data[0].polygon.getExtData().gridId)) {
                marker.hide()
              } else {
                marker.show()
              }
            })
          }))
          // 点击对象时将网格名称隐藏
          overlayGroup.getOverlays().filter(overlay => (overlay.className === "Overlay.Polyline")).forEach(((item: any) => {
            item.on("click", (e: any) => {
              if (props.view !== "abnormal" && (e.target.getExtData().gridId === data[0].polygon.getExtData().gridId)) {
                marker.hide()
              } else {
                marker.show()
              }
            })
          }))
          // 点击人员时将网格名称隐藏
          overlayGroup.getOverlays().filter(overlay => (overlay.className === "AMap.Marker")).forEach(((item: any) => {
            item.on("click", (e: any) => {
              if (props.view !== "abnormal" && (e.target.getExtData().gridId === data[0].polygon.getExtData().gridId)) {
                marker.hide()
              } else {
                marker.show()
              }
            })
          }))

          marker.on("mouseover", () => {
            marker.setzIndex(13);
            (map.getZoom() <= 14.8) && data[0].polygon.show()
          })
          marker.on("mouseout", () => {
            marker.setzIndex(12);
            (map.getZoom() <= 14.8) && data[0].polygon.hide()
          })
          marker.on("click", () => {
            map.setFitView([marker], false, [0, 0, 0, 0], 17.4)
          })
        },
      })
      cluster.on("click", ({ clusterData, marker, }: { clusterData: any, marker: any }) => {
        if (clusterData.length > 1) {
          let southWest = [0, 0]
          let northEast = [0, 0]
          clusterData.forEach(({ lnglat, }: { lnglat: { lng: number, lat: number } }, index: number) => {
            let { lng, lat, } = lnglat;
            if (index === 0) {
              northEast[1] = lat
              southWest[1] = lat
              southWest[0] = lng
              northEast[0] = lng
            } else {
              if (lat > northEast[1]) {
                northEast[1] = lat
              } else if (lat < southWest[1]) {
                southWest[1] = lat
              }
              if (lng > northEast[0]) {
                northEast[0] = lng
              } else if (lng < southWest[0]) {
                southWest[0] = lng
              }
            }
          })
          let bounds = new AMap.Bounds(southWest, northEast)
          let res = map.getFitZoomAndCenterByBounds(bounds)

          map.setZoomAndCenter(res[0] - 1, res[1]);
        } else {
          let zoom = map.getZoom();
          if (zoom < 14) {
            map.setZoomAndCenter(14, marker.getPosition());
          }
        }
      })
    }

    const getGridFocus = (data: any) => {
      let gridPolygons = overlayGroup.getOverlays().filter(item => (item.className === "Overlay.Polygon"))
      let objPolylines = overlayGroup.getOverlays().filter(item => (item.className === "Overlay.Polyline"))
      gridPolygons.forEach(grid => {
        grid.setOptions({ zIndex: 10, })
        if (grid.getExtData().gridId === data.gridId) {
          grid.setOptions({ zIndex: 11, })
          let res = map.getFitZoomAndCenterByBounds(<any>grid.getBounds())
          if (res[0] >= 17.4) {
            map.setZoomAndCenter(17.4, res[1])
          } else if (res[0] <= 14.8) {
            map.setZoomAndCenter(14.9, res[1])
          } else {
            map.setZoomAndCenter(res[0], res[1]);
          }
        }
      })
      objPolylines.forEach(item => {
        item.setOptions({ zIndex: 10, })
        item.getExtData().gridId === data.gridId && item.setOptions({ zIndex: 11, })
      })
    }

    const getUserFocus = (userData: any) => {
      let currentUser = overlayGroup.getOverlays().filter(item => item.className === "AMap.Marker" && item.getExtData().userId === userData.userId)[0]
      if (!currentUser) return
      map.setFitView([currentUser], false, [0, 0, 0, 0], 17.4)
    }

    // 重绘网格、对象、人员
    const reloadGrid = () => {
      overlayGroup.clearOverlays()
      cluster.setMap(null)
      userMarker.hide()
      getMapGridList()
    }

    // 重绘人员
    const reloadUserMarker = async () => {
      let userMarkers = overlayGroup.getOverlays().filter(item => (item.className === "AMap.Marker"))
      overlayGroup.removeOverlays(userMarkers)
      const { data, } = await props.request()
      data.forEach((item: any) => {
        item.objectList.forEach((obj: any) => {
          obj.userList && obj.userList.forEach((user: any) => {
            drawPersonnel(user, obj, item.gridId)
          })
        })
      })
    }

    watch(() => currentInfo.gridId, (val: any) => {
      // 将网格和对象的层级提高，减少误触的情况
      overlayGroup.getOverlays().forEach(item => {
        if (item.className === "Overlay.Polygon") {
          item.setOptions({ zIndex: 10, })
          item.getExtData().gridId === val && item.setOptions({ zIndex: 40, })
        }
        if (item.className === "Overlay.Polyline") {
          item.setOptions({ zIndex: 20, })
          item.getExtData().gridId === val && item.setOptions({ zIndex: 50, })
        }
      })
    })

    return {
      mapRef,
      reloadGrid,
      reloadUserMarker,
      getGridFocus,
      getUserFocus,
    }
  },
})
</script>
<style lang='less'>
.home-page-map {
	height: calc(100vh - 160px);
	
	.grid-name {
		max-width: 72px;
		font-size: 12px;
		font-weight: 500;
		background-color: #FFFFFF;
		border: 2px solid;
		border-radius: 5px;
		padding: 5px;
		overflow: hidden;

		em {
			display: block;
			border-width: 8px;
			position: absolute;
			bottom: -15px;
			left: 15px;
			border-style: solid dashed dashed;
			border-color: blue transparent transparent;
			font-size: 0;
			line-height: 0;
		}

		span {
			display: block;
			border-width: 8px;
			position: absolute;
			bottom: -12px;
			left: 15px;
			border-style: solid dashed dashed;
			border-color: #FFF transparent transparent;
			font-size: 0;
			line-height: 0;
		}
	}

	.abnormal-info {
		width: 326px;
		background-color: #fff;
		box-shadow: 0px 1px 4px 2px rgba(0, 0, 0, 0.11);

		&-header {
			background: #FCFCFC;
			border-bottom: 1px solid #F2F3F4;
			padding: 10px 16px;
			color: #333333;
			font-weight: 500;
		}

		&-body {
			padding: 16px;
			line-height: 20px;
			font-size: 14px;
			font-weight: 400;
			color: #181B28;
		}
	}

	.amap-info-close {
		display: none;
	}

	.amap-icon {
		width: 40px !important;
		height: 40px !important;
		border-radius: 50% 50%;

		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
