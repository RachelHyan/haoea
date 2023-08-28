<template>
  <el-pro-dialog
    class="add-rule-group-dialog"
    :model-value="modelValue"
    :dialog-props="{ width: '698px' }"
    :title="editStatus ? '编辑' : '新增'"
    @close="close"
    @update:model-value="(val:boolean) => {$emit('update:modelValue',val)}"
  >
    <el-form
      ref="addRuleGroupRef"
      class="add-rule-group-dialog__form"
      :model="addRuleGroupModel"
      scroll-to-error
      :rules="rules"
      label-width="150px"
    >
      <el-space
        size="small"
        direction="vertical"
      >
        <el-form-item
          label="规则组名称"
          prop="ruleGroupName"
        >
          <el-input
            v-model="addRuleGroupModel.ruleGroupName"
            placeholder="请输入"
          />
        </el-form-item>
        <div
          style="position:relative"
        >
          <el-form-item
            v-for="(item, index) in addRuleGroupModel.ruleInParams"
            :key="index"
          >
            <el-select
              v-model="item.ruleType"
              class="m-2"
              placeholder="请选择规则"
              @change="item.ruleValue = ''"
            >
              <el-option
                v-for="rule in ruleTypes"
                :key="rule.value"
                :label="rule.label"
                :value="rule.value"
                :disabled="addRuleGroupModel.ruleInParams.some((item:any) => item.ruleType === rule.value) && item.ruleType !== rule.value"
              />
            </el-select>
            <div style="display:flex;position: absolute;left: 160px;width: 300px;">
              <el-input
                v-if="item.ruleType !== 'natural-point'"
                v-model="item.ruleValue"
                class="form-item--rule-input"
                placeholder="请输入"
                @input="setNumReg($event,index)"
              />
              <el-time-picker
                v-else
                v-model="item.ruleValue"
                value-format="HH:mm"
                format="HH:mm"
                placeholder="请选择时间"
                style="width: 150px;"
              />
              <div style="margin-left: 20px;">
                <el-button
                  v-if="addRuleGroupModel.ruleInParams.length > 1"
                  type="danger"
                  link
                  @click="handlerDelete(index)"
                >
                  删除
                </el-button>
                <el-button
                  v-if="index === (addRuleGroupModel.ruleInParams.length -1)"
                  type="primary"
                  link
                  @click="handlerAdd"
                >
                  新增规则
                </el-button>
              </div>
            </div>
          </el-form-item>
        </div>
        <el-form-item
          label="规则类型"
          prop="ruleGroupType"
        >
          <el-select
            v-model="addRuleGroupModel.ruleGroupType"
            class="m-2"
            placeholder="请选择"
            :disabled="editStatus"
          >
            <el-option
              v-for="item in ruleGroupTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-space>
    </el-form>
    <template #footer>
      <el-space>
        <el-button
          type="danger"
          plain
          @click="close"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="submitLading"
          @click="submit"
        >
          确定
        </el-button>
      </el-space>
    </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesRuleAddRuleGroup, mesRuleRuleGroupInfo, mesRuleUpdateRuleGroup } from "@/api/mes/ruleController";
import { useProject } from "@/stores/project";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { Ref, defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "AddRuleGroupDialog",
  props:{
    modelValue: {
      type: Boolean,
      required: true,
      default: false,
    },
    editStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    rowRuleGroupId: {
      type: Number,
      default: 0,
    },
    ruleTypes: {
      type: Object,
      default: () => ({}),
    },
    ruleGroupTypes: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["close", "finish","update:modelValue"],
  setup (props, { emit, }) {
    const addRuleGroupRef = ref();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const addRuleGroupModel = reactive({
      projectId,
      ruleGroupName: "",
      ruleGroupType: "",
      ruleInParams:[{ruleType: "", ruleValue: "",}],
    });
    const submitLading: Ref<boolean> = ref<boolean>(false);
    const rules:FormRules = {
      ruleGroupName: [
        { required: true, message: "请输入规则组名称", trigger: "blur", }
      ],
      ruleGroupType: [
        { required: true, message: "请选择规则类型", trigger: "change", }
      ],
    };

    onMounted(() => {
      getRuleGroupInfo();
    });

    const getRuleGroupInfo = async () => {
      if(props.editStatus) {
        const ruleGroupId = Number(props.rowRuleGroupId);
        try {
          const { data,success, } = await mesRuleRuleGroupInfo({
            ruleGroupId,
          });
          if(success) {	
            addRuleGroupModel.ruleGroupName = data.ruleGroupName;
            addRuleGroupModel.ruleGroupType = data.ruleGroupType;
            addRuleGroupModel.ruleInParams = [...data.ruleList as any[]];
          }
        }catch(error) {
          console.error(error);
        }
      }
    };

    const setNumReg = (value: any,index:any) => {
      addRuleGroupModel.ruleInParams[index].ruleValue = value.replace(/[^\d]/g,"");
    };

    const handlerAdd = () => {
      addRuleGroupModel.ruleInParams.push({
        ruleType: "", ruleValue: "",
      });
    };

    const handlerDelete = (index:number) => {
      addRuleGroupModel.ruleInParams.splice(index,1);
    };

    const submit = (formEl: FormInstance | undefined) => {
      // 校验addRuleGroupModel.ruleInParams是否有值
      if (addRuleGroupModel.ruleInParams.some((item:any) => !item.ruleValue || !item.ruleType)) {
        ElMessage.error("规则不能为空");
        return;
      }
      if(!formEl) return;
      addRuleGroupRef.value.validate(async (valid: boolean) => {
        if (valid) {
          submitLading.value = true;
          const params = {
            ...addRuleGroupModel,
            ruleGroupId: props.rowRuleGroupId,
          };
          addRuleGroupModel.ruleInParams.map((item:any) => {
            if(item.ruleType === "natural-point") {
              item.ruleValue = item.ruleValue + ":00"
            }
          });
          try {
            if(!props.editStatus) {
              const { code, } = await mesRuleAddRuleGroup({...addRuleGroupModel,});
              if (code === 200) {
                ElMessage.success("添加成功");
                addRuleGroupRef.value.resetFields();
                emit("update:modelValue", false);
                emit("finish");
              }
            } else {
              const { code, } = await mesRuleUpdateRuleGroup(params);
              if (code === 200) {
                ElMessage.success("修改成功");
                addRuleGroupRef.value.resetFields();
                emit("update:modelValue", false);

                emit("finish");
              }
            }
          } catch (error) {
            console.error(error);
          } finally {
            submitLading.value = false;
          }
        }
      });
    };

    const close = () => {
      addRuleGroupRef.value.resetFields();
      emit("update:modelValue", false);
    };

    return {
      addRuleGroupModel,
      addRuleGroupRef,
      submitLading,
      rules,
      handlerAdd,
      handlerDelete,
      setNumReg,
      submit,
      close,
    }
  },
})
</script>

<style lang="less">
.add-rule-group-dialog {

	&__form {
		margin: 40px;

		.form-item--rule {
			display: flex;
			align-items: center;

		}
	}

	.el-select,.el-input {
		width: 150px;
	}
}
</style>
