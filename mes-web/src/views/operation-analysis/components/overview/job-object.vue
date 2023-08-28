<template>
  <div class="job-object">
    <data-card-header title="作业对象" />
    <div class="job-object__body">
      <div class="job-object__body-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.value" 
          :class="['job-object__body-tabs-item', { 'active': activeTab === tab.value }]"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </div>
      </div>
      <div class="job-object__body-tabs__center">
        <div
          v-show="activeTab === 0"
          class="job-object__body-tabs__center-roads"
        >
          <div class="job-object__body-tabs__center-roads-data">
            <span>{{ formatNumber(178) }}<label class="job-object__body-tabs__center-roads-data--unit">条</label></span>
            <span>{{ formatNumber(1167102) }}<label class="job-object__body-tabs__center-roads-data--unit">m</label></span>
            <span>{{ formatNumber(1167102) }}<label class="job-object__body-tabs__center-roads-data--unit">m²</label></span>
          </div>
          <div class="job-object__chart">
            <div
              ref="municipalRoadsChartRef"
              class="job-object__chart--item"
            />
            <div class="job-object__chart--list">
              <div
                v-for="item in municipalRoadsChartItems"
                :key="item.value"
                class="job-object__chart--list-item"
              >
                <span
                  :style="{background:item.itemStyle.color}"
                  class="job-object__chart--list-item--color"
                />
                <span class="job-object__chart--list-item--name">{{ item.name }}</span>
                <span class="job-object__chart--list-item--number">{{ item.value }}条</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="activeTab === 1"
          class="job-object__body-tabs__center-collection"
        >
          <div class="job-object__body-tabs__center-collection-data">
            <div
              v-for="(item,index) in garbageCollectionItems"
              :key="index"
              class="job-object__body-tabs__center-collection-data--item"
              :class="{'active':garbageCollectionItem.name === item.name}"
              @click="chooseGarbageCollection(item)"
            >
              <span class="job-object__body-tabs__center-collection-data--item-number">{{ item.number + item.unit }}</span>
              <span class="job-object__body-tabs__center-collection-data--item-name">{{ item.name }}</span>
            </div>
          </div>
          <div
            ref="garbageCollectionChartRef"
            class="job-object__body-tabs__center-collection-chart"
          />
        </div>
        <div
          v-show="activeTab === 2"
          class="job-object__body-tabs__center-transport"
        >
          <div
            v-for="item in wasteTransportHubItems"
            :key="item.img"
            class="job-object__body-tabs__center-transport-item"
          >
            <img
              :src="item.img"
              alt=""
              height="64"
            >
            <div class="job-object__body-tabs__center-transport-item--left">
              <span
                class="job-object__body-tabs__center-transport-item--left-name"
                :style="{color:item.color}"
              >{{ item.name }}</span>
              <span
                class="job-object__body-tabs__center-transport-item--left-number"
                :style="{color:item.color}"
              >{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="job-object__body__bottom">
        <div
          v-for="(item,index) in bottomList"
          :key="index"
          class="job-object__body__bottom--item"
        >
          <span class="job-object__body__bottom--item-name">{{ item.name }}</span>
          <div class="job-object__body__bottom--item-left">
            <span>{{ item.number }}个</span>
            <span>{{ item.area }}m²</span>
          </div>
        </div>
        <div class="job-object__body__bottom--toilets">
          <span class="job-object__body__bottom--item-name">公厕总数：<label style="color:#2485FF">37座</label></span>
          <div class="job-object__chart">
            <div
              ref="publicToiletsChartRef"
              class="job-object__chart--item"
            />
            <div class="job-object__chart--list">
              <div
                v-for="item in publicToiletsChartItems"
                :key="item.value"
                class="job-object__chart--list-item"
              >
                <span
                  :style="{background:item.itemStyle.color}"
                  class="job-object__chart--list-item--color"
                />
                <span class="job-object__chart--list-item--name">{{ item.name }}</span>
                <span class="job-object__chart--list-item--number">{{ item.value }}条</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BarChart, LineChart, LineSeriesOption, PieChart } from "echarts/charts";
