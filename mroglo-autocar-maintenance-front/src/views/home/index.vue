<template>
  <div class="dashboard-home">
    <div
      ref="mapRef"
      class="dashboard-home-map"
    >
      <div class="dashboard-home-area">
        <div class="home-area-header">
          <p class="area-header-name">
            区域名称
          </p>
          <p class="area-header-quantity">
            车辆数目(辆)
          </p>
        </div>
        <ul class="home-area-body">
          <li
            v-for="item in areaData"
            :key="item.workAreaCode"
            class="home-area-item"
          >
            <p class="area-item-name">
              {{ item.workAreaName }}
            </p>
            <p class="area-item-quantity">
              {{ item.total }}
            </p>
          </li>
        </ul>
      </div>
      <div
        ref="carInfoWindowRef"
        class="car-info-window"
        :class="carInfoWindowVisible?'car-info-window-visible':''"
      >
        <div class="car-info">
          <p class="car-info-num">
            NSQ003
          </p>
          <img
            src="https://img.gejiba.com/images/3502b42aa726d45e4ca01500e94402b4.png"
            alt="video"
            class="car-info-video"
            @click="showVideoVisible = true"
          >
          <p class="car-info-work">
            静止
          </p>
        </div>
        <div class="car-extra">
          <p class="car-extra-area">
            福田区
          </p>
          <p class="car-extra-mileage">
            566778km
          </p>
        </div>
        <div class="car-state">
          <div class="car-state-item">
            <p class="car-state-item-value">
              49%
            </p>
            <div class="car-state-item-name">
              <img
                src="@/assets/icons/garage/icon-electricity.webp"
                alt=""
                class="car-state-item-icon"
              >
              电量
            </div>
          </div>
          <div class="car-state-item">
            <p class="car-state-item-value">
              64%
            </p>
            <div class="car-state-item-name">
              <img
                src="@/assets/icons/garage/icon-water.webp"
                alt=""
                class="car-state-item-icon"
              >
              水量
            </div>
          </div>
          <div class="car-state-item">
            <p class="car-state-item-value">
              81%
            </p>
            <div class="car-state-item-name">
              <img
                src="@/assets/icons/garage/icon-delete.webp"
                alt=""
                class="car-state-item-icon"
              >
              垃圾箱
            </div>
          </div>
        </div>
      </div>
      <div
        class="car-video-window"
        :class="showVideoVisible?'--visible':''"
      >
        <div class="car-video-window-header">
          <icon-close
            style="color: #040000;"
            class="window-header-close"
            @click="showVideoVisible = false"
          />
        </div>
        <div class="car-video-window-body">
          <img
            src="https://mms2.baidu.com/it/u=1409222652,2482163394&fm=253&app=138&f=JPEG&fmt=auto&q=75"
            alt=""
            class="window-body-play"
          >
          <ul class="window-body-direction">
            <li
              class="window-body-direction-item"
              :class="currentDirection === 'top'?'--active':''"
              @click="currentDirection = 'top'"
            >
              <icon-to-top />
            </li>
            <li
              class="window-body-direction-item"
              :class="currentDirection === 'bottom'?'--active':''"
              @click="currentDirection = 'bottom'"
            >
              <icon-to-bottom />
            </li>
            <li
              class="window-body-direction-item"
              :class="currentDirection === 'left'?'--active':''"
              @click="currentDirection = 'left'"
            >
              <icon-to-left />
            </li>
            <li
              class="window-body-direction-item"
              :class="currentDirection === 'right'?'--active':''"
              @click="currentDirection = 'right'"
            >
              <icon-to-right />
            </li>
          </ul>
        </div>
        <ul class="car-video-window-footer">
          <li
            class="window-footer-item"
            :class="currentPie === 1?'--active':''"
            @click="currentPie = 1"
          >
            <img
              :src="currentPie === 1?'https://img.gejiba.com/images/3502b42aa726d45e4ca01500e94402b4.png':'https://img.gejiba.com/images/6261c9d131c164fb85a3812c926acc6c.png'"
              alt=""
              class="window-footer-item-icon"
            >
            <p class="window-footer-item-name">
              01
            </p>
          </li>
          <li
            class="window-footer-item"
            :class="currentPie === 2?'--active':''"
            @click="currentPie = 2"
          >
            <img
              :src="currentPie === 2?'https://img.gejiba.com/images/3502b42aa726d45e4ca01500e94402b4.png':'https://img.gejiba.com/images/6261c9d131c164fb85a3812c926acc6c.png'"
              alt=""
              class="window-footer-item-icon"
            >
            <p class="window-footer-item-name">
              02
            </p>
          </li>
          <li
            class="window-footer-item"
            :class="currentPie === 3?'--active':''"
            @click="currentPie = 3"
          >
            <img
              :src="currentPie === 3?'https://img.gejiba.com/images/3502b42aa726d45e4ca01500e94402b4.png':'https://img.gejiba.com/images/6261c9d131c164fb85a3812c926acc6c.png'"
              alt=""
              class="window-footer-item-icon"
            >
            <p class="window-footer-item-name">
              03
            </p>
          </li>
          <li
            class="window-footer-item"
            :class="currentPie === 4?'--active':''"
            @click="currentPie = 4"
          >
            <img
              :src="currentPie === 4?'https://img.gejiba.com/images/3502b42aa726d45e4ca01500e94402b4.png':'https://img.gejiba.com/images/6261c9d131c164fb85a3812c926acc6c.png'"
              alt=""
              class="window-footer-item-icon"
            >
            <p class="window-footer-item-name">
              04
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { queryMapStatiDataUsingGET } from "@/api/shouyeguanli";
import "@amap/amap-jsapi-types";
import { IconClose, IconToBottom, IconToLeft, IconToRight, IconToTop } from "@arco-design/web-vue/es/icon";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import type { Ref } from "vue";
import { defineComponent, onMounted, ref } from "vue";
import area from "./area.json";
import boundaries from "./boundaries.json";
import geo from "./geo.json";
import lnglats from "./lnglats.json";

