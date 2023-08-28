<template>
  <div class="organization-table">
    <el-tabs type="border-card">
      <el-tab-pane label="组织人员">
        <el-pro-table
          ref="proTableRef"
          :columns="columns"
          row-key="userId"
          :request="fetchUserList"
          hidden-label
          show-index
        />
      </el-tab-pane>
      <el-tab-pane label="作业车辆">
        <el-pro-table
          ref="carTableRef"
          :columns="carColumns"
          row-key="carId"
          :request="fetchCarList"
          hidden-label
          show-index
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { mesCarCarPageList } from "@/api/mes/carController";
import { mesUserUserPageList } from "@/api/mes/userController";
import { useDict } from "@/stores/dict";
import type { ProTableColumn } from "element-plus";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "OrganizationTable",
  props: {
    ids: {
      type: String,
      required: true,
    },
    curentProjectId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const dict = useDict();
    const proTableRef = ref();
    const carTableRef = ref();
    const columns:ProTableColumn[] = [
      {
        dataIndex: "userName",
        title: "姓名",
        align: "center",
        valueType: "string",
        search: true,
        placeholder: "姓名",
      },
      {
        dataIndex: "userType",
        title: "人员类型",
        align: "center",
        valueType: "string",
      },
      {
        dataIndex: "phone",
        title: "联系方式",
        align: "center",
        valueType: "string",
        search: true,
        placeholder: "联系方式",
      }
    ];
    const carColumns:ProTableColumn[] = [
      {
        dataIndex: "carNumber",
        title: "车牌号",
        align: "center",
        valueType: "string",
        search: true,
        placeholder: "车牌号",
      },
      {
        dataIndex: "carType",
        title: "车辆类型",
        align: "center",
        valueType: "enum",
        search: true,
        placeholder: "车辆类型",
        valueEnum:dict.$state.carType,
      }
    ];

    const remoteData = async (params: any, apiFunction: any) => {
      const { ids, curentProjectId, } = props;
      params.orgIds = ids;
      params.projectId = curentProjectId;
      if (curentProjectId !== 0) {
        return apiFunction(params);
      }
    };

    const fetchUserList = async (params: any) => {
      return remoteData(params, mesUserUserPageList);
    };

    const fetchCarList = async (params: any) => {
      return remoteData(params, mesCarCarPageList);
    };

    watch(() => [props.ids,props.curentProjectId],() => {
      proTableRef.value?.reload();
      carTableRef.value?.reload();
    });

    return {
      proTableRef,
      carTableRef,
      columns,
      carColumns,
      fetchUserList,
      fetchCarList,
    }
  },
})
</script>
<style lang="less">
.organizational-structure .organization-table {
	flex: 1;
	background-color: #fff;

	.el-pro-table-body {
		width: auto;
	}
}

</style>
