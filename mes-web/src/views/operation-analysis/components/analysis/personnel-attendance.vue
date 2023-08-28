<template>
  <div class="personnel-attendance">
    <div class="personnel-attendance__header">
      <data-card-header
        ref="headerRef"
        title="人员出勤"
      />
    </div>
    <div class="personnel-attendance__body">
      <div class="personnel-attendance__body-header">
        <div
          v-for="(item,index) in headerData"
          :key="index"
          class="personnel-attendance__body-header-item"
        >
          {{ item.name }}：<label>{{ item.number }}</label>{{ item.unit }}
        </div>
      </div>
      <div class="personnel-attendance__body-chart">
        <div class="personnel-attendance__body-chart--attendance">
          <div
            class="personnel-attendance__body-chart--attendance-rate"
          >
            出勤率：<span>85.2%</span>
          </div>
          <!-- <div
            v-show="headerTab === 1"
            class="personnel-attendance__body-chart--attendance-state"
          >
            <span>人员数量</span>
            <span>车辆数</span>
          </div> -->
          <div
            class="personnel-attendance__body-chart--attendance-number"
          >
            <div>单位：人</div>
            <div>
              <span>出勤人数</span>
              <span>出勤率</span>
            </div>
          </div>
          <!-- <div
            v-show="headerTab === 1"
            class="personnel-attendance__body-chart--attendance-unit"
          >
            <div>单位：人</div>
            <div>单位：台</div>
          </div> -->
        </div>
        <div
          v-show="headerTab === 0"
          ref="attendanceChartRef"
          class="personnel-attendance__body-chart--item"
        />
        <!-- <div
          v-show="headerTab === 1"
          ref="stateChartRef"
          class="personnel-attendance__body-chart--item"
        /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BarChart, LineChart, LineSeriesOption, PictorialBarChart, PictorialBarSeriesOption, PieChart } from "echarts/charts";
import { GridComponent, GridComponentOption, LegendComponent, PolarComponent, TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption } from "echarts/components";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import type { BarSeriesOption, LegendComponentOption, PieSeriesOption, YAXisOption } from "echarts/types/dist/shared";
import { computed, defineComponent, onMounted, ref, shallowRef, watch } from "vue";
import DataCardHeader from "../data-card-header.vue";

type EChartsOption = echarts.ComposeOption<
	| TooltipComponentOption
	| GridComponentOption
  | LineSeriesOption
	| PieSeriesOption
	| TitleComponentOption
	| YAXisOption
	| BarSeriesOption
	| LegendComponentOption
	| PictorialBarSeriesOption
>;

