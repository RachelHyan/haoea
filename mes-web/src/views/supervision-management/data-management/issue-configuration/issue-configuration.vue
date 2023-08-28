<template>
  <router-view v-if="['issue-configuration-items'].includes(currentRouteName)" />
  <div
    v-else
    class="issue-configuration page-root"
  >
    <card-header title="问题配置" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="problemId"
      :read-columns="readColumns"
      :write-columns="writeColumns"
      :write-rules="writeRules"
      :pro-table-props="{hiddenLabel:true,selectionChange}"
      :read-request="readRequest"
      :delete-request="deleteRequest"
      :create-request="createRequest"
      :update-request="updateRequest"
      :read-item-request="fetchInfo"
      :ext-params="extParams"
    >
      <template #read-toolbar-left="{size}">
        <el-button
          type="danger"
          :size="size"
          :disabled="!problemIds.length"
          @click="deleteSelection"
        >
          删除
        </el-button>
      </template>
      <template #write-column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="router.push({name:'issue-configuration-items',query:{id:row.problemId,type:encodeURIComponent(row.problemType)}})"
        >
          问题项
        </el-button>
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
    </el-pro-crud>
  </div>
</template>

<script lang="ts">
import { mesProblemAddProblem, mesProblemDeleteProblem, mesProblemProblemPageList, mesProblemQueryProblemInfo, mesProblemUpdateProblem } from "@/api/mes/problemController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import { ElMessage, ElMessageBox, FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProblemConfiguration",
  components:{
    CardHeader,
  },
  setup () {
    const router = useRouter();
    const dict = useDict();
    const project = useProject();
    const currentRouteName = computed<string>(() => <string>router.currentRoute.value.name);
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const problemIds = ref<number[]>([]);
    const enableStatus = dict.$state.enableStatus;
    const extParams = {
      projectId,
    };

    const readColumns:ProTableColumn[] = [
      {
        title: "场所",
        dataIndex: "place",
        valueType: "enum",
        search: true,
        placeholder: "场所",
        valueEnum: dict.$state.pointType,
      },
      {
        title: "问题类型",
        dataIndex: "problemType",
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
        title: "场所",
        dataIndex: "place",
        valueType: "enum",
        valueEnum: dict.$state.pointType,
      },
      {
        title: "问题类型",
        dataIndex: "problemType",
        valueType: "string",
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

		 const writeRules:FormRules = {
      place: [
        { required: true, message: "请选择场所", trigger: "change", }
      ],
      problemType: [
        { required: true, message: "请输入问题类型", trigger: "change", }
      ],
      enableStatus: [
        { required: true, message: "请选择状态", trigger: "change", }
      ],
    };

    const selectionChange = (selections: MES.ProblemDTO[]) => {
      problemIds.value = selections.map(({ problemId, }) => problemId);
    };

    const readRequest = async (params:MES.ProblemProblemPageListParams) => {
      return mesProblemProblemPageList(params);
    };

    const createRequest = async (params:MES.ProblemInParam) => {
      return mesProblemAddProblem(params);
    };

    const fetchInfo = async (params:MES.ProblemQueryProblemInfoParams) => {
      return  mesProblemQueryProblemInfo(params);
    };

    const updateRequest = async (params: MES.ProblemInParam) => {
      return mesProblemUpdateProblem(params);
    };

    const deleteRequest = async (params: {problemId: number}) => {
      return mesProblemDeleteProblem({objectIds: [params.problemId],});
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${problemIds.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesProblemDeleteProblem({objectIds:problemIds.value,});
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
		
    return {
      router,
      currentRouteName,
      takeOffRef,
      problemIds,
      enableStatus,
      extParams,
      readColumns,
      writeColumns,
      writeRules,
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

<style scoped>

</style>
