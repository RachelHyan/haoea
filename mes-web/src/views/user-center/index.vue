<template>
  <div class="user-center page-root">
    <card-header title="个人中心" />
    <el-tabs
      v-model="activeName"
      class="user-center-tabs"
    >
      <el-tab-pane
        name="user-center"
        label="个人中心"
      >
        <el-descriptions
          title="个人信息"
          :column="1"
          size="large"
        >
          <el-descriptions-item label="姓名">
            {{ userInfo.$state.userName }}
          </el-descriptions-item>
          <el-descriptions-item label="手机号码">
            {{ userInfo.$state.mobile }}
          </el-descriptions-item>
          <el-descriptions-item label="身份">
            {{ project.$state.roleName }}
          </el-descriptions-item>
          <el-descriptions-item label="当前项目">
            {{ project.$state.projectName }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane
        name="reset-password"
        label="重置密码"
      >
        <el-form
          ref="formRef"
          :model="formModel"
        >
          <el-form-item
            prop="oldPassword"
            label-width="auto"
            label="旧密码"
          >
            <el-input
              v-model="formModel.oldPassword"
              type="password"
            />
          </el-form-item>
          <el-form-item
            prop="newPassword"
            label="新密码"
          >
            <el-input
              v-model="formModel.newPassword"
              type="password"
            />
          </el-form-item>
          <el-form-item
            prop="rePassword"
            label="二次密码"
          >
            <el-input
              v-model="formModel.rePassword"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
            >
              确认修改
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang='ts'>

import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "UserCenter",
  components:{
    CardHeader,
  },
  setup(){
    const activeName = ref<"user-center"|"reset-password">("user-center");
    const formModel = reactive<{oldPassword: string, newPassword: string, rePassword:string}>({oldPassword: "", newPassword: "",rePassword: "",});
    const userInfo = useUserInfo();
    const project = useProject();

    return {
			 activeName,
			 formModel,
			 userInfo,
			 project,
    }
  },
})
</script>
<style lang='less'>
.user-center{
	&-tabs{
		padding: 20px;
	}

	.el-descriptions__label{
		display: inline-block;
		text-align: right;
		width: 65px;
	}

	.el-input{
		width: 250px;
	}
}
</style>
