<template>
  <el-button
    v-if="showModel === 'forget'"
    link
    :icon="ArrowLeft"
    class="back-btn"
    @click="$emit('back')"
  />
  <el-button
    v-if="showModel === 'reset'"
    link
    :icon="ArrowLeft"
    class="back-btn"
    @click="back"
  />
  <div class="form-title">
    {{ showModel === 'forget' ? '忘记密码' : '重置密码' }}
  </div>
  <el-form
    ref="forgetFormRef"
    :model="forgetModel"
    :rules="forgetRules"
    :hide-required-asterisk="true"
    :size="formSize"
    class="form-content"
    label-position="top"
  >
    <div v-if="showModel == 'forget' ">
      <el-form-item
        prop="mobile"
        label="手机号码验证"
      >
        <el-input
          v-model="forgetModel.mobile"
          placeholder="内部员工账号"
          clearable
        />
      </el-form-item>
      <el-form-item prop="authCode">
        <div class="form-content-authCode">
          <el-input
            v-model="forgetModel.authCode"
            placeholder="验证码"
            maxlength="4"
          />
          <el-button
            class="form-content-authCode--btn"
            :type="timer === 0 ? 'primary' : 'info'"
            link
            :disabled="timer !== 0"
            @click="getAuthCode(forgetFormRef)"
          >
            {{ timer === 0 ? '获取验证码' : `${timer}` }}
          </el-button>
        </div>
      </el-form-item>
    </div>
    <div v-else>
      <el-form-item
        prop="password"
        label="请重设你的密码"
      >
        <el-input
          v-model="forgetModel.password"
          placeholder="请输入你的新密码"
          show-password
        />
      </el-form-item>
      <el-form-item
        prop="confirmPassword"
      >
        <el-input
          v-model="forgetModel.confirmPassword"
          placeholder="请再次确认密码"
          show-password
        />
      </el-form-item>
    </div>
    <el-form-item>
      <el-button
        type="primary"
        round
        :loading="loading"
        :size="formSize"
        style="width: 100%;"
        @click="showModel == 'forget' ? reset(forgetFormRef) : forgetSubmit(forgetFormRef)"
      >
        {{ showModel == 'forget' ? '下一步' : '确认' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { idpSmsSendCode, idpSmsVerifyCode } from "@/api/idp/smsController";
import { idpUserUpdatePasswordByPhone } from "@/api/idp/userController";
import { ArrowLeft } from "@element-plus/icons-vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ForgetPassword",
  props:{
    formSize: {
      type: String,
      default: "",
    },
  },
  emits: ["back"],
  setup (props,{emit,}) {
    const router = useRouter();
    const forgetFormRef = ref();
    const showModel = ref("forget");
    const timer = ref<number>(0);
    const timerId = ref<NodeJS.Timeout | undefined | number>();
    const loading = ref<boolean>(false);
    const forgetModel = reactive<{ mobile: string, password: string, authCode: string, confirmPassword: string }>({ mobile: "", authCode: "", password: "", confirmPassword: "", });
    const forgetRules = reactive<FormRules>({
      mobile: [
        {
          validator: (rule: any, value: string, callback: any) => {
            if (value === "") {
              callback("请输入手机号码");
            } else if (!/^1[3456789]\d{9}$/.test(value)) {
              callback("请输入正确的手机号码");
            } else {
              callback();
            }
          }, trigger: "blur",
        }
      ],
      authCode: [
        {
          validator: (rule: any, value: string, callback: any) => {
            if (value === "") {
              callback("请输入验证码");
            } else {
              callback();
            }
          }, trigger: "blur",
        }
      ],
      password: [
        {
          validator: (rule: any, value: string, callback: any) => {
            if (value === "") {
              callback("请输入密码");
            } else if (!/^[a-zA-Z0-9]{5,15}$/.test(value)) {
              callback("密码长度为 5-15 位");
            } else {
              callback();
            }
          }, trigger: "blur",
        }
      ],
      confirmPassword: [
        {
          validator: (rule: any, value: string, callback: any) => {
            if (value === "") {
              callback("请输入密码");
            } else if (value !== forgetModel.password) {
              callback("密码不一致");
            } else {
              callback();
            }
          }, trigger: "blur",
        }
      ],
    });

		 const clearTimerId = () => {
      if (timerId.value) {
        clearInterval(timerId.value);
      }
    };

    const getAuthCode = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validateField("mobile", async (valid: boolean) => {
        if (valid) {
          try {
            await idpSmsSendCode({ mobile: forgetModel.mobile, });
            timer.value = 60;
            timerId.value = setInterval(() => {
              timer.value--;
              if (timer.value === 0) {
                clearTimerId();
              }
            }, 1000);
          } catch (error) {
            console.error(error);
          }
        }
      });
    };

    const reset = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validateField(["mobile", "authCode"], async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          try {
            const { data, } = await idpSmsVerifyCode({
              mobile: forgetModel.mobile,
              code: forgetModel.authCode,
            });
            if (data === true) {
              showModel.value = "reset";
              clearTimerId();
      				timer.value = 0;
            } else {
              ElMessage.error("验证码错误");
              forgetModel.authCode = "";
            }
          } catch (error) {
            console.error(error);
          } finally {
            loading.value = false;
          }
        }
      });
    };

    const forgetSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validateField(["password", "confirmPassword"], async (valid: boolean) => {
        loading.value = true;
        if (valid) {
          try {
            await idpUserUpdatePasswordByPhone({
              phone: forgetModel.mobile,
              newPassword: forgetModel.password,
              confirmPassword: forgetModel.confirmPassword,
            });
            ElMessage.success("重置密码成功");
            emit("back");
          } catch (e) {
            console.error(e);
          } finally {
            loading.value = false;
          }
        }
      });
    };

    const back = () => {
      showModel.value = "forget";
      forgetModel.authCode = "";
    };

    return {
      forgetFormRef,
      forgetModel,
      forgetRules,
      showModel,
      loading,
      timer,
      router,
      getAuthCode,
      reset,
      forgetSubmit,
      clearTimerId,
      back,
      ArrowLeft,
    }
  },
})
</script>

<style scoped>

</style>
