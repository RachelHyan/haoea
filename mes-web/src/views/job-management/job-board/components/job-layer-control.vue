<template>
  <div class="job-layer-control">
    <div
      class="job-layer-control__header"
      @click="layerVisible = !layerVisible;"
    >
      <div class="job-layer-control__header-title">
        图层控制
      </div>
      <div
        class="job-layer-control__header-toggle"
      >
        <el-icon
          color="#a8abb2"
          size="14"
          :class="layerVisible ? 'rotate180' : 'rotate0'"
        >
          <ArrowDown />
        </el-icon>
      </div>
    </div>
    <div
      v-show="layerVisible"
      class="job-layer-control__body"
    >
      <div
        v-for="item in layerData"
        :key="item.id"
        class="job-layer-control__body-item"
      >
        <img
          :src="item.icon"
          alt=""
          width="16"
          height="19"
        >	
        <span class="job-layer-control__body-item--label">{{ item.label }}</span>
        <el-switch
          v-model="item.value"
          size="small"
          @change="changeLayer(item,$event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "JobLayerControl",
  props: {
    sceneValue: {
      type: String,
      default: "Manual_cleaning",
    },
  },
  setup (props, { emit, }) {
    const layerVisible = ref(false);
    const selectedIds = ref([] as any);
    const typeId = ref("");

    const layerData = reactive([
      {id: "isOnJob", label: "在岗", value: true,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/vehicle-on.png",},
      {id: "isOffline", label: "离线", value: true,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/vehicle-off.png",},
      {id: "isOffJob", label: "脱岗", value: true,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/job-board/vehicle-leave.png",}
    ])

    const changeLayer = (d:any,e:any) => {
			
      // 根据<el-switch>的选中状态进行操作
      if (e) {
      // 若选中状态为true，则将id记录到新数组
        selectedIds.value.push(d.id);
      } else {
      // 若选中状态为false，则从新数组中删除id
        const index = selectedIds.value.indexOf(d.id);
        if (index > -1) {
          selectedIds.value.splice(index, 1);
        }
      }
      // console.log(layerData);
			
      emit("changeLayer",layerData)
    }	

    return {
      layerVisible,
      layerData,
      typeId,
      changeLayer,
    }
  },
})
</script>

<style lang="less">
.job-layer-control {
	position: absolute;
	top: 16px;
	right: 16px;
	z-index: 1;
	width: 174px;
	
	&__header {
		width: 100%;
		height: 48px;
		box-sizing: border-box;
		background: rgba(255,255,255,0.83);
		box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.07);
		border-radius: 5px;
		backdrop-filter: blur(2px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1px 15px;
		color: #000000;
		margin-bottom: 10px;
		cursor: pointer;
	}

	&__body {
		width: 174px;
		background: rgba(255,255,255,0.83);
		box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.07);
		border-radius: 5px;
		backdrop-filter: blur(2px);
		padding: 14px 0;
		color: #444444;

		&-item {
			padding-left: 43px;
			display: flex;
			align-items: center;
			padding-bottom:15px;
			
			&:last-child {
				padding-bottom: 0;
			}

			&--label {
				margin: 0 32px 0 5px;
			}
		}
	}

	.rotate180 {
		transform: rotate(180deg);
		transition: transform 0.3s ease-in-out;
	}

	.rotate0 {
		transform: rotate(360deg);
		transition: transform 0.3s ease-in-out;
	}
}
</style>
