<template>
  <div @click.prevent="toggleVisible">
    <slot name="trigger" />
  </div>
  <a-modal
    v-model:visible="visible"
    unmount-on-close
    :title="title"
    :mask-closable="false"
    title-align="start"
    @close="closeHandler"
  >
    <a-form
      ref="form"
      :model="model"
      :rules="formRules"
      label-align="left"
      auto-label-width
    >
      <a-form-item
        v-for="item in formItems"
        :key="item.field"
        :field="item.field"
        :label="item.label"
      >
        <a-input
          v-if="item.componentType === 'a-input'"
          v-model="model[item.field]"
          :placeholder="item.placeholder"
        />
        <a-input-number
          v-else-if="item.componentType === 'a-input-number'"
          v-model="model[item.field]"
          :default-value="item.defaultValue"
          :placeholder="item.placeholder"
        />
        <a-input-password
          v-else-if="item.componentType === 'a-input-password'"
          v-model="model[item.field]"
          :default-value="item.defaultValue"
          :placeholder="item.placeholder"
        />
        <a-select
          v-else-if="item.componentType === 'a-select'"
          v-model="model[item.field]"
          allow-search
          allow-clear
          :options="item.options"
          :placeholder="item.placeholder"
        />
        <a-date-picker
          v-else-if="item.componentType === 'a-date-picker'"
          v-model="model[item.field]"
          :placeholder="item.placeholder"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space
        size="medium"
      >
        <a-button
          type="outline"
          @click="visible = false"
        >
          取消
        </a-button>
        <a-button
          type="primary"
          :loading="submitLading"
          @click="submit"
        >
          确定
        </a-button>
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts">
import type { ModalFormItem } from "@/components"
import { workArea } from "@/mapping"
import { FieldRule, Message, ValidatedError } from "@arco-design/web-vue"
import type { PropType, Ref } from "vue"
import { defineComponent, reactive, ref } from "vue"

export default defineComponent({
  name: "TriggerModalForm",
  props: {
    title: {
      type: String,
      default: "TriggerModalForm",
    },
    width: {
      type: [String, Number],
      default: "60%",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    formItems: {
      type: Array as PropType<ModalFormItem[]>,
      required: true,
    },
    formRules: {
      type: Object as PropType<Record<string, FieldRule<any> | FieldRule<any>[]> | undefined>,
      default: undefined,
    },
    submitRequest: {
      type: Function,
      required: true,
    },
  },
  emits: ["finish"],
  setup (props, { emit, }) {
    const visible:Ref<boolean> = ref<boolean>(false)
    const form = ref()
    const model = reactive<Record<string, any>>({})
    const submitLading:Ref<boolean> = ref<boolean>(false)

    const toggleVisible = () => {
      if (props.disabled) return
      visible.value = true
    }

    const submit = () => {
      form.value.validate(async (errors: undefined | Record<string, ValidatedError>) => {
        if (!errors) {
          submitLading.value = true
          try {
            let {msg,} = await props.submitRequest(model)
            Message.success(msg)
            await setTimeout(() => null, 1000)
            emit("finish")
            visible.value = false
          } catch (error) {
          } finally {
            submitLading.value = false
          }
        }
      })
    }

    const closeHandler = () => {
      form.value.resetFields()
    }

    return {
      visible,
      form,
      model,
      submitLading,
      workArea,
      toggleVisible,
      submit,
      closeHandler,
    }
  },
})

</script>
