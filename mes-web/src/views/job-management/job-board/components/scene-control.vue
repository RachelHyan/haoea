<template>
  <div class="scene-control">
    <el-select
      v-model="value"
      size="large"
      @change="handleChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SceneControl",
  emits: ["update:sceneValue","changeScene"],
  setup (props, { emit, }) {
    const	value = ref("Manual_cleaning");
    const options = [
      {
        value: "Manual_cleaning",
        label: "人工清扫",
      },
      {
        value: "Vehicle_operation",
        label: "车辆作业",
      }
    ];

    const handleChange = (value:string) => {
      emit("update:sceneValue", value);
      emit("changeScene", value);
    }

    return {
      value,
      options,
      handleChange,
    }
  },
})
</script>

<style lang="less">
.scene-control {
	position: absolute;
	top: 16px;
	right: 216px;
	z-index: 1;

	.el-select,.el-input__wrapper {
		width: 174px;
		--el-select-border-color-hover: transparent;
	}

	.el-input__wrapper {
		height: 46px;
		box-shadow: none;
		background: rgba(255,255,255,0.83);
		box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.07);
		backdrop-filter: blur(2px);
	}

	.el-input__inner {
		color: #000000;
	}
}
</style>
