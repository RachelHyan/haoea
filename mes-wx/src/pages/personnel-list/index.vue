<template>
  <view class="personnel-list">
    <nav-bar title="人员列表" />
    <page-list
      ref="pageListRef"
      :request="getList"
      custom-search
      :back-top="false"
    >
      <template #search>
        <view class="personnel-list-filter">
          <view
            class="personnel-list-filter-orgName"
            @click="() => popupVisible = true"
          >
            <text>{{ filterParams.departmentName }}</text>
            <uni-icons
              type="bottom"
              color="#999"
              size="20"
            />
          </view>
          <view class="personnel-list-filter-search">
            <uni-search-bar
              v-model="filterParams.search"
              placeholder="请输入姓名"
              cancel-button="none"
              bg-color="#F1F1F1"
              @confirm="pageListRef.load()"
              @clear="() => (filterParams.search = '', pageListRef.reload())"
            />
          </view>
        </view>
      </template>
      <template #head>
        <view class="personnel-list-item personnel-list-head">
          <view class="personnel-list-item-name">
            姓名
          </view>
          <view class="personnel-list-item-status">
            人脸采集情况
          </view>
          <view class="personnel-list-item-operate">
            操作
          </view>
        </view>
      </template>
      <template #row="{ row }: { row: MES.WechatUserFaceDTO }">
        <view class="personnel-list-item">
          <view class="personnel-list-item-name color-blue">
            <text @click="handleTrack(row)">
              {{ row.userName || '-' }}
            </text>
          </view>
          <view class="personnel-list-item-status">
            <text>{{ row.imageNum ? '已采集' : '未采集' }}</text>
          </view>
          <view
            class="personnel-list-item-operate"
            @click="handleFaceCollect(row)"
          >
            <view
              class="personnel-list-item-operate--green"
              :class="{'personnel-list-item-operate--blue': !row.imageNum}"
            >
              {{ row.imageNum ? '详情' : '采集' }}
            </view>
          </view>
        </view>
      </template>
    </page-list>
    <popup-modal
      v-if="popupVisible"
      v-model:visible="popupVisible"
      :is-border-bottom="false"
      :show-header="false"
      mask
    >
      <scroll-view
        scroll-y
        style="max-height: 900rpx; padding-bottom: 20rpx;"
      >
        <view class="org-list">
          <view
            class="org-list-item"
            @click="handleOrgItem('')"
          >
            全部
          </view>
          <view
            v-for="(item,index) in depList"
            :key="index"
            class="org-list-item"
            @click="handleOrgItem(item)"
          >
            <text>{{ item.departmentName }}</text>
          </view>
          <view
            class="popup-modal-bottom-cancel-item"
            @click="popupVisible = false"
          >
            <text>取消</text>
          </view>
        </view>
      </scroll-view>
    </popup-modal>
  </view>
