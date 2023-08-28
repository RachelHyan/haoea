<template>
  <el-pro-dialog
    class="allocation-model"
    :model-value="modelValue"
    :title="title"
    width="494px"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
    @closed="handlerClosed"
  >
    <div class="allocation-model-item">
      <span class="allocation-model-item--label">场景类型：</span>
      <span class="allocation-model-item--value">{{ data.sceneType }}</span>
    </div>
    <div class="allocation-model-item">
      <span class="allocation-model-item--label">预警类型：</span>
      <span class="allocation-model-item--value">{{ data.allotType }}</span>
    </div>
    <el-divider
      content-position="left"
    >
      判定规则
    </el-divider>
    <div
      v-if="data.allotType === '整改提醒'"
      class="allocation-model-item"
    >
      <span>任务发出后，则触发任务处理预警。</span>
    </div>
    <div
      v-if="data.allotType === '督查超时'"
      class="allocation-model-item"
    >
      <span>当天
        <el-time-picker
          v-model="firstInput"
          format="HH:mm"
          value-format="HH:mm"
          style="width: 100px"
          class="allocation-model-item--input"
        />
        未处理，则发送督查超时未完成预警。</span>
    </div>
    <div
      v-if="data.allotType === '整改超时'"
      class="allocation-model-item"
    >
      <span>整改任务发出后
        <el-input
          v-model="firstInput"
          class="allocation-model-item--input"
        />
        min未处理，则发送超时未完成预警，并重复提醒
        <el-input
          v-model="secondInput"
          class="allocation-model-item--input"
        />次。</span>
    </div>
    <div
      v-if="data.allotType === '缺卡'"
      class="allocation-model-item"
    >
      <span>当天
        <el-time-picker
          v-model="firstInput"
          format="HH:mm"
          value-format="HH:mm"
          style="width: 100px"
          class="allocation-model-item--input"
        />
        后无考勤记录则判定为缺卡，进行预警。</span>
    </div>
    <div
      v-if="data.allotType === '脱岗提醒'"
      class="allocation-model-item"
    >
      <span>在排班时间段内，离开工作范围
        <el-input
          v-model="firstInput"
          class="allocation-model-item--input"
        />
        min及以上判定为脱岗，并进行预警</span>
    </div>
    <div
      v-if="data.allotType === '坐岗提醒'"
      class="allocation-model-item"
    >
      <span>在排班时间段且在工作范围内，
        <el-input
          v-model="firstInput"
          class="allocation-model-item--input"
        />
        min以上位置移动不超过
        <el-input
          v-model="secondInput"
          class="allocation-model-item--input"
        /> m则判定为坐岗，并进行预警</span>
    </div>
    <div
      v-if="data.allotType === '年龄提醒'"
      class="allocation-model-item"
    >
      <span>当作业人员超过
        <el-input
          v-model="firstInput"
          class="allocation-model-item--input"
        />
        岁，则触发年龄提醒</span>
    </div>
    <div
      v-if="data.allotType === '车辆报废提醒'"
      class="allocation-model-item"
    >
      <span>当作业车辆达到报废年限，则触发报废提醒</span>
    </div>
    <el-divider
      content-position="left"
    >
      推送规则
    </el-divider>
    <div class="allocation-model-item">
      <span class="allocation-model-item--label">通知方式：</span>
      <span class="allocation-model-item--value">微信订阅消息</span>
    </div>
    <div class="allocation-model-item">
      <span class="allocation-model-item--label">通知人员：</span>
      <el-checkbox-group
        v-model="checkList"
        class="allocation-model-item--value"
      >
        <el-checkbox label="预警产生人" />
        <el-checkbox label="直属负责人" />
        <el-checkbox label="项目经理" />
      </el-checkbox-group>
    </div>
    <template #footer>
      <div class="allocation-model-footer">
        <el-button
          plain
          @click="$emit('update:modelValue',false)"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          @click="submit"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesAllotRuleUpdateAllotRule } from "@/api/mes/allotRuleController";
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AllocationModel",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "规则配置",
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [ "update:modelValue", "closed" ],
  setup (props,{emit,}) {
    const firstInput = ref();
    const secondInput = ref();
    const checkList = ref<string[]>([]);
    const submitLoading = ref<boolean>(false);
    const checkData = [
      {label: "预警产生人", value: "personAllot",},
      {label: "直属负责人", value: "chargeUserAllot",},
      {label: "项目经理", value: "projectManagerAllot",}
    ];

    const getInfo = (data:MES.AllotRuleDTO) => {
      firstInput.value = "";
      secondInput.value = "";
      checkList.value = [];
      // 判断data.values是否为,分割的字符串，若是则分割为数组，逗号前为firstInput，逗号后为secondInput;若不是则firstInput为data.values
      if (data.valueStr?.indexOf(",") !== -1) {
        const arr = data.valueStr?.split(",");
        firstInput.value = arr?.[0];
        secondInput.value = arr?.[1];
      } else {
        firstInput.value = data.valueStr;
      }
			
      for (let i = 0; i < checkData.length; i++) {
        if (data.personAllot === 1 && checkData[i].value === "personAllot") {
          checkList.value.push(checkData[i].label);
        }
        if (data.chargeUserAllot === 1 && checkData[i].value === "chargeUserAllot") {
          checkList.value.push(checkData[i].label);
        }
        if (data.projectManagerAllot === 1 && checkData[i].value === "projectManagerAllot") {
          checkList.value.push(checkData[i].label);
        }
      }
    }

    const handlerClosed = () => {
      emit("closed");
    };

    const validate = () => {
      if (props.data.allotType === "督查超时" || props.data.allotType === "缺卡") {
        if (!firstInput.value) {
          return ElMessage.error("请输入判定规则");
        }
      } else if (props.data.allotType === "整改超时") {
        if (!firstInput.value || !secondInput.value) {
          return ElMessage.error("请输入判定规则");
        }
      }

      if (checkList.value.length === 0) {
        return ElMessage.error("请选择通知人员");
      }

      return true;
    }

    const submit = async(params:MES.AllotRuleInParam) => {
      const validateResult = validate();
      if (validateResult !== true) return;

      submitLoading.value = true;

      const arr = [];
      for (let i = 0; i < checkList.value.length; i++) {
        for (let j = 0; j < checkData.length; j++) {
          if (checkList.value[i] === checkData[j].label) {
            arr.push(checkData[j].value);
          }
        }
      }

      if (props.data.allotType === "督查超时" || props.data.allotType === "缺卡" || props.data.allotType === "脱岗提醒" || props.data.allotType === "年龄提醒") {
        params = {
          id: props.data.id,
          valueStr: firstInput.value,
          personAllot: arr.includes("personAllot") ? 1 : 0,
          chargeUserAllot: arr.includes("chargeUserAllot") ? 1 : 0,
          projectManagerAllot: arr.includes("projectManagerAllot") ? 1 : 0,
        }
      } else if (props.data.allotType === "整改超时" || props.data.allotType === "坐岗提醒") {
        params = {
          id: props.data.id,
          valueStr: firstInput.value + "," + secondInput.value,
          personAllot: arr.includes("personAllot") ? 1 : 0,
          chargeUserAllot: arr.includes("chargeUserAllot") ? 1 : 0,
          projectManagerAllot: arr.includes("projectManagerAllot") ? 1 : 0,
        }
      } else {
        params = {
          id: props.data.id,
          personAllot: arr.includes("personAllot") ? 1 : 0,
          chargeUserAllot: arr.includes("chargeUserAllot") ? 1 : 0,
          projectManagerAllot: arr.includes("projectManagerAllot") ? 1 : 0,
        }
      }

      try {
        await mesAllotRuleUpdateAllotRule(params);
        ElMessage.success("修改成功");
      } catch (error) {
				
      } finally {
        submitLoading.value = false;
        emit("update:modelValue",false);
      }
			
    }

    return {
      firstInput,
      secondInput,
      checkList,
      getInfo,
      handlerClosed,
      submit,
      submitLoading,
    }
  },
})
</script>

<style lang="less">
.allocation-model {

	&-item {
		margin-left: 50px;
		display: flex;
		align-items: center;
		line-height: 30px;

		&--value {
			color: #181B28;
		}

		&--input {
			width: 50px;
			height: 22px;
			padding: 0;

			.el-input__wrapper {
				padding: 0 5px;
				background-color: rgba(29, 81, 244, .1);
				box-shadow: none;
			}

			.el-input__inner {
				color: rgba(29, 81, 244, 1);
				text-align: center;
			}
		}
	}

	&-footer {
		display: flex;
		justify-content: center;
	}
}
</style>
