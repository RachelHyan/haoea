<template>
  <div class="tenant-management page-root">
    <card-header title="租户管理" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="id"
      :read-columns="readColumns"
      :write-columns="writeColumns"
      :selection-change="selectionChange"
      :read-request="readRequest"
      :delete-request="deleteRequest"
      :write-rules="writeRules"
      :with-menu="['delete']"
      :pro-table-props="{ hiddenLabel: true }"
    >
      <template #read-form-createTime="{ attr }">
        <el-date-picker
          v-model="attr.model.createTime"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #toolbar-right="{ size }">
        <el-button
          type="primary"
          :size="size"
          @click="(dialogVisible = true), (editStatus = false), clearWrite()"
        >
          新增
        </el-button>
      </template>
      <template #read-toolbar-left="{ attr }">
        <el-button
          type="success"
          plain
          :size="attr.size"
          :loading="exportLoading"
          @click="handlerExport"
        >
          导出
        </el-button>
      </template>
      <template #write-column-optional="{ attr }">
        <el-button
          type="primary"
          link
          @click="remoteTenant(attr.row.id)"
        >
          编辑
        </el-button>
      </template>
      <template #read-column-enableStatus="{ attr }">
        <el-switch
          v-model="attr.row.enableStatus"
          :active-value="0"
          :inactive-value="1"
          @change="changeStatus(attr.row.id, attr.row.enableStatus)"
        />
      </template>
    </el-pro-crud>
    <el-pro-dialog-form
      ref="writeRef"
      v-model="dialogVisible"
      class="dialog"
      :title="editStatus ? '编辑' : '新增'"
      :width="'50%'"
      :label-width="'110px'"
      :form-model="writeModel"
      :form-rules="writeRules"
      :submit="writeSubmit"
      @closed="writeClosed"
    >
      <template #form="{ model }">
        <div>基本信息</div>
        <el-row>
          <el-col
            v-for="item in writeColumns"
            :key="item.dataIndex"
            :span="12"
          >
            <el-form-item
              :label="item.title"
              :prop="item.dataIndex"
            >
              <el-input
                v-if="item.valueType === 'string'"
                v-model="model[item.dataIndex]"
                :placeholder="item.placeholder ?? '请输入'"
              />
              <div v-if="item.valueType === 'slot'">
                <div class="modal-basic-upload-file upload-file">
                  <upload-photo
                    v-if="item.dataIndex === 'businessLicense' && dialogVisible"
                    ref="uploadBLRef"
                    v-model:url="writeModel.businessLicense"
                    :file-type="'营业执照'"
                  />
                </div>
                <div class="modal-basic-upload-file upload-file">
                  <upload-photo
                    v-if="item.dataIndex === 'logo' && dialogVisible"
                    ref="uploadLogoRef"
                    v-model:url="writeModel.logo"
                    :file-type="'logo'"
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div>账号信息</div>
        <div class="dialog__account">
          <span class="dialog__account--title require"> 项目编制员 </span>
          <div>
            <el-row
              v-for="(item, index) in writeModel.assignmentSuperviseList"
              :key="index"
              :gutter="10"
            >
              <el-col :span="9">
                <el-form-item
                  :label-width="'0'"
                  prop="PPEName"
                  :rules="[{ required: true,validator: (rule: any, value: any, callback: any) => {										
                    if(!item.userName) {
                      callback('姓名不能为空哦！')
                    }
                    else if(item.userName.length > 12){
                      callback('姓名的长度不可以超过12个字符哦！')
                    }else{
                      callback()
                    }
                  }, trigger: 'blur' }]"
                >
                  <el-input
                    v-model="item.userName"
                    placeholder="请输入姓名"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item
                  :label-width="'0'"
                  prop="PPEMobile"
                  :rules="[{
                    required: true,
                    validator: (rule: any, value: any, callback: any) => {
                      if (/^1[3-9][0-9]{9}$/.test(item.mobile)) {
                        callback();
                      } else {
                        callback('你的电话格式不对哦');
                      }
                    },
                    trigger: 'blur',
                  }]"
                >
                  <el-input
                    v-model="item.mobile"
                    placeholder="请输入联系方式"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                  v-if="writeModel.assignmentSuperviseList.length > 1"
                  type="danger"
                  link
                  @click="handlerDelete('PPE', index)"
                >
                  删除
                </el-button>
                <el-button
                  v-if="
                    index === writeModel.assignmentSuperviseList.length - 1 &&
                      writeModel.assignmentSuperviseList.length < 3
                  "
                  type="primary"
                  link
                  @click="handlerAdd('PPE')"
                >
                  新增
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog__account">
          <span class="dialog__account--title"> 集团管理员 </span>
          <div>
            <el-row
              v-for="(item, index) in writeModel.blocAdminList"
              :key="index"
              :gutter="10"
            >
              <el-col :span="9">
                <el-form-item
                  :label-width="'0'"
                  prop="GAName"
                >
                  <el-input
                    v-model="item.userName"
                    placeholder="请输入姓名"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item
                  :label-width="'0'"
                  prop="GAMobile"
                >
                  <el-input
                    v-model="item.mobile"
                    placeholder="请输入联系方式"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                  v-if="writeModel.blocAdminList.length > 1"
                  type="danger"
                  link
                  @click="handlerDelete('GA', index)"
                >
                  删除
                </el-button>
                <el-button
                  v-if="
                    index === writeModel.blocAdminList.length - 1 &&
                      writeModel.blocAdminList.length < 3
                  "
                  type="primary"
                  link
                  @click="handlerAdd('GA')"
                >
                  新增
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </template>
    </el-pro-dialog-form>
  </div>
