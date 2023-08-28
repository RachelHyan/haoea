<template>
  <div class="map-edit">
    <div
      ref="mapRef"
      class="home-page-map"
    />
    <div class="draw">
      <el-input
        v-model="searchRef"
        class="search"
        placeholder="请输入地址"
        :style="{width:'11.25rem'}"
        clearable
        @input="search"
      />
      <ul
        v-if="searchList"
        class="search-chunk"
        style="overflow: auto"
      >
        <el-empty
          v-show="searchData.length === 0"
          description="未找到相关地址"
          :image-size="100"
        />
        <li
          v-for="(item,index) of searchData"
          :key="item.id"
          class="search-chunk-item"
          @click="searchResult(item)"
        >
          <div class="search-chunk-item-name">
            {{ index + 1 }}、{{ item.name }}
          </div>
          <div class="search-chunk-item-address">
            {{ item.address }}
          </div>
        </li>
      </ul>
      <el-space
        size="large"
        class="options"
      >
        <div
          :class="isManual ? 'manual--active' : 'manual'"
          @click="drawManual"
        >
          <span class="manual-icon icon" />
          手动绘制
        </div>
        <div
          :class="isPolygon ? 'polygon--active' : 'polygon'"
          @click="drawPolygon"
        >
          <span class="polygon-icon icon" />
          多边形绘制
        </div>
        <div
          class="reset"
          @click="reset"
        >
          <span class="reset-icon icon" />
          重绘
        </div>
      </el-space>
    </div>
  </div>
</template>

<script lang="ts">
import "@amap/amap-jsapi-types";
import { Search } from "@element-plus/icons-vue";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";

export default defineComponent({
  name: "MapEdit",
  props:{
    shapeStyle:{
      type:Object,
      default:()=>({}),
    },
    area:{
      type:String,
      default:"",
    },
  },
  emits:["update:area","update:polygon", "update:polyline","update:point"],
  setup (props,{emit,expose,}) {
    let map: AMap.Map;
    const mapRef:Ref<HTMLDivElement | string> = ref("");
    const searchRef:Ref<string> = ref("");
    const searchData = ref<any[]>([]);
    const searchList:Ref<boolean> = ref(false)
    const isManual:Ref<boolean> = ref(false)
    const isPolygon:Ref<boolean> = ref(false)
    const isRemove:Ref<boolean> = ref(false)
    let point: Ref<number[][]> = ref([])
    let area: Ref<string> = ref<string>("")
    let gridId: Ref<number | undefined> = ref()
    // @ts-ignore
    let mouseTool: AMap.MouseTool;
    // @ts-ignore
    let PolygonEditor: AMap.PolygonEditor;
    let marker: AMap.Marker;
    let polygon:AMap.Polygon;
    let markers = reactive<AMap.Marker[]>([]);

		
    onMounted(async () => {
      if (!map) {
        await lazyAMap()
      }
    })

    // 关键字搜索
    const search = async () => {
      try {
        AMap.WebService.get("https://restapi.amap.com/v3/place/text",
          {
            keywords : searchRef.value,
          },function (error, result) {
            if(result.info === "OK"){
              searchData.value = result.pois
              searchList.value = true
            }
            if(searchRef.value === "") {
              searchList.value = false
            }
          })
      } catch (error) {
        ElMessage.error("搜索失败")
      }
    }

    const searchResult = (item: any) => {
      map.setZoomAndCenter(17.4, item.location.split(",")); // 设置地图中心点和缩放级别
      searchList.value = false
      searchRef.value = item.name
    }

    // 手动绘制
    const setManual = (e: any) => {
      PolygonEditor.on("removenode",() => isRemove.value = true)

      if(!isRemove.value) {
        point.value.push([e.lnglat.lng, e.lnglat.lat]);
        marker.setPosition([e.lnglat.lng, e.lnglat.lat]);
        marker.show()
        map.add(marker);
        markers.push(marker)

        markers.length > 1 && marker.hide()
        //每次新建多边形前先把之前的删掉，避免覆盖。
        point.value.length > 1 && map.remove(polygon);

        updatePath(point.value);
        area.value = Math.round(AMap.GeometryUtil.ringArea(point.value as any)).toLocaleString() + ""
        emit("update:area", area.value)
        emit("update:polygon", polygon)
        emit("update:point", point.value)
      }
    }

    const drawManual = () => {
      if(area.value || props.area) {
        ElMessage.warning("请先重绘")
      }else{
        reset()
        isPolygon.value = false
        isManual.value = true
        map.on("click",setManual)
      }
    }

    // 绘制多边形
    const drawPolygon = () => {
      if(area.value || props.area) {
        ElMessage.warning("请先重绘")
      }else {
        reset()
        isManual.value = false
        isPolygon.value = true
        mouseTool.polygon(props.shapeStyle)
        mouseTool.on("draw",(e:any)=>{
          mouseTool.close(true);
          point.value = e.obj.getPath()
          updatePath(point.value);
          area.value = Math.round(AMap.GeometryUtil.ringArea(e.obj.getPath())).toLocaleString() + ""
          mouseTool.close(false)
          emit("update:area",area.value)
          emit("update:point",point.value)
        })
      }
    }
		
    // 生成图形并开启编辑
    const updatePath = (path: any) => {
      polygon.setPath(path)
      polygon.setOptions(props.shapeStyle)
      polygon.setMap(map)
      PolygonEditor.setTarget(polygon);
      PolygonEditor.open();
      PolygonEditor.on(["adjust", "addnode", "removenode"], (e: any) => {
        if(e.target.getPath().length !== 0){
          point.value = e.target.getPath()
          area.value = Math.round(AMap.GeometryUtil.ringArea(e.target.getPath())).toLocaleString() + ""
          emit("update:area", area.value)
          emit("update:point", point.value)
        }else {
          reset()
        }
      })
      emit("update:polygon", polygon)
    }

    // 重绘	
    const reset = () => {
      isRemove.value = isManual.value = isPolygon.value = false
      PolygonEditor.close()
      polygon && map.remove(polygon)
      area.value = ""
      point.value = []
      markers.forEach((item:any)=>map.remove(item))
      markers = []
      map.off("click", setManual);
      mouseTool && mouseTool.close(true)
      emit("update:area", area.value)
      emit("update:polygon", polygon)
      emit("update:point", point.value)
    }

    // 编辑图形初始化
    const init = async (point:any) => {
      if (!map) {
        await lazyAMap()
      }
      updatePath(point)
      map.setFitView([polygon],true,[0,0,0,0],17.4)
    }

    const lazyAMap = async () => {
      await lazyAMapApiLoaderInstance
      map = new AMap.Map(mapRef.value, {});
      marker = new AMap.Marker({
        content:"<div class='marker'></div>",
        offset: new AMap.Pixel(-7.5, -7.5),
      })
      // @ts-ignore
      mouseTool = new AMap.MouseTool(map);
      polygon = new AMap.Polygon();
      // @ts-ignore
      PolygonEditor = new AMap.PolygonEditor(map);
      PolygonEditor._opt.createOptions = props.shapeStyle;
      PolygonEditor._opt.editOptions = props.shapeStyle;			
    }
		
    expose({
      reset,
      init,
      gridId,
      point,
    })

    return {
 			mapRef,
      searchRef,
      searchList,
      searchData,
      isManual,
      isPolygon,
      Search,
      search,
      searchResult,
      drawManual,
      drawPolygon,
      reset,
    }
  },
})
</script>

