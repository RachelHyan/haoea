<template>
  <div class="dashboard-user page-root">
    <pro-table
      ref="proTableRef"
      :columns="columns"
      :request="queryUserPageListUsingGET"
    >
      <template #toolbar>
        <a-space
          size="medium"
        >
          <trigger-modal-form
            ref="addForm"
            title="添加用户"
            :form-items="formItems"
            :form-rules="formRules"
            :submit-request="addUserUsingPOST"
            @finish="load"
          >
            <template #trigger>
              <a-button type="primary">
                添加用户
              </a-button>
            </template>
          </trigger-modal-form>
        </a-space>
      </template>
      <template #optional="{row}">
        <a-space>
          <a-button
            v-if="row.userType === 'OPERATOR'"
            type="text"
            style="padding: 0;border:none;"
            @click="getParams.userId = row.userId;allotVisible = true;"
          >
            <icon-robot-add />配车
          </a-button>
          <a-button
            type="text"
            style="padding: 0;border:none;"
            @click="getParams.userId = row.userId;deleteVisible = true;"
          >
            <icon-delete />删除
          </a-button>
        </a-space>
      </template>
    </pro-table>
    <modal-descriptions
      title="删除用户"
      width="30%"
      :visible="deleteVisible"
      :get-request="queryUserInfoUsingGET"
      :get-params="getParams"
      :mapping="descMapping"
      :submit-request="delUserUsingDELETE"
      @finish="load"
      @close="closeHandle"
    >
      <template #after>
        <p class="delete-after">
          <icon-exclamation-circle />删除用户后相关信息会同步删除，请谨慎操作
        </p>
      </template>
    </modal-descriptions>
    <modal-form
      title="配车"
      :visible="allotVisible"
      :form-items="allotItems"
      :get-request="queryUserInfoUsingGET"
      :get-params="getParams"
      :submit-request="allotUserCarUsingPOST"
      :extra-data="getParams"
      @finish="load"
      @close="closeHandle"
    />
  </div>
</template>

<script lang="ts">
import { addUserUsingPOST, allotUserCarUsingPOST, delUserUsingDELETE, queryUserInfoUsingGET, queryUserPageListUsingGET } from "@/api/yonghuguanli"
import type { ColumnProps, ModalFormItem } from "@/components"
import { ModalDescriptions, ModalForm, ProTable, TriggerModalForm } from "@/components"
import { userInfoValue } from "@/refs"
import type { FieldRule } from "@arco-design/web-vue"
import { IconDelete, IconExclamationCircle, IconRobotAdd } from "@arco-design/web-vue/es/icon"
import type { Ref } from "vue"
import { defineComponent, reactive, ref } from "vue"

