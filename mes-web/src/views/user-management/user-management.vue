<template>
  <default-layout>
    <div class="user-management page-root">
      <card-header title="用户管理" />
      <el-pro-crud
        ref="takeOffRef"
        row-key="sysUserId"
        :read-columns="readColumns"
        :write-columns="writeColumns"
        :read-request="readRequest"
        :create-request="createRequest"
        :update-request="updateRequest"
        :delete-request="deleteRequest"
        :read-item-request="remoteUser"
        :write-rules="writeRules"
        :ext-params="extParams"
        :pro-table-props="{selectionChange,hiddenLabel:true}"
        :with-menu="['create', 'update', 'delete']"
        @closed="clear"
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
        </template>
        <template #read-toolbar-left="{size}">
          <el-button
            type="danger"
            :size="size"
            :disabled="!userIds.length"
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
        <template #write-form-roleVoList>
          <el-select
            v-model="roleIds"
            multiple
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </template>
      </el-pro-crud>
    </div>
  </default-layout>
  <el-pro-dialog
    v-model:model-value="importVisible"
    class="import"
    :title="'导入用户信息'"
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
import { idpRoleQueryUserSelectRoleList } from "@/api/idp/roleController";
import { idpUserAdd, idpUserDelete, idpUserInfo, idpUserPageList, idpUserUpdate } from "@/api/idp/userController";
import { CardHeader } from "@/components";
import { DefaultLayout } from "@/layout";
import { useDict } from "@/stores/dict";
import { importUserExcel } from "@/utils/importApi";
import axios from "axios";
import type { FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { ElMessage, ElMessageBox, UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions, UploadUserFile, genFileId } from "element-plus";
import type { Ref } from "vue";
import { defineComponent, reactive, ref } from "vue";

type ShowModul = {
	import: boolean;
	addUser: boolean;
	editStatus: boolean;
};

export default defineComponent({
  name: "UserManagement",
  components:{
    CardHeader,
    DefaultLayout,
  },
  setup () {
    const dict = useDict()
    const clientId = "jaya";
    const takeOffRef = ref();
    const editUserId = ref<number>(0);
    const userIds = ref<number[]>([]);
    const showModul = reactive<ShowModul>({ import: false, addUser: false, editStatus: false, });
    const exportExcelLoading: Ref<boolean> = ref<boolean>(false);
    const exportParams= reactive<IDP.UserExportUserExcelParams>({});
    const uploadExcelRef = ref<UploadInstance>();
    const importVisible = ref<boolean>(false);
    const importLoading = ref<boolean>(false);
    const fileList = ref<UploadUserFile[]>([]);
    const roleIds = ref<number[]>([]);
    const roleList = ref<IDP.RoleDTO[]>([]);
    const extParams = {
      clientId,
    };

    const readColumns:ProTableColumn[] = [
      {
        title:"姓名",
        dataIndex:"sysUserName",
        valueType:"string",
        search:true,
        placeholder: "姓名",
      },
      {
        title:"性别",
        dataIndex:"gender",
        valueType:"string",
      },
      {
        title:"联系方式",
        dataIndex:"mobile",
        valueType:"string",
        search:true,
        placeholder: "联系方式",
      },
      {
        title:"角色",
        dataIndex:"roleNames",
        valueType:"string",
      },
      {
        title:"添加时间",
        dataIndex:"createTime",
        valueType:"slot",
        search:true,
        placeholder: "添加时间",
      }
    ];

    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "姓名",
        dataIndex: "sysUserName",
        valueType: "string",
      },
      {
        title: "手机号",
        dataIndex: "mobile",
        valueType: "string",
      },
      {
        title: "性别",
        dataIndex: "gender",
        valueType: "enum",
        valueEnum: dict.$state.userSex,
      },
      {
        title: "角色",
        dataIndex: "roleVoList",
        valueType: "slot",
      }
    ];

    const writeRules:FormRules = {
      sysUserName:[{
        required: true,
        validator: (rule: any, value: any, callback: any) => {
          if(!value) {
            callback("姓名不能为空哦！");
          }
          else if(value.length > 12){
            callback("姓名的长度不可以超过12个字符哦！");
          }else{
            callback();
          }
        },
        trigger: "blur",
      }],
      mobile: [{
        required: true,
        validator: (rule: any, value: any, callback: any) => {
          if (/^1[3-9][0-9]{9}$/.test(value)) {
            callback();
          } else {
            callback("你的电话格式不对哦");
          }
        },
        trigger: "blur",
      }],
      roleVoList:[{required: true,validator: (rule:any, value: any, callback: any) => {
        if(roleIds.value.length === 0) {
          callback("请选择角色");
        }else {
          callback();
        }
      },trigger: "change",}],
    };

    const selectionChange = (selections: IDP.UserDTO[]) => {
      userIds.value = selections.map(({ sysUserId, }) => sysUserId);
      exportParams.userIds = userIds.value.join(",");
    };

    const readRequest = async (data: IDP.UserPageListParams | any) => {
      const {createTime, ...params} = data;
      params.startTime = createTime?.[0];
      params.endTime = createTime?.[1];
      params.createTime = undefined;

      exportParams.startTime = params.startTime;
      exportParams.endTime = params.endTime;
      exportParams.sysUserName = params.sysUserName;
      exportParams.mobile = params.mobile;
      return idpUserPageList(params);
    };

    const createRequest = async (params:IDP.UserAddParam) => {
      return idpUserAdd({...params,roleIds:roleIds.value,});
    };

    const updateRequest = async (params:IDP.UserUpdateParam) => {
      return idpUserUpdate({...params,roleIds:roleIds.value,});
    };
	
    const deleteRequest = async (params: {sysUserId: number}) => {
      return idpUserDelete({userIds: [params.sysUserId],});
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
              await idpUserDelete({userIds:userIds.value,});
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
      location.href = "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx";
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
        const { success, } = await importUserExcel(options.file);
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
      exportExcelLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/idp/user/exportUserExcel",
          method: "post",
          params: exportParams,
          responseType: "blob",
        })
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "用户管理";
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
          ElMessage.success("导出成功！");
        }
      } catch (error) {
        console.error(error);
      } finally {
        exportExcelLoading.value = false;
      }
    };

    const remoteUser = async (params: IDP.UserInfoParams) => {
      try {
        const {data,} = await idpUserInfo(params);
        roleIds.value = data.roleVoList;
        return {data,};
      } catch (error) {
        console.error(error);
				
      }
    };
		
    const fetchRoles = async () => {
      try {
        const {data,} = await idpRoleQueryUserSelectRoleList({});
        roleList.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const clear = () => {
      roleIds.value = [];
    };

    fetchRoles();

    return {
      extParams,
      takeOffRef,
      uploadExcelRef,
      userIds,
      showModul,
      readColumns,
      writeColumns,
      writeRules,
      editUserId,
      exportExcelLoading,
      importVisible,
      importLoading,
      fileList,
      roleIds,
      roleList,
      readRequest,
      createRequest,
      updateRequest,
      deleteRequest,
      importTemplate,
      handleExceed,
      handleFileChange,
      uploadRequest,
      importExcel,
      handlerExport,
      selectionChange,
      deleteSelection,
      remoteUser,
      clear,
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
