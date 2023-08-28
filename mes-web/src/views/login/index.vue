<template>
  <div class="login">
    <div class="login-left">
      <div class="login-left—bg">
        <el-image
          src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/login-bg.png"
          fit="fill"
        />
      </div>
      <div class="login-left-title">
        <p>
          <span class="login-left-title--sup">Hi</span>
          <span>，您好！</span>
        </p>
        <p class="login-left-title--sub">
          欢迎进入洁亚管理系统
        </p>
      </div>
    </div>
    <div class="login-right">
      <div class="login-right-box">
        <div class="login-right-box-title">
          <span class="login-right-box-title--bold">欢迎登录</span>
          <span class="login-right-box-title--light">洁亚</span>
        </div>
        <div class="form">
          <el-button
            v-if="showModel === 'project'"
            link
            :icon="ArrowLeft"
            class="back-btn"
            @click="showModel = 'login'"
          />
          <div
            v-if="showModel !== 'forget'"
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
                >
                  <template #suffix>
                    <el-icon
                      color="#2593FF"
                      class="el-input__icon"
                    >
                      <User />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginModel.password"
                  type="password"
                  show-password
                  placeholder="密码"
                  @keyup.enter="loginSubmit"
                >
                  <template #suffix>
                    <el-icon
                      color="#2593FF"
                      class="el-input__icon"
                    >
                      <Lock />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 0;">
                <div class="form-feature">
                  <el-button
                    class="form-feature-btn"
                    type="primary"
                    link
                    @click="registerDialog = true"
                  >
                    注册
                  </el-button>
                  <el-button
                    class="form-feature-btn"
                    link
                    @click="showModel = 'forget'"
                  >
                    忘记密码
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item style="margin-bottom: 0;">
                <el-button
                  type="primary"
                  round
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
      <div class="login-right-slogan">
        <div class="login-right-slogan--text">
          行云流水般管理城市
        </div>
        <!-- <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          class="icpNumber"
        >湘ICP备2023006888号-1</a>  -->
      </div>
    </div>
    <el-pro-dialog-form
      ref="registerRef"
      v-model="registerDialog"
      class="register-dialog"
      title="注册"
      :label-width="'130px'"
      :pro-dialog-props="{width: '650px'}"
      :form-model="registerModel"
      :form-rules="registerRules"
      :size="formSize"
      :submit="registerSubmit"
      :closed="registerClosed"
    >
      <template #form="{model}">
        <el-row>
          <el-col
            v-for="item in registerColumns"
            :key="item.dataIndex"
            :span="item.valueType === 'slot' ? 12 : 24"
          >
            <el-form-item
              :label="item.title"
              :prop="item.dataIndex"
              :size="item.valueType === 'slot' ? 'default' : formSize"
            >
              <el-input
                v-if="item.valueType === 'string'"
                v-model="model[item.dataIndex]"
                :placeholder="item.placeholder ?? '请输入'"
              />
              <el-input
                v-if="item.valueType === 'password'"
                v-model="model[item.dataIndex]"
                type="password"
                show-password
                :placeholder="item.placeholder ?? '请输入'"
              />
              <div v-if="item.valueType === 'slot'">
                <div class="modal-basic-upload-file upload-file">
                  <upload-photo
                    v-if="item.dataIndex === 'businessLicense' && registerDialog"
                    ref="uploadBLRef"
                    v-model:url="model[item.dataIndex]"
                    :file-type="'营业执照'"
                  />
                </div>
                <div class="modal-basic-upload-file upload-file">
                  <upload-photo
                    v-if="item.dataIndex === 'logo' && registerDialog"
                    ref="uploadLogoRef"
                    v-model:url="model[item.dataIndex]"
                    :file-type="'logo'"
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template #footer="{submit}">
        <div style="display: flex;justify-content: center;">
          <el-button
            style="width: 337px;"
            type="primary"
            :loading="registerLoading"
            size="large"
            @click="submit"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-pro-dialog-form>
  </div>
