<template>
  <a-modal
    :visible="visible"
    unmount-on-close
    :title="title"
    :mask-closable="false"
    title-align="start"
    @cancel="$emit('close')"
    @close="closeHandler"
    @before-open="initOptions"
    @open="initModel"
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
          :disabled="item.disabled"
        />
        <a-input-number
          v-else-if="item.componentType === 'a-input-number'"
          v-model="model[item.field]"
          :default-value="item.defaultValue"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        />
        <a-input-password
          v-else-if="item.componentType === 'a-input-password'"
          v-model="model[item.field]"
          :default-value="item.defaultValue"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        />
        <a-select
          v-else-if="item.componentType === 'a-select'"
          v-model="model[item.field]"
          allow-search
          :options="item.request?requestOptions[item.field]:item.options"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        />
        <a-date-picker
          v-else-if="item.componentType === 'a-date-picker'"
          v-model="model[item.field]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        />
        <p
          v-else-if="item.componentType === 'a-description'"
          class="form-description"
        >
          {{ model[item.field] }}
        </p>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space
        size="medium"
      >
        <a-button
          type="outline"
          @click="$emit('close')"
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
import { FieldRule, Message, SelectOptionData, ValidatedError } from "@arco-design/web-vue"
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
    visible: {
      type: Boolean,
      default: false,
    },
    primaryKey: {
      type: String,
      default: "id",
    },
    formItems: {
      type: Array as PropType<ModalFormItem[]>,
      required: true,
    },
    formRules: {
      type: Object as PropType<Record<string, FieldRule<any> | FieldRule<any>[]> | undefined>,
      default: undefined,
    },
    defaultModel: {
      type: Object,
      default: () => ({}),
    },
    getRequest: {
      type: Function,
      default: undefined,
    },
    getParams: {
      type: Object,
      default: () => ({}),
    },
    extraData: {
      type: Object,
      default: () => ({}),
    },
    submitRequest: {
      type: Function,
      required: true,
    },
  },
  emits: ["finish", "close"],
  setup (props, { emit, }) {
    const form = ref()
    const model = reactive<Record<string, any>>({})
    const submitLading:Ref<boolean> = ref<boolean>(false)
    const requestOptions = reactive<Record<string, SelectOptionData[]>>({})

    const initOptions = async () => {
      props.formItems.forEach(async item => {
        if (item.request && item.mapping) {
          try {
            const { data, } = await item.request()
            requestOptions[item.field] = data.map((el:any) => {
              return {
                label: el[String(item?.mapping?.label)],
                value: el[String(item?.mapping?.value)],
              }
            })
          } catch (error) {

          }
        }
      })
    }

    const initModel = async () => {
      if (typeof props.getRequest === "function") {
        try {
          const { data, } = await props.getRequest(props.getParams)
          const values:Record<string, any> = {}
          const columns = props.formItems.map(({ field, defaultValue, }) => {
            values[field] = defaultValue
            return field
          })
          columns.forEach(key => {
            if (columns.includes(key)) {
              model[key] = data[key] ? data[key] : values[key]
            }
          })
          model[props.primaryKey] = data[props.primaryKey]
        } catch (error) {
        }
      } else {
        Object.keys(props.defaultModel).forEach(key => {
          model[key] = props.defaultModel[key]
        })
      }
    }

    const submit = () => {
      form.value.validate(async (errors: undefined | Record<string, ValidatedError>) => {
        if (!errors) {
          submitLading.value = true
          try {
            let {msg,} = await props.submitRequest({ ...model, ...props.extraData, })
            Message.success(msg)
            await setTimeout(() => null, 1000)
            emit("finish")
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
      form,
      model,
      submitLading,
      workArea,
      requestOptions,
      initOptions,
      initModel,
      submit,
      closeHandler,
    }
  },
})

</script>
