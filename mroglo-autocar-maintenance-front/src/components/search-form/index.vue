<template>
  <a-form
    ref="formRef"
    :model="model"
    layout="inline"
    class="search-form"
  >
    <a-row style="row-gap: 12px;">
      <template v-for="(item,index) in columns">
        <a-col
          v-if="formLayout.maxCol > index || formLayout.isOpen"
          :key="item.dataIndex"
          :span="6"
          style="padding-left;: 12px"
        >
          <a-form-item
            :field="item.dataIndex"
            :label="item.title"
            :label-col-style="{width:'80px',boxSizing:'border-box'}"
          >
            <a-input
              v-if="item.valueType === 'string'"
              v-model="model[item.dataIndex]"
              placeholder="请输入"
            />
            <a-input-number
              v-else-if="item.valueType === 'number'"
              v-model="model[item.dataIndex]"
              placeholder="请输入"
            />
            <a-select
              v-else-if="item.valueType === 'enmu'"
              v-model="model[item.dataIndex]"
              :options="item.valueEnum"
              :allow-clear="true"
              placeholder="请选择"
            />
          </a-form-item>
        </a-col>
      </template>
      <a-col
        :span="6"
        :offset="formLayout.offSet"
      >
        <a-space
          size="medium"
          style="width: 100%;justify-content: flex-end;"
        >
          <a-button
            type="primary"
            :loading="searchLoading"
            @click="search"
          >
            查询
          </a-button>
          <a-button
            type="outline"
            @click="reload"
          >
            重置
          </a-button>
          <a-button
            v-if="columns.length > formLayout.maxCol"
            type="text"
            style="padding: 0;border:none;"
            @click="formLayout.isOpen = !formLayout.isOpen"
          >
            {{ formLayout.isOpen?'收起':'展开' }}
            <component :is="formLayout.isOpen?'icon-up':'icon-down'" />
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>
<script lang="ts">
import { IconDown, IconUp } from "@arco-design/web-vue/es/icon"
import type { PropType, Ref } from "vue"
import { computed, defineComponent, reactive, ref, watch } from "vue"
import type { ColumnProps } from "../components"

export default defineComponent({
  name: "SearchForm",
  components: {
    IconDown,
    IconUp,
  },
  props: {
    columns: {
      type: Array as PropType<ColumnProps[]>,
      require: true,
      default: () => [],
    },
  },
  emits:["search"],
  setup (props,{emit,}) {
    const model = reactive<Record<string, any>>({})
    const formLayout = reactive<{isOpen:boolean, maxCol:number, offSet:number}>({ isOpen: false, maxCol: 3, offSet: 0, })
    const formRef = ref()
    const searchLoading:Ref<boolean> = ref<boolean>(false)

    const params = computed(() => {
      const obj:Record<string, any> = {}
      Object.keys(model).forEach(key => {
        if (model[key] !== "") {
          obj[key] = model[key]
        }
      })
      return obj
    })

    const diffOffSet = () => {
      let { isOpen, maxCol, offSet, } = formLayout
      const length = props.columns.length
      if (isOpen) {
        offSet = (maxCol - (length % (maxCol + 1))) * 6
      } else {
        offSet = length >= maxCol ? 0 : (maxCol - length) * 6
      }
      formLayout.offSet = offSet
    }
    
    diffOffSet()

    watch(() => props.columns, diffOffSet)
    watch(() => formLayout.isOpen, diffOffSet)

    const search = () => {
      emit("search",params.value)
    }

    const reload = () => {
      formRef.value.resetFields()
      emit("search",params.value)
    }

    return {
      model,
      formLayout,
      formRef,
      searchLoading,
      search,
      reload,
    }
  },
})
</script>
<style lang="less">
.search-form {
	padding: 10px 24px;
	border-bottom: 1px solid #E3E8EE;
	display: block;
	box-sizing: border-box;
  background-color: #fff;
}
</style>
