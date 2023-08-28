<template>
  <div class="login-log page-root">
    <card-header title="登录日志" />
    <el-pro-table
      ref="proTabledRef"
      row-key="operId"
      :columns="columns"
      :request="readRequest"
      :hidden-label="true"
    >
      <template #form-loginTime="{ model }">
        <el-date-picker
          v-model="model.loginTime"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #toolbar-left>
        <!-- <el-button
          type="danger"
          :size="size"
          :disabled="ids.length ? true : false"
          @click="deleteSelection"
        >
          删除
        </el-button>
        <el-button
          type="success"
          :size="size"
          :loading="exportLoading"
          @click="handlerExport"
        >
          导出
        </el-button> -->
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
</template>

<script lang="ts">
import { mesLoginLogSelectJayaLoginLogPageList } from "@/api/mes/loginLogController";
import { CardHeader } from "@/components";
import axios from "axios";
import { ElMessage, ElMessageBox, ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginLog",
  components: {CardHeader,},
  setup () {
    const proTableRef = ref();
    const exportLoading = ref<boolean>(false);
    const exportParams = ref<any>({});
    const ids = ref<number[]>([]);
    const columns: ProTableColumn[] = [
      {
        title: "访问编号",
        dataIndex: "id",
        valueType: "string",
      },
      {
        title: "用户名称",
        dataIndex: "name",
        valueType: "string",
        search: true,
        placeholder: "用户名称",
      },
      {
        title: "登录地址",
        dataIndex: "ip",
        valueType: "string",
        search: true,
        placeholder: "登录地址",
      },
      {
        title: "登录地点",
        dataIndex: "location",
        valueType: "string",
      },
      {
        title: "浏览器",
        dataIndex: "browser",
        valueType: "string",
      },
      {
        title: "操作系统",
        dataIndex: "os",
        valueType: "string",
      },
      {
        title: "登录状态",
        dataIndex: "loginStatus",
        valueType: "enum",
        valueEnum: [{label: "成功",value: 0,},{label: "失败", value: 1,}],
        search: true,
        placeholder: "登录状态",
      },
      {
        title: "登录日期",
        dataIndex: "loginTime",
        valueType: "slot",
        search: true,
      }
    ];

    const readRequest = async (data: any) => {
      const params: any = { ...data, };
      params.startDate = data.loginTime && data.loginTime[0];
      params.endDate = data.loginTime && data.loginTime[1];
      params.loginTime = undefined;
      exportParams.value = params;
      return mesLoginLogSelectJayaLoginLogPageList(params);
    };

    const selectionChange = (selections: MES.LoginLogDTO[]) => {
      ids.value = selections.map(({ id, }) => id as number);
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${ids.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await ({ids:ids.value,});
              done();
              instance.confirmButtonLoading = false;
              ElMessage.success("删除成功");
              proTableRef.value.load();
            } catch (error) {
              done();
            }
          } else {
            done();
          }
        },
      }).catch(() => undefined);
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      const params: Record<string, any> = {};
      try {
        const { data, status, } = await axios({
          url: "",
          method: "post",
          params,
          responseType: "blob",
        });
        if (status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "租户管理";
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

    return {
      proTableRef,
      columns,
      exportLoading,
      exportParams,
      ids,
      readRequest,
      deleteSelection,
      selectionChange,
      handlerExport,
    }
  },
})
</script>

<style lang="less">

</style>
