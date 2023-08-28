<template>
  <div class="workbench">
    <div class="workbench__header">
      <div class="workbench__header-left">
        智慧城市服务
      </div>
      <div class="workbench__header-right">
        <div class="workbench__header-right--project">
          <img
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench/top-project-icon.png"
            alt=""
            width="16"
            height="16"
          >{{ project.$state.projectName }}
        </div>
        <div class="right-user">
          <div class="right-user-avatar">
            <el-avatar
              :src="userInfo.$state && userInfo.$state.headUrl"
              :size="32"
            />
          </div>
          <el-dropdown
            style="cursor: pointer;"
            @command="handleCommand"
          >
            <span class="right-user-name">
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
    <div class="workbench__body">
      <div class="workbench__body-left">
        <div class="workbench__body-left__title">
          <img
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench/workbench-icon.png"
            alt=""
            width="20"
            height="20"
          >
          工作台
        </div>
        <div class="workbench__body-left__body">
          <div
            v-for="(item,index) in workbenchs"
            :key="index"
            class="workbench__body-left__body-item"
            @click="handleClick(item)"
          >
            <img
              :src="item.icon"
              alt=""
              width="120"
              height="120"
            >
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="workbench__body-right">
        <calendar-model />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { idpWeChatLogout } from "@/api/idp/weChatLogoutController";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { ElMessageBox } from "element-plus";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import CalendarModel from "./components/calendar-model.vue";

export default defineComponent({
  name: "WorkbenchPage",
  components: {
    CalendarModel,
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const userInfo = useUserInfo();
    const project = useProject();
    const workbenchs = project.$state.workbenchs;

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

    const handleClick = (item: any) => {
      if (item.isOpen) {
        router.replace({name: item.path,})
      } else {
        ElMessageBox.alert(`${item.prompt}`, "提示", {
          confirmButtonText: "确定",
        })
      }
    }

    return {
      userInfo,
      project,
      workbenchs,
      handleCommand,
      handleClick,
    }
  },
})
</script>

<style lang='less'>
.workbench {
	width: 100vw;
	height: 100vh;
	
	&__header {
		width: 100vw;
		height: 64px;
		background-color: #fff;
		border-bottom: 1px solid #D6D6D6;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&-left {
			font-size: 20px;
			font-weight: 500;
			margin-left: 24px;
		}
		
		&-right {
			display: flex;
			align-items: center;
			margin-right: 26px;

			&--project {
				display: flex;
				align-items: center;
				margin-right: 75px;

				img {
					margin-right: 8px;
				}
			}
			
			.right-user{
				display: flex;
				align-items: center;
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

	&__body {
		width: 100vw;
		height: calc(100vh - 64px);	
		background: linear-gradient(180deg, #F2F9FF 0%, #FAFBFD 100%);
		display: flex;
		background-image: url(https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench/workbench-bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center;

		&-left {
			flex: 1;

			&__title {
				display: flex;
				align-items: center;
				font-size: 20px;
				font-weight: 500;
				margin-left: 59px;
				margin-top: 88px;

				img {
					margin-right: 8px;
				}
			}

			&__body {
				margin-top: 67px;
				margin: 67px 80px 0;
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				grid-row-gap: 60px;

				&-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					cursor: pointer;

					img {
						margin-bottom: 24px;
					}

					p {
						font-size: 16px;
					}
				}
			}
		}

		&-right {
			width: 543px;
			height: 571px;
			padding-left: 99px;
			padding-top: 84px;
			border-left: 1px solid ;
			border-image: linear-gradient(180deg, rgba(110, 161, 255, 1), rgba(97, 162, 255, 0)) 1 1;
		}
	}
}
</style>
