<template>
  <div class="ledger-list page-root">
    <card-header title="台账清单" />
    <el-pro-crud
      ref="takeOffRef"
      :read-columns="readColumns"
      :read-request="readRequest"
      :create-request="createRequest"
      :update-request="updateRequest"
      :delete-request="deleteRequest"
      :read-item-request="remoteLedger"
      :write-rules="formRules"
      :ext-params="extParams"
      :write-columns="writeColumns"
      :with-menu="[ 'create', 'update', 'delete' ]"
      :pro-table-props="{selectionChange,hiddenLabel:true}"
      row-key="ledgerId"
      @closed="clearFiles"
    >
      <template #read-form-date="{ model }">
        <el-date-picker
          v-model="model.date"
          style="width: 100%;"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #read-toolbar-left="{size}">
        <el-button
          type="danger"
          :size="size"
          :disabled="!ledgerIds.length"
          @click="deleteSelection"
        >
          删除
        </el-button>
        <el-button
          type="success"
          plain
          :size="size"
          @click="handlerExport"
        >
          导出
        </el-button>
      </template>
      <template #write-form-attachmentUrl>
        <el-upload
          ref="uploadFileRef"
          v-model:file-list="fileList"
          :limit="1"
          :auto-upload="false"
          :on-exceed="handlerExceed"
          :on-preview="handlerPreview"
        >
          <el-button type="primary">
            选择文件
          </el-button>
        </el-upload>
      </template>
    </el-pro-crud>
  </div>
</template>

<script lang="ts">
import { mesLedgerAddLedger, mesLedgerDeleteLedger, mesLedgerLedgerInfo, mesLedgerLedgerPageList, mesLedgerUpdateLedger } from "@/api/mes/ledgerController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import { upload } from "@/utils/http";
import axios from "axios";
import type { FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { ElMessage, ElMessageBox, UploadInstance, UploadProps, UploadRawFile, UploadUserFile, genFileId } from "element-plus";
import { Ref, defineComponent, h, reactive, ref } from "vue";
export default defineComponent({
  name: "LedgerList",
  components: {
    CardHeader,
  },
  setup() {
    const clientId = "jaya";
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const fileList: Ref<UploadUserFile[]> = ref<UploadUserFile[]>([]);
    const uploadFileRef = ref<UploadInstance>();
    const ledgerIds = ref<number[]>([]);
    const takeOffRef = ref();
    const exportLoading = ref(false);
    const exportParams = reactive<MES.LedgerExportLedgerExcelParams>({projectId,});
    const extParams = {
      clientId,
      projectId,
    };
		
    const readColumns:ProTableColumn[] = [
      {
        title:"事项",
        dataIndex:"items",
        valueType:"string",
        search:true,
        placeholder: "事项",
      },
      {
        title:"类别标签",
        dataIndex:"label",
        valueType:"string",
        search:true,
        placeholder: "类别标签",
      },
      {
        title:"金额",
        dataIndex:"amount",
        valueType:"string",
      },
      {
        title:"账单日期",
        dataIndex:"ledgerDate",
        valueType:"string",
      },
      {
        title:"备注",
        dataIndex:"remarks",
        valueType:"string",
      }
    ];

    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "事项",
        dataIndex: "items",
        valueType: "string",
      },
      {
        title: "类别标签",
        dataIndex: "label",
        valueType: "string",
      },
      {
        title: "金额",
        dataIndex: "amount",
        valueType: "string",
        append: h("span",null,"元"),
      },
      {
        title: "附件",
        dataIndex: "attachmentUrl",
        valueType: "slot",
      },
      {
        title: "账单日期",
        dataIndex: "ledgerDate",
        valueType: "date",
      },
      {
        title: "备注",
        dataIndex: "remarks",
        valueType: "string",
      }
    ];

    const formRules:FormRules = {
      items: [
        { required: true, message: "请输入事项", trigger: "blur", }
      ],
      amount: [
        { required: true, message: "请输入金额", trigger: "blur", }
      ],
      ledgerDate: [
        { required: true, message: "请选择账单日期", trigger: "change", }
      ],
    };

    const readRequest = async (params:MES.LedgerLedgerPageListParams) => {
      exportParams.items = params.items;
      exportParams.label = params.label;
      return mesLedgerLedgerPageList(params);
    };

    const createRequest = async (params:MES.LedgerFlowInParam) => {
      if (fileList.value.length) {
        params.attachmentUrl =  await uploadAttachment();
      }
      return mesLedgerAddLedger(params);
    };

    const updateRequest = async (params:MES.LedgerFlowInParam) => {
      if (fileList.value.length) {
        params.attachmentUrl =  await uploadAttachment();
      }
      return mesLedgerUpdateLedger(params);
    };

    const selectionChange = (selections: MES.LedgerFlowDTO[]) => {
      ledgerIds.value = selections.map(({ledgerId,}) => ledgerId);
      exportParams.ledgerIds = ledgerIds.value.join(",");
    };

    const deleteRequest = async (params:{ledgerId:number}) => {
      return mesLedgerDeleteLedger({ledgerIds:[params.ledgerId],});
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${ledgerIds.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesLedgerDeleteLedger({ledgerIds:ledgerIds.value,});
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

    const remoteLedger = async (params:MES.LedgerLedgerInfoParams) => {
      try {
        let {data,success,msg,} = await mesLedgerLedgerInfo(params);
     
        if (data.attachmentUrl) {
          fileList.value = [
            {
              name: <string>data.attachmentUrl.split("/").pop(),
              url: data.attachmentUrl,
            }
          ];
        }
        return {data,success,msg,};
      } catch (error) {
        console.error(error);
      }
    };

    const uploadAttachment = async () => {
      if(fileList.value.at(0)?.raw) {
        try {
          const res = await upload(<File>fileList.value.at(0)?.raw);
          fileList.value = [];
          return res.data;
        } catch(error) {
          console.error(error);
        }
      }
    };

    const clearFiles = () => {
      fileList.value = [];
    };

    const handlerExceed: UploadProps["onExceed"] = (files) => {
      uploadFileRef.value?.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadFileRef.value?.handleStart(file);
    };

    const handlerPreview = (file:any) => {
      if(file.raw) {
        window.open(URL.createObjectURL(file.raw));
      } else {
        window.open(file.url);
      }
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/ledger/exportLedgerExcel",
          method: "post",
          params:exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "台账清单";
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
      readColumns,
      writeColumns,
      formRules,
      fileList,
      uploadFileRef,
      takeOffRef,
      ledgerIds,
      readRequest,
      deleteRequest,
      createRequest,
      updateRequest,
      handlerExceed,
      handlerPreview,
      clearFiles,
      remoteLedger,
      selectionChange,
      deleteSelection,
      handlerExport,
    }
  },
})
</script>

<style scoped>

</style>
