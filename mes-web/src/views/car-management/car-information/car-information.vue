<template>
  <div class="car-information page-root">
    <card-header title="车辆信息" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="carId"
      :read-columns="readColumns"
      :write-columns="writeColumns"
      :write-rules="writeRules"
      :pro-table-props="{selectionChange,hiddenLabel:true,showIndex:true}"
      :read-request="readRequest"
      :create-request="createRequest"
      :update-request="updateRequest"
      :delete-request="deleteRequest"
      :read-item-request="remoteCar"
      :ext-params="extParams"
      :with-menu="['create', 'update', 'delete']"
    >
      <template #read-form-purchaseTime="{model}">
        <el-date-picker
          v-model="model.purchaseTime"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #read-form-carType="{ model }">
        <el-cascader
          v-model="model.carType"
          :options="cascader.$state.car"
          clearable
          :style="{width:'100%'}"
          placeholder="车辆类型"
          :props="carDefaultProps"
          :show-all-levels="false"
        />
      </template>
      <template #toolbar-right="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="fileList=[],importVisible = true"
        >
          导入
        </el-button>
      </template>
      <template #read-toolbar-left="{size}">
        <el-button
          type="danger"
          :size="size"
          :disabled="!carIds.length"
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
      <template #write-form-orgIds="{ model }">
        <el-tree-select
          v-model="model.orgIds"
          :data="orgTreeData"
          :clearable="true"
          multiple
          check-strictly
          :collapse-tags="true"
          collapse-tags-tooltip
          :render-after-expand="false"
          placeholder="请选择"
          no-data-text="暂无选项"
          accordion
          show-checkbox
          node-key="id"
          :props="defaultProps"
        />
      </template>
      <template #write-form-carType="{ model }">
        <el-cascader
          v-model="model.carType"
          :options="cascader.$state.car"
          clearable
          placeholder="车辆类型"
          style="width:100%;"
          :props="carDefaultProps"
        />
      </template>
    </el-pro-crud>
  </div>
  <el-pro-dialog
    v-model:model-value="importVisible"
    class="import"
    :title="'导入车辆信息'"
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
import { mesCarAddCar, mesCarCarInfo, mesCarCarPageList, mesCarDeleteCar, mesCarUpdateCar } from "@/api/mes/carController";
import { mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { mesUserQueryAllUserList } from "@/api/mes/userController";
import { CardHeader } from "@/components";
import { useCascader } from "@/stores/cascader";
import { useProject } from "@/stores/project";
import { importCarExcel } from "@/utils/importApi";
import axios from "axios";
import type { FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { ElMessage, ElMessageBox, UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions, UploadUserFile, genFileId } from "element-plus";
import { defineComponent, h, reactive, ref } from "vue";

export default defineComponent({
  name: "CarInformation",
  components: {
    CardHeader,
  },
  setup () {
    const clientId = "jaya"
    const cascader = useCascader()
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const uploadExcelRef = ref<UploadInstance>();
    const exportLoading = ref<boolean>(false);
    const importLoading = ref<boolean>(false);
    const importVisible = ref<boolean>(false);
    const carIds = ref<number[]>([]);
    const fileList = ref<UploadUserFile[]>([]);
    const orgTreeData = reactive<any[]>([]);
    const infoType = ref();
    const exportParams = reactive<any>({projectId,});
    const extParams = {
      clientId,
      projectId,
    };
    const defaultProps = {
      label:"orgName",
      children:"children",
    };
    const carDefaultProps = {
      checkStrictly: true,
      label:"typeName",
      value:"typeName",
      children:"children",
    };
    
    const readColumns:ProTableColumn[] = [
      {
        title:"车牌号",
        dataIndex:"carNumber",
        valueType:"string",
        search:true,
        placeholder: "车牌号",
      },
      {
        title:"车辆类型",
        dataIndex:"carType",
        valueType:"slot",
        search:true,
        placeholder: "车辆类型",
      },
      {
        title:"所属组织",
        dataIndex:"orgName",
        valueType:"string",
      },
      {
        title:"购入金额",
        dataIndex:"amount",
        valueType:"string",
      },
      {
        title:"购入日期",
        dataIndex:"purchaseTime",
        valueType:"slot",
        search:true,
        placeholder: "购入日期",
      },
      {
        title:"折旧年限",
        dataIndex:"depreciationLife",
        valueType:"string",
      },
      {
        title:"车辆负责人",
        dataIndex:"carUserName",
        valueType:"string",
        search:true,
        placeholder: "车辆负责人",
      }
    ];

    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "车牌号",
        dataIndex: "carNumber",
        valueType: "string",
      },
      {
        title: "车辆类型",
        dataIndex: "carType",
        valueType: "slot",
      },
      {
        title: "所属组织",
        dataIndex: "orgIds",
        valueType: "slot",
      },
      {
        title: "购入金额",
        dataIndex: "amount",
        valueType: "string",
        append: h("span",null,"元"),
      },
      {
        title: "购入日期",
        dataIndex: "purchaseTime",
        valueType: "date",
      },
      {
        title: "折旧年限",
        dataIndex: "depreciationLife",
        valueType: "string",
      },
      {
        title: "车辆负责人",
        dataIndex: "carUserId",
        valueType: "enum",
        valueEnum: [],
      }
    ];

    const writeRules:FormRules = {
      carNumber: [
        { required: true, message: "请输入车牌号", trigger: "blur", }
      ],
      carType: [
        { required: true, message: "请选择车辆类型", trigger: "change", }
      ],
      amount: [
        { required: true,validator:(rule, value, callback) => {
          if(!value) {
            callback(new Error("请输入金额"))
          }
          else	if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
            callback(new Error("小数点后最多两位"))
          }
          else {
            callback()
          }
        }, trigger: "blur", }
      ],
      purchaseTime: [
        { required: true, message: "请选择购入日期", trigger: "change", }
      ],
      depreciationLife: [				
        {required:true,validator: (rule, value, callback) => {
          if(!value) {
            callback(new Error("请输入折旧年限"))
          }
          else if (value && !/^[1-9]\d*$/.test(value)) {
            callback(new Error("请输入整数"))
          }
          else if (value && value > 100) {
            callback(new Error("请输入小于100的整数"))
          }
          else {
            callback()
          }
        }, trigger: "blur", }
      ],
    };

    const remoteOrg = async () => {
      try {
        const { data, success, } = await mesDepartmentQueryOrgTreeList({ projectId, });
        success && orgTreeData.push(...data);
      } catch (error) {
        console.error(error);
      }
    };

    const selectionChange = (selections: MES.CarDTO[]) => {
      carIds.value = selections.map(({carId,}) => carId);
      exportParams.carIds = carIds.value.join(",");
    };

    const remoteUser = async (searchVal?:string) => {
      try {
        let {data,} = await mesUserQueryAllUserList({searchVal,projectId,});
        writeColumns[6].valueEnum = data.map((item:any) => ({
          label:item.userName,
          value:item.userId,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const remoteCar = async (params: MES.CarCarInfoParams) => {
      try {
        const res:any = await mesCarCarInfo(params);

        res.data.orgIds = res.data.carOrgDTOList.map((item:any) => Number(item.orgId));
				
        infoType.value = res.data.carType;
        return res;
      } catch(error) {
        console.error(error);
      }
    };

    const readRequest = async (data: MES.CarCarPageListParams | any) => {
      const {purchaseTime, carType, ...params} = data;
      params.startTime = purchaseTime && purchaseTime[0];
      params.endTime = purchaseTime && purchaseTime[1];
      params.purchaseTime = undefined;
      params.carType = carType && carType[carType.length - 1];


      exportParams.startTime = params.startTime;
      exportParams.endTime = params.endTime;
      exportParams.carNumber = params.carNumber;
      exportParams.carType = params.carType;
      exportParams.carUserName = params.carUserName;

      return mesCarCarPageList(params); 
    };

    const createRequest = async (params: MES.CarInParam) => {
      params.carType = params.carType && params.carType[params.carType.length - 1];
			
      return mesCarAddCar(params);
    };

    const updateRequest = async (params: MES.CarInParam) => {
      if (params.carType === infoType.value) {
        params.carType = infoType.value;
      } else {
        params.carType = params.carType && params.carType[params.carType.length - 1];
      }
      return mesCarUpdateCar(params);
    };

    const deleteRequest = async (params: {carId: number}) => {
      return mesCarDeleteCar({carIds: [params.carId],projectId,});
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${carIds.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesCarDeleteCar({carIds:carIds.value,});
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
      })
    };

    const importTemplate = () => {
      location.href = "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/%E8%BD%A6%E8%BE%86%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx";
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
        const { success, } = await importCarExcel({projectId,}, options.file);
        if (success) {
          ElMessage.success("导入成功");
          takeOffRef.value.load();
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
          url: "/api/mes/car/exportCarExcel",
          method: "post",
          params: exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "车辆信息";
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

    remoteOrg();
    remoteUser();

    return {
      cascader,
      takeOffRef,
      uploadExcelRef,
      extParams,
      readColumns,
      writeColumns,
      writeRules,
      carIds,
      importLoading,
      exportLoading,
      importVisible,
      fileList,
      defaultProps,
      carDefaultProps,
      orgTreeData,
      remoteCar,
      readRequest,
      createRequest,
      updateRequest,
      deleteRequest,
      deleteSelection,
      selectionChange,
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

<style lang="less">
.import {
	.upload {
		margin: 40px 26px;

		.el-upload__text {
			font-size: 12px;
		}
	}

	&-footer {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