export default defineComponent({
  name: "PersonnelAttendance",
  components: {
    DataCardHeader,
  },
  props: {
    footerTab: {
      type: String,
      default: "Manual_cleaning",
    },
  },
  setup (props) {
    const headerRef = ref();
    const activeTab = ref(0);
    const headerTab = ref(0);
    const attendanceChartRef = ref();
    const attendanceChart = shallowRef<echarts.ECharts>();
    const stateChartRef = ref();
    const stateChart = shallowRef<echarts.ECharts>();

    echarts.use(
      [
        TooltipComponent,
        LineChart,
        GridComponent,
        SVGRenderer,
        GridComponent,
        TitleComponent,
        BarChart,
        LegendComponent,
        PieChart,
        PictorialBarChart,
        PolarComponent
      ]
    );

    const manualAttendanceHeaderData = [
      {name: "出勤人数", number: 198, unit: "人",},
      {name: "缺勤人数", number: 0, unit: "人",}
    ]

    const vehicleAttendanceHeaderData = [
      {name: "出勤人数", number: 30, unit: "人",},
      {name: "缺勤人数", number: 0, unit: "人",}
    ]

    const stateHeaderData = [
      {name: "人员当前在岗率", number: 0, unit: "%",},
      {name: "车辆当前在岗率", number: 0, unit: "%",}
    ]

    const headerData = computed(() => {
      const attendanceHeaderData = props.footerTab === "Manual_cleaning" ? manualAttendanceHeaderData : vehicleAttendanceHeaderData

      return headerTab.value === 0 ? attendanceHeaderData : stateHeaderData
    })

    const manualAttendanceChartOption:EChartsOption = {
      color: ["#57D1ED", "#18B4F9"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          // label: {
          //   backgroundColor: "#6a7985",
          // },
        },
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "5%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["7-12", "7-13", "7-14", "7-15", "7-16", "7-17", "7-18"],
          boundaryGap: false,
          axisLabel: {
          // @ts-ignore
            textStyle: {
              color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
            },
          },
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 2, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 1, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          axisLabel: {
          // @ts-ignore
            textStyle: {
              color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
            },
          },
        },
        {
          type: "value",
          min: 0,
          max: 100,
          axisLabel: {
            formatter: "{value} %",
            // @ts-ignore
            textStyle: {
              color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 2, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 1, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
        }
      ],
      series: [
        {
          name: "出勤人数",
          type: "line",
          stack: "Total",
          showSymbol: false,
          yAxisIndex:0,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(29, 253, 253, 1)", },
              { offset: 1, color: "rgba(50, 228, 253, 0)", }
            ]),
          },
          lineStyle:{
            color: "#57D1ED",
          },
          emphasis: {
            focus: "series",
          },
          data: [178,189,192,187,184,194,197],
        },
        {
          name: "出勤率",
          type: "line",
          stack: "Total",
          showSymbol: false,
          yAxisIndex:1,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(28, 162, 251, 0.99)", },
              { offset: 1, color: "rgba(27, 162, 251, 0)", }
            ]),
          },
          lineStyle:{
            color: "#18B4F9",
          },
          emphasis: {
            focus: "series",
          },
          data: [80,80,86,89,84,89,86],
        }
      ],
    }

    const vehicleAttendanceChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "5%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["7-12", "7-13", "7-14", "7-15", "7-16", "7-17", "7-18"],
          boundaryGap: false,
          axisLabel: {
          // @ts-ignore
            textStyle: {
              color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
            },
          },
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 2, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 1, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          axisLabel: {
          // @ts-ignore
            textStyle: {
              color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
            },
          },
        },
        {
          type: "value",
          min: 0,
          max: 100,
          axisLabel: {
            formatter: "{value} %",
            // @ts-ignore
            textStyle: {
              color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 2, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 1, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
        }
      ],
      series: [
        {
          name: "出勤人数",
          type: "line",
          stack: "Total",
          showSymbol: false,
          yAxisIndex:0,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(29, 253, 253, 1)", },
              { offset: 1, color: "rgba(50, 228, 253, 0)", }
            ]),
          },
          lineStyle:{
            color: "#57D1ED",
          },
          emphasis: {
            focus: "series",
          },
          data: [28,30,27,25,28,15,20],
        },
        {
          name: "出勤率",
          type: "line",
          stack: "Total",
          showSymbol: false,
          yAxisIndex:1,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(28, 162, 251, 0.99)", },
              { offset: 1, color: "rgba(27, 162, 251, 0)", }
            ]),
          },
          lineStyle:{
            color: "#18B4F9",
          },
          emphasis: {
            focus: "series",
          },
          data: [83,100,80,75,83,50,60],
        }
      ],
    }
		
    const stateChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["脱岗", "在岗", "聚岗", "坐岗", "休息", "未开始"],
        boundaryGap: [0, 0.01],
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(181, 201, 220, .1)", // 分割线颜色
            width: 1, // 分割线宽度
            type: "solid", // 分割线类型（实线、虚线、点线等）
          },
        }, 
        axisLabel: {
          // @ts-ignore
          textStyle: {
            color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
          },
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 2, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 1, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          axisLabel: {
          // @ts-ignore
            textStyle: {
              color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
            },
          },
        },
        {
          type: "value",
          min: 0,
          max: 50,
          axisLabel: {
            // formatter: "{value} %",
            // @ts-ignore
            textStyle: {
              color: "rgba(255, 255, 255, .3)", // y 轴文本颜色
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 2, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(181, 201, 220, .1)", // 分割线颜色
              width: 1, // 分割线宽度
              type: "dotted", // 分割线类型（实线、虚线、点线等）
            },
          },
        }
      ],
      series: [
        {
          name: "单位：人",
          type: "bar",
          yAxisIndex: 0,
          data: [21,15,20,15,20,15],
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(206, 126, 51, 1)", },
              { offset: 1, color: "rgba(73, 147, 255, 0)", }
            ]),
          },
        },
        {
          name: "单位：台",
          type: "bar",
          yAxisIndex: 1,
          data: [34,41,34,41,34,41],
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(36, 220, 247, 1)", },
              { offset: .69, color: "rgba(36, 220, 247, 1)", },
              { offset: 1, color: "rgba(33, 170, 221, 0)", }
            ]),
          },
        }
      ],
    }


    onMounted(() => {
      attendanceChart.value = echarts.init(attendanceChartRef.value);
      attendanceChart.value.showLoading();
      // stateChart.value = echarts.init(stateChartRef.value);
      // stateChart.value.showLoading();
      fetchAttendance();
      // fetchState();
    })

    const fetchAttendance = () => {
      attendanceChart.value?.hideLoading();
      attendanceChart.value?.setOption(props.footerTab === "Manual_cleaning" ? manualAttendanceChartOption : vehicleAttendanceChartOption);
    }

    const fetchState = () => {
      stateChart.value?.hideLoading();
      stateChart.value?.setOption(stateChartOption);
    }

    watch(() => props.footerTab, () => {
      headerRef.value?.handleTabClick(0);
      fetchAttendance();
    })

    return {
      headerRef,
      activeTab,
      headerTab,
      attendanceChartRef,
      stateChartRef,
      headerData,
    }
  },
})
</script>

