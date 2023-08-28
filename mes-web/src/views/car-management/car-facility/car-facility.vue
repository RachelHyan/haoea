<template>
  <div class="car-facility page-root">
    <card-header title="车辆设备" />
    <el-pro-crud
      ref="takeOffRef"
      row-key="id"
      :read-columns="readColumns"
      :label-width="'100px'"
      :write-columns="writeColumns"
      :write-rules="writeRules"
      :read-request="readRequest"
      :create-request="createRequest"
      :update-request="updateRequest"
      :pro-table-props="{selectionChange,hiddenLabel:true}"
      :delete-request="deleteRequest"
      :read-item-request="fetchInfo"
      :ext-params="extParams"
    >
      <template #read-toolbar-left="{size}">
        <el-button
          type="danger"
          :size="size"
          :disabled="!iotCarRelationIds.length"
          @click="deleteSelection"
        >
          删除
        </el-button>
      </template>
    </el-pro-crud>
  </div>
</template>

<script lang="ts">
import { mesDeviceAddIotCarRelation, mesDeviceDeleteIotCarRelation, mesDeviceIotCarRelationInfo, mesDeviceIotCarRelationPageList, mesDeviceQueryCarListByProjectId, mesDeviceQueryIotCardListByProjectId, mesDeviceUpdateIotCarRelation } from "@/api/mes/deviceController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import type { ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { ElMessage, ElMessageBox, FormRules } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CarFacility",
  components:{
    CardHeader,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const takeOffRef = ref();
    const iotCarRelationIds = ref<number[]>([]);
    const extParams = {projectId,};

    const readColumns:ProTableColumn[] = [
      {
        title: "设备名称",
        dataIndex: "eqName",
        valueType: "string",
      },
      {
        title: "绑定车辆",
        dataIndex: "carNumber",
        valueType: "string",
        search: true,
        placeholder: "车辆",
      },
      {
        title: "车辆类型",
        dataIndex: "carType",
        valueType: "string",
      },
      {
        title: "品牌",
        dataIndex: "eqBrand",
        valueType: "string",
      },
      {
        title: "物联网卡号",
        dataIndex: "iccid",
        valueType: "string",
        search: true,
        placeholder: "物联网卡号",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
        valueType: "string",
      }
    ];

    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "设备名称",
        dataIndex: "eqName",
        valueType: "string",
      },
      {
        title: "品牌名称",
        dataIndex: "eqBrand",
        valueType: "string",
      },
      {
        title: "物联网卡号",
        dataIndex: "iccid",
        valueType: "enum",
        valueEnum:[],
      },
      {
        title: "绑定车辆",
        dataIndex: "carId",
        valueType: "enum",
        valueEnum:[],
      }
    ];

    const writeRules:FormRules = {
      eqName: [	
        {required:true,message:"请输入设备名称",trigger:"blur",}
      ],
      eqBrand: [
        {required:true,message:"请选择品牌名称",trigger:"change",}
      ],
      iccid: [
        {required:true,message:"请选择物联网卡号",trigger:"change",}
      ],
    };
			
    const selectionChange = (selections:MES.IotCarRelationDTO[]) => {
      iotCarRelationIds.value = selections.map(({id,}) => id as number);
    };

    const readRequest = async (params:MES.DeviceIotCarRelationPageListParams) => {
      return mesDeviceIotCarRelationPageList(params);
    };

    const createRequest = async (params:MES.IotCarRelationInParam) => {
      return mesDeviceAddIotCarRelation(params);
    };

    const updateRequest = async (params: MES.IotCarRelationInParam) => {
      return mesDeviceUpdateIotCarRelation(params);
    };

    const deleteRequest = async (params: {id: number}) => {
      return mesDeviceDeleteIotCarRelation({iotCarRelationIds: [params.id],});
    };

    const deleteSelection = async () => {
      ElMessageBox.confirm(`确定要删除这${iotCarRelationIds.value.length}条数据吗?`,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesDeviceDeleteIotCarRelation({iotCarRelationIds:iotCarRelationIds.value,});
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
		
    const fetchInfo = async (params:MES.DeviceIotCarRelationInfoParams) => {
      return mesDeviceIotCarRelationInfo(params);
    };

    const fetchIccidList = async () => {
      const {data,} = await mesDeviceQueryIotCardListByProjectId({projectId,});
      return data;
    };

    const fetchCarList = async () => {
      const {data,} = await mesDeviceQueryCarListByProjectId({projectId,});
      return data;
    };

    Promise.all([fetchIccidList(), fetchCarList()]).then(([iccids,cars]) => {
      writeColumns[2].valueEnum = iccids.map(({iccid,}) => (({label: iccid,value: iccid,})));
      writeColumns[3].valueEnum = cars.map(({carId,carNumber,}) => ({label: carNumber,value: carId,}));
    }).catch(console.error);

    return {
      takeOffRef,
      readColumns,
      writeColumns,
      writeRules,
      iotCarRelationIds,
      extParams,
      readRequest,
      createRequest,
      updateRequest,
      deleteRequest,
      selectionChange,
      deleteSelection,
      fetchInfo,
    }
  },
})
</script>

<style scoped>

</style>
