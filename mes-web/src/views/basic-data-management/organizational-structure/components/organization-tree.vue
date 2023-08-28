<template>
  <div class="organization-tree">
    <card-header title="组织架构" />
    <div class="organization-tree-form">
      <el-input
        v-model="filterName"
        v-permission="['SUPER_ADMIN', 'CAPTAIN', 'DATA_ADMIN', 'PROJECT_MANAGER', 'ASSIGNMENT_SUPERVISE', 'PERSONNEL']"
        placeholder="名称搜索"
      >
        <template #append>
          <el-button
            :icon="Search"
            @click="queryNode"
          />
        </template>
      </el-input>
      <el-select
        v-model="currentProjectId"
        v-permission="['BLOC_ADMIN','ADMIN']"
        class="search--select"
        placeholder="请选择项目"
        style="width: 100%;"
        filterable
        @change="handleChangeProject"
      >
        <el-option
          v-for="item in projectList"
          :key="item.projectId"
          :label="item.projectName"
          :value="item.projectId"
        />
      </el-select>
      <el-button
        v-permission="['SUPER_ADMIN', 'CAPTAIN', 'DATA_ADMIN', 'PROJECT_MANAGER', 'ASSIGNMENT_SUPERVISE', 'PERSONNEL']"
        type="primary"
        :icon="Plus"
        @click="dialogVisible = true,dialogType='add'"
      >
        新增组织
      </el-button>
    </div>
    <div
      ref="treeWrapper"
      class="tree-wrapper"
    >
      <el-tree-v2
        ref="treeRef"
        :data="treeData"
        :props="treeProps"
        :height="treeHeight"
        :highlight-current="true"
        :filter-method="filterMethod"
        @current-change="handlerCurrentChange"
      >
        <template #default="{ node,data }">
          <div
            
            class="tree-item"
            :data-node="Object.keys(data)"
          >
            <p class="tree-item-label">
              {{ node.label }}
            </p>
            <p class="tree-item-icons">
              <el-icon
                v-permission="['SUPER_ADMIN', 'CAPTAIN', 'DATA_ADMIN', 'PROJECT_MANAGER', 'ASSIGNMENT_SUPERVISE', 'PERSONNEL']"
                :size="16"
                color="#1D51F4"
                @click.stop="addChildrenNode(data)"
              >
                <Plus />
              </el-icon>
              <el-icon
                v-permission="['SUPER_ADMIN', 'CAPTAIN', 'DATA_ADMIN', 'PROJECT_MANAGER', 'ASSIGNMENT_SUPERVISE', 'PERSONNEL']"
                :size="16"
                color="#1D51F4"
                @click.stop="editNode(data)"
              >
                <EditPen />
              </el-icon>
              <el-popconfirm
                v-if="(!project.$state.roleCode?.includes('BLOC_ADMIN') && !project.$state.roleCode?.includes('ADMIN')) ?? !node.children"
                title="确定要删除此组织吗?"
                @confirm="deleteNode(data)"
              >
                <template #reference>
                  <el-icon
                    :size="16"
                    color="#1D51F4"
                  >
                    <Delete />
                  </el-icon>
                </template>
              </el-popconfirm>
            </p>
          </div>
        </template>
      </el-tree-v2>
    </div>
  </div>
  <organization-dialog
    v-if="dialogVisible"
    v-model:visible="dialogVisible"
    :type="dialogType"
    :params="dialogParams"
    :org-id="dialogOrgId"
    @closed="handlerClosed"
  />
</template>

