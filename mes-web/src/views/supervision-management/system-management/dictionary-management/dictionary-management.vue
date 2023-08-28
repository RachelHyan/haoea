<template>
  <router-view v-if="['dictionary-management-type'].includes(currentRouteName)" />
  <div
    v-else
    class="dictionary-management page-root"
  >
    <card-header title="字典管理" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="dictTypeId"
      :read-columns="readColumns"
      :write-columns="writeColumns"
      :write-rules="formRules"
      :read-request="readRequest"
      :create-request="createRequest"
      :read-item-request="remoteDict"
      :update-request="updateRequest"
      :with-menu="[]"
      :pro-table-props="{hiddenLabel:true}"
    >
      <template #read-column-dictType="{row}">
        <el-button
          type="primary"
          link
          @click="router.push({name:'dictionary-management-type',query:{type:row.dictType}})"
        >
          {{ row.dictType }}
        </el-button>
      </template>
      <template #write-form-dictType="{model}">
        <el-input
          v-model="model.dictType"
          :disabled="dictTypeId ? true : false"
          placeholder="字典类型"
        />
      </template>
    </el-pro-crud>
  </div>
</template>

<script lang="ts">
import { mesDictAddDictType, mesDictDictTypePageList, mesDictQueryDictTypeInfo, mesDictUpdateDictType } from "@/api/mes/dictController";
import { CardHeader } from "@/components";
import type { FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "DictionaryManagement",
  components:{
    CardHeader,
  },
  setup () {
    const router = useRouter();
    const currentRouteName = computed<string>(() => <string>router.currentRoute.value.name);
    const takeOffRef = ref();
    const dictTypeId = ref<number | undefined>();
    const readColumns:ProTableColumn[] = [
      {
        title: "字典编号",
        dataIndex: "dictTypeId",
        valueType: "string",
      },
      {
        title: "字典名称",
        dataIndex: "dictName",
        valueType: "string",
        search: true,
        placeholder: "字典名称",
      },
      {
        title: "字典类型",
        dataIndex: "dictType",
        valueType: "string",
        search: true,
        placeholder: "字典类型",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        valueType: "string",
      }
    ];
    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "字典名称",
        dataIndex: "dictName",
        valueType: "string",
      },
      {
        title: "字典类型",
        dataIndex: "dictType",
        valueType: "slot",
      },
      {
        title: "备注",
        dataIndex: "remark",
        valueType: "string",
      }
    ];
    const formRules:FormRules = {
      dictName: [
        { required: true, message: "请输入字典名称", trigger: "blur", }
      ],
      dictType: [
        {validator: (rule, value, callback) => {
          if(!value) {
            callback(new Error("请输入字典类型"))
          }else if (/^_/.test(value) || /_$/.test(value)) {
            callback(new Error("字典类型不能以下划线开头和结尾"))
          }else if (!/^[a-zA-Z_]+$/.test(value)) {
            callback(new Error("字典类型只能输入英文、下划线"))
          }else {
            callback()
          }
        }, trigger: "blur",required: true, }
      ],
    };

    const readRequest = async (params:MES.DictDictTypePageListParams) => {
      dictTypeId.value = undefined;
      return mesDictDictTypePageList(params);
    };

    const createRequest = async (params:MES.DictTypeInParam) => {
      return mesDictAddDictType(params);
    };

    const remoteDict = async (params:MES.DictQueryDictTypeInfoParams) => {
      dictTypeId.value = params.dictTypeId;
      return mesDictQueryDictTypeInfo(params);
    };

    const updateRequest = async (params:MES.DictTypeInParam) => {
      return mesDictUpdateDictType(params);
    };

    return {
      router,
      currentRouteName,
      takeOffRef,
      readColumns,
      writeColumns,
      formRules,
      dictTypeId,
      readRequest,
      createRequest,
      remoteDict,
      updateRequest,
    }
  },
})
</script>

<style scoped>

</style>
