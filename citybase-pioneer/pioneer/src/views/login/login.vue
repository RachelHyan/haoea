<template>
  <div class="login">
    <div class="title">
      <div>智城运营平台</div>
    </div>
    <div class="form">
      <div
        v-if="showModel === 'login'"
        class="form-title"
      >
        账号登录
      </div>
      <div v-if="showModel === 'login'">
        <el-form
          ref="loginFormRef"
          :model="loginModel"
          :rules="loginRules"
          :size="formSize"
          class="form-content"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginModel.username"
              placeholder="内部员工账号"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginModel.password"
              type="password"
              show-password
              placeholder="密码"
              @keyup.enter="loginSubmit"
            />
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;">
            <div
              class="form-forget"
            >
              <span @click="showModel = 'forget'">忘记密码</span>
            </div>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;">
            <el-button
              type="primary"
              :loading="loading"
              style="width: 100%;margin-top: 10px;"
              @click="loginSubmit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <forget-password
        v-else-if="showModel === 'forget'"
        :form-size="formSize"
        @back="showModel = 'login'"
      />
    </div>
  </div>
</template>
<script lang='ts'>
import { authResourceGetRouters } from '@/api/auth/resourceController'
import { authUserGetUserInfo } from '@/api/auth/userController'
import { idpLogin } from '@/api/idp/loginController'
import { useUserInfo } from '@/stores/userInfo'
import { ArrowLeft } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Ref, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import ForgetPassword from './components/forget-password.vue'

