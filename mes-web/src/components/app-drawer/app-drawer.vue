<template>
  <teleport
    v-if="modelValue"
    to="body"
  >
    <div
      class="app-drawer"
      :style="{width}"
    >
      <div class="app-drawer-header">
        <h5 class="drawer-header-title">
          {{ title }}
        </h5>
        <button
          class="el-drawer__close-btn"
          @click="handlerClosed"
        >
          <el-icon>
            <Close />
          </el-icon>
        </button>
      </div>
      <div class="app-drawer-body">
        <el-form
          ref="formRef"
          :model="formModel"
          :rules="formRules"
          :label-width="labelWidth"
          :size="size"
        >
          <slot
            name="form"
            :model="formModel"
          />
        </el-form>
      </div>
      <div
        v-if="footer"
        class="app-drawer-footer"
      >
        <div class="app-drawer-footer-group">
          <el-button
            type="danger"
            plain
            :size="size"
            @click="handlerCancel"
          >
            {{ cancelText }}
          </el-button>
          <el-button
            type="primary"
            :size="size"
            :loading="submitLoading"
            @click="handlerSubmit"
          >
            {{ okText }}
          </el-button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { PropType, defineComponent, ref, useSlots, watch } from "vue";

export default defineComponent({
  name: "AppDrawer",
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    formModel : {
      type: Object,
      default: undefined,
    },
    formRules : {
      type: Object as PropType<FormRules>,
      default: undefined,
    },
    width: {
      type: String,
      default: "30%",
    },
    title: {
      type: String,
      default: "",
    },
    header: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
      default: "确认",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    labelWidth: {
      type: String,
      default: "90px",
    },
    size: {
      type: String as PropType<"large" | "default" | "small">,
      default: () => "default",
    },
  },
  emits: ["update:model-value", "submit", "opened", "closed", "cancel"],
  setup(props,{emit,}) {
    const slots = Object.keys(useSlots())
    const formRef = ref<FormInstance>()
    const submitLoading = ref<boolean>(false)

    const handlerSubmit = () => {
      formRef.value?.validate( async (valid) => {
        if (valid) {
          submitLoading.value = true
          await emit("submit",props.formModel)
          submitLoading.value = false
          emit("update:model-value",false)
        }
      })
    }

    const handlerClosed = () => {
      emit("update:model-value",false)
    }

    const handlerCancel = () => {
      emit("update:model-value",false)
      emit("cancel")
    }

    watch(() => props.modelValue,(val) => {
      if (val) {
        emit("opened")
      } else {
        emit("closed")
      }
    })

    return {
      slots,
      formRef,
      submitLoading,
      handlerSubmit,
      handlerClosed,
      handlerCancel,
    }
  },
})

</script>
<style lang="less">
.app-drawer {
	width: 30%;
	height: 100vh;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 333;

	&-header {
		align-items: center;
    color: #72767b;
    display: flex;
    margin-bottom: 0;
    padding: 20px;
    padding-bottom: 0;

		.drawer-header-title {
			flex: 1;
			text-align: center;
			color: #333;
			font-size: 18px;
		}
	}

	&-body {
		flex: 1;
    padding: 20px;
    overflow: auto;
	}

	&-footer {
		padding: 20px;
		padding-top: 0;

		&-group {
			text-align: right;
		}
	}

	.el-select {
		width: 100%;
	}
}
</style>
