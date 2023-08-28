<template>
  <default-layout>
    <div
      class="task-board"
    >
      <div
        v-show="!project.$state.projectId"
        class="total-items"
      >
        <div class="total-items__header">
          <div class="total-items__header-panel">
            <div class="total-items__header-panel--title">
              昨日数据统计
            </div>
            <div class="total-items__header-panel--value">
              <div class="total-items__header-panel--value-data">
                {{ overviewData.projectTotal }}
              </div>
              <div class="total-items__header-panel--value-title">
                项目总数目
              </div>
            </div>
            <div class="total-items__header-panel--value">
              <div class="total-items__header-panel--value-data">
                {{ overviewData.projectPeopleTotal }}
              </div>
              <div class="total-items__header-panel--value-title">
                项目总人数
              </div>
            </div>
            <div class="total-items__header-panel--value">
              <div class="total-items__header-panel--value-data">
                {{ overviewData.projectCostTotal }}
              </div>
              <div class="total-items__header-panel--value-title">
                项目总成本
              </div>
            </div>
          </div>
          <div class="total-items__header-tips">
            <span>人力</span>
            <span>车辆</span>
            <span>其他</span>
          </div>
        </div>
        <div class="total-items__chart">
          <div class="total-items__chart--header">
            <p class="total-items__chart--header-name">
              成本统计
            </p>
            <div class="total-items__chart--header-form">
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                :clearable="false"
                @change="getDataByDate"
              />
            </div>
          </div>
          <div
            ref="totalItemsChartRef"
            class="total-items__chart--body"
          />
        </div>
      </div>
      <div
        class="single-item"
        :style="{height: project.$state.projectId ? 'calc(100vh - 260px)' : '383px',marginBottom: project.$state.projectId ? '80px' : '30px'}"
      >
        <div class="single-item__header">
          <div
            v-show="!project.$state.projectId"
            class="single-item__header-select"
          >
            <el-select
              v-model="projectId"
              placeholder="项目名称"
              style="width: 180px;"
              filterable
              @change="handleChangeProject"
            >
              <el-option
                v-for="item in projectList"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId"
              />
            </el-select>
          </div>
          <div
            v-show="project.$state.projectId"
            class="single-item__header-panel"
          >
            <div class="single-item__header-panel--title">
              昨日数据统计
            </div>
            <div class="single-item__header-panel--value">
              <div class="single-item__header-panel--value-data">
                {{ projectOverviewData.projectPeopleTotal }}
              </div>
              <div class="single-item__header-panel--value-title">
                项目人数
              </div>
            </div>
            <div class="single-item__header-panel--value">
              <div class="single-item__header-panel--value-data">
                {{ projectOverviewData.projectCostTotal }}
              </div>
              <div class="single-item__header-panel--value-title">
                项目成本
              </div>
            </div>
          </div>
          <div class="single-item__header-tips">
            <span>人力</span>
            <span>车辆</span>
            <span>其他</span>
          </div>
        </div>
        <div class="single-item__body">
          <div
            v-show="!project.$state.projectId"
            class="single-item__body-panel"
          >
            <div class="single-item__body-panel--title">
              昨日数据统计
            </div>
            <div class="single-item__body-panel--value">
              <div class="single-item__body-panel--value-data">
                {{ projectOverviewData.projectPeopleTotal }}
              </div>
              <div class="single-item__body-panel--value-title">
                项目人数
              </div>
            </div>
            <div class="single-item__body-panel--value">
              <div class="single-item__body-panel--value-data">
                {{ projectOverviewData.projectCostTotal }}
              </div>
              <div class="single-item__body-panel--value-title">
                项目成本
              </div>
            </div>
          </div>
          <div
            class="single-item__body-chart"
            :style="{marginLeft: project.$state.projectId ? '0' : '25px'}"
          >
            <div class="single-item__body-chart--form">
              <el-date-picker
                v-model="month"
                style="width: 180px;"
                type="month"
                class="search--picker"
                value-format="YYYY-MM"
                :clearable="false"
                @change="getDataByProject"
              />
            </div>
            <div
              ref="singleItemChartRef"
              class="single-item__body-chart--item"
              :style="{height: project.$state.projectId ? '90%' : '86%'}"
            />
            <div
              v-show="project.$state.projectId"
              class="single-item__body-chart--footer"
            >
              {{ project.$state.projectName }}单日项目成本统计
            </div>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { mesIndexQueryIndexDataBoard, mesIndexSelectDayExpense, mesIndexSelectMonthExpense } from "@/api/mes/indexController";
