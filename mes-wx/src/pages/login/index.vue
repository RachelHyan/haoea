<template>
  <view class="login">
    <image
      src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/login-bg.png"
      class="login-bg"
    />
    <view class="login-title">
      <view class="login-title--top">
        行运创城
      </view>
      <view class="login-title--bottom">
        行云流水般管理城市
      </view>
    </view>
    <view class="login-container">
      <view class="login-container-account">
        <view class="login-container-account__input">
          <input
            class="login-container-account__input-item"
            placeholder="请输入账号"
            :value="formModel.userName"
            type="text"
            @input="inputAccount"
          >
        </view>
        <view class="login-container-account__input">
          <input
            class="login-container-account__input-item"
            placeholder="请输入密码"
            password
            type="text"
            :value="formModel.password"
            @input="inputPassword"
          >
        </view>
        <view
          class="login-container-account__isRemember"
          @click="formModel.isRemember = !formModel.isRemember"
        >
          <checkbox
            :checked="formModel.isRemember"
            style="transform:scale(0.7)"
          />记住密码
        </view>
      </view>
      <button
        class="login-container_btn"
        style="background: #2692FF"
        @click="accountLogin"
      >
        手机号密码登录
      </button>
      <button
        v-if="!checked"
        class="login-container_btn"
        style="background: #28C445;"
        @click="login"
      >
        手机号快捷登录
      </button>
      <button
        v-else
        class="login-container_btn"
        style="background: #28C445;"
        open-type="getPhoneNumber"
        @getphonenumber="login"
        @click="login"
      >
        手机号快捷登录
      </button>
    </view>
    <view class="login-container_tips">
      <radio
        :checked="checked"
        color="#406CEA"
        style="transform:scale(0.6)"
        @click="checked = !checked"
      />
      <label
        class="radio"
        @click="checked = !checked"
      >
        我已阅读并同意 
        <text
          style="color:#406CEA;"
          @click.prevent="goToUserProtocol"
        > 用户协议 </text>
        和
        <text
          style="color:#406CEA;"
          @click.prevent="goToPrivacyProtocal"
        > 隐私保护指引 </text>
      </label>
    </view>
    <uni-popup
      ref="dialogRef"
      type="dialog"
    >
      <uni-popup-dialog
        type="info"
        mode="base"
        title="提示"
        :is-mask-click="false"
        confirm-text="同意"
        before-close
        @close="dialogClose"
        @confirm="dialogConfirm"
      >
        <view style="font-size: 28rpx;">
          请先同意
          <text
            class="color-blue"
            @click="goToUserProtocol"
          >
            用户协议
          </text>和
          <text
            class="color-blue"
            @click="goToPrivacyProtocal"
          >
            隐私保护指引
          </text>
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script lang="ts">
import { idpLogin } from "@/api/idp/loginController";
import { idpWechatGetUserInfo } from "@/api/idp/wechatController";
import { mesWechatUserSelectUserProjects, mesWechatUserSelectUserRoles } from "@/api/mes/wechatController";
import { subscribeMsg } from "@/utils/subscribe";
import type { Ref } from "vue";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const checked: Ref<boolean> = ref<boolean>(false);
    const userRoleList: Ref<string[]> = ref<string[]>([])
    const projectList: Ref<MES.WechatProjectDTO[]> = ref<MES.WechatProjectDTO[]>([])
    const userRole: Ref<string> = ref<string>("")
    const dialogRef = ref()
    const formModel = reactive({userName: "", password: "",isRemember: false,})

    onMounted(()=> {
      uni.removeStorageSync("projectInfo");
      uni.removeStorageSync("projectId");
      uni.removeStorageSync("userRole");
      uni.removeStorageSync("token");
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo) {
        formModel.userName = userInfo.userName;
        formModel.password = userInfo.password;
        formModel.isRemember = userInfo.isRemember;
      }
    })

    const getUserRoles = async () => {
      try {
        const { data, } = await mesWechatUserSelectUserRoles({})
        userRoleList.value = data.filter(item => (item === "CAPTAIN" || item === "PROJECT_MANAGER" || item === "RECTIFIER" || item === "INSPECTOR"|| item === "ONE_PERSONNEL"))
        userRoleList.value = userRoleList.value.length !== 0 ? Array.from(new Set(userRoleList.value)) : []
        uni.setStorageSync("userRoleList", data)
        if (userRoleList.value.length === 1) {
          uni.setStorageSync("userRole", userRoleList.value.at(0))
          userRole.value = userRoleList.value[0]	
          getProjectList()
        }
      } catch (error) {
      }
    }

    const getProjectList = async () => {
      try {
        const { data, } = await mesWechatUserSelectUserProjects({ role: userRole.value, })
        projectList.value = data
      } catch (error) {
      }
    }
    const inputAccount = (event:any) => {
      formModel.userName = event.detail.value;
    }

    const inputPassword = (event:any) => {
      formModel.password = event.detail.value;
    }

    /** 密码登录 */
    const accountLogin = async () => {
      if (!checked.value) {
        dialogRef.value.open()
        return
      } 

      subscribeMsg(async (res) => {
        if(!res) return;
        if (formModel.userName === "") {
          uni.showToast({
            title: "请输入账号",
            icon: "none",
          })
          return
        } else if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(formModel.userName)) {
          uni.showToast({
            title: "请输入正确的手机号",
            icon: "none",
          })
          return
        } 
      
        if (formModel.password === "") {
          uni.showToast({
            title: "请输入密码",
            icon: "none",
          })
          return
        } else if (!/^[0-9A-Za-z\W_]{5,15}$/.test(formModel.password)) {
          uni.showToast({
            title: "密码格式不正确",
            icon: "none",
          })
          return
        }
      
        if (!checked.value) {
          dialogRef.value.open()
          return
        } 
			
        formModel.isRemember ? uni.setStorageSync("userInfo", formModel) : uni.removeStorageSync("userInfo");
        uni.showLoading({title: "登录中", mask: true,})
        try {
          const { data, success, msg, } = await idpLogin({
            clientId: "jaya",
            grantType: "password",
            username: formModel.userName,
            password: formModel.password,
          })
          uni.hideLoading()
          if (success) {
            uni.setStorageSync("token", data.accessToken);
            loginSucceeded()
          } else {
            msg && uni.showToast({ title: msg, icon: "none", })
          }
        } catch (error) { }
      })
    }

    /** wx 授权登录 */
    const login = (e: any) => {
      if (!checked.value) {
        dialogRef.value.open()
        return
      }
      subscribeMsg((res) => {
        if(!res) return;
        if (e.detail.errMsg === "getPhoneNumber:ok") {
          try {
            uni.login({
              provider: "weixin",
              success: async (res) => {
                uni.showLoading({title: "登录中", mask: true,})
                const {data,success,msg,} = await idpLogin({
                  code: res.code,
                  phoneCode: e.detail.code,
                  grantType: "wechat",
                  clientId: "jaya",
                  tag: "洁亚-行运创城",
                })
                uni.hideLoading()
                if (success) {
                  uni.setStorageSync("token", data.accessToken);
                  loginSucceeded()
                } else {
                  msg && uni.showToast({ title: msg, icon: "none", })
                }
              },
            })
          } catch (error) {
          } finally {}
        } else if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
          uni.showModal({
            title: "提示",
            content: "你已拒绝授权，请重新点击并授权",
            showCancel: false,
            confirmText: "知道了",
          })
        }
      })
    }

    const loginSucceeded = async () => {
      await getUserRoles()
      if (userRoleList.value.length && projectList.value.length) { uni.showToast({ title: "登录成功", icon: "success", }) }
      setTimeout(() => {
        if (userRoleList.value.length === 1 && projectList.value.length === 1) {
          uni.setStorageSync("projectInfo", projectList.value.at(0))
          if(userRole.value === "ONE_PERSONNEL"){
            uni.redirectTo({ url: "/pages/punch-clock-personnal/index", })
          } else if(userRole.value === "RECTIFIER") {
            uni.redirectTo({ url: "/pages/rectify-list/index", })
          } else {
            uni.redirectTo({ url: "/pages/index/index", })
          }
        } else if (userRoleList.value.length > 1 || projectList.value.length > 1) {
          uni.redirectTo({ url: "/pages/project-select/index", })
        } else if (userRoleList.value.length === 0) {
          uni.showToast({ title: "权限不足,请联系管理员", icon: "none", })
        } else if (projectList.value.length === 0) {
          uni.showToast({ title: "请联系管理员添加项目", icon: "none", })
        }
      }, 500)
      const {data,} = await idpWechatGetUserInfo({})
      uni.setStorageSync("userPhone", data.mobile)
    }

    const dialogClose = () => {
      dialogRef.value.close()
    }

    const dialogConfirm = () => {
      checked.value = true;
      dialogRef.value.close()
      uni.showToast({ title: "请重新点击登录", icon: "none", })
    }

    const goToUserProtocol = () => {
      uni.navigateTo({ url: "/pages/login/components/user-protocol", })
    }

    const goToPrivacyProtocal = () => {
      uni.navigateTo({ url: "/pages/login/components/privacy-policy", })
    }

    return {
      checked,
      dialogRef,
      formModel,
      inputAccount,
      inputPassword,
      accountLogin,
      login,
      dialogClose,
      dialogConfirm,
      goToUserProtocol,
      goToPrivacyProtocal,
    }
  },
})
</script>

