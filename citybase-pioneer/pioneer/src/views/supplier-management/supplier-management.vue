<template>
  <div class="supplier-management page-root">
    <card-header title="供应商管理" />
    <el-pro-crud
      ref="proCrudRef"
      :read-columns="readColumns"
      :read-request="readRequest"
      :create-request="createRequest"
      :update-request="updateRequest"
      :delete-request="deleteRequest"
      :read-item-request="readItemRequest"
      :write-rules="formRules"
      write-label-width="100px"
      :write-columns="writeColumns"
      :with-menu="['create', 'delete', 'update']"
      row-key="id"
      :pro-table-props="{ hiddenLabel: true }"
      @closed="clearFiles"
    >
      <template #write-column-optional="{ attr }">
        <el-button
          type="primary"
          link
          @click="handlerRecord(attr.row)"
        >
          记录
        </el-button>
      </template>
      <template #write-form-businessLicense>
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
    <el-dialog
      class="supplier-management-record"
      :model-value="recordVisible"
      modal
      title="出货记录"
      destroy-on-close
      @closed="recordVisible = false"
    >
      <el-pro-table
        ref="proTabelRef"
        :columns="recordColumns"
        :request="recordRequest"
        row-key="id"
        show-index
        hidden-label
        :with-tools="[]"
      >
        <template #column-operation="{ row }">
          <el-button
            type="primary"
            link
            @click="handlerDetail(row)"
          >
            详情
          </el-button>
        </template>
      </el-pro-table>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {
  iotSupplierAddSupplier,
  iotSupplierDeleteSupplier,
  iotSupplierSupplierInfo,
  iotSupplierSupplierOrderPageList,
  iotSupplierSupplierPageList,
  iotSupplierUpdateSupplier
} from '@/api/iot/supplierController';
import { CardHeader } from '@/components/index';
import { upload } from '@/utils/http';
import type {
  FormRules,
  ProCrudWriteColumn,
  ProTableColumn,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus';
import { ElMessage, ElMessageBox, genFileId } from 'element-plus';
import type { Ref } from 'vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SupplierManagement',
  components: {
    CardHeader,
  },
  setup() {
    const router = useRouter();
    const proCrudRef = ref();
    const fileList: Ref<UploadUserFile[]> = ref<UploadUserFile[]>([]);
    const uploadFileRef = ref<UploadInstance>();
    const selectedIds = ref<number[]>([]);
    const supplierId = ref<number>(0);
    const recordVisible = ref<boolean>(false);

    const readColumns: ProTableColumn[] = [
      {
        title: '供应商名称',
        dataIndex: 'supplierName',
        valueType: 'string',
        search: true,
        placeholder: '供应商',
      },
      {
        title: '负责人',
        dataIndex: 'contactPerson',
        valueType: 'string',
        search: true,
        placeholder: '负责人',
      },
      {
        title: '联系方式',
        dataIndex: 'contactPhone',
        valueType: 'string',
        search: true,
        placeholder: '联系方式',
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
        valueType: 'string',
      }
    ];
    const writeColumns: ProCrudWriteColumn[] = [
      {
        title: '供应商名称',
        dataIndex: 'supplierName',
        valueType: 'string',
      },
      {
        title: '负责人',
        dataIndex: 'contactPerson',
        valueType: 'string',
      },
      {
        title: '联系方式',
        dataIndex: 'contactPhone',
        valueType: 'string',
      },
      {
        title: '社会信用代码',
        dataIndex: 'enterpriseCode',
        valueType: 'string',
      },
      {
        title: '营业执照',
        dataIndex: 'businessLicense',
        valueType: 'slot',
      }
    ];
    const formRules: FormRules = {
      supplierName: [
        { required: true, message: '供应商名称不能为空哦！', trigger: 'blur', }
      ],
      contactPerson: [
        { required: true, message: '负责人名称不能为空哦！', trigger: 'blur', }
      ],
      contactPhone: [
        { required: true, message: '联系方式不能为空哦！', trigger: 'blur', },
        {
          pattern:
						/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          message: '请输入正确的联系方式',
          trigger: 'blur',
        }
      ],
      enterpriseCode: [
        {
          pattern: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
          message: '请输入正确的社会信用代码',
          trigger: 'blur',
        }
      ],
    };

    const recordColumns: ProTableColumn[] = [
      {
        title: '批次号',
        dataIndex: 'orderNumber',
        valueType: 'string',
        search: true,
        placeholder: '批次号',
      },
      {
        title: '数量',
        dataIndex: 'cardNumber',
        valueType: 'string',
      },
      {
        title: '出库日期',
        dataIndex: 'outboundDate',
        valueType: 'string',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        valueType: 'string',
      }
    ];

    const selectionChange = (selections: IOT.SupplierInfo[]) => {
      selectedIds.value = <number[]>selections.map((item) => item.id);
    };

    const readRequest = async (params: IOT.SupplierSupplierPageListParams) => {
      return iotSupplierSupplierPageList(params);
    };

    const createRequest = async (params: IOT.SupplierInParam) => {
      if (fileList.value.length) {
        params.businessLicense = await uploadAttachment();
      }
      try {
        const res = await iotSupplierAddSupplier(params);
        // res.success && ElMessage.success('新增成功');
        return res;
      } catch (error) {}
    };

    const updateRequest = async (params: IOT.SupplierInParam) => {
      if (fileList.value.length) {
        params.businessLicense = await uploadAttachment();
      }
      try {
        const res = await iotSupplierUpdateSupplier(params);
        // res.success && ElMessage.success('修改成功');
        return res;
      } catch (error) {}
    };

    const deleteRequest = async (params: IOT.SupplierInfo) => {
      return await iotSupplierDeleteSupplier({
        supplierIds: [<number>params.id],
      });
    };

    const deleteSelection = async () => {
      await ElMessageBox.confirm(
        `确定要删除这${selectedIds.value.length}条数据吗?`,
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              try {
                await iotSupplierDeleteSupplier({
                  supplierIds: selectedIds.value,
                });
                done();
                instance.confirmButtonLoading = false;
                ElMessage.success('删除成功!');
                proCrudRef.value.load();
              } catch (error) {
                done();
              }
            } else {
              done();
            }
          },
        }
      );
    };

    const readItemRequest = async (params: IOT.SupplierSupplierInfoParams) => {
      try {
        const { data, success, msg, } = await iotSupplierSupplierInfo(params);

        if (data.businessLicense) {
          fileList.value = [
            {
              name: <string>data.businessLicense.split('/').pop(),
              url: data.businessLicense,
            }
          ];
        }

        return { data, success, msg, };
      } catch (error) {}
    };

    const uploadAttachment = async () => {
      if (fileList.value.at(0)?.raw) {
        try {
          const res = await upload(<File>fileList.value.at(0)?.raw);
          fileList.value = [];
          return res.data;
        } catch (error) {
          console.log(error);
        }
      }
    };

    const clearFiles = () => {
      fileList.value = [];
    };

    const handlerExceed: UploadProps['onExceed'] = (files) => {
      uploadFileRef.value?.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadFileRef.value?.handleStart(file);
    };

    const handlerPreview = (file: any) => {
      if (file.raw) {
        window.open(URL.createObjectURL(file.raw));
      } else {
        window.open(file.url);
      }
    };

    const handlerRecord = (row: IOT.SupplierInParam) => {
      recordVisible.value = true;
      supplierId.value = <number>row.id;
    };

    const recordRequest = async (params: any) => {
      return iotSupplierSupplierOrderPageList({
        supplierId: supplierId.value,
        ...params,
      });
    };

    const handlerDetail = (row: IOT.SupplierOrderDTO) => {
      router.push({
        name: 'flow-pool-management',
        query: { id: row.orderNumber, },
      });
    };

    return {
      proCrudRef,
      readColumns,
      writeColumns,
      formRules,
      fileList,
      uploadFileRef,
      selectedIds,
      supplierId,
      recordVisible,
      recordColumns,
      selectionChange,
      readRequest,
      createRequest,
      updateRequest,
      deleteRequest,
      deleteSelection,
      readItemRequest,
      clearFiles,
      handlerExceed,
      handlerPreview,
      handlerRecord,
      recordRequest,
      handlerDetail,
    };
  },
});
</script>
<style lang="less">
.supplier-management {
	&-record {
		.el-dialog__body {
			padding: 0 !important;
		}
	}
}
</style>