<style lang="less">
.personnel-attendance {
	width: 100%;
	height: 38%;
	box-sizing: border-box;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__header {
		position: relative;

		&.active {
			font-size: 24px;
			font-weight: bold;
			color: #E2EBF1;
		}

		.not-selected {
			color: rgba(226, 235, 241, .6);
			font-size: 18px;
			font-weight: bold;
		}

		&-status {
			position: absolute;
			left: 150px;
			top: 50%;
		}
	}

	&__body {
		padding: 20px;

		&-header {
			display: flex;

			&-item {
				// width: 114px;
				height: 40px;
				background: linear-gradient(138deg, rgba(36, 219, 247, .2) 0%, rgba(72, 150, 255, .2) 100%);
				border-radius: 5px;
				color: rgba(225, 255, 255, .8);
				font-size: 13px;
				line-height: 40px;
				text-align: center;
				padding: 0 20px;

				label {
					font-size: 20px;
					color: #fff;
				}

				&:first-child {
					margin-right: 11px;
				}
			}
		}

		&-chart {
			margin-top: 24px;

			&--attendance {
				&-rate {
					font-size: 13px;
					color: rgba(225, 255, 255, .8);

					span {
						color: #4EC9FF;
						font-size: 17px;
					}
				}

				&-state {
					color: rgba(225, 255, 255, .8);
					font-size: 13px;
					text-align: right;
					padding-top: 6px;
					
					& > span:last-child {
						margin-left: 20px;
					}

					& > span:first-child::before {
							content: "";
							display: inline-block;
							width: 10px;
							height: 10px;
							background: #57D1ED;
							margin-right: 5px;
						}

					& > span:last-child::before {
							content: "";
							display: inline-block;
							width: 10px;
							height: 10px;
							background: #CE7E33;
							margin-right: 5px;
						}
				}

				&-number,&-unit {
					display: flex;
					justify-content: space-between;
					color: rgba(225, 255, 255, .8);
					font-size: 13px;
					margin-top: 10px;
				}

				&-number {

					& > div:last-child {
						
						& > span {
							margin-left: 20px;
						}

						& > span:first-child::before {
								content: "";
								display: inline-block;
								width: 10px;
								height: 10px;
								background: #57D1ED;
								margin-right: 5px;
							}

						& > span:last-child::before {
								content: "";
								display: inline-block;
								width: 10px;
								height: 10px;
								background: #18B4F9;
								margin-right: 5px;
							}
					}
				}
			}

			&--item {
				margin-top: 11px;
				width: 370px;
				height: 130px;
			}
		}
	}
}
</style>