</template>
<script lang='ts'>
import { authUserGetUserInfo } from "@/api/auth/userController"
import { idpJayaRegister } from "@/api/idp/jayaRegisterController"
import { idpLogin } from "@/api/idp/loginController"
import { useUserInfo } from "@/stores/userInfo"
import { ArrowLeft } from "@element-plus/icons-vue"
import { ElMessage, FormInstance, FormRules, ProCrudWriteColumn } from "element-plus"
import { defineComponent, onMounted, reactive, ref, watch } from "vue"
import { useRouter } from "vue-router"
import ForgetPassword from "./components/forget-password.vue"
import UploadPhoto from "./components/upload-photo.vue"

type RegisterColumn = ProCrudWriteColumn | {title: string,dataIndex: string,valueType: "password",placeholder: string,}

export default defineComponent({
  name: "LogIn",
  components: {
    ForgetPassword,
    UploadPhoto,
  },
  setup() {
    const router = useRouter();
    const loginFormRef = ref<FormInstance>();
    const uploadBLRef = ref();
    const uploadLogoRef = ref();
    const showModel = ref("login");
    const loading = ref<boolean>(false);
    const loginModel = reactive<{ username: string, password: string, projectId?: number }>({ username: "", password: "", projectId: undefined, });
    const projectList = ref<any[]>([]);
    const formSize = ref("large");
    const userInfo = useUserInfo();
    const  registerRef = ref();
    const registerDialog = ref<boolean>(false);
    const registerLoading = ref<boolean>(false);
    const registerModel = reactive<any>({});
    const registerColumns: RegisterColumn[] = [
      {
        title: "企业名称",
        dataIndex: "name",
        valueType: "string",
      },
      {
        title: "社会信用代码",
        dataIndex: "enterpriseCode",
        valueType: "string",
      },
      {
        title: "营业执照",
        dataIndex: "businessLicense",
        valueType: "slot",
      },
      {
        title: "logo",
        dataIndex: "logo",
        valueType: "slot",
      },
      {
        title: "负责人",
        dataIndex: "contactPerson",
        valueType: "string",
      },
      {
        title: "联系方式",
        dataIndex: "phone",
        valueType: "string",
      },
      {
        title: "登录密码",
        dataIndex: "password",
        valueType: "password",
        placeholder: "6-16位 不支持特殊字符",
      },
      {
        title: "确认密码",
        dataIndex: "confirmPassword",
        valueType: "password",
        placeholder: "6-16位 不支持特殊字符",
      }
    ];
    const registerRules: FormRules = {
      name: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (!value) {
              callback("企业名称不能为空哦！");
            } else if (value.length > 30) {
              callback("企业名称的长度不可以超过30个字符哦！");
            } else {
              callback();
            }
          },
          trigger: "blur",
        }
      ],
      phone: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if(!value){
              callback("手机号码不能为空哦！");
            }else if (/^1[3-9][0-9]{9}$/.test(value)) {
              callback();
            } else {
              callback("你的电话格式不对哦");
            }
          },
          trigger: "blur",
        }
      ],
      enterpriseCode: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (value === undefined) {
              callback("社会信用代码不能为空哦!");
            } else if (
              !/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{18}$/.test(value)
            ) {
              callback("你的社会信用代码格式不对哦!");
            } else {
              callback();
            }
          },
          trigger: "blur",
        }
      ],
      contactPerson: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (!value) {
              callback("负责人不能为空哦！");
            } else if (value.length > 12) {
              callback("负责人的长度不可以超过12个字符哦！");
            } else {
              callback();
            }
          },
          trigger: "blur",
        }
      ],
      businessLicense: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (!value) {
              callback("请选择文件！");
            } else {
              callback();
            }
          },
          trigger: "change",
        }
      ],
      logo: [
        {
          required: true,
          validator: (rule: any, value: any, callback: any) => {
            if (!value) {
              callback("请选择文件！");
            } else {
              callback();
            }
          },
          trigger: "change",
        }
      ],
      password: [{ required: true, message: "密码不能为空", trigger: "blur", }, {
        validator: (rule: any, value: any, callback: any) => {
          if (!/^[0-9A-Za-z\W_]{6,16}$/.test(value)) {
            callback("密码长度为 6-16 位");
          } else {
            callback();
          }
        }, trigger: "blur",
      }],
      confirmPassword: [{ required: true, message: "密码不能为空", trigger: "blur", }, {
        validator: (rule: any, value: any, callback: any) => {
          if (!/^[0-9A-Za-z\W_]{6,16}$/.test(value)) {
            callback("密码长度为 6-16 位");
          } else if(value !== registerModel.password) {
            callback("两次输入的密码不一致！");
          } else {
            callback();
          }
        }, trigger: "blur",
      }],
    };

    onMounted(() => {
      userInfo.$reset();
      setSize();
    });

    const setSize = () => {
      const height = document.documentElement.clientHeight;
      const width = document.documentElement.clientWidth;
      if (height <= 768 || width <= 1366) {
        formSize.value = "default";
      } else {
        formSize.value = "large";
      }
    };

    window.onresize = () => setSize();

    const loginRules = {
      username: [
        { required: true, message: "账号不能为空", trigger: "blur", },
        {
          validator: (rule: any, value: any, callback: any) => {
            if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
              callback("请输入正确的账号");
            } else {
              callback();
            }
          }, trigger: "blur",
        }],
      password: [{ required: true, message: "密码不能为空", trigger: "blur", }, {
        validator: (rule: any, value: any, callback: any) => {
          if (!/^[0-9A-Za-z\W_]{5,16}$/.test(value)) {
            callback("密码长度为 6-16 位");
          } else {
            callback();
          }
        }, trigger: "blur",
      }],
    };

    const loginSubmit = () => {
      loginFormRef.value?.validateField(["username", "password"], async (vaild) => {
        if (vaild) {
          loading.value = true;
          try {
            const { data, } = await idpLogin({
              clientId: "jaya",
              grantType: "password",
              username: loginModel.username,
              password: loginModel.password,
            });
            userInfo.$patch((state) => {
              state.token = data.accessToken;
            });
            remoteUserInfo();
            // router.push("/project-selection?from=login")
          } catch (error) {
            console.error(error);
          } finally {
            loading.value = false;
          }
        }
      });
    };

    const remoteUserInfo = async () => {
      try {
        const { data, } = await authUserGetUserInfo({});
        userInfo.dataFill(data);
        router.replace({ path: "/project-selection", query: { from: "login", },})

      } catch (error) {
        console.error(error);
      }
    };

    const registerSubmit = async () => {
      registerLoading.value = true;
			
      try {
        const { success, } = await idpJayaRegister({...registerModel,});
        if(success) {
          ElMessage.success("注册成功");
          registerClosed();
        }
      } catch (error) {
        console.error(error);
      } finally { registerLoading.value = false }
    };

    const registerClosed = () => {
      registerDialog.value = false;
      Object.keys(registerModel).forEach((key) => {
        //@ts-ignore
        registerModel[key] = "";
      });
      uploadBLRef.value?.[0].getPhoto(null);
      uploadLogoRef.value?.[0].getPhoto(null);
    };

    // 解决已选文件并没有消除校验
    watch(()=> [registerModel.businessLicense,registerModel.logo], (val) => {
      val[0] && registerRef.value.formRef.validateField("businessLicense");
      val[1] && registerRef.value.formRef.validateField("logo");
    });

    return {
      showModel,
      loginFormRef,
      loginModel,
      loginRules,
      loading,
      projectList,
      formSize,
      registerRef,
      registerDialog,
      registerModel,
      registerRules,
      registerColumns,
      registerLoading,
      uploadBLRef,
      uploadLogoRef,
      loginSubmit,
      registerSubmit,
      registerClosed,
      ArrowLeft,
    }
  },
})
</script>
<style lang='less'>
@width-left: 56.77vw;
@width-right: calc(100vw - @width-left);