export default defineComponent({
  name: "DashboardHome",
  components: {
    IconClose,
    IconToTop,
    IconToBottom,
    IconToLeft,
    IconToRight,
  },
  setup () {
    let map:AMap.Map;
    const mapRef:Ref<HTMLDivElement | string> = ref<HTMLDivElement | string>("");
    const carInfoWindowRef:Ref<HTMLElement | undefined> = ref<HTMLElement>();
    const carInfoWindowVisible:Ref<boolean> = ref<boolean>(false);
    const areaData:Ref<{workAreaCode:string,workAreaName:string,total:number}[]> = ref<{workAreaCode:string,workAreaName:string,total:number}[]>(area);
    const showVideoVisible:Ref<boolean> = ref<boolean>(false);
    const currentDirection:Ref<"top" | "bottom" | "left" | "right"> = ref<"top" | "bottom" | "left" | "right">("top");
    const currentPie:Ref<number> = ref<number>(1);
    let geoOverlayGroup:AMap.OverlayGroup;
    let cluster:AMap.Marker;
    let carInfoWindow:AMap.InfoWindow;

    onMounted( async() => {
      await lazyAMapApiLoaderInstance
      const mask:any[] = [];
      const line:AMap.Polyline[] = [];
      boundaries.forEach((boundarie) => {
        mask.push([boundarie]);
        line.push(new AMap.Polyline({
          path: <AMap.LngLatLike[]>boundarie,
          strokeColor: "#42A8DD",
          strokeWeight: 4,
        }));
      });
      map = new AMap.Map(mapRef.value, {
        center: [114.194481, 22.625508],
        mask,
        showBuildingBlock: true,
        showIndoorMap: true,
        viewMode: "3D",
        showLabel: true,
        rotateEnable: false,
        pitchEnable: true,
        doubleClickZoom: false,
        jogEnable: true,
        dragEnable: true,
        pitch: 40,
        mapStyle: "amap://styles/dark",
        backgroundColor: "transparent",
      });
      map.add(line)
      getAreaData()
      drawGeoMarker()
      drawCarInfoWindow()
      drawGeoOverla()
    });

    const drawGeoOverla = () => {
      const overlays:AMap.Polygon[] = [];
      geo.features.forEach(feature => {
        const lnglats = feature.geometry.coordinates;
        const { name, adcode, center, } = feature.properties;
        const polygon = new AMap.Polygon({
          path: <AMap.LngLatLike[][][]>lnglats,
          fillOpacity: 0,
          strokeColor: "#42A8DD",
          strokeWeight: 1,
          fillColor: "#1C6BE9",
          cursor: "pointer",
          extData: {
            name,
            adcode,
            center,
          },
          zIndex:-1,
        });
        overlays.push(polygon);
      });
      geoOverlayGroup = new AMap.OverlayGroup(overlays);
      map.add(<any>geoOverlayGroup)
    }

    const drawGeoMarker = () => {
      let markers:{lnglat:number[],weight:number}[] = []
      lnglats.forEach(item => {
        markers.push({
          lnglat: item,
          weight: 1,
        })
      })
      // @ts-ignore
      cluster = new AMap.MarkerCluster(map, markers,{
        renderMarker:({marker,}:{marker:AMap.Marker}) => {					
          let zoom = map.getZoom() - 1;
          var icon = new AMap.Icon({
            size: [2.3 * zoom,2.6 * zoom],
            image: "https://img.gejiba.com/images/f1b5329ced78294c602eca7b6c8b4d1e.png",
            imageSize: [2.3 * zoom,2.6 * zoom],
          })
          marker.setIcon(icon)
        },
      });
      cluster.on("click", ({ clusterData,marker, }) => {
        if (clusterData.length > 1) {
          let southWest = [0, 0]
          let northEast = [0, 0]
          clusterData.forEach(({ lnglat, }:{lnglat:{lng:number,lat:number}}, index:number) => {
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
          map.setZoomAndCenter(res[0], res[1]);
        } else {
          let zoom = map.getZoom();
          if (zoom < 14) {
            map.setZoomAndCenter(14, marker.getPosition());
          }
          carInfoWindowVisible.value = true
          carInfoWindow.open( map, marker.getPosition(), 0)
        }
      })
      let maxCluster = 0,maxClusterMarker = map.getAllOverlays("marker").at(0)
      map.getAllOverlays("marker").forEach((marker) => {
        let inner = parseInt(marker.getContent().innerText)
        if (inner > maxCluster) {
          maxCluster = inner
          maxClusterMarker = marker
        }
      })
      maxClusterMarker.emit("click")
    }

    const drawCarInfoWindow = () => {
      console.log(window.innerWidth)
      carInfoWindow = new AMap.InfoWindow({
        content: carInfoWindowRef.value,
        anchor: "middle-left",
        offset: [32, window.innerWidth >= 1920?-20:-70],
        closeWhenClickMap: true,
      });
    }

    const getAreaData =async () => {
      try {
        let {data,} = await queryMapStatiDataUsingGET()
        data.forEach(item => {
          let areaItem = areaData.value.find(({workAreaCode,}) => workAreaCode === item.workAreaCode)
          if (areaItem) {
            areaItem.total = item.total
          }
        })
      } catch (error) {
				
      }
    }

    return {
      mapRef,
      carInfoWindowRef,
      carInfoWindowVisible,
      areaData,
      showVideoVisible,
      currentDirection,
      currentPie,
    };
  },
});
</script>
<style lang="less">
.dashboard-home {
	background-image: url('@/assets/images/map-bg.png');
}
.dashboard-home-map {
	height: calc(100vh - 64px);
	background-image: none;
	position: relative;
}
.dashboard-home-area {
	width: 230px;
	position: absolute;
	bottom: 24px;
	left: 24px;
	box-shadow:  0 2px 12px 0 rgba(0,0,0,0.1);
	z-index: 9;
}
.home-area-header {
	height: 34px;
	padding: 0 16px;
	background-color: #181A1F;
	display: flex;
	align-items: center;
	justify-content: space-between;

	p {
		flex: 1;
		font-size: 14px;
		font-family: PingFang ;
		font-weight: normal;
		line-height: 20px;
		color: rgba(255,255,255,0.7);
	}
}
.home-area-body {
	height: 140px;
	padding: 8px 0;
	background-color: #20232B;
	overflow-y: auto;

	&::-webkit-scrollbar{
		display: none;
	}
}
.home-area-item {
	height: 32px;
	padding: 0 16px;
	display: flex;
	align-items: center;
	cursor: pointer;

	p {
		flex: 1;
		font-size: 14px;
		color: rgba(255,255,255,0.6);
	}
}
.car-info-window {
	width: 174px;
	display: none;
	padding: 0 6px;

	.car-info {
		display: flex;
		justify-content: space-between;

		&-num {
			font-size: 14px;
			color: #000;
			line-height: 16px;
		}

		&-video {
			width: 18px;
			height: 14px;
			cursor: pointer;
		}

		&-work {
			height: 16px;
			padding: 0 6px;
			background-color: #d8d8d8;
			border-radius: 8px;
			color: #333;
			font-size: 12px;
			line-height: 16px;
		}
	}

	.car-extra {
		display: flex;
		font-size: 12px;
		color: #666;
		line-height: 12px;
		margin-top: 8px;
		
		&-area {
			padding-right: 8px;
			border-right: 1px solid #D6D6D6;
		}

		&-mileage {
			padding-left: 8px;
		}
	}

	.car-state {
		display: flex;
		justify-content: space-between;
		margin: 16px 0;

		&-item-value {
			font-size: 20px;
			line-height: 20px;
			margin-bottom: 8px;
			color: #333;
		}

		&-item-name {
			height: 12px;
			font-size: 12px;
			color: #333;
			line-height: 12px;
		}

		&-item-icon {
			height: 12px;
			margin-right: 3px;
		}
	}
}

.car-info-window-visible {
	display: flex;
	flex-direction: column;
}

.car-video-window {
	width: 550px;
	border-radius: 5px;
	display: none;
	background-color: #fff;
	position: absolute;
	top: calc(50% - 145px);
	left: calc(50% - 275px);
	z-index: 2;

	&.--visible {
		display: block;
	}

	&-header {
		padding: 10px;
		display: flex;
		justify-content: end;

		.window-header-close {
			color: #040000;
			cursor: pointer;
		}
	}

	&-body {
		height: 216px;
		border-radius: 8px;
		padding: 0 10px;
		position: relative;

		.window-body-play {
			width: 100%;
			height: 216px;
			border-radius: 8px;
		}

		.window-body-direction {
			width: 30px;
			height: 100px;
			border-radius: 3px;
			box-shadow: 0 4px 8px 0 rgba(13,74,106,0.4);
			background-color: #fff;
			overflow: hidden;
			position: absolute;
			top: 22px;
			left: 20px;

			&-item {
				width: 30px;
				height: 25px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;

				&.--active {
					background-color: rgba(95,178,247,0.29);

					.arco-icon {
						color: #5FB2F7;
					}
				}
			}

			.arco-icon {
				font-size: 14px;
				color: #040000;
			}
		}
	}

	&-footer {
		padding: 10px;
		display: flex;
		justify-content: space-evenly;

		.window-footer-item {
			display: flex;
			align-items: center;
			gap: 4px;
			cursor: pointer;

			&.--active {
				.window-footer-item-name {
					color: #5FB2F7;
				}
			}

			&-icon {
				width: 26px;
			}

			&-name {
				font-size: 12px;
				color: #7B7B7B;
			}
		}
	}
}

@media only screen and (min-width: 1920px)  {
	.car-video-window {
		width: 648px;
		top: calc(50% - 180px);
		left: calc(50% - 324px);

		&-header {
			padding: 16px 20px 10px 20px;
			display: flex;
			justify-content: end;

			.window-header-close {
				color: #040000;
				cursor: pointer;
			}
		}

		&-body {
			height: 260px;
			border-radius: 14px;
			padding: 0 20px;

			.window-body-play {
				width: 100%;
				height: 260px;
				border-radius: 14px;
			}

			.window-body-direction {
				width: 45px;
				height: 180px;
				border-radius: 10px;
				box-shadow: 0 3px 43px 0 rgba(0,0,0,0.14);
				display: flex;
				flex-direction: column;
				overflow: hidden;
				position: absolute;
				top: 40px;
				left: 30px;

				&-item {
					width: 100%;
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;

					&.--active {
						background-color: rgba(95,178,247,0.29);

						.arco-icon {
							color: #5FB2F7;
						}
					}
				}

				.arco-icon {
					font-size: 16px;
					color: #040000;
				}
			}
		}

		&-footer {
			padding: 17px 20px;
			display: flex;
			justify-content: space-evenly;

			.window-footer-item {
				display: flex;
				align-items: center;
				gap: 4px;
				cursor: pointer;

				&.--active {
					.window-footer-item-name {
						color: #5FB2F7;
					}
				}

				&-icon {
					width: 34px;
				}

				&-name {
					font-size: 16px;
					color: #7B7B7B;
				}
			}
		}
		
	}

	.amap-info-content {
		padding: 0;
	}

	.car-info-window {
		width: 506px;
		height: 267px;
		display: none;
		padding: 0 30px;
		box-sizing: border-box;

		.car-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 24px;

			&-num {
				font-size: 32px;
				color: #000;
				line-height: 44px;
			}

			&-video {
				width: 44px;
				height: 34px;
				cursor: pointer;
			}

			&-work {
				height: 32px;
				padding: 0px 18px;
				background-color: #d8d8d8;
				border-radius: 24px;
				color: #333;
				font-size: 20px;
				line-height: 32px;
			}
		}

		.car-extra {
			display: flex;
			font-size: 20px;
			color: #666;
			line-height: 28px;
			margin-top: 8px;
			
			&-area {
				padding-right: 14px;
				border-right: 2px solid #D6D6D6;
			}

			&-mileage {
				padding-left: 14px;
			}
		}

		.car-state {
			display: flex;
			justify-content: space-between;
			margin: 25px 0 40px 0;

			&-item-value {
				font-size: 44px;
				line-height: 62px;
				margin-bottom: 8px;
				color: #333;
			}

			&-item-name {
				height: 36px;
				font-size: 26px;
				color: #333;
				line-height: 36px;
			}

			&-item-icon {
				height: 32px;
				margin-right: 10px;
				vertical-align: sub;
			}
		}
	}

	.car-info-window-visible {
		display: flex;
		flex-direction: column;
	}
}

</style>
