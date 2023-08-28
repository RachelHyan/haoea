<template>
  <el-pro-dialog-form
    ref="formRef"
    :model-value="modelValue"
    title="网格信息"
    :form-model="formModel"
    :form-rules="formRules"
    :submit="submit"
    :pro-dialog-props="{width:'40%'}"
    @update:model-value="(val:boolean) => {$emit('update:modelValue',val)}"
    @closed="closed"
  >
    <template #form="{model}">
      <el-row>
        <el-col :span="isPoint ? 17 : 24">
          <el-form-item
            v-for="item in formColumns"
            v-show="item.show"
            :key="item.dataIndex"
            :label="item.title"
            :prop="item.dataIndex"
          >
            <el-input
              v-if="item.valueType === 'string'"
              v-model="model[item.dataIndex]"
              placeholder="请输入"
              :disabled="item.disabled"
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
            <el-select
              v-if="item.dataIndex === 'gridIds'"
              v-model="model[item.dataIndex]"
              clearable
              filterable
              placeholder="请选择"
              style="width: 100%;"
              multiple
            >
              <el-option
                v-for="option in (gridOptions as any)"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <el-select
              v-if="item.dataIndex === 'chargeUserIds'"
              v-model="model[item.dataIndex]"
              clearable
              filterable
              placeholder="请选择"
              style="width: 100%;"
              multiple
            >
              <el-option
                v-for="option in (chargeOptions as any)"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="作业标准"
            required
          >
            <el-table
              :data="formTableData"
              border
              size="small"
            >
              <el-table-column
                label="类型"
                prop="type"
              >
                <template #default="{row}">
                  {{ row.type }}
                </template>
              </el-table-column>
              <el-table-column
                label="班次"
                prop="shiftId"
              >
                <template #default="{row,$index}">
                  <el-select
                    v-model="row.shiftId"
                    clearable
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                    size="small"
                    @change="handleChangeShift($event,$index)"
                    @clear="handleChangeShift($event,$index)"
                  >
                    <el-option
                      v-for="shift in (shiftList as any[])"
                      :key="shift.shiftId"
                      :label="shift.shiftName"
                      :value="shift.shiftId"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="作业时间"
                prop="jobStartTime"
              >
                <template #default="{row}">
                  {{ row.jobStartTime }}
                </template>
              </el-table-column>
              <el-table-column
                label="频次"
                prop="cleaningCount"
              >
                <template #default="{row}">
                  <el-input-number
                    v-model="row.cleaningCount"
                    size="small"
                    :min="1"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="left"
              >
                <template #default="{$index}">
                  <div style="display: flex;">
                    <el-button
                      v-if="formTableData.length > 1"
                      type="danger"
                      link
                      size="small"
                      @click="handlerDelete($index)"
                    >
                      删除
                    </el-button>
                    <el-button
                      v-if="$index === (formTableData.length -1)"
                      type="primary"
                      link
                      size="small"
                      @click="handlerAdd"
                    >
                      新增
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
        <el-col
          :span="isPoint ? 7 : 0"
        >
          <el-form-item
            label="经度"
          >
            {{ workArray?.[0] }}
          </el-form-item>
          <el-form-item
            label="纬度"
          >
            {{ workArray?.[1] }}
          </el-form-item>
          <el-form-item
            label="详细地址"
          >
            {{ objectAddr }}
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
import { mesJobObjectQueryJayaObjectShiftSwitchList, mesJobObjectQueryObjectInfo } from "@/api/mes/jobObjectController";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import { ElMessage, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import type { FormModel } from "./index";

export default defineComponent({
  name: "ObjectForm",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    formMethods: {
      type: String,
      default: "",
    },
    gridOptions: {
      type: Array,
      default: () => [],
    },
    chargeOptions: {
      type: Array,
      default: () => [],
    },
    isPoint: {
      type: Boolean,
      default: true,
    },
    workArray: {
      type: Object,
      default: () => ({}),
    },
    objectAddr: {
      type: String,
      default: "",
    },
  },
  emits: ["submit","update:modelValue","close"],
  setup (props,{emit,}) {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const formRef = ref();
    const submitLoading = ref(false);
    const formModel = reactive({});
    const formTableData = ref<any[]>([]);
    const shiftList = ref<any[]>([]);

    const formColumns:FormModel[] = [
      {
        title:"对象编号",
        dataIndex:"objectCode",
        valueType:"string",
        show: props.formMethods === "update",
        disabled: true,
      },
      {
        title:"对象名称",
        dataIndex:"objectName",
        valueType:"string",
        show: true,
      },
      {
        title:"对象类型",
        dataIndex:"sceneType",
        valueType:"enum",
        valueEnum: dict.$state.sceneType,
        show: true,
      },
      {
        title:"队别",
        dataIndex:"gridIds",
        valueType:"slot",
        show: true,
      },
      {
        title:"队长",
        dataIndex:"chargeUserIds",
        valueType:"slot",
        show: true,
      },
      {
        title:"督查类型",
        dataIndex:"inspectionType",
        valueType:"enum",
        valueEnum: dict.$state.inspectionType,
        show: true,
      }
    ];
    const formRules:FormRules = {
      sceneType: [
        { required: true, message: "请选择对象类型", trigger: "change", }
      ],
      objectName: [
        { required: true, message: "请输入对象名称", trigger: "blur", },
        { max: 25, message: "长度不能超过25个字符", trigger: "input", }
      ],
      inspectionType: [
        { required: true, message: "请选择督查类型", trigger: "change", }
      ],
    };

    const fetchShiftList = async () => {
      let params:any = {
        projectId,
        type: "Vehicle_operation",
      };
      try {
        const {data,} = await mesJobObjectQueryJayaObjectShiftSwitchList(params);
        shiftList.value = data;
        formTableData.value = (shiftList.value || []).map(({type,shiftId,jobStartTime,jobEndTime,teamId,}) => ({
          teamId,
          type,
          shiftId,
          jobStartTime: jobStartTime.slice(0,5) + "-" + jobEndTime.slice(0,5),
          cleaningCount:1,
        }));
      } catch (error) {
				
      }
    };

    const handleChangeShift = (e:any,index:number) => {
      const rowData = formTableData.value[index];
      if (!e) {
        rowData.jobStartTime = "-";
        rowData.type = "-";
        rowData.teamId = null;
        return;
      }
  
      const selectedShift:any = shiftList.value.find((item:any) => item.shiftId === e);
      if (selectedShift) {
        rowData.jobStartTime = selectedShift.jobStartTime.slice(0,5) + "-" + selectedShift.jobEndTime.slice(0,5);
        rowData.type = selectedShift.type;
        rowData.teamId = selectedShift.teamId;
      }
    };

    const fetchInfo = async (objectId:number) => {
      try {
        const {data,} = await mesJobObjectQueryObjectInfo({objectId,});
        Object.assign(formModel,data);
        if (data?.shiftList?.length !== 0) {
          formTableData.value = (data?.shiftList || []).map(({type,shiftId,jobStartTime,jobEndTime,cleaningCount,teamId,}) => ({
            teamId,
            type,
            shiftId,
            jobStartTime: jobStartTime.slice(0,5) + "-" + jobEndTime.slice(0,5),
            cleaningCount,
          }));
        } else {
          formTableData.value = (shiftList.value || []).map(({type,shiftId,jobStartTime,jobEndTime,teamId,}) => ({
            teamId,
            type,
            shiftId,
            jobStartTime: jobStartTime.slice(0,5) + "-" + jobEndTime.slice(0,5),
            cleaningCount:1,
          }));
        }
        return data;
      } catch (error) {
				
      }
    };

    const handlerAdd = () => {
      formTableData.value.push({
        teamId:null,
        type:"-",
        shiftId:null,
        jobStartTime:"-",
        cleaningCount:1,
      });
    };

    const handlerDelete = (index:number) => {
      formTableData.value.splice(index,1);
    };

    const validator = () => {
      let errorFlag = false;
      for (let index = 0; index < formTableData.value.length && !errorFlag; index++) {
        const {shiftId,} = formTableData.value.at(index);
        // 校验班次名称
        if (!shiftId) {
          ElMessage.error(`第${index + 1}行班次未选择`);
          errorFlag = true;
          return false;
        }
      }
      return !errorFlag;
    };


    const submit = () => {
      let valid = validator();
      if (valid) {
        let shiftInParams = [] as any[];

        formTableData.value.forEach(({jobStartTime, type, shiftId,cleaningCount,teamId,}) => {
          let startTime = jobStartTime.split("-")[0] + ":00";
          let endTime = jobStartTime.split("-")[1] + ":00";
          
					
          shiftInParams.push({
            teamId,
            type,
            jobStartTime:startTime,
            jobEndTime:endTime,
            shiftId,
            cleaningCount,
          });
        });

        emit("submit",{...formModel,shiftInParams,});
      }
    };

    const closed = () => {
      emit("close");
    };

    fetchShiftList();

    return {
      formRef,
      submitLoading,
      formModel,
      formColumns,
      formRules,
      formTableData,
      shiftList,
      fetchShiftList,
      handleChangeShift,
      fetchInfo,
      handlerAdd,
      handlerDelete,
      submit,
      closed,
    }
  },
})
</script>

<style scoped>

</style>
