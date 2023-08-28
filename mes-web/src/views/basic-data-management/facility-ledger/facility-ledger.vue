<template>
  <div class="facility-ledger page-root">
    <div
      ref="pointChartRef"
      class="facility-ledger__chart"
    />
  </div>
</template>

<script lang="ts">
import { mesFacilityPointSelectFacilityPointCount } from "@/api/mes/facilityPointController";
import { useProject } from "@/stores/project";
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
  name: "FacilityLedger",
  setup () {
    const project = useProject();
    const pointChartRef = ref();
    const pointChart = shallowRef<echarts.ECharts>();

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
      title: {
        text: "设施及其个数",
        top: 20,
        left: 60,
        textStyle: {
          color: "#333333",
          fontSize: 16,
          fontWeight: "normal",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
        },
      },
      legend: {},
      grid: {
        top: "8%",
        left: "2%",
        right: "2%",
        bottom: "0%",
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
        splitArea: {
          show: true,
          areaStyle: {
            color: ["#F6F8FA", "#F9FCFF"],
          },
        },
      },
      series: [
        {
          name: "",
          type: "bar",
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(78, 137, 253, 1)",
            },
            {
              offset: 1,
              color: "rgba(78, 137, 253, 0)",
            }
          ]),
          barGap: 0,
          label: {
            show: true,
            position: "top",
            color: "#4E89FD",
          },
          barMaxWidth: 45,
          data: [],
        }
      ],
    };

    onMounted(() => {
      pointChart.value = echarts.init(pointChartRef.value);
      pointChart.value.showLoading();
      fetchData();
    });

    const fetchData = async () => {
      try {
        let {data,} = await mesFacilityPointSelectFacilityPointCount({projectId: project.$state.projectId as number,});
        // @ts-ignore
        pointChartOption.xAxis.data = Object.keys(data)
        // @ts-ignore
        pointChartOption.series[0].data = Object.values(data)

        pointChart.value?.hideLoading();
        pointChart.value?.setOption(pointChartOption);
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener("resize", () => {
      pointChart.value?.resize();
    });

    return {
      pointChartRef,
    }
  },
})
</script>

<style lang="less">
.facility-ledger {

  &__chart {
    width: 100%;
    height: calc(100vh - 200px);
  }
}
</style>
