<template>
  <draggable
    :width="isPanelCollapsed ? 44 : 388"
    :top="16"
    :left="16"
    boundary
    :title="cardType === 'grid' ? '网格列表' : currentGrid.gridName"
    :is-back="isBack"
    @clickPanelBack="clickPanelBack"
  >
    <template #content>
      <div
        v-show="!isPanelCollapsed"
        class="table-panel"
      >
        <div
          class="table-panel-header"
          :style="{justifyContent: cardType === 'object' ? '' : 'center'}"
        >
          <el-icon
            v-if="cardType === 'object'"
            :size="20"
            class="back-icon"
            @click="clickPanelBack"
          >
            <ArrowLeftBold />
          </el-icon>
          <h5
            class="table-panel-header-title"
            :style="{flex: cardType === 'object' ? 1 : ''}"
          >
            {{ cardType === 'grid' ? '网格列表' : currentGrid.gridName }}
          </h5>
          <el-icon
            size="20"
            class="icon-normal"
            @click="isPanelCollapsed = !isPanelCollapsed"
          >
            <ArrowUpBold />
          </el-icon>
        </div>
        <el-pro-table
          v-if="cardType === 'grid'"
          ref="gridTableRef"
          :class="isPanelCollapsed ? 'table-panel-body--collapsed' : ''"
          :columns="gridTableColumns"
          :request="fetchGridTableList"
          row-key="gridId"
          default-size="small"
          hidden-label
          @row-click="clickGridRow"
        >
          <template #column-operation="{row}">
            <el-button
              type="primary"
              link
              @click.stop="clickEditGrid(row)"
            >
              编辑
            </el-button>
          </template>
        </el-pro-table>
        <el-pro-table
          v-else-if="cardType === 'object'"
          ref="objectTableRef"
          :class="isPanelCollapsed ? 'table-panel-body--collapsed' : ''"
          :columns="objectTableColumns"
          :request="fetchObjectTableList"
          row-key="objectId"
          default-size="small"
          hidden-label
          @row-click="clickObjectRow"
        />
      </div>
      <div
        v-show="isPanelCollapsed"
        class="icon-collapsed"
      >
        <el-icon
          size="20"
          class="icon-normal"
          style="cursor: pointer;"
          @click="isPanelCollapsed = !isPanelCollapsed"
        >
          <ArrowDownBold />
        </el-icon>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { mesJobObjectObjectPageList, mesJobObjectQueryJayaMapGridPageList } from "@/api/mes/jobObjectController";
import { Draggable } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import { ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "TablePanel",
  components: {
    Draggable,
  },
  props: {
    currentDistrictName: {
      type: String,
      default: "",
    },
  },
  emits:["clickObject","clickGrid","clickPanelBack","showInfoWindow","update:cardType"],
  setup (props,{emit,}) {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;

    const gridTableRef = ref();
    const objectTableRef = ref();
    const cardType = ref<"grid" | "object">("grid");
    const currentGrid = reactive({gridName:"",gridId:0,});
    const isBack = ref(false);
    const isPanelCollapsed = ref(false);

    const gridTableColumns:ProTableColumn[] = [
      {
        title:"网格名称",
        dataIndex:"gridName",
        valueType:"string",
        search:true,
        placeholder: "网格名称",
      },
      {
        title:"负责人",
        dataIndex:"chargeUserName",
        valueType:"string",
      },
      {
        title:"操作",
        dataIndex:"operation",
        valueType:"string",
      }
    ];

    const objectTableColumns:ProTableColumn[] = [
      {
        title:"编码",
        dataIndex:"objectCode",
        valueType:"string",
      },
      {
        title:"对象名称",
        dataIndex:"objectName",
        valueType:"string",
        search:true,
        placeholder: "对象名称",
      },
      {
        title:"对象类型",
        dataIndex:"sceneType",
        valueType:"enum",
        search:true,
        placeholder: "对象类型",
        valueEnum:dict.$state.sceneType,
      }
    ];

    const fetchGridTableList = async (params:MES.JobObjectQueryJayaMapGridPageListParams) => {
      params.projectId = projectId;
      params.type = "Manual_cleaning";
      params.district = props.currentDistrictName;
      return mesJobObjectQueryJayaMapGridPageList(params);
    };

    const fetchObjectTableList = async (params:MES.JobObjectObjectPageListParams) => {
      params.projectId = projectId;
      params.gridId = currentGrid.gridId;
      params.type = "Manual_cleaning";
      return mesJobObjectObjectPageList(params);
    };

    const clickPanelBack = () => {
      cardType.value = "grid";
      isBack.value = false;

      emit("clickPanelBack");
      emit("update:cardType",cardType.value);
    };

    const clickGridRow = (row:MES.PlanViewGridDTO) => {
      cardType.value = "object";
      isBack.value = true;
			
      currentGrid.gridId = row.gridId;
      currentGrid.gridName = row.gridName;

      emit("clickGrid",row);
      emit("update:cardType",cardType.value);
    };

    const clickObjectRow = (row:MES.JobObjectDTO) => {
      emit("clickObject",row);
    };

    const clickEditGrid = (row:MES.PlanViewGridDTO) => {
      emit("showInfoWindow",row,"grid");
    };

    return {
      projectId,
      gridTableRef,
      objectTableRef,
      isBack,
      isPanelCollapsed,
      cardType,
      gridTableColumns,
      objectTableColumns,
      currentGrid,
      fetchGridTableList,
      fetchObjectTableList,
      clickPanelBack,
      clickGridRow,
      clickObjectRow,
      clickEditGrid,
    }
  },
})
</script>

<style lang="less">
.table-panel {
	min-height: 150px;
		max-height: calc(100vh - 180px);
		background-color: #fff;
		display: flex;
		flex-direction: column;
		position: relative;
		box-shadow: 0 1px 4px 2px rgb(0 0 0 / 11%);

	&-header {
			background-color: #fff;
			height: 38px;
			padding: 0 24px;
			border-bottom: 1px solid #F2F3F4;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			position: relative;

			.back-icon {
				cursor: pointer;
				position: absolute;
				left: 24px;
			}

			&-title {
				font-size: 18px;
			}

			.icon-normal {
				position: absolute;
				right: 30px;
				cursor: pointer;
			}
		}

			&-body {
			flex: 1;

				.el-pro-table-body {
					width: 100%;
					box-sizing: border-box;
				}

				&--collapsed {

					.el-pro-table-body {
						display: none;
					}
			}
		}
	}

	.icon-collapsed {
			width: 24px;
			height: 24px;
			background-color: #fff;
			border-radius: 50%;
			padding: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 1px 4px 2px rgb(0 0 0 / 11%);

			.el-icon {
				cursor: pointer;
			}
		}


</style>
