<template>
  <draggable
    :width="isPanelCollapsed ? 44 : 450"
    :top="70"
    :right="16"
    boundary
  >
    <template #content>
      <div
        v-show="!isPanelCollapsed"
        class="right-panel"
      >
        <div
          class="right-panel-header"
        >
          <img
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/object-allocation-import.png"
            alt=""
            class="icon-import"
            width="20"
            height="20"
            @click="importVisible = true"
          >
          <img
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/object.png"
            alt=""
            class="icon-normal"
            width="20"
            height="20"
            @click="isPanelCollapsed = !isPanelCollapsed"
          >
          <h5
            class="right-panel-header-title"
          >
            对象列表
          </h5>
        </div>
        <el-pro-table
          ref="tableRef"
          row-key="userId"
          :class="isPanelCollapsed ? 'right-panel-body--collapsed' : ''"
          :columns="readColumns"
          :request="fetchObjectList"
          hidden-label
          default-size="small"
          :with-tools="[]"
        >
          <template #form-gridIds="{ model }">
            <el-select
              v-model="model.gridIds"
              clearable
              filterable
              placeholder="队别"
              multiple
              collapse-tags
              collapse-tags-tooltip
              style="min-width: 180px;"
            >
              <el-option
                v-for="item in gridOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <template #custom-table>
            <div
              v-if="objectList?.length !== 0"
              class="right-panel-table-body"
            >
              <div
                v-for="(item,index) in objectList"
                :key="index"
                class="right-panel-table-body-item"
                :style="{backgroundColor: currentObjectId === item.objectId ? '#F1F8FF' : '#fff'}"
                @click="$emit('clickObject',item)"
              >
                <div>
                  <div>对象名称：{{ item.objectName }}</div>
                  <div class="right-panel-table-body-item__chargeName">
                    队长：
                    <el-tooltip
                      v-for="(user,i) in item.mapUserList"
                      :key="i"
                      effect="dark"
                      placement="top"
                    >
                      <template #content> 
                        {{ user.phone }}
                      </template>
                      <el-button
                        type="primary"
                        link
                        class="right-panel-table-body-item__chargeName--button"
                      >
                        {{ user.name }}
                      </el-button>
                    </el-tooltip>
                  </div>
                  <div class="right-panel-table-body-item__row">
                    <div class="right-panel-table-body-item__row--first">
                      作业时间：{{ (item.jobStartTime && item.jobEndTime) ? item.jobStartTime.slice(0,5) + "-" + item.jobEndTime.slice(0,5) : '' }}
                    </div>
                    <div class="right-panel-table-body-item__row--second">
                      作业频次：{{ item.cleaningCount !== 0 ? item.cleaningCount : '' }}
                    </div>
                  </div>
                  <div class="right-panel-table-body-item__row">
                    <div class="right-panel-table-body-item__row--first">
                      作业人员: {{ item.userName }}
                    </div>
                  </div>
                </div>
                <div>
                  <el-button
                    type="primary"
                    link
                    @click.stop="$emit('handleObjectDetail',item)"
                  >
                    详情
                  </el-button>
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
          src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/object.png"
          alt=""
          style="cursor: pointer;"
          width="20"
          height="20"
          @click="isPanelCollapsed = !isPanelCollapsed"
        >
      </div>
    </template>
  </draggable>
  <el-pro-dialog
    v-model:model-value="importVisible"
    class="import"
    :title="'批量排班'"
    @closed="() => fileList = []"
  >
    <el-upload
      ref="uploadExcelRef"
      v-model:file-list="fileList"
      class="upload"
      drag
      :limit="1"
      accept=".xlsx"
      :auto-upload="false"
      :http-request="uploadRequest"
      :on-exceed="handleExceed"
      :on-change="handleFileChange"
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        <div>将文件拖到此处，或<em>点击上传</em></div>
        <div style="color:#BE0D0D">
          请使用下载模版填写数据导入
        </div>
      </div>
    </el-upload>
    <template #footer>
      <div class="import-footer">
        <el-button
          type="primary"
          plain
          @click="handlerShiftExport"
        >
          排班模板
        </el-button>
        <el-button
          type="primary"
          plain
          @click="handlerReplaceExport"
        >
          更换模板
        </el-button>
        <el-dropdown
          style="cursor: pointer;"
          @command="handleCommand"
        >
          <el-button
            type="primary"
            :loading="importLoading"
            :disabled="!fileList.length"
          >
            导入
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="replace">
                批量更换
              </el-dropdown-item>
              <el-dropdown-item command="shift">
                批量排班
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button
          type="danger"
          plain
          @click="importVisible = false"
        >
          取消
        </el-button>
      </div>
    </template>
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesJobObjectQueryJayaGridSwitchList } from "@/api/mes/jobObjectController";
import { mesObjectAllotQueryJayaMapObjectPlanPageList } from "@/api/mes/objectAllotController";
import { Draggable } from "@/components";
import { useProject } from "@/stores/project";
import { importJayaPlanBindingExcel } from "@/utils/importApi";
import axios from "axios";
import { ElMessage, ProTableColumn, UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions, UploadUserFile, genFileId } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "RightPanel",
  components: {
    Draggable,
  },
  props: {
    currentObjectId: {
      type: Number,
      default: 0,
    },
  },
  emits:["clickObject","handleObjectDetail"],
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const tableRef = ref();
    const isPanelCollapsed = ref(false);
    const objectList = ref<MES.JayaMapObjectPlanDTO[]>(); // 对象列表
    const uploadExcelRef = ref<UploadInstance>();
    const exportLoading = ref<boolean>(false);
    const params = reactive<any>({projectId,type:"Manual_cleaning",});
    const exportParams = reactive<any>({projectId,type:"Manual_cleaning",});
    const importVisible = ref<boolean>(false);
    const importLoading = ref<boolean>(false);
    const fileList = ref<UploadUserFile[]>([]);
    const gridOptions = ref(); // 队长列表
    const importType = ref(1);

    const readColumns:ProTableColumn[] = [
      {
        title:"对象名称",
        dataIndex:"objectName",
        valueType:"string",
        hidden:true,
        search:true,
        placeholder: "对象名称",
      },
      {
        title: "队别",
        dataIndex: "gridIds",
        valueType: "slot",
        hidden: true,
        search: true,
      }
    ];

    const fetchGridList = async () => {
      const params = {
        projectId,
        type: "Manual_cleaning",
      }
      try {
        const {data,} = await mesJobObjectQueryJayaGridSwitchList(params);
        gridOptions.value = data.map((item:any) => ({
          value: item.gridId,
          label: item.gridName,
        }));
      } catch (error) {
        console.error(error);
				
      }
    };

    const fetchObjectList = async (params:MES.ObjectAllotQueryJayaMapObjectPlanPageListParams) => {
      params.projectId = projectId;
      params.type = "Manual_cleaning";
      params.gridIds?.length === 0 ? (params.gridIds = undefined) : (params.gridIds = params.gridIds?.toString());
      exportParams.gridIds = params.gridIds;
      exportParams.objectName = params.objectName;
      try {
        const res = await mesObjectAllotQueryJayaMapObjectPlanPageList(params);
        objectList.value = res.data;
				
        return res;
      } catch (error) {
        console.error(error);
				
      }
    };

    const handleExceed: UploadProps["onExceed"] = (files) => {
      uploadExcelRef.value?.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadExcelRef.value?.handleStart(file);
    };

    const handleFileChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
      fileList.value = uploadFiles;
    };

    const uploadRequest = async (options: UploadRequestOptions) => {
      importLoading.value = true;
      params.excel = importType.value;
      try {
        const { success, } = await importJayaPlanBindingExcel(params,options.file);
        if (success) {
          ElMessage.success("导入成功");
          tableRef.value.load();
          importVisible.value = false;
        }
      } catch (error) {
        console.error(error);
				
      } finally {
        importLoading.value = false;
      }
    };

    const handleCommand = (command: string | number | object) => {
      switch(command){
      case "replace": 
        importType.value = 1;
        uploadExcelRef.value?.submit();
        break;
      case "shift":
        importType.value = 0;
        uploadExcelRef.value?.submit();
        break
      }
    };

    const handlerReplaceExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/objectAllot/exportJayaPlanBindingExcel",
          method: "post",
          params: exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "批量更换模板(人工)";
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
          ElMessage.success("导出成功！");
        }
      } catch (error) {
        console.error(error);
      } finally {
        exportLoading.value = false;
      }
    };

    const handlerShiftExport = async () => {
      exportLoading.value = true;
      try {
        const {data, status,} = await axios({
          url: "/api/mes/objectAllot/exportJayaObjectExcel",
          method: "post",
          params: exportParams,
          responseType: "blob",
        });
        if(status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "批量排班模板(人工)";
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
          ElMessage.success("导出成功！");
        }
      } catch (error) {
        console.error(error);
      } finally {
        exportLoading.value = false;
      }
    };

    fetchGridList();

    return {
      tableRef,
      uploadExcelRef,
      isPanelCollapsed,
      readColumns,
      objectList,
      exportLoading,
      importVisible,
      importLoading,
      fileList,
      gridOptions,
      fetchObjectList,
      handlerReplaceExport,
      handlerShiftExport,
      handleExceed,
      handleFileChange,
      uploadRequest,
      handleCommand,
    }
  },
})
</script>

