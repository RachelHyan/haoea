<template>
  <div class="personnel-operation-situation">
    <data-card-header
      ref="headerRef"
      v-model:header-click="headerTab"
      title="人员作业情况"
      :tab-title="titleTip"
    />
    <div class="personnel-operation-situation__body">
      <div
        v-show="headerTab === 0"
        class="personnel-operation-situation__body--first"
      >
        <div class="personnel-operation-situation__body--first-header">
          <div
            v-for="(item,index) in headerData"
            :key="index"
            class="personnel-operation-situation__body--first-header-item"
          >
            {{ item.name }}：<label>{{ item.number }}</label>{{ item.unit }}
          </div>
        </div>
        <div class="personnel-operation-situation__body--first-state">
          <span>作业人数</span>
          <span>平均作业时长</span>
        </div>
        <div
          class="personnel-operation-situation__body--first-unit"
        >
          <div>单位：人</div>
          <div>单位：小时</div>
        </div>
        <div
          ref="manualChartRef"
          class="personnel-operation-situation__body--first-chart"
        />
        <el-table
          :data="tabelData"
          style="width: 100%;"
          height="191px"
          size="small"
          header-row-class-name="table-header"
          class="personnel-operation-situation__body--first-table"
        >
          <el-table-column
            v-for="(item,index) in personnelColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="'center'"
          />
        </el-table>
      </div>
      <div
        v-show="headerTab === 1 && footerTab !== 'Manual_cleaning'"
        class="personnel-operation-situation__body--first"
      >
        <div class="personnel-operation-situation__body--first-header">
          <div
            v-for="(item,index) in manualVehicleHeaderData"
            :key="index"
            class="personnel-operation-situation__body--first-header-item"
          >
            {{ item.name }}：<label>{{ item.number }}</label>{{ item.unit }}
          </div>
        </div>
        <div class="personnel-operation-situation__body--first-state">
          <span>作业车辆</span>
          <span>平均作业时长</span>
        </div>
        <div
          class="personnel-operation-situation__body--first-unit"
        >
          <div>单位：辆</div>
          <div>单位：小时</div>
        </div>
        <div
          ref="vehicleChartRef"
          class="personnel-operation-situation__body--first-chart"
        />
        <el-table
          :data="manualVehicleData"
          style="width: 100%;"
          height="191px"
          size="small"
          header-row-class-name="table-header"
          class="personnel-operation-situation__body--first-table"
        >
          <el-table-column
            v-for="(item,index) in manualVehicleColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="'center'"
          />
        </el-table>
      </div>
      <div
        v-show="headerTab === 1 && footerTab === 'Manual_cleaning'"
        class="personnel-operation-situation__body--second"
      >
        <div class="personnel-operation-situation__body--first-header">
          <div
            v-for="(item,index) in gridJobHeaderData"
            :key="index"
            class="personnel-operation-situation__body--first-header-item"
          >
            {{ item.name }}：<label>{{ item.number }}</label>{{ item.unit }}
          </div>
        </div>
        <el-table
          :data="gridJobData"
          style="width: 100%;"
          height="370px"
          size="small"
          header-row-class-name="table-header"
          class="personnel-operation-situation__body--first-table"
        >
          <el-table-column
            v-for="(item,index) in gridJobColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="'center'"
          />
        </el-table>
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
  name: "PersonnelOperationSituation",
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
    const headerTab = ref(0);
    const manualChartRef = ref();
    const manualChart = shallowRef<echarts.ECharts>();
    const vehicleChartRef = ref();
    const vehicleChart = shallowRef<echarts.ECharts>();

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

    const manualPersonnelHeaderData = [
      {name: "平均作业时长", number: "7.7", unit: "小时",},
      {name: "平均作业里程", number: "5.69", unit: "km",}
    ]

    const vehiclePersonnelHeaderData = [
      {name: "平均作业时长", number: "7.8", unit: "小时",},
      {name: "平均作业里程", number: "10.1", unit: "km",}
    ]

    const manualVehicleHeaderData = [
      {name: "平均作业时长", number: "7.8", unit: "小时",},
      {name: "平均作业里程", number: "10.1", unit: "km",}
    ]

    const gridJobHeaderData = [
      {name: "平均作业时长", number: "7.1", unit: "小时",},
      {name: "平均作业里程", number: "13.4", unit: "km",}
    ]

    const personnelColumn = [
      {label: "排名", prop: "rank",width: 50,},
      {label: "姓名", prop: "name",width: 60,},
      {label: "所属组织", prop: "department",},
      {label: "完成率", prop: "completionRate",}
    ]

    const manualVehicleColumn = [
      {label: "排名", prop: "rank",width: 50,},
      {label: "车牌号", prop: "number",width: 90,},
      {label: "所属组织", prop: "department",},
      {label: "完成率", prop: "completionRate",}
    ]

    const gridJobColumn = [
      {label: "排名", prop: "rank",width: 50,},
      {label: "网格", prop: "grid",width: 130,},
      {label: "排班人数", prop: "number",},
      {label: "作业完成率", prop: "completionRate",}
    ]

    const personnelTableData = [
      {rank: 1, name: "韦红英", department: "竹子林片区一组", completionRate: "100%",},
      {rank: 2, name: "赵红", department: "农科片区一组", completionRate: "100%",},
      {rank: 3, name: "陈霞", department: "农科片区一组", completionRate: "100%",},
      {rank: 4, name: "林宗彬", department: "竹子林片区三组", completionRate: "100%",},
      {rank: 5, name: "覃红日", department: "香梅片区一组", completionRate: "100%",}
    ]

    const vehiclePersonnelData = [
      {rank: 1, name: "陈后官", department: "车队", completionRate: "100%", },
      {rank: 2, name: "廖日福", department: "车队", completionRate: "100%", },
      {rank: 3, name: "陈雄", department: "车队", completionRate: "100%", },
      {rank: 4, name: "陈声波", department: "车队", completionRate: "100%", },
      {rank: 5, name: "黄昌荣", department: "车队", completionRate: "100%", }
    ]

    const manualVehicleData = [
      {rank: 1, number: "粤BB9081", department: "香蜜湖D标", completionRate: "100%", },
      {rank: 2, number: "粤BS5303", department: "香蜜湖D标", completionRate: "100%", },
      {rank: 3, number: "粤B72982", department: "香蜜湖D标", completionRate: "100%", },
      {rank: 4, number: "粤BB5272", department: "香蜜湖D标", completionRate: "100%", },
      {rank: 5, number: "粤BY1269", department: "香蜜湖D标", completionRate: "100%", }
    ]

    const gridJobData = [
      {rank: 1, grid: "竹子林片区一组", number: "16", completionRate: "100%", },
      {rank: 2, grid: "竹子林片区一组", number: "16", completionRate: "100%", },
      {rank: 3, grid: "竹子林片区一组", number: "16", completionRate: "100%", },
      {rank: 4, grid: "竹子林片区一组", number: "16", completionRate: "100%", },
      {rank: 5, grid: "安托山片区三组", number: "15", completionRate: "100%", },
      {rank: 6, grid: "安托山片区三组", number: "15", completionRate: "100%", },
      {rank: 7, grid: "香梅片区四组", number: "10", completionRate: "100%", },
      {rank: 8, grid: "香梅片区四组", number: "10", completionRate: "100%", },
      {rank: 9, grid: "农科片区一组", number: "8", completionRate: "100%", },
      {rank: 10, grid: "农科片区一组", number: "8", completionRate: "100%", },
      {rank: 11, grid: "农科片区一组", number: "8", completionRate: "100%", }
    ]

    const titleTip = computed(() => {
      return props.footerTab === "Manual_cleaning" ? "部门网格作业完成情况" : "车辆作业情况"
    })

    const headerData = computed(() => {
      return props.footerTab === "Manual_cleaning" ? manualPersonnelHeaderData : vehiclePersonnelHeaderData
    })

    const tabelData = computed(() => {
      return props.footerTab === "Manual_cleaning" ? personnelTableData : vehiclePersonnelData
    })

    const manualChartOption:EChartsOption = {
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
        data: ["7-12", "7-13", "7-14", "7-15", "7-16", "7-17", "7-18"],
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
          max: 10,
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
          data: [85,64,85,64,85,64,85],
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(36, 220, 247, 1)", },
              { offset: .69, color: "rgba(36, 220, 247, 1)", },
              { offset: 1, color: "rgba(33, 170, 221, 0)", }
            ]),
          },
        },
        {
          name: "单位：小时",
          type: "bar",
          yAxisIndex: 1,
          data: [8,7,6,7,8,7,9],
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(206, 126, 51, 1)", },
              { offset: 1, color: "rgba(73, 147, 255, 0)", }
            ]),
          },
        }
      ],
    }

    const vehicleChartOption:EChartsOption = {
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
        data: ["7-12", "7-13", "7-14", "7-15", "7-16", "7-17", "7-18"],
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
          max: 10,
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
          name: "单位：辆",
          type: "bar",
          yAxisIndex: 0,
          data: [85,64,85,64,85,64,85],
          barWidth: 8,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(206, 126, 51, 1)", },
              { offset: 1, color: "rgba(73, 147, 255, 0)", }
            ]),
          },
        },
        {
          name: "单位：小时",
          type: "bar",
          yAxisIndex: 1,
          data: [8,7,8,7,8,7,9],
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
      manualChart.value = echarts.init(manualChartRef.value);
      manualChart.value.showLoading();
      vehicleChart.value = echarts.init(vehicleChartRef.value);
      vehicleChart.value.showLoading();
      fetchManual();
      fetchVehicle();
    })

    const fetchManual = () => {
      manualChart.value?.hideLoading();
      manualChart.value?.setOption(manualChartOption);
    }

    const fetchVehicle = () => {
      vehicleChart.value?.hideLoading();
      vehicleChart.value?.setOption(vehicleChartOption);
    }

    watch(() => props.footerTab, () => {
      headerRef.value?.handleTabClick(0);
    })
		
    return {
      headerRef,
      headerTab,
      headerData,
      personnelColumn,
      tabelData,
      titleTip,
      manualChartRef,
      vehicleChartRef,
      manualVehicleHeaderData,
      manualVehicleColumn,
      manualVehicleData,
      gridJobHeaderData,
      gridJobColumn,
      gridJobData,
    }
  },
})
</script>

