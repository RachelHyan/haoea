<template name="TimePickerList">
  <div class="time-picker-list">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="time-picker-row"
    >
      <el-time-picker
        v-model="item.ruleValue"
        placeholder="请选择督查时间"
        value-format="HH:mm"
        format="HH:mm"
        :disabled="!editStatus"
        style="width: 100px;"
        :clearable="false"
      />
      <div
        v-if="editStatus"
        class="button-group"
      >
        <el-button
          v-if="data.length > 1"
          type="danger"
          link
          @click="$emit('delete', index)"
        >
          删除
        </el-button>
        <el-button
          v-if="parseInt(index) === (parseInt(data.length) - 1) && (parseInt(data.length) < 5) "
          type="primary"
          link
          @click="$emit('add')"
        >
          新增
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimePickerList",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    editStatus: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["delete", "add"],
  setup () {

    return {}
  },
})
</script>

<style lang="less">
.time-picker-list {
	.time-picker-row {
		display: flex;
		align-items: center;

		.button-group {
			margin-left: 10px;
		}
	}
}
</style>
