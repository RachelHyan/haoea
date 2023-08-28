<template>
  <el-pro-dialog-form
    ref="formRef"
    :model-value="modelValue"
    title="网格信息"
    :form-model="formModel"
    :form-rules="formRules"
    :submit="submit"
    @update:model-value="(val:boolean) => {$emit('update:modelValue',val)}"
    @closed="closed"
  >
    <template #form="{model}">
      <el-form-item
        v-for="item in formColumns"
        :key="item.dataIndex"
        :label="item.title"
        :prop="item.dataIndex"
      >
        <el-input
          v-if="item.valueType === 'string'"
          v-model="model[item.dataIndex]"
          placeholder="请输入"
        />
        <el-select
          v-if="item.valueType === 'enum'"
          v-model="model[item.dataIndex]"
          clearable
          filterable
          placeholder="请选择"
          style="width: 100%;"
        >
          <el-option
            v-for="option in item.valueEnum"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <slot
          v-else-if="item.valueType === 'slot'"
          :name="'form-' + item.dataIndex"
          :attr="{ model, item }"
        />
      </el-form-item>
    </template>
    <template #footer="{submit,cancel}">
      <div>
        <el-button
          type="danger"
          @click="cancel"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          :data-submit="submit"
          @click="submit"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-pro-dialog-form>
</template>

<script lang="ts">
import { mesGridQueryGridInfo } from "@/api/mes/gridController";
import { FormRules, ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "GridForm",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    formMethods: {
      type: String,
      default: "",
    },
  },
  emits:["update:modelValue","submit","close"],
  setup (props,{emit,}) {
    const formRef = ref();
    const submitLoading = ref(false);
    const formModel = reactive<MES.GridInfo | any>({});

    const formColumns:ProTableColumn[] = [
      {
        title:"网格名称",
        dataIndex:"gridName",
        valueType:"string",
      }
    ];
    const formRules:FormRules = {
      gridName: [
        { required: true, message: "请输入网格名称", trigger: "blur", },
        { max: 15, message: "长度不能超过15个字符", trigger: "input", }
      ],
    };

    const fetchInfo = async (gridId:number) => {
      try {
        const {data,} = await mesGridQueryGridInfo({gridId,});
        Object.assign(formModel,data);
        return data;
      } catch (error) {
				
      }
    };

    const submit = () => {
      emit("submit",formModel);
    };

    const closed = () => {
      emit("close");
    };

    return {
      formRef,
      submitLoading,
      formModel,
      formColumns,
      formRules,
      fetchInfo,
      submit,
      closed,
    }
  },
})
</script>

<style scoped>

</style>
