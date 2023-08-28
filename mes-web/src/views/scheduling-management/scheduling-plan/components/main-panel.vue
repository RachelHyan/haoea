<template>
  <div
    class="main-panel"
  >
    <div class="main-panel__card">
      <div
        class="panel-tabs main-panel__card-header"
      >
        <div
          class="panel-tab-pane"
          :class="activeTab === 1 ? 'panel-tab-pane--active' : ''"
          @click="tabChange(1)"
        >
          人工清扫
        </div>
        <div
          class="panel-tab-pane"
          :class="activeTab === 2 ? 'panel-tab-pane--active' : ''"
          @click="tabChange(2)"
        >
          车辆清扫
        </div>
      </div>
      <div class="main-panel__card-body">
        <el-pro-table
          v-if="activeTab === 1"
          ref="manualGridTableRef"
          :request="fetchManualGridList"
          :columns="gridColumns"
          :with-tools="[]"
          row-key="gridId"
          :show-index="true"
          :hidden-label="true"
          default-size="small"
          @row-click="handlerGridMap"
        />
        <el-pro-table
          v-else-if="activeTab === 2"
          ref="vehicleGridTableRef"
          :request="fetchVehicleGridList"
          :columns="gridColumns"
          :with-tools="[]"
          row-key="gridId"
          :show-index="true"
          :hidden-label="true"
          default-size="small"
          @row-click="handlerGridMap"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { mesPlanQueryPlanViewGridPageList } from "@/api/mes/planController";
import { mesTeamQueryTeamList } from "@/api/mes/teamController";
import { useProject } from "@/stores/project";
import type { ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainPanel",
  props:{
    activeTab:{
      type:Number,
      default:1,
    },
  },
  emits: ["gridClick","tableType","update:activeTab"],
  setup(_, { emit, }) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
		
    const manualGridTableRef = ref();
    const vehicleGridTableRef = ref();


    const gridColumns:ProTableColumn[] = [
      {
        title:"网格名称",
        dataIndex:"gridName",
        valueType:"string",
        search:true,
        placeholder: "网格名称",
      },
      {
        title:"所属班组",
        dataIndex:"teamId",
        valueType:"enum",
        search:true,
        hidden:true,
        placeholder: "班组",
        valueEnum:[],
      },
      {
        title:"所属班组",
        dataIndex:"teamName",
        valueType:"string",
      }
    ];

    const fetchTeamList = async () => {
      try {
        const {data,} = await mesTeamQueryTeamList({projectId,});
        gridColumns[1].valueEnum = data.map((item) => {
          return {
            label: item.teamName,
            value: item.teamId,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };
		
    const fetchManualGridList = async (params:MES.PlanQueryPlanViewGridPageListParams) => {
      params.projectId = projectId;
      params.type = "Manual_cleaning";
      try {
        return await mesPlanQueryPlanViewGridPageList(params);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchVehicleGridList = async (params:MES.PlanQueryPlanViewGridPageListParams) => {
      params.projectId = projectId;
      params.type = "Vehicle_operation";
      try {
        return await mesPlanQueryPlanViewGridPageList(params);
      } catch (error) {
        console.error(error);
      }
    };

    const handlerGridMap = (row: MES.PlanViewGridDTO[]) => {
      emit("gridClick", row);
    };

    const tabChange = (tab:number) => {
      const type = tab === 1 ? "Manual_cleaning" : "Vehicle_operation";
      emit("tableType", type);
      emit("update:activeTab", tab);
    };

    fetchTeamList();

    return {
      manualGridTableRef,
      vehicleGridTableRef,
      gridColumns,
      fetchManualGridList,
      fetchVehicleGridList,
      handlerGridMap,
      tabChange,
    }
  },
})
</script>
<style lang="less">
.main-panel {
	overflow-y:auto;
	&::-webkit-scrollbar {
		display: none;
	}
	
	&__card {

		&-header {
			height: 38px;
			padding: 0 24px;
			border-bottom: 1px solid #F2F3F4;
			display: flex;
			align-items: center;

			.el-icon {
				cursor: pointer;
			}

			&-title {
				flex: 1;
				font-size: 18px;
			}
		}

		&-body {
			flex: 1;

			.el-pro-table-body {
				width: 100%;
				box-sizing: border-box;
			}
		}
	}
}
</style>
