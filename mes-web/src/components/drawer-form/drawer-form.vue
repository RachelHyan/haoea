<template>
  <el-drawer
    class="drawer-form"
    :model-value="modelValue"
    :append-to-body="appendToBody"
    :modal="modal"
    :title="title"
    :width="width"
    :with-header="withHeader"
  >
    <slot
      v-if="slotKeys.includes('header')"
      name="header"
    />
    <template
      v-if="!slotKeys.includes('header')"
      #header
    >
      <h5 class="drawer-form-title">
        {{ title }}
      </h5>
    </template>
    <el-form
      :model="formModel"
      :label-width="labelWidth"
    >
      <slot
        name="form"
        :model="formModel"
      />
    </el-form>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent, onBeforeUpdate, PropType, reactive, ref } from "vue";

export default defineComponent({
  name: "DrawerForm",
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String as PropType<"rtl" | "ltr" | "ttb" | "btt">,
      default: "rtl",
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "30%",
    },
    title: {
      type: String,
      default: "",
    },
    withHeader: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    labelWidth: {
      type: String,
      default: "90px",
    },
  },
  emits: ["update:model-value", "closed"],
  setup(props,{slots,}) {
    const formModel = reactive({})
    const slotKeys = ref(Object.keys(slots))

    onBeforeUpdate(() => {
      slotKeys.value = Object.keys(slots)
    })

    return {
      formModel,
      slotKeys,
    }
  },
})

</script>
<style lang="less">
.drawer-form {

	.el-drawer__header {
		margin-bottom: 0;
	}

	.el-select {
		width: 100%;
	}

	&-title {
		text-align: center;
		color: #333;
		font-size: 18px;
	}
}
</style>
