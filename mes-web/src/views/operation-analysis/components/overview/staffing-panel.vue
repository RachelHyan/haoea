<template>
  <div class="staffing-panel">
    <div class="staffing-panel__header">
      <data-card-header title="人员配置" />
      <span class="staffing-panel__header-total">人员总数：<label>{{ userTotal }}</label>人</span>
    </div>
    <div class="staffing-panel__body">
      <div class="staffing-panel__body--top">
        <div class="staffing-panel__body--top-tips">
          <span class="staffing-panel__body--top-tips--unit">单位：人</span>
          <span class="staffing-panel__body--top-tips--number">人员数量</span>
        </div>
        <div
          ref="personnelChartRef"
          class="staffing-panel__body--top-chart"
        />
      </div>
      <div class="staffing-panel__body--center">
        <div class="staffing-panel__body--center-img">
          <img
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/data-man.png"
            alt=""
            height="38"
            width="38"
          >
          <img
            src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/data-woman.png"
            alt=""
            height="38"
            width="38"
          >
        </div>
        <div
          ref="genderChartRef"
          class="staffing-panel__body--center-chart"
        />
      </div>
      <div class="staffing-panel__body--bottom">
        <div class="staffing-panel__body--bottom-tips">
          <span class="staffing-panel__body--bottom-tips--unit">平均年龄：<label style="color:#4EC9FF;font-size: 17px;">{{ userAverageAge }}</label>岁</span>
          <span class="staffing-panel__body--bottom-tips--number">年龄结构</span>
        </div>
        <div
          ref="ageChartRef"
          class="staffing-panel__body--bottom-chart"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mesScreenQueryUserGenderCount, mesScreenQueryUserTypeCount, mesScreenUserTypeCountDTO } from "@/api/mes/screenController";
