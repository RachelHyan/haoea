<template>
  <el-pro-dialog
    class="completion-chart"
    :model-value="modelValue"
    title="作业完成情况"
    width="55%"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
    @closed="$emit('closed')"
  >
    <div class="completion-chart__tabs">
      <div
        :class="['completion-chart__tabs-item', { 'active': activeTab === 0 }]"
        @click="change(0)"
      >
        近7天
      </div>
      <div
        :class="['completion-chart__tabs-item', { 'active': activeTab === 1 }]"
        @click="change(1)"
      >
        近30天
      </div>
    </div>
    <div
      v-if="isOpen"
      ref="chartRef"
      class="completion-chart__item"
    />
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesIndexQueryJobTaskFinishRate } from "@/api/mes/indexController";
import { useProject } from "@/stores/project";
import { BarChart, LineChart, LineSeriesOption, PictorialBarChart, PictorialBarSeriesOption, PieChart } from "echarts/charts";
import { GridComponent, GridComponentOption, LegendComponent, PolarComponent, TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption } from "echarts/components";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import type { BarSeriesOption, LegendComponentOption, PieSeriesOption, YAXisOption } from "echarts/types/dist/shared";
import { defineComponent, nextTick, onMounted, ref, shallowRef, watch } from "vue";

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
  name: "CompletionChart",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    sceneValue: {
      type: String,
      default: "Manual_cleaning",
    },
  },
  emits: [ "update:modelValue", "closed" ],
  setup (props) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const chartRef = ref();
    const chart = shallowRef<echarts.ECharts>();
    const isOpen = ref(false);
    const activeTab = ref(0);

    const chartOption:EChartsOption = {
      title: {
        subtext: "完成率%",
        top: "-10",
      },
      tooltip: {
        trigger: "axis",
        // showContent: false,
        formatter: "{c}%",
        // @ts-ignore
        // backgroundColor: "transparent",
        textStyle: {
          color: "#002E82",
        },
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "5%",
        top: "6%",
        containLabel: true,
      },
      // @ts-ignore
      xAxis: {
        type: "category",
        data: [],
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "value",
        max: 100,
        min: 0,
      },
      series: [
        {
          data: [],
          type: "line",
          showSymbol: false,
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(231, 240, 255, 1)", },
              { offset: 1, color: "rgba(226, 234, 247, 0)", }
            ]),
          },
          lineStyle: {
            color: "#3E7FF7",
          },
        }
      ],
    };

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

    onMounted(() => {
      if (props.modelValue) {
        isOpen.value = true;
        nextTick(() => {
          chart.value = echarts.init(chartRef.value);
          chart.value.showLoading();
          fetchData();
        })
      }
    })

    const change = (value:number) => {
      activeTab.value = value;
      fetchData();
    }

    const fetchData = async() => {
      try {
        const {data,} = await mesIndexQueryJobTaskFinishRate({
          projectId,
          type:props.sceneValue,
          condition: activeTab.value,
        });
        // @ts-ignore
        chartOption.xAxis.data = data.map(item => item.jobDate);
        // @ts-ignore
        chartOption.series[0].data = data.map(item => item.finishRate * 100);
				
        chart.value?.hideLoading();
      	chart.value?.setOption(chartOption);
      } catch (error) {
				
      }
    }

    window.addEventListener("resize", () => {
      chart.value?.resize();
    })

    watch(
      () => props.modelValue,
      (value) => {
        if (value) {
          isOpen.value = true;
          nextTick(() => {
            chart.value = echarts.init(chartRef.value);
            chart.value.showLoading();
            fetchData();
          });
        } else {
          isOpen.value = false;
        }

        activeTab.value = 0;
      }
    );
	
    return {
      chartRef,
      isOpen,
      activeTab,
      change,
    }
  },
})
</script>

<style lang="less">
.completion-chart {
	&__tabs {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;

		&-item {
			width: 120px;
			height: 32px;
			border-radius: 5px;
			border: 1px solid rgba(18, 18, 18, .5);
			line-height: 32px;
			text-align: center;
			color: #121212;

			&:first-child {
				margin-right: 30px;
			}
		}

		&-item.active {
			background: #3E7FF7;
			color: #FFFFFF;
			border-color: transparent;
		}
	}

	&__item {
		width: 100%;
		height: 500px;
	}

	.completion-chart__tooltip {
		font-size: 20px;
		font-weight: 500;
		color: #002E82;
		line-height: 28px;
	}
}
</style>
