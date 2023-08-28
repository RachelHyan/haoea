<template>
  <div class="rule-group-management page-root">
    <card-header title="规则组管理" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="ruleGroupId"
      :read-columns="readColumns"
      :read-request="readRequest"
      :with-menu="[]"
      :pro-table-props="{hiddenLabel:true}"
    >
      <template
        #toolbar-right="{size}"
      >
        <el-button
          type="primary"
          :size="size"
          @click="showModul.addRuleGroup = true, showModul.editStatus = false"
        >
          新增
        </el-button>
      </template>
      <template #read-custom-table>
        <div class="table-container">
          <el-card
            v-for="item in listData"
            :key="item.ruleGroupId"
            class="box-card"
          >
            <div class="box-card--container">
              <div class="container-left">
                <div class="container-item">
                  <div class="container-item--title">
                    {{ item.ruleGroupName }}
                  </div>
                  <div>
                    <el-switch
                      v-model="item.isDefault"
                      :disabled="item.isSystem === 1 && item.isDefault === 1 ? true : false"
                      :active-value="1"
                      :inactive-value="0"
                      @change="handlerDefault(item)"
                    />
                    <span v-show="item.isDefault === 1 ? true : false">已设默认</span>
                  </div>
                </div>
                <div class="container-item">
                  <div class="container-item--title" />
                  <div>
                    <div
                      v-for="tag in item.rules"
                      :key="tag"
                    >
                      <div class="container-item--tag">
                        {{ tag }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="container-item">
                  <div class="container-item--title">
                    规则类型
                  </div>
                  <div class="container-item--tag">
                    {{ item.ruleGroupType }}
                  </div>
                </div>
              </div>
              <div
                v-if="!item.isSystem"
                class="container-right"
              >
                <el-button
                  type="primary"
                  link
                  @click="handlerEdit(item)"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  link
                  @click="handlerDelete(item)"
                >
                  删除
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
        <div
          v-if="listData.length === 0"
          class="table-none"
        >
          暂无数据
        </div>
      </template>
    </el-pro-crud>
  </div>
  <add-rule-group-dialog
    v-if="showModul.addRuleGroup"
    v-model:model-value="showModul.addRuleGroup"
    :edit-status="showModul.editStatus"
    :row-rule-group-id="editRuleGroupId"
    :rule-types="ruleTypes"
    :rule-group-types="ruleGroupTypes"
    @update="takeOffRef.load(),showModul.editStatus = false"
    @finish="takeOffRef.load(),showModul.editStatus = false"
  />
</template>

<script lang="ts">
import { mesRuleDeleteRuleGroup, mesRuleRuleGroupPageList, mesRuleUpdateDefaultStatus } from "@/api/mes/ruleController";
import { CardHeader } from "@/components";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import type { ProTableColumn } from "element-plus";
import { Action, ElMessage, ElMessageBox } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import AddRuleGroupDialog from "./add-edit/index.vue";

type ShowModul = {
	addRuleGroup: boolean;
	editStatus: boolean;
};

export default defineComponent({
  name: "RuleGroupManagement",
  components:{
    CardHeader,
    AddRuleGroupDialog,
  },
  setup () {
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const listData = ref<any[]>([]);
    const editRuleGroupId = ref(0);
    const showModul = reactive<ShowModul>({ addRuleGroup: false, editStatus: false, });
    const ruleTypes = dict.$state.ruleType;
    const ruleGroupTypes = dict.$state.ruleGroupType;
    const readColumns:ProTableColumn[] = [
      {
        title:"规则组名称",
        dataIndex:"ruleGroupName",
        valueType:"string",
        hidden:true,
        search:true,
        placeholder: "规则组名称",
      }
    ];

    const readRequest = async (params:MES.RuleRuleGroupPageListParams) => {
      params.projectId = projectId;
      try {
        const res = await mesRuleRuleGroupPageList(params);
        listData.value = res.data;
        return res
      } catch (error) {
        console.error(error);
				
      }
    };

    const handlerEdit = (row:any) => {
      showModul.editStatus = true;
      editRuleGroupId.value = row.ruleGroupId;
      showModul.addRuleGroup = true;
    };

    const handlerDelete = (rowData:any) => {
      ElMessageBox({
        title: "提示",
        type: "warning",
        message: `确定要删除${rowData.ruleGroupName}这一条数据吗？`,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        callback: async (action: Action) => {
          if (action === "confirm") {
            try {
              const params = {
                projectId,
                ruleGroupId: rowData.ruleGroupId,
                ruleGroupType: changeRuleGroupType(rowData.ruleGroupType),
              };
              const { success, } = await mesRuleDeleteRuleGroup(params);
              if (success) {
                ElMessage.success("删除成功！");
                takeOffRef.value.load();
              }
            } catch (error) {
              console.error(error);
            }
          }
        },
      });
    };

    const handlerDefault = (rowData:any) => {
      ElMessageBox({
        title: "提示",
        type: "warning",
        message: `确定要将${rowData.ruleGroupName}${rowData.isDefault ? "设为" : "取消"}默认吗？`,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        callback: async (action: Action) => {
          if (action === "confirm") {
            try {
              const params = {
                projectId,
                isDefault: rowData.isDefault,
                ruleGroupId: rowData.ruleGroupId,
                ruleGroupType: changeRuleGroupType(rowData.ruleGroupType),
              };
              const { success, } = await mesRuleUpdateDefaultStatus(params);
              if (success) {
                ElMessage.success("设置成功！");
                takeOffRef.value.load();
              }
            } catch (error) {
              console.error(error);
            }
          }else {
            takeOffRef.value.load();
          }
        },
      });
    };

    const changeRuleGroupType = (type:string) => {
      switch (type) {
      case "考勤督查":
        return "clocking-in"
      case "质量督查":
        return "quality"
      case "加班考勤督查":
        return "overtime-clocking-in"
      default:
        return "overtime-quality"
      }
    };

    return {
      takeOffRef,
      readColumns,
      listData,
      editRuleGroupId,
      showModul,
      ruleTypes,
      ruleGroupTypes,
      readRequest,
      handlerEdit,
      handlerDelete,
      handlerDefault,
    }
  },
})
</script>

<style lang="less">
.rule-group-management {

	.table-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 20px;

		.box-card {

			&--container {
				display: flex;
				justify-content: space-between;
				height: 100%;

				.container-left {
					width: 80%;

					.container-item {
						display: grid;
						grid-template-columns: .5fr 1fr;
						align-items: center;
						margin: 5px;

						&--title {
							min-width: 70px;
						}

						&--tag {
							background-color: #ecf5ff;
							color: #3d99f0;
							border-radius: 4px;
							padding: 5px;
							margin-bottom: 5px;
							white-space:pre-wrap;
						}
					}
				}

				.container-right {
					display: flex;
					align-items: center;
				}
			
			}
		}
	}

	.table-none {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 140px;
		color: #999;
	}
}
</style>