import { mesProjectQueryProjectSelectList } from "@/api/mes/projectController";
import { DefaultLayout } from "@/layout";
import { useProject } from "@/stores/project";
import { useLocalStorage } from "@vueuse/core";
import dayjs from "dayjs";
import type { BarSeriesOption } from "echarts/charts";
import { BarChart } from "echarts/charts";
import type {
  GridComponentOption,
  LegendComponentOption, TooltipComponentOption
} from "echarts/components";
import {
  GridComponent,
  LegendComponent, TooltipComponent
} from "echarts/components";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { Ref, defineComponent, nextTick, onMounted, reactive, ref, shallowRef, watch } from "vue";

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
>;

export default defineComponent({
  name: "DataOverview",
  components: {
    DefaultLayout,
  },
  setup () {
    const collapsed:Ref<boolean> = useLocalStorage("collapsed",false);
    const project = useProject();
    const projectId = ref<number | undefined>();
    const totalItemsChartRef = ref();
    const totalItemsChart = shallowRef<echarts.ECharts>();
    const dateRange = ref<string[]>([dayjs().startOf("month").format("YYYY-MM-DD"),dayjs().format("YYYY-MM-DD")]);
    const singleItemChartRef = ref();
    const singleItemChart = shallowRef<echarts.ECharts>();
    const month = ref<string>(dayjs().format("YYYY-MM"));
    const remoteProjectLoading: Ref<boolean> = ref<boolean>(false);
    const overviewData = reactive<MES.IndexDataBoardDTO>({
      projectTotal: 0,
      projectPeopleTotal: 0,
      projectCostTotal: 0,
      projectAttendanceRate: 0,
      projectFinishRate: 0,
    });
    const projectOverviewData = reactive<MES.IndexDataBoardDTO>({
      projectTotal: 0,
      projectPeopleTotal: 0,
      projectCostTotal: 0,
      projectAttendanceRate: 0,
      projectFinishRate: 0,
    });
    const projectList = ref<MES.ProjectSelectDTO[]>([]);


    echarts.use([
      TooltipComponent,
      LegendComponent,
      GridComponent,
      BarChart,
      SVGRenderer
    ]);

    let totalItemsChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
        },
      },
      grid: {
        top: "2%",
        left: "1%",
        right: "1%",
        bottom: "2%",
        containLabel: true,
        show: true,
        borderColor: "#E7E7E7",
      },
      xAxis: {
        type: "category",
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "",
          type: "bar",
          color:"#002E82",
          stack: "total",
          barMaxWidth: 60,
          data: [],
          tooltip: {
            valueFormatter: (value:any) => {
              return `${value}元`;
            },
          },
        },
        {
          name: "",
          type: "bar",
          color: "#246FF8",
          stack: "total",
          barMaxWidth: 60,
          data: [],
          tooltip: {
            valueFormatter: (value:any) => {
              return `${value}元`;
            },
          },
        },
        {
          name: "",
          type: "bar",
          color: "#91B7FD",
          stack: "total",
          barMaxWidth: 60,
          data: [],
          tooltip: {
            valueFormatter: (value:any) => {
              return `${value}元`;
            },
          },
        }
      ],
    };

    let singleItemChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
        },
      },
      grid: {
        top: "2%",
        left: "1%",
        right: "1%",
        bottom: "2%",
        containLabel: true,
        show: true,
        borderColor: "#E7E7E7",
      },
      xAxis: {
        type: "category",
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "",
          type: "bar",
          color:"#002E82",
          stack: "total",
          data: [],
          tooltip: {
            valueFormatter: (value:any) => {
              return `${value}元`;
            },
          },
        },
        {
          name: "",
          type: "bar",
          color: "#246FF8",
          stack: "total",
          data: [],
          tooltip: {
            valueFormatter: (value:any) => {
              return `${value}元`;
            },
          },
        },
        {
          name: "",
          type: "bar",
          color: "#91B7FD",
          stack: "total",
          data: [],
          tooltip: {
            valueFormatter: (value:any) => {
              return `${value}元`;
            },
          },
        }
      ],
    };
    
    onMounted(() => {
      totalItemsChart.value = echarts.init(totalItemsChartRef.value);
      totalItemsChart.value.showLoading();
      singleItemChart.value = echarts.init(singleItemChartRef.value);
      singleItemChart.value.showLoading();
    });

    const remoteProject = async () => {
      try {
        const {data,} = await mesProjectQueryProjectSelectList({});
        if (data.length === 0) {
          singleItemChart.value?.hideLoading();
        }

        projectList.value = data;
        projectId.value = project.$state.projectId ? project.$state.projectId : data[0].projectId;
				
        getProjectByOverview();
        getDataByProject();
      }catch (error) {}
    };

    const getDataByOverview = async () => {
      try {
        let { data, } = await mesIndexQueryIndexDataBoard({});
        overviewData.projectTotal = data.projectTotal;
        overviewData.projectPeopleTotal = data.projectPeopleTotal;
        overviewData.projectCostTotal = data.projectCostTotal;
        overviewData.projectAttendanceRate = data.projectAttendanceRate;
        overviewData.projectFinishRate = data.projectFinishRate;
      }catch (error) {}
    };

    const getDataByDate = async () => {
      try {
        let res = await mesIndexSelectDayExpense({startDate: <string>dateRange.value.at(0),endDate: <string>dateRange.value.at(1),});
        
        // @ts-ignore
        totalItemsChartOption.xAxis.data = res.data.map(({projectName,}) => projectName);
        // @ts-ignore
        totalItemsChartOption.series[0].data = res.data.map(({expenseList,}) => expenseList?.manpower);
        // @ts-ignore
        totalItemsChartOption.series[1].data = res.data.map(({expenseList,}) => expenseList?.car);
        // @ts-ignore
        totalItemsChartOption.series[2].data = res.data.map(({expenseList,}) => expenseList?.other);
        totalItemsChart.value?.hideLoading();
        totalItemsChart.value?.setOption(totalItemsChartOption);
      } catch (error) {
      }
    };

    const getProjectByOverview = async () => {
      try {
        let { data, } = await mesIndexQueryIndexDataBoard({projectId: projectId.value,});
        projectOverviewData.projectTotal = data.projectTotal;
        projectOverviewData.projectPeopleTotal = data.projectPeopleTotal;
        projectOverviewData.projectCostTotal = data.projectCostTotal;
        projectOverviewData.projectAttendanceRate = data.projectAttendanceRate;
        projectOverviewData.projectFinishRate = data.projectFinishRate;
      }catch (error) {}
    };

    const handleChangeProject = (value:any) => {
      projectId.value = value??projectList.value[0].projectId;
      month.value = dayjs().format("YYYY-MM");
      getProjectByOverview();
      getDataByProject();
    };

    const getDataByProject = async () => {
      try {
        let res = await mesIndexSelectMonthExpense({month:month.value,projectId:<number>projectId.value,});
        // @ts-ignore
        singleItemChartOption.series[0].data = res.data.manpower;
        // @ts-ignore
        singleItemChartOption.series[1].data = res.data.car;
        // @ts-ignore
        singleItemChartOption.series[2].data = res.data.other;
        // @ts-ignore
        singleItemChartOption.xAxis.data = res.data.manpower?.map((_:number,i:number) => {
          return month.value.split("-").at(1) + "/" + (i +1);
        });
				
        singleItemChart.value?.hideLoading();
        singleItemChart.value?.setOption(singleItemChartOption);
      } catch (error) {
      }
    };


    window.addEventListener("resize", () => {
      totalItemsChart.value?.resize();
      singleItemChart.value?.resize();
    });

    getDataByOverview();
    remoteProject();
    getDataByDate();

    watch(() => project.$state.projectId, (value) => {
      handleChangeProject(value);
			
      nextTick(() => {
        totalItemsChart.value?.resize();
        singleItemChart.value?.resize();
      });
    });


    watch(() => collapsed.value, (value) => {
      nextTick(() => {
        totalItemsChart.value?.resize();
        singleItemChart.value?.resize();
      });
    })
    
    return {
      project,
      totalItemsChartRef,
      dateRange,
      singleItemChartRef,
      month,
      projectId,
      overviewData,
      projectOverviewData,
      projectList,
      remoteProjectLoading,
      getDataByDate,
      getDataByProject,
      handleChangeProject,
      remoteProject,
    }
  },
})
</script>
<style lang="less">
.task-board {
	min-height: calc(100vh - 160px);
	// width: calc(100vw - 448px);
	display: flex;
	flex-direction: column;
	
	.total-items {

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			&-panel {
				width: 614px;
				height: 75px;
				background: linear-gradient(176deg, #E4F0FF 0%, #FFFFFF 100%);
				box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.07);
				border-radius: 8px;
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				text-align: center;
				box-sizing: border-box;

				&--title {
					font-size: 12px;
					padding: 17px 25px;
				}

				&--value {
					margin: 11px 0;

					&-data {
						font-size: 22px;
						font-weight: 500;
						color: #246FF8;
						margin-bottom: 5px;
					}

					&-title {
						font-size: 12px;
						color: rgba(22,27,42,0.56);
					}

					&:nth-child(3) {
						border-left: 1px solid rgba(22,27,42,0.08);
						border-right: 1px solid rgba(22,27,42,0.08);
					}
				}
			}

			&-tips {
				
				> span {
				
					&:not(:last-child) {
						margin-right: 21px;
					}

					&:first-child::before {
						background: #002E82;
					}

					&:nth-child(2)::before {
						background: #246FF8;
					}

					&:last-child::before {
						background: #91B7FD;
					}
					
					&::before {
						content: "";
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 5px;
					}
				}
			}
		}

		&__chart {
			margin-top: 16px;
			width: 100%;
			height: 441px;
			background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
			box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.07);
			border-radius: 8px;
			margin-bottom: 22px;

			&--header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 6px 16px;

				&-name {
					font-size: 12px;
					color: #161B2A;
				}

				&-form {
					margin-right: 5px;
				}
			}

			&--body {
				flex: 1;
				height: 88%;
			}
		}
	}

	.single-item {

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			&-panel {
				width: 402px;
				height: 75px;
				background: linear-gradient(176deg, #E4F0FF 0%, #FFFFFF 100%);
				box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.07);
				border-radius: 8px;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				text-align: center;
				box-sizing: border-box;

				&--title {
					font-size: 12px;
					padding: 17px 25px;
				}

				&--value {
					margin: 11px 0;

					&-data {
						font-size: 22px;
						font-weight: 500;
						color: #246FF8;
						margin-bottom: 5px;
					}

					&-title {
						font-size: 12px;
						color: rgba(22,27,42,0.56);
					}

					&:nth-child(2) {
						border-right: 1px solid rgba(22,27,42,0.08);
					}
				}
			}

			&-tips {

				> span {
				
					&:not(:last-child) {
						margin-right: 21px;
					}

					&:first-child::before {
						background: #002E82;
					}

					&:nth-child(2)::before {
						background: #246FF8;
					}

					&:last-child::before {
						background: #91B7FD;
					}
					
					&::before {
						content: "";
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 5px;
					}
				}
			}
		}

		&__body {
			display: flex;
			margin-top: 16px;
			height: 100%;

			&-panel {
				width: 153px;
				height: 100%;
				background: linear-gradient(176deg, #E4F0FF 0%, #FFFFFF 100%);
				box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.12);
				border-radius: 8px;

				&--title {
					font-size: 12px;
					padding: 10px 0 0 10px;
				}

				&--value {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin: 0 13px;
					padding: 17px 0;

					&-data {
						font-size: 22px;
						font-weight: 500;
						color: #246FF8;
						margin-bottom: 5px;
					}

					&-title {
						font-size: 14px;
						color: rgba(22,27,42,0.56);
					}

					&:nth-child(2) {
						border-bottom: 1px solid rgba(22,27,42,0.08);
					}
				}

			}

			&-chart {
				flex: 1;
				height: 100%;
				background: linear-gradient(180deg, #FFFFFF 0%, #F6F8FA 100%);
				box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.12);
				border-radius: 8px;
				position: relative;
				box-sizing: border-box;
				padding-top: 50px;
				// &--item {
				// 	height: 93%;
				// }

				&--form {
					padding: 10px 16px;
					// 靠右
					position: absolute;
					right: 4px;
					top: 0;
				}

				&--footer {
					text-align: center;
					font-size: 24px;
				}
			}
			
		}
	}
}

// .layout-content-inside .page-root {
// 	background-color: transparent;
// }
</style>
