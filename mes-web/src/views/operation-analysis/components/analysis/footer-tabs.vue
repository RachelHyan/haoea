<template>
  <div class="footer-tabs">
    <div
      v-for="(item,index) in pointTypes"
      :key="index"
      class="footer-tabs-item"
      :class="{'active':item.value === currentPoint}"
      @click="handlePointTypeClick(item)"
    >
      <img
        :src="item.value === currentPoint ? item.activeIcon : item.icon"
        alt="point"
        height="89"
        width="89"
      >
      <p>{{ item.label }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FooterTabs",
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:currentPoint","handlePointTypeClick"],
  setup (props,{ emit, }) {
    const currentPoint = ref("Manual_cleaning");

    const pointTypes = [
      {
        label: "人工清扫",
        value: "Manual_cleaning",
        icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/manual-cleaning.png",
        activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/manual-cleaning-active.png",
      },
      {
        label: "车辆作业",
        value: "Vehicle_operation",
        icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/vehicle-operation.png",
        activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/vehicle-operation-active.png",
      },
      {
        label: "场地监控",
        value: "Site_monitoring",
        icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/site_monitoring.png",
        activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/site_monitoring-active.png",
      },
      {
        label: "垃圾转运",
        value: "Garbage_transfer",
        icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/garbage-transfer.png",
        activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/garbage-transfer-active.png",
      },
      {
        label: "公厕中转站",
        value: "Public_toilet",
        icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/public-toilet.png",
        activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/footer/public-toilet-active.png",
      }
    ];

    const handlePointTypeClick = (item: any) => {
      currentPoint.value = item.value;

      emit("update:currentPoint", item.value)
      emit("handlePointTypeClick", item.value)
    };

    return {
      currentPoint,
      pointTypes,
      handlePointTypeClick,
    }
  },
})
</script>

<style lang="less">
.footer-tabs {
	display: flex;
	justify-content: space-between;

	&-item {
		text-align: center;
		cursor: pointer;
		
		p {
			color: #fff;
		}
	}
}
</style>
