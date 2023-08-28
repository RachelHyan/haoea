<template>
  <div class="dashboard-user-center page-root">
    <a-tabs
      default-active-key="1"
      lazy-load
    >
      <a-tab-pane
        key="1"
        title="个人信息"
      >
        <div class="user-info">
          <a-descriptions
            style="margin-top: 20px"
            :data="descUserInfo"
            size="large"
            title=""
            :column="1"
            :label-style="{ textAlign: 'right' }"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane
        key="2"
        title="修改密码"
      >
        <a-form
          ref="pwdFormRef"
          :model="pwdFormModel"
          :rules="pwdFormRules"
          :style="{ width: '600px', marginTop: '20px' }"
        >
          <a-form-item
            field="oldPassword"
            label="原密码"
            :validate-trigger="['blur']"
          >
            <a-input-password
              v-model="pwdFormModel.oldPassword"
              placeholder="请输入原密码"
              size="large"
            />
          </a-form-item>
          <a-form-item
            field="newPassword"
            label="新密码"
            :validate-trigger="['blur']"
          >
            <a-input-password
              v-model="pwdFormModel.newPassword"
              placeholder="请输入新密码"
              size="large"
            />
          </a-form-item>
          <a-form-item
            field="rePassword"
            label="确认新密码"
            :validate-trigger="['blur']"
          >
            <a-input-password
              v-model="pwdFormModel.rePassword"
              placeholder="请再次输入新密码"
              size="large"
            />
          </a-form-item>
          <a-form-item style="display: flex;justify-content: ;">
            <a-space>
              <a-button
                type="primary"
                @click="okBtn"
              >
                确认修改
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { queryUserInfoUsingGET, updatePasswordUsingPUT } from "@/api/yonghuguanli";
import { userInfoValue } from "@/refs";
import type { ValidatedError } from "@arco-design/web-vue";
import { Message } from "@arco-design/web-vue";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserCenter",
  setup() {
    const router = useRouter();
    const pwdFormRef = ref();
    const descUserInfo = reactive<{ label: string, value: string }[]>([
      { label: "姓名：", value: "", },
      { label: "工号：", value: "", },
      { label: "手机号：", value: "", },
      { label: "身份：", value: "", }
    ])
    const pwdFormModel = reactive<{ oldPassword?: string, newPassword?: string, rePassword?: string, }>({});

    const validateRePwd = (val: string, callback: (error?: string) => void) => {
      if (val !== pwdFormModel.newPassword) {
        callback("两次密码输入不一致，请重新输入")
      } else {
        callback()
      }
    }
    const pwdFormRules = {
      oldPassword: [
        { required: true, message: "原密码不能为空！！！", },
        {match:/^[a-zA-Z0-9]{5,15}$/,message:"请输入5-15位密码，可用字母、数字",}
      ],
      newPassword: [
        { required: true, message: "新密码不能为空！！！", },
        {match:/^[a-zA-Z0-9]{5,15}$/,message:"请输入5-15位密码，可用字母、数字",}
      ],
      rePassword: [
        { required: true, message: "二次输入的密码不能为空！！！", },
        { validator: validateRePwd, }
      ],
    }

    // 获取用户信息
    const getUserInfo = async () => {
      try {
        const { data, } = await queryUserInfoUsingGET({ userId: userInfoValue.value.id, });
        console.log(data);
        for (let val in data) {
          val === "userName" && (descUserInfo[0].value = data.userName)
          val === "jobNum" && (descUserInfo[1].value = data.jobNum)
          val === "mobile" && (descUserInfo[2].value = data.mobile)
          val === "userType" && (descUserInfo[3].value = data.userType === "SYSTEM_ADMIN" ? "超级管理员" : data.userType === "COMMON_ADMIN" ? "管理员" : "操作员")
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo()
    // 修改密码确认按钮
    const okBtn = async () => {
      pwdFormRef.value.validate(async (errors: undefined | Record<string, ValidatedError>) => {
        if (!errors) {
          try {
            const {success,} = await updatePasswordUsingPUT({ newPassWord: pwdFormModel.newPassword, oldPassWord: pwdFormModel.oldPassword, })
            // console.log("data:", success);
            if(success){
              Message.success("修改密码成功")
              pwdFormRef.value.resetFields()
              window.setTimeout(() => {
                router.push("/login")
              }, 200)
            }
          } catch (error) {
          }
        }
      })
    }

    return {
      pwdFormRef,
      pwdFormRules,
      descUserInfo,
      pwdFormModel,
      okBtn,
    }
  },

})

</script>
<style lang="less">
.dashboard-user-center {
	color: #000;
}

.user-info {
	padding-left: 40px;
}
</style>