</template>
<script lang="ts">
import {
  iotTenantAddTenant,
  iotTenantChangeStatus,
  iotTenantDeleteTenant,
  iotTenantTenantInfo,
  iotTenantTenantPageList,
  iotTenantUpdateTenant
} from '@/api/iot/tenantController';
import { CardHeader } from '@/components/index';
import axios from 'axios';
import type {
  FormRules,
  ProCrudWriteColumn,
  ProTableColumn
} from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, reactive, ref, watch } from 'vue';
import UploadPhoto from './components/upload-photo.vue';
export default defineComponent({
  name: 'TenantManagement',
  components: {
    CardHeader,
    UploadPhoto,
  },
  setup() {
    const takeOffRef = ref();
    const uploadBLRef = ref();
    const uploadLogoRef = ref();
    const dialogVisible = ref(false);
    const exportLoading = ref<boolean>(false);
    const exportParams = ref<IOT.TenantExportTenantExcelParams>();
    const addStatus = ref(false);
    const editStatus = ref(false);
    const tenantIds = ref<number[]>([]);
    const writeRef = ref()
    const writeModel = reactive<any>({
      blocAdminList: [{ userName: '', mobile: '', }],
      assignmentSuperviseList: [{ userName: '', mobile: '', }],
    });

    const readColumns: ProTableColumn[] = [
      {
        title: '租户名称',
        dataIndex: 'name',
        valueType: 'string',
        search: true,
        placeholder: '租户名称',
      },
      {
        title: '社会信用代码',
        dataIndex: 'enterpriseCode',
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
        title: '状态',
        dataIndex: 'enableStatus',
        valueType: 'enum',
        search: true,
        hidden: true,
        valueEnum: [
          { label: '已启用', value: 0, },
          { label: '已禁用', value: 1, }
        ],
        placeholder: '状态',
      },
      {
        title: '状态',
        dataIndex: 'enableStatus',
        valueType: 'slot',
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
        valueType: 'slot',
        search: true,
        placeholder: '添加时间',
      }
    ];

    const writeColumns: ProCrudWriteColumn[] = [
      {
        title: '租户名称',
        dataIndex: 'name',
        valueType: 'string',
      },
      {
        title: '负责人',
        dataIndex: 'contactPerson',
        valueType: 'string',
      },
      {
        title: '社会信用代码',
        dataIndex: 'enterpriseCode',
        valueType: 'string',
      },
      {
        title: '联系方式',
        dataIndex: 'contactPhone',
        valueType: 'string',
      },
      {
        title: '营业执照',
        dataIndex: 'businessLicense',
        valueType: 'slot',
      },
      {
        title: 'logo',
        dataIndex: 'logo',
        valueType: 'slot',
      }
    ];

    const writeRules: FormRules = {
      name: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (!value) {
              callback('租户名称不能为空哦！');
            } else if (value.length > 30) {
              callback('租户名称的长度不可以超过30个字符哦！');
            } else {
              callback();
            }
          },
          trigger: 'blur',
        }
      ],
      contactPhone: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (/^1[3-9][0-9]{9}$/.test(value)) {
              callback();
            } else {
              callback('你的电话格式不对哦');
            }
          },
          trigger: 'blur',
        }
      ],
      enterpriseCode: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (value === undefined) {
              callback('社会信用代码不能为空哦!');
            } else if (
              !/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{18}$/.test(value)
            ) {
              callback('你的社会信用代码格式不对哦!');
            } else {
              callback();
            }
          },
          trigger: 'blur',
        }
      ],
      contactPerson: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (!value) {
              callback('负责人不能为空哦！');
            } else if (value.length > 12) {
              callback('负责人的长度不可以超过12个字符哦！');
            } else {
              callback();
            }
          },
          trigger: 'blur',
        }
      ],
      businessLicense: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (!value) {
              callback('营业执照不能为空哦！');
            } else {
              callback();
            }
          },
          trigger: 'change',
        }
      ],
    };

    const changeStatus = async (id: number, enableStatus: number) => {
      if (!id) return;
      try {
        await iotTenantChangeStatus({ id, enableStatus, });
        ElMessage.success('操作成功');
        takeOffRef.value?.read();
      } catch (error) {}
    };

    const selectionChange = (selections: IOT.TenantDTO[]) => {
      tenantIds.value = selections.map(({ id, }) => id as number);
    };

    const readRequest = async (data: IOT.TenantTenantPageListParams) => {
      const params: any = { ...data, };
      params.startTime = params.createTime?.[0];
      params.endTime = params.createTime?.[1];
      params.createTime = undefined;
      exportParams.value = params;
      return iotTenantTenantPageList(params);
    };

    const createRequest = async () => {
      if (writeModel.blocAdminList[0].userName === '') {
        writeModel.blocAdminList = [];
      }
      try {
        const res = await iotTenantAddTenant({ ...writeModel, });
        // res.success && ElMessage.success('新增成功');
        return res;
      } catch (error) {}
    };

    const updateRequest = async () => {
      if (writeModel.blocAdminList[0].userName === '') {
        writeModel.blocAdminList = [];
      }
      writeModel.logo = /\.com/.test(writeModel.logo)
        ? writeModel.logo.split('.com')[1]
        : writeModel.logo;
      writeModel.businessLicense = /\.com/.test(writeModel.businessLicense)
        ? writeModel.businessLicense.split('.com')[1]
        : writeModel.businessLicense;
      try {
        const res = await iotTenantUpdateTenant({ ...writeModel, });
        // res.success && ElMessage.success('修改成功');
        return res;
      } catch (error) {}
    };

    const deleteRequest = async (params: { id: number }) => {
      return iotTenantDeleteTenant({ tenantIds: [params.id], });
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(
        `确定要删除这${tenantIds.value.length}条数据吗?`,
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              try {
                await iotTenantDeleteTenant({ tenantIds: tenantIds.value, });
                done();
                instance.confirmButtonLoading = false;
                ElMessage.success('删除成功!');
                takeOffRef.value.load();
              } catch (error) {
                done();
              }
            } else {
              done();
            }
          },
        }
      ).catch(() => {
        // 为了不让控制台报 Uncaught (in promise) cancel
      });
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      const params: Record<string, any> = { ...exportParams.value, };
      params.current = undefined;
      params.pageSize = undefined;
      params.tenantIds = tenantIds.value
        ? tenantIds.value.join(',')
        : undefined;
      try {
        const { data, status, } = await axios({
          url: '/api/iot/tenant/exportTenantExcel',
          method: 'post',
          params,
          responseType: 'blob',
        });
        if (status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: 'application/vnd.ms-excel', });
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = '租户管理';
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
          ElMessage.success('导出成功！');
        }
      } catch (error) {
      } finally {
        exportLoading.value = false;
      }
    };

    const remoteTenant = async (id: number) => {
      try {
        const { data, } = await iotTenantTenantInfo({ id, });
        Object.keys(data).forEach((key) => {
          //@ts-ignore
          writeModel[key] = data[key];
        });
        if (data.blocAdminList?.length === 0) {
          writeModel.blocAdminList = [{ userName: '', mobile: '', }];
        }
        if (data.assignmentSuperviseList?.length === 0) {
          writeModel.assignmentSuperviseList = [{ userName: '', mobile: '', }];
        }
        uploadLogoRef.value?.[0].getPhoto(data.logo);
        uploadBLRef.value?.[0].getPhoto(data.businessLicense);
      } catch (error) {
      } finally {
        dialogVisible.value = editStatus.value = true;
      }
    };

    const handlerAdd = (type: string) => {
      const data =
				type === 'PPE'
				  ? writeModel.assignmentSuperviseList
				  : writeModel.blocAdminList;
      data?.push({ userName: '', mobile: '', });
    };

    const handlerDelete = (type: string, index: number) => {
      const data =
				type === 'PPE'
				  ? writeModel.assignmentSuperviseList
				  : writeModel.blocAdminList;
      data?.splice(index, 1);
    };

    const writeSubmit = () => {
      if (editStatus.value) {
        return updateRequest();
      } else {
        return createRequest();
      }
    };

    const writeClosed = () => {
      takeOffRef.value.load();
      clearWrite();
    };

    const clearWrite = () => {
      Object.keys(writeModel).forEach((key) => {
        //@ts-ignore
        writeModel[key] = '';
      });
      writeModel['blocAdminList'] = [{ userName: '', mobile: '', }];
      writeModel['assignmentSuperviseList'] = [{ userName: '', mobile: '', }];
      uploadBLRef.value?.[0].getPhoto(null);
      uploadLogoRef.value?.[0].getPhoto(null);
    };

    watch(()=> writeModel.businessLicense,(val) => {
      val && writeRef.value.formRef?.validateField('businessLicense')
    })

    return {
      takeOffRef,
      uploadBLRef,
      uploadLogoRef,
      writeModel,
      readColumns,
      writeColumns,
      writeRules,
      dialogVisible,
      addStatus,
      editStatus,
      tenantIds,
      exportLoading,
      writeRef,
      handlerExport,
      selectionChange,
      readRequest,
      createRequest,
      updateRequest,
      deleteRequest,
      deleteSelection,
      remoteTenant,
      handlerAdd,
      handlerDelete,
      writeSubmit,
      writeClosed,
      clearWrite,
      changeStatus,
    };
  },
});
</script>
<style lang="less">
.tenant-management {
	.dialog {
		&__account {
			margin: 10px 0;
			&--title {
				display: inline-block;
				margin-bottom: 10px;
			}

			.require::before {
				content: "*";
				color: #f56c6c;
			}
		}
	}
}
</style>
