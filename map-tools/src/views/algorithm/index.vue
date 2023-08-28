<template>
  <div class="algorithm-tool">
    <div
      ref="mapRef"
      class="algorithm-tool-map"
    >
      <div class="info-window">
        <el-form
          :model="model"
        >
          <el-form-item label="当前坐标">
            <el-input
              v-model="model.lnglat"
              readonly
            >
              <template #suffix>
                <el-icon style="cursor: pointer;">
                  <DocumentCopy @click="copyLngLat" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
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
          <el-form-item label="人员轨迹">
            <el-input
              v-model="model.personnel"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              resize="none"
              style="font-size: 12px;"
              @change="personneChange"
            />
          </el-form-item>
          <el-form-item label="绘制类型">
            <el-radio-group v-model="model.drawType">
              <el-radio label="work">
                作业对象
              </el-radio>
              <el-radio label="personnel">
                人员轨迹
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="计算结果">
            <el-input
              v-model="model.result"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              resize="none"
              style="font-size: 12px;"
              @change="resultChange"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="copyWorkArray"
        >
          <el-icon>
            <DocumentCopy />
          </el-icon>
          作业对象
        </el-button>
        <el-button
          type="primary"
          @click="copyPersonnelArray"
        >
          <el-icon>
            <DocumentCopy />
          </el-icon>
          人员轨迹
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "@amap/amap-jsapi-types";
import { DocumentCopy } from "@element-plus/icons-vue";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { useClipboard } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "AlgorithmTool",
  components: {
    DocumentCopy,
  },
  setup() {
    const { copy,isSupported, } = useClipboard();
    const mapRef = ref()
    const model = reactive<{lnglat:string,work:string,workArray:any[],lineWidth:number,personnel:string,personnelArray:any[],drawType: "work" | "personnel",result: string}>({
      lnglat: "",
      work: "",
      workArray: [],
      lineWidth: 3,
      personnel: "",
      personnelArray: [],
      drawType: "work",
      result: "",
    })
    let map:AMap.Map;
    let workLine:AMap.Polyline;
    let personnelLine:AMap.Polyline;
    let resultLines:AMap.Polyline[] = [];
    let isDown = false

    onMounted(async () => {
      await lazyAMapApiLoaderInstance
      map = new AMap.Map(mapRef.value,{dragEnable:false,keyboardEnable:false,});
      workLine = new AMap.Polyline({lineJoin:"round",strokeWeight: model.lineWidth,strokeColor: "#CC9900",})
      personnelLine = new AMap.Polyline({strokeStyle:"dashed",lineJoin:"round",bubble: true,});
      map.add(workLine)
      map.add(personnelLine)
			
      map.on("click",(e:any) => {
        if (model.drawType === "work") {
          model.lnglat = JSON.stringify([e.lnglat.lng,e.lnglat.lat])
          model.workArray.push([e.lnglat.lng,e.lnglat.lat])
          model.work = JSON.stringify(model.workArray)
          workLine.setPath(model.workArray)
        }
      })

      map.on("mousedown",() => {
        if (model.drawType === "personnel") {
          isDown = true
        }
      })

      map.on("mouseup",() => {
        if (model.drawType === "personnel") {
          isDown = false
        }
      })

      map.on("mousemove",(e:any) => {
        if (isDown && model.drawType === "personnel") {
          model.lnglat = JSON.stringify([e.lnglat.lng,e.lnglat.lat])
          model.personnelArray.push([e.lnglat.lng,e.lnglat.lat])
          model.personnel = JSON.stringify(model.personnelArray)
          personnelLine.setPath(model.personnelArray)
        }
      })

      document.addEventListener("keydown", function(e) { 
        switch (e.key) {
        case "ArrowLeft":
          map.panBy(20,0)
          break;
        case "ArrowUp":
          map.panBy(0,20)
          break;
        case "ArrowRight":
          map.panBy(-20,0)
          break;
        case "ArrowDown":
          map.panBy(0,-20)
          break;
        }
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

    const personneChange = (val:string) => {
      if (val) {
        model.personnelArray = JSON.parse(val)
        personnelLine.setPath(model.personnelArray)
        map.setFitView(<any>personnelLine)
      } else {
        model.personnelArray = []
        map.remove(personnelLine)
        personnelLine = new AMap.Polyline({strokeStyle:"dashed",lineJoin:"round",bubble: true,});
        map.add(personnelLine)
      }
    }

    const resultChange = (val:string) => {
      
      if (resultLines.length) {
        map.remove(resultLines)
        resultLines = []
      }
      
      if (val) {
        let result = JSON.parse(val)
        result.forEach((item:any) => {
          let line = new AMap.Polyline({strokeStyle:"dashed",lineJoin:"round",bubble: true,strokeColor:"#33cc00",});
          if (item.done) {
            line.setOptions({strokeColor: "#FF3300",})
          }
          line.setPath([item.ps,item.pt])
          resultLines.push(line)  
        });
        map.add(resultLines)
        map.setFitView(resultLines)
      }
    }

    const copyLngLat = () => {
      if (isSupported.value) {
        copy(model.lnglat)
        ElMessage({
          message: "复制成功.",
          type: "success",
        })
      } else {
        ElMessage({
          message: "当前环境不支持复制API.",
          type: "warning",
        })
      }
      
    }

    const copyWorkArray = () => {
      if (isSupported.value) {
        copy(model.work)
        ElMessage({
          message: "复制成功.",
          type: "success",
        })
      } else {
        ElMessage({
          message: "当前环境不支持复制API.",
          type: "warning",
        })
      }
      
    }

    const copyPersonnelArray = () => {
      if (isSupported.value) {
        copy(model.personnel)
        ElMessage({
          message: "复制成功.",
          type: "success",
        })
      } else {
        ElMessage({
          message: "当前环境不支持复制API.",
          type: "warning",
        })
      }
    }

    return {
      mapRef,
      model,
      setWidth,
      workChange,
      personneChange,
      resultChange,
      copyLngLat,
      copyWorkArray,
      copyPersonnelArray,
    }
  },
})
</script>
<style lang="less">
.algorithm-tool-map {
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
