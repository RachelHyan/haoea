<template>
  <div class="supervision-record page-root">
    <card-header title="督查记录" />
    <el-pro-crud
      ref="takeOffRef"
      :read-columns="columns"
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
      <template #read-column-inspection="{ row }">
        <el-tag :type="row.inspection ? 'danger' : 'success'">
          {{ row.inspection ? '存在问题' : '正常' }}
        </el-tag>
      </template>
      <template #read-column-rectifierBeforePictureList="{ row }">
        <div v-if="row.rectifierBeforePictureList">
          <el-image
            v-for="(img, index) in row.rectifierBeforePictureList.slice(0, 3)"
            :key="index"
            :src="img"
            style="width: 30px; height: 30px; margin-right: 10px; cursor: pointer;"
            :zoom-rate="1.2"
            :preview-src-list="row.rectifierBeforePictureList"
            :initial-index="index"
            fit="cover"
            preview-teleported
          >
            <template #error>
              <span class="avatar-error">加载失败</span>
            </template>
          </el-image>
          <span v-if="row.rectifierBeforePictureList.length > 3">...</span>
        </div>
      </template>
      <template #read-column-rectifierAfterPictureList="{ row }">
        <div v-if="row.rectifierAfterPictureList">
          <el-image
            v-for="(img, index) in row.rectifierAfterPictureList.slice(0, 3)"
            :key="index"
            :src="img"
            style="width: 30px; height: 30px; margin-right: 10px; cursor: pointer;"
            :zoom-rate="1.2"
            :preview-src-list="row.rectifierAfterPictureList"
            :initial-index="index"
            fit="cover"
            preview-teleported
          >
            <template #error>
              <span class="avatar-error">加载失败</span>
            </template>
          </el-image>
          <span v-if="row.rectifierAfterPictureList.length > 3">...</span>
        </div>
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
      <template #write-column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="handleViewDetails(row.recordId)"
        >
          查看
        </el-button>
      </template>
    </el-pro-crud>
    <!-- <div
      v-if="dialogVisible"
      class="view-images"
    >
      <el-image
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        style="width: 100%; height: 100%;"
        :zoom-rate="1.2"
        :preview-src-list="images"
        :initial-index="index"
        fit="cover"
      >
        <template #error>
          <span class="avatar-error">加载失败</span>
        </template>
      </el-image>
    </div> -->
    <view-details
      v-if="detailVisible"
      ref="detailRef"
      v-model:model-value="detailVisible"
      :data="detailData"
    />
  </div>
</template>

<script lang="ts">
import { mesInspectionTaskDeleteInspectionRecord, mesInspectionTaskQueryInspectionRecordInfo, mesInspectionTaskQueryInspectionRecordPageList } from "@/api/mes/inspectionTaskController";
import { mesPlanQueryPlanInspectorUserList } from "@/api/mes/planController";
import { mesProblemItemQueryRectifierUserList } from "@/api/mes/problemItemController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import axios from "axios";
import { ElMessage, ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import ViewDetails from "./components/view-details.vue";

export default defineComponent({
  name: "SupervisionRecord",
  components: {
    CardHeader,
    ViewDetails,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const detailRef = ref();
    const exportLoading = ref<boolean>(false);
    const detailVisible = ref<boolean>(false);
    const detailData = ref({});
    const images = ref([]);
    const recordIds = ref<(number | undefined)[]>([]);
    const exportParams= reactive<MES.InspectionTaskExportInspectionRecordExcelParams>({projectId,});

    const columns:ProTableColumn[] = [
      {
        dataIndex: "pointName",
        title: "对象",
        align: "center",
        valueType: "string",
        search: true,
        placeholder:"对象",
      },
      {
        dataIndex: "inspectionUserName",
        title: "督查员",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "inspectionUserId",
        title: "督查员",
        align: "center",
        search: true,
        hidden: true,
        valueType: "enum",
        valueEnum:[],
        placeholder:"督查员",
      },
      {
        dataIndex: "rectifierUserId",
        title: "整改员",
        align: "center",
        search: true,
        hidden: true,
        valueType: "enum",
        valueEnum:[],
        placeholder:"整改员",
      },
      {
        dataIndex: "inspectionTime",
        title: "督查时间",
        align: "center",
        valueType: "slot",
        hidden: true,
        search: true,
      },
      {
        dataIndex: "inspectionTime",
        title: "督查时间",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex:"inspection",
        title:"有无问题",
        align:"center",
        valueType:"enum",
        valueEnum:[
          {label:"有",value:"1",},
          {label:"无",value:"0",}
        ],
        search:true,
        hidden:true,
        placeholder:"有无问题",
      },
      {
        dataIndex: "inspection",
        title: "督查情况",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "rectifier",
        title: "整改情况",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "rectifierUserNames",
        title: "整改员",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "rectifierBeforePictureList",
        title: "整改前照片",
        align: "center",
        valueType: "slot",
      },
      {
        dataIndex: "rectifierAfterPictureList",
        title: "整改后照片",
        align: "center",
        valueType: "slot",
      }
    ];
		
    const selectionChange = (selections: MES.InspectionRecordDTO[]) => {
      recordIds.value = selections.map(({recordId,}) => recordId);
      exportParams.recordIds = recordIds.value.join(",");
    };

    const remote = async (params:any) => {
      params.projectId = projectId;
      params.startTime = params.inspectionTime && params.inspectionTime[0];
      params.endTime = params.inspectionTime && params.inspectionTime[1];
      params.inspectionTime = undefined;

      exportParams.startTime = params.startTime;
      exportParams.endTime = params.endTime;
      exportParams.inspection = params.inspection;
      exportParams.inspectionUserId = params.inspectionUserId;
      exportParams.pointName = params.pointName;
      exportParams.rectifierUserId = params.rectifierUserId;
      try {
        let res = await mesInspectionTaskQueryInspectionRecordPageList(params);
        return res;
      } catch (error) {
        console.error(error);
				
      }
    };

    const fetchInspectionUser = async () => {
      try {
        const { data, } = await mesPlanQueryPlanInspectorUserList({projectId, });
        columns[2].valueEnum = data.map((item:any) => {
          return {
            label: item.inspectorUserName,
            value: item.inspectorUserId,
          };
        });
      } catch (e) {
        console.error(e);
				
      }
    };

    const fetchRectifierUser = async () => {
      try {
        const { data, } = await mesProblemItemQueryRectifierUserList({projectId,});
        columns[3].valueEnum = data.map((item:any) => {
          return {
            label: item.userName,
            value: item.userId,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/inspectionTask/exportInspectionRecordExcel",
          method: "post",
          params:exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "督查记录";
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
      return mesInspectionTaskDeleteInspectionRecord({recordId: params.recordId,});
    };

    const handleViewDetails = async (recordId:number) => {
      try {
        const {data,} = await mesInspectionTaskQueryInspectionRecordInfo({recordId,projectId,});
        detailData.value = data;
      } catch (error) {
        console.error(error);
      } finally {
        detailVisible.value = true;
      }
    };

    fetchInspectionUser();
    fetchRectifierUser();

    return {
      takeOffRef,
      detailRef,
      columns,
      detailVisible,
      detailData,
      images,
      selectionChange,
      remote,
      handlerExport,
      deleteRequest,
      handleViewDetails,
    }
  },
})
</script>

<style lang="less">
.supervision-record {
	position: relative;
	.view-images {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}

	.el-table__body-wrapper::before,
	.el-table__body-wrapper::after {
		height: 0;
	}

	.el-table__body {
		overflow: visible;
	}
}
</style>
