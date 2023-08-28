<template>
  <div class="job-panel">
    <div class="job-panel__title">
      作业看板
    </div>
    <div class="job-panel__item">
      <div class="job-panel__item-header">
        <div class="job-panel--title">
          基础台账
        </div>
      </div>
      <div class="job-panel__item-body">
        <div
          v-for="item in basicLedger"
          :key="item.id"
          class="job-panel__item-body--item"
        >
          <span class="job-panel__item-body--item-value">{{ item.value }}</span>
          <span class="job-panel__item-body--item-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="job-panel__item">
      <div class="job-panel__item-header">
        <div class="job-panel--title">
          作业人员
        </div>
        <div class="job-panel--tip">
          排班：{{ schedulTotal }}
        </div>
      </div>
      <div class="job-panel__item-body grid">
        <div
          v-for="(item,index) in workers"
          :key="index"
          class="job-panel__item-body--item line"
          style="cursor: pointer;"
          @click="handlerClick(item.id,'Manual_cleaning')"
        >
          <span class="job-panel__item-body--item-value blue">{{ item.value }}</span>
          <span class="job-panel__item-body--item-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div
      v-show="sceneValue === 'Vehicle_operation'"
      class="job-panel__item"
    >
      <div class="job-panel__item-header">
        <div class="job-panel--title">
          作业车辆
        </div>
        <div class="job-panel--tip">
          排班：{{ schedulTotal }}
        </div>
      </div>
      <div class="job-panel__item-body grid">
        <div
          v-for="(item,index) in vehicles"
          :key="index"
          class="job-panel__item-body--item line"
          style="cursor: pointer;"
          @click="handlerClick(item.id,'Vehicle_operation')"
        >
          <span class="job-panel__item-body--item-value blue">{{ item.value }}</span>
          <span class="job-panel__item-body--item-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="job-panel__item">
      <div class="job-panel__item-header">
        <div class="job-panel--title">
          作业完成情况
        </div>
      </div>
      <div
        class="job-panel__item-body"
        style="cursor: pointer;"
        @click="completionChartVisible = true"
      >
        <el-progress
          class="job-panel__item-body--progress"
          :percentage="finishRate"
        />
      </div>
    </div>
  </div>
  <table-model
    ref="tableRef"
    v-model="tableModelVisible"
    :scene-type="sceneType"
    :scene-value="sceneValue"
    :is-attendance="isAttendance"
    :cur-status="curStatus"
  />
  <completion-chart
    v-model="completionChartVisible"
    :scene-value="sceneValue"
  />
</template>

<script lang="ts">
import { mesIndexQueryJobBoard } from "@/api/mes/indexController";
import { mesWechatIndexQueryBaseBoard } from "@/api/mes/wechatController";
import { useProject } from "@/stores/project";
import { computed, defineComponent, nextTick, reactive, ref } from "vue";
import CompletionChart from "./completion-chart.vue";
import TableModel from "./table-model.vue";

