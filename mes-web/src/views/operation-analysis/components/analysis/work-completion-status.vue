<template>
  <div
    class="work-completion-status"
    :style="footerTab === 'Manual_cleaning' ? {height: '44.5%'} : {height: '38%'}"
  >
    <data-card-header :title="titleTip" />
    <div class="work-completion-status__body">
      <div v-show="footerTab === 'Manual_cleaning'">
        <div class="work-completion-status__body-first">
          <div
            v-for="(item,index) in personnelFirstData"
            :key="index"
            class="work-completion-status__body-item"
          >
            {{ item.name }}：<span>{{ item.number }}</span>{{ item.unit }}
          </div>
        </div>
        <div class="work-completion-status__body-second">
          <div
            v-for="(item,index) in personnelSecondData"
            :key="index"
            class="work-completion-status__body-item"
          >
            {{ item.name }}：<span>{{ item.number }}</span>{{ item.unit }}
          </div>
        </div>
        <div class="work-completion-status__body-rate">
          当前在岗率：<span>85.2%</span>
        </div>
        <div class="work-completion-status__body-tip">
          <div class="work-completion-status__body-tip--unit">
            单位：人
          </div>
          <div class="work-completion-status__body-tip--label">
            <span>在岗人数</span>
            <span>脱岗及其他人数</span>
            <span>在岗率</span>
          </div>
        </div>
        <div
          ref="chartRef"
          class="work-completion-status__body-chart"
        />
      </div>
      <div v-show="footerTab !== 'Manual_cleaning'">
        <div class="work-completion-status__body-tabs">
          <div
            v-for="tab in tabs"
            :key="tab.value" 
            :class="['work-completion-status__body-tabs-item', { 'active': activeTab === tab.value }]"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </div>
        </div>
        <div class="work-completion-status__body-list">
          <div
            v-for="(item,index) in data"
            :key="index"
            class="work-completion-status__body-list-item"
          >
            <div class="work-completion-status__body-list-item--label">
              {{ item.name }}
            </div>
            <el-progress
              :percentage="item.value"
            />
          </div>
        </div>
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
import { computed, defineComponent, onMounted, ref, shallowRef } from "vue";
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
  name: "WorkCompletionStatus",
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
    const activeTab = ref(0);
    const chartRef = ref();
    const chart = shallowRef<echarts.ECharts>();

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

    const personnelFirstData = [
      {name: "在岗", number: 157, unit: "人",},
      {name: "脱岗", number: 0, unit: "人",}
    ]

    const personnelSecondData = [
      {name: "休息", number: 40, unit: "人",},
      {name: "坐岗", number: 1, unit: "人",},
      {name: "聚岗", number: 0, unit: "人",}
    ]

    const tabs = [
      {
        label: "作业对象",
        value: 0,
      },
      {
        label: "车辆",
        value: 1,
      },
      {
        label: "人员",
        value: 2,
      }
    ];

    const titleTip = computed(() => {
      return props.footerTab === "Manual_cleaning" ? "人员作业状态" : "工作完成情况"
    })
		
    const jobObjectdata = [
      {name: "红荔西路东", value: 100,},
      {name: "香轩路", value: 100,},
      {name: "竹香一路", value: 100,},
      {name: "北环辅道", value: 100,}
    ]

    const vehicleData = [
      {name: "粤BB9088（高压水车）", value: 100,},
      {name: "粤BB9081（高压水车）", value: 100,},
      {name: "粤BS5303（高压水车）", value: 100,},
      {name: "粤BB5272（清扫保洁车辆）", value: 100,}
    ]

    const personnelData = [
      {name: "陈声波（车辆作业）", value: 100,},
      {name: "梁福（车辆作业）", value: 100,},
      {name: "李东（车辆作业）", value: 100,},
      {name: "李春露（车辆作业）", value: 100,}
    ]

    const data  = computed(() => {
      switch (activeTab.value) {
      case 0:
        return jobObjectdata;
      case 1:
        return vehicleData;
      case 2:
        return personnelData;
      default:
        return [];
      }
    })

    const chartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "2%",
        top: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00","11:30"],
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
          interval: 0, rotate: 30,
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
          name: "在岗人数",
          type: "bar",
          stack: "total",
          data: [28, 35, 28, 55, 48, 55, 48, 35, 28, 35, 18, 15, 28],
          barWidth: 8,
          itemStyle: {
            color:"#57D1ED",
          },
        },
        {
          name: "脱岗及其他人数",
          type: "bar",
          stack: "total",
          data: [34,41,34,41,34,41,34,41,34,41,34,41,34],
          barWidth: 8,
          itemStyle: {
            color: "#CE7E33",
          },
        },
        {
          name: "在岗率",
          type: "bar",
          stack: "total",
          data: [34,41,34,41,34,41,34,41,34,41,34,41,34],
          barWidth: 8,
          itemStyle: {
            color:"#3340CE",
          },
        }
      ],
    }

    onMounted(() => {
      chart.value = echarts.init(chartRef.value);
      chart.value.showLoading();
      fetch();
    })

    const fetch = () => {
      chart.value?.hideLoading();
      chart.value?.setOption(chartOption);
    }

    return {
      activeTab,
      tabs,
      data,
      titleTip,
      personnelFirstData,
      personnelSecondData,
      chartRef,
    }
  },
})
</script>

