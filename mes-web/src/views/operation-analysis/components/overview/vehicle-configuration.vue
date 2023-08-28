<template>
  <div class="vehicle-configuration">
    <data-card-header title="车辆配置" />
    <div class="vehicle-configuration__body">
      <div class="vehicle-configuration__body--top">
        <span class="vehicle-configuration__body--top-tip">车辆总数：<label style="color:#4EC9FF;font-size: 17px;">{{ typeTotal }}</label>辆</span>
        <div class="vehicle-configuration__body--top-tabs">
          <div
            v-for="tab in tabs"
            :key="tab.value" 
            :class="['vehicle-configuration__body--top-tabs-item', { 'active': activeTab === tab.value }]"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
      <div class="vehicle-configuration__body--center">
        <div
          v-show="activeTab === 0" 
          class="vehicle-configuration__body--center-type"
        >
          <div
            ref="typeChartRef"
            class="vehicle-configuration__body--center-type--item"
          />
          <div class="vehicle-configuration__body--center-type--list">
            <div
              v-for="(item,index) in typeChartItems"
              :key="index"
              class="vehicle-configuration__body--center-type--list-item"
            >
              <span
                :style="{background:item.color}"
                class="vehicle-configuration__body--center-type--list-item--color"
              />
              <span class="vehicle-configuration__body--center-type--list-item--name">{{ item.name }}</span>
              <span class="vehicle-configuration__body--center-type--list-item--number">{{ item.value }}辆</span>
            </div>
          </div>
        </div>
        <div
          v-show="activeTab === 1"
          ref="ageChartRef"
          class="vehicle-configuration__body--center-age"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mesScreenQueryCarTypeCount } from "@/api/mes/screenController";
import { BarChart, LineChart, LineSeriesOption, PictorialBarChart, PictorialBarSeriesOption, PieChart } from "echarts/charts";
import { GridComponent, GridComponentOption, LegendComponent, PolarComponent, TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption } from "echarts/components";
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
  name: "VehicleConfiguration",
  components: {
    DataCardHeader,
  },
  setup () {
    const activeTab = ref(0);
    const ageChartRef = ref();
    const ageChart = shallowRef<echarts.ECharts>();
    const typeChartRef = ref();
    const typeChart = shallowRef<echarts.ECharts>();
    const typeTotal = ref(0);
    const typeChartItems = ref<any>([])
    const typeColor = ["#3292FF", "#FFD232", "#32F3FF", "#2FD97D"];

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

    const tabs = [
      {
        label: "类型",
        value: 0,
      },
      {
        label: "使用年限",
        value: 1,
      }
    ];


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
        bottom: "15%",
        top: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["0年", "1年"],
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
          data: [84,60],
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

    const typeChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      angleAxis: {
        axisLine: {show: false,},
        axisTick: {show: false,},
        axisLabel: {show: false,},
        splitLine: {show:false,},
      },
      radiusAxis: {
        type: "category",
        data: [],
        z: 10,
        axisLine: {show: false,},
        axisTick: {show: false,},
        axisLabel: {show: false,},
        splitLine: {show:false,},
      },
      polar: {
        center: ["40%", "50%"],
      },
      series: [
        {
          type: "bar",
          data: [],
          coordinateSystem: "polar",
          barWidth: 4,
          emphasis: {
            focus: "series",
          },
          showBackground: true,
          backgroundStyle: {
            color: "#0F3367",
          },
          itemStyle: {
            // @ts-ignore
            color: function (params:any) {
              return typeColor[params.dataIndex];
            },
          },
        }
      ],
    }

    onMounted(() => {
      ageChart.value = echarts.init(ageChartRef.value);
      ageChart.value.showLoading();
      typeChart.value = echarts.init(typeChartRef.value);
      typeChart.value.showLoading();
      fetchAge();
    })

    const fetchAge = () => {
      ageChart.value?.hideLoading();
      ageChart.value?.setOption(ageChartOption);
    }

    const fetchType = async(projectId:number) => {
      try {
        const {data,} = await mesScreenQueryCarTypeCount({projectId,})
				
        typeTotal.value = data.reduce((total:number, item:any) => total + item.total, 0);
				
        typeChartItems.value = data.map((item:any, index:number) => {
          return {
            name: item.carType,
            value: item.total,
            color: typeColor[index],
          }
        })
				
        // @ts-ignore
        typeChartOption.radiusAxis.data = data.map((item:any) => item.carType);
        // @ts-ignore
        typeChartOption.series[0].data = data.map((item:any) => item.total);

        typeChart.value?.hideLoading();
      	typeChart.value?.setOption(typeChartOption);
      } catch (error) {
				
      }
    }

    return {
      activeTab,
      tabs,
      ageChartRef,
      typeChartRef,
      typeTotal,
      typeChartItems,
      typeColor,
      fetchType,
    }
  },
})
</script>

<style lang="less">
.vehicle-configuration {
	width: 100%;
	height: 27.5%;
	box-sizing: border-box;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__body {
		padding: 16px 20px 0px 34px;

		&--top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-bottom: 10px;

			&-tip {
				font-size: 13px;
				color: #FFFFFF;
			}

			&-tabs {
			width: 122px;
			height: 27px;
			background: linear-gradient(138deg, rgba(36, 219, 247, .14) 0%, rgba(72, 150, 255, .14) 100%);
			border-radius: 5px;
			display: flex;
			color: #229CD1;
			font-size: 12px;

			&-item {
				width: 61px;
				border-radius: 5px;
				text-align: center;
				line-height: 27px;
				cursor: pointer;
			}

			&-item.active {
				background: linear-gradient(138deg, #24DBF7 0%, #4896FF 100%);
				color: #fff;
			}
		}
		}

		&--center {

			&-age {
				margin-top: 10px;
				width: 370px;
				height: 140px;
			}
		}
	}

	.vehicle-configuration__body--center-type {
		width: 100%;
		height: 150px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&--item {
			width: 50%;
			height: 100%;
		}

		&--list {
			width: 222px;
			border-radius: 5px;


			&-item {
				width: 100%;
				height: 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				color: #99B3C8;
				background: linear-gradient(90deg, #1F5DCC 0%, rgba(44,60,85,0) 100%);
				padding: 0 8px 0 8px;
				margin-bottom: 8px;

				&--color {
					width: 8px;
					height: 8px;
				}

				&--name {
					width: 50%;
				}

				&--number {
					width: 40%;
					text-align: right;
				}
			}
		}
	}
}
</style>
