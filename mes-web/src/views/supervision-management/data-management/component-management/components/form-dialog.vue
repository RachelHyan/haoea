<template>
  <el-pro-dialog-form
    ref="formRef"
    :model-value="modelValue"
    :title="title"
    :form-model="formModel"
    :form-rules="formRules"
    :submit="submit"
    @update:model-value="(val:boolean) => {$emit('update:modelValue',val)}"
    @closed="closed"
  >
    <template #form="{model}">
      <el-row>
        <el-col
          v-for="item in writeColumns"
          :key="item.dataIndex"
          :span="12"
        >
          <el-form-item
            :label="item.title"
            :prop="item.dataIndex"
          >
            <el-input
              v-if="item.valueType === 'string'"
              v-model="model[item.dataIndex]"
              placeholder="请选择"
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
            <el-input
              v-if="item.valueType === 'slot'"
              v-model="model[item.dataIndex]"
              :rows="2"
              type="textarea"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
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
import { mesPartsAddParts, mesPartsUpdateParts } from "@/api/mes/partsController";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import { ElMessage, FormRules, ProCrudWriteColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "ComponentManagement",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "",
    },
    areaList: {
      type: Array,
      default: () => [],
    },
    inspectorList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue","refresh"],
  setup(prop, { emit, }) {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const projectCode = project.$state.projectCode;
    const formRef = ref();
    const formModel = reactive<any>({});
    const submitLoading = ref(false);

    const writeColumns: ProCrudWriteColumn[] = [
      {
        title: "点位",
        dataIndex: "partsName",
        valueType: "string",
      },
      {
        title: "场所",
        dataIndex: "partsType",
        valueType: "enum",
        valueEnum: dict.$state.pointType,
      },
      {
        title: "队别",
        dataIndex: "areaId",
        valueType: "enum",
        valueEnum: prop.areaList as any,
      },
      {
        title: "督查类型",
        dataIndex: "inspectionType",
        valueType: "enum",
        valueEnum: dict.$state.inspectionType,
      },
      {
        title: "督查员",
        dataIndex: "inspectionUserId",
        valueType: "enum",
        valueEnum: prop.inspectorList as any,
      },
      {
        title: "经度",
        dataIndex: "longitude",
        valueType: "string",
      },
      {
        title: "纬度",
        dataIndex: "latitude",
        valueType: "string",
      },
      {
        title: "地址",
        dataIndex: "fullAddress",
        valueType: "slot",
      },
      {
        title: "描述",
        dataIndex: "description",
        valueType: "slot",
      }
    ];

    const formRules: FormRules = {
      partsName: [{ required: true, message: "请输入点位", trigger: "blur", }],
      partsType: [{ required: true, message: "请选择场所", trigger: "change", }],
      // areaId: [{ required: true, message: "请选择队别", trigger: "change", }],
      inspectionType: [{ required: true, message: "请选择督查类型", trigger: "change", }],
    };

    const submit = async () => {
      submitLoading.value = true;
      const params = {
        ...formModel,
        projectId,
        projectCode,
      };
      try {
        if (prop.title === "新增") {
          await mesPartsAddParts(params);
          ElMessage.success("新增成功");
          emit("update:modelValue", false);
          emit("refresh");
        } else {
          await mesPartsUpdateParts(params);
          ElMessage.success("修改成功");
          emit("update:modelValue", false);
          emit("refresh");
        }
        submitLoading.value = false;
      } catch (error) {
        console.error(error);
      }
    };

    const closed = () => {
      emit("refresh");
    };

    Object.assign(formModel, prop.data);
		
    return {
      formRef,
      formModel,
      writeColumns,
      formRules,
      submitLoading,
      submit,
      closed,
    };
  },
});
</script>

<style scoped></style>
