<template>
  <view class="personnel-collect-form">
    <nav-bar title="人脸采集" />
    <view class="personnel-collect-form-head">
      <view class="personnel-collect-form-head-row">
        <text class="color-grey">
          作业人员：
        </text>
        <text>{{ detailData.userName }}</text>
      </view>
    </view>
    <view class="personnel-collect-form-body">
      <view class="personnel-collect-form-image">
        <view class="personnel-collect-form-image-title">
          <text>人脸图片</text>
        </view>
        <view class="personnel-collect-form-image-item">
          <upload-media
            v-model:file-list="faceList"
            list-type="image"
            :max="5"
            hide-close-btn
            face
            :custom-upload-fn="customUploadFn"
          />
        </view>
        <text
          class="color-grey"
          style="font-size: 24rpx;"
        >
          请至少上传 2 张人脸图片，最多5张
        </text>
      </view>
    </view>
    <button
      class="personnel-collect-form-submit"
      :disabled="faceList.length < 2"
      @click="submit"
    >
      完成
    </button>
  </view>
</template>
<script lang='ts'>
import { mesPersonAddPersonFace } from "@/api/mes/personController";
import { mesWechatTencentPersonFaceSelectPersonFaceInfo } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import type { FileType } from "@/components/typings";
import UploadMedia from "@/components/upload-media/index.vue";
import { upload } from "@/libs/cos";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, getCurrentInstance, ref } from "vue";

export default defineComponent({
  name: "PersonnelCollectForm",
  components: { NavBar, UploadMedia, },
  setup(){
    //  @ts-ignore
    const channel = getCurrentInstance()?.proxy?.getOpenerEventChannel()
    const projectId = uni.getStorageSync("projectInfo").projectId
    const faceList: Ref<FileType[]> = ref<FileType[]>([])
    const detailData: Ref<MES.WechatUserFaceDTO> = ref<MES.WechatUserFaceDTO>({})
    const pageMethod: Ref<"add"|"detail"> = ref<"add"|"detail">("add")

    onLoad((option) => {
      const  data = JSON.parse(decodeURIComponent(<any>option.data))
      pageMethod.value = data.pageMethod
      detailData.value = data
      if(pageMethod.value === "add") {
        faceList.value = data.faceList
      } else {
        getDetail()
      }
    })


    const getDetail = async () => {
      try {
        const {data,} = await mesWechatTencentPersonFaceSelectPersonFaceInfo({ userId: <number>detailData.value.userId, })
        faceList.value = data.map(item => ({url: item,})) || []
      } catch (error) {
      }
    }

    const customUploadFn = (list: FileType[]) => {
      uni.navigateTo({
        url: "/pages/camera/index?watermark=false&face=true",
        animationType: "fade-in",
        events: {
          save: async (res: any) => {
            uni.showLoading({ title: "上传中,请勿操作", mask: true, })
            let url = ""
            const {data,code,} = await upload(res.tempFilePath, true)
            if(code === 200) url = data

            try {
              const { success, } = await mesPersonAddPersonFace({
                projectId,
                personId: detailData.value.personId,
                urls: [url],
              })
              uni.hideLoading()
              if(success){
                uni.showToast({title: "采集成功", icon: "success",})
                list.push({ url: res.tempFilePath,});
                await new Promise((resolve) => setTimeout(resolve, 300))
                uni.navigateBack()
              } else {
                uni.showModal({ title: "采集失败",content: "图片不合格", showCancel: false, confirmText: "重拍", success: ({confirm,}) => confirm && res.rephotograph(),})
              }
            } catch (error) { }
            
          },
        },
      })
    }

    const submit = () => {
      Object.keys(channel).length ? channel.emit("reload") : uni.$emit("update")
      uni.navigateBack()
    }
		
    return {
      pageMethod,
      faceList,
      detailData,
      customUploadFn,
      submit,
    }
  },
})
</script>
<style lang='scss'>
.personnel-collect-form {
	position: relative;
	padding: 0 32rpx;
	background: #F3F5F7;
	height: 100vh;
	
	&-head {
		width: 100%;
		background: #fff;
		border-radius: 15rpx;
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		margin: 44rpx 0;
		box-sizing: border-box;
	}

	&-image {

		&-title {
			font-size: 28rpx;
			margin-bottom: 30rpx;
		}
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
