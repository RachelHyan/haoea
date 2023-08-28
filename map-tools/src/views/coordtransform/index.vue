<template>
  <div class="board-tool">
    <div
      ref="mapRef"
      class="board-tool-map"
    >
      <div class="info-window">
        <el-form
          :model="model"
          :label-width="130"
        >
          <el-form-item label="原始坐标">
            <el-input
              v-model="model.original"
            />
          </el-form-item>
          <el-form-item label="百度转国测">
            <el-input
              v-model="model.bd09togcj02"
            >
              <template #append>
                <el-button
                  :icon="Switch"
                  @click="bd09togcj02"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="国测转百度">
            <el-input
              v-model="model.gcj02tobd09"
            >
              <template #append>
                <el-button
                  :icon="Switch"
                  @click="gcj02tobd09"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="wgs84转国测">
            <el-input
              v-model="model.wgs84togcj02"
            >
              <template #append>
                <el-button
                  :icon="Switch"
                  @click="wgs84togcj02"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="国测坐标转wgs84">
            <el-input
              v-model="model.gcj02towgs84"
            >
              <template #append>
                <el-button
                  :icon="Switch"
                  @click="gcj02towgs84"
                />
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "@amap/amap-jsapi-types";
import { Switch } from "@element-plus/icons-vue";
import { lazyAMapApiLoaderInstance } from "@vuemap/vue-amap";
import coordtransform from "coordtransform";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "CoordTransform",
  setup() {
    const mapRef = ref()
    const model = reactive<{original:string,bd09togcj02:string,gcj02tobd09:string,wgs84togcj02:string,gcj02towgs84:string}>({
      original: "",
      bd09togcj02: "",
      gcj02tobd09: "",
      wgs84togcj02: "",
      gcj02towgs84: "",
    })
    let map:AMap.Map;
    let marker:AMap.Marker;

    onMounted(async () => {
      await lazyAMapApiLoaderInstance
      map = new AMap.Map(mapRef.value,{zoom:14,});
      marker = new AMap.Marker()
      map.add(marker)
    })

    const bd09togcj02 = () => {
      let params = model.original.split(",")
      if (params.length) {
        model.bd09togcj02 = coordtransform.bd09togcj02(...params);
        marker.setPosition(<any>model.bd09togcj02)
        map.setFitView(<any>marker)
      }
    }

    const gcj02tobd09 = () => {
      let params = model.original.split(",")
      if (params.length) {
        model.gcj02tobd09 = coordtransform.gcj02tobd09(...params);
        marker.setPosition(<any>model.gcj02tobd09)
        map.setFitView(<any>marker)
      }
    }

    const wgs84togcj02 = () => {
      let params = model.original.split(",")
      if (params.length) {
        model.wgs84togcj02 = coordtransform.wgs84togcj02(...params);
        marker.setPosition(<any>model.wgs84togcj02)
        map.setFitView(<any>marker)
      }
    }

    const gcj02towgs84 = () => {
      let params = model.original.split(",")
      if (params.length) {
        model.gcj02towgs84 = coordtransform.gcj02towgs84(...params);
        marker.setPosition(<any>model.gcj02towgs84)
        map.setFitView(<any>marker)
      }
    }


    return {
      mapRef,
      model,
      Switch,
      bd09togcj02,
      gcj02tobd09,
      wgs84togcj02,
      gcj02towgs84,
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