import { GridComponent, GridComponentOption, LegendComponent, TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption } from "echarts/components";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import type { BarSeriesOption, LegendComponentOption, PieSeriesOption, YAXisOption } from "echarts/types/dist/shared";
import { defineComponent, onMounted, reactive, ref, shallowRef } from "vue";
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
>;

export default defineComponent({
  name: "JobObject",
  components: {
    DataCardHeader,
  },
  setup () {
    const activeTab = ref(0);
    const municipalRoadsChartRef = ref();
    const municipalRoadsChart = shallowRef<echarts.ECharts>();
    const publicToiletsChartRef = ref();
    const publicToiletsChart = shallowRef<echarts.ECharts>();
    const garbageCollectionChartRef = ref();
    const garbageCollectionChart = shallowRef<echarts.ECharts>();
    const garbageCollectionItem = reactive({number: 317, name: "垃圾收集点数量",})

    const tabs = [
      {
        label: "市政道路",
        value: 0,
      },
      {
        label: "垃圾收集点",
        value: 1,
      },
      {
        label: "垃圾转运站",
        value: 2,
      }
    ];

    const municipalRoadsChartItems = [
      {itemStyle:{color: "#318FF9",}, name: "二级", value: 78,},
      {itemStyle:{color: "#31F0FD",}, name: "背街小巷", value: 22,},
      {itemStyle:{color: "#E7E7E8",}, name: "四级", value: 30,},
      {itemStyle:{color: "#2ED57B",}, name: "三级", value: 20,},
      {itemStyle:{color: "#E2BB31",}, name: "一级", value: 28,}
    ];

    const publicToiletsChartItems = [
      {itemStyle:{color: "#318FF9",}, name: "一级公厕", value: 13,},
      {itemStyle:{color: "#31F0FD",}, name: "二级公厕", value: 24,}
    ];

    const wasteTransportHubItems = [
      {img: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/number-of-transfer-stations.png", name: "中转站数量（个）", value: 16,color:"#00B5FC",},
      {img: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/daily-garbage-volume.png", name: "日垃圾量（吨）", value: 30,color:"#0170FE",}
    ];

    const garbageCollectionItems = [
      {name: "垃圾收集点数量", number:"50", unit: "个",},
      {name: "垃圾桶数量", number:"98", unit: "个",},
      {name: "日垃圾量", number:"0", unit: "吨",}
    ]

    const bottomList = [
      {name: "城中村", number: 2, area: 453,},
      {name: "工业区", number: 2, area: 453,},
      {name: "商业区", number: 2, area: 453,},
      {name: "乡镇/自然村", number: 2, area: 453,},
      {name: "广场公园及其他", number: 2, area: 453,}
    ]

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
        PieChart
      ]
    );

    const municipalRoadsChartOption:EChartsOption = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          radius: ["55%", "100%"],
          center: ["35%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: "#0B2955",
            borderWidth: 5,
          },
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: [],
        }
      ],
    };	

    const publicToiletsChartOption:EChartsOption = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          radius: ["45%", "90%"],
          center: ["35%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: "#0B2955",
            borderWidth: 5,
          },
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: [],
        }
      ],
    }	

    const garbageCollectionChartOption:EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "0%",
        right: "10%",
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
          barWidth: 8,
          data: [],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#24DCF7", },
              { offset: .69, color: "#24DCF7", },
              { offset: 1, color: "#21AADD", }
            ]),
          },
        }
      ],
    }

    onMounted(() => {
      municipalRoadsChart.value = echarts.init(municipalRoadsChartRef.value);
      municipalRoadsChart.value.showLoading();
      publicToiletsChart.value = echarts.init(publicToiletsChartRef.value);
      publicToiletsChart.value.showLoading();
      garbageCollectionChart.value = echarts.init(garbageCollectionChartRef.value);
      garbageCollectionChart.value.showLoading();
      fetchMunicipalRoads();
      fetchPublicToilets();
      fetchGarbageCollection();
    })
		
    const formatNumber = (number:number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const fetchMunicipalRoads = () => {
      // @ts-ignore
      municipalRoadsChartOption.series[0].data = municipalRoadsChartItems;

      municipalRoadsChart.value?.hideLoading();
      municipalRoadsChart.value?.setOption(municipalRoadsChartOption);
    }

    const fetchPublicToilets = () => {
      // @ts-ignore
      publicToiletsChartOption.series[0].data = publicToiletsChartItems;

      publicToiletsChart.value?.hideLoading();
      publicToiletsChart.value?.setOption(publicToiletsChartOption);
    }

    const fetchGarbageCollection = () => {
      // @ts-ignore
      garbageCollectionChartOption.xAxis.data = [garbageCollectionItem.name];
      // @ts-ignore
      garbageCollectionChartOption.series[0].data = [garbageCollectionItem.number];
      garbageCollectionChart.value?.hideLoading();
      garbageCollectionChart.value?.setOption(garbageCollectionChartOption);
    }

    const chooseGarbageCollection = (item:any) => {
      garbageCollectionItem.number = item.number;
      garbageCollectionItem.name = item.name;
      fetchGarbageCollection();
    }

    return {
      activeTab,
      tabs,
      municipalRoadsChartRef,
      municipalRoadsChartItems,
      wasteTransportHubItems,
      bottomList,
      publicToiletsChartRef,
      publicToiletsChartItems,
      garbageCollectionChartRef,
      garbageCollectionItems,
      garbageCollectionItem,
      formatNumber,
      chooseGarbageCollection,
    }
  },
})
</script>

