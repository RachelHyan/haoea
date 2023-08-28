<template>
  <div class="type-list page-root">
    <div class="page-header">
      <el-icon
        color="#7E7E7E"
        style="cursor: pointer;"
        @click="$router.back"
      >
        <arrow-left />
      </el-icon>
      <p class="page-header-name">
        字典类型
      </p>
    </div>
    <el-pro-crud
      ref="takeOffRef"
      row-key="dictDataId"
      :read-columns="readColumns"
      :write-columns="writeColumns"
      :write-rules="formRules"
      :read-request="readRequest"
      :create-request="createRequest"
      :read-item-request="remoteDict"
      :update-request="updateRequest"
      :delete-request="deleteRequest"
      :with-menu="[]"
      :pro-table-props="{hiddenLabel:true}"
    >
      <template #write-form-dictType>
        <el-input
          v-model="dictType"
          disabled
        />
      </template>
    </el-pro-crud>
  </div>
</template>

<script lang="ts">
import { mesDictAddDictData, mesDictDeleteDictData, mesDictDictDataPageList, mesDictDictTypePageList, mesDictQueryDictDataInfo, mesDictUpdateDictData } from "@/api/mes/dictController";
import type { FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TypeList",
  setup () {
    const route = useRoute();
    const dictType = ref(<string>route.query.type);
    const takeOffRef = ref();
    const dictTypeList = ref<any[]>([]);
    const readColumns:ProTableColumn[] = [
      {
        title: "字典编码",
        dataIndex: "dictDataId",
        valueType: "string",
      },
      {
        title: "字典标签",
        dataIndex: "dictLabel",
        valueType: "string",
        search: true,
        placeholder: "字典标签",
      },
      {
        title: "字典键值",
        dataIndex: "dictValue",
        valueType: "string",
      },
      {
        title: "字典排序",
        dataIndex: "dictSort",
        valueType: "string",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        valueType: "string",
      }
    ];
    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "字典类型",
        dataIndex: "dictType",
        valueType: "slot",
      },
      {
        title: "字典标签",
        dataIndex: "dictLabel",
        valueType: "string",
      },
      {
        title: "字典键值",
        dataIndex: "dictValue",
        valueType: "string",
      },
      {
        title: "字典排序",
        dataIndex: "dictSort",
        valueType: "string",
      },
      {
        title: "备注",
        dataIndex: "remark",
        valueType: "string",
      }
    ];

    const formRules:FormRules = {
      dictLabel: [
        { required: true, message: "请输入字典标签", trigger: "blur", }
      ],
      dictValue: [
        {validator: (rule, value, callback) => {
          if(!value) {
            callback(new Error("请输入字典键值"))
          }
          else if (value && !/^[a-zA-Z0-9_-]*$/.test(value)) {
            callback(new Error("请输入英文和数字、下划线、中划线"))
          }else {
            callback()
          }
        }, trigger: "blur",required: true,}
      ],
      dictSort: [
        {validator: (rule, value, callback) => {
          if(!value) {
            callback(new Error("请输入字典排序"))
          }else if (value && !/^[0-9]*$/.test(value)) {
            callback(new Error("请输入数字"))
          }else {
            callback()
          }
        }, trigger: "blur",required: true,}
      ],
    };

    const remoteType = async (params:MES.DictDictDataPageListParams) => {
      try {
        const { data, } = await mesDictDictTypePageList(params);
        dictTypeList.value = data;
      }catch(error) {
        console.error(error);
				
      }
    };

    const readRequest = async (params: MES.DictDictDataPageListParams) => {
      params.dictType = dictType.value;
      return mesDictDictDataPageList(params);
    };

    const createRequest = async (params:MES.DictDataInParam) => {
      params.dictType = dictType.value;
      return mesDictAddDictData(params);
    };

    const remoteDict = async (params:MES.DictQueryDictDataInfoParams) => {
      return mesDictQueryDictDataInfo(params);
    };

    const updateRequest = async (params:MES.DictDataInParam) => {
      return mesDictUpdateDictData(params);
    };

    const deleteRequest = async (params:MES.DictDeleteDictDataParams) => {
      return mesDictDeleteDictData(params);
    };

    remoteType({current: 1,pageSize: 9999,});
		
    return {
      takeOffRef,
      readColumns,
      writeColumns,
      formRules,
      dictType,
      dictTypeList,
      readRequest,
      createRequest,
      remoteDict,
      updateRequest,
      deleteRequest,
    }
  },
})
</script>

<style lang="less">
.type-list {
	padding: 4px 0;
	display: flex;
	flex-direction: column;

	.page-header {
		height: 40px;
		border-bottom: 1px solid #F2F3F4;
		padding: 0 24px;
		display: flex;
		align-items: center;

		&-name {
			font-size: 16px;
			line-height: 22px;
			color: #181B28;
			margin-left: 8px;
		}
	}
}
</style>
