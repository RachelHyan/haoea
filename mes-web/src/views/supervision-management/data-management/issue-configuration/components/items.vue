<template>
  <div class="problem-items page-root">
    <div class="page-header">
      <el-icon
        color="#7E7E7E"
        style="cursor: pointer;"
        @click="$router.back"
      >
        <arrow-left />
      </el-icon>
      <p class="page-header-name">
        问题项
      </p>
    </div>
    <el-divider content-position="left">
      {{ problemType }} - 问题项配置
    </el-divider>
    <el-pro-crud
      ref="takeOffRef"
      row-key="problemItemId"
      :read-columns="readColumns"
      :write-columns="writeColumns"
      :write-rules="formRules"
      :read-request="readRequest"
      :create-request="createRequest"
      :read-item-request="fetchInfo"
      :update-request="updateRequest"
      :delete-request="deleteRequest"
      :with-menu="['create', 'update', 'delete']"
      :pro-table-props="{hiddenLabel:true,selectionChange}"
      :ext-params="extParams"
      @closed="userIds = []"
    >
      <template #read-toolbar-left="{size}">
        <el-button
          type="danger"
          :size="size"
          :disabled="!problemItemIds.length"
          @click="deleteSelection"
        >
          删除
        </el-button>
      </template>
      <template #read-column-rectifierCount="{row}">
        <el-tag type="success">
          {{ row.rectifierCount }}名
        </el-tag>
      </template>
      <template #write-form-enableStatus="{model}">
        <el-radio-group v-model="model.enableStatus">
          <el-radio
            v-for="item in enableStatus"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </template>
      <template #write-form-remarks="{model}">
        <el-input
          v-model="model.remarks"
          :rows="2"
          type="textarea"
          placeholder="请输入"
        />
      </template>
      <template #write-form-userIds>
        <el-select
          v-model="userIds"
          multiple
          placeholder="请选择"
          filterable
          clearable
        >
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
          />
        </el-select>
      </template>
    </el-pro-crud>
  </div>
</template>

<script lang="ts">
import { mesProblemItemAddProblemItem, mesProblemItemDeleteProblemItem, mesProblemItemProblemItemPageList, mesProblemItemQueryProblemItemInfo, mesProblemItemQueryRectifierUserList, mesProblemItemUpdateProblemItem } from "@/api/mes/problemItemController"
import { useDict } from "@/stores/dict"
import { useProject } from "@/stores/project"
import { ElMessage, ElMessageBox, FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus"
import { defineComponent, ref } from "vue"
import { useRoute } from "vue-router"

export default defineComponent({
  name: "ProblemItems",
  setup () {
    const route = useRoute();
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const problemType = decodeURIComponent(<string>route.query.type);
    const problemId = parseInt(<string>route.query.id);
    const takeOffRef = ref();
    const userList = ref<MES.RectifierUserDTO[]>([]);
    const problemItemIds = ref<number[]>([]);
    const userIds = ref<number[]>([]);
    const enableStatus = dict.$state.enableStatus;
    const extParams = {
      projectId,
      problemId,
    };

    const readColumns:ProTableColumn[] = [
      {
        title: "问题项",
        dataIndex: "problemItem",
        valueType: "string",
        search: true,
        placeholder: "问题项",
      },
      {
        title: "整改员",
        dataIndex: "rectifierCount",
        valueType: "string",
      },
      {
        title: "状态",
        dataIndex: "enableStatus",
        valueType: "string",
      }
    ];

    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "问题项",
        dataIndex: "problemItem",
        valueType: "string",
      },
      {
        title: "整改员",
        dataIndex: "userIds",
        valueType: "slot",
      },
      {
        title: "状态",
        dataIndex: "enableStatus",
        valueType: "slot",
      },
      {
        title: "备注",
        dataIndex: "remarks",
        valueType: "slot",
      }
    ];

    const formRules:FormRules = {
      problemItem: [
        { required: true, message: "请输入问题项", trigger: "blur", }
      ],
      enableStatus: [
        { required: true, message: "请选择状态", trigger: "change", }
      ],
    };

    const fetchUserList = async () => {
      try {
        const { data, } = await mesProblemItemQueryRectifierUserList({projectId,});
        userList.value = data;
      } catch (error) {
        console.error(error);
				
      }
    };

    const selectionChange = (selections: MES.ProblemItemDTO[]) => {
      problemItemIds.value = selections.map(({ problemItemId, }) => problemItemId);
    };

    const readRequest = async (params:MES.ProblemItemProblemItemPageListParams) => {
      return mesProblemItemProblemItemPageList(params);
    };

    const createRequest = async (params:MES.ProblemItemInParam) => {
      return mesProblemItemAddProblemItem({...params,userIds:userIds.value,});
    };

    const fetchInfo = async (params:MES.ProblemItemQueryProblemItemInfoParams) => {
      try {
        const res =  await mesProblemItemQueryProblemItemInfo(params);
        userIds.value = res.data.userIds || [];
        return res;
      } catch (error) {
        console.error(error);
      }
    };

    const updateRequest = async (params: MES.ProblemItemInParam) => {
      return mesProblemItemUpdateProblemItem({...params,userIds:userIds.value,});
    };
      
    const deleteRequest = async (params: {problemItemId: number}) => {
      return mesProblemItemDeleteProblemItem({objectIds: [params.problemItemId],});
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${problemItemIds.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesProblemItemDeleteProblemItem({objectIds:problemItemIds.value,});
              done();
              instance.confirmButtonLoading = false;
              ElMessage.success("删除成功");
              takeOffRef.value.load();
            } catch (error) {
              done();
            }
          } else {
            done();
          }
        },
      }).catch(() => {
        // 为了不让控制台报 Uncaught (in promise) cancel
      });
    };

    fetchUserList();

    return {
      extParams,
      takeOffRef,
      readColumns,
      writeColumns,
      problemType,
      formRules,
      userList,
      problemItemIds,
      enableStatus,
      userIds,
      selectionChange,
      readRequest,
      createRequest,
      fetchInfo,
      updateRequest,
      deleteRequest,
      deleteSelection,
    }
  },
})
</script>

<style lang="less">
.problem-items {
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
