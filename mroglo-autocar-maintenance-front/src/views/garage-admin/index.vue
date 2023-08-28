<template>
  <div class="dashboard-garage-admin page-root">
    <pro-table
      ref="proTableRef"
      :columns="columns"
      row-key="carNumber"
      :request="queryAdminCarPageListUsingGET"
    >
      <template #toolbar>
        <a-space
          size="medium"
        >
          <trigger-modal-form
            title="新增车辆"
            :form-items="formItems"
            :submit-request="addCarUsingPOST"
            :form-rules="rules"
            @finish="load"
          >
            <template #trigger>
              <a-button type="primary">
                新增车辆
              </a-button>
            </template>
          </trigger-modal-form>
        </a-space>
      </template>
      <template #fault="{row}">
        {{ row.fault?'是':'否' }}
      </template>
      <template #optional="{row}">
        <a-space>
          <a-button
            type="text"
            style="padding: 0;border:none;"
            @click="goDetail(row.carId)"
          >
            <icon-find-replace />查看详情
          </a-button>
          <a-button
            type="text"
            style="padding: 0;border:none;"
            @click="getParams.carId = row.carId;carUserId = row.carUserId;userVisible = true"
          >
            <icon-find-replace />{{ row.carUserId?'更换操作员':'添加操作员' }}
          </a-button>
          <a-button
            type="text"
            style="padding: 0;border:none;"
            @click="getParams.carId = row.carId;editVisible = true"
          >
            <icon-find-replace />编辑
          </a-button>
        </a-space>
      </template>
    </pro-table>
    <modal-form
      :title="carUserId?'更换操作员':'添加操作员'"
      primary-key="carId"
      :visible="userVisible"
      :get-request="queryInfoByIdUsingGET"
      :get-params="getParams"
      :form-items="userFormItems"
      :extra-data="{carUserId}"
      :submit-request="carUserId?updateOpratorUsingPOST:addOpratorUsingPOST"
      @close="getParams.carId = undefined;carUserId = undefined;userVisible = false"
      @finish="load"
    />
    <modal-form
      title="编辑车辆"
      primary-key="carId"
      :visible="editVisible"
      :get-request="queryInfoByIdUsingGET"
      :get-params="getParams"
      :submit-request="updateCarUsingPUT"
      :form-items="formItems"
      :form-rules="rules"
      @close="getParams.carId = undefined;carUserId = undefined;editVisible = false"
      @finish="load"
    />
  </div>
</template>

<script lang="ts">
import { addCarUsingPOST, addOpratorUsingPOST, queryAdminCarPageListUsingGET, queryInfoByIdUsingGET, queryOpratorUserListUsingGET, updateCarUsingPUT, updateOpratorUsingPOST } from "@/api/chekuguanli"
import type { ColumnProps, ModalFormItem } from "@/components"
import { ModalForm, ProTable, TriggerModalForm } from "@/components"
import { workArea } from "@/mapping"
import { IconFindReplace } from "@arco-design/web-vue/es/icon"
import { defineComponent, reactive, Ref, ref } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  name: "DashboardGarageAdmin",
  components: {
    ProTable,
    ModalForm,
    TriggerModalForm,
    IconFindReplace,
  },
  setup () {
    const columns:Ref<ColumnProps[]> = ref<ColumnProps[]>([])
    const formItems:Ref<ModalFormItem[]> = ref<ModalFormItem[]>([])
    const proTableRef = ref()
    const editVisible:Ref<boolean> = ref<boolean>(false)
    const getParams = reactive<{carId?:number}>({})
    const defaultModel = reactive({})
    const userVisible:Ref<boolean> = ref<boolean>(false)
    const userFormItems:Ref<ModalFormItem[]> = ref<ModalFormItem[]>([])
    const carUserId:Ref<number | undefined> = ref<number | undefined>(undefined)

    const router = useRouter()

    columns.value.push({
      title: "车辆编号",
      dataIndex: "carNumber",
      valueType: "string",
      search: true,
    })
    columns.value.push({
      title: "录入时间",
      dataIndex: "createTime",
      valueType: "string",
    })
    columns.value.push({
      title: "总里程",
      dataIndex: "totalMileage",
      valueType: "string",
    })
    columns.value.push({
      title: "作业区域",
      dataIndex: "workArea",
      valueType: "string",
    })
    columns.value.push({
      title: "负责人",
      dataIndex: "principal",
      valueType: "string",
      search: true,
    })
    columns.value.push({
      title: "是否故障",
      dataIndex: "fault",
      valueType: "enmu",
      valueEnum: [
        {
          value: "true",
          label: "是",
        },
        {
          value: "false",
          label: "否",
        }
      ],
      search: true,
    })
    columns.value.push({
      title: "作业状态",
      dataIndex: "workStatus",
      valueType: "enmu",
      valueEnum:[
        {
          value:"作业中",
          label:"作业中",
        },
        {
          value:"驾驶中",
          label:"驾驶中",
        },
        {
          value:"静止",
          label:"静止",
        }
      ],
      search: true,
    })
    columns.value.push({
      title: "操作",
      dataIndex: "optional",
      valueType: "string",
    })

    formItems.value.push({
      field: "vinCode",
      label: "VIN码",
      componentType: "a-input",
      placeholder: "请输入",
      disabled:getParams.carId?false:true,
    })
    formItems.value.push({
      field: "workAreaCode",
      label: "作业区域",
      componentType: "a-select",
      options: workArea,
      placeholder: "请选择",
    })
    formItems.value.push({
      field: "dateProduced",
      label: "车辆生产日期",
      componentType: "a-date-picker",
      placeholder: "请选择",
    })
    formItems.value.push({
      field: "mileage",
      label: "初始里程",
      componentType: "a-input-number",
      defaultValue: 0,
      placeholder: "请输入",
    })

    const rules = {
      vinCode: [
        { required: true, message: "请输入", },
        { match: /[A-Za-z0-9]/, message: "只允许输入大小写字母、数字", },
        { minLength: 4,maxLength:32, message: "VIN码长度需在4-32位", }
      ],
      workAreaCode: [
        { required: true, message: "请选择", }
      ],
      dateProduced: [
        { required: true, message: "请输入", }
      ],
      mileage: [
        { required: true, message: "请输入", }
      ],
    }

    userFormItems.value.push({
      field: "carNumber",
      label: "车辆编号",
      componentType: "a-description",
    })

    userFormItems.value.push({
      field: "userId",
      label: "操作员",
      componentType: "a-select",
      request: queryOpratorUserListUsingGET,
      mapping: {
        label: "userName",
        value: "userId",
      },
    })

    const load = () => {
      proTableRef.value.load()
      carUserId.value = undefined
      getParams.carId = undefined
      editVisible.value = false
      userVisible.value = false
    }

    const goDetail = (carId:number) => {
      router.push({ name: "garage-detail", query: { carId, },})
    }

    return {
      columns,
      formItems,
      proTableRef,
      rules,
      editVisible,
      getParams,
      defaultModel,
      userVisible,
      userFormItems,
      carUserId,
      load,
      goDetail,
      queryAdminCarPageListUsingGET,
      addCarUsingPOST,
      queryInfoByIdUsingGET,
      updateCarUsingPUT,
      addOpratorUsingPOST,
      updateOpratorUsingPOST,
    }
  },
})
</script>
<style lang="less">
.dashboard-garage-admin {
	min-height: calc(100vh - 162px);
	background-color: #fff;
}
</style>
