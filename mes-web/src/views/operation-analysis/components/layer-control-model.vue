<template>
  <div
    class="layer-control-model"
    :style="{left: position.left + 'px', right: position.right + 'px', top: position.top + 'px',}"
  >
    <div
      v-for="item in (data as any)"
      :key="item.id"
    >
      <div class="layer-control-model__header">
        <div class="layer-control-model__header-title">
          {{ item.title }}
        </div>
        <div
          class="layer-control-model__header-toggle"
          @click="changeLayerVisible"
        >
          <el-icon
            v-show="currentId !== item.id"
            color="#fff"
            size="20"
            :class="layerVisible ? 'rotate180' : 'rotate0'"
          >
            <ArrowDown />
          </el-icon>
        </div>
      </div>
      <div
        v-show="layerVisible"
        class="layer-control-model__body"
      >
        <div
          v-for="(d,index) in item.data"
          :key="index"
          class="layer-control-model__body-item"
        >
          <img
            v-if="isIcon"
            :src="d.icon"
            alt=""
            :width="d.width"
            :height="d.height"
          >
          <span class="layer-control-model__body-item--label">{{ d.label }}</span>
          <el-switch
            v-model="d.value"
            size="small"
            @change="changeLayer(d,$event)"
          />
        </div>
        <div
          v-for="child in item.children"
          :key="child.id"
        >
          <div class="layer-control-model__header">
            <div class="layer-control-model__header-title">
              {{ child.title }}
            </div>
            <div
              class="layer-control-model__header-toggle"
              @click="child.expanded = !child.expanded"
            >
              <el-icon
                color="#fff"
                size="20"
                :class="child.expanded ? 'rotate180' : 'rotate0'"
              >
                <ArrowDown />
              </el-icon>
            </div>
          </div>
          <div v-show="child.expanded">
            <div
              v-for="(d,index) in child.data"
              :key="index"
              class="layer-control-model__body-item"
            >
              <img
                v-if="isIcon"
                :src="d.icon"
                alt=""
                :width="d.width"
                :height="d.height"
              >
              <span class="layer-control-model__body-item--label">{{ d.label }}</span>
              <el-switch
                v-model="d.value"
                size="small"
                @change="changeLayer(d,$event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LayerControlModel",
  props: {
    title: {
      type: String,
      default: "图层控制",
    },
    data: {
      type: Array,
      default: () => [],
    },
    position: {
      type: Object,
      default: () => ({
      }),
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["changeLayer","changeLayerVisible"],
  setup (props, { emit, }) {
    const currentId = ref(0);
    const childId = ref(0);
    const selectedIds = ref([] as any);
    const layerVisible = ref(true);

    const changeLayerVisible = () => {
      layerVisible.value = !layerVisible.value;

      emit("changeLayerVisible")
    }

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
      emit("changeLayer",props.data)
    }
		

    return {
      currentId,
      childId,
      layerVisible,
      changeLayerVisible,
      changeLayer,
    }
  },
})
</script>

<style lang="less">
.layer-control-model {
	position: absolute;
	z-index: 999;
	width: 154px;
	border: 1px solid #2047C5;

	&__header {
		width: 154px;
		height: 39px;
		background: rgba(31,95,204,0.2);
		border: 1px solid #2047C5;
		font-size: 16px;
		color: #FFFFFF;
		line-height: 39px;
		text-align: center;
		position: relative;

		&-toggle {
			position: absolute;
			right: 10px;
			top: 2px;
			cursor: pointer;
		}
	}

	&__body {
		display: flex;
		flex-direction: column;
		background: rgba(13,46,99,0.5);
		font-size: 12px;
		color: #FFFFFF;

		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			height: 30px;

			// &--label {
				// flex: 1;
				// text-align: right;
				// margin-right: 5px;
			// }
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
