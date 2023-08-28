<template>
  <div class="flow-pool-management page-root">
    <card-header title="流量池管理" />
    <el-pro-table
      ref="proTableRef"
      :columns="columns"
      :request="flowRequest"
      row-key="iccid"
      show-index
      hidden-label
    >
      <template #column-thisMonthUsage="{ row }">
        {{ row.thisMonthUsage }} M
      </template>
      <template #column-thisMonthSurplusUsage="{ row }">
        {{ row.thisMonthSurplusUsage }} M
      </template>
      <template #column-historyUsage="{ row }">
        {{ row.historyUsage }} M
      </template>
      <template #column-operation="{ row, rowIndex }">
        <el-button
          type="primary"
          link
          @click="handleDetail(row)"
        >
          使用详情
        </el-button>
        <el-popover
          v-model:visible="popoverVisibleList[rowIndex]"
          placement="left"
          width="auto"
          trigger="click"
        >
          <template #reference>
            <el-button
              type="primary"
              link
            >
              分配
            </el-button>
          </template>
          <template
            v-if="popoverVisibleList[rowIndex]"
            #default
          >
            <el-input
              v-model="searchTenant"
              placeholder="租户名称"
              clearable
              prefix-icon="search"
              size="small"
              style="margin-bottom: 10px; width: 180px"
              @change="getTenantProjectList"
            />
            <el-cascader-panel :options="tenantProjectList">
              <template #default="{ node, data }">
                <div @click="node.isLeaf && handlePanel(data, row, rowIndex)">
                  {{ data.label }}
                </div>
              </template>
            </el-cascader-panel>
          </template>
        </el-popover>
        <el-button
          type="primary"
          link
          @click="handleSync"
        >
          同步
        </el-button>
      </template>
    </el-pro-table>
    <el-dialog
      class="flow-pool-management-use-record"
      :model-value="recordVisible"
      modal
      destroy-on-close
      title="出货记录"
      @closed="recordVisible = false"
    >
      <el-pro-table
        ref="recordTableRef"
        :columns="recordColumns"
        :request="recordRequest"
        row-key="id"
        show-index
        hidden-label
        :with-tools="[]"
        :form-buttons="[]"
      >
        <template #form-year>
          <el-date-picker
            v-model="selectYear"
            type="year"
            placeholder="选择年份"
            @change="() => recordTableRef.load()"
          />
        </template>
        <template #column-monthUsage="{ row }">
          {{ row.monthUsage }} M
        </template>
      </el-pro-table>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {
  iotFlowCardUsagePageList,
  iotFlowDistributeIotCard,
  iotFlowIotCardFlowPageList,
  iotFlowQueryTenantProjectList
} from '@/api/iot/flowController';
import { CardHeader } from '@/components/index';
import type { ProTableColumn } from 'element-plus';
import { ElMessage, dayjs } from 'element-plus';
import type { Ref } from 'vue';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'FlowPoolManagement',
  components: {
    CardHeader,
  },
  setup() {
    const route = useRoute();
    const proTableRef = ref();
    const recordTableRef = ref();
    const recordVisible = ref<boolean>();
    const currentIccid: Ref<string> = ref<string>('');
    const selectYear: Ref<string> = ref<string>(dayjs().toString());
    const searchTenant: Ref<string> = ref<string>('');
    const popoverVisibleList: Ref<boolean[]> = ref<boolean[]>([false]);
    const tenantProjectList = ref<any[]>([]);

    onMounted(() => {
      route.query.id &&
				(proTableRef.value.model.orderNumber = <string>route.query.id);
    });

    const columns: ProTableColumn[] = [
      {
        title: '批次号',
        dataIndex: 'orderNumber',
        valueType: 'string',
        width: 200,
        search: true,
        placeholder: '批次号',
      },
      {
        title: 'ICCID号',
        dataIndex: 'iccid',
        valueType: 'string',
        width: 200,
        search: true,
        placeholder: 'ICCID号',
      },
      {
        title: 'IMSI',
        dataIndex: 'imsi',
        valueType: 'string',
        width: 200,
      },
      {
        title: '所属租户',
        dataIndex: 'tenantName',
        valueType: 'string',
        width: 200,
        search: true,
        placeholder: '请输入所属租户',
      },
      {
        title: '所属项目',
        dataIndex: 'projectName',
        valueType: 'string',
        width: 200,
        search: true,
        placeholder: '请输入所属项目',
      },
      {
        title: '套餐名称',
        dataIndex: 'setmealName',
        valueType: 'string',
        width: 200,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'enum',
        valueEnum: [
          { label: '未激活', value: 'unactivated', },
          { label: '已激活', value: 'activated', },
          { label: '已停用', value: 'disabled', },
          { label: '已注销', value: 'cancelled', }
        ],
        width: 200,
        search: true,
        placeholder: '请选择状态',
      },
      {
        title: '出库日期',
        dataIndex: 'outboundDate',
        valueType: 'string',
        width: 200,
      },
      {
        title: '接收日期',
        dataIndex: 'inboundDate',
        valueType: 'string',
        width: 200,
      },
      {
        title: '首次激活日期',
        dataIndex: 'firstActivateDate',
        valueType: 'string',
        width: 200,
      },
      {
        title: '最近激活日期',
        dataIndex: 'recentlyActivateDate',
        valueType: 'string',
        width: 200,
      },
      {
        title: '到期日期',
        dataIndex: '',
        valueType: 'string',
        width: 200,
      },
      {
        title: '本月用量',
        dataIndex: 'thisMonthUsage',
        valueType: 'string',
        width: 200,
      },
      {
        title: '本月剩余用量',
        dataIndex: 'thisMonthSurplusUsage',
        valueType: 'string',
        width: 200,
      },
      {
        title: '本月流量清零',
        dataIndex: 'reset',
        valueType: 'enum',
        valueEnum: [
          { label: '是', value: 1, },
          { label: '否', value: 0, }
        ],
        width: 150,
      },
      {
        title: '历史用量',
        dataIndex: 'historyUsage',
        valueType: 'string',
        width: 200,
      },
      {
        title: '实名',
        dataIndex: 'realName',
        valueType: 'enum',
        valueEnum: [
          { label: '是', value: 1, },
          { label: '否', value: 0, }
        ],
        width: 100,
      },
      {
        title: '报废',
        dataIndex: 'scrap',
        valueType: 'enum',
        valueEnum: [
          { label: '是', value: 1, },
          { label: '否', value: 0, }
        ],
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        valueType: 'slot',
        width: 200,
        fixed: 'right',
      }
    ];

    const recordColumns: ProTableColumn[] = [
      {
        title: '日期',
        dataIndex: 'statisticTime',
        valueType: 'string',
      },
      {
        title: 'ICCID号',
        dataIndex: 'iccid',
        valueType: 'string',
      },
      {
        title: '用量',
        dataIndex: 'monthUsage',
        valueType: 'slot',
      },
      {
        title: '年份',
        dataIndex: 'year',
        valueType: 'slot',
        hidden: true,
        search: true,
      }
    ];

    const flowRequest = async (params: IOT.FlowIotCardFlowPageListParams) => {
      const body = { ...params, };
      route.query.id && (body.orderNumber = <string>route.query.id);
      try {
        const { data, pageSize, total, current, } =
					await iotFlowIotCardFlowPageList(body);
        popoverVisibleList.value = data.map(() => false);
        return { data, pageSize, total, current, };
      } catch (error) {}
    };

    const handleDetail = (row: IOT.IotCardFlowDTO) => {
      recordVisible.value = true;
      currentIccid.value = <string>row.iccid;
    };

    const handleSync = async () => {
      try {
        const { success, } = await new Promise<IOT.ResultVo_string_>((resolve) =>
          resolve({ success: true, data: '', msg: '', code: 200, })
        );
        if (success) {
          ElMessage.success('同步成功');
          proTableRef.value.load();
        }
      } catch (error) {}
    };

    const recordRequest = async (params: IOT.FlowCardUsagePageListParams) => {
      const body: IOT.FlowCardUsagePageListParams = {
        ...params,
        iccid: currentIccid.value,
        year: selectYear.value,
      };
      try {
        const { data, pageSize, total, current, } =
					await iotFlowCardUsagePageList(body);
        return { data, pageSize, total, current, };
      } catch (error) {}
    };

    const getTenantProjectList = async () => {
      const params: IOT.FlowQueryTenantProjectListParams = {};
      searchTenant.value !== '' && (params.tenantName = searchTenant.value);
      try {
        const { data, } = await iotFlowQueryTenantProjectList(params);
        tenantProjectList.value = convertTreeData(data);
      } catch (error) {}
    };

    /** 转换数据为级联结构 {label: string, value: any, children?: any[],... } */
    const convertTreeData = (data: IOT.TenantProjectDTO[]) => {
      return data.map((item) => {
        let children: { label?: string; value?: number }[] = [];
        if (item.projectList?.length) {
          children = item.projectList.map(
            ({ projectName, projectId, tenantId, }) => ({
              label: projectName,
              value: projectId,
              tenantId,
              projectName,
              projectId,
            })
          );
        }
        return {
          label: item.tenantName,
          value: item.tenantId,
          tenantId: item.tenantId,
          tenantName: item.tenantName,
          children,
        };
      });
    };
    getTenantProjectList();

    /** 点击级联内选项的事件 */
    const handlePanel = async (
      val: IOT.ProjectVo,
      row: IOT.IotCardFlowDTO,
      index: number
    ) => {
      try {
        const { success, } = await iotFlowDistributeIotCard({
          projectId: <number>val.projectId,
          tenantId: <number>val.tenantId,
          id: <number>row.id,
        });
        if (success) {
          ElMessage.success('分配成功');
        } else {
          ElMessage.error('分配失败');
        }
      } catch (error) {
      } finally {
        popoverVisibleList.value[index] = false;
        proTableRef.value.load();
      }
    };

    return {
      proTableRef,
      columns,
      recordTableRef,
      selectYear,
      recordColumns,
      recordVisible,
      tenantProjectList,
      popoverVisibleList,
      searchTenant,
      handleDetail,
      handleSync,
      recordRequest,
      getTenantProjectList,
      handlePanel,
      flowRequest,
    };
  },
});
</script>
<style lang="less">
.flow-pool-management {
	&-use-record {
		.el-dialog__body {
			padding: 0 !important;
		}
	}
}
</style>
