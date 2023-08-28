<template>
  <default-layout class="data-dashboard-root">
    <div
      ref="mapRef"
      class="data-dashboard"
    >
      <div class="data-dashboard--top-panel">
        <div class="data-dashboard--top-panel__left">
          <img
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/data-dashboard/arrow-right.png"
            alt=""
          >
          <span>{{ getTopPanelLeftText }}</span>
        </div>
        <div class="data-dashboard--top-panel__right">
          <img
            v-show="isUserRole"
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/data-dashboard/location.png"
            alt=""
            height="31"
          >
          <span>{{ getTopPanelRightText }}</span>
        </div>
      </div>
      <div class="data-dashboard--bottom-panel">
        <div class="data-dashboard--bottom-panel__left">
          <div class="data-dashboard--bottom-panel__left-title">
            <el-icon
              color="#05F2FF"
              size="21"
            >
              <UserFilled />
            </el-icon>
            <span>数据统计</span>
          </div>
          <div class="data-dashboard--bottom-panel__left-body">
            <div class="data-dashboard--bottom-panel__left-body--amount">
              <div class="data-dashboard--bottom-panel__left-body--amount-title">
                {{ getAmountTitle }}
              </div>
              <div class="data-dashboard--bottom-panel__left-body--amount-content">
                {{ getAmountContent }}
              </div>
            </div>
            <div class="data-dashboard--bottom-panel__left-body--count">
              <div class="data-dashboard--bottom-panel__left-body--count-title">
                {{ getCountTitle }}
              </div>
              <div class="data-dashboard--bottom-panel__left-body--count-content">
                {{ getCountContent }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="isUserRole"
          class="data-dashboard--bottom-panel__right"
        >
          <div
            ref="thumbnailRef"
            class="data-dashboard--bottom-panel__right-map"
          />
        </div>
      </div>
    </div>
  </default-layout>
</template>
<script lang="ts">
import { mesIndexQueryIndexDataBoard } from "@/api/mes/indexController";
import { mesProjectQueryProjectSelectList } from "@/api/mes/projectController";
import { DefaultLayout } from "@/layout";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import formatMoney from "@/utils/formatMoney";
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { computed, defineComponent, onMounted, ref } from "vue";
import china from "./china.json";

export default defineComponent({
  name: "DataDashboard",
  components: {
    DefaultLayout,
  },
  setup () {
    const project = useProject();
    const userInfo = useUserInfo();
    const mapRef = ref<HTMLDivElement | null>(null);
    const thumbnailRef = ref<HTMLDivElement | null>(null);
    const projectList = ref<MES.ProjectSelectDTO[]>([]);
    const projectPeopleTotal = ref<number>(0);
    const projectCostTotal = ref<number>(0);
    const contractAmount = ref<string>("");
    const city = ref();

    let map: AMap.Map;
    let thumbnailMap: AMap.Map;
    // @ts-ignore
    let geocoder:AMap.Geocoder;
    let projectMarkers: AMap.Marker[] = []; 
    let projectGrids: AMap.Polygon[] = [];
    let projectOverlay: AMap.OverlayGroup;
    let boundary: AMap.Polyline[] = [];
    let projectGrid: AMap.Polygon;
    let projectMarker: AMap.Marker;
    let thumbnailMarker: AMap.Marker; 
    let thumbnailBoundary: AMap.Polyline[] = [];
    // @ts-ignore
    let cluster: AMap.MarkerCluster;
    let markerCluster: { lnglat: number[], weight: number, extData: object }[]



    onMounted(async () => {
      await lazyAMapApiLoaderInstance;
      china.forEach((boundarie) => {
        boundary.push(new AMap.Polyline({
          // @ts-ignore
          path: <AMap.LngLatLike[]>boundarie,
          strokeColor: "#42A8DD",
          strokeWeight: 6,
        }));
        thumbnailBoundary.push(new AMap.Polyline({
          // @ts-ignore
          path: <AMap.LngLatLike[]>boundarie,
          strokeColor: "#42A8DD",
          strokeWeight: 1,
        }));
      });
      
      map = new AMap.Map(mapRef.value as HTMLDivElement, {
        mapStyle: "amap://styles/darkblue",
      });
      map.add(boundary);

      thumbnailMap = new AMap.Map(thumbnailRef.value as HTMLDivElement, {
        mapStyle: "amap://styles/darkblue",
        zoom: 1,
        zoomEnable: false,
        dragEnable: false,
        rotateEnable: false,
        keyboardEnable: false,
        doubleClickZoom: false,
        scrollWheel: false,
      });
      thumbnailMap.add(thumbnailBoundary);

      // @ts-ignore
      geocoder = new AMap.Geocoder();
			
      projectOverlay = new AMap.OverlayGroup();
      await remoteProject();
      drawGrid();
      await getProjectByOverview();
      if (!isUserRole.value) {
        map.on("zoomend", () => {
          const zoom = map.getZoom();
          if (zoom < 10.8) {
            projectOverlay.hide();
          }else {
            projectOverlay.show();
          }
        });
      }
    });

	 const isUserRole = computed(() => {
      const roleCode = project.$state.roleCode;
      return !roleCode?.includes("BLOC_ADMIN") && !roleCode?.includes("ADMIN");
    });

    const getTopPanelLeftText = computed(() => {
      if (isUserRole.value) {
        return project.$state.projectName + "区域分布图";
      } else {
        return userInfo.$state.tenantName;
      }
    })

    const getTopPanelRightText = computed(() => {
      if (isUserRole.value) {
        return city.value;
      } else {
        return "全国项目分布图";
      }
    })

    const	getAmountTitle = computed(() => {
      if (isUserRole.value) {
        return "项目金额（元）";
      } else {
        return "项目总金额（元）";
      }
    })
		
    const getAmountContent = computed(() => {
      if (isUserRole.value) {
        const amount = parseInt(contractAmount.value);
        return formatMoney(isNaN(amount) ? 0 : amount);
      } else {
        return formatMoney(2837520000);
      }
    })

    const getCountTitle = computed(() => {
      if (isUserRole.value) {
        return "项目人数（人）";
      } else {
        return "项目数（个）";
      }
    })

    const getCountContent = computed(() => {
      if (isUserRole.value) {
        return projectPeopleTotal;
      } else {
        return projectList.value.length;
      }
    })

    const getAddress = (routePointList:any) => {
      return new Promise((resolve, reject) => {
        geocoder.getAddress(routePointList, function(status:any, result:any) {
          if (status === "complete" && result.info === "OK") {					
            const addr = result.regeocode.addressComponent.city;
            resolve(addr);
          } else {
            reject();
          }
        });
      });
    };

    const remoteProject = async () => {
      try {
        let { data, } = await mesProjectQueryProjectSelectList({});
        projectList.value = data;
      } catch (error) {
        
      }
    };

    const getProjectByOverview = async () => {
      try {
        let { data, } = await mesIndexQueryIndexDataBoard({projectId: project.$state.projectId,});
        projectPeopleTotal.value = data.projectPeopleTotal;
        projectCostTotal.value = data.projectCostTotal;
      }catch (error) {}
    };

    const drawGrid = async () => {
      thumbnailMarker && thumbnailMap.remove(thumbnailMarker);
      projectMarkers && map.remove(projectMarkers);
      projectGrids && map.remove(projectGrids);
      projectGrid &&  map.remove(projectGrid);
      projectMarker && map.remove(projectMarker);
      projectOverlay.clearOverlays();
			
      if (!isUserRole.value) {
        projectGrids = projectList.value.map((item) => {
          const polygon = new AMap.Polygon({
          // @ts-ignore
            path: item.electronicFenceList,
            strokeColor: "#42A8DD",
            strokeWeight: 2,
            fillColor: "#42A8DD",
            fillOpacity: 0.2,
            extData: item,
          });
          return polygon;
        });
        projectOverlay.addOverlays(projectGrids);
        // projectMarkers = projectList.value.map((item) => {
        //   const marker = new AMap.Marker({
        //   // @ts-ignore
        //     position: [item.longitude, item.latitude],
        //     title: item.projectName,
        //     icon: new AMap.Icon({
        //       image: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/public/img_v2_icon.png",
        //       size: new AMap.Size(30, 35),
        //       imageSize: new AMap.Size(30, 35),
        //     }),
        //     anchor: "bottom-center",
        //     extData: item,
        //   });
        //   marker.on("click", (e) => {
        //     const extData = e.target.getExtData() as MES.ProjectSelectDTO;
        //     const grid = projectOverlay.getOverlays().find((item) => {
        //       return item.getExtData().projectId === extData.projectId;
        //     }) as AMap.Polygon;
        //     // @ts-ignore
        //     map.setFitView(grid);
        //   });
        //   return marker;
        // });
        // map.add(projectMarkers);
        // @ts-ignore
        map.add(projectOverlay);
        map.setCenter([108.004675, 37.248507]);
        map.setZoom(5);
        drawMarkerCluster()
      } else {
        projectList.value.map(async (item) => {
          if (item.projectId === project.$state.projectId) {
            contractAmount.value = item.contractAmount;
            projectGrid = new AMap.Polygon({
              // @ts-ignore
              path: item.electronicFenceList,
              strokeColor: "#42A8DD",
              strokeWeight: 2,
              fillColor: "#42A8DD",
              fillOpacity: 0.2,
              extData: item,
            });
            projectMarker = new AMap.Marker({
              // @ts-ignore
              position: [item.longitude, item.latitude],
              title: item.projectName,
              icon: new AMap.Icon({
                image: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/public/img_v2_icon.png",
                size: new AMap.Size(30, 35),
                imageSize: new AMap.Size(30, 35),
              }),
              anchor: "bottom-center",
              extData: item,
            });
            projectMarker = new AMap.Marker({
              // @ts-ignore
              position: [item.longitude, item.latitude],
              title: item.projectName,
              icon: new AMap.Icon({
                image: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/public/img_v2_icon.png",
                size: new AMap.Size(30, 35),
                imageSize: new AMap.Size(30, 35),
              }),
              anchor: "bottom-center",
              extData: item,
            });
            thumbnailMarker = new AMap.Marker({
              // @ts-ignore
              position: [item.longitude, item.latitude],
              title: item.projectName,
              icon: new AMap.Icon({
                image: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/public/img_v2_icon.png",
                size: new AMap.Size(30, 35),
                imageSize: new AMap.Size(30, 35),
              }),
              anchor: "bottom-center",
              extData: item,
            });
            city.value = await getAddress(projectGrid.getBounds()?.getCenter());
						
            map.add(projectGrid);
            map.add(projectMarker);
            map.setFitView([projectGrid]);
            thumbnailMap.add(thumbnailMarker);
          }
        });
      }
    };

    const drawMarkerCluster = () => {
      markerCluster = projectGrids.map((item) => {
        return {
          lnglat: [item.getExtData().longitude, item.getExtData().latitude],
          weight: 1,
          extData: item.getExtData(),
        }
      })
			
      // @ts-ignore
      cluster = new AMap.MarkerCluster(map, markerCluster, {
        maxZoom: 6,
        renderMarker: ({ data,marker, }: { data: any, marker: AMap.Marker }) => {
          marker.setOffset(new AMap.Pixel(-45, -20))
          marker.setzIndex(10)
          marker.setIcon(new AMap.Icon({
            image: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/public/img_v2_icon.png",
            size: new AMap.Size(30, 35),
            imageSize: new AMap.Size(30, 35),
          }))
          marker.setTitle(data[0].extData.projectName)
					

          marker.on("click", () => {
            map?.setFitView([marker])
          })
        },
      })
      cluster.on("click", ({ clusterData, }: { clusterData: any, marker: any }) => {
        let markers:any[] = [];
        clusterData.forEach(({ lnglat, }: { lnglat: { lng: number, lat: number } }) => {
          markers.push(new AMap.Marker({
            // @ts-ignore
            position: [lnglat.lng, lnglat.lat],
            icon: new AMap.Icon({
              image: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/public/img_v2_icon.png",
              size: new AMap.Size(30, 35),
              imageSize: new AMap.Size(30, 35),
            }),
            anchor: "bottom-center",
            extData: lnglat,
          }))
        })
        map.setFitView(markers, false, [100, 100, 100, 100],13)
      })
    }


    return {
      formatMoney,
      isUserRole,
      getTopPanelLeftText,
      getTopPanelRightText,
      getAmountTitle,
      getAmountContent,
      getCountTitle,
      getCountContent,
      mapRef,
      thumbnailRef,
      userInfo,
      project,
      projectList,
      projectPeopleTotal,
      projectCostTotal,
      contractAmount,
      city,
    }
  },
})
</script>
<style lang="less">
.data-dashboard-root .layout-content-inside {
  padding: 0;
}
.data-dashboard {
	min-height: calc(100vh - 112px);
	width: 100%;
	position: relative;

	&--top-panel {
		width: 100%;
		height: 53px;
		background: linear-gradient(90deg, #21649C 0%, rgba(27,53,84,0) 83%, #205D92 100%);
		position: absolute;
		z-index: 1;
		border-left: 5px solid #2AFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&__left {
			font-size: 20px;
			color: #2AFFFF;
			display: flex;
			align-items: center;
			margin-left: 15px;

			span {
				padding-left: 12px;
			}
		}

		&__right {
			font-size: 14px;
			font-weight: 500;
			color: #D8F0FF;
			display: flex;
			align-items: center;
			margin-right: 26px;
		}
	}

	&--bottom-panel {
		width: 100%;
		position: absolute;
		bottom: 0;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&__left {
			margin-left: 34px;

			&-title {
				font-size: 20px;
				color: #05F2FF;
				display: flex;
				align-items: center;
				margin-bottom: 22px;

				span {
					padding-left: 15px;
				}
			}

			&-body {
				display: flex;
				margin-bottom: 34px;

				&--amount {
					width: 176px;
					height: 56px;
					background: linear-gradient(90deg, rgba(1,196,236,0.5) 0%, rgba(1,196,236,0.01) 100%);
					border-left: 4px solid #01C4EC;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					padding-left: 13px;
					margin-right: 28px;

					&-title {
						font-size: 14px;
						color: #99B3C8;
					}

					&-content {
						font-size: 20px;
						color: #B0D8F5;
					}
				}

				&--count {
					width: 176px;
					height: 56px;		
					background: linear-gradient(90deg, rgba(17,112,221,0.5) 0%, rgba(17,112,221,0.01) 100%);
					border-left: 4px solid #1170DD;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					padding-left: 13px;

					&-title {
						font-size: 14px;
						color: #99B3C8;
					}

					&-content {
						font-size: 20px;
						color: #B0D8F5;
					}
				}
			}
		}

		&__right {
			width: 362px;
			height: 320px;
			position: absolute;
			right: 0;
			z-index: 1;
			box-shadow: 1px 0px 9px 1px #02E1FF;

			&-map {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
