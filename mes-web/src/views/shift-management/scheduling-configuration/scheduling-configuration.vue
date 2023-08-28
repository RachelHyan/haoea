<template>
  <router-view v-if="['scheduling-configuration-add','scheduling-configuration-edit'].includes(currentRouteName)" />
  <div
    v-else
    class="scheduling-configuration page-root"
  >
    <card-header title="排班配置" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="shiftId"
      :read-columns="readColumns"
      :read-request="readRequest"
      :pro-table-props="{showIndex:false,hiddenLabel:true,tableProps:{spanMethod:dataSpanMethod}}"
      :ext-params="extParams"
      :with-menu="[]"
    >
      <template #toolbar-right="{size}">
        <el-button
          type="primary"
          :size="size"
          @click="$router.push({name:'scheduling-configuration-add'})"
        >
          新增
        </el-button>
      </template>
      <template #read-column-jobStartTime="{row}">
        {{ row.jobStartTime }}-{{ row.jobEndTime }}
      </template>
      <template #write-column-optional="{row}">
        <div v-show="!row.isSystem">
          <el-button
            type="primary"
            link
            @click="handlerEdit(row.teamId)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            link
            @click="deleteRequest(row)"
          >
            删除
          </el-button>	
        </div>
      </template>
    </el-pro-crud>
  </div>
</template>

<script lang="ts">
import { mesTeamDeleteTeam, mesTeamTeamPageList } from "@/api/mes/teamController";
import { useProject } from "@/stores/project";
import { ElMessageBox, ProTableColumn } from "element-plus";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SchedulingConfiguration",
  setup () {
    const router = useRouter();
    const currentRouteName = computed<string>(() => <string>router.currentRoute.value.name);
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const tableList = ref<any>([]);

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
        dataIndex: "jobStartTime",
        title: "作业时间",
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
        let list =  item.list.map(({type,shiftName,jobStartTime,jobEndTime,shiftId,isSystem,},index) => ({
          teamId:item.teamId,
          teamName:item.teamName,
          type,
          rowspan: index === 0?item.list.length:0,
          jobStartTime,
          jobEndTime,
          shiftId,
          shiftName,
          isSystem,
          rowIndex: (params.current - 1) * pageSize + rowIndex + 1,
        }));
        tableData.push(...list);
      });
      tableList.value = tableData;
      return {data:tableData, pageSize, total,current,};
    };

    const deleteRequest = (params: {shiftId: number,teamId:number}) => {
      ElMessageBox.confirm("若该班组已被绑定排班，则同步删除今日排班，请确认是否删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        mesTeamDeleteTeam({shiftId:params.shiftId,teamId:params.teamId,projectId,}).then(() => {
          takeOffRef.value?.load();
        });
      }).catch(() => {
        // console.log("取消删除");
      });
    };

    const handlerEdit = (teamId:number) => {
      router.push({name:"scheduling-configuration-edit",query:{id:teamId,},});
    };

    return {
      currentRouteName,
      takeOffRef,
      readColumns,
      extParams,
      dataSpanMethod,
      readRequest,
      deleteRequest,
      handlerEdit,
    }
  },
})
</script>

<style scoped>

</style>