</template>
<script lang='ts'>
import { mesPersonAddPerson } from "@/api/mes/personController";
import { mesWechatTencentPersonFaceSelectDepartmentByPhone, mesWechatTencentPersonFaceSelectPersonFaceList } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import type { PageListParam } from "@/components/page-list/index.vue";
import PageList from "@/components/page-list/index.vue";
import PopupModal from "@/components/popup-modal/index.vue";
import { upload } from "@/libs/cos";
import { logger } from "@/utils/fn";
import { onLoad, onUnload } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "PersonnelList",
  components: { NavBar, PageList, PopupModal, },
  setup(){
    const pageListRef = ref()
    const projectId = uni.getStorageSync("projectInfo").projectId
    const personGroupId = uni.getStorageSync("projectInfo").personGroupId
    const filterParams = reactive({ search: "", departmentId: undefined, departmentName: "全部", })
    const popupVisible: Ref<boolean> = ref<boolean>(false)
    const depList: Ref<MES.WechatDepartmentDTO[]> = ref<MES.WechatDepartmentDTO[]>([])
    const jobType: Ref<"Manual_cleaning" | "Vehicle_operation"> = ref<"Manual_cleaning" | "Vehicle_operation">("Manual_cleaning")

    onLoad((option) => {
      jobType.value = option.jobType as any
      getDepList()
      uni.$on("update", () => pageListRef.value.reload())
    })

    const getList = async (params: PageListParam & MES.WechatTencentPersonFaceSelectPersonFaceListParams) => {
      params.projectId = projectId
      params.userType = jobType.value
      filterParams.search !== "" && (params.userName = filterParams.search)
      filterParams.departmentId && (params.departmentId = filterParams.departmentId)
      const { data, } = await mesWechatTencentPersonFaceSelectPersonFaceList(params)

      return { data, }
    }

    const getDepList = async () => {
      try {
        const {data,} = await mesWechatTencentPersonFaceSelectDepartmentByPhone({projectId,})
        depList.value = data || []
				
      } catch (error) {}
    }
		
    const handleTrack = (row: MES.WechatUserFaceDTO) => {
      const params = {
        userId: row.userId,
        userName: row.userName,
      }
      uni.navigateTo({url: `/pages/work-track/index?data=${encodeURIComponent(JSON.stringify(params))}`,})
    }
		
    const handleFaceCollect = (row: MES.WechatUserFaceDTO) => {
      const params: any = {
        userId: row.userId,
        userName: row.userName,
      }
      if (row.imageNum) {
        params.pageMethod = "detail"
        params.personId = row.personId
        uni.navigateTo({ url: `/pages/personnel-collect-form/index?data=${encodeURIComponent(JSON.stringify(params))}`,
          events: { reload: () => pageListRef.value.reload(), }, })
      } else {
        params.pageMethod = "add"
        uni.navigateTo({
          url: "/pages/camera/index?watermark=false&face=true",
          events: {
            save: async (res: any) => {
              uni.showLoading({ title: "上传中,请勿操作", mask: true, })
              let url = ""
              const { data, code, } = await upload(res.tempFilePath, true)
              if(code === 200) url = data
              else uni.showToast({title: "上传失败！",})
              try {
                const { data, success, msg, } = await mesPersonAddPerson({
                  projectId,
                  url,
                  userId: row.userId,
                  userName: row.userName,
                  personGroupId,
                })
                uni.hideLoading()
                if(success){
                  uni.showToast({title: "采集成功", icon: "success",})

                  params.personId = data			// personId 待后端返回数据后截取
                  params.faceList = [{ url: res.tempFilePath, }]
                  await new Promise((resolve) => setTimeout(resolve, 300))
                  uni.redirectTo({ url: `/pages/personnel-collect-form/index?data=${encodeURIComponent(JSON.stringify(params))}`, })
                }
                else {
                  uni.showModal({ title: "采集失败",content: msg, showCancel: false, confirmText: "重拍", success: ({confirm,}) => confirm && res.rephotograph(),})
                }
              } catch (error) { 
                logger.error("handleFaceCollect=>", error)
							 }
            },
          },
        })
      }
    }

    const handleOrgItem = (row?: any) => {
      if(row === ""){
        filterParams.departmentId = undefined
      	filterParams.departmentName = "全部"
      } else {
        filterParams.departmentId = row.departmentId
      	filterParams.departmentName = row.departmentName
      }
      popupVisible.value = false
      pageListRef.value.reload()
    }

    onUnload(() => uni.$off("update"))  // 卸载页面时移除自定义事件

    return {
      pageListRef,
      filterParams,
      popupVisible,
      depList,
      getList,
      handleFaceCollect,
      handleOrgItem,
      handleTrack,
    }
  },
})
</script>
<style lang='scss'>
.personnel-list {
	background: #F6F7F9;

	&-filter {
		display: flex;
		align-items: center;
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 40rpx 32rpx 20rpx;
		padding-left: 32rpx;

		&-orgName {
			width: 55%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			border-right: 2rpx solid #717171;
			padding-right: 20rpx;
		}

		&-search {
			width: 45%;

			.uni-searchbar__box {
				border: none !important;
			}
		}
	}
	
	&-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 44rpx 32rpx;
		font-size: 28rpx;
		border-bottom: 2rpx solid #96969636;

		&-name {
			width: 25%;
		}

		&-status {
			width: 30%;
			text-align: center;
		}

		&-operate {
			width: 20%;
			text-align: center;

			&--green {
				width: 120rpx;
				height: 50rpx;
				line-height: 50rpx;
				color: #61DD80;
				border: 2rpx solid #61DD80;
				border-radius: 26rpx;
			}

			&--blue {
				color: #61D5DD;
				border: 2rpx solid #61D5DD;
			}
		}
	}

	&-head {
		padding: 36rpx 32rpx;
		border-radius: 16rpx 16rpx 0 0;
		margin: 0 32rpx;
		background: #F8FCFF;
		border: none;
	}

	.org-list {
		&-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			font-size: 28rpx;
			border-bottom: 2rpx solid #e5e5e5;
		}
	}
}
</style>
