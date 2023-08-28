<template>
  <div class="vehicle-ledger page-root">
    <card-header title="车辆台账" />
    <el-pro-table
      ref="tableRef"
      row-key="id"
      hidden-label
      :columns="columns"
      :request="request"
      :selection-change="selectionChange"
    >
      <template #toolbar-right="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="fileList=[],importVisible = true"
        >
          导入
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
      <template #form-fillDate="{ model }">
        <el-date-picker
          v-model="model.fillDate"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #column-operation="{row}">
        <el-button
          type="danger"
          link
          @click="handleDel(row)"
        >
          删除
        </el-button>
      </template>
    </el-pro-table>
  </div>
  <el-pro-dialog
    v-model:model-value="importVisible"
    class="import"
    :title="'导入车辆台账'"
  >
    <el-upload
      ref="uploadExcelRef"
      v-model:file-list="fileList"
      class="upload"
      drag
      :limit="1"
      accept=".xlsx"
      :auto-upload="false"
      :http-request="uploadRequest"
      :on-exceed="handleExceed"
      :on-change="handleFileChange"
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        <div>将文件拖到此处，或<em>点击上传</em></div>
        <div style="color:#BE0D0D">
          请使用下载模版填写数据导入
        </div>
      </div>
    </el-upload>
    <template #footer>
      <div class="import-footer">
        <el-button
          type="primary"
          :loading="importLoading"
          :disabled="!fileList.length"
          @click="importExcel"
        >
          导入
        </el-button>
        <el-button
          type="danger"
          plain
          @click="importVisible = false"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          plain
          @click="importTemplate"
        >
          下载模板
        </el-button>
      </div>
    </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesLedgerDeleteLedgerCar, mesLedgerQueryLedgerCarPageList } from "@/api/mes/ledgerController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import { importLedgerCar } from "@/utils/importApi";
import axios from "axios";
import { ElMessage, ProTableColumn, UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions, UploadUserFile, genFileId } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "VehicleLedger",
  components: {
    CardHeader,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const tableRef = ref();
    const fileList = ref<UploadUserFile[]>([]);
    const importVisible = ref<boolean>(false);
    const importLoading = ref<boolean>(false);
    const exportLoading = ref<boolean>(false);
    const uploadExcelRef = ref<UploadInstance>();
    const exportParams = reactive<MES.LedgerExportLedgerCarExcelParams>({projectId,});
    const ids = ref<number[]>([]);

    const columns:ProTableColumn[] = [
      {
        title: "车牌号",
        dataIndex: "carNumber",
        valueType: "string",
        search: true,
        placeholder: "车牌号",
      },
      {
        title: "车辆类型",
        dataIndex: "carType",
        valueType: "string",
      },
      {
        title: "车辆负责人",
        dataIndex: "carChargePerson",
        valueType: "string",
      },
      {
        title: "操作人",
        dataIndex: "operator",
        valueType: "string",
      },
      {
        title: "加注日期",
        dataIndex: "fillDate",
        valueType: "slot",
        search: true,
      },
      {
        title: "上次里程数（Km）",
        dataIndex: "lastMileage",
        valueType: "string",
      },
      {
        title: "当前里程数（Km）",
        dataIndex: "currentMileage",
        valueType: "string",
      },
      {
        title: "加注类型",
        dataIndex: "fillType",
        valueType: "string",
      },
      {
        title: "加注量（L）",
        dataIndex: "fillAmount",
        valueType: "string",
      },
      {
        title: "单价",
        dataIndex: "unitPrice",
        valueType: "string",
      },
      {
        title: "金额（元）",
        dataIndex: "amount",
        valueType: "string",
      },
      {
        title: "站点名称",
        dataIndex: "siteName",
        valueType: "string",
      },
      {
        title: "详细地址",
        dataIndex: "addr",
        valueType: "string",
      },
      {
        title: "备注",
        dataIndex: "remarks",
        valueType: "string",
      },
      {
        title: "操作",
        dataIndex: "operation",
        valueType: "string",
      }
    ]

    const selectionChange = (selections: MES.LedgerCarDTO[]) => {
      ids.value = selections.map(({id,}) => id);
      exportParams.ledgerIds = ids.value.join(",");
    };

    const request = async(data: MES.LedgerQueryLedgerCarPageListParams | any) => {
      const {fillDate,...params} = data;
      params.projectId = projectId;
      params.startDate = fillDate?.[0];
      params.endDate = fillDate?.[1];
      params.fillDate = undefined;

      exportParams.carNumber = params.carNumber;
      exportParams.startDate = params.startDate;
      exportParams.endDate = params.endDate;

      return mesLedgerQueryLedgerCarPageList(params)
    }

    const handleDel = async (row: MES.LedgerCarDTO) => {
      try {
        await mesLedgerDeleteLedgerCar({ledgerId: row.id,});
        ElMessage.success("删除成功");
        tableRef.value.load();
      } catch (error) {
				
      }
    }

    const importTemplate = () => {
      location.href = "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/%E8%BD%A6%E8%BE%86%E8%83%BD%E6%BA%90%E5%8F%B0%E8%B4%A6%E6%A8%A1%E6%9D%BF.xlsx";
    };

    const handleExceed: UploadProps["onExceed"] = (files) => {
      uploadExcelRef.value?.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadExcelRef.value?.handleStart(file);
    };

    const handleFileChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
      fileList.value = uploadFiles;
    };

    const uploadRequest = async (options: UploadRequestOptions) => {
      importLoading.value = true;
      try {
        const { success, } = await importLedgerCar({projectId,}, options.file);
        if (success) {
          ElMessage.success("导入成功");
          tableRef.value.load();
          importVisible.value = false;
        }
      } catch (error) {	
        console.error(error);
      } finally {
        importLoading.value = false;
      }
    };
		
    const importExcel = () => {
      uploadExcelRef.value?.submit();
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/ledger/exportLedgerCarExcel",
          method: "post",
          params: exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "车辆台账";
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
      tableRef,
      columns,
      fileList,
      uploadExcelRef,
      importVisible,
      importLoading,
      exportLoading,
      selectionChange,
      request,
      handleDel,
      importTemplate,
      handleExceed,
      handleFileChange,
      uploadRequest,
      importExcel,
      handlerExport,
			
    }
  },
})
</script>

<style scoped>

</style>
