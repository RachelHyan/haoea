<template>
  <div class="alert-configuration page-root">
    <card-header title="预警配置" />
    <el-pro-table
      ref="tableRef"
      row-key="id"
      hidden-label
      :columns="columns"
      :request="request"
    >
      <template #form-status="{ model }">
        <el-select
          v-model="model.status"
          clearable
          filterable
          placeholder="状态"
        >
          <el-option
            label="启用"
            value="1"
          />
          <el-option
            label="停用"
            value="0"
          />
        </el-select>
      </template>
      <template #column-status="{row}">
        <el-switch
          v-model="row.status"
          :active-value="1"
          :inactive-value="0"
          @change="changeStatus(row)"
        />
      </template>
      <template #column-operation="{row}">
        <el-button
          type="primary"
          link
          @click.stop="handleAllocation(row)"
        >
          配置
        </el-button>
      </template>
    </el-pro-table>
    <allocation-model
      ref="allocationModelRef"
      v-model="allocationModelVisible"
      :data="allocationData"
      @closed="tableRef.load()"
    />
  </div>
</template>

<script lang="ts">
import { mesAllotRuleSelectAllotRulePageList, mesAllotRuleUpdateAllotRule } from "@/api/mes/allotRuleController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import { Action, ElMessage, ElMessageBox, ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";
import AllocationModel from "./components/allocation-model.vue";


export default defineComponent({
  name: "AlertConfiguration",
  components: {
    CardHeader,
    AllocationModel,
  },
  setup () {
    const project = useProject();
    const dict = useDict();
    const projectId = project.$state.projectId as number;
    const tableRef = ref();
    const allocationModelRef = ref();
    const allocationModelVisible = ref(false);
    const allocationData = ref({});
    const columns:ProTableColumn[] = [
      {
        title: "场景类型",
        dataIndex: "sceneType",
        valueType: "enum",
        valueEnum: dict.$state.jobType,
        search: true,
        placeholder: "场景类型",
      },
      {
        title: "预警类型",
        dataIndex: "allotType",
        valueType: "enum",
        valueEnum: [
          {label: "整改提醒", value: "rectificationTask",},
          {label: "整改超时", value: "rectificationOvertime",},
          {label: "督查超时", value: "inspectionOvertime",},
          {label: "缺卡", value: "clockingOvertime",},
          {label: "脱岗提醒", value: "offJob",},
          {label: "坐岗提醒", value: "sitJob",},
          {label: "年龄提醒", value: "ageAllot",},
          {label: "车辆报废", value: "vehicleScrapping",}
        ],
        search: true,
        placeholder: "预警类型",
      },
      {
        title: "状态",
        dataIndex: "status",
        valueType: "slot",
        search: true,
      },
      {
        title: "预警规则",
        dataIndex: "allotRule",
        valueType: "string",
      },
      {
        title: "操作",
        dataIndex: "operation",
        valueType: "slot",
      }
    ]

    const request = async(params: MES.AllotRuleSelectAllotRulePageListParams) => {
      params.projectId = projectId;
      return mesAllotRuleSelectAllotRulePageList(params)
    }

    const handleAllocation = (row:any) => {
      allocationData.value = row;

      allocationModelRef.value?.getInfo(row);
			
      allocationModelVisible.value = true;
    }

    const changeStatus = (row:MES.AllotRuleInParam) => {
      if (!row.id) return;
			
      ElMessageBox({
        title: "提示",
        type: "warning",
        message: "确认修改状态？",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        callback: async (action: Action) => {
          if (action === "confirm") {
            try {
              const params = {
                id: row.id,
                status: row.status,
              };
              const { success, } = await mesAllotRuleUpdateAllotRule(params);
              if (success) {
                ElMessage.success("修改成功！");
                tableRef.value.load();
              }
            } catch (error) {
            	 // console.log(error);
            }
          }else {
            tableRef.value.load();
          }
        },
      });
    }

    return {
      tableRef,
      allocationModelRef,
      columns,
      allocationModelVisible,
      allocationData,
      request,
      handleAllocation,
      changeStatus,
    }
  },
})
</script>

<style scoped>

</style>
