<template>
  <el-pro-dialog
    class="table-model"
    :model-value="modelValue"
    :title="title"
    width="55%"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
    @closed="$emit('closed')"
  >
    <el-pro-table
      v-show="isAttendance"
      ref="attendanceRef"
      row-key="id"
      hidden-label
      :columns="attendanceColumns"
      :request="attendanceRequest"
      :selection-change="selectionChange"
    >
      <template #toolbar-left="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="handlerExport('attendance')"
        >
          导出
        </el-button>
      </template>
      <template #form-orgIds="{ model }">
        <el-tree-select
          v-model="model.orgIds"
          :data="orgTreeData"
          clearable
          check-strictly
          multiple
          collapse-tags
          collapse-tags-tooltip
          :render-after-expand="false"
          placeholder="所属组织"
          no-data-text="暂无选项"
          accordion
          show-checkbox
          node-key="id"
          :props="defaultProps"
        />
      </template>
    </el-pro-table>
    <el-pro-table
      v-show="!isAttendance && sceneType === 'Manual_cleaning'"
      ref="workerStatusRef"
      row-key="id"
      hidden-label
      :columns="workerStatusColumns"
      :request="workerStatusRequest"
      :selection-change="selectionChange"
    >
      <template #toolbar-left="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="handlerExport('workerStatus')"
        >
          导出
        </el-button>
      </template>
      <template #form-orgIds="{ model }">
        <el-tree-select
          v-model="model.orgIds"
          :data="orgTreeData"
          clearable
          check-strictly
          multiple
          collapse-tags
          collapse-tags-tooltip
          :render-after-expand="false"
          placeholder="所属组织"
          no-data-text="暂无选项"
          accordion
          show-checkbox
          node-key="id"
          :props="defaultProps"
        />
      </template>
    </el-pro-table>
    <el-pro-table
      v-show="!isAttendance && sceneType === 'Vehicle_operation'"
      ref="vehicleStatusRef"
      row-key="id"
      hidden-label
      :columns="vehicleStatusColumns"
      :request="vehicleStatusRequest"
      :selection-change="selectionChange"
    >
      <template #toolbar-left="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="handlerExport('vehicleStatus')"
        >
          导出
        </el-button>
      </template>
      <template #form-orgIds="{ model }">
        <el-tree-select
          v-model="model.orgIds"
          :data="orgTreeData"
          clearable
          check-strictly
          multiple
          collapse-tags
          collapse-tags-tooltip
          :render-after-expand="false"
          placeholder="所属组织"
          no-data-text="暂无选项"
          accordion
          show-checkbox
          node-key="id"
          :props="defaultProps"
        />
      </template>
    </el-pro-table>
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { mesIndexQueryCarJobStatusTodayList, mesIndexQueryUserAttendanceTodayList, mesIndexQueryUserJobStatusTodayList } from "@/api/mes/indexController";
import { useProject } from "@/stores/project";
import axios from "axios";
import { ElMessage, ProTableColumn } from "element-plus";
import { computed, defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "TableModel",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    sceneType: {
      type: String,
      default: "Manual_cleaning",
    },
    sceneValue: {
      type: String,
      default: "Manual_cleaning",
    },
    isAttendance: {
      type: Boolean,
      default: false,
    },
    curStatus: {
      type: String,
      default: "",
    },
  },
  emits: [ "update:modelValue", "closed" ],
  setup (props) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const attendanceRef = ref();
    const workerStatusRef = ref();
    const vehicleStatusRef = ref();
    const ids = ref<string | undefined>();
    const exportLoading = ref<boolean>(false);
    const attendanceExportParams = reactive<MES.IndexExportUserAttendanceTodayExcelParams | any>({});
    const workerStatusExportParams = reactive<MES.IndexExportUserJobStatusTodayExcelListParams | any>({});
    const vehicleStatusExportParams = reactive<MES.IndexExportCarJobStatusTodayExcelListParams | any>({});
    const orgTreeData = reactive<MES.OrgTree[]>([]);
    const defaultProps = {
      label:"orgName",
      children:"children",
    };

    const title = computed(() => {
      if (props.isAttendance) {
        return "今日考勤"
      } else {
        return props.sceneType === "Vehicle_operation" ? "车辆状态" : "今日作业状态"
      }
    })

    const exportParams = computed(() => {
      if (props.isAttendance) {
        return {
          ...attendanceExportParams,
          userIds: ids.value,
        }
      } else {
        return props.sceneType === "Vehicle_operation" ? {...vehicleStatusExportParams,carIds:ids.value,} : {...workerStatusExportParams,userIds:ids.value,}
      }
    })

    const attendanceColumns:ProTableColumn[] = [
      {
        title: "出勤状态",
        dataIndex: "status",
        valueType: "enum",
        valueEnum:[
          {
            label:"出勤",
            value:"attendance",
          },
          {
            label:"缺勤",
            value:"absence",
          }
        ],
        search: true,
        hidden:true,
        placeholder:"出勤状态",
      },
      {
        title: "所属组织",
        dataIndex: "ordNames",
        valueType: "string",
      },
      {
        title: "所属组织",
        dataIndex: "orgIds",
        valueType: "slot",
        search: true,
        hidden:true,
      },
      {
        title: "姓名",
        dataIndex: "userName",
        valueType: "string",
        search: true,
        placeholder:"姓名",
      },
      {
        title: "手机号码",
        dataIndex: "mobile",
        valueType: "string",
      },
      {
        title: "今日排班",
        dataIndex: "scheduls",
        valueType: "string",
      },
      {
        title: "已打卡次数",
        dataIndex: "clockingTotal",
        valueType: "string",
      },
      {
        title: "出勤状态",
        dataIndex: "attendanceStatus",
        valueType: "string",
      },
      {
        title: "人员类型",
        dataIndex: "userType",
        valueType: "string",
      }
    ]
		
    const workerStatusColumns:ProTableColumn[] = [
      {
        title: "作业状态",
        dataIndex: "jobStatus",
        valueType: "enum",
        valueEnum:[
          {label:"在岗", value:"onJob",},
          {label:"脱岗", value:"offJob",},
          {label:"离线", value:"offline",}
        ],
        search: true,
        hidden:true,
        placeholder:"作业状态",
      },
      {
        title: "所属组织",
        dataIndex: "ordNames",
        valueType: "string",
      },
      {
        title: "所属组织",
        dataIndex: "orgIds",
        valueType: "slot",
        search: true,
        hidden:true,
      },
      {
        title: "姓名",
        dataIndex: "userName",
        valueType: "string",
        search: true,
        placeholder:"姓名",
      },
      {
        title: "手机号码",
        dataIndex: "mobile",
        valueType: "string",
      },
      {
        title: "应作业时长",
        dataIndex: "jobDuration",
        valueType: "string",
      },
      {
        title: "实际作业时长",
        dataIndex: "actualJobDuration",
        valueType: "string",
      },
      {
        title: "预警次数",
        dataIndex: "allotCount",
        valueType: "string",
      },
      {
        title: "作业状态",
        dataIndex: "jobStatus",
        valueType: "string",
      },
      {
        title: "人员类型",
        dataIndex: "userType",
        valueType: "string",
      }
    ]

    const vehicleStatusColumns:ProTableColumn[] = [
      {
        title: "作业状态",
        dataIndex: "jobStatus",
        valueType: "enum",
        valueEnum:[
          {label:"在岗", value:"onJob",},
          {label:"脱岗", value:"offJob",},
          {label:"离线", value:"offline",}
        ],
        search: true,
        hidden:true,
        placeholder:"作业状态",
      },
      {
        title: "所属组织",
        dataIndex: "ordNames",
        valueType: "string",
      },
      {
        title: "所属组织",
        dataIndex: "orgIds",
        valueType: "slot",
        search: true,
        hidden:true,
      },
      {
        title: "车牌号",
        dataIndex: "carNumber",
        valueType: "string",
        search: true,
        placeholder:"车牌号",
      },
      {
        title: "应作业时长",
        dataIndex: "jobDuration",
        valueType: "string",
      },
      {
        title: "实际作业时长",
        dataIndex: "actualJobDuration",
        valueType: "string",
      },
      {
        title: "预警次数",
        dataIndex: "allotCount",
        valueType: "string",
      },
      {
        title: "作业状态",
        dataIndex: "workStatus",
        valueType: "string",
      },
      {
        title: "车辆类型",
        dataIndex: "carType",
        valueType: "string",
      }
    ]

    const fetchOrg = async () => {
      try {
        const { data, } = await mesDepartmentQueryOrgTreeList({ projectId, });
        orgTreeData.push(...data);
      } catch (error) {
      }
    };

    const selectionChange = (selection:any[]) => {
      ids.value = selection.map(item => item.id).join(",");
    }

    const attendanceRequest = async(data:MES.IndexQueryUserAttendanceTodayListParams) => {
      const { orgIds, ...params} = data;
      params.projectId = projectId;
      params.type = props.sceneValue;
      // @ts-ignore
      params.orgIds = orgIds?.length === 0 ? undefined : orgIds?.toString();

      // @ts-ignore
      attendanceExportParams.orgIds = params.orgIds;
      attendanceExportParams.userName = params.userName;
      attendanceExportParams.projectId = params.projectId;
      attendanceExportParams.type = params.type;
      attendanceExportParams.status = params.status;
      return mesIndexQueryUserAttendanceTodayList(params)
    }

    const workerStatusRequest = async(data: MES.IndexQueryUserJobStatusTodayListParams) => {
      const { orgIds, ...params} = data;
      params.projectId = projectId;
      params.type = props.sceneValue;
      // @ts-ignore
      params.orgIds = orgIds?.length === 0 ? undefined : orgIds?.toString();

      // @ts-ignore
      workerStatusExportParams.orgIds = params.orgIds;
      workerStatusExportParams.userName = params.userName;
      workerStatusExportParams.projectId = params.projectId;
      workerStatusExportParams.type = params.type;
      workerStatusExportParams.jobStatus = params.jobStatus;
      return mesIndexQueryUserJobStatusTodayList(params)
    }

    const vehicleStatusRequest = async(data: MES.IndexQueryCarJobStatusTodayListParams) => {
      const { orgIds, ...params} = data;
      params.projectId = projectId;
      params.type = props.sceneValue;
      // @ts-ignore
      params.orgIds = orgIds?.length === 0 ? undefined : orgIds?.toString();

      // @ts-ignore
      vehicleStatusExportParams.orgIds = params.orgIds;
      vehicleStatusExportParams.carNumber = params.carNumber;
      vehicleStatusExportParams.projectId = params.projectId;
      vehicleStatusExportParams.type = params.type;
      vehicleStatusExportParams.jobStatus = params.jobStatus;
      return mesIndexQueryCarJobStatusTodayList(params)
    }

    const handlerExport = async (type:string) => {
      const url = type === "attendance" ? "/api/mes/index/exportUserAttendanceTodayExcel" :
        type === "workerStatus" ? "/api/mes/index/exportUserJobStatusTodayExcelList" :
          "/api/mes/index/exportCarJobStatusTodayExcelList";

      const name = type === "attendance" ? "考勤表" :
        type === "workerStatus" ? "人员作业情况" :
          "车辆作业情况";

      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url,
          method: "post",
          params:exportParams.value,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = name;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
          ElMessage.success("导出成功！");
        }
      } catch (error) {
        console.error(error);
      } finally {
        exportLoading.value = false;
      }
    };

    fetchOrg();

    return {
      attendanceRef,
      workerStatusRef,
      vehicleStatusRef,
      title,
      attendanceColumns,
      workerStatusColumns,
      vehicleStatusColumns,
      defaultProps,
      orgTreeData,
      selectionChange,
      attendanceRequest,
      workerStatusRequest,
      vehicleStatusRequest,
      handlerExport,
    }
  },
})
</script>

<style scoped>

</style>