<style lang="scss">
.login {
	&-bg {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: -1;
	}

	&-title {
		width: 100%;
		color: #000;
		text-align: center;
		padding: 289rpx 0 100rpx;


		&--top {
			font-size: 48rpx;
			font-weight: 500;
		}

		&--bottom {
			font-size: 24rpx;
			font-weight: 300;
			margin-top: 20rpx;
		}
	}

	&-container {
		width: 100%;
		// position: absolute;
		// top: 1200rpx;
		display: flex;
		flex-direction: column;
		padding: 0 72rpx;
		z-index: 1;
		box-sizing: border-box;

    &-account {

      &__input {   
      border-bottom: 1rpx solid #D6D3D3;
      font-size: 28rpx;
      font-weight: 300;
      height: 104rpx;
      display: flex;
      align-items: center;

			&-item {
				width: 100%;
			}
		}

    &__isRemember {
      font-size: 24rpx;
      font-weight: 300;
      margin: 18rpx 0 50rpx;
			display: flex;
			align-items: center;
			width: fit-content;
    }

    }

		
		&_btn {
			width: 100%;
			height: 87rpx;
			margin-top: 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
			font-size: 30rpx;
			color: #fff;

			.btn--icon {
				margin-right: 30rpx;
			}
		}

		&_tips {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 100rpx;
			width: fit-content;
			margin: 0 auto;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #0000007d;
		}
	}
}
</style>
