<template>
  <div class="layout-header">
    <div class="header-left-side">
      <div class="left-side-title">
        <img
          src="@/assets/icons/logo.png"
          alt="logo"
          class="left-side-title-icon"
        >
        <h5 class="left-side-title-name">
          城市之光无人环卫调度管理平台
        </h5>
      </div>
    </div>
    <div class="header-right-side">
      <router-link
        to="/large-screen"
        style="color: #1769FA;"
      >
        大数据中心
      </router-link>
      <div class="right-side-user">
        <div
          v-if="userInfoValue !== null"
          class="right-side-user-name"
        >
          {{ userInfoValue.userName }}
        </div>
        <a-dropdown
          trigger="hover"
          @select="handleSelect"
        >
          <img
            src="@/assets/images/user-avatar.jpg"
            alt="头像"
            :style="{ width:'36px',borderRadius: '50%',cursor:'pointer' }"
          >
          <template #content>
            <a-doption value="userCenter">
              <template #default>
                个人中心
              </template>
            </a-doption>
            <a-doption value="loginout">
              <template #default>
                退出登录
              </template>
            </a-doption>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getInfoUsingGET } from "@/api/dengluyanzheng"
import { userInfo, userInfoValue } from "@/refs"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  name: "LayoutHeader",
  setup () {
    const router = useRouter()

    const getUserInfo = async () => {
      try {
        const { data, } = await getInfoUsingGET()
        const { user, roles, } = data
        const userData = {
          id: user.id,
          userName: user?.userName,
          admin: user?.admin,
          mobile: user.mobile,
          roles,
        }
        userInfo.value = (JSON.stringify(userData))
      } catch (error) {

      }
    }

    if (!userInfoValue.value) {
      getUserInfo()
    }

    const handleSelect = (type:string | number | Record<string, any> | undefined) => {
      switch (type) {
      case "userCenter":
        router.replace("/dashboard/user-center")
        break
      case "loginout":
        router.replace("/login")
        break
      }
    }

    return {
      userInfoValue,
      handleSelect,
    }
  },
})
</script>
<style lang="less">
.layout-header {
	padding: 0 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.header-left-side,.header-right-side {
	display: flex;
	align-items: center;
	gap: 24px;
}
.left-side-title {
	display: flex;
	gap: 12px;
	&-icon {
		width: 24px;
		height: 24px;
	}
	&-name {
		font-size: 18px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fff;
	}
}
.right-side-user {
	display: flex;
	gap: 24px;
	align-items: center;

	&-name {
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: normal;

	}
}
</style>
