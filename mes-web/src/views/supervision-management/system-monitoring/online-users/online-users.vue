<template>
  <div class="online-users page-root">
    <card-header title="在线用户" />
    <el-pro-table
      ref="takeOffRef"
      row-key="sessionId"
      :columns="readColumns"
      :request="request"
      hidden-label
      show-index
    >
      <template #column-browser="{row}">
        {{ row.browser === 'Unknown' ? "未知" : row.browser }}
      </template>
      <template #column-os="{row}">
        {{ row.os === 'Unknown' ? "未知" : row.os }}
      </template>
      <template #column-operation="{row}">
        <el-button
          type="primary"
          link
          @click="handlerLogout(row)"
        >
          <el-icon
            :size="13"
            style="margin-right:2px"
          >
            <Delete />
          </el-icon>
          强退
        </el-button>
      </template>
    </el-pro-table>
  </div>
</template>

<script lang="ts">
import { mesLoginLogForceLogout, mesLoginLogSelectJayaOnlineLoginLogPageList } from "@/api/mes/loginLogController";
import { CardHeader } from "@/components";
import { ElMessage, ElMessageBox, ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "OnlineUsers",
  components:{
    CardHeader,
  },
  setup () {
    const takeOffRef = ref();

    const readColumns:ProTableColumn[] = [
      {
        title: "会话编号",
        dataIndex: "id",
        valueType: "string",
      },
      {
        title: "登录名称",
        dataIndex: "name",
        valueType: "string",
        search: true,
        placeholder: "用户名称",
      },
      {
        title: "部门名称",
        dataIndex: "deptNames",
        valueType: "string",
      },
      {
        title: "主机",
        dataIndex: "ip",
        valueType: "string",
        search: true,
        placeholder: "登录地址",
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
        title: "登录时间",
        dataIndex: "loginTime",
        valueType: "string",
      },
      {
        title: "操作",
        dataIndex: "operation",
        valueType: "slot",
      }
    ];

    const request = (params: any) => {
      return mesLoginLogSelectJayaOnlineLoginLogPageList(params);
    };

    const handlerLogout = (row: MES.LoginLogDTO) => {
      ElMessageBox.confirm(`是否确认强退名称为${row.name}的数据项？`, "系统提示", {
        type: "warning",
      }).then( async () => {
        const {success,} = await mesLoginLogForceLogout({current: <number>row.id,});
        success && ElMessage.success("强退成功");
        takeOffRef.value?.load();
      });
    };

    return {
      takeOffRef,
      readColumns,
      request,
      handlerLogout,
    }
  },
})
</script>

<style scoped>

</style>
