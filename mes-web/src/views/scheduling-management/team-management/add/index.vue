<template>
  <div class="team-list-add page-root">
    <div class="page-header">
      <el-icon
        color="#7E7E7E"
        style="cursor: pointer;"
        @click="$router.back"
      >
        <arrow-left />
      </el-icon>
      <p class="page-header-name">
        新增班组
      </p>
    </div>
    <div class="page-body">
      <el-table
        :data="tableData"
        :span-method="dataSpanMethod"
        :border="true"
      >
        <el-table-column
          label="班组"
          prop="teamName"
          align="center"
        >
          <template #default>
            <el-input
              v-model="teamName"
              type="textarea"
              :rows="tableData.length"
              resize="none"
              placeholder="请输入"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="班次"
          prop="shiftName"
          align="center"
        >
          <template #default="{row}">
            <el-input
              v-model="row.shiftName"
              type="text"
              placeholder="请输入"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          prop="type"
          align="center"
        >
          <template #default="{row}">
            <el-select
              v-model="row.type"
              class="m-2"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="所属组织"
          prop="orgId"
          align="center"
        >
          <template #default="{row}">
            <el-tree-select
              v-model="row.orgId"
              :data="orgTreeData"
              check-strictly
              :render-after-expand="false"
              no-data-text="暂无选项"
              accordion
              node-key="id"
              filterable
              :props="defaultProps"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="作业时间"
          prop="jobStartTime"
          align="center"
        >
          <template #default="{row}">
            <el-time-picker
              v-model="row.jobStartTime"
              is-range
              range-separator="-"
              start-placeholder="开始"
              end-placeholder="结束"
              format="HH:mm"
              size="small"
              style="width: 100%;"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="任务生成时间"
          prop="jobCreateTime"
          align="center"
        >
          <template #default="{row}">
            <el-date-picker
              v-model="row.jobCreateTime"
              type="date"
              start-placeholder="开始时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :clearable="false"
              size="small"
              style="width: 100%;"
              :disabled-date="disabledDate"
              placeholder="请选择"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="任务重复生成"
          prop="periodValue"
          align="center"
        >
          <template #default="{row}">
            <el-button
              v-model="row.periodValue"
              link
              type="primary"
              @click="handlerAddShedule(row)"
            >
              {{ row.periodValue.length ? periodValueToText(row.periodType,row.periodValue) : '新增' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="考勤规则组"
          prop="checkingRuleGroupId"
          align="center"
        >
          <template #default="{row}">
            <el-select
              v-model="row.checkingRuleGroupId"
              class="m-2"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="checkinItem in ruleGroupData.checkingRuleGroupList"
                :key="checkinItem.ruleGroupId"
                :label="checkinItem.ruleGroupName"
                :value="checkinItem.ruleGroupId"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="质量规则组"
          prop="qualityRuleGroupId"
          align="center"
        >
          <template #default="{row}">
            <el-select
              v-model="row.qualityRuleGroupId"
              class="m-2"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="checkinItem in ruleGroupData.qualityRuleGroupList"
                :key="checkinItem.ruleGroupId"
                :label="checkinItem.ruleGroupName"
                :value="checkinItem.ruleGroupId"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
        >
          <template #default="{$index}">
            <el-button
              v-if="tableData.length > 1"
              type="danger"
              link
              @click="handlerDelete($index)"
            >
              删除
            </el-button>
            <el-button
              v-if="$index === (tableData.length -1)"
              type="primary"
              link
              @click="handlerAdd"
            >
              新增班次
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-footer">
      <el-button
        type="danger"
        plain
        @click="$router.back"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        @click="handlerSave"
      >
        保存
      </el-button>
    </div>
  </div>
  <schedule-model 
    v-if="sheduleModelVisible"
    :visible="sheduleModelVisible"
    :job-create-time="currentJobCreateTime"
    :index="currentSheduleIndex"
    :current-data="currentSheduleData"
    @close="sheduleModelVisible = false"
    @finish="handlerSaveShedule"
  />
</template>

<script lang="ts">
import { mesDepartmentQueryOrgTreeList } from "@/api/mes/departmentController";
import { mesRuleQueryRuleGroupListByType } from "@/api/mes/ruleController";
import { mesTeamAddTeam } from "@/api/mes/teamController";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { ArrowLeft } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import ScheduleModel from "../schedule-model/index.vue";

export default defineComponent({
  name:"TeamListAdd",
  components: {
    ArrowLeft,
    ScheduleModel,
  },
  setup() {
    const tableData = ref<any[]>([]);
    const router = useRouter();
    const teamName = ref<string>("");
    const sheduleModelVisible = ref<boolean>(false);
    const showOrgDialog = ref<boolean>(false);
    const orgSelection = ref<any[]>([]);
    const currentJobCreateTime = ref<string>("");
    const currentSheduleIndex = ref<number>(0);
    const ruleGroupData = ref<any>([]);
    const currentSheduleData = ref<any>([]);
    const orgTreeData = reactive<any[]>([]);
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const typeList = dict.$state.jobType as any[];
    tableData.value.push({
      shiftName: "",
      jobStartTime: [],
      periodType: "",
      periodValue:"",
      orgId:null,
      jobCreateTime:"",
      orgName: "",
      bingType: "org",
      checkingRuleGroupId: null,
      qualityRuleGroupId: null,
    });

    const defaultProps = {
      label:"orgName",
      children:"children",
    };

    onMounted(() => {
      getRuleGroupList();
    });

    const remoteOrg = async () => {
      try {
        const { data, success, } = await mesDepartmentQueryOrgTreeList({ projectId, });
        success && orgTreeData.push(...data);
      } catch (error) {
        console.error(error);
				
      }
    };

    remoteOrg();

    const dataSpanMethod = ({column,rowIndex,}:any) => {
      if (column.property === "teamName") {
        if (rowIndex === 0) {
          return {
            rowspan: tableData.value.length,
            colspan: 1,
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          }
        }
      }
    };

    const disabledDate = (time:any) => {
      return time.getTime() < Date.now();
    };

    const getRuleGroupList = async () => {
      try {
        const {data,} = await mesRuleQueryRuleGroupListByType({
          projectId,
        });
        ruleGroupData.value = data;
        tableData.value.forEach((item:any) => {
          item.checkingRuleGroupId = data.checkingRuleGroupList[0].ruleGroupId;
          item.qualityRuleGroupId = data.qualityRuleGroupList[0].ruleGroupId;
        });
      } catch (error) {
        console.error(error);
      }
    };

    const handlerAddOrg = (row:any) => {
      orgSelection.value = row.orgId ? [{
        type:row.bingType,
        id: row.orgId,
        name: row.orgName,
      }] : [];
      currentSheduleIndex.value = tableData.value.indexOf(row);
      showOrgDialog.value = true;
    };

    const handlerAddShedule = (row:any) => {
      currentJobCreateTime.value = row.jobCreateTime;
      currentSheduleIndex.value = tableData.value.indexOf(row);
      sheduleModelVisible.value = true;
      currentSheduleData.value = row;
    };

    const handlerSaveShedule = (val:any) => {
      tableData.value[currentSheduleIndex.value].periodValue = val.periodValue;
      tableData.value[currentSheduleIndex.value].periodType = val.periodType;
      sheduleModelVisible.value = false;
    };

    const handlerAdd = () => {
      tableData.value.push({
        type:null,
        shiftName: "",
        jobStartTime: [],
        periodType: "",
        periodValue:"",
        orgId:null,
        jobCreateTime:"",
        orgName: "",
        bingType: "org",
        checkingRuleGroupId: ruleGroupData.value.checkingRuleGroupList[0].ruleGroupId,
        qualityRuleGroupId: ruleGroupData.value.qualityRuleGroupList[0].ruleGroupId,
      });
    };

    const handlerDelete = (index:number) => {
      tableData.value.splice(index,1);
    };

    const handlerSave = () => {
      let valid = validator();
      if (valid) {
        let params:MES.TeamInParam = {
          projectId,
          teamName: teamName.value,
          paramList: [] as MES.ShiftInParam[],
        };
        tableData.value.forEach(({type,shiftName,jobStartTime,orgId,jobCreateTime,shiftId,bingType,checkingRuleGroupId,periodType,periodValue,qualityRuleGroupId,}) => {
          let startTime = dayjs(jobStartTime[0]).format("HH:mm");
          let endTime = dayjs(jobStartTime[1]);
          let jobDuration = endTime.diff(dayjs(jobStartTime[0]),"second");
          if (jobDuration < 0) {
            endTime.add(1, "day");
            jobDuration = endTime.diff(startTime,"second");
          }
          
          params.paramList.push({
            type,
            shiftName,
            jobStartTime: startTime + ":00",
            jobDuration,
            periodValue:periodValue.toString(),
            orgId,
            jobCreateTime,
            shiftId,
            bingType,
            checkingRuleGroupId,
            periodType,
            qualityRuleGroupId,
          });
        });
        mesTeamAddTeam(params).then(() => {
          router.replace({name:"team-management",});
        });
      }
    };

    const validator = () => {
      let errorFlag = false;
      // 校验班组名称
      if (teamName.value.length === 0) {
        ElMessage.error("请输入班组名称");
        return false;
      }
      for (let index = 0; index < tableData.value.length && !errorFlag; index++) {
        const {shiftName,jobStartTime,} = tableData.value.at(index);
        // 校验班次名称
        if (shiftName.length === 0) {
          ElMessage.error(`第${index + 1}行班次名称未输入`);
          errorFlag = true;
          return false;
        }
        // 校验作业时间
        if (jobStartTime.length === 0) {
          ElMessage.error(`第${index + 1}行作业时间未选择`);
          errorFlag = true;
          return false;
        }
      }
      return !errorFlag;
    };

    const periodValueToText = (periodType:string,periodValue:string) => {
      switch (periodType) {
      case "next-day":
        if(periodValue === "0"){
          return "每天";
        }
        return `间隔${periodValue.toString()}天`;
      case "week":
        let weekArr = ["周日","周一","周二","周三","周四","周五","周六"];
        let weekArr2 = periodValue.toString().split(",").map((item:string) => {
          return weekArr[Number(item)];
        });
        return `${weekArr2.join(",")}`;
      case "month":
        return `每月${periodValue.toString()}号`;
      default:
        return "";
      }
    };

    return {
      teamName,
      tableData,
      sheduleModelVisible,
      showOrgDialog,
      orgSelection,
      currentJobCreateTime,
      currentSheduleIndex,
      ruleGroupData,
      currentSheduleData,
      defaultProps,
      orgTreeData,
      typeList,
      disabledDate,
      dataSpanMethod,
      handlerAdd,
      handlerDelete,
      handlerSave,
      handlerSaveShedule,
      handlerAddShedule,
      handlerAddOrg,
      periodValueToText,
    }
  },
})
</script>
<style lang="less">
.team-list-add {
	padding: 0 9px;
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

	.page-body {
		flex: 1;
		padding: 0 15px;
		margin-top: 24px;
	}

	.page-footer {
		padding: 16px 0;
		display: flex;
		column-gap: 40px;
		justify-content: center;
	}

	.arco-textarea,.arco-input {
		resize: none;
		text-align: center;
	}
}
</style>