import { BarChart, LineChart, LineSeriesOption, PictorialBarChart, PictorialBarSeriesOption, PieChart } from "echarts/charts";
import { GridComponent, GridComponentOption, LegendComponent, TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption } from "echarts/components";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import type { BarSeriesOption, LegendComponentOption, PieSeriesOption, YAXisOption } from "echarts/types/dist/shared";
import { defineComponent, onMounted, ref, shallowRef } from "vue";
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
  name: "StaffingPanel",
  components: {
    DataCardHeader,
  },
  setup () {
    const personnelChartRef = ref();
    const personnelChart = shallowRef<echarts.ECharts>();
    const genderChartRef = ref();
    const genderChart = shallowRef<echarts.ECharts>();
    const ageChartRef = ref();
    const ageChart = shallowRef<echarts.ECharts>();
    const userTotal = ref(0);
    const userAverageAge = ref(0);

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
        PictorialBarChart
      ]
    );

    const personnelChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "0%",
        right: "5%",
        bottom: "0%",
        top: "0%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(181, 201, 220, .2)", // 分割线颜色
            width: 1, // 分割线宽度
            type: "solid", // 分割线类型（实线、虚线、点线等）
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(181, 201, 220, .2)", // 分割线颜色
            width: 2, // 分割线宽度
            type: "solid", // 分割线类型（实线、虚线、点线等）
          },
        },
        axisLabel: {
          // @ts-ignore
          textStyle: {
            color: "#D2E0E2", // y 轴文本颜色
          },
        },
      },
      yAxis: {
        type: "category",
        data: ["车辆作业","人工清扫"],
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(181, 201, 220, .2)", // 分割线颜色
            width: 2, // 分割线宽度
            type: "solid", // 分割线类型（实线、虚线、点线等）
          },
        },
        axisLabel: {
          // @ts-ignore
          textStyle: {
            color: "#fff", // y 轴文本颜色
          },
        },
      },
      series: [
        {
          type: "bar",
          data: [],
          barWidth: 9,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(1, 112, 254, 1)", },
              { offset: 1, color: "rgba(1,112,254,0.3)", }
            ]),
          },
        }
      ],
    }
	
    const genderChartOption:EChartsOption = {
      tooltip: {},
      xAxis: {
        splitLine: { show: false, },
        offset: 10,
        axisLabel: {
          show:false,
        },
      },
      yAxis: {
        data: ["男性", "女性"],
        inverse: true,
        axisTick: { show: false, },
        axisLine: { show: false, },
        axisLabel: {show:false,},
      },
      grid: {
        top: "center",
        height: 100,
        left: 50,
        right: 50,
      },
      series: [
        {
          // current data
          type: "pictorialBar",
          symbol:"square",
          symbolRepeat: "fixed",
          symbolMargin: "80%",
          symbolClip: true,
          symbolSize: [3,16],
          itemStyle: {
            // @ts-ignore
            color: function (params:any) {
              if (params.dataIndex === 0) { // 如果是男性的数据项
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#4992FF", },
                  { offset: .95, color: "#4FDFFF", },
                  { offset: 1, color: "#14366D", }
                ]);
              } else if (params.dataIndex === 1) { // 如果是女性的数据项
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#B249FF", },
                  { offset: .95, color: "#FF4F9B", },
                  { offset: 1, color: "#14366D", }
                ]);
              }
            },
          },
          label: {
            show:true,
            fontSize: 13,
            color: "#fff",
            fontWeight: "bold",
            position:[0,-8],
            formatter: function (params) {
              var prefix = "";
              if (params.dataIndex === 0) { // 如果是男性的数据项
                prefix = "男性：";
              } else if (params.dataIndex === 1) { // 如果是女性的数据项
                prefix = "女性：";
              }
              return prefix + params.value + "人";
            },
          },
          data: [],
          z: 10,
        },
        {
          // full data
          type: "pictorialBar",
          symbol:"square",
          itemStyle: {
            color: "#14366D",
          },
          label: {
            show: true,
            position: "right",
            offset: [10, 0],
            color: "#4EDFFF",
            fontSize: 12,
            opacity:1,
          },
          animationDuration: 0,
          symbolRepeat: "fixed",
          symbolMargin: "80%",
          symbolSize: [3,16],
          data: [],
          z: 5,
        }
      ],
    }

    const ageChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "0%",
        right: "5%",
        bottom: "0%",
        top: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: [],
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
            color: "#D2E0E2", // y 轴文本颜色
          },
          interval: 0,
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(181, 201, 220, .1)", // 分割线颜色
            width: 2, // 分割线宽度
            type: "solid", // 分割线类型（实线、虚线、点线等）
          },
        },
        splitLine: {
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
            color: "#D2E0E2", // y 轴文本颜色
          },
        },
      },
      series: [
        {
          type: "bar",
          data: [],
          barWidth: 12,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#24DCF7", },
              { offset: 1, color: "#4993FF", }
            ]),
          },
        }
      ],
    }

    onMounted(() => {
      personnelChart.value = echarts.init(personnelChartRef.value);
      personnelChart.value.showLoading();
      genderChart.value = echarts.init(genderChartRef.value);
      genderChart.value.showLoading();
      ageChart.value = echarts.init(ageChartRef.value);
      ageChart.value.showLoading();
    })

    const fetchPersonnel = async (projectId:number) => {
      try {
        const {data,} = await mesScreenQueryUserTypeCount({projectId:projectId,});

        if (data.length === 0) {
          userTotal.value = 0;
          // @ts-ignore
          personnelChartOption.series[0].data[0] = [];
        } else {
          userTotal.value = data[0].total + data[1].total;
          // @ts-ignore
          personnelChartOption.series[0].data = data.map((item:any) => {
            return item.total;
          });
        }

        personnelChart.value?.hideLoading();
        personnelChart.value?.setOption(personnelChartOption);
      } catch (error) {
				
      }

    }

    const fetchGender = async (projectId:number) => {
      try {
        const {data,} = await mesScreenQueryUserGenderCount({projectId:projectId,});

        if (data.length === 0) {
					 // @ts-ignore
					 genderChartOption.xAxis.max = 0;
          // @ts-ignore
          genderChartOption.series[0].data = [];
          // @ts-ignore
          genderChartOption.series[0].symbolBoundingData = 0;
          // @ts-ignore
          genderChartOption.series[1].symbolBoundingData = 0;
          // @ts-ignore
          genderChartOption.series[1].label.formatter = function () {
            return "0%";
          };
          // @ts-ignore
          genderChartOption.series[1].data = [];
        } else {
          // @ts-ignore
          genderChartOption.xAxis.max = data[0].total + data[1].total;
          // @ts-ignore
          genderChartOption.series[0].data = data.map((item:any) => {
            return item.total;
          });
          // @ts-ignore
          genderChartOption.series[0].symbolBoundingData = data[0].total + data[1].total;
          // @ts-ignore
          genderChartOption.series[1].symbolBoundingData = data[0].total + data[1].total;
          // @ts-ignore
          genderChartOption.series[1].label.formatter = function (params:any) {
            return ((params.value / (data[0].total + data[1].total)) * 100).toFixed(0) + "%";
          };
          // @ts-ignore
          genderChartOption.series[1].data = data.map((item:any) => {
            return item.total;
          });
        }

        genderChart.value?.hideLoading();
        genderChart.value?.setOption(genderChartOption);
      } catch (error) {
				
      }

    }

    const fetchAge = async (projectId:number) => {
      try {
        const {data,} = await mesScreenUserTypeCountDTO({projectId:projectId,});
				
        if (data.averageAge === 0) {
          userAverageAge.value = 0;
          // @ts-ignore
          ageChartOption.xAxis.data = [];
          // @ts-ignore
          ageChartOption.series[0].data = [];
        } else {
          userAverageAge.value = data.averageAge;

          // @ts-ignore
          ageChartOption.xAxis.data = data.list.map((item:any) => {
            return item.userAge;
          });
          // @ts-ignore
          ageChartOption.series[0].data = data.list.map((item:any) => {
            return item.total;
          });
        }
				
        ageChart.value?.hideLoading();
        ageChart.value?.setOption(ageChartOption);
      } catch (error) {
				
      }
    }

    return {
      personnelChartRef,
      genderChartRef,
      ageChartRef,
      userTotal,
      userAverageAge,
      fetchPersonnel,
      fetchGender,
      fetchAge,
    }
  },
})
</script>