<style lang="less">
.work-completion-status {
	width: 100%;
	box-sizing: border-box;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__body {
		padding: 20px;

		&-first, &-second {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}

		&-first {
			margin-bottom: 10px;
		}

		.work-completion-status__body-item {
			width: 114px;
			height: 40px;
			background: linear-gradient(138deg, rgba(36, 219, 247, .2) 0%, rgba(72, 150, 255, .2) 100%);
			border-radius: 5px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			color: rgba(225, 255, 255, .8);
			font-size: 13px;

			span {
				color: #fff;
				font-size: 20px;
				margin-right: 2px;
			}
		}

		&-rate {
			margin-top: 25px;
			font-size: 13px;
			color: rgba(255, 255, 255, .8);

			span {
				font-size: 16px;
				color: rgba(78, 201, 255, 1);
			}
		}

		&-tip {
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 13px;
			color: rgba(255, 255, 255, .8);

			&--label {
				& > span:not(:last-child) {
					margin-right: 10px;
				}
				
				& > span:first-child::before {
							content: "";
							display: inline-block;
							width: 10px;
							height: 10px;
							background: #57D1ED;
							margin-right: 5px;
						}

					& > span:nth-child(2)::before {
							content: "";
							display: inline-block;
							width: 10px;
							height: 10px;
							background: #CE7E33;
							margin-right: 5px;
						}

					& > span:last-child::before {
							content: "";
							display: inline-block;
							width: 10px;
							height: 10px;
							background: #3340CE;
							margin-right: 5px;
						}

			}
		}

		&-chart {
				margin-top: 10px;
				width: 370px;
				height: 140px;
			}
		
		&-tabs {
			width: 100%;
			height: 40px;
			background: linear-gradient(138deg, rgba(36, 219, 247, .14) 0%, rgba(72, 150, 255, .14) 100%);
			border-radius: 5px;
			display: flex;
			color: #fff;
			font-size: 16px;

			&-item {
				width: 121px;
				border-radius: 5px;
				text-align: center;
				line-height: 40px;
				cursor: pointer;
			}

			&-item.active {
				background: linear-gradient(138deg, #24DBF7 0%, #4896FF 100%);
			}
		}

		&-list {
			margin-top: 32px;

			&-item {
				margin-bottom: 10px;

				&:last-child {
					margin-bottom: 0;
				}

				&--label {
					color: #fff;
					font-size: 12px;
					margin-bottom: 5px;
				}

				.el-progress__text {
					color: #fff;
				}

				.el-progress-bar__inner {
					background: linear-gradient(270deg, #01E4FE 0%, rgba(1,112,254,1) 100%);
				}

				.el-progress-bar__outer {
					background: rgba(1,110,249,0.27);
				}
			}
		}
	}
}
</style>
