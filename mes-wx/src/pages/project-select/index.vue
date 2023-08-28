<template>
  <view class="project-select">
    <view style="margin-bottom: 40rpx;">
      <view class="project-select-title">
        选择角色
      </view>
      <uni-swiper-dot
        mode="round"
        :info="swiperDotInfo"
        :current="current"
        :dots-styles="{bottom: 0, selectedBackgroundColor: swiperDotInfo.length > 1 ? 'rgba(0, 0, 0, .9)' : 'transparent', selectedBorder: swiperDotInfo.length > 1 ? '1px rgba(0, 0, 0, .9) solid' : 'transparent'}"
        @clickItem="swiperDotClickItem"
      >
        <swiper
          class="project-select-swiper"
          :current="swiperDotIndex"
          :disable-touch="swiperDotInfo.length <= 1"
          @change="swiperChange"
        >
          <template
            v-for="(role, index) in swiperDotInfo"
            :key="index"
          >
            <swiper-item class="project-select-roles">
              <template
                v-for="(item,key) in role"
                :key="key"
              >
                <view
                  class="project-select-roles__item"
                  :class="{'role-active':userRole === item.role }"
                  @click="handleRole(item.role)"
                >
                  <view class="project-select-roles__item--box">
                    <image
                      class="project-select-roles__item--icon"
                      :src="userRole === item.role ? item.activeImgUrl : item.imgUrl"
                    />
                  </view>
                  <text class="project-select-roles__item--name">
                    {{ item.roleName }}
                  </text>
                </view>
              </template>
            </swiper-item>
          </template>
        </swiper>
      </uni-swiper-dot>
    </view>
    <view v-show="userRole !== ''">
      <view class="project-select-title">
        选择项目
      </view>
      <view
        v-if="loading"
        class="loading"
      />
      <scroll-view
        v-else-if="projectList.length"
        scroll-y
        class="project-select-list"
      >
        <view
          v-for="(item, index) in projectList"
          :key="index"
          class="project-select-list__item"
          :class="{'project-active': item.projectId === projectInfo.projectId}"
          @click="projectChange(item)"
        >
          <view>
            <image
              class="project-select-list__item--icon"
              :src="item.projectId === projectInfo.projectId ? 'https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/project-icon_active.png' : 'https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/project-icon.png'"
            />
            <text class="project-select-list__item--name">
              {{ item.projectName }}
            </text>
          </view>
          <!-- <view class="project-select-list__item--version">
            {{ item.projectType === 'jaya' ? '洁亚版' : '标准版' }}
          </view> -->
        </view>
      </scroll-view>
      <view
        v-else
        class="data-none"
      >
        当前角色下无项目
      </view>
    </view>
    <button
      class="project-select--btn"
      @click="goTo"
    >
      进入项目
    </button>
  </view>
