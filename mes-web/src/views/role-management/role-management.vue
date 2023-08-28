<template>
  <default-layout>
    <div class="role-management page-root">
      <card-header title="角色管理" />
      <el-pro-crud
        ref="takeOffRef"
        :row-key="'roleId'"
        :read-columns="readColumns"
        :read-request="readRequest"
        :with-menu="[]"
        :pro-table-props="{hiddenLabel:true,showIndex:true}"
      >
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
            @click="handlerRole(row.roleId)"
          >
            权限
          </el-button>
        </template>
        <template #read-column-enableStatus="{row}">
          {{ row.enableStatus === 0 ? '启用' : '禁用' }}
        </template>
      </el-pro-crud>
      <app-drawer
        v-model="roleVisible"
        :title="'功能权限'"
        :footer="false"
      >
        <template #form>
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
      </app-drawer>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { idpRolePageList, idpRoleQueryResourceRole } from "@/api/idp/roleController";
import { AppDrawer, CardHeader } from "@/components";
import { DefaultLayout } from "@/layout";
import type { ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "RoleManagement",
  components:{
    CardHeader,
    AppDrawer,
    DefaultLayout,
  },
  setup () {
    const clientId = "jaya";
    const takeOffRef = ref();
    const roleVisible = ref(false);
    const roleId = ref();
    const treeRef = ref();
    const roleList = ref();
    const defaultProps = {
      value: "id",
      children: "children",
      label: "resourceName",
      disabled:"disabled",
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
        valueType: "string",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
        valueType: "slot",
        search: true,
      }
    ];

    const readRequest = async (data:IDP.RolePageListParams) => {
      const params:any = {...data,};
      params.startTime = params.createTime?.[0];
      params.endTime = params.createTime?.[1];
      params.createTime = undefined;
      return idpRolePageList({...params,clientId,});
    };

    const handlerRole = (id:number) => {
      roleVisible.value = true;

      fetchData(id);
    };

    const fetchData = async (roleId:number) => {
      try {
        const {data,} = await idpRoleQueryResourceRole({roleId,});
        const pitchList = [] as any;

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
        treeRef.value.setCheckedKeys(pitchList);

        data.map((level1:any) => {
          level1.disabled = true;
          level1.children.map((level2:any) => {
            level2.disabled = true;
            level2.children.map((level3:any) => {
              level3.disabled = true;
              level3.children.map((level4:any) => {
                level4.disabled = true;
              })
            })
          })
        });
				
        roleList.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      takeOffRef,
      readColumns,
      roleVisible,
      roleId,
      treeRef,
      defaultProps,
      roleList,
      readRequest,
      handlerRole,
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