<style lang="less">
.map-edit {
	.home-page-map {
		height: calc(100vh - 10rem);
		// height: 100%;
		position: relative;
	}
	.draw {
		position: absolute;
		z-index: 1;
		top: 1rem;
		right: 1rem;
		width: 41rem;
		height: 3rem;
		background: rgba(255,255,255,0.53);
		backdrop-filter: blur(.125rem);
		color: #51565D;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 1rem;
		.el-input__wrapper {
			background-color: transparent;
		}
		.search-chunk {
			position: absolute;
			top: 3.75rem;
			left: 0;
			background-color: #fff;
			width: 18.75rem;
			height: 18.0625rem;
			box-sizing: border-box;
			padding:0 1rem;
			&-item {
				padding: .5rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				border-bottom: .0625rem solid #e6e6e6;
				&-name {
					font-size: .875rem;
					margin-bottom: .3125rem;
				}
				&-address {
					font-size: .75rem;
					color: #90929D;
				}
			}
		}
		.options {
			.icon {
				width: 1rem;
				height: 1rem;
				background-size: cover;
				margin-right: .1875rem;
				display: inline-block;
			}
			.manual {
				cursor: pointer;
				display: flex;
				align-items: center;
				.manual-icon {
					background-image: url(@/assets/images/manual.png);
				}
				&:hover,&--active {
					color: #1D51F4;
					cursor: pointer;
				}
				&:hover .manual-icon,&--active .manual-icon {
					background-image: url(@/assets/images/manual-active.png);
				}
			}
			.polygon {
				cursor: pointer;
				display: flex;
				align-items: center;
				.polygon-icon {
					background-image: url(@/assets/images/polygon.png);
				}
				&:hover,&--active {
					color: #1D51F4;
					cursor: pointer;
				}
				&:hover .polygon-icon,&--active .polygon-icon {
					background-image: url(@/assets/images/polygon-active.png);
				}
			}
			.polyline {
				cursor: pointer;
				display: flex;
				align-items: center;
				.polyline-icon {
					background-image: url(@/assets/images/circle.png);
				}
				&:hover,&--active {
					color: #1D51F4;
					cursor: pointer;
				}
				&:hover .polyline-icon,
				&--active .polyline-icon {
					background-image: url(@/assets/images/circle-active.png);
				}
			}
			.reset {
				cursor: pointer;
				display: flex;
				align-items: center;
				color: #be0f0e;
				.reset-icon {
					background-image: url(@/assets/images/reset-active.png);
				}
			}
			.el-button.is-link {
				color:#51565D
			}
			.el-button.is-link:active,.el-button.is-link:hover,.el-button.is-link:focus {
				color:#1D51F4
			}
		}

	}
	.marker {
		background-color: white;
		width: .6875rem;
		height: .6875rem;
		border: .125rem solid #2791FC;
		border-radius: 50%;
	}
}
</style>
