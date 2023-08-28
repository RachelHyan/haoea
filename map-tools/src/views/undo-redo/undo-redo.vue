<template>
  <div
    ref="pageRef"
    class="undo-redo"
  >
    <div
      ref="mapRef"
      class="undo-redo-map"
    >
      <div class="info-window">
        <el-form
          :model="model"
        >
          <el-form-item label="作业对象">
            <el-input
              v-model="model.work"
              type="textarea"
              disabled
              :autosize="{ minRows: 3, maxRows: 6 }"
              resize="none"
            />
          </el-form-item>
          <el-form-item label="点位">
            <el-input
              v-model="model.marker"
              type="text"
              disabled
              resize="none"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :disabled="!cuntHistory"
          @click="undo"
        >
          撤销
        </el-button>
        <el-button
          type="primary"
          :disabled="!redoHistory.length"
          @click="redo"
        >
          重做
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "@amap/amap-jsapi-types";
import { Switch } from "@element-plus/icons-vue";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import { Ref, defineComponent, onMounted, onUnmounted, reactive, ref } from "vue";

interface LatLng {
  lat: number,
  lng: number
}

interface History {
  redo: LatLng[],
  undo: LatLng[]
}

export default defineComponent({
  name: "UndoRedo",
  setup() {
    const pageRef: Ref<HTMLDivElement | null> = ref(null);
    const mapRef = ref();
    const cuntHistory = ref<number>(0)
    const prevHistory = ref<any[]>([])
    const undoHistory = ref<any[]>([])
    const redoHistory = ref<any[]>([])
    const model = reactive<{
      mode: "point" | "line",
			work: string,
			workArray: any[],
      marker: string,
			lineWidth: number,
		}>({
		  mode: "point",
		  work: "",
		  workArray: [],
		  marker: "",
		  lineWidth: 3,
		});
    let mapInstance: AMap.Map;
    let workLine:AMap.Polyline;
    let marker:AMap.Marker;
    const history: History = reactive({
      undo: [],
      redo: [],
    })

    onMounted(async () => {
      await lazyAMapApiLoaderInstance
      mapInstance = new AMap.Map(mapRef.value,{zoom:14,});
      workLine = new AMap.Polyline({lineJoin:"round",strokeWeight: model.lineWidth,strokeColor: "#CC9900",})
      mapInstance.add(workLine);
      marker = new AMap.Marker();
      mapInstance.add(marker);
      prevHistory.value = [[null,null]]
      mapInstance.on("click",handleMapClick)
      window.addEventListener("keydown", handleKeyDown);
    });

    const handleMapClick = (e:any) => {
      if (model.mode === "line") {
        model.workArray.push([e.lnglat.lng,e.lnglat.lat])
        model.work = JSON.stringify(model.workArray)
        workLine.setPath(model.workArray)
        cuntHistory.value++
        redoHistory.value = []
      } else {
        // 判断marker是否存在
        if (mapInstance.getAllOverlays("marker").length === 0) {
          mapInstance.add(marker);
        }
        // 添加到历史记录
        // @ts-ignore
        history.undo.push({ ...marker.getPosition(), })
        marker.setPosition(e.lnglat)
        // 清空 redo 历史记录
        history.redo = []
      }
    };

    const undo = () => {
      if (model.mode === "line") {
        if (cuntHistory.value) {
          redoHistory.value.push(model.workArray.pop())
          model.work = JSON.stringify(model.workArray)
          workLine.setPath(model.workArray)
          cuntHistory.value--
        }
      } else  if (history.undo.length > 0) {
        const lastPosition = history.undo.pop()
        if (lastPosition) {
          // 添加到 redo 历史记录
          // @ts-ignore
          history.redo.push({ ...marker.getPosition(), })
          // @ts-ignore
          marker.setPosition(lastPosition)
        }
      }
    };

    const redo = () => {
      if (model.mode === "line") {
        if (redoHistory.value.length) {
          model.workArray.push(redoHistory.value.pop())
          model.work = JSON.stringify(model.workArray)
          workLine.setPath(model.workArray)
          cuntHistory.value++
        }
      } else  if (history.redo.length > 0) {
        const nextPosition = history.redo.pop()
        if (nextPosition) {
          // 添加到 undo 历史记录
          // @ts-ignore
          history.undo.push({ ...marker.getPosition(), })
          // @ts-ignore
          marker.setPosition(nextPosition)
        }
      }
    };

    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
    })

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.ctrlKey && event.shiftKey && event.code === "KeyZ") {
        // 重做
        return redo();
      }
      if (event.ctrlKey && event.code === "KeyZ") {
        // 撤销
        return undo();
      }
    };

    return {
      pageRef,
      mapRef,
      model,
      Switch,
      cuntHistory,
      redoHistory,
      undo,
      redo,
    };
  },
});
</script>
<style lang="less">
.undo-redo-map {
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
