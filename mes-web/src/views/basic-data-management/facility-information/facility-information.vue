<template>
  <div class="facility-information page-root">
    <card-header title="设施信息" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="id"
      :read-columns="readColumns"
      :ext-params="extParams"
      :read-request="readRequest"
      :with-menu="['delete']"
      :pro-table-props="{selectionChange,hiddenLabel:true}"
      :delete-request="deleteRequest"
    >
      <template #read-toolbar-left="{size}">
        <el-button
          type="danger"
          :size="size"
          :disabled="!facilityPointIds.length"
          @click="deleteSelection"
        >
          删除
        </el-button>
      </template>
      <template #toolbar-right="{size}">
        <el-button
          type="primary"
          :size="size"
          @click="handleAdd"
        >
          新增
        </el-button>
      </template>
      <template #write-column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="handlerEdit(row.id)"
        >
          编辑
        </el-button>
      </template>
    </el-pro-crud>
    <facility-form
      ref="facilityRef"
      v-model="facilityVisible"
      :form-methods="formMethods"
      :contact-user-items="contactUserItems"
      :grid-list="gridList"
      @closed="takeOffRef.load()"
    />
  </div>
</template>

<script lang="ts">
import { mesFacilityPointDeleteFacilityPoint, mesFacilityPointFacilityPointPageList, mesFacilityPointQueryGridListByProjectId } from "@/api/mes/facilityPointController";
import { mesUserQueryAllUserList } from "@/api/mes/userController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { Location } from "@element-plus/icons-vue";
import type { ProTableColumn } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { defineComponent, ref } from "vue";
import facilityForm from "./components/facility-form.vue";

export default defineComponent({
  name:"FacilityInformation",
  components:{
    CardHeader,
    facilityForm,
  },
  setup () {
    const project = useProject();
    const dict = useDict();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const facilityRef = ref();
    const facilityVisible = ref<boolean>(false);
    const formMethods = ref<"add" | "update">("add");
    const contactUserItems = ref<any>([]);
    const gridList = ref<any>([]);
    const facilityPointIds = ref<number[]>([]);
    const extParams = {projectId,};

    const readColumns:ProTableColumn[] = [
      {
        title: "名称",
        dataIndex: "facilityName",
        valueType: "string",
        search: true,
        placeholder: "名称",
      },
      {
        title: "类型",
        dataIndex: "facilityType",
        valueType: "enum",
        search: true,
        placeholder: "类型",
        valueEnum: dict.$state.facilityType,
      },
      {
        title: "负责人",
        dataIndex: "contactPerson",
        valueType: "string",
        search: true,
        placeholder: "负责人",
      },
      {
        title: "联系方式",
        dataIndex: "contactPhone",
        valueType: "string",
      },
      {
        title: "所属网格",
        dataIndex: "gridName",
        valueType: "string",
        search: true,
        placeholder: "所属网格",
      },
      {
        title: "详细地址",
        dataIndex: "fullAddress",
        valueType: "string",
      }
    ];

    const selectionChange = (selections:MES.FacilityPointDTO[]) => {
      facilityPointIds.value = selections.map(({id,}) => id as number);
    };

    const readRequest = async (params:MES.FacilityPointFacilityPointPageListParams) => {
      return mesFacilityPointFacilityPointPageList(params);
    };

    const deleteRequest = async (params: {id: number}) => {
      return mesFacilityPointDeleteFacilityPoint({facilityPointIds: [params.id],});
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${facilityPointIds.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesFacilityPointDeleteFacilityPoint({facilityPointIds:facilityPointIds.value,});
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

    const handleAdd = () => {
      formMethods.value = "add";
      facilityVisible.value = true;
    };

    const handlerEdit = (id:number) => {
      formMethods.value = "update";
      facilityVisible.value = true;
      facilityRef.value.fetchInfo({id,});
    };

    const fetchGridList = async () => mesFacilityPointQueryGridListByProjectId({projectId,}).then(({data,}) => data);

    const fetchUserList = async () => mesUserQueryAllUserList({projectId,}).then(({data,}) => data);

    Promise.all([fetchGridList(),fetchUserList()])
      .then(([gridData,userData]) => {
        gridList.value = gridData.map(({gridName,gridId,}) => ({label: gridName,value: gridId,}));
        contactUserItems.value = userData;
      })
      .catch(console.error);

    return {
      takeOffRef,
      facilityRef,
      facilityVisible,
      formMethods,
      contactUserItems,
      gridList,
      readColumns,
      facilityPointIds,
      extParams,
      handleAdd,
      handlerEdit,
      readRequest,
      deleteRequest,
      selectionChange,
      deleteSelection,
      Location,
    }
  },
})
</script>

<style lang="less">
.facility-information {
	.search-list {
			background-color: #fff;
			width: 100%;
			height: 150px;
			box-sizing: border-box;
			padding:0 10px;
			border: 1px solid #e6e6e6;

			&__empty {
				line-height: 150px;
				text-align: center;
				color: #90929D;
			}

			&__item {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				border-bottom: 1px solid #e6e6e6;
				&--name {
					font-size: 14px;
				}
				&--address {
					font-size: 12px;
					color: #90929D;
				}
			}
		}

		.detail {
			width: 100%;
			margin-top: 50px;
			// margin-left: -30px;
		}
}
</style>
