<template>
  <div class="dashboard-login">
    <div class="dashboard-login-wrap">
      <div class="dashboard-login-left">
        <div class="login-left-info">
          <img
            src="@/assets/images/login-logo.png"
            alt="城市之光"
            class="login-left-logo"
          >
          <div class="left-info-title">
            <h3 class="info-title-name">
              城市之光
            </h3>
            <p class="info-title-sub">
              无人环卫调度平台
            </p>
          </div>
        </div>
      </div>
      <div class="dashboard-login-right">
        <div v-if="isShow">
          <h5 class="login-right-title">
            请登录
          </h5>
          <a-form
            ref="loginFormRef"
            :model="loginModel"
            :rules="loginRules"
            size="large"
            class="right-form-login"
          >
            <a-form-item
              field="username"
              hide-label
            >
              <a-input
                v-model="loginModel.username"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item
              field="password"
              hide-label
            >
              <a-input-password
                v-model="loginModel.password"
                placeholder="请输入密码"
                @keyup.enter="loginSubmit"
              />
            </a-form-item>
          </a-form>
          <a-button
            type="primary"
            size="large"
            class="form-login-submit"
            :loading="loginLoading"
            @click="loginSubmit"
          >
            登录
          </a-button>
        </div>
        <forget-password v-else />
        <div class="login-right-extra">
          <div
            class="right-extra-btn"
            @click="isShow = !isShow"
          >
            {{ isShow ? '忘记密码' : '返回登录' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { loginUsingPOST } from "@/api/dengluyanzheng"
import { token, userInfo } from "@/refs"
import type { ValidatedError } from "@arco-design/web-vue"
import type { Ref } from "vue"
import { defineComponent, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import ForgetPassword from "./components/forget-password.vue"

export default defineComponent({
  name: "DashboardLogin",
  components:{
    ForgetPassword,
  },
  setup () {
    const loginFormRef = ref()
    const loginModel = reactive<{username?:string, password?:string}>({})
    const loginLoading:Ref<boolean> = ref<boolean>(false)
    const isShow:Ref<boolean> = ref<boolean>(true)
    const route = useRoute()
    const router = useRouter()

	

    const loginRules = {
      username: [
        { required: true, message: "请输入用户名", }
      ],
      password: [
        { required: true, message: "请输入密码", }
      ],
    }

    token.value = undefined
    userInfo.value = null

    const loginSubmit = () => {
      loginFormRef.value.validate(async (errors: undefined | Record<string, ValidatedError>) => {
        if (!errors) {
          loginLoading.value = true
          try {
            const { data, } = await loginUsingPOST(loginModel)
            token.value = data
            userInfo.value = null
            setTimeout(() => {
              router.replace(String(route.query.from ? route.query.from : "/"))
            }, 200);
          } catch (error) {

          }finally {
            loginLoading.value = false
          }
        }
      })
    }



    return {
      loginFormRef,
      loginModel,
      loginRules,
      loginLoading,
      loginSubmit,
      isShow,
    }
  },
})

</script>
<style lang="less">
.dashboard-login {
	width: 100vw;
	height: 100vh;
	background-image: url("@/assets/images/login-bg.png");
	background-repeat: no-repeat;
	background-position: center center;
	background-attachment: fixed;
	background-size: cover;
	display: flex;
	justify-content: center;
	align-items: center;

	&-wrap {
		height: 496px;
		box-shadow:  0 0 16px 0 rgba(0,0,0,0.24);
		display: flex;
	}

	&-left {
		padding: 0 90px;
		padding-top: 100px;
		background-image: url("@/assets/images/login-figure.png");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 100% 100%;
		border-radius: 8px 0 0 8px ;
	}
}
.login-left-info {
	display: flex;
	align-items: center;
	gap: 16px;
}
.login-left-logo {
	width: 52px;
	height: 52px;
}
.left-info-title {
	display: flex;
	flex-direction: column;

	.info-title-name {
		color: #fff;
		font-size: 36px;
		letter-spacing: 7px;
	}

	.info-title-sub {
		color: #fff;
		font-size: 18px;
		letter-spacing: 3px;
	}
}
.dashboard-login-right {
	padding: 0 54px ;
	background-color: #fff;
	border-radius: 0 8px 8px 0 ;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.login-right-title {
		width: 312px;
		height: 18px;
		font-size: 18px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #212121;
		text-align: center;
	}
}
.right-form-login {
	margin-top: 22px;

	.arco-input-wrapper {
		border-left: none;
		border-top: none;
		border-right: none;
	}

	.arco-form-item {
		margin-bottom: 22px;
	}

	.arco-form-item-error {
		margin-bottom: 0px;
	}

	.arco-input-wrapper .arco-input.arco-input-size-large {
		padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    line-height: 22px;
	}
}
.form-login-submit.arco-btn {
	width: 312px;
	height: 44px;
	background: #1769fa;
	border-radius: 6px;
	margin-top: 30px;
	font-size: 18px;
	font-family: PingFang SC;
	font-weight: 600;
}

.login-right-extra {
	display: flex;
	justify-content: space-between;
	margin-top: 18px;

	.right-extra-btn,.left-extra-btn {
		height: 12px;
		font-size: 12px;
		font-family: PingFang SC;
		font-weight: normal;
		color: #333333;
		cursor: pointer;
	}
}
</style>
