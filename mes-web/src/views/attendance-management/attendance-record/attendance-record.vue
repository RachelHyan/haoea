<template>
  <div class="attendance-record page-root">
    <card-header title="打卡记录" />
    <el-pro-table
      ref="proTableRef"
      row-key="id"
      :columns="columns"
      hidden-label
      :request="fetchTableList"
      :selection-change="selectionChange"
    >
      <template #toolbar-left="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="handlerExport"
        >
          导出
        </el-button>
      </template>
      <template #form-clockingDate="{ model }">
        <el-date-picker
          v-model="model.clockingDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
          :disabled-date="disabledDate"
        />
      </template>
      <template #form-orgIds="{ model }">
        <el-tree-select
          v-model="model.orgIds"
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
      <template #column-optional="{row}">
        <el-button
          type="success"
          link
          @click="handlerDetail(row)"
        >
          详情
        </el-button>
      </template>
    </el-pro-table>
    <detail-model
      v-model="detailModelVisible"
      title="打卡详情"
      width="55%"
      :detail-data="detailData"
    />
  </div>
</template>

<script lang="ts">
import { mesClockingQueryClockingRecordInfo, mesClockingQueryClockingRecordPageList } from "@/api/mes/clockingController";
import { mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import axios from "axios";
import dayjs from "dayjs";
import { ElMessage, ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import DetailModel from "./componnets/detail-model.vue";

export default defineComponent({
  name: "AttendanceRecord",
  components: {
    CardHeader,
    DetailModel,
  },
  setup () {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const proTableRef = ref();
    const orgTreeData = reactive<MES.OrgTree[]>([]);
    const detailModelVisible = ref<boolean>(false);
    const userIds = ref<string | undefined>();
    const exportLoading = ref<boolean>(false);
    let exportParams = reactive<MES.ClockingExportClockingRecordExcelParams>({projectId,});
    const detailData = ref<MES.ClockingRecordInfo>();

    const defaultProps = {
      label:"orgName",
      children:"children",
    };

    const columns:ProTableColumn[] = [
      {
        title: "考勤日期",
        dataIndex: "clockingDate",
        valueType: "slot",
        search: true,
      },
      {
        title: "组织",
        dataIndex: "orgIds",
        valueType: "slot",
        search: true,
        hidden: true,
        placeholder: "组织",
      },
      {
        title: "组织",
        dataIndex: "orgNames",
        valueType: "string",
      },
      {
        title: "手机号",
        dataIndex: "mobile",
        valueType: "string",
        search: true,
        placeholder: "联系方式",
      },
      {
        title: "作业人员",
        dataIndex: "userName",
        valueType: "string",
        search: true,
        placeholder: "作业人员",
      },
      {
        title: "打卡时间",
        dataIndex: "clockingTimes",
        valueType: "string",
      },
      {
        title: "考勤状态",
        dataIndex: "clockingStatus",
        valueType: "enum",
        valueEnum: [
          {value:"done",label:"已打卡",},
          {value:"undone",label:"未打卡",}
        ],
        search: true,
        placeholder: "考勤状态",
      },
      {
        title: "打卡人",
        dataIndex: "clockingUserName",
        valueType: "string",
      },
      {
        title: "人员类型",
        dataIndex: "userType",
        valueType: "enum",
        valueEnum: dict.$state.userType,
        search: true,
        placeholder: "人员类型",
      },
      {
        title: "操作",
        dataIndex: "optional",
        valueType: "slot",
      }
    ];

    const disabledDate = (date: any) => {
      const today = dayjs(); // 获取当前日期
      const twoMonthsBefore = today.subtract(2, "month"); // 获取两个月前的日期

      // 如果该日期晚于今天或早于两个月前，则返回true以禁用该日期
      return dayjs(date).isAfter(today) || dayjs(date).isBefore(twoMonthsBefore);
    };

    const remoteOrg = async () => {
      try {
        const { data, } = await mesDepartmentQueryOrgTreeList({ projectId, });
        orgTreeData.push(...data);
      } catch (error) {
      }
    };

    const selectionChange = (selections: MES.ClockingRecordDTO[]) => {
      userIds.value = selections.map(({userId,}) => userId).join(",");
      exportParams.userIds = userIds.value;
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/clocking/exportClockingRecordExcel",
          method: "post",
          params:exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "打卡记录";
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

    const fetchTableList = async (data: MES.ClockingQueryClockingRecordPageListParams | any) => {
      const { clockingDate, orgIds, ...params} = data;
      params.projectId = projectId;
      params.startClockingDate = clockingDate && clockingDate[0];
      params.endClockingDate = clockingDate && clockingDate[1];
      params.clockingDate = undefined;
      params.orgIds = orgIds?.length === 0 ? undefined : orgIds?.toString();
      
      exportParams.startClockingDate = params.startClockingDate;
      exportParams.endClockingDate = params.endClockingDate;
      exportParams.orgIds = params.orgIds;
      exportParams.clockingStatus = params.clockingStatus;
      exportParams.userType = params.userType;
			
      return mesClockingQueryClockingRecordPageList(params);
    };

    const handlerDetail = async (row:MES.ClockingRecordDTO) => {
      const params = {
        projectId,
        userId: row.userId,
        clockingDate: row.clockingDate,
      };
      try {
        const {data,} = await mesClockingQueryClockingRecordInfo(params);
        detailData.value = data;
      } catch (error) {
      } finally {
        detailModelVisible.value = true;
      }
    };

    remoteOrg();

    return {
      proTableRef,
      columns,
      defaultProps,
      orgTreeData,
      detailModelVisible,
      detailData,
      disabledDate,
      selectionChange,
      fetchTableList,
      handlerDetail,
      handlerExport,
    }
  },
})
</script>

<style scoped>

</style>
