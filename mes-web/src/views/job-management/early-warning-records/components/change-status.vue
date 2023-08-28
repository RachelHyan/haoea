<template>
  <el-pro-dialog-form
    ref="formRef"
    :model-value="modelValue"
    :title="title"
    :form-model="formModel"
    :form-rules="formRules"
    :submit="submit"
    @closed="closed"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
  >
    <template #form="{model}">
      <el-form-item
        label="将选中的预警数据状态变更为："
        prop="status"
        label-width="220px"
      >
        <el-select
          v-model="model.status"
          clearable
          filterable
          placeholder="请选择"
        >
          <el-option
            label="已读"
            value="1"
          />
        </el-select>
      </el-form-item>
    </template>
  </el-pro-dialog-form>
</template>

<script lang="ts">
import { mesWechatUserReadMessage } from "@/api/mes/wechatController";
import { ElMessage, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "ChangeStatus",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "新增",
    },
    id: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue","closed"],
  setup (props,{ emit,}) {
    const formRef = ref();
    const formModel = reactive<any>({});

    const formRules:FormRules = {
      status: [
        { required: true, message: "请选择变更状态", trigger: "change", }
      ],
    };

    const submit = async () => {
      try {
        await mesWechatUserReadMessage({ids:props.id,})
        ElMessage.success("操作成功");
      } catch (error) {
				
      } finally {
        emit("update:modelValue", false);
      }
    }

    const closed = () => {
      emit("closed");
    }

    return {
      formRef,
      formModel,
      formRules,
      submit,
      closed,
    }
  },
})
</script>

<style scoped>

</style>
