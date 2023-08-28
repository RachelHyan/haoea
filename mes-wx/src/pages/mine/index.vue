<template>
  <view class="mine">
    <nav-bar
      background-color="transparent"
      :border="false"
    />
    <view class="mine-head">
      <view class="mine-head-user">
        <view class="mine-head-user-avatar">
          <uni-icons
            v-if="!userInfo.headUrl"
            type="person"
            color="#fff"
            size="50"
          />
          <image
            v-else
            class="mine-head-user-avatar--img"
            :src="userInfo.headUrl"
          />
        </view>
        <view class="mine-head-user-info">
          <view
            class="mb10"
            style="display: flex;align-items: center;"
          >
            <text class="mine-head-user-info-name mr20">
              {{ userInfo.userName }}
            </text>
            <text class="mine-head-user-info-role">
              {{ userRole === "PROJECT_MANAGER" ? '项目经理' : userRole === 'CAPTAIN' ? '队长' : userRole === 'INSPECTOR' ? '督查员' : userRole === 'RECTIFIER' ? '整改员' : userRole === 'ONE_PERSONNEL' ? '一线人员' : '-' }}
            </text>
          </view>
          <view class="mb10">
            <text>{{ userInfo.mobile }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="mine-body">
      <view
        class="mine-body-item"
        @click="handleBind"
      >
        <view>
          <uni-icons
            class="mr20"
            type="weixin"
            color="#999"
            size="24"
          />
          <text>微信解绑</text>
        </view>
        <view class="color-grey">
          <text>{{ userBind ? '解绑当前账号' : '已解绑' }}</text>
          <uni-icons
            type="right"
            color="#999"
            size="24"
          />
        </view>
      </view>
      <view
        class="mine-body-item"
        @click="goToMessage"
      >
        <view>
          <uni-icons
            class="mr20"
            type="chatbubble-filled"
            color="#999"
            size="24"
          /><text>消息中心</text>
        </view>
        <view class="mine-message-center">
          <view class="color-grey">
            {{ messageTime }}
          </view>
          <uni-badge
            v-if="messageCount > 0"
            :text="messageCount"
            type="error"
            size="normal"
          />
        </view>
      </view>
      <!-- 轨迹查看 -->
      <view
        style="position: absolute;left: 0;min-width: 100rpx;min-height: 50rpx;z-index: 9999;"
        @click="showTrackInfo = !showTrackInfo"
      >
        |
        <scroll-view
          v-if="showTrackInfo"
          scroll-y
          style="width: 100vw;max-height: 40vh;background-color: #fff;"
        >
          <view>
            <text>当前精度：{{ JSON.stringify(accuracy) }}</text>
          </view>
          <view>
            <text>待上报坐标组：{{ JSON.stringify(trackBuffer) }}</text>
          </view>
          <view>
            <text>当前已获取的所有坐标：------------------{{ JSON.stringify(trackHistory) }}</text>
          </view>
        </scroll-view>
      </view>
    </view>
    <button
      type="button"
      class="mine-btn"
      @click="logOut"
    >
      退出登录
    </button>
    <view
      style="position: absolute;top: 200rpx;right: 0;width: 200rpx;height: 100rpx;background: transparent;"
      @click="handleVconsole"
    />
  </view>
</template>
<script lang='ts'>
import { idpUserUnbindUnionId } from "@/api/idp/userController";
import { idpWeChatLogout } from "@/api/idp/weChatLogoutController";
import { idpWechatGetUserInfo } from "@/api/idp/wechatController";
import { mesWechatUserQueryAllotRecordOverview } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import { accuracy, stopLocationBackground, trackBuffer, trackHistory } from "@/utils/location-update-background";
import { subscribeMsg } from "@/utils/subscribe";
import { onShow } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";

dayjs.extend(relativeTime)

export default defineComponent({
  name: "MinePage",
  components: { NavBar, },
  setup(){
    const projectId = uni.getStorageSync("projectInfo").projectId
    const userRole = uni.getStorageSync("userRole")
    const userInfo: Ref<IDP.SysUserInfo> = ref<IDP.SysUserInfo>({tenantId:0,})
    const userBind: Ref<boolean> = ref<boolean>(true)
    const subscribeStatus: Ref<boolean> = ref<boolean>(false)
    const messageTime: Ref<string> = ref<string>("")
    const messageCount: Ref<number> = ref<number>(0)

    const getUserInfo = async () => {
      const {data,} = await idpWechatGetUserInfo({})
      userInfo.value = data
    }

    const handleBind = async () => {
      if(userBind.value){
        uni.showModal({
          title: "提示",
          content: "确定解绑当前账号吗？",
          showCancel: true,
          success: async ({ confirm, }) => {
            if(confirm) {
              try {
                const {success,} = await idpUserUnbindUnionId()
                if(success){
                  userBind.value = false
                  uni.showToast({title: "解绑成功",icon: "success",})
                }
              } catch (error) {
              } 
            }
          },
        })
      }
    }

    const back = () => {
      uni.navigateBack()
    }

    const logOut = async () => {
      try {
        await idpWeChatLogout()
      } catch (error) {} finally{
        uni.reLaunch({url: "/pages/login/index",})
        stopLocationBackground()
      }
    }

    const openSubscribeMsg = async () => {
      subscribeMsg((res) => {
        subscribeStatus.value = Boolean(res)
      })
    }

    const goToLocationUpdate = () => {
      uni.navigateTo({ url: "/pages/location-update-background/index", })
    }

    const goToMessage = () => {
      uni.navigateTo({ url: "/pages/message-center/index",})
    }

    uni.getSetting({
      withSubscriptions: true,
      success: (res) => {
        subscribeStatus.value = res.subscriptionsSetting.mainSwitch
      },
    })

    const getMessageInfo = async () => {
      try {
        const {data,} = await mesWechatUserQueryAllotRecordOverview({projectId,})
				
        messageTime.value = data.latest ? dayjs(data.latest).fromNow() : ""
        messageCount.value = data.count || 0
      } catch (error) {
      }
    }

    getUserInfo()
    onShow(getMessageInfo)

    const showTrackInfo = ref(false)
    const vconsoleVisble = ref(false)
    const handleVconsole = () => {
      uni.showModal({title: "提示", content: `确定${ vconsoleVisble.value ? "关闭" : "开启"}调试模式`, showCancel: true, success: ({confirm,}) => {
        if (confirm) {
          vconsoleVisble.value = !vconsoleVisble.value
          uni.setEnableDebug({ enableDebug: vconsoleVisble.value, })
        }
      },})
    }

    return {
      userRole,
      userInfo,
      userBind,
      subscribeStatus,
      messageTime,
      messageCount,
      handleBind,
      back,
      logOut,
      openSubscribeMsg,
      goToLocationUpdate,
      goToMessage,
      showTrackInfo,
      trackBuffer,
      trackHistory,
      accuracy,
      vconsoleVisble,
      handleVconsole,
    }
  },
})
</script>
<style lang='scss'>
.mine {
	position: relative;
	height: 100vh;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100vw;
		height: 700rpx;
		background: linear-gradient(181deg, #B3DBFE 0%, #D5EBFA 32%, #E5EEFF 58%, rgba(229,238,255,0) 100%);
	}

	&-head {
		padding: 30rpx 32rpx 0;
		box-sizing: border-box;
		margin-bottom: 50rpx;

		&-user {
			display: flex;
			margin-right: 25rpx;

			&-avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 100%;
				background-color: #eee;
				margin-right: 40rpx;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;

				&--img {
					width: 100%;
					height: 100%;
				}
			}
			
			&-info {
				color: #000;
				font-size: 24rpx;

				&-name {
					font-size: 36rpx;
				}
				
				&-role {
					width: fit-content;
					padding: 8rpx 15rpx;
					color: #999;
					background-color: #ffffff69;
					border-radius: 10rpx;
				}
			}
		}
	}

	&-body {
		padding: 0 32rpx;
		font-size: 28rpx;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 30rpx 30rpx 0 0;
		border: 1rpx solid #FFFFFF;

		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 150rpx;
			border-bottom: 2rpx solid #eee;
			font-size: 32rpx;
		}

		.mine-message-center {
			font-size: 24rpx;
			text-align: center;
		}
	}

	&-btn {
		position: absolute;
		bottom: 100rpx;
		left: 32rpx;
		right: 32rpx;
		height: 92rpx;
		line-height: 92rpx;
		background-color: #E64940;
		color: #fff;
		font-size: 32rpx;
		border-radius: 46rpx;
	}
}
</style>
