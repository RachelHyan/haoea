<template>
  <div class="role-management page-root">
    <card-header title="角色管理" />
    <el-pro-crud
      ref="takeOffRef"
      :row-key="'roleId'"
      :read-columns="readColumns"
      :read-request="readRequest"
      :create-request="createRequest"
      :write-columns="writeColumns"
      :write-rules="writeRules"
      :with-menu="['create']"
      :pro-table-props="{hiddenLabel:true,showIndex:true}"
      :ext-params="extParams"
    >
      <template #read-column-enableStatus="{row,index}">
        <el-switch
          v-model="row.enableStatus"
          :active-value="0"
          :inactive-value="1"
          @change="(val:any) => handlerSwitch(val,row,index)"	
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
      <template #write-column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="handlerRole(row.roleId,row)"
        >
          权限
        </el-button>
        <el-button
          v-if="row.isDefault"
          type="primary"
          link
          @click="handlerInfo(row)"
        >
          编辑
        </el-button>
      </template>
      <template #write-form-roleDesc="{model}">
        <el-input
          v-model="model.roleDesc"
          :rows="2"
          type="textarea"
          placeholder="请输入"
        />
      </template>
    </el-pro-crud>
    <el-pro-dialog
      v-model:model-value="infoVisible"
      :title="'编辑'"
    >
      <el-form
        ref="formRef"
        :model="writeModel"
        :rules="writeRules"
        :label-width="100"
      >
        <el-form-item
          label="角色名称"
          prop="roleName"
        >
          <el-input
            v-model="writeModel.roleName"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="描述"
          prop="roleDesc"
        >
          <el-input
            v-model="writeModel.roleDesc"
            placeholder="请输入"
            type="textarea"
            rows="2"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button
          type="danger"
          plain
          @click="infoVisible = false"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          @click="updateRequest"
        >
          确认
        </el-button>
      </template>
    </el-pro-dialog>
    <el-drawer
      v-model="roleVisible"
      :title="'功能权限'"
      :direction="'rtl'"
    >
      <template #default>
        <el-tree
          ref="treeRef"
          class="role-list"
          :data="roleList"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="submit"
          >
            确认
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { idpRoleAddRole, idpRoleAddRoleResource, idpRolePageList, idpRoleQueryResourceRole, idpRoleUpdateEnableStatus, idpRoleUpdateRole } from "@/api/idp/roleController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { Action, ElMessage, ElMessageBox, FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "RoleManagement",
  components:{
    CardHeader,
  },
  setup () {
    const clientId = "jaya";
    const dict = useDict();
    const enableStatus = dict.$state.enableStatus;
    const takeOffRef = ref();
    const formRef = ref();
    const roleVisible = ref<boolean>(false);
    const infoVisible = ref<boolean>(false);
    const submitLoading = ref<boolean>(false);
    const roleId = ref();
    const treeRef = ref();
    const roleList = ref();
    const tenantId = ref();
    const tenantList = ref();
    const writeModel = reactive<IDP.RoleDTO | any>({});
    const defaultProps = {
      value: "id",
      children: "children",
      label: "resourceName",
      disabled:"disabled",
    };
    const extParams = {
      type:"customize",
    };

    const readColumns:ProTableColumn[] = [
 			{
        title: "角色名称",
        dataIndex: "roleName",
        valueType: "string",
        search: true,
        placeholder: "角色名称",
      },
      {
        title: "角色标签",
        dataIndex: "roleLabel",
        valueType: "string",
      },
      {
        title: "描述",
        dataIndex: "roleDesc",
        valueType: "string",
      },
      {
        title: "启用状态",
        dataIndex: "enableStatus",
        valueType: "slot",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
        valueType: "slot",
        search: true,
      }
    ];

    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "角色名称",
        dataIndex: "roleName",
        valueType: "string",
      },
      {
        title: "描述",
        dataIndex: "roleDesc",
        valueType: "slot",
      }
    ];

    const writeRules:FormRules = {
      roleName: [
        {required: true, message: "请输入角色名称", trigger: "blur",}
      ],
    };

    const readRequest = async (data:IDP.RolePageListParams) => {
      const params:any = {...data,};
      params.startTime = params.createTime?.[0];
      params.endTime = params.createTime?.[1];
      params.createTime = undefined;
      return idpRolePageList({...params,clientId,});
    };

    const createRequest = async (params:IDP.RoleInParam) => {
      return idpRoleAddRole(params);
    };

    const handlerInfo = (params:IDP.RoleDTO) => {
      infoVisible.value = true;
      writeModel.roleId = params.roleId;
      writeModel.roleName = params.roleName;
      writeModel.roleDesc = params.roleDesc;
    };

    const updateRequest = () => {
      formRef.value?.validate( async (valid:any) => {
        if (valid) {
          submitLoading.value = true;
          try {
            await idpRoleUpdateRole({...writeModel,});
            ElMessage.success("修改成功");
          } catch (error) {
            console.error(error);
						
          } finally {
            submitLoading.value = false;
            infoVisible.value = false;
            takeOffRef.value?.load();
          }
        }
      });
    };

    const handlerSwitch = (val:any,row:any,index:number) => {
      if (index === -1) return;
      ElMessageBox({
        title: "提示",
        type: "warning",
        message: `确定要将${row.roleName}${row.enableStatus ? "禁用" : "启用"}吗？`,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        callback: async (action: Action) => {
          if (action === "confirm") {
            try {
              const params = {
                roleId: row.roleId,
                roleName: row.roleName,
                roleDesc: row.roleDesc,
                enableStatus: row.enableStatus,
              };
              const { success, } = await idpRoleUpdateEnableStatus(params);
              if (success) {
                ElMessage.success("设置成功！");
                takeOffRef.value.load();
              }
            } catch (error) {
              console.error(error);
            }
          }else {
            takeOffRef.value.load();
          }
        },
      });
    };

    const handlerRole = (id:number,data:any) => {
      roleVisible.value = true;
      roleId.value = id;
			
      fetchData(id,data);
    };

    const fetchData = async (roleId:number,item:any) => {
      try {
        const {data,} = await idpRoleQueryResourceRole({roleId,});
        const pitchList:number[] = [];

        const pitch = (items:any) => {
          for (const item of items) {
            if (item.pitch) {
              pitchList.push(item.id);
            }
            if (item.children) {
              pitch(item.children);
            }
          }
        };

        pitch(data);

        // 筛选掉children不为空的父级节点的id
        const filteredIds = pitchList.filter((id) => {
          // @ts-ignore
          const targetItem = data.find(item => item.id === id);
          // @ts-ignore
          if (targetItem?.children?.length) {
            return false;
          }
          return true;
        });
        // @ts-ignore
        if (!item.isDefault) {
          data.map((level1:any) => {
            level1.disabled = true;
            level1.children.map((level2:any) => {
              level2.disabled = true;
              level2.children.map((level3:any) => {
                level3.disabled = true;
                level3.children.map((level4:any) => {
                  level4.disabled = true;
                });
              });
            });
          });
        }
				
        treeRef.value.setCheckedKeys(filteredIds, true);
        roleList.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const cancel = () => {
      roleVisible.value = false;
    };

    const submit = async () => {
      const checkedKeys = treeRef.value.getCheckedKeys();
      const halfCheckedKeys = treeRef.value.getHalfCheckedKeys();
      const params = {
        roleId: roleId.value,
        tenantId: takeOffRef.value.proTableRef.model.tenantId,
        resourceIds: [...checkedKeys, ...halfCheckedKeys],
      };
			
      try {
      	await idpRoleAddRoleResource(params);
      	roleVisible.value = false;
      	takeOffRef.value.load();
      } catch (error) {
        console.error(error);
      }
    };


    return {
      takeOffRef,
      formRef,
      readColumns,
      writeColumns,
      writeModel,
      writeRules,
      roleVisible,
      infoVisible,
      submitLoading,
      roleId,
      treeRef,
      defaultProps,
      roleList,
      tenantId,
      tenantList,
      extParams,
      enableStatus,
      readRequest,
      createRequest,
      handlerInfo,
      updateRequest,
      handlerRole,
      handlerSwitch,
      cancel,
      submit,
    }
  },
})
</script>

<style lang="less">
	.role-list {
		.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
			background-color: #409EFF !important;
			border-color: #409EFF !important;

			&:after {
				border-color: #fff !important;
			}
		}
}
</style>