.login {
	height: 100vh;
	display: flex;

	&-left {
		width: @width-left;
		background: linear-gradient(180deg, #6FAFFE 0%, #4773FF 100%);
		border-radius: 0 0 100px 0;
		position: relative;

		&—bg {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 50px;
			margin: 0 auto;
			width: 35vw;
			min-width: 450px;
			box-sizing: border-box;

			@media screen and (max-height: 768px) {
				width: 500px;
			}
		}

		&-title {
			color: #fff;
			position: absolute;
			left: 119px;
			top: 112px;
			z-index: 1;
			font-size: 70px;

			&--sup {
				letter-spacing: 20px;
				font-size: 68px;
			}

			&--sub {
				font-size: 25px;
			}

			@media screen and (max-width: 1366px) {
				font-size: 50px;
				left: 80px;

				&--sup {
					letter-spacing: 10px;
					font-size: 48px;
				}

				&--sub {
					font-size: 20px;
				}
			}

			@media screen and (max-height: 768px) {
				font-size: 50px;
				left: 80px;

				&--sup {
					letter-spacing: 10px;
					font-size: 48px;
				}

				&--sub {
					font-size: 20px;
				}
			}
		}

		&::after {
			content: "";
			position: absolute;
			right: calc(-225px / 2);
			top: 0;
			width: 225px;
			height: 96px;
			z-index: -1;
			background: linear-gradient(180deg, #6FAFFE 0%, #6AA8FE 100%);
		}

		&::before {
			content: "";
			position: absolute;
			right: calc(-225px / 2);
			bottom: 0;
			z-index: -1;
			width: 225px;
			height: 96px;
			background-color: #F3F8FF;
		}
	}

	&-right {
		width: @width-right;
		height: 100vh;
		background-color: #F3F8FF;
		position: relative;
		border-radius: 100px 0 0 0;

		&-box {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 450px;
			height: 650px;
			z-index: 1;

			@media screen and (max-width: 1366px) {
				width: 350px;
				height: 450px;
			}
			@media screen and (max-height: 768px) {
				width: 350px;
				height: 450px;
			}

			&-title {
				margin-bottom: 30px;

				&--bold {
					font-size: 35px;
					font-weight: 500;
					letter-spacing: 5px;
				}

				&--light {
					font-size: 22px;
					letter-spacing: 3px;
				}

				@media screen and (max-width: 1366px) {
					margin-bottom: 30px;

					&--bold {
						font-size: 25px;
						margin-right: 10px;
					}

					&--light {
						font-size: 16px;
					}
				}
				@media screen and (max-height: 768px) {
					margin-bottom: 30px;

					&--bold {
						font-size: 25px;
						margin-right: 10px;
					}

					&--light {
						font-size: 16px;
					}
				}
			}


			.form {
				padding: 80px 62px 66px;
				background: #FFFFFF;
				box-shadow: 0px 0px 23px 0px rgba(199, 221, 250, 0.63);
				border-radius: 30px;

				@media screen and (max-width: 1366px) {
					padding: 46px 44px;
				}
				@media screen and (max-height: 768px) {
					padding: 46px 44px;
				}

				.back-btn {
					position: absolute;
					top: 110px;
					left: 25px;
					font-size: 30px;
					z-index: 1;

					@media screen and (max-width: 1366px) {
						font-size: 20px;
						top: 80px;
					}
					@media screen and (max-height: 768px) {
						font-size: 20px;
						top: 80px;
					}
				}

				&-title {
					margin-bottom: 43px;
					font-size: 22px;
					font-weight: 600;
					color: #2E2E2E;
					text-shadow: 0px 2px 22px rgba(178, 178, 178, 0.38);
					position: relative;

					@media screen and (max-width: 1366px) {
						font-size: 20px;
						margin-bottom: 30px;
					}
					@media screen and (max-height: 768px) {
						font-size: 20px;
						margin-bottom: 30px;
					}

					&::after {
						position: absolute;
						left: 0;
						bottom: -3px;
						content: "";
						width: 50px;
						height: 3px;
						background-color: #2593FF;
					}
				}

				&-content {
					margin: 0 auto;

					.el-button {
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

							@media screen and (max-width: 1366px) {
								width: 78px;
								font-size: 12px;
								top: 9px;
								right: 0px;
							}
							@media screen and (max-height: 768px) {
								width: 78px;
								font-size: 12px;
								top: 9px;
								right: 0px;
							}
						}

					}

					&-project-list {
						max-height: 242px;
						overflow-y: scroll;

						&::-webkit-scrollbar {
							width: 5px;
						}

						&::-webkit-scrollbar-thumb {
							background-color: transparent;
							border-radius: 5px;
						}

						&:hover::-webkit-scrollbar-thumb {
							background-color: #ccc;
						}

						@media screen and (max-width: 1366px) {
							max-height: 165px;
						}

						@media screen and (max-height: 768px) {
							max-height: 165px;
						}

						&--item {
							height: 57px;
							background: #FFFFFF;
							border-radius: 4px;
							border: 1px solid #E1E1E1;
							display: flex;
							align-items: center;
							box-sizing: border-box;
							padding: 16px 0 18px 15px;
							font-size: 18px;
							color: #000;
							margin-top: 18px;
							cursor: pointer;

							&:first-child {
								margin-top: 0;
							}

							&-icon {
								width: 31px;
								height: 29px;
								margin-right: 20px;
								background-image: url(https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/login-project.png);
								background-size: cover;
							}

							@media screen and (max-width: 1366px) {
								height: 35px;
								font-size: 14px;
								margin-top: 14px;

								&-icon {
									width: 21px;
									height: 21px;
									margin-right: 13px;
								}
							}
							@media screen and (max-height: 768px) {
								height: 35px;
								font-size: 14px;
								margin-top: 14px;

								&-icon {
									width: 21px;
									height: 21px;
									margin-right: 13px;
								}
							}
						}

						.form-content-project-list--item:hover,
						.project-active {
							color: #2396FE;
							background: #F7FAFE;
							border: 1px solid #2593FF;

							.form-content-project-list--item-icon {
								background-image: url(https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/login-project-active.png);
								background-size: cover;
							}
						}
					}
				}


				&-feature {
					display: flex;
					justify-content: space-between;
					width: 100%;

					&-btn {
						font-size: 16px;

						@media screen and (max-width: 1366px) {
							font-size: 14px;
						}

						@media screen and (max-height: 768px) {
							font-size: 14px;
						}
					}
				}
			}
		}



		&-slogan {
			position: absolute;
			bottom: 5vh;
			right: 0;
			left: 0;
			font-size: 18px;
			height: 1px;
			width: 400px;
			margin: 24px auto;
			border-top: 1px solid #dcdfe6;
			font-size: 18px;

			&--text {
				position: absolute;
				white-space: nowrap;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				background-color: #F3F8FF;
				padding: 0 20px;
				color: #7F7E7E;
				letter-spacing: 10px;
			}

			@media screen and (max-width: 1366px) {
				width: 350px;
				font-size: 14px;
			}
			@media screen and (max-height: 768px) {
				width: 350px;
				font-size: 14px;
			}

			.icpNumber {
				position: absolute;
				right: 140px;
				bottom: -40px;
				font-size: 12px;
				color: #7F7E7E;
				text-decoration: none;
			}
		}
	}

	.register-dialog {
		.el-dialog__body {
			padding: 26px 85px 0;
			
			.el-form-item__label {
				font-size: 16px;
			}
		}
	}

	.el-input,
	.el-select {
		width: 100%;
		border-radius: 4px;
	}
}
</style>
