<template>
  <div class="issue-rectification-record page-root">
    <card-header title="整改记录" />
    <el-pro-crud
      ref="takeOffRef"
      :read-columns="readColumns"
      :read-request="remote"
      :delete-request="deleteRequest"
      :with-menu="['delete']"
      row-key="recordId"
      :pro-table-props="{selectionChange,hiddenLabel:true}"
    >
      <template #read-form-inspectionTime="{ model }">
        <el-date-picker
          v-model="model.inspectionTime"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #read-form-rectifierTime="{ model }">
        <el-date-picker
          v-model="model.rectifierTime"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #read-toolbar-left="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="handlerExport"
        >
          导出
        </el-button>
      </template>
      <template #read-column-inspectionRecordId="{row}">
        <el-button
          type="success"
          link
          @click="handlerRecord(row.inspectionRecordId)"
        >
          查看记录
        </el-button>
      </template>
      <template #read-column-rectifierStatus="{ row }">
        <el-tag :type="row.rectifierStatus ? 'success' : 'danger'">
          {{ row.rectifierStatus ? '已整改' : '未整改' }}
        </el-tag>
      </template>
      <template #write-column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="handlerEdit(row.recordId)"
        >
          编辑
        </el-button>
      </template>
    </el-pro-crud>
    <view-records
      v-if="detailVisible"
      v-model:model-value="detailVisible"
      :data="detailData"
    />
    <edit-records
      v-if="editVisible"
      :id="editId"
      v-model:model-value="editVisible"
      @closed="takeOffRef.load()"
    />
  </div>
</template>

<script lang="ts">
import { mesInspectionTaskQueryInspectionRecordInfo } from "@/api/mes/inspectionTaskController";
import { mesProblemQueryProblemSwitchList } from "@/api/mes/problemController";
import { mesProblemItemQueryRectifierUserList } from "@/api/mes/problemItemController";
import { mesRectifierDeleteRectifierRecord, mesRectifierQueryRectifierRecordPageList } from "@/api/mes/rectifierController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import axios from "axios";
import { ElMessage, ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import editRecords from "./components/edit-records.vue";
import ViewRecords from "./components/view-records.vue";

export default defineComponent({
  name: "IssueRectificationRecord",
  components: {
    CardHeader,
    ViewRecords,
    editRecords,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const recordIds = ref<(number | undefined)[]>([]);
    const exportLoading = ref<boolean>(false);
    const exportParams = reactive<MES.RectifierExportRectifierRecordExcelParams>({projectId,});
    const detailVisible = ref<boolean>(false);
    const detailData = ref({});
    const editVisible = ref<boolean>(false);
    const editId = ref<number | undefined>(undefined);

    const readColumns:ProTableColumn[] = [
      {
        dataIndex: "pointName",
        title: "对象",
        align: "center",
        valueType: "string",
        search:true,
        placeholder:"请输入",
      },
      {
        dataIndex: "inspectionRecordId",
        title: "督查记录",
        align: "center",
        valueType: "slot",
      },
      {
        dataIndex: "problemDesc",
        title: "问题描述",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "inspectionTime",
        title: "问题产生时间",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "inspectionTime",
        title: "问题日期",
        valueType: "slot",
        hidden: true,
        search: true,
      },
      {
        dataIndex: "rectifierTime",
        title: "整改日期",
        valueType: "slot",
        hidden: true,
        search: true,
      },
      {
        dataIndex: "problemType",
        title: "问题类型",
        valueType: "enum",
        hidden: true,
        search: true,
        valueEnum:[],
      },
      {
        dataIndex: "rectifierStatus",
        title: "是否整改",
        search: true,
        hidden: true,
        valueType: "enum",
        valueEnum:[
          {label:"是",value:"1",},
          {label:"否",value:"0",}
        ],
        placeholder:"请选择",
      },
      {
        dataIndex: "rectifierUserName",
        title: "整改员",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "rectifierUserId",
        title: "整改员",
        align: "center",
        search: true,
        hidden: true,
        valueType: "enum",
        valueEnum:[],
        placeholder:"请选择",
      },
      {
        dataIndex: "rectifierStatus",
        title: "整改状态",
        align: "center",
        valueType: "slot",
      },
      {
        dataIndex: "rectifierTime",
        title: "整改时间",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "remarks",
        title: "整改描述",
        align: "center",
        valueType: "string",
      }
    ];

    const fetchRectifierUser = async () => {
      try {
        const { data, } = await mesProblemItemQueryRectifierUserList({projectId,});
        readColumns[9].valueEnum = data.map((item:any) => {
          return {
            label: item.userName,
            value: item.userId,
          };
        });
      } catch (error) {
        console.error(error);
				
      }
    };
		
    const fetchProblemSwitch = async () => {
      try {
        const { data, } = await mesProblemQueryProblemSwitchList({projectId,});
        readColumns[6].valueEnum = data.map((item:any) => {
          return {
            label: item,
            value: item,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };

    const selectionChange = (selections: MES.InspectionRecordDTO[]) => {
      recordIds.value = selections.map(({recordId,}) => recordId);
      exportParams.recordIds = recordIds.value.join(",");
    };

    const remote = async (params:any) => {
      params.projectId = projectId;
      params.rectifierStartTime = params.rectifierTime && params.rectifierTime[0];
      params.rectifierEndTime = params.rectifierTime && params.rectifierTime[1];
      params.rectifierTime = undefined;
      params.inspectionStartTime = params.inspectionTime && params.inspectionTime[0];
      params.inspectionEndTime = params.inspectionTime && params.inspectionTime[1];
      params.inspectionTime = undefined;

      exportParams.rectifierStartTime = params.rectifierStartTime;
      exportParams.rectifierEndTime = params.rectifierEndTime;
      exportParams.inspectionStartTime = params.inspectionStartTime;
      exportParams.inspectionEndTime = params.inspectionEndTime;
      exportParams.pointName = params.pointName;
      exportParams.problemType = params.problemType;
      exportParams.rectifierStatus = params.rectifierStatus;
      exportParams.rectifierUserId = params.rectifierUserId;
      try {
        let res = await mesRectifierQueryRectifierRecordPageList(params);
        return res;
      } catch (error) {
        console.error(error);
				
      }
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/rectifier/exportRectifierRecordExcel",
          method: "post",
          params:exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "整改记录";
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

    const deleteRequest = async (params: {recordId: number}) => {
      return mesRectifierDeleteRectifierRecord({recordId: params.recordId,});
    };

    const  handlerRecord = async (recordId: number) => {
      try {
        const {data,} = await mesInspectionTaskQueryInspectionRecordInfo({recordId,projectId,});
        detailData.value = data;
      } catch (error) {
        console.error(error);
      } finally {
        detailVisible.value = true;
      }
    };

    const handlerEdit = (recordId: number) => {
      editId.value = recordId;
      editVisible.value = true;
    };

    fetchRectifierUser();
    fetchProblemSwitch();

    return {
      takeOffRef,
      recordIds,
      readColumns,
      detailVisible,
      detailData,
      editId,
      editVisible,
      selectionChange,
      remote,
      handlerExport,
      deleteRequest,
      handlerRecord,
      handlerEdit,
    }
  },
})
</script>

<style scoped>

</style>