export default defineComponent({
  name: "JobPanel",
  components: {
    TableModel,
    CompletionChart,
  },
  props: {
    sceneValue: {
      type: String,
      default: "Manual_cleaning",
    },
  },
  setup (props) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const tableRef = ref();
    const tableModelVisible = ref<boolean>(false);
    const completionChartVisible = ref<boolean>(false);
    const sceneType = ref("Manual_cleaning");
    const isAttendance = ref(false);
    const manualSchedulTotal = ref(0);
    const vehicleSchedulTotal = ref(0);
    const manualFinishRate = ref(0);
    const vehicleFinishRate = ref(0);
    const curStatus = ref();
    const basicLedger = reactive([
      {id:"grid",label: "作业网格", value: null,},
      {id:"object",label: "作业对象", value: null,},
      {id:"user",label: "作业人员", value: null,},
      {id:"car",label: "作业车辆", value: null,}
    ])
    const ManualWorkers = reactive([
      {id:"attendanceTotal",label: "出勤", value: null,},
      {id:"absenceTotal",label: "缺勤", value: null,},
      {id:"onJobTotal",label: "在岗", value: null,},
      {id:"offJobTotal",label: "脱岗", value: null,},
      {id:"offlineTotal",label: "离线", value: null,}
    ])
    const VehicleWorkers = reactive([
      {id:"attendanceTotal",label: "出勤", value: null,},
      {id:"absenceTotal",label: "缺勤", value: null,}
    ])
    const vehicles = reactive([
      {id:"onJobTotal",label: "在岗", value: null,},
      {id:"offJobTotal",label: "脱岗", value: null,},
      {id:"offlineTotal",label: "离线", value: null,}
    ])
    const status = [
      {label:"attendanceTotal",value:"attendance",},
      {label:"absenceTotal",value:"absence",},
      {label:"onJobTotal",value:"onJob",},
      {label:"offJobTotal",value:"offJob",},
      {label:"offlineTotal",value:"offline",}
    ]

    const handlerClick = (id:string,type:string) => {
      const statusValue = status.find(item => item.label === id)?.value;
      curStatus.value = statusValue;
      sceneType.value = type;
      isAttendance.value = type === "Manual_cleaning" && (statusValue === "attendance" || statusValue === "absence");
			
      tableModelVisible.value = true;

      nextTick(async() => {
        const targetRef =
				isAttendance.value ? tableRef.value?.attendanceRef :
      	type === "Manual_cleaning" ? tableRef.value?.workerStatusRef :
      	tableRef.value?.vehicleStatusRef;
				
        targetRef.model.orgIds = [];
        targetRef.model.userName = "";
        targetRef.model.carNumber = "";
        isAttendance.value ? targetRef.model.status = statusValue : targetRef.model.jobStatus = statusValue;
			
        await targetRef.load();
      });

    }

    const fetchBasicLedger = async() => {
      try {
        const {data,} = await mesWechatIndexQueryBaseBoard({projectId,role:"PROJECT_MANAGER",});
        basicLedger.forEach(item => {
          // @ts-ignore
          item.value = data[item.id];
        });
      } catch (error) {
				
      }
    }

    const fetchData = async() => {
      try {
        const {data,} = await mesIndexQueryJobBoard({projectId,type:props.sceneValue,});

        if (props.sceneValue === "Manual_cleaning") {
          ManualWorkers.forEach(item => {
            // @ts-ignore
            item.value = data[item.id];
          });
          manualSchedulTotal.value = data.schedulTotal;
          manualFinishRate.value = Math.round(data.finishRate * 100);
        } else {
          VehicleWorkers.forEach(item => {
            // @ts-ignore
            item.value = data[item.id];
          });
          vehicles.forEach(item => {
            // @ts-ignore
            item.value = data[item.id];
          });
          vehicleSchedulTotal.value = data.schedulTotal;
          vehicleFinishRate.value =  Math.round(data.finishRate * 100);
        }
      } catch (error) {
				
      }
    }

    const workers = computed(() => {
      return props.sceneValue === "Manual_cleaning" ? ManualWorkers : VehicleWorkers;
    })

    const schedulTotal = computed(() => {
      return props.sceneValue === "Manual_cleaning" ? manualSchedulTotal.value : vehicleSchedulTotal.value;
    })

    const finishRate = computed(() => {
      return props.sceneValue === "Manual_cleaning" ? manualFinishRate.value : vehicleFinishRate.value;
    })

    fetchBasicLedger();
    fetchData();

    return {
      tableRef,
      basicLedger,
      workers,
      vehicles,
      schedulTotal,
      finishRate,
      tableModelVisible,
      completionChartVisible,
      sceneType,
      isAttendance,
      curStatus,
      handlerClick,
      fetchData,
    }
  },
})
</script>

<style lang="less">
.job-panel {
	position: absolute;
	top: 16px;
	left: 16px;
	z-index: 1;
	width: 423px;
	background: #FFFFFF;
	box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2);
	border-radius: 5px;

	&__title {
		font-size: 16px;
		font-weight: 500;
		color: #181B28;
		height: 51px;
		line-height: 51px;
		text-align: center;
		border-bottom: 1px solid #E4E4E4;
	}

	&__item {
		border-bottom: 4px solid #F6F8FA;

		&:last-child {
			border-bottom: none;
		}

		&-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 12px;
			color: rgba(0,0,0,0.6);
			margin-right: 16px;
		}

		&-body {
			display: flex;
			justify-content: space-evenly;
			margin: 15px 0 20px;

			&--item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;

				&-value {
					font-size: 24px;
					font-weight: 500;
					color: #181B28;
				}

				.blue {
					color: #246FF8;
				}

				&-label {
					font-size: 12px;
					color: rgba(6,0,0,0.6);
				}
			}

			.line::before {
				content: "";
				position: absolute;
				top: 50%;
				right: -1px;
				transform: translateY(-50%);
				width: 1px;
				height: calc(50% - 1px);
				border-right: 1px solid #E7E7E7;
			}

			.line:last-child::before {
				display: none;
			}

			&--progress {
				width: 100%;
				padding: 0 0 15px 30px;

				.el-progress__text {
					font-size: 12px;
					color: #0487FF;
				}
				
				.el-progress-bar__inner {
					background: linear-gradient(90deg, #03B1FC 0%, #0487FF 100%);
				}

				.el-progress-bar__outer {		
					background: #D8D8D8;
				}
			}
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			padding: 0 30px;
		}
	}

	&--title {
		font-size: 14px;
		font-weight: 500;
		color: #161B2A;
		display: flex;
		align-items: center;
		margin: 18px 18px 0 18px;

		&::before {
			content: "";
			display: inline-block;
			width: 3px;
			height: 14px;
			background: #246FF8;
			margin-right: 5px;
		}
	}

	&--tip {
		padding-top: 18px;
	}
	
}
</style>
