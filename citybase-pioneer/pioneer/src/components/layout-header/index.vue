<template>
  <div class="layout-header">
    <div class="header-left-side">
      <!--  -->
    </div>
    <div class="header-right-side">
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
import { authUserGetUserInfo } from '@/api/auth/userController';
import { useUserInfo } from '@/stores/userInfo';
import { ArrowDown, UserFilled } from '@element-plus/icons-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name:'LayoutHeader',
  components: {
    ArrowDown,
  },
  setup(){
    const router = useRouter()
    const userInfo = useUserInfo()
		
    const getUserInfo = async () => {
      try {
        const { data, } = await authUserGetUserInfo({})
        data.headUrl = data.headUrl??'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        userInfo.dataFill(data)
      } catch (error) {
      }
    }

    (!userInfo.$state) && getUserInfo()

    const handleCommand = (command: string | number | object) => {
      switch(command){
      case 'userCenter': 
        router.replace('/user-center')
        break;
      case 'logout':
        router.replace('/login')
        break
      }
    }

    return {
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
	
	.right-sider-user{
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
</style>
