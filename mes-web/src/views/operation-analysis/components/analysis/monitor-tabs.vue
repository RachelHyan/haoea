<template>
  <div class="monitor-tabs">
    <div
      v-for="tab in tabs"
      :key="tab.value" 
      :class="['monitor-tabs-item', { 'active': activeTab === tab.value }]"
      @click="handleTabClick(tab.value)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "MonitorTabs",
  props: {
    footerTab: {
      type: String,
      default: "Manual_cleaning",
    },
  },
  emits: ["update:tabClick","handleTabClick"],
  setup (props,{ emit, }) {
    const  activeTab = ref("dynamic");

    const dynamic = computed(() => {
      return props.footerTab === "Manual_cleaning" ? "人员动态监控" : "车辆动态监控"
    })
		
    const tabs = ref([
      {name: dynamic, value: "dynamic",}
      // {name: "作业覆盖监控", value: "cover",}
    ])



    const handleTabClick = (tab: string) => {
      activeTab.value = tab;
      emit("update:tabClick", tab);
      emit("handleTabClick", tab);
    }

    return {
      activeTab,
      tabs,
      handleTabClick,
    }
  },
})
</script>

<style lang="less">
.monitor-tabs {
	position: absolute;
	top: 42px;
	left: 443px;
	z-index: 100;
	// width: 242px;
	height: 46px;
	background: rgba(31,95,204,0.1);
	display: flex;

	&-item {
		width: 121px;
		height: 46px;
		border: 1px solid transparent;
		color: rgba(225,225,225,0.8);
		font-size: 16px;
		line-height: 46px;
		text-align: center;
		cursor: pointer;

		&.active {
			background: linear-gradient(360deg, rgba(46,117,195,0.45) 0%, rgba(1,17,39,0.5) 100%);
			border: 1px solid #2047C5;
			color: #fff;
		}
	}
}
</style>
