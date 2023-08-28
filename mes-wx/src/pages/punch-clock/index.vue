<template>
  <view class="punch-clock">
    <nav-bar title="打卡列表" />
    <page-list
      ref="pageListRef"
      :request="getPunchList"
      search-placeholder="搜索作业人员"
      :back-top="false"
    >
      <template #row="{row}: {row: ClockingInfo}">
        <view class="punch-clock-item">
          <view class="punch-clock-item-checkbox">
            <checkbox
              :checked="row.checked"
              @click="checkboxClick(row)"
            />
          </view>
          <view class="punch-clock-item-content">
            <view class="punch-clock-item-content-row">
              <view>作业人员：{{ row.userName }}</view>
              <view>{{ row.userType }}</view>
            </view>
            <view class="punch-clock-item-content-row">
              <view style="max-width: 400rpx;">
                {{ row.orgNames ?? "-" }}
              </view>
              <view
                class="punch-clock-item-btn punch-clock-item-btn--blue"
                @click="handlePunchClock(row)"
              >
                打卡
              </view>
            </view>
            <view
              v-for="(time,timeIndex) in row.list"
              :key="timeIndex"
              class="punch-clock-item-content-timelist"
            >
              <view class="punch-clock-item-content-timelist-title">
                {{ timeIndex === 0 ? '打卡时间：' : '' }}
              </view>
              <view class="punch-clock-item-content-timelist-time">
                {{ time.clockingTime }}
              </view>
              <view class="punch-clock-item-content-timelist-operate">
                <view
                  class="punch-clock-item-btn"
                  @click="handleDetail(row,time)"
                >
                  <text>查看</text>
                  <uni-icons
                    type="right"
                    color="#329CFF"
                    size="12"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
    </page-list>
    <view
      class="multiple-punch-clock"
      @click="handleMultiple"
    >
      <image
        style="width: 100%;height: 100%;"
        src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.9/batch-punch.png"
      />
    </view>
  </view>
</template>
<script lang='ts'>
import { mesClockingQueryClockingRecordBySysUserId } from "@/api/mes/clockingController";
import { mesWechatUserSelectUserRoles } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import type { PageListParam } from "@/components/page-list/index.vue";
import PageList from "@/components/page-list/index.vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";

type ClockingInfo = MES.ClockingInfo & {
	checked?: boolean
}

export default defineComponent({
  name: "PunchClock",
  components: { NavBar, PageList, },
  setup(){
    const projectRoleList: Ref<string[]> = ref<string[]>([])
    const projectId = uni.getStorageSync("projectInfo").projectId
    const pageListRef = ref()
    const punchList: Ref<ClockingInfo[]> = ref<ClockingInfo[]>([])
    const selectedList: Ref<ClockingInfo[]> = ref<ClockingInfo[]>([])
    const jobType: Ref<"Manual_cleaning" | "Vehicle_operation"> = ref<"Manual_cleaning" | "Vehicle_operation">("Manual_cleaning")

    onLoad((option) => {
      jobType.value = <any>option.jobType
    })

    onShow(() => pageListRef.value && pageListRef.value.load())

    const getPunchList = async (params: PageListParam & MES.ClockingQueryClockingRecordBySysUserIdParams) => {
      params.projectId = projectId
      params.isCaptain =  true
      params.searchValue !== "" && (params.userName = params.searchValue,params.searchValue = undefined)
      const { data, } = await mesClockingQueryClockingRecordBySysUserId(params)
      punchList.value = data.map(item => ({...item, checked: false,})).filter(item => item.userType === (jobType.value === "Manual_cleaning" ? "人工清扫" : "车辆作业"))
      return { data: punchList.value, }
    }

    const getProjectRoleList = async () => {
      try {
        const {data,} = await mesWechatUserSelectUserRoles({projectId,})
        projectRoleList.value = data
      } catch (error) {
      }
    }

    const checkboxClick = (row: ClockingInfo) => {
      row.checked = !row.checked
      selectedList.value = punchList.value.filter(item => Boolean(item.checked))
    }

    const handlePunchClock = (row: ClockingInfo) => {
      const params = { userList: [row], }
      uni.navigateTo({ url: `/pages/punch-clock-form/index?data=${encodeURIComponent(JSON.stringify({ ...params, pageMethod: "add", }))}`, events: { reload: () => pageListRef.value.reload(), }, })
    }

    const handleDetail = (row: MES.ClockingInfo,timer: MES.ClockingRecordVo) => {
      const params = {
        userList: [row],
        ...timer,
      }
      uni.navigateTo({ url: `/pages/punch-clock-form/index?data=${encodeURIComponent(JSON.stringify({ ...params, pageMethod: "detail", }))}`, })
    }

    const handleMultiple = () => {
      if(!selectedList.value.length){
        uni.showToast({title: "请至少选择一项",icon:"none",})
        return
      }
      const params = {
        userList: selectedList.value,
      }
      uni.navigateTo({ url: `/pages/punch-clock-form/index?data=${encodeURIComponent(JSON.stringify({ ...params, pageMethod: "add", }))}`, events: { reload: () => pageListRef.value.reload(), }, success: () => { punchList.value.forEach(item => item.checked = false),selectedList.value = []},})
    }
		
    getProjectRoleList()
		
    return {
      punchList,
      selectedList,
      projectRoleList,
      pageListRef,
      checkboxClick,
      handlePunchClock,
      handleDetail,
      getPunchList,
      handleMultiple,
    }
  },
})
</script>
<style lang='scss'>
.punch-clock {
	background: #F3F5F7;
	height: 100vh;

	&-scroll {
		box-sizing: border-box;
	}

	&-item {
		background: #fff;
		border-radius: 10rpx;
		overflow: hidden;
		padding: 10rpx 20rpx 25rpx 30rpx;
		position: relative;
		box-sizing: border-box;
		font-size: 28rpx;
		display: flex;
		margin: 24rpx 0;

		&-checkbox {
			padding-top: 25rpx;
			width: 60rpx;
			margin-right: 20rpx;
		}

		&-content {
			width: 100%;
			padding-top: 25rpx;

			&-row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 25rpx;
			}

			&-timelist {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top: 2rpx solid #97979736;
				padding: 22rpx 0;

				&:last-child {
					padding-bottom: 0;
				}

				&-title {
					width: 160rpx;
				}

				&-time {
					width: calc(100% - 290rpx);
				}
				
				&-operate {
					width: 120rpx;
				}
			}
		}

		&-clocking {
			width: 100%;
			height: 300rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-top: 2rpx solid #eee;

			&-btn {
				background-color: $color-blue;
				border-radius: 24rpx;
				color: #fff;
				width: 300rpx;
				height: 120rpx;
				line-height: 120rpx;
				font-size: 40rpx;
			}
		}

		&-marktime {
			font-size: 60rpx;
		}

		&-btn {
			width: 120rpx;
			height: 47rpx;
			line-height: 47rpx;
			text-align: center;
			font-size: 26rpx;
			color: #9B9B9B;
			border: none;
		}

		&-btn--blue {
			background-color: $color-blue;
			border-radius: 24rpx;
			color: #fff;
		}
	}

	.multiple-punch-clock {
		position: fixed;
		bottom: 70rpx;
		left: 30rpx;
		width: 165rpx;
		height: 174rpx;
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
