<template>
  <div class="personnel-management page-root">
    <card-header :title="'人员管理'" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="userId"
      :read-columns="readColumns"
      :pro-table-props="{selectionChange,hiddenLabel:true}"
      :read-request="readRequest"
      :delete-request="deleteRequest"
      :ext-params="extParams"
      :with-menu="['delete']"
    >
      <template #read-form-orgIds="{ model }">
        <el-tree-select
          v-model="model.orgIds"
          :data="orgTreeData"
          :clearable="true"
          check-strictly
          multiple
          :collapse-tags="true"
          collapse-tags-tooltip
          :render-after-expand="false"
          placeholder="所属组织"
          no-data-text="暂无选项"
          accordion
          show-checkbox
          node-key="id"
          :props="defaultProps"
        />
      </template>
      <template #read-form-createTime="{ model }">
        <el-date-picker
          v-model="model.createTime"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #read-column-gender="{ row }">
        {{ row.gender === "man" ? "男" : row.gender === 'woman' ? '女' : '' }}
      </template>
      <template #write-column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="showModul.addOrEdit = true, editStatus = true, editUserId = row.userId,getUserInfo()"
        >
          编辑
        </el-button>
      </template>
      <template #toolbar-right="{size}">
        <el-button
          type="success"
          plain
          :size="size"
          @click="fileList=[],showModul.import = true, importType = 'personnel'"
        >
          导入
        </el-button>
        <el-button
          type="success"
          plain
          :size="size"
          @click="fileList=[],showModul.import = true, importType = 'personnelPic'"
        >
          导入人员图片
        </el-button>
        <el-button
          type="primary"
          :size="size"
          @click="handleAdd"
        >
          新增
        </el-button>
      </template>
      <template #read-toolbar-left="{size}">
        <el-button
          type="danger"
          :size="size"
          :disabled="!userIds"
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
    </el-pro-crud>
  </div>
  <el-pro-dialog
    v-model:model-value="showModul.import"
    class="import"
    :title="importType == 'personnel' ? '导入人员档案' : '导入人员图片'"
  >
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      class="upload"
      drag
      :limit="1"
      :accept="importType == 'personnel' ? '.xlsx' : '.zip'"
      :auto-upload="false"
      :http-request="uploadRequest"
      :on-exceed="handleExceed"
      :on-change="handleFileChange"
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div
        class="el-upload__text"
      >
        <div>将文件拖到此处，或<em>点击上传</em></div>
        <div
          v-if="importType == 'personnel'"
          style="color:#BE0D0D"
        >
          请使用下载模版填写数据导入
        </div>
      </div>
      <template
        v-if="importType !== 'personnel'"
        #tip
      >
        <div class="el-upload__tip">
          注意：人员照片命名格式为：TX_手机号 ， 且图片格式为png
        </div>
      </template>
    </el-upload>
    <template #footer>
      <div class="import-footer">
        <el-button
          type="primary"
          :loading="importLoading"
          :disabled="!fileList.length"
          @click="uploadRef?.submit()"
        >
          导入
        </el-button>
        <el-button
          type="danger"
          plain
          @click="showModul.import = false"
        >
          取消
        </el-button>
        <el-button
          v-if="importType == 'personnel'"
          type="primary"
          plain
          @click="importTemplate"
        >
          下载模板
        </el-button>
      </div>
    </template>
  </el-pro-dialog>
  <el-pro-dialog
    v-if="showModul.addOrEdit"
    v-model:model-value="showModul.addOrEdit"
    class="add-edit"
    :title="editStatus ? '编辑' : '新增'"
    :dialog-props="{ width: '500px' }"
    @closed="addOrEditRef.resetFields()"
  >
    <el-form
      ref="addOrEditRef"
      :model="addOrEditModel"
      :rules="addOrEditRules"
      class="add-edit-form"
      label-width="120"
    >
      <div class="add-edit-form-title">
        <div class="add-edit-form-title--text">
          基础信息
        </div>
        <el-popover
          :width="370"
          placement="right"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 10px;"
        >
          <template #reference>
            <el-icon><QuestionFilled /></el-icon>
          </template>
          <template #default>
            <div class="add-edit-form-title--tips">
              人员基本信息为项目共用信息，修改后将同步更新到其它项目中。
            </div>
          </template>
        </el-popover>
      </div>
      <el-form-item
        label="联系方式"
        prop="phone"
      >
        <el-input
          v-model="addOrEditModel.phone"
          placeholder="请输入"
          @input="getBaseInfo"
        />
      </el-form-item>
      <el-form-item
        label="姓名"
        prop="userName"
      >
        <el-input
          v-model="addOrEditModel.userName"
          :disabled="Boolean(!editStatus && baseInfo.userName)"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="idCard"
      >
        <el-input
          v-model="addOrEditModel.idCard"
          :disabled="Boolean(!editStatus && baseInfo.idCard)"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="头像照片">
        <div class="modal-basic-upload-file upload-file">
          <upload-photo
            ref="uploadAvaterRef"
            v-model:url="addOrEditModel.headUrl"
            :file-type="'头像照片'"
          />
        </div>
      </el-form-item>
      <div class="add-edit-form-title">
        岗位信息
      </div>
      <el-form-item
        label="所属组织"
      >
        <el-tree-select
          v-model="addOrEditModel.orgIds"
          :data="orgTreeData"
          check-strictly
          multiple
          collapse-tags
          collapse-tags-tooltip
          :render-after-expand="false"
          no-data-text="暂无选项"
          accordion
          show-checkbox
          node-key="id"
          :props="defaultProps"
        />
      </el-form-item>
      <el-form-item
        label="角色"
        prop="roleCodes"
      >
        <el-select
          v-model="addOrEditModel.roleCodes"
          :teleported="false"
          fit-input-width
          placeholder="请选择"
          clearable
          filterable
          multiple
        >
          <el-option
            v-for="item in roleType"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="薪资"
        prop="wages"
      >
        <el-input
          v-model="addOrEditModel.wages"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item
        label="人员类型"
        prop="userType"
      >
        <el-select
          v-model="addOrEditModel.userType"
          :teleported="false"
          fit-input-width
          placeholder="请选择"
        >
          <el-option
            v-for="item in userTypes"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="工作状态"
        prop="workStatus"
      >
        <el-select
          v-model="addOrEditModel.workStatus"
          :teleported="false"
          fit-input-width
          placeholder="请选择"
        >
          <el-option
            v-for="item in workingStatus"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-space>
        <el-button
          type="danger"
          plain
          @click="addOrEditRef.resetFields(),showModul.addOrEdit = false"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="submitLading"
          @click="submitForm(addOrEditRef)"
        >
          确定
        </el-button>
      </el-space>
    </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { mesUserAddUser, mesUserDeleteUser, mesUserQueryUserBaseInfo, mesUserQueryUserInfo, mesUserUpdateUser, mesUserUserPageList } from "@/api/mes/userController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import { importUserBaseInfo, importUserPicture } from "@/utils/importApi";