<style lang="less">
.personnel-operation-situation {
	width: 100%;
	height: 58%;
	box-sizing: border-box;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__header {
		position: relative;

		&-status {
			position: absolute;
			left: 200px;
			top: 50%;
			color: rgba(226, 235, 241, .6);
			font-size: 18px;
			font-weight: bold;
		}
	}

	&__body {
		padding: 20px 10px 0;

		&--first {

			&-header {
			display: flex;
			// justify-content: space-between;

				&-item {
					height: 45px;
					background: linear-gradient(138deg, rgba(36, 219, 247, .2) 0%, rgba(72, 150, 255, .2) 100%);
					border-radius: 5px;
					color: rgba(225, 255, 255, .8);
					font-size: 13px;
					line-height: 40px;
					text-align: center;
					padding: 0 9px;

					label {
						font-size: 20px;
						color: #fff;
					}
				}

				&-item:first-child {
					margin-right: 10px;
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

			&-unit {
				display: flex;
				justify-content: space-between;
				color: rgba(225, 255, 255, .8);
				font-size: 13px;
				margin-top: 10px;
			}

			&-chart {
				margin-top: 11px;
				width: 370px;
				height: 130px;
			}

			&-table {
			width: 359px;
			margin-top: 25px;

				.table-header {

					.el-table__cell {
						background: #10407E;
						color:#3A9EF1;
					}

				}
			}
		}

		&--second {
			&-table {
			width: 359px;
			margin-top: 25px;

				.table-header {

					.el-table__cell {
						background: #10407E;
						color:#3A9EF1;
					}

				}
			}
		}

			.el-table {
				--el-table-row-hover-bg-color:none;
				--el-table-bg-color:none;
			}

			.el-table tr {
				background-color: #0B2955;
				color: #E5E5E5;
			}

			.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
				border: none;
			}

			.el-table--border .el-table__inner-wrapper::after, .el-table--border::after, .el-table--border::before, .el-table__inner-wrapper::before {
				content: '';
				background: none;
			}
	}
}
</style>
