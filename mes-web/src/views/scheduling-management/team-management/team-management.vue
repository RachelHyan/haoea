<template>
  <router-view v-if="['team-management-add','team-management-edit'].includes(currentRouteName)" />
  <div
    v-else
    class="team-management page-root"
  >
    <card-header title="班组管理" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="shiftId"
      :read-columns="readColumns"
      :read-request="readRequest"
      :delete-request="deleteRequest"
      :with-menu="['delete']"
      :pro-table-props="{showIndex:false,hiddenLabel:true,tableProps:{spanMethod:dataSpanMethod}}"
      :ext-params="extParams"
    >
      <template #toolbar-right="{size}">
        <el-button
          type="primary"
          :size="size"
          @click="$router.push({name:'team-management-add'})"
        >
          新增
        </el-button>
      </template>
      <template #read-column-jobStartTime="{row}">
        {{ row.jobStartTime }}-{{ row.jobEndTime }}
      </template>
      <template #read-column-periodValue="{row}">
        <el-button
          link
          type="primary"
          @click="handlerPreview(row)"
        >
          {{ periodValueToText(row.periodType,row.periodValue) }}
        </el-button>
      </template>
      <template #write-column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="handlerEdit(row.teamId)"
        >
          编辑
        </el-button>
      </template>
    </el-pro-crud>
  </div>
  <el-dialog
    v-if="preViewCalendarVisible"
    v-model="preViewCalendarVisible"
    width="370px"
    title="预览"
  >
    <preview-calendar
      ref="previewCalendarRef"
      :render-day="renderDay"
    />
  </el-dialog>
</template>

<script lang="ts">
import { mesTeamDeleteTeam, mesTeamTeamPageList } from "@/api/mes/teamController";
import { CardHeader, PreviewCalendar } from "@/components";
import { useProject } from "@/stores/project";
import type { ProTableColumn } from "element-plus";
import { dayjs } from "element-plus";
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

interface RenderDayProps {
	year: number,
	month: number,
	day: number,
}

export default defineComponent({
  name:"TeamManagement",
  components:{
    CardHeader,
    PreviewCalendar,
  },
  setup() {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const router = useRouter();
    const currentRouteName = computed<string>(() => <string>router.currentRoute.value.name);
    const takeOffRef = ref();
    const tableList = ref<any>([]);
    const previewCalendarRef = ref();
    const currentData = reactive<{jobCreateTime?:string,periodType:string,periodValue:string}>({jobCreateTime:undefined,periodType:"",periodValue:"",});
    const preViewCalendarVisible = ref<boolean>(false);

    const extParams = {
      projectId,
    };

    const readColumns:ProTableColumn[] = [
      {
        dataIndex: "rowIndex",
        title: "序号",
        align: "center",
        width: 62,
        valueType: "string",
      },
      {
        dataIndex: "teamName",
        title: "班组",
        align: "center",
        valueType: "string",
        search: true,
        placeholder: "班组名称",
      },
      {
        dataIndex: "shiftName",
        title: "班次",
        align: "center",
        valueType: "string",
        search: true,
        placeholder: "班次名称",
      },
      {
        dataIndex: "type",
        title: "类型",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "orgName",
        title: "所属组织",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "jobStartTime",
        title: "作业时间",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "jobCreateTime",
        title: "任务生成时间",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "periodValue",
        title: "任务重复生成",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "checkingRuleGroupName",
        title: "考勤规则组",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "qualityRuleGroupName",
        title: "质量规则组",
        align: "center",
        valueType: "string",
      }
    ];

    const dataSpanMethod = ({column,row,columnIndex,}:any) => {		
      if (column.property === "teamName" || column.property === "optional" || columnIndex <= 1) {	
        return {
          rowspan: row.rowspan,
          colspan: 1,
        };
      }
    };

    const readRequest = async (params: MES.TeamTeamPageListParams) => {
      let { data, pageSize, total,current, } = await mesTeamTeamPageList(params);
      let tableData:any[] = [];
      data.forEach( (item,rowIndex) => {
        let list =  item.list.map(({type,periodType,shiftName,jobStartTime,jobEndTime,shiftId,orgName,jobCreateTime,periodValue,checkingRuleGroupName,qualityRuleGroupName,},index) => ({
          teamId:item.teamId,
          teamName:item.teamName,
          type,
          rowspan: index === 0?item.list.length:0,
          jobStartTime,
          jobEndTime,
          shiftId,
          shiftName,
          orgName,
          jobCreateTime,
          periodValue,
          periodType,
          checkingRuleGroupName,
          qualityRuleGroupName,
          rowIndex: (params.current - 1) * pageSize + rowIndex + 1,
        }));
        tableData.push(...list);
      });
      tableList.value = tableData;
      return {data:tableData, pageSize, total,current,};
    };

    const deleteRequest = async (params: {shiftId: number}) => {
      let teamId;
      tableList.value.forEach((item:any) => {
        if(item.shiftId === params.shiftId){
          teamId = item.teamId;
        }
      });
      return mesTeamDeleteTeam({shiftId:params.shiftId,teamId,projectId,});
    };

    const handlerEdit = (teamId:number) => {
      router.push({name:"team-management-edit",query:{id:teamId,},});
    };

    const periodValueToText = (periodType:string,periodValue:string) => {
      switch (periodType) {
      case "next-day":
        if(periodValue === "0"){
          return "每天";
        }
        return `间隔${periodValue.toString()}天`;
      case "week":
        let weekArr = ["周日","周一","周二","周三","周四","周五","周六"];
        let weekArr2 = periodValue.toString().split(",").map((item:string) => {
          return weekArr[Number(item)];
        })
        return `${weekArr2.join(",")}`;
      case "month":
        return `每月${periodValue.toString()}号`;
      default:
        return "";
      }
    };

    const handlerPreview = (row:any) => {
      currentData.jobCreateTime = row.jobCreateTime;
      currentData.periodType = row.periodType;
      currentData.periodValue = row.periodValue;
      preViewCalendarVisible.value = true;
    };

    const renderDay = (date:RenderDayProps) => {
      const periodValue = currentData.periodValue.split(",").map(val => parseInt(val));
      let startDate = dayjs(currentData.jobCreateTime).add(0,"day");
      let currentDate = dayjs(`${date.year}-${date.month}-${date.day}`);
      let diffDay = currentDate.diff(startDate,"day");
      if(diffDay < 0) {
        return "";
      }
      switch (currentData.periodType) {
      case "week":
        
        let day = dayjs(`${date.year}-${date.month}-${date.day}`).day();
        return periodValue.includes(day) ? "preview-calendar-day--work" : "";
      case "month":
        
        return periodValue.includes(date.day)?"preview-calendar-day--work":"";
      case "next-day":
        
        let match = diffDay % (periodValue[0] + 1) === 0;
        return match?"preview-calendar-day--work":"";
      default:
        return "";
      }
    };
		
    return {
      extParams,
      readColumns,
      takeOffRef,
      currentRouteName,
      previewCalendarRef,
      preViewCalendarVisible,
      readRequest,
      deleteRequest,
      dataSpanMethod,
      handlerEdit,
      renderDay,
      handlerPreview,
      periodValueToText,
    }
		
  },
})
</script>
<style lang="less">

</style>
