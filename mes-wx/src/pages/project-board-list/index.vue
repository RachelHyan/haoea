<template>
  <view class="project-board-list">
    <nav-bar :title="title" />
    <inspector-list
      v-if="pageType === 'inspector'"
      :filter="filter"
      :job-type="jobType"
    />
    <worker-list
      v-if="pageType === 'worker'"
      :filter="filter"
      :job-type="jobType"
    />
    <object-list
      v-if="pageType === 'object'"
      :filter="filter"
      :job-type="jobType"
    />
  </view>
</template>
<script lang='ts'>
import NavBar from "@/components/nav-bar/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";
import { ProjectBoardFilterType } from "../project-board/index.vue";
import InspectorList from "./components/inspector-list.vue";
import ObjectList from "./components/object-list.vue";
import WorkerList from "./components/worker-list.vue";


type PageType = "worker" | "inspector" | "object"| ""

export default defineComponent({
  name: "ProjectBoardList",
  components: { NavBar, InspectorList, ObjectList, WorkerList, },
  setup(){
    const pageType = ref<PageType>("")
    const title: Ref<string> = ref<string>("")
    const filter: Ref<ProjectBoardFilterType> = ref<ProjectBoardFilterType>("")
    const jobType: Ref<"Manual_cleaning"|"Vehicle_operation"> = ref<"Manual_cleaning"|"Vehicle_operation">("Manual_cleaning")

    onLoad((option) => {
      pageType.value = option.pageType as PageType
      jobType.value = option.jobType as any
      title.value = pageType.value === "worker" ? "作业人员" : pageType.value === "inspector" ? "督查人员" : "作业对象"
      filter.value = option.status as ProjectBoardFilterType
    })
		
    return {
      title,
      pageType,
      filter,
      jobType,
    }
  },
})
</script>
<style lang='scss'>
.project-board-list {
	min-height: 100vh;
	background: #F6F7F9;
	font-size: 32rpx;

	 &-filter {
		display: flex;
		align-items: center;
		margin: 30rpx 32rpx;
		border-radius: 16rpx;
		background: #fff;
		height: 80rpx;

		&-left {
			width: 50%;
			height: 80rpx;
			line-height: 80rpx;
			border-right: 2rpx solid #ccc;
		}
		
		&-left, &-right {
			width: 50%;
			padding-left: 20rpx;
		}
	 }

	 .filter-status-item {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 2rpx solid #e5e5e5;
			padding: 0 32rpx;
			box-sizing: border-box;

			&:first-child {
				border: none;
			}
	 }

	 &-item {
		min-height: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22rpx 20rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;

		&-left {
			display: flex;
			align-items: center;
			font-size: 32rpx;
		}

		&-right {
			min-width: 70rpx;
			height: 38rpx;
			line-height: 38rpx;
			background: #F3FFFC;
			border-radius: 6rpx;
			border: 1rpx solid #50B89A;
			color: #50B89A;
			text-align: center;
			font-size: 22rpx;
			padding: 0 8rpx;

			&--error {
				background: #FFFBF3;
				border: 1rpx solid #B89250;
				color: #B89250;
			}

			&--info {
				background: #F6F6F6;
				border: 1rpx solid #8F8F8F;
				color: #8F8F8F;
			}
		}
	}
}
</style>
