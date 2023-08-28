<template>
  <div class="dashboard-items-content">
    <div
      class="dashboard-items-content--title"
      style="padding: 0 0 10px 50px;"
    >
      对象及其个数
    </div>
    <div
      ref="pointChartRef"
      class="dashboard-items-chart"
    />
  </div>
  
  <div class="dashboard-items-content">
    <div
      class="dashboard-items-content--title"
      style="padding: 0 0 10px 50px;"
    >
      今日督查情况
    </div>
    <div class="dashboard-items-content--header">
      <div class="title--center">
        {{ today }}
      </div>
      <div class="title--right">
        <div class="title--right-one">
          已督查
        </div>
        <div class="title--right-two">
          应督查
        </div>
      </div>
    </div>
    <div
      ref="todayChartRef"
      class="dashboard-items-chart"
    />
  </div>
</template>

<script lang="ts">
import { mesIndexQueryInspectionStatisticData, mesIndexQueryPointStatisticData } from "@/api/mes/indexController";
import { useProject } from "@/stores/project";
import dayjs from "dayjs";
import { BarChart, LineChart, LineSeriesOption } from "echarts/charts";
import { GridComponent, GridComponentOption, LegendComponent, TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption } from "echarts/components";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import type { BarSeriesOption, LegendComponentOption, YAXisOption } from "echarts/types/dist/shared";
import { defineComponent, onMounted, ref, shallowRef } from "vue";

type EChartsOption = echarts.ComposeOption<
	| TooltipComponentOption
	| GridComponentOption
  | LineSeriesOption
	| TitleComponentOption
	| YAXisOption
	| BarSeriesOption
	| LegendComponentOption
>;

export default defineComponent({
  name: "DashboardItems",
  setup () {
    const project = useProject();
    const pointChartRef = ref();
    const pointChart = shallowRef<echarts.ECharts>();
    const todayChartRef = ref();
    const todayChart = shallowRef<echarts.ECharts>();
    const today = ref();

    echarts.use(
      [
        TooltipComponent,
        LineChart,
        GridComponent,
        SVGRenderer,
        GridComponent,
        TitleComponent,
        BarChart,
        LegendComponent
      ]
    );

    let pointChartOption:EChartsOption = {
      tooltip:{
        // trigger: "axis",
        // backgroundColor:"rgba(174, 201, 251, 1)",
        // borderWidth: 0,
        // padding: [5, 10],
        // textStyle:{color:"#000",},
        // formatter: function (params: any) {
        //   return params[0].data;
        // },
      },
      legend: [
      ],
      grid:{
        top:"10%",
        left:"2%",
        right:"2%",
        bottom:"0%",
        containLabel: true,
        show: true,
        borderColor: "#E7E7E7",
      },
      xAxis: {
        type: "category",
        axisLabel: {
          color: "#000",
        },
        data: [],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: "#000",
        },
      },
      series: [
        {
          type: "line",
          label: {
            show: true,
            position: "top",
          },
          data: [],
          smooth: true,
          lineStyle:{
            color: "rgba(174, 201, 251, 1)",
          },
          areaStyle:{
            opacity:0.2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(174, 201, 251, 1)",
              },
              {
                offset: 1,
                color: "rgba(226, 234, 247, 0)",
              }
            ]),
          },
        }
      ],
    };

    let todayChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
        },
      },
      legend: {},
      grid: {
        top: "10%",
        left: "2%",
        right: "2%",
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
          color:"#F8C224",
          barGap: 0,
          label: {
            show: true,
            position: "top",
          },
          barMaxWidth: 60,
          data: [],
        },
        {
          name: "",
          type: "bar",
          color: "#2B72F1",
          barGap: 0,
          label: {
            show: true,
            position: "top",
          },
          barMaxWidth: 60,
          data: [],
        }
      ],
    };

    onMounted(() => {
      pointChart.value = echarts.init(pointChartRef.value);
      pointChart.value.showLoading();
      remotePoint();

      todayChart.value = echarts.init(todayChartRef.value);
      todayChart.value.showLoading();
      remoteToday();
    });

    const remotePoint = async () => {
      try {
        let {data,} = await mesIndexQueryPointStatisticData({projectId: project.$state.projectId as number,});
        // @ts-ignore
        pointChartOption.xAxis.data = data.map(({name,}) => name);
        // @ts-ignore
        pointChartOption.series[0].data = data.map(({count,}) => count);

        pointChart.value?.hideLoading();
        pointChart.value?.setOption(pointChartOption);
      } catch (error) {
        console.error(error);
				
      }
    };

    const remoteToday = async () => {
      try {
        let {data,} = await mesIndexQueryInspectionStatisticData({projectId: project.$state.projectId as number,});
        // @ts-ignore
        todayChartOption.xAxis.data = data.map(({inspectionUserName,}) => inspectionUserName);
        // @ts-ignore
        todayChartOption.series[0].data = data.map(({doInspectionCount,}) => doInspectionCount);
        // @ts-ignore
        todayChartOption.series[1].data = data.map(({inspectionCount,}) => inspectionCount);

        today.value = data[0]?.inspectionDate || dayjs().format("YYYY-MM-DD");

        todayChart.value?.hideLoading();
        todayChart.value?.setOption(todayChartOption);
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener("resize", () => {
      pointChart.value?.resize();
      todayChart.value?.resize();
    });

    return {
      pointChartRef,
      todayChartRef,
      today,
    }
  },
})
</script>

<style lang="less">
	.dashboard-items-chart {
		width: 100%;
		height: 354px;
	}

	.dashboard-items-content {
		position: relative;
		box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.12);
		border-radius: 8px;
		background-color: #fff;
		margin-bottom: 24px;
		padding: 20px 0;

		.dashboard-items-content--header {
			display: flex;
			align-items: center;
			height: 40px;
			font-size: 18px;

			.title {
				
				&--center {
					width: 137px;
					height: 25px;
					font-size: 18px;
					font-weight: 500;
					color: #063A99;
					margin: 0 auto;
				}

				&--right {
					display: flex;
					font-size: 12px;
					position: absolute;
					right: 25px;

					&-one {
						margin-right: 20px;
						&::before {
							content: '';
							display: inline-block;
							width: 12px;
							height: 12px;				
							background: #F8C224;
							margin-right: 5px;
						}
					}

					&-two {					
						&::before {
							content: '';
							display: inline-block;
							width: 12px;
							height: 12px;				
							background: #2B72F1;
							margin-right: 5px;
						}
					}
				}
			}
		}
	}


</style>
