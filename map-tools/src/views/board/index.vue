<template>
  <div class="board-tool">
    <div
      ref="mapRef"
      class="board-tool-map"
    >
      <div class="info-window">
        <el-form
          :model="model"
        >
          <el-form-item label="作业对象">
            <el-input
              v-model="model.work"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              resize="none"
              @change="workChange"
            />
          </el-form-item>
          <el-form-item label="线条宽度">
            <el-input-number
              v-model="model.lineWidth"
              :min="1"
              controls-position="right"
              @change="setWidth"
            />
          </el-form-item>
          <el-form-item label="人员数量">
            <el-input-number
              v-model="model.personnel"
              :min="1"
              controls-position="right"
            />
          </el-form-item>
          <el-form-item label="计算结果">
            <el-input
              v-model="model.reult"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              resize="none"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="drawPersonnel"
        >
          绘制人员
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "@amap/amap-jsapi-types";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "BoardTool",
  setup() {
    const mapRef = ref()
    const model = reactive<{work:string,workArray:any[],lineWidth:number,personnel:number,reult:string}>({
      work: "",
      workArray: [],
      lineWidth: 3,
      personnel: 1,
      reult: "",
    })
    let map:AMap.Map;
    let workLine:AMap.Polyline;

    onMounted(async () => {
      await lazyAMapApiLoaderInstance
      map = new AMap.Map(mapRef.value,{zoom:14,});
      workLine = new AMap.Polyline({lineJoin:"round",strokeWeight: model.lineWidth,strokeColor: "#CC9900",})
      map.add(workLine)

      map.on("click",(e:any) => {
        model.workArray.push([e.lnglat.lng,e.lnglat.lat])
        model.work = JSON.stringify(model.workArray)
        workLine.setPath(model.workArray)
      })
    })

    const setWidth = () => {
      workLine.setOptions({strokeWeight:model.lineWidth,})
    }

    const workChange = (val:string) => {
      if (val) {
        model.workArray = JSON.parse(val)
        workLine.setPath(model.workArray)
        map.setFitView(<any>workLine)
      } else {
        model.workArray = []
        map.remove(workLine)
        workLine = new AMap.Polyline({lineJoin:"round",strokeWeight: model.lineWidth,strokeColor: "#CC9900",})
        map.add(workLine)
      }
    }

    const drawPersonnel = () => {
      // // var pixel1 = map.lngLatToContainer(model.workArray[0]);
      // // var pixel2 = map.lngLatToContainer(model.workArray[1]);
      // // console.log(pixel1);
      // // console.log(pixel2);
      // // // console.log(model.workArray);
      // console.log(workLine.getPath());
      // let sum = 0;
      // let x:number;
      // let y:number;
      // let latitude:number;
      // let longitude:number;
      // let lines:any[] = [];
      // let markers = []
      // workLine.getPath()?.forEach(({lat,lng,}:any) => {
      //   // let pixel = map.lngLatToContainer([lng,lat])
      //   let pixel = map.lngLatToPixel([lng,lat],map.getZoom())
      //   if (x !== undefined) {
      //     let dx = Math.abs(pixel.x - x);
      //     let dy = Math.abs(pixel.y - y);
      //     let dis = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
      //     sum += dis;
      //     let angle = bearing({latitude,longitude,},{latitude:lat,longitude:lng,})
      //     lines.push({
      //       dis,
      //       angle,
      //       x,
      //       y,
      //     })
      //     x = pixel.x
      //     y = pixel.y
      //     latitude = lat;
      //     longitude = lng;
      //   } else {
      //     x = pixel.x;
      //     y = pixel.y;
      //     latitude = lat;
      //     longitude = lng;
      //   }
      // })
      // let space = sum / 9;
      // let b = {x:0,y:0,};
      // console.log(d2r(lines.at(0).angle));
			
      // b.x = lines.at(0).x + space * Math.cos(d2r(lines.at(0).angle));
      // b.y = lines.at(0).y + space * Math.sin(d2r(lines.at(0).angle));
      // // let res = map.containerToLngLat(new AMap.Pixel(b.x,b.y))
      // let res = map.pixelToLngLat(new AMap.Pixel(b.x,b.y),map.getZoom())
      let pos = JSON.parse(model.reult)
      let icon = new AMap.Marker({
        position: pos,
        icon: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      })
      map.add(icon)
			
    }

    function bearing(start:any, end:any) {
      let rad = Math.PI / 180,
      	lat1 = start.latitude * rad,
      	lat2 = end.latitude * rad,
      	lon1 = start.longitude * rad,
      	lon2 = end.longitude * rad;
      const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const b = Math.cos(lat1) * Math.sin(lat2) -
        	  Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

   	return radiansToDegrees(Math.atan2(a, b));
    }

    /*
		* 弧度转换为角度
		*/
    function radiansToDegrees(radians:any) {
      console.log(radians);
			
      const degrees = radians % (2 * Math.PI);
      return degrees * 180 / Math.PI;
    }

    /*
		* 角度转换为弧度
		*/
    var d2r = function(d:any) {
      return (d * Math.PI) / 180;
    }


    return {
      mapRef,
      model,
      setWidth,
      workChange,
      drawPersonnel,
    }

  },
})
</script>
<style lang="less">
.board-tool-map {
	height: calc(100vh - 58px);
	position: relative;

	.info-window {
		width: 380px;
		background-color: #fff;
		padding: 16px;
		position: absolute;
		top: 24px;
		right: 0;
		z-index: 9;
	}
}
</style>
