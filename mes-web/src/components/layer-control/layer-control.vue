<template>
  <div
    class="layer-control"
    :style="{left: position.left + 'px', right: position.right + 'px', top: position.top + 'px',}"
  >
    <div class="layer-control__header">
      <div class="layer-control__header-title">
        图层控制
      </div>
      <div
        class="layer-control__header-toggle"
      >
        <el-icon
          v-show="showOverview"
          size="16"
          @click="showOverview = !showOverview"
        >
          <ArrowUp />
        </el-icon>
        <el-icon
          v-show="!showOverview"
          size="16"
          @click="showOverview = !showOverview"
        >
          <ArrowDown />
        </el-icon>
      </div>
    </div>
    <div
      v-show="showOverview"
      class="layer-control__body"
    >
      <el-checkbox
        v-for="(item,index) in (data as any)"
        :key="index"
        v-model="item.status"
        :label="item.label"
        size="large"
        class="layer-control__body-item"
        @change="changeLayer(item,$event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LayerControl",
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
  emits: ["changeLayer"],
  setup (props, { emit, }) {
    const showOverview = ref(false);
    const currentId = ref(0);
    const selectedIds = ref([] as any);

    const changeLayer = (d:any,e:any) => {
			
      // 根据<el-switch>的选中状态进行操作
      if (e) {
      // 若选中状态为true，则将id记录到新数组
        selectedIds.value.push(d.value);
      } else {
      // 若选中状态为false，则从新数组中删除id
        const index = selectedIds.value.indexOf(d.value);
        if (index > -1) {
          selectedIds.value.splice(index, 1);
        }
      }
      emit("changeLayer",props.data)
    }
		

    return {
      showOverview,
      currentId,
      changeLayer,
    }
  },
})
</script>

<style lang="less">
.layer-control {
	position: absolute;
	z-index: 999;
	width: 154px;

	&__header {
		width: 154px;
		height: 48px;
		background: #fff;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 4px;
		line-height: 48px;
		text-align: center;
		position: relative;
		color: #333;

		&-toggle {
			position: absolute;
			right: 15px;
			top: 2px;
			cursor: pointer;
		}
	}

	&__body {
		display: flex;
		flex-direction: column;
		background: #fff;
		font-size: 12px;

		&-item {
			padding-left: 20px;
		}
	}
}
</style>
