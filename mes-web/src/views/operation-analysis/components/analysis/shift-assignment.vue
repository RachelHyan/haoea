<template>
  <div class="shift-assignment">
    <div class="shift-assignment__header">
      <data-card-header
        :title="titleTip"
      />
      <el-select
        v-show="footerTab !== 'Manual_cleaning'"
        v-model="value"
        placeholder="请选择"
        class="shift-assignment__header-select"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="shift-assignment__body">
      <el-table
        v-show="footerTab === 'Manual_cleaning'"
        :data="tableData"
        style="width: 100%;"
        height="280px"
        size="small"
        header-row-class-name="table-header"
        class="shift-assignment__body-table"
      >
        <el-table-column
          v-for="(item,index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="'center'"
        />
      </el-table>
      <div v-show="footerTab !== 'Manual_cleaning'">
        <div class="shift-assignment__body-tabs">
          <div
            v-for="tab in tabs"
            :key="tab.value" 
            :class="['shift-assignment__body-tabs-item', { 'active': activeTab === tab.value }]"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </div>
        </div>
        <div class="shift-assignment__body-chart">
          <div class="shift-assignment__body-chart--header">
            <div
              v-for="(item,index) in chartHeaderData"
              :key="index"
              class="shift-assignment__body-chart--header-item"
            >
              <div class="shift-assignment__body-chart--header-item-value">
                <span>{{ item.number }}</span>{{ item.unit }}
              </div>
              <div class="shift-assignment__body-chart--header-item-name">
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="shift-assignment__body-chart--tip">
            <span>单位：次</span>
            <span>加注次数</span>
            <span>加注总额</span>
            <span>单位：元</span>
          </div>
          <div
            ref="chartRef"
            class="shift-assignment__body-chart--item"
          />
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
  name: "ShiftAssignment",
  components: {
    DataCardHeader,
  },
  props: {
    footerTab: {
      type: String,
      default: "Manual_cleaning",
    },
  },
  setup (props, { emit, }) {
    const activeTab = ref(0);
    const chartRef = ref();
    const chart = shallowRef<echarts.ECharts>();
    const value = ref("1");

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
		
    const titleTip = computed(() => {
      return props.footerTab === "Manual_cleaning" ? "班次作业排名" : "车辆耗能情况"
    })

    const tableColumn = [
      {label: "排名", prop: "rank",width: 50,},
      {label: "班次", prop: "shift",width: 130,},
      {label: "所属部门", prop: "department",width: 110,},
      {label: "完成率", prop: "completionRate",}
    ]

    const tableData = [
      {rank: 1, shift: "早班（06:30-14:30）", department: "竹子林片区一组", completionRate: "100%", },
      {rank: 2, shift: "早班（06:30-14:30）", department: "竹子林片区一组", completionRate: "100%", },
      {rank: 3, shift: "早班（06:30-14:30）", department: "竹子林片区一组", completionRate: "100%", },
      {rank: 4, shift: "早班（06:30-14:30）", department: "竹子林片区三组", completionRate: "100%", },
      {rank: 5, shift: "早班（06:30-14:30）", department: "竹子林片区三组", completionRate: "100%", },
      {rank: 6, shift: "晚班（14:30-22:30）", department: "农科片区四组", completionRate: "100%", },
      {rank: 7, shift: "晚班（14:30-22:30）", department: "农科片区四组", completionRate: "100%", },
      {rank: 8, shift: "晚班（14:30-22:30）", department: "香梅片区二组", completionRate: "100%", },
      {rank: 9, shift: "晚班（14:30-22:30）", department: "香梅片区二组", completionRate: "100%", },
      {rank: 10, shift: "晚班（14:30-22:30）", department: "香梅片区二组", completionRate: "100%", }
    ]

    const tabs = [
      {
        label: "今日",
        value: 0,
      },
      {
        label: "本周",
        value: 1,
      },
      {
        label: "本月",
        value: 2,
      },
      {
        label: "今年",
        value: 3,
      }
    ];

    const chartHeaderData = [
      {name: "加注次数", number: 0, unit: "次",},
      {name: "加注量", number: 0, unit: "方",},
      {name: "百公里平均能耗", number: 0, unit: "方/百公里",}
    ]

    const options = [
      { value: "1", label: "水", },
      { value: "2", label: "柴油", },
      { value: "3", label: "汽油", },
      { value: "4", label: "电动",},
      { value: "5", label: "天然气",},
      { value: "6", label: "氢能源",},
      { value: "7", label: "其他",}
    ]

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
        bottom: "0.3%",
        top: "5%",
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
        }
      ],
      series: [
        {
          name: "单位：人",
          type: "bar",
          data: [],
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
      titleTip,
      tableColumn,
      tableData,
      activeTab,
      tabs,
      chartHeaderData,
      chartRef,
      options,
      value,
    }
  },
})
</script>

<style lang="less">
.shift-assignment {
	width: 100%;
	height: 40.5%;
	box-sizing: border-box;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__header {
		position: relative;

		&-select {
			position: absolute;
			right: 20px;
			top: 20px;
			width: 92px;
			height: 27px;

			.el-input__wrapper {		
				background: rgba(31,95,204,0.2);
			}

			.el-input__inner {
				color: #fff;
			}
		}
	}

	&__body {
		padding: 20px;
		
		&-table {
			width: 359px;

				.table-header {

					.el-table__cell {
						background: #10407E;
						color:#3A9EF1;
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

			&-tabs {
				width: 100%;
				height: 37px;
				background: linear-gradient(138deg, rgba(36, 219, 247, .14) 0%, rgba(72, 150, 255, .14) 100%);
				border-radius: 5px;
				display: flex;
				color: #fff;
				font-size: 16px;

				&-item {
					width: 91px;
					border-radius: 5px;
					text-align: center;
					line-height: 37px;
					cursor: pointer;
				}

				&-item.active {
					background: linear-gradient(138deg, #24DBF7 0%, #4896FF 100%);
				}
		}

		&-chart {

			&--header {
				display: flex;
				justify-content: space-between;
				margin-top: 10px;

				&-item {
					width: 116px;
					height: 75px;
					background: #0B2955;
					border-radius: 5px;
					border: 1px solid #7F7F7F;
					font-size: 16px;
					color: rgba(255, 255, 255, .63);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					&-value {
						color:#fff;

						span {
							display: inline-block;
							padding-right: 5px;
							padding-bottom: 2px;
							font-size: 26px;
						}
					}
				}
			}

			&--tip {
				display: flex;
				justify-content: space-between;
				margin-top: 15px;
				font-size: 13px;
				color: #fff;

				& > span:nth-child(2)::before {
								content: "";
								display: inline-block;
								width: 10px;
								height: 10px;
								background: #57D1ED;
								margin-right: 5px;
							}

						& > span:nth-child(3)::before {
								content: "";
								display: inline-block;
								width: 10px;
								height: 10px;
								background: #CE7E33;
								margin-right: 5px;
							}
			}

			&--item {
				margin-top: 11px;
				width: 370px;
				height: 100px;
			}
		}
	}
}
</style>