</template>
<script lang='ts'>
import { mesWechatUserSelectUserProjects, mesWechatUserSelectUserRoles } from "@/api/mes/wechatController";
import type { Ref } from "vue";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProjectSelect",
  setup() {
    const userRole: Ref<string> = ref<string>("")
    const projectList: Ref<MES.WechatProjectDTO[]> = ref<MES.WechatProjectDTO[]>([])
    const userRoleList: Ref<string[]> = ref<string[]>([])
    const projectInfo: Ref<MES.WechatProjectDTO> = ref<MES.WechatProjectDTO>({})
    const loading: Ref<boolean> = ref<boolean>(false)
    const current: Ref<number> = ref<number>(0)
    const swiperDotIndex: Ref<number> = ref<number>(0)

    const roleList = [
      {roleName: "项目经理", role: "PROJECT_MANAGER", imgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/project-manager.png", activeImgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/project-manager-active.png",},
      {roleName: "队长", role: "CAPTAIN", imgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/captain.png", activeImgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/captain-active.png",},
      {roleName: "整改员", role: "RECTIFIER", imgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/rectifier.png", activeImgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/rectifier-active.png",},
      {roleName: "督查员", role: "INSPECTOR", imgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/inspector.png", activeImgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/inspector-active.png",},
      {roleName: "一线人员", role: "ONE_PERSONNEL", imgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/rectifier.png", activeImgUrl: "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.6/rectifier-active.png",}
    ]

    const getUserRoleList = async () => {
      try {
        const { data, } = await mesWechatUserSelectUserRoles({})
        userRoleList.value = roleList.filter(item => data.includes(item.role)).map(item => item.role)
        userRoleList.value = userRoleList.value.length !== 0 ? Array.from(new Set(userRoleList.value)) : []
        userRoleList.value.length && handleRole(userRoleList.value[0])
      } catch (error) {
      }
    }

    const getProjectList = async () => {
      loading.value = true
      try {
        const { data, } = await mesWechatUserSelectUserProjects({ role: userRole.value, })
        projectList.value = data
        projectList.value.length === 1 && (projectInfo.value = data[0])
      } catch (error) {
      } finally { loading.value = false }
    }
    getUserRoleList()

    const projectChange = (val: MES.WechatProjectDTO) => {
      projectInfo.value = val
    }

    const goTo = () => {
      if (!projectInfo.value.projectId) {
        uni.showToast({ title: "请选择项目", icon: "none", })
        return;
      }
      uni.setStorageSync("projectInfo", projectInfo.value)
      uni.setStorageSync("userRole", userRole.value)
      if(userRole.value === "ONE_PERSONNEL"){
        uni.redirectTo({ url: "/pages/punch-clock-personnal/index", })
      } else if(userRole.value === "RECTIFIER"){
        uni.redirectTo({ url: "/pages/rectify-list/index", })
      } else {
        uni.redirectTo({ url: "/pages/index/index", })
      }
    }

    const handleRole = (e: string) => {
      if(userRole.value === e) return;
      projectList.value = []
      projectInfo.value = {}
      userRole.value = e
      getProjectList()
    }

    const swiperChange = ({detail,}:any) => {
      current.value = detail.current
    }

    const swiperDotClickItem = (e: number) => {
      swiperDotIndex.value = e
    }

    const swiperDotInfo = computed(()=> {
      const data = roleList.filter(item => userRoleList.value.includes(item.role))
      const newArr:any[] = []
      for (let i = 0; i < data.length; i += 4) {
        newArr.push(data.slice(i, i + 4));
      }
      return newArr;
    })

    return {
      loading,
      projectInfo,
      userRoleList,
      projectList,
      roleList,
      userRole,
      current,
      swiperDotInfo,
      swiperDotIndex,
      goTo,
      projectChange,
      handleRole,
      swiperChange,
      swiperDotClickItem,
    }
  },
})
</script>
<style lang='scss'>
.project-select {
	position: relative;
	height: 100vh;
	background-color: #fff;
	padding-top: 240rpx;
	box-sizing: border-box;

	&-title {
		font-size: 26rpx;
		color: #0000007d;
		padding: 0 32rpx;
	}

	&-swiper {
		padding-top: 70rpx;
		height: 210rpx;
	}

	&-roles {
		display: flex;
		justify-content: space-evenly;
		padding: 0 32rpx;
    box-sizing: border-box;

		&__item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 1rpx solid #e5e5e5;
			width: 156rpx;
			height: 156rpx;
			border-radius: 10rpx;
			box-sizing: border-box;

			&--box {
				width: 45rpx;
				height: 45rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			&--icon {
				width: 45rpx;
				height: 45rpx;
			}

			&--name {
				font-size: 28rpx;
				margin-top: 20rpx;
			}
		}

		.role-active {
			background: #E5F4FE;	
			border: 1rpx solid #03A6FD;
			border-image: none;
		}
	}

	&-list {
		height: 750rpx;
		margin-top: 20rpx;
		box-sizing: border-box;

		&__item {
			height: 108rpx;
			background-color: #FAFBFC;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.05);
			border-radius: 10rpx;
			margin: 0 32rpx 20rpx;
			padding: 0 40rpx 0 26rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;

			&--icon {
				width: 52rpx;
				height: 52rpx;
				vertical-align: middle;
				margin-right: 25rpx;
			}

			&--name {
				font-size: 36rpx;
			}
		}

		.project-active {
			background-color: #03A6FD;
			color: #fff;
		}
	}

	&--btn {
		border-radius: 50rpx 50rpx;
		background-color: #03A6FD;
		color: #fff;
		width: calc(100vw - 64rpx);
		position: absolute;
		bottom: 100rpx;
		left: 0;
		right: 0;
		margin: auto;
	}
}
</style>
