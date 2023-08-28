<template>
  <div class="operation-log page-root">
    <card-header title="操作日志" />
    <el-pro-table
      ref="proTableRef"
      row-key="operId"
      :columns="columns"
      :request="readRequest"
      :hidden-label="true"
    >
      <template #form-operTime="{ model }">
        <el-date-picker
          v-model="model.operTime"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          clearable
        />
      </template>
      <template #toolbar-left>
        <!-- <el-button
          type="danger"
          plain
          :size="size"
          :disabled="operIds.length ? true : false"
          @click="deleteSelection"
        >
          删除
        </el-button>
        <el-button
          type="success"
          plain
          :size="size"
          :loading="exportLoading"
          @click="handlerExport"
        >
          导出
        </el-button> -->
      </template>
      <template #column-businessType="{row}">
        <el-tag :type="row.businessType === 3 || row.businessType === 7 ? 'danger' : ''">
          {{ columns[2].valueEnum?.find(({value}) => value === row.businessType)?.label }}
        </el-tag>
      </template>
      <template #column-status="{row}">
        <el-tag :type="row.status ? 'danger': 'success'">
          {{ row.status ? '失败': '成功' }}
        </el-tag>
      </template>
      <template #column-optional="{row}">
        <el-button
          type="primary"
          :icon="View"
          link
          @click="handlerDetail(row)"
        >
          详情
        </el-button>
      </template>
    </el-pro-table>
    <el-pro-dialog
      v-model:model-value="visible"
      title="操作日志详情"
      :width="'30%'" 
      class="operation-log-detail"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="detail-label">
            操作模块：
          </div>
          <div class="detail-content">
            {{ detailData.title }} / {{ detailData.businessType }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="detail-label">
            请求地址：
          </div>
          <div class="detail-content">
            {{ detailData.operUrl }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="detail-label">
            登录信息：
          </div>
          <div class="detail-content">
            {{ `${detailData.operName} / ${detailData.operIp} / 内网IP` }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="detail-label">
            请求方式：
          </div>
          <div class="detail-content">
            {{ detailData.requestMethod }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="detail-label">
            操作方法：
          </div>
          <div class="detail-content">
            {{ detailData.method }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="detail-label">
            请求参数：
          </div>
          <div class="detail-content">
            {{ detailData.operParam }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="detail-label">
            返回参数：
          </div>
          <div class="detail-content">
            {{ detailData.jsonResult }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="detail-label">
            操作状态：
          </div>
          <div class="detail-content">
            {{ detailData.status }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="detail-label">
            操作时间：
          </div>
          <div class="detail-content">
            {{ detailData.operTime }}
          </div>
        </el-col>
      </el-row>
      <template #footer>
        <el-button @click="visible = false">
          关闭
        </el-button>
      </template>
    </el-pro-dialog>
  </div>
</template>

<script lang="ts">
import { mesOperLogSelectJayaOperLogInfo, mesOperLogSelectJayaOperLogPageList } from "@/api/mes/operLogController";
import { CardHeader } from "@/components";
import { View } from "@element-plus/icons-vue";
import axios from "axios";
import { ElMessage, ElMessageBox, ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "OperationLog",
  components: {CardHeader,},
  setup() {
    const proTableRef = ref();
    const exportLoading = ref<boolean>(false);
    const exportParams = ref<any>();
    const operIds = ref<number[]>([]);
    const visible = ref<boolean>(false);
    const detailData = ref<MES.OperLogInfo>({});
    const columns: ProTableColumn[] = [
      {
        title: "日志编号",
        dataIndex: "operId",
        valueType: "string",
      },
      {
        title: "系统模块",
        dataIndex: "title",
        valueType: "string",
        search: true,
        placeholder: "系统模块",
      },
      {
        title: "操作类型",
        dataIndex: "businessType",
        valueType: "enum",
        valueEnum: [
          { label: "其他", value: 0, },
          { label: "新增", value: 1, },
          { label: "修改", value: 2, },
          { label: "删除", value: 3, },
          { label: "导出", value: 5, },
          { label: "导入", value: 6, },
          { label: "强退", value: 7, }
        ],
        search: true,
        placeholder: "操作类型",
      },
      {
        title: "请求方式",
        dataIndex: "requestMethod",
        valueType: "string",
      },
      {
        title: "操作人员",
        dataIndex: "operName",
        valueType: "string",
        search: true,
        placeholder: "操作人员",
      },
      {
        title: "操作地址",
        dataIndex: "operIp",
        valueType: "string",
      },
      {
        title: "操作状态",
        dataIndex: "status",
        valueType: "enum",
        valueEnum: [
          { label: "成功", value: 0, },
          { label: "失败", value: 1, }
        ],
        search: true,
        placeholder: "操作状态",
      },
      {
        title: "操作日期",
        dataIndex: "operTime",
        valueType: "slot",
        search: true,
      },
      {
        title: "操作",
        dataIndex: "optional",
        valueType: "slot",
      }
    ];

    const readRequest = async (data: any) => {
      const params: any = { ...data, };
      params.startDate = data.operTime && data.operTime[0];
      params.endDate = data.operTime && data.operTime[1];
      params.operTime = undefined;
      exportParams.value = params;
      return mesOperLogSelectJayaOperLogPageList(params);
    };

    const selectionChange = (selections: MES.OperLogDTO[]) => {
      operIds.value = selections.map(({ operId, }) => Number(operId));
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${operIds.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await ({operIds:operIds.value,});
              done();
              instance.confirmButtonLoading = false;
              ElMessage.success("删除成功");
              proTableRef.value.load();
            } catch (error) {
              done();
            }
          } else {
            done();
          }
        },
      }).catch(() => undefined);
    };

    const handlerExport = async () => {
      exportLoading.value = true;
      const params: Record<string, any> = {};
      try {
        const { data, status, } = await axios({
          url: "",
          method: "post",
          params,
          responseType: "blob",
        });
        if (status === 200) {
          // 导出转码并下载
          const blob = new Blob([data], { type: "application/vnd.ms-excel", });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "租户管理";
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

    const handlerDetail = (row: any) => {
      visible.value = true;
      detailData.value = row;
      getDetail(row.operId);
    };
		
    const getDetail = async (operId: string) => {
      try {
        const { data, } = await mesOperLogSelectJayaOperLogInfo({operId,});
        detailData.value = data;

      } catch (error) {
        console.error(error);
      }
    };

    return {
      proTableRef,
      columns,
      exportLoading,
      exportParams,
      operIds,
      visible,
      detailData,
      readRequest,
      deleteSelection,
      selectionChange,
      handlerExport,
      handlerDetail,
      View,
    };
  },
});
</script>

<style lang="less">
.operation-log {
	.operation-log-detail {
		.el-row,.el-col {
			margin-bottom: 18px;
		}

		.el-col {
			display: flex;
			word-break: break-all;
			
			.detail-label {
				width: 100px;
				font-weight: bold;
				text-align: right;
				padding-right: 12px;
			}

			.detail-content {
				width: calc(100% - 100px);
			}
		}
	}
}
</style>
