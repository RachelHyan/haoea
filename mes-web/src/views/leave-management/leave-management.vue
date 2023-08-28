<template>
  <default-layout>
    <div class="leave-management page-root">
      <card-header title="请假管理" />
      <el-pro-table
        ref="proTabledRef"
        row-key="userName"
        :columns="columns"
        :request="readRequest"
        :hidden-label="true"
      >
        <template #form-leaveDate="{ model }">
          <el-date-picker
            v-model="model.leaveDate"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            clearable
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
            :props="{ label: 'orgName', children:'children', }"
          />
        </template>
        <template #toolbar-left="{size}">
          <el-button
            type="success"
            :size="size"
            plain
            :loading="exportLoading"
            @click="handlerExport"
          >
            导出
          </el-button>
        </template>
        <template #column-loginStatus="{row}">
          <el-tag :type="row.loginStatus === 1 ? 'danger': 'success'">
            {{ row.loginStatus === 1 ? '失败': '成功' }}
          </el-tag>
        </template>
        <template #column-browser="{row}">
          {{ row.browser === 'Unknown' ? "未知" : row.browser }}
        </template>
        <template #column-os="{row}">
          {{ row.os === 'Unknown' ? "未知" : row.os }}
        </template>
      </el-pro-table>
    </div>
  </default-layout>
</template>
<script lang="ts">
import { mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { mesWechatCaptainSelectLeaveRecordPageList } from "@/api/mes/wechatController";
import { CardHeader } from "@/components";
import { DefaultLayout } from "@/layout";
import { useProject } from "@/stores/project";
import axios from "axios";
import { ElMessage, ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "LeaveManagement",
  components: {CardHeader,DefaultLayout,},
  setup () {
    const proTableRef = ref();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const exportLoading = ref<boolean>(false);
    let exportParams = reactive<any>({projectId,});
    const orgTreeData = reactive<MES.OrgTree[]>([]);
    const leaveIds = ref<number[]>([]);
    const columns: ProTableColumn[] = [
      {
        title: "请假日期",
        dataIndex: "leaveDate",
        valueType: "slot",
        search: true,
      },
      {
        title: "组织",
        dataIndex: "orgIds",
        valueType: "slot",
        search: true,
        hidden: true,
        placeholder: "所属组织",
      },
      {
        title: "所属组织",
        dataIndex: "departmentNames",
        valueType: "string",
      },
      {
        title: "手机号",
        dataIndex: "phone",
        valueType: "string",
        search: true,
        placeholder: "联系方式",
      },
      {
        title: "作业人员",
        dataIndex: "userName",
        valueType: "string",
      },
      {
        title: "请假时长",
        dataIndex: "leaveDuration",
        valueType: "string",
      },
      {
        title: "请假班次",
        dataIndex: "leaveShift",
        valueType: "string",
      },
      {
        title: "请假类型",
        dataIndex: "leaveType",
        valueType: "string",
      },
      {
        title: "提交人",
        dataIndex: "submitUser",
        valueType: "string",
      },
      {
        title: "提交时间",
        dataIndex: "submitTime",
        valueType: "string",
      }
    ];

    const remoteOrg = async () => {
      try {
        const { data, } = await mesDepartmentQueryOrgTreeList({ projectId, });
        orgTreeData.push(...data);
      } catch (error) {
      }
    };

    const readRequest = async (data: any) => {
      const { current, pageSize, leaveDate, phone,} = data
      const params: MES.WechatCaptainSelectLeaveRecordPageListParams = {
        projectId,
        startTime: leaveDate ? leaveDate[0] : undefined,
        endTime: leaveDate ? leaveDate[1] : undefined,
        departmentIds: data.orgIds?.length === 0 ? undefined : data.orgIds?.toString(),
        phone,
        current,
        pageSize,
      }
      console.log(params);
      exportParams.startTime = leaveDate ? leaveDate[0] : undefined,
      exportParams.endTime = leaveDate ? leaveDate[1] : undefined,
      exportParams.departmentIds = data.orgIds?.length === 0 ? undefined : data.orgIds?.toString(),
      exportParams.phone = phone
      data.projectId = 7
      return mesWechatCaptainSelectLeaveRecordPageList(params);
    };


    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const { data, status, } = await axios({
          url: "/api/mes/wechat/captain/exportLeaveRecord",
          method: "get",
          params:exportParams,
          responseType: "blob",
        });
        if (status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "请假管理";
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

    remoteOrg()

    return {
      proTableRef,
      columns,
      exportLoading,
      exportParams,
      orgTreeData,
      leaveIds,
      readRequest,
      handlerExport,
    }
  },
})
</script>

<style lang="less">

</style>