<style lang="less">
	.right-panel {
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
				left: 50px;
				cursor: pointer;
			}

			.icon-import {
				position: absolute;
				left: 24px;
				cursor: pointer;
			}
		}

		.el-pro-table-toolbar {
			margin-top: 10px;
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

		&-table-body {
			height: 350px;
			overflow: hidden;
			overflow-y: auto;
			
			&::-webkit-scrollbar {
				width: 3px;
			}

			&::-webkit-scrollbar-thumb {
				background: rgba(0,0,0,0.2);
				border-radius: 50px;
			}

			&::-webkit-scrollbar-track {
					border-radius: 0;
					background: rgba(0,0,0,0.1);
			}

			&-item {
				display: flex;
				justify-content: space-between;
				padding: 10px;
				border-radius: 5px;
				cursor: pointer;

				&__chargeName {
					&--button {
						margin: 0;
					}
				}

				&__row {
					display: flex;

					&--first {
						width: 200px;
						// margin-right: 5px;
					}
					
					&--second {
						width: 150px;
					}
				}
			}
		}
	}

	.import {
			.upload {
				margin: 40px 26px;

				.el-upload__text {
					font-size: 12px;
				}
			}

			&-footer {
				display: flex;
				justify-content: space-evenly;
				align-items: center;
			}
		}
</style>
