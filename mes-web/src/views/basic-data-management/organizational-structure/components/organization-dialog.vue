<template>
  <el-pro-dialog
    :model-value="visible"
    :title="type == 'edit' ? '编辑' : '新增'"
    :dialog-props="{ width: '500px' }"
    @update:model-value="(value:boolean) => $emit('update:visible',value)"
    @closed="handlerClosed"
  >
    <div class="organization-dialog">
      <el-form
        ref="dialogFormRef"
        :model="dialogModel"
        :rules="dialogRules"
        label-width="100px"
      >
        <el-form-item
          prop="orgName"
          label="组织名称"
        >
          <el-input
            v-model="dialogModel.orgName"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          prop="sort"
          label="同级排序"
        >
          <el-input-number
            v-model="dialogModel.sort"
            controls-position="right"
            placeholder="请输入"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          prop="userIds"
          label="部门负责人"
        >
          <el-select
            v-model="dialogModel.userIds"
            clearable
            filterable
            placeholder="请选择"
            style="width: 100%;"
            multiple
          >
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          prop="vehicleUserId"
          label="车队负责人"
        >
          <el-select
            v-model="dialogModel.vehicleUserId"
            clearable
            filterable
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
      </el-form>
    </div>
    <template #footer>
      <div class="organization-dialog-footer">
        <el-button
          type="danger"
          plain
          @click="$emit('update:visible',false)"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          @click="submit"
        >
          提交
        </el-button>
      </div>
    </template>
  </el-pro-dialog>
</template>
<script lang="ts">
import { mesDepartmentAddOrg, mesDepartmentQueryOrgInfo, mesDepartmentUpdateOrg } from "@/api/mes/departmentController";
import { mesUserQueryAllUserList } from "@/api/mes/userController";
import { useProject } from "@/stores/project";
import { clientId } from "@/utils/http";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "OrganizationDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "add",
    },
    orgId: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
  emits:[ "update:visible", "closed" ],
  setup(props,{emit,}) {
    const dialogFormRef = ref<FormInstance>();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const remoteUserLoading = ref<boolean>(false);
    const userOptions = ref<{value: number,label: string}[]>([]);
    const submitLoading = ref<boolean>(false);
    const dialogModel = reactive<any>({
      orgName: undefined,
      sort: undefined,
      userIds: [],
      clientId: clientId,
      projectId,
    });
    const dialogRules = reactive<FormRules>({
      orgName: [
        { required: true, message: "请输入组织名称", trigger: "blur", }
      ],
      sort: [
        { required: true, message: "请输入同级序号", trigger: "blur", }
      ],
      userIds: [
        { required: true, message: "请输入部门负责人", trigger: "blur", }
      ],
    });

    const submit = () => {
      dialogFormRef.value?.validate(async (valid) => {
        if (valid) {
          submitLoading.value = true;
          try {
            if (props.type === "add") {
              await mesDepartmentAddOrg({...props.params,...dialogModel,});
              ElMessage.success("新增成功");
            } else {
              await mesDepartmentUpdateOrg(dialogModel);
              ElMessage.success("编辑成功");
            }
            emit("closed");
            emit("update:visible",false);
          } catch (error) {
            console.error(error);
						
          } finally {
            submitLoading.value = false;
          }
        }
      })
    };

    const remoteUser = async () => {
      try {
        let {data,} = await mesUserQueryAllUserList({projectId,isCaptain:true,});
        userOptions.value = data.map(({userId,userName,}) => ({
          value: userId,
          label: userName,
        }));
      } catch (error) {
        console.error(error);
      }
    };
		

    const remoteItem = async () => {
      if(props.type === "edit") {
        try {
          let {data,} = await mesDepartmentQueryOrgInfo({orgId:<number>props.orgId,});
          Object.assign(dialogModel,data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    remoteUser();
    remoteItem();

    const handlerClosed = () => {
      dialogFormRef.value?.resetFields();
      userOptions.value = [];
      emit("closed");
    };

    return {
      dialogModel,
      dialogRules,
      dialogFormRef,
      remoteUserLoading,
      userOptions,
      submitLoading,
      submit,
      remoteUser,
      handlerClosed,
    }
  },
})
</script>
<style lang="less">
.organization-dialog {

	&-name {
		height: 20px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #181B28;
		line-height: 20px;
		margin-bottom: 16px;
		position: relative;

		&::after {
			content: "";
			height: 1px;
			background-color: #F2F3F4;
			position: absolute;
			top: 9.5px;
			left: 64px;
			right: 0;
		}
	}

	.el-input__wrapper,.el-input-group__prepend {
		border-radius: 0;
	}

	.el-input-number .el-input__inner {
		text-align: left;
	}

	.el-input-number.is-controls-right .el-input__wrapper {
		padding: 1px 11px;
	}

	&-footer {
		display: flex;
		justify-content: center;
		column-gap: 16px;

		.el-button+.el-button {
			margin-left: 0;
		}
	}
}

</style>
