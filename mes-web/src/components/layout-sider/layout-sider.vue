<template>
  <div
    class="layout-sider"
  >
    <el-menu
      v-if="project.$state.roleCode?.includes('ADMIN') && !project.$state.projectId"
      :collapse="collapsed"
      :style="{ width: collapsed?'64px':'200px', height: '100%' }"
      :default-active="activePath"
      :collapse-transition="false"
      router
      unique-opened
    >
      <el-menu-item index="/data-dashboard">
        <img
          :src="menuIcon({path:'/data-dashboard',icon:'data-dashboard'})"
          alt=""
          class="layout-sider-icon"
        >
        <template #title>
          <span>项目看板</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/operation-analysis">
        <img
          :src="menuIcon({path:'/operation-analysis',icon:'operation-analysis'})"
          alt=""
          class="layout-sider-icon"
        >
        <template #title>
          <span>运营分析</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/basic-data-management/organizational-structure">
        <img
          :src="menuIcon({path:'/basic-data-management/organizational-structure',icon:'organizational-structure'})"
          alt=""
          class="layout-sider-icon"
        >
        <template #title>
          <span>组织架构</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/user-management">
        <img
          :src="menuIcon({path:'/user-management',icon:'user-management'})"
          alt=""
          class="layout-sider-icon"
        >
        <template #title>
          <span>用户管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/role-management">
        <img
          :src="menuIcon({path:'/role-management',icon:'role-management'})"
          alt=""
          class="layout-sider-icon"
        >
        <template #title>
          <span>角色管理</span>
        </template>
      </el-menu-item>
    </el-menu>
    <el-menu
      v-else-if="project.$state.resources?.length"
      :collapse="collapsed"
      :style="{ width: collapsed?'64px':'200px', height: '100%', overflow: 'auto' }"
      :default-active="activePath"
      router
      unique-opened
      class="layout-sider-menu"
    >
      <menu-item
        v-for="node in project.$state.resources"
        :key="node.path"
        :node="node"
        :active-path="activePath"
      />
    </el-menu>
  </div>
</template>
<script lang="ts">
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./menu-item.vue";

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
  name:"LayoutSider",
  components:{
    MenuItem,
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean,
    },
  },
  emits: ["update:collapsed"],
  setup(props,{emit,}) {
    const route = useRoute()
    const activePath = computed(() => route.path)
    const project = useProject()
    const userInfo = useUserInfo()

    const handlerCollapsed = (value:boolean) => {
      emit("update:collapsed",value)
    }

    const menuIcon = (menu: MenuItem | any) => {
      const suffix = activePath.value === menu.path ? "-active.png" : ".png"
      return `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jieya-menu/${menu.icon}${suffix}`
    }
		
    return {
      activePath,
      project,
      userInfo,
      handlerCollapsed,
      menuIcon,
    }
  },
})
</script>
<style lang="less">
.layout-sider {
	height: calc(100vh - 64px);
	&-menu::-webkit-scrollbar {
		display: none;
	}

	& img{
		width: 16px;
	}

	&-icon{
		width: 20px;
		margin-right: 5px;
		color: #181B28;
	}

	.el-menu-item.is-active {
		.layout-sider-icon {
			color: #004EFD;
		}
	}

}

.default-layout-sider {
	overflow: hidden;
}
</style>
