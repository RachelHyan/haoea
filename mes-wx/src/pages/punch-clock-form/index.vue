<template>
  <view class="punch-clock-form">
    <nav-bar title="打卡" />
    <view class="punch-clock-form-header">
      <view class="punch-clock-form-header__item">
        <text class="color-grey mr20">
          作业人员:
        </text>
        <text>
          {{ detailData.userList?.map((item:any) => item.userName).toString() }}
        </text>
      </view>
    </view>
    <view class="punch-clock-form-body">
      <!-- <view v-if="userRole === 'ONE_PERSONNEL' || (userRole === 'CAPTAIN' && detailData.pageMethod === 'detail')">
        <view class="punch-clock-form-title">
          人脸照片:
        </view>
        <view class="punch-clock-form-content">
          <upload-media
            v-model:fileList="faceList"
            list-type="image"
            :max="faceList.length"
            hide-close-btn
            watermark
            face
          />
        </view>
      </view> -->
      <view>
        <view class="punch-clock-form-title">
          辅助照片:
        </view>
        <view class="punch-clock-form-content">
          <upload-media
            v-model:fileList="tempPhotoList"
            list-type="image"
            :max="9"
            :is-detail="isDetail"
            watermark
          />
        </view>
      </view>
    </view>
    <view
      v-if="isDetail"
      class="punch-clock-form-footer"
    >
      <view><text>打卡时间： {{ detailData.clockingTime }}</text></view>
      <view><text>打卡地点： {{ detailData.clockingAddr }}</text></view>
    </view>
    <button
      v-else
      class="punch-clock-form-submit"
      @click="submit"
    >
      提交
    </button>
  </view>
</template>
<script lang='ts'>
import { mesClockingAddClockingRecord } from "@/api/mes/clockingController";
import NavBar from "@/components/nav-bar/index.vue";
import type { FileType } from "@/components/typings";
import UploadMedia from "@/components/upload-media/index.vue";
import { authAuthTokenRenewal } from "@/utils/api";
import { batchUploadMedia, logger } from "@/utils/fn";
import { startLocationBackground } from "@/utils/location-update-background";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";

type DetailType = MES.ClockingRecordVo & {
	pageMethod: "add" | "detail"
	userList: MES.ClockingInfo[]
}

export default defineComponent({
  name: "PunchClockForm",
  components: { NavBar, UploadMedia, },
  setup(){
    const userRole = uni.getStorageSync("userRole")
    const projectId = uni.getStorageSync("projectInfo").projectId
    const detailData = ref<DetailType>({} as any)
    const tempPhotoList: Ref<FileType[]> = ref<FileType[]>([])
    const isDetail: Ref<boolean> = ref<boolean>(false)
    const faceList: Ref<FileType[]> = ref<FileType[]>([])

    onLoad((option) => {
      const res = JSON.parse(decodeURIComponent(<any>option.data))
      isDetail.value = res.pageMethod === "detail" ? true : false
      detailData.value = res
      if(res.pageMethod === "detail" && res.clockingPhotoUrls.length){
        tempPhotoList.value = res.clockingPhotoUrls.map((item:string) => ({url: item,type: "1",}))
      }
      if(userRole === "ONE_PERSONNEL" && res.pageMethod === "add"){
        // faceList.value = res.userList[0].faceList
        tempPhotoList.value = res.userList[0].list  /** 非人脸打卡 */
      }
      // if(res.pageMethod === "detail"){
      //   faceList.value = [{url: res.faceUrl,}]
      // }
    })

    const submit = async () => {
      // if (userRole === "CAPTAIN" && tempPhotoList.value.length === 0) {
      //   uni.showToast({ title: "请拍出勤照片!", icon: "none", })
      //   return;
      // }
      //#region 非人脸打卡
      if (tempPhotoList.value.length === 0) {
        uni.showToast({ title: "请拍出勤照片!", icon: "none", })
        return;
      }
      //#endregion
      uni.showLoading({ title: "正在提交...", mask: true, })
      const params: MES.ClockingInParam = {
        projectId,
        isCaptain: userRole === "CAPTAIN" ? true : false,
        // faceUrl: faceList.value.at(0)?.faceUrl,
      };

      if(userRole === "CAPTAIN") {
        params.userIds = detailData.value.userList?.map((item:any) => item.userId)
        params.clockingAddr = tempPhotoList.value[tempPhotoList.value.length - 1].fullAddress
      } else {
        // params.clockingAddr = faceList.value.at(0)?.fullAddress
        params.clockingAddr = tempPhotoList.value[tempPhotoList.value.length - 1].fullAddress 		/** 非人脸打卡 */
      }

      if(tempPhotoList.value.length){
        try {
          const { data, success, } = await batchUploadMedia(tempPhotoList.value)
          if(!success) return;
          params.clockingPhotographlist = data.map(item => ({
            type: item.type,
            url: item.url,
            longitude: item.longitude,
            latitude: item.latitude,
            photographTime: item.photographTime,
          }))
        } catch (error) {
          logger.error("punch-clock-form->uploadRequest:", error)
        }
      }
			
      try {
        const { success, } = await mesClockingAddClockingRecord(params)
        uni.hideLoading()
        if (success) {
          uni.showToast({ title: "打卡成功", icon: "success", })
          if (userRole === "ONE_PERSONNEL") {
            await authAuthTokenRenewal()
            startLocationBackground()
          }
          await new Promise((resolve) => setTimeout(resolve, 500))
          uni.navigateBack()
        } else {
          uni.showToast({ title: "打卡失败", icon: "none", })
        }
      } catch (error) {
        logger.error("punch-clock-form->submitRequest",error)
      }
    }
		
    return {
      userRole,
      tempPhotoList,
      isDetail,
      detailData,
      faceList,
      submit,
    }
  },
})
</script>
<style lang='scss'>
.punch-clock-form {
	position: relative;
	padding: 0 32rpx;
	background: #F3F5F7;
	height: 100vh;

	&-header {
		width: 100%;
		background: #fff;
		border-radius: 15rpx;
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		margin: 44rpx 0;
		box-sizing: border-box;
	}

	&-body {
		margin-bottom: 40rpx;	
	}

	&-title {
		font-size: 28rpx;
		margin-bottom: 30rpx;
	}

	&-content {
		margin-bottom: 20rpx;
	}

	&-footer {
		font-size: 24rpx;
		color: rgba(56, 49, 49, 0.48);
		border-top: 2rpx solid #eee;
		padding-top: 10rpx;
	}

	&-submit {
		position: fixed;
		bottom: 40rpx;
		left: 0;
		right: 0;
		width: calc(100vw - 65rpx);
		font-size: 32rpx;
		color: #fff;
		height: 92rpx;
		background: linear-gradient(132deg, #1CA5FD 0%, #2691FF 100%);
		border-radius: 46rpx;
	}
}
</style>
