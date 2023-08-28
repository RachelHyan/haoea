<template>
  <div class="responsibility-area page-root">
    <card-header title="队别" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="id"
      :read-columns="readColumns"
      :write-columns="writeColumns"
      :write-rules="formRules"
      :read-request="readRequest"
      :create-request="createRequest"
      :update-request="updateRequest"
      :delete-request="deleteRequest"
      :ext-params="extParams"
      :pro-table-props="{hiddenLabel:true,selectionChange}"
    >
      <template #read-toolbar-left="{size}">
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
      <template #write-form-remarks="{model}">
        <el-input
          v-model="model.remarks"
          :rows="2"
          type="textarea"
          placeholder="请输入"
        />
      </template>
    </el-pro-crud>
  </div>
</template>

<script lang="ts">
import { mesAreaAddArea, mesAreaSelectAreaPageList, mesAreaUpdateArea } from "@/api/mes/areaController";
import { mesGridDeleteGrid } from "@/api/mes/gridController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import axios from "axios";
import {
  ElMessage,
  FormRules,
  ProCrudWriteColumn,
  ProTableColumn
} from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "ResponsibilityArea",
  components: {
    CardHeader,
  },
  setup() {
    const project = useProject();
    const takeOffRef = ref();
    const exportParams = reactive<any>({projectId: project.$state.projectId,});
    const exportLoading = ref(false);
    const ids = ref<number[]>([]);
    const extParams = {
      projectId: project.$state.projectId,
    };

    const readColumns: ProTableColumn[] = [
      {
        title: "队别名称",
        dataIndex: "areaName",
        valueType: "string",
        search: true,
        placeholder: "队别名称",
      },
      {
        title: "备注",
        dataIndex: "remarks",
        valueType: "string",
      }
    ];

    const writeColumns: ProCrudWriteColumn[] = [
      {
        title: "队别名称",
        dataIndex: "areaName",
        valueType: "string",
      },
      {
        title: "备注",
        dataIndex: "remarks",
        valueType: "slot",
      }
    ];

    const formRules: FormRules = {
      areaName: [{ required: true, message: "请输入队别名称", trigger: "blur", }],
    };

    const readRequest = async (params: MES.AreaSelectAreaPageListParams) => {
      exportParams.areaName = params.areaName;
      return mesAreaSelectAreaPageList(params);
    };

    const createRequest = async (params: MES._2) => {
      try {
			 const res =	await mesAreaAddArea(params);
			 takeOffRef.value.proTableRef.model.remarks = "";
			 return res;
      } catch(error){
        console.error(error);
				
      }
    };

    const updateRequest = async (params: MES._2) => {
      return mesAreaUpdateArea(params);
    };

    const selectionChange = (selections: MES._2[]) => {
      ids.value = selections.map(({ id, }) => id as number);
      exportParams.areaIds = ids.value.join(",");
    };

    const deleteRequest = async (params:any) => {
      return mesGridDeleteGrid({gridIds:params.id.toString(),projectId: project.$state.projectId as number,});
    };
		
    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const { data, status, } = await axios({
          url: "/api/mes/area/exportAreaExcel",
          method: "get",
          params: exportParams,
          responseType: "blob",
        });
        if (status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "队别";
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
      extParams,
      takeOffRef,
      readColumns,
      writeColumns,
      formRules,
      ids,
      exportLoading,
      readRequest,
      createRequest,
      updateRequest,
      selectionChange,
      deleteRequest,
      // deleteSelection,
      handlerExport,
    };
  },
});
</script>

<style scoped></style>