<style lang="less">
.job-object {
	width: 100%;
	height: 80.5%;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__body {
		padding: 25px 20px 20px;

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

		&-tabs__center {
			height: 260px;

			&-roads {
				padding-top: 35px;

				&-data {
					display: flex;
					justify-content: space-between;
					font-size: 18px;
					color: #60A4FB;

					&--unit {
						font-size: 13px;
					}
				}

				.job-object__chart {
					margin-top: 30px;

					&--list {

						&-item {
							margin-bottom: 2px;
						}
					}
				}
			}

			&-collection {

				&-data {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20px 15px 20px 30px;

					&--item {
						display: flex;
						flex-direction: column;
						align-items: center;

						&-number {
							font-size: 18px;
							color: #62A8FF;
							margin-bottom: 5px;
						}

						&-name {
							font-size: 12px;
							color: #8F9AAC;
						}

						&.active {
							.job-object__body-tabs__center-collection-data--item-number {
								color: #31F0FD;
							}

							.job-object__body-tabs__center-collection-data--item-name {
								color: #24DBF7;
							}
						}
					}
				}

				&-chart {
					width: 403px;
					height: 150px;
				}
			}

			&-transport {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&-item {
					width: 177px;
					height: 89px;
					background: linear-gradient(270deg, #005F77 0%, #00166D 100%);
					border: 1px solid rgba(63,145,216,0.3);
					display: flex;
					align-items: center;
					box-sizing: border-box;
					padding-left: 10px;

					&--left {
						flex: 1;
						text-align: center;

						&-name {
							font-size: 13px;
						}

						&-number {
							font-size: 28px;
						}
					}
				}
			}
		}

		&__bottom {
			font-size: 14px;

			&--item {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-name {
					color: #C5D0D4;
					line-height: 40px;

					&::before {
						content: '';
						display: inline-block;
						width: 8px;
						height: 8px;
						background: #62A8FF;
						border-radius: 50%;
						margin-right: 10px;
						margin-bottom: 1px;
					}
				}

				&-left {
					color: #62A8FF;
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #265896;
					width: 193px;
				}
			}

			&--toilets {
				.job-object__chart {

					&--list-item {
						&:first-child {
							margin-bottom: 14px;
						}
					}
				}
			}
		}
	}

	&__chart {
		width: 100%;
		height: 110px;
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