export default defineComponent({
  name: "DashboardUser",
  components: {
    ProTable,
    TriggerModalForm,
    ModalDescriptions,
    IconDelete,
    IconExclamationCircle,
    IconRobotAdd,
    ModalForm,
  },
  setup () {
    const columns:Ref<ColumnProps[]> = ref<ColumnProps[]>([])
    const formItems:Ref<ModalFormItem[]> = ref<ModalFormItem[]>([])
    const proTableRef = ref()
    const addForm = ref()
    const getParams = reactive<{userId?:number}>({})
    const descMapping:Ref<{label:string, value:string}[]> = ref<{label:string, value:string}[]>([])
    const deleteVisible:Ref<boolean> = ref<boolean>(false)
    const allotVisible:Ref<boolean> = ref<boolean>(false)
    const allotItems:Ref<ModalFormItem[]> = ref<ModalFormItem[]>([])
    const userTypeEnmu:Ref<{label:string,value:string}[]> = ref<{label:string,value:string}[]>([])

    if (userInfoValue.value.roles.includes("SYSTEM_ADMIN")) {
      userTypeEnmu.value.push({
        label: "管理员",
        value: "COMMON_ADMIN",
      })
    }

    userTypeEnmu.value.push({
      label: "操作员",
      value: "OPERATOR",
    })

    columns.value.push({
      title: "用户类型",
      dataIndex: "userType",
      valueType: "enmu",
      valueEnum: userTypeEnmu.value,
      search: true,
    })
    columns.value.push({
      title: "工号",
      dataIndex: "jobNum",
      valueType: "string",
      search: true,
    })
    columns.value.push({
      title: "真实姓名",
      dataIndex: "userName",
      valueType: "string",
      search: true,
    })
    columns.value.push({
      title: "手机号",
      dataIndex: "mobile",
      valueType: "string",
      search: true,
    })
    columns.value.push({
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "string",
    })
    columns.value.push({
      title: "操作员人数",
      dataIndex: "operatorNum",
      valueType: "string",
    })
    columns.value.push({
      title: "车辆数",
      dataIndex: "carNum",
      valueType: "string",
    })
    columns.value.push({
      title: "操作",
      dataIndex: "optional",
      valueType: "string",
    })

    formItems.value.push({
      field: "mobile",
      label: "手机号",
      componentType: "a-input",
    })
    formItems.value.push({
      field: "passWord",
      label: "密码",
      componentType: "a-input-password",
    })
    formItems.value.push({
      field: "confirmPassWord",
      label: "确认密码",
      componentType: "a-input-password",
    })
    formItems.value.push({
      field: "userName",
      label: "姓名",
      componentType: "a-input",
    })
    formItems.value.push({
      field: "idCard",
      label: "身份证号",
      componentType: "a-input",
    })
    formItems.value.push({
      field: "userType",
      label: "用户类型",
      componentType: "a-select",
      options: userTypeEnmu.value,
    })

    const formRules:Record<string, FieldRule<any> | FieldRule<any>[]> = {
      mobile: [
        { required: true, message: "请输入", }
      ],
      passWord: [
        { required: true, message: "请输入", }
      ],
      confirmPassWord: [
        { required: true, message: "请输入", },
        { validator:(value,callback) => {
          if (value !== addForm.value.model.passWord) {
            callback("两次密码输入不一致")
          }
        },}
      ],
      userName: [
        { required: true, message: "请输入", }
      ],
      idCard: [
        { required: true, message: "请输入", },
        { match: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: "身份证不合法", }
      ],
      userType: [
        { required: true, message: "请选择", }
      ],
    }

    descMapping.value.push({
      label: "用户名",
      value: "userName",
    })

    descMapping.value.push({
      label: "手机号",
      value: "mobile",
    })

    descMapping.value.push({
      label: "工号",
      value: "jobNum",
    })

    descMapping.value.push({
      label: "创建时间",
      value: "createTime",
    })

    descMapping.value.push({
      label: "操作员人数",
      value: "operatorNum",
    })

    descMapping.value.push({
      label: "车辆数",
      value: "carNum",
    })

    allotItems.value.push({
      field: "userName",
      label: "操作员",
      componentType: "a-description",
    })

    allotItems.value.push({
      field: "carNumber",
      label: "车辆编号",
      componentType: "a-input",
    })
		
    const closeHandle = () => {
      getParams.userId = undefined
      deleteVisible.value = false
      allotVisible.value = false
    }

    const load = () => {
      proTableRef.value.load()
      getParams.userId = undefined
      deleteVisible.value = false
      allotVisible.value = false
    }

    return {
      columns,
      formItems,
      formRules,
      proTableRef,
      addForm,
      getParams,
      descMapping,
      deleteVisible,
      allotVisible,
      allotItems,
      load,
      closeHandle,
      addUserUsingPOST,
      queryUserPageListUsingGET,
      queryUserInfoUsingGET,
      delUserUsingDELETE,
      allotUserCarUsingPOST,
    }
  },
})
</script>
<style lang="less">
.delete-after {
	text-align: center;
	color: #F61414;
}
</style>
