<template>
  <draggable
    :width="isPanelCollapsed ? 44 : 450"
    :top="16"
    :left="16"
    boundary
  >
    <template #content>
      <div
        v-show="!isPanelCollapsed"
        class="left-panel"
      >
        <div
          class="left-panel-header"
        >
          <h5
            class="left-panel-header-title"
          >
            人员预警
          </h5>
          <img
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/warning.png"
            alt=""
            class="icon-normal"
            width="20"
            height="20"
            @click="isPanelCollapsed = !isPanelCollapsed"
          >
        </div>
        <el-pro-table
          ref="tableRef"
          row-key="userId"
          :class="isPanelCollapsed ? 'left-panel-body--collapsed' : ''"
          :columns="readColumns"
          :request="fetchWarningList"
          hidden-label
          default-size="small"
          :with-tools="[]"
        >
          <template #form-orgIds="{ model }">
            <el-tree-select
              v-model="model.orgIds"
              :data="orgTreeData"
              :clearable="true"
              check-strictly
              multiple
              collapse-tags
              collapse-tags-tooltip
              :render-after-expand="false"
              placeholder="所属组织"
              no-data-text="暂无选项"
              accordion
              show-checkbox
              node-key="id"
              :props="defaultProps"
              style="min-width: 180px;"
            />
          </template>
          <template #custom-table>
            <div
              v-if="warningList?.length !== 0"
              class="table-body"
            >
              <div
                v-for="item in warningList"
                :key="item.userId"
                class="table-body-item"
              >
                <img
                  class="table-body-item--left"
                  :src="item.userHeadUrl"
                >
                <div class="table-body-item--center">
                  <div>{{ item.userName }}（{{ item.userType }}）</div>
                  <div class="table-body-item--center__flex">
                    <div>所属组织：</div>
                    <div
                      v-if="item.orgNames"
                      class="table-body-item--center__flex--item"
                    >
                      <el-tooltip
                        effect="dark"
                        placement="top"
                      >
                        <template #content> 
                          {{ item.orgNames }}
                        </template>
                        {{ item.orgNames }}
                      </el-tooltip>
                    </div>
                    <div v-else>
                      暂无
                    </div>
                  </div>
                  <div class="table-body-item--center__flex">
                    <div>组织负责人：</div>
                    <div
                      v-if="item.mapUserList.length > 0"
                      class="table-body-item--center__flex--item"
                    >
                      <el-tooltip
                        v-for="(user,index) in item.mapUserList"
                        :key="index"
                        effect="dark"
                        placement="top"
                      >
                        <template #content> 
                          {{ user.phone }}
                        </template>
                        <el-button
                          type="primary"
                          link
                        >
                          {{ user.name }}
                        </el-button>
                      </el-tooltip>
                    </div>
                    <div
                      v-else
                    >
                      暂无
                    </div>
                  </div>
                </div>
                <div class="table-body-item--right">
                  未排班
                </div>
              </div>
            </div>
            <div
              v-else
              style="text-align: center;color: #ccc;"
            >
              暂无数据
            </div>
          </template>
        </el-pro-table>
      </div>
      <div
        v-show="isPanelCollapsed"
        class="icon-collapsed"
      >
        <img
          src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/warning.png"
          alt=""
          style="cursor: pointer;"
          width="20"
          height="20"
          @click="isPanelCollapsed = !isPanelCollapsed"
        >
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { mesObjectAllotQueryJayaMapUserEarlyWarningInfo } from "@/api/mes/objectAllotController";
import { Draggable } from "@/components";
import { useProject } from "@/stores/project";
import { ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "LeftPanel",
  components: {
    Draggable,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const tableRef = ref();
    const isPanelCollapsed = ref<boolean>(false);
    const warningList = ref<MES.JayaMapUserEarlyWarningDTO[]>(); // 预警列表
    const orgTreeData = reactive<any[]>([]);
    const defaultProps = {
      label:"orgName",
      children:"children",
    };
		
    const readColumns:ProTableColumn[] = [
      {
        title:"作业人员",
        dataIndex:"userName",
        valueType:"string",
        hidden:true,
        search:true,
        placeholder: "作业人员",
      },
      {
        title: "组织",
        dataIndex: "orgIds",
        valueType: "slot",
        hidden: true,
        search: true,
        placeholder:"组织",
      }
    ];

    const fetchWarningList = async (params:MES.ObjectAllotQueryJayaMapUserEarlyWarningInfoParams) => {
      params.projectId = projectId;
      params.userType = "vehicle";
      params.orgIds?.length === 0 ? (params.orgIds = undefined) : (params.orgIds = params.orgIds?.toString());

      try {
        const res = await mesObjectAllotQueryJayaMapUserEarlyWarningInfo(params);
        warningList.value = res.data;
				
        return res;
      } catch (error) {
        console.error(error);
				
      }
    };

    const remoteOrg = async () => {
      try {
        const { data, success, } = await mesDepartmentQueryOrgTreeList({ projectId, });
        success && orgTreeData.push(...data);
      } catch (error) {
        console.error(error);
				
      }
    };

    remoteOrg();

    return {
      tableRef,
      isPanelCollapsed,
      readColumns,
      warningList,
      orgTreeData,
      defaultProps,
      fetchWarningList,
    }
  },
})
</script>

<style lang="less">
	.left-panel {
		min-height: 150px;
		max-height: calc(100vh - 180px);
		background-color: #fff;
		display: flex;
		flex-direction: column;
		position: relative;
		box-shadow: 0 1px 4px 2px rgb(0 0 0 / 11%);

		&-header {
			height: 38px;
			padding: 0 24px;
			border-bottom: 1px solid #F2F3F4;
			display: flex;
			align-items: center;
			justify-content: center;

			&-title {
				font-size: 18px;
			}

			.icon-normal {
				position: absolute;
				right: 24px;
				cursor: pointer;
			}
		}

		&-body {
			flex: 1;

			.el-pro-table-body {
				width: 100%;
				box-sizing: border-box;
			}

			&--collapsed {

				.el-pro-table-body {
					display: none;
				}
			}

		}
	}
</style>
