<template>
  <div class="team-list-edit page-root">
    <div class="page-header">
      <el-icon
        color="#7E7E7E"
        style="cursor: pointer;"
        @click="$router.back"
      >
        <arrow-left />
      </el-icon>
      <p class="page-header-name">
        编辑班组
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
              :disabled="row.shiftId > 0"
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
              :disabled="row.shiftId > 0"
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
              :disabled="row.shiftId > 0"
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
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="HH:mm"
              size="small"
              style="width: 100%;"
              :disabled="row.shiftId > 0"
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
              :disabled="row.shiftId > 0"
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
              :disabled="row.shiftId > 0"
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
              :disabled="row.shiftId > 0"
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
              :disabled="row.shiftId > 0"
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
              v-if="tableData.find(item => item.shiftId > 0) || $index === (tableData.length -1)"
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
import { mesTeamDeleteTeam, mesTeamQueryTeamShiftInfo, mesTeamUpdateTeam } from "@/api/mes/teamController";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { ArrowLeft } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { Action, ElMessage, ElMessageBox } from "element-plus";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ScheduleModel from "../schedule-model/index.vue";

export default defineComponent({
  name:"TeamListEdit",
  components: {
    ArrowLeft,
    ScheduleModel,
  },
  setup() {
    const route = useRoute();
    const teamId = parseInt(<string>route.query.id);
    const teamName = ref<string>("");
    const tableData = ref<any[]>([]);
    const router = useRouter();
    const shiftId = ref<number>(-1);
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

    const getTeam = async () => {
      try {
        let { data, } = await mesTeamQueryTeamShiftInfo({teamId,});
        teamName.value = data.teamName;
        tableData.value = data.shiftVoList.map(({type,orgName,jobEndTime,jobDuration,shiftName,jobStartTime,orgId,jobCreateTime,shiftId,bingType,checkingRuleGroupId,periodType,periodValue,qualityRuleGroupId,}) => ({
          type,
          shiftId,
          shiftName,
          jobStartTime:[dayjs(`2022-09-16 ${jobStartTime}`),dayjs(`2022-09-16 ${jobEndTime}`)],
          bingType,
          checkingRuleGroupId,
          qualityRuleGroupId,
          jobCreateTime,
          jobDuration,
          orgId,
          periodType,
          periodValue,
          orgName,
        }));
      } catch (error) {
        console.error(error);
				
      }
    };

    const dataSpanMethod = ({column,rowIndex,}:any) => {
      if (column.property === "teamName") {
        if (rowIndex === 0) {
          return {
            rowspan: tableData.value.length,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
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
      } catch (error) {
        console.error(error);
      }
    };

    const handlerAddOrg = (row:any) => {
      orgSelection.value = row.orgId ? [{
        type:row.bingType === "people" ? "user" : "org",
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
        shiftId: shiftId.value,
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
      shiftId.value--;
    };

    const handlerDelete = async (index:number) => {
      if(tableData.value[index].shiftId > 0){
        let shiftIdList = tableData.value.filter(item => item.shiftId > 0).map(item => item.shiftId);
        
        const params = {
          projectId,
          shiftId: tableData.value[index].shiftId,
        };
        ElMessageBox({
          title: "提示",
          type: "warning",
          message: "删除后相关的作业计划将被同步删除，请谨慎操作！",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showCancelButton: true,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          callback: async (action: Action) => {
            if (action === "confirm") {
              if(shiftIdList.length > 1){
                tableData.value.splice(index,1);
                try {
                  let {success,} = await mesTeamDeleteTeam(params);
                  if (success) {
                    ElMessage.success("删除成功！");
                  }
                } catch (error) {
                  console.error(error);
                }
              }else if(shiftIdList.length === 1){
                tableData.value.splice(index,1);
                try {
                  let {success,} = await mesTeamDeleteTeam({
                    ...params,
                    teamId,
                  });
                  if (success) {
                    ElMessage.success("删除成功！");
                    if(tableData.value.filter(item => item.shiftId > 0).length === 0){
                      router.replace({name:"team-list",});
                    }
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            }
          },
        });
      }else{
        tableData.value.splice(index,1);
      }
    };

    const handlerSave = () => {
      let valid = validator();
			
      if (valid) {
        let params:MES.TeamInParam = {
          teamId,
          teamName:teamName.value,
          paramList: [],
          projectId,
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
            shiftId,
            shiftName,
            jobStartTime: startTime + ":00",
            jobDuration,
            periodValue:periodValue.toString(),
            orgId,
            jobCreateTime,
            bingType,
            checkingRuleGroupId,
            periodType,
            qualityRuleGroupId,
          });
        });
        mesTeamUpdateTeam(params).then( () => {
          router.replace({name:"team-management",});
        });
      }
    };

    const validator = () => {
      let errorFlag = false;
      // 校验班组名称
      if (teamName.value.length === 0) {
        ElMessage.error("请输入班组名称");
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
        })
        return `${weekArr2.join(",")}`;
      case "month":
        return `每月${periodValue.toString()}号`;
      default:
        return "";
      }
    };

    remoteOrg();
    getTeam();

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
.team-list-edit {
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
