<template>
  <div class="pro-table">
    <a-form
      ref="formRef"
      :model="model"
      layout="inline"
      class="pro-table-form"
    >
      <a-row style="row-gap: 12px;">
        <template v-for="(item,index) in formColumns">
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
              @click="load"
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
              v-if="formColumns.length > formLayout.maxCol"
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
    <div style="padding: 24px;">
      <div class="pro-table-body">
        <div class="pro-table-toolbar">
          <slot name="toolbar" />
        </div>
        <a-table
          :data="tableData"
          :row-key="rowKey"
          :pagination="pagination"
          @page-change="load"
        >
          <template #columns>
            <a-table-column
              title="序号"
            >
              <template
                #cell="{ rowIndex }"
              >
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column
              v-for="item in tableColumns"
              :key="item.dataIndex"
              :title="item.title"
              :data-index="item.dataIndex"
            >
              <template
                v-if="slots.includes(item.dataIndex)"
                #cell="{ record }"
              >
                <slot
                  :name="item.dataIndex"
                  :row="record"
                />
              </template>
              <template
                v-else-if="item.valueType == 'enmu'"
                #cell="{ record }"
              >
                {{ item.valueEnum.find(({value}) => value === record[item.dataIndex])?item.valueEnum.find(({value}) => value === record[item.dataIndex]).label: record[item.dataIndex] }}
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { IconDown, IconUp } from "@arco-design/web-vue/es/icon"
import type { PropType, Ref } from "vue"
import { computed, defineComponent, reactive, ref, useSlots, watch } from "vue"
import type { ColumnProps } from "../components"

export default defineComponent({
  name: "ProTable",
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
    rowKey: {
      type: String,
      require: true,
      default: () => "key",
    },
    request: {
      type: Function,
      default: () => [],
    },
  },
  setup (props) {
    const model = reactive<Record<string, any>>({})
    const formColumns:Ref<ColumnProps[]> = ref<ColumnProps[]>([])
    const formLayout = reactive<{isOpen:boolean, maxCol:number, offSet:number}>({ isOpen: false, maxCol: 3, offSet: 0, })
    const formRef = ref()
    const searchLoading:Ref<boolean> = ref<boolean>(false)
    const tableColumns:Ref<ColumnProps[]> = ref<ColumnProps[]>([])
    const tableData:Ref<any[]> = ref<any[]>([])
    const pagination = reactive<{pageSize: number, current: number, total:number}>({ pageSize: 10, current: 1, total: 0, })
    const slots = Object.keys(useSlots())

    const params = computed(() => {
      const obj:Record<string, any> = {}
      Object.keys(model).forEach(key => {
        if (model[key] !== "") {
          obj[key] = model[key]
        }
      })
      const { pageSize, current, } = pagination
      obj.pageSize = pageSize
      obj.current = current
      return obj
    })

    const diffOffSet = () => {
      let { isOpen, maxCol, offSet, } = formLayout
      const length = formColumns.value.length
      if (isOpen) {
        offSet = (maxCol - (length % (maxCol + 1))) * 6
      } else {
        offSet = length >= maxCol ? 0 : (maxCol - length) * 6
      }
      formLayout.offSet = offSet
    }

    const diffColumns = () => {
      props.columns.forEach(item => {
        if (item.search) {
          formColumns.value.push(item)
        }
        if (!item.hidden) {
          tableColumns.value.push(item)
        }
      })

      diffOffSet()
    }
    diffColumns()

    watch(() => props.columns, diffColumns)
    watch(() => formLayout.isOpen, diffOffSet)

    const load = async (current:number | MouseEvent) => {
      if (typeof current === "number") {
        pagination.current = current
      } else {
        pagination.current = 1
        pagination.pageSize = 10
      }
      if (props.request && typeof props.request === "function") {
        searchLoading.value = true
        try {
          const { data, pageSize, total, } = await props.request(params.value)

          tableData.value = data
          pagination.pageSize = pageSize
          pagination.total = total
        } catch (error) {
        } finally {
          searchLoading.value = false
        }
      }
    }

    load(1)

    const reload = () => {
      formRef.value.resetFields()
      load(1)
    }

    return {
      model,
      formColumns,
      formLayout,
      formRef,
      searchLoading,
      tableColumns,
      tableData,
      pagination,
      slots,
      load,
      reload,
    }
  },
})

</script>
<style lang="less">
.pro-table {
	background-color: #fff;

	.pro-table-form {
		padding: 10px 24px;
		border-bottom: 1px solid #E3E8EE;
		display: block;
		box-sizing: border-box;
	}
}

.pro-table-body {
	border: 1px solid #dae1e9;
}
.pro-table-toolbar {
	padding: 8px 16px;
	background-color: #F3F7FB;
}
</style>