export default defineComponent({
  name: 'LogIn',
  components:{
    ForgetPassword,
  },
  setup() {
    const showModel = ref('login')
    const loginFormRef = ref<FormInstance>()
    const router = useRouter()
    const loading: Ref<boolean> = ref<boolean>(false)
    const loginModel = reactive<{ username: string, password: string, projectId?: number }>({ username: '', password: '', projectId: undefined,})
    const projectList = ref<any[]>([])
    const formSize = ref('large')
    const userInfo = useUserInfo()
    let tempToken:string;

    onMounted(() => {
      userInfo.$reset()
      setSize()
    })

    const setSize = () => {
      const height = document.documentElement.clientHeight
      const width = document.documentElement.clientWidth
      if(height <= 768 || width <= 1366){
        formSize.value = 'default'
      }else {
        formSize.value = 'large'
      }
    }

    window.onresize = () => setSize()

    const loginRules = {
      username: [
        { required: true, message: '账号不能为空', trigger: 'blur', },
        {
          validator: (rule: any, value: any, callback: any) => {
            if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
              callback('请输入正确的账号')
            } else {
              callback()
            }
          }, trigger: 'blur',
        }],
      password: [{ required: true, message: '密码不能为空', trigger: 'blur', }, {
        validator: (rule: any, value: any, callback: any) => {
          if (!/^[0-9A-Za-z\W_]{5,15}$/.test(value)) {
            callback('密码长度为 5-15 位')
          } else {
            callback()
          }
        }, trigger: 'blur',
      }],
    }

    const loginSubmit = () => {
      loginFormRef.value?.validateField(['username','password'],async (vaild) => {
        if (vaild) {
          loading.value = true
          try {
            const { data, } = await idpLogin({
              clientId: 'zcwy_operation',
              grantType: 'password',
              username: loginModel.username,
              password: loginModel.password,
            })
            tempToken = data.accessToken
            userInfo.$patch((state) => {
              state.token = tempToken
            })
            // getUserRoles()
            getUserInfo()
          } catch (error) {
            console.error(error);
          } finally {
            loading.value = false
          }
        }
      })
    }

    const getUserRoles = async () => {
      try {
        const { data, } = await authUserGetUserInfo({})
        userInfo.dataFill(data)
        getRouters()
      } catch (error) {
        console.error(error);
      }
    }

    const getUserInfo = async () => {
      try {
        const { data, } = await authUserGetUserInfo({})
        data.headUrl = data.headUrl ?? 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        userInfo.dataFill(data)
        getRouters()
      } catch (error) {
				
      }
    }

    const getRouters = async () => {
      loading.value = true
      try {
      	let {data,} = await authResourceGetRouters({})
        if(data.length === 0) {
          ElMessage.error('暂无权限，请联系管理员')
          return
        }
        ElMessage.success('登录成功！')
        userInfo.$patch((state) => {
          state.siderMenu = data
        })
        let defaultPath = data[0].path??'/'
        router.replace(defaultPath)
      }catch(error) {
        console.error(error);
      }finally {
        loading.value = false
      }
    }

    return {
      showModel,
      loginFormRef,
      loginModel,
      loginRules,
      loading,
      projectList,
      formSize,
      loginSubmit,
      ArrowLeft,
    }
  },
})
</script>
<style lang='less'>
.login {
	display: flex;
	height: 100vh;
	box-sizing: border-box;
	position: relative;
	background-image: url(https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/pioneer/resource/login-bg.png);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;

	.title {
		position: absolute;
		right: 12.5vw;
		top: 18vh;
		font-size: 55px;
		font-weight: 800;
		color: #00B6FE;
		line-height: 77px;

		@media screen and (max-width: 1366px) {
			font-size: 40px;
			}
	}

	.form {
		position: absolute;
		top: 28vh;
		right: 9.5vw;
		padding: 80px 62px 66px;
		background: rgba(0,21,76,0);
		box-shadow: inset 0px 0px 33px 7px rgba(15,51,154,0.55);
		border-radius: 8px;
		border: 1px solid;
		border-image: linear-gradient(180deg, rgba(80, 128, 255, 1), rgba(255, 255, 255, 1), rgba(146, 161, 255, 1)) 1 1;
		backdrop-filter: blur(10px);
		overflow: hidden;

		@media screen and (max-width: 1366px) {
				padding: 46px 44px;
			}

		.back-btn {
			position: absolute;
			top: 36px;
			left: 25px;
			font-size: 30px;
			z-index: 1;
			color: #fff;

			@media screen and (max-width: 1366px) {
				font-size: 20px;
				top: 20px;
				left: 15px;
			}
		}

		&-title {
			margin-bottom: 43px;
			font-size: 35px;
			font-weight: 600;
			color: #fff;
			text-shadow: 0px 2px 22px rgba(178,178,178,0.38);
			text-align: center;

			@media screen and (max-width: 1366px) {
				font-size: 20px;
				margin-bottom: 30px;
			}
		}

		&-content {
			margin: 0 auto;
			width: 326px;

			@media screen and (max-width: 1366px) {
				width: 227px;
			}

			.el-button {
				// margin-top: 20px;
				// height: 59px;
				margin-bottom: 5px;
			}


			&-authCode {
				width: 100%;
				position: relative;

				&--btn {
					position: absolute;
					top: 11px;
					right: 7px;
					width: 94px;
					// border-left: 1px solid #E1E1E1;

					@media screen and (max-width: 1366px) {
						width: 78px;
						font-size: 12px;
						top: 9px;
						right: 0px;
					}
				}

			}
		}


		&-forget {
			position: absolute;
			right: 0;
			cursor: pointer;
			font-size: 16px;
			color: #9EB8FF;
			text-shadow: 0px 2px 22px rgba(178,178,178,0.38);

			@media screen and (max-width: 1366px) {
				font-size: 12px;
			}
		}

		&::before {
			content: "";
			position: absolute;
			top: -2px;
			left: 50%;
			width: 5px;
			height: 5px;
			border-radius: 100% 100%;
			background-color: #ffffff40;
			box-shadow: 0 0 90px 30px #fff;
		}
	}

	.el-input,
	.el-select {
		width: 100%;
		// height: 59px;
		border-radius: 4px;
	}

	.el-form-item__label {
		color: #fff;
	}
}
</style>