<style lang="less">
.staffing-panel {
	width: 100%;
	height: 71.5%;
	box-sizing: border-box;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__header {
		position: relative;

		&-total {
			position: absolute;
			right: 20px;
			top: 50%;
			color: #FFFFFF;
			font-size: 13px;
			label {
				color: #4EC9FF;
				font-size: 17px;
			}
		}
	}

	&__body {
		padding: 18px 20px 20px 34px;

		&--top {

			&-tips {
				display: flex;
				justify-content: space-between;
				font-size: 13px;
				color: #FFFFFF;
				margin-bottom: 20px;

				&--number {

					&::before {
						content: "";
						display: inline-block;
						width: 10px;
						height: 10px;
						background: #00B4FA;
						margin-right: 5px;
					}
				}
			}
			
			&-chart {
				width: 100%;
				height: 100px;
			}
		}

		&--center {
			display: flex;
			position: relative;

			&-img {
				position: absolute;
				top: 50px;
				display: flex;
				flex-direction: column;
				
				img {
					&:first-child {
						margin-bottom: 15px;
					}
				}
			}
			

			&-chart {
				width: 100%;
				height: 200px;
			}
		}

		&--bottom {

			&-tips {
				display: flex;
				justify-content: space-between;
				font-size: 13px;
				color: #FFFFFF;
				margin-bottom: 10px;
			}

			&-chart {
				width: 100%;
				height: 200px;
			}
		}
	}
}
</style>