import axios from "axios";
import type { FormRules, ProTableColumn } from "element-plus";
import { ElMessage, ElMessageBox, FormInstance, UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions, UploadUserFile, genFileId } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import UploadPhoto from "./components/upload-photo.vue";

type showModulType = {
	import: boolean,
	addOrEdit: boolean
}

export default defineComponent({
  name: "PersonnelManagement",
  components: {
    CardHeader,
    UploadPhoto,
  },
  setup() {
    const clientId = "jaya";
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const userTypes = dict.$state.userType;
    const roleType = dict.$state.roleType;
    const workingStatus = dict.$state.workingState;
    const takeOffRef = ref();
    const uploadRef = ref<UploadInstance>();
    const showModul = reactive<showModulType>({ import: false, addOrEdit:false, });
    const importType = ref<string>("");
    const exportLoading = ref<boolean>(false);
    const importLoading = ref<boolean>(false);
    const editStatus = ref<boolean>(false);
    const editUserId = ref<number>(0);
    const userIds = ref();
    const orgTreeData = reactive<MES.OrgTree[]>([]);
    const fileList = ref<UploadUserFile[]>([]);
    const exportParams = reactive<MES.UserExportUserExcelParams>({projectId,});
    const addOrEditRef = ref();
    const uploadAvaterRef = ref();
    const addOrEditModel = ref<any>({workStatus:"onjob",});
    const baseInfo = ref<any>([]);
    const submitLading = ref<boolean>(false);
				
    const extParams = {
      projectId,
    };
		
    const defaultProps = {
      label:"orgName",
      children:"children",
    };
		
    const addOrEditRules = reactive<FormRules>({
      phone: [{
        validator: (rule: any, value: any, callback: any) => {
          if (/^1[3-9][0-9]{9}$/.test(value)) {
            callback();
          } else {
            callback("你的电话格式不对哦!");
          }
        },
        trigger: "blur",required: true,
      }],
      userName:[{
        validator: (rule: any, value: any, callback: any) => {
          if(!value) {
            callback("姓名不能为空哦!")
          }
          else if(value.length > 12){
            callback("姓名的长度不可以超过12个字符哦!")
          }else{
            callback()
          }
        },trigger: "blur",required: true,
      }],
      idCard: [{ validator: (rule: any, value: any, callback: any) => {
        if(value === undefined){
          callback("身份证号不能为空哦!")
        }else if(!/^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/.test(value) && !/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)){
          callback("身份证号码格式不正确!")
        }else{
          callback()
        }
      },trigger: "blur",required: true,
      }],
      wages:[{
        validator: (rule: any, value: any, callback: any) => {
          if(value === undefined){
            callback("工资不能为空哦!")
          }else if(isNaN(value)){
            callback("工资应该是数字哦!")
          }
          else if(value.indexOf(".") !== -1){
            callback("工资不能输入小数点哦!")
          }else if(value === ""){
            addOrEditModel.value.wages = undefined
          }else{
            callback()
          }
        }, 
        trigger: "blur",required: true,
      }],
      userType: [{required:true,message:"请选择人员类型!",trigger:"change",}],
      workStatus: [{required:true,message:"请选择工作状态!",trigger:"change",}],
    });

    const readColumns:ProTableColumn[] = [
      {
        title: "userId",
        dataIndex: "userId",
        valueType: "number",
        hidden: true,
    	},
      {
        title: "姓名",
        dataIndex: "userName",
        valueType: "string",
        search: true,
        placeholder: "姓名",
      },
      {
        title: "年龄",
        dataIndex: "age",
        valueType: "string",
      },
      {
        title: "性别",
        dataIndex: "gender",
        valueType: "string",
      },
      {
        title: "所属组织",
        dataIndex: "orgName",
        valueType: "string",
      },
      {
        title: "组织",
        dataIndex: "orgIds",
        valueType: "slot",
        hidden: true,
        search: true,
        placeholder:"组织",
      },
      {
        title: "联系方式",
        dataIndex: "phone",
        valueType: "string",
        search: true,
        placeholder: "联系方式",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
        valueType: "slot",
        search: true,
        placeholder: "添加时间",
      },
      {
        title: "角色类型",
        dataIndex: "rectifier",
        valueType: "string",
      },
      {
        title: "人员类型",
        dataIndex: "userType",
        valueType: "enum",
        search: true,
        placeholder: "人员类型",
        valueEnum: userTypes,
      },
      {
        title: "角色类型",
        dataIndex: "roleType",
        valueType: "enum",
        search: true,
        hidden: true,
        placeholder: "角色类型",
        valueEnum: roleType,
      },
      {
        title: "工作状态",
        dataIndex: "workStatus",
        valueType: "string",
      }
    ];

    const selectionChange = (selections: MES.UserDTO[]) => {
      userIds.value = selections.map(({userId,}) => userId);
      exportParams.userIds = userIds.value.join(",");
    };

    const remoteOrg = async () => {
      try {
        const { data, success, } = await mesDepartmentQueryOrgTreeList({ projectId, });
        success && orgTreeData.push(...data);
      } catch (error) {
        console.error(error);
      }
    };
		
    const readRequest = async (data: MES.UserUserPageListParams | any) => {
      const {createTime, orgIds, ...params} = data;
      params.startTime = createTime && createTime[0];
      params.endTime = createTime && createTime[1];
      params.createTime = undefined;
      params.orgIds = orgIds?.length === 0 ? undefined : orgIds?.toString();

      exportParams.endTime = params.endTime;
      exportParams.startTime = params.startTime;
      exportParams.orgIds = params.orgIds;
      exportParams.userName = params.userName;
      exportParams.phone = params.phone;
      exportParams.userType = params.userType;
      exportParams.roleType = params.roleType;
      return mesUserUserPageList(params);
    };

    const deleteRequest = async (params: {userId: number}) => {
      return mesUserDeleteUser({projectId,userIds:[params.userId],});
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${userIds.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesUserDeleteUser({projectId,userIds:userIds.value,});
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

    const importTemplate = () => {
      location.href = "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/%E4%BA%BA%E5%91%98%E7%AE%A1%E7%90%86%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx";
    };

    const handleExceed: UploadProps["onExceed"] = (files) => {
      uploadRef.value?.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadRef.value?.handleStart(file);
    };

    const handleFileChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
      fileList.value = uploadFiles;
    };

    const uploadRequest = async (options: UploadRequestOptions) => {
      importLoading.value = true;
      try {
        importType.value === "personnel"? await importUserBaseInfo({projectId,}, options.file) : await importUserPicture(options.file);
        ElMessage.success("导入成功");
        takeOffRef.value.load();
        showModul.import = false;
      } catch (error) {	
        console.error(error);
      } finally {
        importLoading.value = false;
      }
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/user/exportUserExcel",
          method: "post",
          params:exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "人员管理";
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

    const handleAdd = () => {
      showModul.addOrEdit = true;
      editStatus.value = false;
      baseInfo.value.idCard = "";
      baseInfo.value.userName = "";
      addOrEditModel.value = {workStatus:"onjob",};
    };

    const getBaseInfo = async (phone: string) => {
      if(!/^1[3-9][0-9]{9}$/.test(phone) || editStatus.value) return;
      try {
        const { data, } = await mesUserQueryUserBaseInfo({ phone, });
        addOrEditModel.value = {...addOrEditModel.value,...data,phone,};
        baseInfo.value = data;
        uploadAvaterRef.value.getPhoto(data.headUrl);
      } catch (error) {
        console.error(error);
      }
    };

    const getUserInfo = async () => {			
      if (editStatus.value) {
        const userId = Number(editUserId.value);
        try {
          const { data, success, } = await mesUserQueryUserInfo({ userId,projectId, });
          if (success) {
            addOrEditModel.value = {
              ...data,
              orgIds: data.userOrgDTOList?.map(item => Number(item.orgId)),
            };
            uploadAvaterRef.value.getPhoto(data.headUrl);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
      addOrEditModel.value.headUrl = /\.com/.test(addOrEditModel.value.headUrl) ? addOrEditModel.value.headUrl.split(".com")[1] : addOrEditModel.value.headUrl;
      if (!formEl) return;
      addOrEditRef.value.validate(async (valid: boolean) => {
        if (valid) {
          submitLading.value = true;
          if (uploadAvaterRef.value.uploadSubmit() === false) return false;
          try {
            if (!editStatus.value) {
              const { code, } = await mesUserAddUser({ ...<any>addOrEditModel.value,clientId,projectId, });
              code === 200 && ElMessage.success("添加成功");
            } else {
              const { code, } = await mesUserUpdateUser({ ...<any>addOrEditModel.value, userId: editUserId.value,clientId,projectId, });
              code === 200 && ElMessage.success("修改成功");
            }
          } catch (error) {
            console.error(error);
          } finally {
            addOrEditRef.value.resetFields();
            takeOffRef.value.load();
            submitLading.value = false;
            showModul.addOrEdit = false;
            editStatus.value = false;
          }
        }
      });
    };

    remoteOrg();
		
    return {
      extParams,
      takeOffRef,
      uploadRef,
      readColumns,
      showModul,
      editStatus,
      exportLoading,
      importLoading,
      editUserId,
      fileList,
      orgTreeData,
      defaultProps,
      importType,
      addOrEditRef,
      uploadAvaterRef,
      addOrEditModel,
      addOrEditRules,
      baseInfo,
      submitLading,
      userTypes,
      workingStatus,
      userIds,
      roleType,
      handleAdd,
      readRequest,
      deleteRequest,
      deleteSelection,
      importTemplate,
      handleExceed,
      handleFileChange,
      uploadRequest,
      handlerExport,
      selectionChange,
      getBaseInfo,
      getUserInfo,
      submitForm,
    }
  },
})
</script>
<style lang="less">
.import {

	.upload {
		padding: 40px 26px;
	}

	&-footer {
		text-align: center;
	}
	
}

.add-edit {

	&-form {
		padding:20px;

		&-title {
			font-size: 14px;
			font-weight: 600;
			margin-bottom: 20px;
			display: flex;
			align-items: center;

			&--text {
				margin-right: 5px;
			}

			&--tips {
				font-size: 12px;
			}
		}
	}

	.modal-basic-upload-file {
		margin-top: -1px !important;
		margin: 0 auto;
	}

	.upload-file {
		padding-top: 10px !important;
		margin: 0 auto;

	}

	.el-input__wrapper {
		width: 92% !important;
	}

	.el-select {
		width: 100%;
	}

	.el-dialog__body {
		padding: 0 20px;
	}

	.el-dialog__footer {
		text-align: center;
	}
}
</style>
