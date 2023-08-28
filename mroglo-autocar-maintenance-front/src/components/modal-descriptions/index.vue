<template>
  <a-modal
    :visible="visible"
    :width="width"
    unmount-on-close
    :title="title"
    :mask-closable="false"
    title-align="start"
    @cancel="$emit('close')"
    @before-open="beforeOpenHandler"
  >
    <slot name="before" />
    <a-descriptions
      :data="descriptionsData"
      :column="1"
    />
    <slot name="after" />
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
          :loading="submitLoading"
          @click="submit"
        >
          确定
        </a-button>
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts">
import type { DescData } from "@arco-design/web-vue"
import type { PropType, Ref } from "vue"
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "ModalDescriptions",
  props: {
    title: {
      type: String,
      default: "modal-descriptions",
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
    mapping: {
      type: Array as PropType<{label:string, value:string}[]>,
      required: true,
    },
    getRequest: {
      type: Function,
      required: true,
    },
    getParams: {
      type: Object,
      default: () => ({}),
    },
    submitRequest: {
      type: Function,
      default: undefined,
    },
  },
  emits: ["finish", "close"],
  setup (props, { emit, }) {
    const descriptionsData:Ref<DescData[]> = ref<DescData[]>([])
    const submitLoading:Ref<boolean> = ref<boolean>(false)

    const beforeOpenHandler = async () => {
      try {
        const { data, } = await props.getRequest(props.getParams)
        const desc:DescData[] = []
        props.mapping.forEach(item => {
          desc.push({
            label: item.label,
            value: data[item.value],
          })
        })
        descriptionsData.value = desc
      } catch (error) {
      }
    }

    const submit = async () => {
      if (typeof props.submitRequest === "function") {
        submitLoading.value = true
        try {
          await props.submitRequest(props.getParams)

          emit("finish")
        } catch (error) {

        } finally {
          submitLoading.value = false
        }
      } else {
        emit("finish")
      }
    }

    return {
      descriptionsData,
      submitLoading,
      beforeOpenHandler,
      submit,
    }
  },
})

</script>
