<template>
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
    </el-pro-crud>
  </div>
</template>
<script lang="ts">
import {
  idpUserAdd,
  idpUserDelete,
  idpUserInfo,
  idpUserPageList,
  idpUserUpdate
} from '@/api/idp/userController';
import { CardHeader } from '@/components/index';
import { fetchDictList } from '@/utils/dictApi';
import type {
  FormRules,
  ProCrudWriteColumn,
  ProTableColumn
} from 'element-plus';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UserManagement',
  components: {
    CardHeader,
  },
  setup() {
    const takeOffRef = ref();
    const status = ref(true);

    const readColumns: ProTableColumn[] = [
      {
        title: '姓名',
        dataIndex: 'sysUserName',
        valueType: 'string',
        search: true,
        placeholder: '姓名',
      },
      {
        title: '联系方式',
        dataIndex: 'mobile',
        valueType: 'string',
        search: true,
        placeholder: '联系方式',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        valueType: 'enum',
        valueEnum: [],
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
        title: '姓名',
        dataIndex: 'sysUserName',
        valueType: 'string',
      },
      {
        title: '联系方式',
        dataIndex: 'mobile',
        valueType: 'string',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        valueType: 'enmu',
        valueEnum: [],
      }
    ];

    const writeRules: FormRules = {
      sysUserName: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (!value) {
              callback('姓名不能为空哦！');
            } else if (value.length > 12) {
              callback('姓名的长度不可以超过12个字符哦！');
            } else {
              callback();
            }
          },
          trigger: 'blur',
        }
      ],
      mobile: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (/^1[3-9][0-9]{9}$/.test(value)) {
              callback();
            } else {
              callback('你的电话格式不对哦!');
            }
          },
          trigger: 'blur',
        }
      ],
      gender: [
        { required: true, message: '性别不能为空哦！', trigger: 'change', }
      ],
    };

    fetchDictList('user_sex', writeColumns[2].valueEnum);

    const readRequest = async (data: IDP.UserPageListParams) => {
      const params: any = { ...data, };
      params.startTime = params.createTime?.[0];
      params.endTime = params.createTime?.[1];
      params.createTime = undefined;
      return idpUserPageList(params);
    };

    const createRequest = async (params: IDP.UserAddParam) => {
      try {
        const res = await idpUserAdd({ ...params, roleCode: 'OPERATION', });
        // res.success && ElMessage.success('新增成功');
        return res;
      } catch (error) {}
    };

    const updateRequest = async (params: IDP.UserUpdateParam) => {
      try {
        const res = await idpUserUpdate({ ...params, roleCode: 'OPERATION', });
        // res.success && ElMessage.success('修改成功');
        return res;
      } catch (error) {}
    };

    const deleteRequest = async (params: { sysUserId: number }) => {
      return idpUserDelete({ userIds: [params.sysUserId], });
    };

    const remoteUser = async (params: IDP.UserInfoParams) => {
      return idpUserInfo(params);
    };

    return {
      takeOffRef,
      readColumns,
      writeColumns,
      writeRules,
      status,
      readRequest,
      createRequest,
      updateRequest,
      deleteRequest,
      remoteUser,
    };
  },
});
</script>
