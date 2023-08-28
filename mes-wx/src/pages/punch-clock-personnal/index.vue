<template>
  <view class="punch-clock-personnal">
    <view class="punch-clock-personnal-bg" />
    <nav-bar
      title="打卡列表"
      custom-left
      :border="false"
      color="#fff"
      background-color="transparent"
    />
    <view class="punch-clock-personnal-card">
      <view class="punch-clock-personnal-card-tag">
        <image
          class="img"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.9/punch-clock-tag-icon.png"
        />
      </view>
      <view class="punch-clock-personnal-card-row">
        <view>
          <text class="color-grey mr20">
            作业人员
          </text><text>{{ punchData.userName ?? '-' }}</text>
        </view>
        <view><text>{{ punchData.userType ?? '-' }}</text></view>
      </view>
      <view class="punch-clock-personnal-card-row">
        <text>{{ punchData.orgNames ?? '-' }}</text>
        <view class="punch-clock-personnal-face-info">
          <text>{{ punchData.isFace ? '人脸已采集' : '人脸未采集' }}</text>
        </view>
      </view>
      <view class="punch-clock-personnal-card-clocking">
        <view class="punch-clock-personnal-card-clocking-time">
          <text>{{ markTime }}</text>
        </view>
        <!-- <view
          class="punch-clock-personnal-card-clocking-btn"
          :style="{ opacity: punchData.isFace ? 1 : 0.3}"
          @click="() => punchData.isFace && handlePunchClock()"
        > -->
        <view
          class="punch-clock-personnal-card-clocking-btn"
          @click="handlePunchClock()"
        >
          <text>打卡</text>
        </view>
      </view>
    </view>
    <scroll-view
      scroll-y
      style="max-height: 780rpx;"
      class="punch-clock-personnal-record"
    >
      <view
        v-for="(item, index) in punchData.list"
        :key="index"
        class="punch-clock-personnal-record-item"
        @click="handleDetail(punchData, item)"
      >
        <view class="punch-clock-personnal-record-title">
          <text v-show="index === 0">
            打卡时间:
          </text>
        </view>
        <view class="punch-clock-personnal-record-time">
          <text>{{ item.clockingTime }}</text>
        </view>
        <view class="punch-clock-personnal-record-btn">
          <text>查看</text>
          <uni-icons
            type="right"
            color="#329CFF"
            size="12"
          />
        </view>
      </view>
    </scroll-view>
    <view
      v-if="projectRoleList.includes('RECTIFIER')"
      class="rectify-fab"
      @click="goToRectify"
    >
      <image
        style="width: 52rpx;height: 52rpx;"
        src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.9/rectify-fab-icon.png"
      />
      <text>整改</text>
    </view>
    <view
      v-if="userRole === 'ONE_PERSONNEL'"
      class="user-fab"
      @click="goToMine"
    >
      <image
        style="width: 52rpx;height: 52rpx;"
        src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/user.png"
      />
      <text>我的</text>
    </view>
    <view
      v-if="userRole === 'ONE_PERSONNEL'"
      class="sos-message-fab"
      @click="SOSMessage"
    >
      <text class="sos-message-fab-text">
        SOS
      </text>
    </view>
  </view>
