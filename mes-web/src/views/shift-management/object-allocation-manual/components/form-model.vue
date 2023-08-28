<template>
  <el-pro-dialog-form
    ref="formRef"
    :model-value="modelValue"
    :title="title"
    :form-model="formModel"
    :pro-dialog-props="{ width }"
    @update:model-value="(val:boolean) => {$emit('update:modelValue',val)}"
    @closed="handleClose"
  >
    <template #form>
      <div
        v-show="!isDisabled"
        style="text-align: right;"
      >
        <el-icon
          style="cursor: pointer;"
          size="20"
          @click="generativeSchedule"
        >
          <MoreFilled />
        </el-icon>
      </div>
      <div style="font-weight: bolder;">
        排班
      </div>
      <el-form-item
        label="队长"
      >
        {{ formModel.chargeUserNames || '暂无' }}
      </el-form-item>
      <el-form-item label="队别">
        <div>
          {{ formModel.gridName || '暂无' }}
        </div>
      </el-form-item>
      <el-form-item label="班次">
        <div v-if="formModel.shiftList">
          <div
            v-for="shift in formModel.shiftList"
            :key="shift.shiftId"
            class="shift--item"
          >
            <span>{{ shift.shiftName }}</span>
            <span> {{ shift.jobStartTime.slice(0,5) + "-" + shift.jobEndTime.slice(0,5) }}</span>
            <span>频次：{{ shift.cleaningCount || '' }}</span>
          </div>
        </div>
        <div v-else>
          暂无
        </div>
      </el-form-item>
      <div style="display: grid;grid-template-columns: 1fr 1fr">
        <el-form-item
          prop="userId"
          label="作业人员"
        >
          <el-select
            v-model="formModel.userId"
            clearable
            filterable
            :disabled="isDisabled || (Boolean(formModel.bindingStatus) && !isEdit)"
            placeholder="暂无"
            @change="changeUser"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
      </div>
      <div style="font-weight: bolder;">
        督查
      </div>
      <div style="display: grid;grid-template-columns: 1fr 1fr">
        <el-form-item
          prop="inspectorUserId"
          label="督查员"
        >
          <el-select
            v-model="formModel.inspectorUserId"
            clearable
            filterable
            :disabled="isDisabled || (Boolean(formModel.bindingStatus) && !isEdit)"
            placeholder="暂无"
          >
            <el-option
              v-for="item in inspectorList"
              :key="item.inspectorUserId"
              :label="item.inspectorUserName"
              :value="item.inspectorUserId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="inspectorCount"
          label="督查次数"
        >
          <el-input-number
            v-model="formModel.inspectorCount"
            :min="0"
            :disabled="isDisabled || (Boolean(formModel.bindingStatus) && !isEdit)"
          />
        </el-form-item>
      </div>
    </template>
    <template #footer>
      <div v-show="!isDisabled">
        <el-button
          type="danger"
          link
          :loading="formModel.bindingStatus ? cancelLoading : false"
          @click="handleCancel"
        >
          {{ formModel.bindingStatus ? '解绑' : '取消' }}
        </el-button>
        <el-button
          type="primary"
          link
          :loading="submitLoading"
          @click="formModel.bindingStatus ? (isEdit ? handleSave() : isEdit = true) : handleSave()"
        >
          {{ formModel.bindingStatus ? (isEdit ? '保存' : '编辑') : '确定' }}
        </el-button>
      </div>
    </template>
  </el-pro-dialog-form>
</template>