<script lang="ts">
import { mesDepartmentDelOrg, mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { mesProjectQueryProjectSelectList } from "@/api/mes/projectController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { Delete, EditPen, Plus, Search } from "@element-plus/icons-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { OrganizationDialog } from "./index";

export default defineComponent({
  name: "OrganizationTree",
  components: {
    CardHeader,
    OrganizationDialog,
    Plus,
    EditPen,
    Delete,
  },
  props: {
    ids: {
      type: String,
      required: true,
    },
    curentProjectId: {
      type: Number,
      required: true,
    },
  },
  emits:[ "update:ids","update:curentProjectId" ],
  setup(props,{emit,}) {
    const userInfo = useUserInfo();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const treeRef = ref();
    const treeData = ref<MES.OrgTree[]>([]);
    const currentProjectId = ref<number | undefined>();
    const filterName = ref<string>("");
    const dialogVisible = ref<boolean>(false);
    const remoteProjectLoading = ref<boolean>(false);
    const dialogType = ref<"add" | "edit">("add");
    const dialogOrgId = ref<number | undefined>();
    const treeWrapper = ref<HTMLDivElement | undefined>();
    const projectList = ref<MES.ProjectSelectDTO[]>([]);
    const treeHeight = ref<number>(300);
    const dialogParams = reactive({
      level: 1,
      parentId: -1,
    });
    const treeProps = {
      value: "id",
      label: "orgName",
      children: "children",
    };

    const remoteTree = async () => {
      try {
        const isAdminRole = project.$state.roleCode?.includes("BLOC_ADMIN") || project.$state.roleCode?.includes("ADMIN");
        const projectIdToUse = isAdminRole ? currentProjectId.value : projectId;
        let { data, } = await mesDepartmentQueryOrgTreeList({ projectId: projectIdToUse as number, });
        treeData.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      (project.$state.roleCode?.includes("BLOC_ADMIN") || project.$state.roleCode?.includes("ADMIN")) ? remoteProject() : (remoteTree(),emit("update:curentProjectId", projectId));
      treeHeight.value = <number>treeWrapper.value?.clientHeight;
    });

    const queryNode = () => {
  		treeRef.value.filter(filterName.value);
    };

    const filterMethod = (query: string, node: MES.OrgTree) => {
      return node.orgName.includes(query);
    };

    const addChildrenNode = (data:MES.OrgTree | any) => {
      dialogType.value = "add";
      dialogParams.level = <number>data.level + 1;
      dialogParams.parentId = <any>data.id;
      dialogVisible.value = true;
    };

    const editNode = (data:MES.OrgTree | any) => {
      dialogType.value = "edit";
      dialogOrgId.value = <any>data.id;
      dialogVisible.value = true;
    };

    const deleteNode = async (data:MES.OrgTree | any) => {
      try {
        await mesDepartmentDelOrg({orgId:<any>data.id,});
        remoteTree();
      } catch (error) {
        console.error(error);
      }
    };

    const handlerCurrentChange = (data: MES.OrgTree | any) => {
      let idarry = [];
      idarry.push(data.id);
      if (data.level < 3) {
        data.children?.forEach((item:any) => {
          idarry.push(item.id);
          if (item.children?.length) {
            // @ts-ignore
            item.children.forEach(({id,}) => {
              idarry.push(id);
            })
          }
        })
      }
      emit("update:ids",idarry?.join(","));
    };

    const handlerClosed = () => {
      dialogType.value = "add";
      dialogParams.level = 1;
      dialogParams.parentId = -1;
      dialogOrgId.value = undefined;
      dialogVisible.value = false;
      remoteTree();
    };

    const remoteProject = async () => {
      remoteProjectLoading.value = true;
      try {
        const { data, } = await mesProjectQueryProjectSelectList({});
        projectList.value = data;
        currentProjectId.value = data[0].projectId;
        remoteTree();
        emit("update:curentProjectId",data[0].projectId);
      } catch (e) {
        console.error(e);
      }finally{
        remoteProjectLoading.value = false;
      }
    };

    const handleChangeProject = async (value:any) => {
      currentProjectId.value = value;
      remoteTree();
      emit("update:curentProjectId",currentProjectId.value);
      emit("update:ids","");
    };
		
    return {
      userInfo,
      project,
      filterName,
      dialogType,
      dialogVisible,
      dialogParams,
      dialogOrgId,
      treeWrapper,
      treeRef,
      treeData,
      treeProps,
      treeHeight,
      projectList,
      projectId,
      remoteProjectLoading,
      currentProjectId,
      Search,
      Plus,
      queryNode,
      filterMethod,
      addChildrenNode,
      editNode,
      deleteNode,
      handlerClosed,
      handlerCurrentChange,
      handleChangeProject,
      remoteProject,
    }
  },
})
</script>
<style lang="less">
.organizational-structure .organization-tree {
	width: 334px;
	background-color: #fff;
	display: flex;
	flex-direction: column;

	&-form {
		padding: 12px 24px 10px;
		display: flex;
		column-gap: 8px;
	}

	.tree-wrapper {
		flex: 1;

		.tree-item {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 24px;

			&-icons {
				display: none;
				column-gap: 8px;
				align-items: center;
			}
		}

		.is-current .tree-item {
			&-label {
				color: #1D51F4;
			}
			&-icons {
				display: flex;
			}
		}
	}
}

</style>
