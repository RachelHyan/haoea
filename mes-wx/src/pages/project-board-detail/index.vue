<template>
  <view class="project-board-detail">
    <nav-bar :title="title" />
    <inspector-detail
      v-if="pageType === 'inspector'"
      :job-type="jobType"
      :user-id="userId"
    />
    <worker-detail
      v-if="pageType === 'worker'"
      :job-type="jobType"
      :user-id="userId"
    />
    <object-detail
      v-if="pageType === 'object'"
      :job-type="jobType"
      :object-id="objectId"
    />
  </view>
</template>
<script lang='ts'>
import NavBar from "@/components/nav-bar/index.vue";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";
import InspectorDetail from "./components/inspector-detail/index.vue";
import ObjectDetail from "./components/object-detail/index.vue";
import WorkerDetail from "./components/worker-detail/index.vue";

type PageType = "worker" | "inspector" | "object" | ""

export default defineComponent({
  name: "ProjectBoardDetail",
  components: { InspectorDetail, ObjectDetail, WorkerDetail, NavBar, },
  setup(){
    const title: Ref<string> = ref<string>("")
    const pageType: Ref<PageType> = ref<PageType>("")
    const jobType: Ref<"Manual_cleaning"|"Vehicle_operation"> = ref<"Manual_cleaning"|"Vehicle_operation">("Manual_cleaning")
    const userId: Ref<number> = ref<number>(-1)
    const objectId: Ref<number> = ref<number>(-1)

    onLoad((option) => {
      const res = JSON.parse(decodeURIComponent(<any>option.data))
      pageType.value = res.pageType as PageType
      title.value = res.navTitle || "名称"
      jobType.value = res.jobType
      userId.value = res.userId
      objectId.value = res.objectId
    })
		
    return {
      title,
      pageType,
      jobType,
      userId,
      objectId,
    }
  },
})
</script>
<style lang='scss'>
.project-board-detail {
	min-height: 100vh;
	background: #F6F7F9;
	padding-bottom: 40rpx;

	&-title {
		margin: 40rpx 32rpx 30rpx;
		font-size: 32rpx;
		font-weight: 500;
	}

	&-report {
		padding: 28rpx 60rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #fff;
		margin: 0 32rpx 30rpx;
		border-radius: 15rpx;
		backdrop-filter: blur(50px);

		&-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&-nums {
				margin-bottom: 16rpx;
				font-size: 32rpx;
				font-weight: 500;
				text-align: center;
			}

			&-title {
				font-size: 24rpx;
				color: $color-grey;
			}
		}
	}

	&-card {
		margin-bottom: 20rpx;
		padding: 16rpx 20rpx 0;
		background-color: #fff;
		border-radius: 16rpx;
		backdrop-filter: blur(100rpx);

		&-row {
			margin-top: 16rpx;
			font-size: 28rpx;
			display: flex;
		}

		&-bottom {
			margin-top: 16rpx;
			padding: 30rpx 0;
			border-top: 2rpx solid #BDBDBD;
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;

			&-tag {
				width: 312rpx;
				height: 64rpx;
				line-height: 64rpx;
				background: linear-gradient(90deg, #EBF3FF 0%, rgba(235,243,255,0) 100%);
				border-radius: 15rpx;
				padding: 0 16rpx;
			}
		}
	}
}
</style>
