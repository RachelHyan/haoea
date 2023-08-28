<template>
  <div class="component-management page-root">
    <card-header title="部件管理" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="id"
      :read-columns="readColumns"
      :read-request="readRequest"
      :delete-request="deleteRequest"
      :with-menu="['delete']"
      :ext-params="extParams"
      :pro-table-props="{hiddenLabel:true,showIndex:true,selectionChange}"
    >
      <template #read-toolbar-left="{size}">
        <el-button
          type="danger"
          :size="size"
          :disabled="!ids.length"
          @click="deleteSelection"
        >
          删除
        </el-button>
        <el-button
          type="success"
          plain
          :size="size"
          :loading="exportLoading"
          @click="handlerExport"
        >
          导出
        </el-button>
      </template>
      <template #read-column-place="{row}">
        <el-tag>
          {{ row.place }}
        </el-tag>
      </template>
      <template #toolbar-right="{size}">
        <el-button
          type="primary"
          :size="size"
          @click="handlerAdd"
        >
          新增
        </el-button>
      </template>
      <template #write-column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="handlerEdit(row)"
        >
          编辑
        </el-button>
      </template>
    </el-pro-crud>
    <form-dialog
      v-if="formVisible"
      v-model:model-value="formVisible"
      :data="formData"
      :title="formTitle"
      :area-list="formAreaList"
      :inspector-list="forminspectorList"
      @refresh="takeOffRef.load()"
    />
  </div>
</template>

<script lang="ts">
import { mesPartsDeleteParts, mesPartsSelectAreaList, mesPartsSelectPartsPageList } from "@/api/mes/partsController";
import { mesPlanQueryPlanInspectorUserList } from "@/api/mes/planController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import axios from "axios";
import { ElMessage, ElMessageBox, ProTableColumn } from "element-plus";
import { defineComponent, onMounted, reactive, ref } from "vue";
import FormDialog from "./components/form-dialog.vue";

export default defineComponent({
  name: "ComponentManagement",
  components: {
    CardHeader,
    FormDialog,
  },
  setup () {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const exportParams = reactive<any>({projectId,});
    const exportLoading = ref(false);
    const ids = ref<number[]>([]);
    const formVisible = ref(false);
    const formData = ref({});
    const formTitle = ref("");
    const formAreaList = ref();
    const forminspectorList = ref();
    const extParams = {
      projectId,
    };

    const readColumns: ProTableColumn[] = [
      {
        title: "编码",
        dataIndex: "partsCode",
        valueType: "string",
      },
      {
        title: "队别",
        dataIndex: "areaId",
        valueType: "enum",
        valueEnum: [],
        placeholder: "队别",
        search: true,
        hidden: true,
      },
      {
        title: "队别",
        dataIndex: "areaName",
        valueType: "string",
      },
      {
        title: "点位",
        dataIndex: "partsName",
        valueType: "string",
        placeholder: "点位",
        search: true,
      },
      {
        title: "场所",
        dataIndex: "partsType",
        valueType: "enum",
        valueEnum: dict.$state.pointType,
        placeholder: "场所",
        search: true,
      },
      {
        title: "经度",
        dataIndex: "longitude",
        valueType: "string",
      },
      {
        title: "纬度",
        dataIndex: "latitude",
        valueType: "string",
      },
      {
        title: "督查类型",
        dataIndex: "inspectionType",
        valueType: "enum",
        valueEnum: dict.$state.inspectionType,
        placeholder: "督查类型",
        search: true,
      },
      {
        title: "督查员",
        dataIndex: "inspectionUser",
        valueType: "string",
      },
      {
        title: "督查员",
        dataIndex: "inspectionUserId",
        valueType: "enum",
        valueEnum: [],
        placeholder: "督查员",
        search: true,
        hidden:true,
      },
      {
        title: "地址",
        dataIndex: "fullAddress",
        valueType: "string",
      },
      {
        title: "描述",
        dataIndex: "description",
        valueType: "string",
      }
    ];


    const readRequest = async (params: MES.PartsSelectPartsPageListParams) => {
      exportParams.areaId = params.areaId;
      exportParams.inspectionUserId = params.inspectionUserId;
      exportParams.partsName = params.partsName;
      exportParams.partsType = params.partsType;
      return mesPartsSelectPartsPageList(params);
    };

    const selectionChange = (selections: MES.PartsDTO[]) => {
      ids.value = selections.map(({ id, }) => id as number);
      exportParams.partsIds = ids.value.join(",");
    };

    const deleteRequest = async (params: { id: number }) => {
      return mesPartsDeleteParts({ids:params.id.toString(),});
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${ids.value.length}条数据吗?`, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesPartsDeleteParts({ids:ids.value.join(","),});
              done();
              instance.confirmButtonLoading = false;
              ElMessage.success("删除成功");
              takeOffRef.value.load();
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
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const { data, status, } = await axios({
          url: "/api/mes/parts/exportPartsList",
          method: "get",
          params: exportParams,
          responseType: "blob",
        });
        if (status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "部件管理";
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

    const fetchWriteColumns = async () => {
      const [areaList, inspectorList] = await Promise.all([
        mesPartsSelectAreaList({ projectId, }),
        mesPlanQueryPlanInspectorUserList({ projectId, })
      ]);
      formAreaList.value = areaList.data.map((item: any) => {
        return {
          label: item.areaName,
          value: item.areaId,
        };
      });
      forminspectorList.value = inspectorList.data.map((item: any) => {
        return {
          label: item.inspectorUserName,
          value: item.inspectorUserId,
        };
      });

      readColumns[1].valueEnum = formAreaList.value;
      readColumns[9].valueEnum = forminspectorList.value;
    };

    const handlerAdd = () => {
      formData.value = {};
      formTitle.value = "新增";
      formVisible.value = true;
    };

    const handlerEdit = (row:any) => {
      formData.value = row;
      formTitle.value = "编辑";
      formVisible.value = true;
    };
		
    onMounted(fetchWriteColumns);

    return {
      extParams,
      takeOffRef,
      readColumns,
      ids,
      exportLoading,
      formVisible,
      formData,
      formTitle,
      formAreaList,
      forminspectorList,
      readRequest,
      selectionChange,
      deleteRequest,
      deleteSelection,
      handlerExport,
      handlerAdd,
      handlerEdit,
    };
  },
})
</script>

<style scoped>

</style>
