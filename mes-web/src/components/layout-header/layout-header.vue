<template>
  <div class="layout-header">
    <div class="header-left-side">
      <img
        class="logo"
        :src="userInfo.$state.logo"
        alt=""
      >
      <div class="name">
        {{ userInfo.$state.tenantName }}
      </div>
      <el-icon
        class="header-left-side-collapsed"
        @click="$emit('update:collapsed',!collapsed)"
      >
        <Expand v-if="collapsed" />
        <Fold v-else />
      </el-icon>
    </div>
    <div class="header-right-side">
      <img
        src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench-header-icon.png"
        alt=""
        width="24"
        height="24"
        @click="router.replace('/workbench')"
      >
      <div class="right-sider-user">
        <div class="right-sider-user-avatar">
          <el-avatar
            :src="userInfo.$state && userInfo.$state.headUrl"
            :size="32"
          />
        </div>
        <el-dropdown
          style="cursor: pointer;"
          @command="handleCommand"
        >
          <span class="right-sider-user-name">
            {{ userInfo.$state ? userInfo.$state.userName : '未登录' }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="userCenter">
                个人中心
              </el-dropdown-item>
              <el-dropdown-item command="project">
                切换项目
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { idpWeChatLogout } from "@/api/idp/weChatLogoutController";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { ArrowDown, Expand, Fold, UserFilled } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name:"LayoutHeader",
  components: {
    ArrowDown,
    Fold,
    Expand,
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean,
    },
  },
  emits: ["update:collapsed"],
  setup(){
    const router = useRouter()
    const route = useRoute()
    const userInfo = useUserInfo()
    const project = useProject()

    const handleCommand = (command: string | number | object) => {
      switch(command){
      case "userCenter": 
        router.replace("/user-center")
        break;
      case "project": 
        router.replace({ path: "/project-selection", query: { from: route.name as string, },})
        break;
      case "logout":
        handleLogout()
        break
      }
    }

    const handleLogout = () => {
      ElMessageBox.confirm("确定退出登录吗？", "提示", {
        type: "warning",
      })
        .then( () => {
          idpWeChatLogout()
          setTimeout(() => {
            userInfo.$reset();
            project.$reset();
            router.replace("/login");
          }, 100);
        
        })
        .catch(() => {
          // 取消
        })
			
    }

    return {
      router,
      project,
      userInfo,
      handleCommand,
      UserFilled,
    }
  },
})
</script>
<style lang="less">
.layout-header {
	width: 100vw;
	height: 64px;
	background-color: #fff;
	border-bottom: 1px solid #D6D6D6;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24px;

	.header-left-side {
		height: 64px;
		display: flex;
		align-items: center;
		
		.logo {
			height: 95%;
		}

		.name {
			font-size: 18px;
			margin-left: 10px;
			color: #191919;
		}

		&-collapsed {
			font-size: 26px;
			color: #666;
			margin: 0 16px;
			cursor: pointer;
		}
	}

	.header-right-side {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 64px;

		img {
			cursor: pointer;
		}
	
	.right-sider-user{
		display: flex;
		align-items: center;
		margin-left: 50px;
		
		&-avatar{
			width: 32px;
			height: 32px;
			margin-right: 5px;
		}
		&-name{
			color: #191919;
			font-size: 14px;
			font-weight: 500;
		}
	}
}
}
</style>
