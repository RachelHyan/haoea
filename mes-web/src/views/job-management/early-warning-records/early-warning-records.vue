<template>
  <div class="early-warning-records page-root">
    <card-header title="预警记录" />
    <el-pro-table
      ref="tableRef"
      row-key="id"
      :columns="columns"
      :request="readRequest"
      :selection-change="selectionChange"
      hidden-label
    >
      <template #toolbar-left="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="handleExport"
        >
          导出
        </el-button>
        <el-button
          type="primary"
          :size="size"
          :disabled="Ids.length === 0"
          @click="handleChangeStatus"
        >
          状态变更
        </el-button>
      </template>
      <template #column-operation="{row}">
        <el-button
          type="primary"
          link
          @click.stop="handleRead(row)"
        >
          标记为已读
        </el-button>
      </template>
      <template #form-createTime="{ model }">
        <el-date-picker
          v-model="model.createTime"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
          :disabled-date="disabledDate"
        />
      </template>
      <template #form-departmentIds="{ model }">
        <el-tree-select
          v-model="model.departmentIds"
          :data="orgTreeData"
          :clearable="true"
          check-strictly
          multiple
          :collapse-tags="true"
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
    <change-status
      :id="currentId"
      ref="changeStatusRef"
      v-model="changeStatusVisible"
      title="状态变更"
      @closed="tableRef.load()"
    />
  </div>
</template>

<script lang="ts">
import { mesAllotRecordSelectAllotRecordPageList } from "@/api/mes/allotRecordController";
import { mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { mesWechatUserReadMessage } from "@/api/mes/wechatController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import axios from "axios";
import { ElMessage, ElMessageBox, ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import ChangeStatus from "./components/change-status.vue";

export default defineComponent({
  name: "EarlyWarningRecords",
  components: {
    CardHeader,
    ChangeStatus,
  },
  setup () {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const tableRef = ref();
    const changeStatusRef = ref();
    const currentId = ref();
    const Ids = ref<number[]>([]);
    const exportLoading = ref(false);
    const exportParams = reactive<MES.AllotRecordExportAllotRecordExcelParams>({projectId,});
    const changeStatusVisible = ref(false);
    const orgTreeData = reactive<MES.OrgTree[]>([]);
    const defaultProps = {
      label:"orgName",
      children:"children",
    };
    const columns:ProTableColumn[] = [
      {
        title: "预警日期",
        dataIndex: "createTime",
        valueType: "slot",
        search: true,
      },
      {
        title: "所属组织",
        dataIndex: "organizations",
        valueType: "string",
      },
      {
        title: "所属组织",
        dataIndex: "departmentIds",
        valueType: "slot",
        search:true,
        hidden:true,
      },
      {
        title: "联系方式",
        dataIndex: "phone",
        valueType: "string",
      },
      {
        title: "姓名",
        dataIndex: "userName",
        valueType: "string",
        search:true,
        placeholder:"姓名",
      },
      {
        title: "人员类型",
        dataIndex: "userType",
        valueType: "enum",
        valueEnum: dict.$state.userType,
        placeholder: "人员类型",
        search:true,
      },
      {
        title: "预警类型",
        dataIndex: "allotRule",
        valueType: "enum",
        valueEnum: [
          {label:"整改提醒",value:"整改提醒",},
          {label:"督查超时",value:"督查超时",},
          {label:"整改超时",value:"整改超时",}
        ],
        placeholder: "预警类型",
        search:true,
      },
      {
        title: "状态",
        dataIndex: "status",
        valueType: "enum",
        valueEnum: [
          { label: "未读", value: 0, },
          { label: "已读", value: 1,}
        ],
        placeholder: "状态",
        search:true,
      },
      {
        title: "预警详情",
        dataIndex: "allotMessage",
        valueType: "string",
      },
      {
        title: "操作",
        dataIndex: "operation",
        valueType: "string",
      }
    ];

    const disabledDate = (date: any) => {
      // 今天之后的日期不可选
      return date.valueOf() > Date.now();
    };

    const remoteOrg = async () => {
      try {
        const { data, } = await mesDepartmentQueryOrgTreeList({ projectId, });
        orgTreeData.push(...data);
      } catch (error) {
      }
    };

    const readRequest = async (data:MES.AllotRecordSelectAllotRecordPageListParams | any) => {
      const { createTime, departmentIds, ...params} = data;
      params.projectId = projectId;
      params.startTime = createTime && createTime[0];
      params.endTime = createTime && createTime[1];
      params.createTime = undefined;
      params.departmentIds = departmentIds?.length === 0 ? undefined : departmentIds?.toString();


      exportParams.allotRule = params.allotRule;
      exportParams.startTime = params.startTime;
      exportParams.endTime = params.endTime;
      exportParams.departmentIds = params.departmentIds;
      exportParams.status = params.status;
      exportParams.userName = params.userName;
      exportParams.userType = params.userType;

      return mesAllotRecordSelectAllotRecordPageList(params)
    }

    const handleRead = (row:any) => {
      currentId.value = row.id.toString();
      changeStatusVisible.value = true;
    }

    const handleExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/allotRecord/exportAllotRecordExcel",
          method: "post",
          params:exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "预警记录";
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

    const selectionChange = (selections:MES.IotCarRelationDTO[]) => {
      Ids.value = selections.map(({id,}) => id as number);
      exportParams.ids = Ids.value.toString();
    };

    const handleChangeStatus = () => {
      ElMessageBox.confirm("确认将状态变更为已读吗?","提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesWechatUserReadMessage({ids:Ids.value.toString(),});
              done();
              instance.confirmButtonLoading = false;
              ElMessage.success("变更成功");
              tableRef.value.load();
            } catch (error) {
              done();
            }
          } else {
            done();
          }
        },
      }).catch(() => {
        // 为了不让控制台报 Uncaught (in promise) cancel
      });
    }

    remoteOrg();

    return {
      tableRef,
      changeStatusRef,
      columns,
      Ids,
      currentId,
      changeStatusVisible,
      orgTreeData,
      defaultProps,
      disabledDate,
      selectionChange,
      readRequest,
      handleRead,
      handleExport,
      handleChangeStatus,
    }
  },
})
</script>

<style scoped>

</style>
