<template>
  <div class="forget-password">
    <h5 class="login-right-title">
      {{ isForget ? '忘记密码' : '重置密码' }}
    </h5>
    <a-form
      ref="forgetPasswordFormRef"
      :rules="forgetPasswordFormRules"
      :model="forgetPasswordForm"
      size="large"
      class="right-form-login"
    >
      <a-form-item
        v-if="isForget"
        field="mobile"
        hide-label
      >
        <a-input
          v-model="forgetPasswordForm.mobile"
          placeholder="请输入手机号"
          @keyup.enter="getAuthCode"
        />
      </a-form-item>
      <a-form-item
        v-else
        field="password"
        hide-label
      >
        <a-input-password
          v-model="forgetPasswordForm.password"
          placeholder="请设置密码"
        />
      </a-form-item>
      <a-form-item
        v-if="isForget"
        field="authCode"
        hide-label
      >
        <a-input
          v-model="forgetPasswordForm.authCode"
          placeholder="请输入验证码"
          maxlength="4"
          @keyup.enter="nextSubmit"
        >
          <template #suffix>
            <button
              class="auth-text"
              :style="{color:(timer === 0 ? '#1769FA' : 'grey')}"
              :disabled="timer !== 0"
              type="button"
              @click="getAuthCode"
            >
              {{ timer === 0 ? '验证码' : `${timer}` }}
            </button>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        v-else
        field="confirmPassword"
        hide-label
      >
        <a-input-password
          v-model="forgetPasswordForm.confirmPassword"
          placeholder="请确认密码"
          @keyup.enter="enterSubmit"
        />
      </a-form-item>
    </a-form>
    <a-button
      type="primary"
      size="large"
      class="form-login-submit"
      :loading="isForget ? nextLoading : resetPasswordLoading"
      @click="isForget ? nextSubmit() : enterSubmit()"
    >
      {{ isForget ? "下一步" : "确认" }}
    </a-button>
  </div>
</template>

<script lang="ts">
import { resetPassWordUsingPUT, sendCodeUsingGET, verifyCodeUsingGET } from "@/api/dengluyanzheng";
import type { ValidatedError } from "@arco-design/web-vue";
import { Message } from "@arco-design/web-vue";
import type { Ref } from "vue";
import { defineComponent, onUnmounted, reactive, ref } from "vue";

export default defineComponent({
  name: "ForgetPassword",
  setup() {
    const forgetPasswordFormRef = ref()
    const forgetPasswordForm = reactive<{mobile: string,password?:string,authCode: string,confirmPassword?:string}>({mobile: "",authCode: "",});
    const resetPasswordLoading:Ref<boolean> = ref<boolean>(false);
    const nextLoading:Ref<boolean> = ref<boolean>(false);
    const isForget:Ref<boolean> = ref<boolean>(true)
    const timer:Ref<number> = ref<number>(0);
    const timerId:Ref<NodeJS.Timeout | undefined | number> = ref<NodeJS.Timeout | undefined | number>();
		
    const forgetPasswordFormRules = {
      mobile: [
        { required: true, message: "请输入手机号",},{match:new RegExp(/^1[3456789]\d{9}$/),message:"请输入正确的手机号",}
      ],
      password:[
        {required:true,message:"请输入密码",},{match:new RegExp(/^[a-zA-Z0-9]{5,15}$/),message:"请输入5-15位密码，可用字母、数字",}
      ],
      authCode: [
        { required: true, message: "请输入验证码",}
      ],
      confirmPassword:[
        { validator: (value?:string,callback?:any) => {
          if (value === "") {
            callback("请输入密码")
          } else if(value !== forgetPasswordForm.password) {
            callback("密码不一致")
          } else {
            callback()
          }
        }, }
      ],
    }

    const clearTimerId = () => {
      if(timerId.value) {
        clearInterval(timerId.value);
      }
    }
		
    const getAuthCode = async () => {
      forgetPasswordFormRef.value.validateField("mobile", async (errors: undefined | Record<string, ValidatedError>) => {
        if(!errors){
				 try {
            await sendCodeUsingGET({
              mobile: forgetPasswordForm.mobile,
            });
            timer.value = 60;
            timerId.value = setInterval(() => {
              timer.value--;
              if (timer.value === 0) {
                clearTimerId()
              }
            } , 1000);
          }
          catch (error) {
          }
			 }
      })
    }

    const nextSubmit = async () => {
      forgetPasswordFormRef.value.validate(async (errors: undefined | Record<string, ValidatedError>) => {
        if (!errors) {
          nextLoading.value = true;
          try {
            const {data,} = await verifyCodeUsingGET({
              mobile: forgetPasswordForm.mobile,
              code: forgetPasswordForm.authCode,
            });
            if(data){
              isForget.value = false;
              clearTimerId()
            }else{
              Message.error("验证码错误");
              forgetPasswordForm.authCode = ""
            }
          } catch (error) { 
          } finally {
            nextLoading.value = false;
          }
        }
      })
    };

    const enterSubmit = () => {
      forgetPasswordFormRef.value.validate(async (errors: undefined | Record<string, ValidatedError>) => {
        if (!errors) {
          resetPasswordLoading.value = true;
          try{
            await resetPassWordUsingPUT({
              mobile: forgetPasswordForm.mobile,
              passWord: forgetPasswordForm.password,
            })
            Message.success("重置密码成功");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1000);
          }catch(e){
          } finally {
            resetPasswordLoading.value = false;
          }
					
        }
      })
    }

    onUnmounted(clearTimerId)
		
    return {
      forgetPasswordFormRef,
      forgetPasswordForm,
      forgetPasswordFormRules,
      timer,
      isForget,
      resetPasswordLoading,
      nextLoading,
      getAuthCode,
      nextSubmit,
      enterSubmit,
    };
  },
})
</script>

<style lang="less">
.forget-password {
		.auth-text {
	color: #1769FA;
	font-size: 16px;
	background-color: transparent;
	border: none;
	width: 80px;
	cursor: pointer;
	}
}
</style>