</template>
<script lang='ts'>
import { mesClockingQueryClockingRecordBySysUserId } from "@/api/mes/clockingController";
import { mesWechatCaptainSendSOS, mesWechatUserSelectUserRoles } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import { getFullAddress, logger } from "@/utils/fn";
import { onHide, onShow } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PunchClockPersonnal",
  components: { NavBar, },
  options: { styleIsolation: "shared", },
  setup() {
    const projectRoleList: Ref<string[]> = ref<string[]>([])
    const userRole = uni.getStorageSync("userRole")
    const projectId = uni.getStorageSync("projectInfo").projectId
    const punchData: Ref<MES.ClockingInfo> = ref<MES.ClockingInfo>({} as any)
    const markTime: Ref<string> = ref<string>(dayjs().format("HH:mm:ss"))
    const timer: Ref<number> = ref<number>(0)

    const setMarkTime = () => {
      timer.value = setInterval(() => {
        markTime.value = dayjs().format("HH:mm:ss");
      }, 1000)
    }

    const clearMarkTime = () => {
      timer.value && clearInterval(timer.value)
    }

    onShow(()=> {
      setMarkTime()
      getPunchData()
    })
    onHide(clearMarkTime)

    const getPunchData = async () => {
      try {
        const { data, } = await mesClockingQueryClockingRecordBySysUserId({
          projectId,
          isCaptain: false,
        })
        punchData.value = data ? data[0] : {} as any
        !data && uni.showToast({ title: "未获取到人员信息", icon: "error", })
        /** 取消人脸打卡 */
        // !punchData.value.isFace && uni.showToast({ title: "当前用户不支持打卡！", icon: "none", duration: 5000, })
      } catch (error) {
        logger.error("getPunchData=>", error)
      }
    }

    const getProjectRoleList = async () => {
      try {
        const { data, } = await mesWechatUserSelectUserRoles({ projectId, })
        projectRoleList.value = data ?? []
      } catch (error) {
      }
    }

    const handlePunchClock = () => {
      uni.navigateTo({
        url: "/pages/camera/index?watermark=true",
        events: {
          save: async (res: any) => {
            /* 人脸打卡模式
            uni.showLoading({ title: "上传中,请勿操作", mask: true, })
            let url = ""
            const { data, code, } = await upload(res.tempFilePath)
            if (code === 200) url = data
            try {
              const { data, msg, } = await mesPersonVerifyFace({
                projectId,
                selfieUrl: url,
              })
              uni.hideLoading()
              if (data) {
                uni.showToast({ title: "人脸识别成功", icon: "success", })
                await new Promise((resolve) => setTimeout(resolve, 300))
                const params = {
                  userList: [{
                    ...punchData.value,
                    faceList: [{ url: res.tempFilePath, fullAddress: res.fullAddress, faceUrl: url, }],
                  }],
                }
                uni.redirectTo({ url: `/pages/index/punch-clock-form/index?data=${encodeURIComponent(JSON.stringify({ ...params, pageMethod: "add", }))}`, })
              } else {
                uni.showModal({ title: "人脸识别失败", content: data === null ? msg : "人脸识别失败", showCancel: false, confirmText: "返回", success: ({ confirm, }) => confirm && uni.navigateBack(), })
              }
            } catch (error) {
              logger.error("handlePunchClock=>",error)
            }
 						*/
            //#region 关闭人脸打卡模式
            const params = { userList: [{
              ...punchData.value,
              list: [{
                type: "1",
                url: res.tempFilePath,
                longitude: res.location.split(",")[0],
                latitude: res.location.split(",")[1],
                photographTime: res.timestamp,
                fullAddress: res.fullAddress,
              }],
            }],}
            uni.redirectTo({ url: `/pages/punch-clock-form/index?data=${encodeURIComponent(JSON.stringify({ ...params, pageMethod: "add", }))}`, })
            //#endregion
          },
        },
      })
    }

    const handleDetail = (row: MES.ClockingInfo, timer: MES.ClockingRecordVo) => {
      const params = {
        userList: [row],
        ...timer,
      }
      uni.navigateTo({ url: `/pages/punch-clock-form/index?data=${encodeURIComponent(JSON.stringify({ ...params, pageMethod: "detail", }))}`,})
    }

    const goToMine = () => uni.navigateTo({ url: "/pages/mine/index", })

    const goToRectify = () => {
      uni.reLaunch({ url: "/pages/index/rectify-list/index", })
      uni.setStorageSync("userRole", "RECTIFIER")
    }

    const SOSMessage = () => {
      uni.showModal({
        title: "提示",
        content: "确认一键发送求救报警",
        showCancel: true,
        success: ({ confirm, }) => {
          if (confirm) {
            uni.getLocation({
              type: "gcj02",
              success: async ({longitude,latitude,}) => {
                const { data, } = await getFullAddress({longitude,latitude,})
                const { district, } = data.regeocodeData.addressComponent
                const index = data.regeocodeData.formatted_address.lastIndexOf(district)
                const address = data.regeocodeData.formatted_address.slice(index)
                try {
                  await mesWechatCaptainSendSOS({projectId, address,})
                } catch (error) {
                  console.log("SOSMessage",error);
                  logger.error("SOSMessage->request",error,address)
                }
              },
              fail: (err) => logger.error("SOSMessage->getLocation", err),
            })
          }
        },
      })
    }

    const locationBackgroundAuthorized = () => {
      uni.showModal({
        title: "提示",
        content: "您未开启“位置信息->使用小程序时和离开后允许”选项，将无法使用轨迹上报功能，请前往设置开启！",
        showCancel: false,
        confirmText: "去设置",
        success: ({ confirm, }) => {
          if(confirm){
            uni.openSetting({
              success: ({authSetting,}) => {
                if(!authSetting["scope.userLocationBackground"]){
                  locationBackgroundAuthorized()
                }
              },
            })
          }
        },
      })
    }

    getProjectRoleList()
    uni.authorize({
      scope: "scope.userLocationBackground",
      complete: (res) => {
        if(res.errMsg === "authorize:fail:auth deny") {
          locationBackgroundAuthorized()
        }
      },
    })


    return {
      userRole,
      projectRoleList,
      punchData,
      markTime,
      handlePunchClock,
      handleDetail,
      goToMine,
      goToRectify,
      SOSMessage,
    }
  },
})
</script>
<style lang='scss'>
.punch-clock-personnal {
	position: relative;
	padding: 0 32rpx 40rpx;
	background-color: #F3F5F7;
	height: 100vh;
	box-sizing: border-box;

	&-bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 378rpx;
		background: linear-gradient(180deg, #2691FF 0%, rgba(28, 165, 253, 0) 100%);
	}

	&-card,
	&-record {
		width: 100%;
		background-color: #fff;
		border-radius: 10rpx;
		backdrop-filter: blur(50px);
		position: relative;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		font-size: 28rpx;
	}

	&-card {
		padding: 40rpx 0;

		&-tag {
			position: absolute;
			right: -47rpx;
			top: -47rpx;
			z-index: 1;
			width: 112rpx;
			height: 117rpx;
		}

		&-row {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			margin: 0 30rpx 32rpx;
		}

		&-clocking {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 350rpx;
			border-top: 2rpx solid #96969636;

			&-time {
				font-size: 50rpx;
				margin-bottom: 64rpx;
			}

			&-btn {
				width: 178rpx;
				height: 178rpx;
				line-height: 178rpx;
				text-align: center;
				background: linear-gradient(152deg, #29BAFD 0%, #278CF5 100%);
				border-radius: 50%;
				border: 2rpx solid #FFFFFF;
				color: #fff;
				font-size: 36rpx;
				position: relative;

				&::before {
					content: "";
					display: inline-block;
					position: absolute;
					top: -18rpx;
					left: -18rpx;
					z-index: -1;
					width: 188rpx;
					height: 188rpx;
					background-color: #0084ff33;
					border: 12rpx solid #0084ff1a;
					border-radius: 50%;
				}
			}
		}
	}

	&-record {
		padding: 0;

		&-item {
			height: 130rpx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #97979733;
			padding: 0 30rpx;

			&:last-child {
				border-bottom: none;
			}
		}

		&-title {
			width: 140rpx;
		}

		&-time {
			flex: 1;
		}
	}

	.user-fab,
	.rectify-fab,
	.sos-message-fab {
		position: absolute;
		bottom: 100rpx;
		right: 32rpx;
		width: 100rpx;
		height: 110rpx;
		background: #ffffffee;
		box-shadow: -1px 11px 76px 0px rgba(3, 35, 69, 0.21);
		border-radius: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #333;
		font-size: 28rpx;
	}

	.rectify-fab {
		bottom: 250rpx;
	}

	.sos-message-fab {
		right: 0;
		left: 32rpx;
		width: 100rpx;
		height: 80rpx;

		&-text {
			font-size: 34rpx;
			color: red;
			font-weight: bold;
		}
	}
}
</style>