<script lang="ts">
import { mesObjectAllotQueryJayaMapCarSwitchList, mesObjectAllotQueryJayaMapObjectAllotInfo, mesObjectAllotQueryJayaMapUserSwitchList, mesObjectAllotSaveObjectAllot, mesObjectAllotSyncTask, mesObjectAllotUnbind, mesObjectAllotUpdateObjectAllot } from "@/api/mes/objectAllotController";
import { mesPlanQueryPlanInspectorUserList } from "@/api/mes/planController";
import { useProject } from "@/stores/project";
import dayjs from "dayjs";
import { ElMessage, ElMessageBox } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "FormModel",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "35%",
    },
    currentObjectId: {
      type: Number,
      default: 0,
    },
  },
  emits: ["close","load","update:modelValue"],
  setup (props,{emit,}) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const formRef = ref();
    const isEdit = ref<boolean>(false); // 是否编辑状态
    const isDisabled = ref<boolean>(true); // 是否只读
    const submitLoading = ref<boolean>(false);
    const cancelLoading = ref<boolean>(false);
    const formModel = reactive<MES.JayaMapObjectInfo | any>({});
    const inspectorList = ref<MES.PlanInspectorUserDTO[]>([]); // 督查人员列表
    const carList = ref<MES.JayaMapCarSwitchDTO[]>([]); // 车辆列表
    const userList = ref<MES.JayaMapUserSwitchDTO[]>([]); // 队长列表
    const currentObjectChargeUserName = ref<string | undefined>();

    const fetchInspectorList = async () => {
      try {
        const {data,} = await mesPlanQueryPlanInspectorUserList({projectId,});
        inspectorList.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCarList = async () => {
      try {
        const {data,} = await mesObjectAllotQueryJayaMapCarSwitchList({projectId,});
        carList.value = data;
      } catch (error) {
        console.error(error);
					
      }
    };

    const fetchUserList = async () => {
      const params = {
        chargeUserIds: formModel.chargeUserIds,
        projectId,
      };
      try {
        const {data,} = await mesObjectAllotQueryJayaMapUserSwitchList(params);
        userList.value = data;
      } catch (error) {
        console.error(error);
				
      }
    };

    const changeUser = (userId:number) => {
      const user = userList.value.find(item => item.userId === userId) as MES.JayaMapUserSwitchDTO;
      if (currentObjectChargeUserName.value) return;
      formModel.chargeUserNames = user.chargeUserName;
    };

    const fetchObjectInfo = async (objectId:number,gridId:number,planId?:number) => {
      try {
        const {data,} = await mesObjectAllotQueryJayaMapObjectAllotInfo({objectId,gridId,planId,});
        // @ts-ignore
        currentObjectChargeUserName.value = data.chargeUserNames;
        Object.assign(formModel, data);
        fetchUserList();
      } catch (error) {
        console.error(error);
				
      }
    };

    const generativeSchedule = () => {
      ElMessageBox.confirm("今日排班/督查已生成，确认是否重新生成", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {

          try {
            await mesObjectAllotSyncTask({planId: formModel.planId,});

            ElMessage.success("任务生成成功");
          } catch (e) {
            ElMessage.error("任务生成失败");
          }
        })
        .catch(() => {
          ElMessage.info("任务取消生成");
        });
    };

    const handleSave = async () => {
      submitLoading.value = true;

      const params:MES.ObjectAllotInParam = {
        carId: formModel.carId,
        gridId: formModel.gridId,
        inspectorCount: formModel.inspectorCount,
        inspectorUserId: formModel.inspectorUserId,
        objectId: props.currentObjectId,
        planId: formModel.planId,
        projectId,
        userId: formModel.userId,
      };

      try {
        if (formModel.bindingStatus) {
          await mesObjectAllotUpdateObjectAllot(params);
          ElMessage.success("编辑成功");
        } else {
          await mesObjectAllotSaveObjectAllot(params);
          ElMessage.success("保存成功");
        }
      } catch (error) {
        console.error(error);
      } finally {
        submitLoading.value = false;
        emit("close");
        emit("load");
      }
    };
		
    const handleCancel = async () => {
      if (formModel.bindingStatus) {
        cancelLoading.value = true;
        // 解绑
        try {
          await mesObjectAllotUnbind({planId: formModel.planId,});
        } catch (error) {
          console.error(error);
        } finally {
          cancelLoading.value = false;
          emit("load");
          emit("close");
        }
      } else {
        isEdit.value = false;
      }
      emit("close");
    };

    const handleClose = () => {
      isEdit.value = false;
      emit("close");
    };

    fetchInspectorList();
    fetchCarList();

    return {
      dayjs,
      formRef,
      formModel,
      isEdit,
      isDisabled,
      submitLoading,
      cancelLoading,
      inspectorList,
      carList,
      userList,
      changeUser,
      generativeSchedule,
      handleSave,
      handleCancel,
      handleClose,
      fetchObjectInfo,
    }
  },
})
</script>

<style lang="less">
.shift--item {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 10px;

	span {
		
		&:first-child {
			margin-right: 10px;
		}
	}
}
</style>
