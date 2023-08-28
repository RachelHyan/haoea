<template>
  <view class="rectify-list">
    <nav-bar
      title="整改列表"
      custom-left
    />
    <page-list
      ref="pageListRef"
      :request="getRectifyList"
      search-placeholder="搜索对象名称"
      :back-top="false"
    >
      <template #row="{row}: {row: MES.WechatRectificationRecordDTO}">
        <view class="rectify-list-item">
          <view class="rectify-list-item-row">
            <text class="rectify-list-item-row-label">
              对象名称:
            </text>
            <text class="rectify-list-item-row-value">
              {{ row.objectName }}
            </text>
          </view>
          <view class="rectify-list-item-row">
            <view class="rectify-list-item-row-label">
              问题:
            </view>
            <text class="rectify-list-item-row-value">
              {{ row.problemItem }}
            </text>
          </view>
          <view class="rectify-list-item-row">
            <text class="rectify-list-item-row-label">
              督查员:
            </text>
            <text class="rectify-list-item-row-value">
              {{ row.inspectionUserName }}
            </text>
          </view>
          <view
            class="rectify-list-item-row"
            @click="handleRectify(row)"
          >
            <view v-if="row.status">
              <text class="rectify-list-item-row-label mr20">
                整改时间:
              </text>
              <text>{{ row.updateTime }}</text>
            </view>
            <view
              class="rectify-list-item-btn"
              :class="{'rectify-list-item-btn--blue': !Boolean(row.status),}"
            >
              <text>{{ row.status? '查看' : '整改' }}</text>
              <uni-icons
                v-if="row.status"
                type="right"
                color="#329CFF"
                size="12"
              />
            </view>
          </view>
        </view>
      </template>
    </page-list>
    <view
      v-if="projectRoleList.includes('ONE_PERSONNEL')"
      class="rectify-fab" 
      @click="goToProjectSelect"
    >
      <image
        style="width: 52rpx;height: 52rpx;"
        src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.9/punch-clock.png"
      />
      <text>打卡</text>
    </view>
    <view
      class="user-fab"
      @click="goToMine"
    >
      <image
        style="width: 52rpx;height: 52rpx;"
        src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/user.png"
      />
      <text>我的</text>
    </view>
  </view>
</template>
<script lang='ts'>
import { mesWechatCaptainSimpleSelectRectificationRecordList, mesWechatUserSelectUserRoles } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import type { PageListParam } from "@/components/page-list/index.vue";
import PageList from "@/components/page-list/index.vue";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "RectifyPage",
  components: { NavBar, PageList,},
  setup(){
    const projectRoleList: Ref<string[]> = ref<string[]>([])
    const pageListRef = ref()
    const projectId = uni.getStorageSync("projectInfo").projectId

    const getRectifyList = async (params: PageListParam & MES.WechatCaptainSimpleSelectRectificationRecordListParams) => {
      params.projectId = projectId
      params.searchValue !== "" && (params.objectName = params.searchValue,params.searchValue = undefined)
      const {data,} = await mesWechatCaptainSimpleSelectRectificationRecordList(params)
      return {data,}
    }

    const getProjectRoleList = async () => {
      try {
        const {data,} = await mesWechatUserSelectUserRoles({projectId,})
        projectRoleList.value = data
      } catch (error) {
      }
    }
    getProjectRoleList()

    const handleRectify = (row: MES.WechatRectificationRecordDTO) => {
      const params = {
        pageMethod: row.status ? "detail" : "add",
        ...row,
      }
      uni.navigateTo({ url: `/pages/rectify-list/problem-rectify/index?data=${encodeURIComponent(JSON.stringify(params))}`, events: { reload: () => pageListRef.value.reload(), }, })
    }

    const goToMine = () => {
      uni.navigateTo({url: "/pages/mine/index",})
    }

    const goToProjectSelect = () => {
      uni.reLaunch({ url: "/pages/punch-clock-personnal/index", })
      uni.setStorageSync("userRole","ONE_PERSONNEL")
    }

    uni.getLocation({})
		
    return {
      pageListRef,
      projectRoleList,
      getRectifyList,
      handleRectify,
      goToMine,
      goToProjectSelect,
    }
  },
})
</script>
<style lang='scss'>
.rectify-list {
	background: #F3F5F7;
	height: 100vh;

	&-refresh {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
	}

	&-item {
		background: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		box-sizing: border-box;
		font-size: 28rpx;
		margin: 24rpx 0;

		&-row {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15rpx 25rpx;
			box-sizing: border-box;

			&-label {
				width: 130rpx;
				text-align: right;
				display: inline-block;
			}

			&-value {
				width: calc(100% - 130rpx);
				padding-left: 20rpx;
			}

			&:last-child {
				border-top: 2rpx solid #eee;
				height: 85rpx;
			}
		}

		&-btn {
			width: 120rpx;
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
			font-size: 28rpx;
			color: #9B9B9B;
		}

		&-btn--blue {
			background-color: $color-blue;
			width: 150rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 24rpx;
			color: #fff;
			font-size: 32rpx;
		}
	}

	.user-fab, .rectify-fab {
		position: absolute;
		bottom: 100rpx;
		right: 32rpx;
		width: 100rpx;
		height: 110rpx;
		background: #ffffffee;
		box-shadow: -1px 11px 76px 0px rgba(3, 35, 69, 0.21);
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #333;
		font-size: 28rpx;
	}

	.rectify-fab {
		bottom: 250rpx;
	}
}
</style>
