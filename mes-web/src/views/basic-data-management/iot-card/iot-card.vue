<template>
  <div class="iot-card page-root">
    <card-header title="物联网卡" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="iccid"
      :read-columns="readColumns"
      :with-menu="[]"
      :read-request="remote"
      :ext-params="extParams"
      :pro-table-props="{hiddenLabel:true}"
    />
  </div>
</template>

<script lang="ts">
import { mesDeviceIotCardPageList } from "@/api/mes/deviceController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import type { ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name:"IotCard",
  components:{
    CardHeader,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const extParams = {projectId,};

    const readColumns:ProTableColumn[] = [
      {
        title: "ICCIC号",
        dataIndex: "iccid",
        valueType: "string",
        search: true,
        placeholder: "ICCIC号",
      },
      {
        title: "IMEI号",
        dataIndex: "imei",
        valueType: "string",
        search: true,
        placeholder: "IMEI号",
      },
      {
        title: "套餐名称",
        dataIndex: "setmealName",
        valueType: "string",
      },
      {
        title: "状态",
        dataIndex: "status",
        valueType: "string",
      },
      {
        title: "入库日期",
        dataIndex: "inboundDate",
        valueType: "string",
      },
      {
        title: "出库日期",
        dataIndex: "outboundDate",
        valueType: "string",
      },
      {
        title: "首次激活日期",
        dataIndex: "firstActivateDate",
        valueType: "string",
      },
      {
        title: "最近激活日期",
        dataIndex: "recentlyActivateDate",
        valueType: "string",
      },
      {
        title: "本月用量",
        dataIndex: "thisMonthUsage",
        valueType: "string",
      },
      {
        title: "历史用量",
        dataIndex: "historyUsage",
        valueType: "string",
      },
      {
        title: "剩余流量",
        dataIndex: "thisMonthSurplusUsage",
        valueType: "string",
      },
      {
        title: "实名",
        dataIndex: "realName",
        valueType: "string",
      },
      {
        title: "报废",
        dataIndex: "scrap",
        valueType: "string",
      }
    ];

    const remote = async (params:MES.DeviceIotCardPageListParams) => {
      return mesDeviceIotCardPageList(params);
    };

    return {
      takeOffRef,
      readColumns,
      extParams,
      remote,
    }
  },
})
</script>

<style scoped>

</style>
