<template>
  <div
    v-show="!collapsed"
    class="layout-sider-project"
  >
    <div class="sider-project-body">
      <ul>
        <li>
          <div class="sider-project-title">
            <span
              class="ellipsis"
              :style="{color: projectStore.$state.projectId === undefined ? '#429FFF' : ''}"
              @click="handlerTenant"
            >{{ project?.tenantName }}</span>
            <el-icon
              v-permission="['ADMIN','ASSIGNMENT_SUPERVISE']"
              @click="handleAdd"
            >
              <Plus />
            </el-icon>
          </div>
          <dd
            v-for="item in project?.projectList"
            :key="item.projectId"
            :data-project="item.projectId"
            :data-active="projectStore.$state.projectId"
            class="sider-project-title"
          >
            <span
              class="ellipsis"
              :style="{color: projectStore.$state.projectId === item.projectId ? '#429FFF' : ''}"
              @click="handlerProject(item)"
            >{{ item.projectName }}</span>
            <el-icon
              v-permission="['ADMIN','ASSIGNMENT_SUPERVISE']"
              color="#409EFF"
              @click="handleEdit(item)"
            >
              <Edit />
            </el-icon>
            <el-icon
              v-permission="['ADMIN','ASSIGNMENT_SUPERVISE']"
              style="margin-left: 10px;"
              color="#F56C6C"
              @click="handleDelete(item)"
            >
              <Delete />
            </el-icon>
          </dd>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { authResourceGetRouters } from "@/api/auth/resourceController";
import { mesProjectDeleteProject, mesProjectQueryJayaTenantProjectInfo } from "@/api/mes/projectController";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { currentMenu } from "@/utils/fn";
import { ElMessage, ElMessageBox } from "element-plus";
import { Ref, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export interface MenuItem {
	id?: number,
	title: string,
	name?: string,
	path: string,
	icon?: string,
	matched?: string[]
	children?: MenuItem[]
}

export default defineComponent({
  name:"LayoutSiderProject",
  components:{
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean,
    },
  },
  setup() {
    const router = useRouter()
    const projectStore = useProject()
    const userInfo = useUserInfo()
    const project:Ref<MES.JayaTenantProjectInfo | undefined> = ref<MES.JayaTenantProjectInfo | undefined>()

    const handleAdd = () => {
      projectStore.$patch((state) => {
        state.projectId = undefined
        state.projectName = undefined
        state.projectCode = undefined
      })
      getRouters()

      router.push({path:"/add-project",})
    }

    const handleEdit = (item:any) => {
      projectStore.$patch((state) => {
        state.projectId = item.projectId
        state.projectName = item.projectName
        state.projectCode = item.projectCode
      })
      getRouters()

      router.push({path:"/edit-project", query:{id:item.projectId,},})
    }

    const handleDelete = async(item:any) => {
      ElMessageBox.confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            await mesProjectDeleteProject({projectId:item.projectId,})
            ElMessage.success("删除成功")
            remoteProject()
          } catch (error) {
            console.error(error)
          }
        })
    }

    const remoteProject = async () => {
      try {
        let { data, } = await mesProjectQueryJayaTenantProjectInfo()
        project.value = data
        userInfo.$patch((state) => {
          state.logo = data.logo
        })
        userInfo.$state.tenantName = data.tenantName

        if(projectStore.$state.projectId) {
          projectStore.$state.electronicFenceList = data.projectList?.find((item) => item.projectId === projectStore.$state.projectId)?.electronicFenceList
        }
      } catch (error) {
        console.error(error)
      }
    }

    const getRouters = async () => {
      try {
        const {data,} = await authResourceGetRouters({projectId:projectStore.$state.projectId,})
        projectStore.$state.resources = currentMenu(data,projectStore.$state.projectId as number)
      } catch (error) {
        console.error(error)
      }
    }

    const handlerTenant = async () => {
      projectStore.$patch((state) => {
        state.projectId = undefined
        state.projectName = undefined
        state.projectCode = undefined
      })
      await getRouters()
      if (projectStore.$state.resources?.length === 0) {
				
        router.replace({path: "/unauthorized",})
      }
      // else if (userInfo.$state.roleIds?.includes("ADMIN")) {
      //   router.replace({path: "/data-dashboard",})
      // } 
      else {
        const path = projectStore.$state.resources?.[0].children?.[0].path ?? projectStore.$state.resources?.[0].path
        router.replace({path: path as string,})
      }
    }

    const handlerProject = async (item:MES.UserProjectSwitchDTO) => {
      projectStore.dataFill(item)
      try {
        const { data, } = await authResourceGetRouters({projectId:item.projectId,})
        projectStore.$state.resources = currentMenu(data,projectStore.$state.projectId as number)
        if (projectStore.$state.resources?.length === 0) {
          router.replace({path: "/unauthorized",})
        }else {
          const path = projectStore.$state.resources?.[0].children?.[0].path ?? projectStore.$state.resources?.[0].path
          router.replace({path: path as string,})
        }
      } catch (error) {
        console.error(error)
      }
    }
    onMounted(remoteProject)
		
    return {
      project,
      router,
      projectStore,
      handleAdd,
      handleEdit,
      handleDelete,
      handlerTenant,
      handlerProject,
    }
  },
})
</script>
<style lang="less">
.layout-sider-project {
	height: calc(100vh - 64px);
	.sider-project-body {
		width: 198px;
		height: 100%;
		background-color: #fff;
		border-right: 2px solid #b8b7b7;
		overflow-y: auto;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	
  .sider-project-title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
		padding: 0 10px;
		height: 56px;
		cursor: pointer;
  }

	.sider-project-item {
		height: 56px;
		cursor: pointer;
	}

	.ellipsis {
		display: block;
		width: 135px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
  

	.el-menu-item.is-active {
		.layout-sider-icon {
			color: #004EFD;
		}
	}
}
</style>
