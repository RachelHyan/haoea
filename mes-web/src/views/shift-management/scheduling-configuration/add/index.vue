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
        新增配置
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
              新增
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
</template>

<script lang="ts">
import { mesTeamAddTeam } from "@/api/mes/teamController";
import { useDict } from "@/stores/dict";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { ArrowLeft } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name:"SchedulingConfigurationAdd",
  components: {
    ArrowLeft,
  },
  setup() {
    const tableData = ref<any[]>([]);
    const router = useRouter();
    const teamName = ref<string>("");
    const currentJobCreateTime = ref<string>("");
    const dict = useDict();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const typeList = dict.$state.jobType as any[];
    tableData.value.push({
      type:null,
      shiftName: "",
      jobStartTime: [],
    });

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

    const handlerAdd = () => {
      tableData.value.push({
        type:null,
        shiftName: "",
        jobStartTime: [],
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
        tableData.value.forEach(({type,shiftName,jobStartTime,shiftId,}) => {
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
            shiftId,
          });
        });
        mesTeamAddTeam(params).then(() => {
          router.replace({name:"scheduling-configuration",});
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


    return {
      teamName,
      tableData,
      currentJobCreateTime,
      typeList,
      disabledDate,
      dataSpanMethod,
      handlerAdd,
      handlerDelete,
      handlerSave,
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
