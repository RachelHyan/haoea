<template>
  <view class="problem-rectify">
    <nav-bar title="问题整改" />
    <view class="problem-rectify-name">
      <view style="width: 130rpx;">
        <text>对象名称</text>
      </view>
      <text style="margin-left: 20rpx;">
        {{ tempData.objectName }}
      </text>
    </view>
    <view class="problem-rectify-detail">
      <view class="problem-rectify-detail-title">
        <image
          class="problem-rectify-detail-title--img"
          :src="'https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/link.png'"
        />
        <view class="select-problem-select__collapse-content-title--text">
          {{ inspectionData.inspectionTime }} 督查记录
        </view>
      </view>
      <view class="problem-rectify-detail-problem">
        <text>存在问题：</text>
        <text style="flex: 1;">
          {{ tempData.problemItem }}
        </text>
      </view>
      <view class="problem-rectify-detail-images">
        <view
          v-for="(item, index) in inspectionData.inspectionFiles"
          :key="index"
          class="image-list-item"
        >
          <image
            v-if="item.type === '1'"
            style="width: 100%;height: 100%;"
            :src="item.url"
            @click="previewImage(index,inspectionData.inspectionFiles??[])"
            @error="()=> (item.url = 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')"
          />
          <video
            v-else-if="item.type === '2'"
            style="width: 100%;height: 100%;"
            :src="item.url"
          />
        </view>
      </view>
      <view class="problem-rectify-detail-remark">
        <text>问题备注：</text>
        <text style="flex: 1;">
          {{ inspectionData.inspectionRemarks || '无' }}
        </text>
      </view>
    </view>
    <view class="problem-rectify-rectify">
      <view class="problem-rectify-rectify-item">
        <text class="problem-rectify-rectify-item--title">
          当前整改
        </text>
        <text>{{ inspectionData.inspectionTime }} 督查记录</text>
      </view>
      <view class="problem-rectify-rectify-item">
        <text class="problem-rectify-rectify-item--title">
          整改照片
        </text>
        <view class="problem-rectify-rectify-item--value">
          <upload-media
            v-model:fileList="rectificationFiles"
            list-type="image"
            :max="9"
            :is-detail="pageMethod === 'detail'"
            watermark
          />
        </view>
      </view>
      <view class="problem-rectify-rectify-item">
        <text class="problem-rectify-rectify-item--title">
          整改描述
        </text>
        <textarea
          v-model="formModel.remarks"
          auto-height
          placeholder="请输入整改描述"
          class="problem-rectify-rectify-item--textarea"
          :disabled="pageMethod === 'detail'"
        />
      </view>
    </view>
    <button
      v-if="pageMethod === 'add'"
      type="button"
      class="form-page-btn"
      @click="submit"
    >
      提交整改
    </button>
  </view>
</template>
<script lang='ts'>
import { mesWechatCaptainSimpleSelectRectificationRecordInfo, mesWechatCaptainSimpleUploadRectificationResult } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import type { FileType } from "@/components/typings";
import UploadMedia from "@/components/upload-media/index.vue";
import { batchUploadMedia, previewImage } from "@/utils/fn";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, getCurrentInstance, ref } from "vue";

type FormModelType = {
	latitude?: string;
	longitude?: string;
	rectificationRecordId?: number;
	remarks?: string | undefined;
}

type TempData = {
	rectificationRecordId?: number,
	objectName?: string,
	problemItem?: string,
}

export default defineComponent({
  name: "ProblemRectify",
  components: { NavBar, UploadMedia, },
  setup() {
    //  @ts-ignore
    const channel = getCurrentInstance()?.proxy?.getOpenerEventChannel()
    const rectificationFiles: Ref<FileType[]> = ref<FileType[]>([])
    const inspectionData: Ref<MES.WechatRectificationRecordInfo> = ref<MES.WechatRectificationRecordInfo>({})
    const formModel: Ref<FormModelType> = ref<FormModelType>({})
    const tempData: Ref<TempData> = ref<TempData>({})
    const pageMethod: Ref<"add"|"detail"> = ref<"add"|"detail">("add")

    onLoad((option)=>{
      const res = JSON.parse(decodeURIComponent(<any>option.data))
      pageMethod.value = res.pageMethod
      tempData.value = res
      getRectifyDetail(res.rectificationRecordId)
    })

    const getRectifyDetail = async (rectificationRecordId: number) => {
      try {
        const { data, } = await mesWechatCaptainSimpleSelectRectificationRecordInfo({rectificationRecordId, })
        const { remarks, inspectionFiles, inspectionTime, inspectionRemarks, } = data
        pageMethod.value === "detail" && (formModel.value = {remarks: remarks || "无",})
        inspectionData.value = { inspectionTime, inspectionFiles, inspectionRemarks, }
        rectificationFiles.value = data.rectificationFiles ?? []
      } catch (error) {
      }
    }

    const submit = async () => {
      uni.showLoading({ title: "正在提交...", mask: true,})
      if (rectificationFiles.value.length === 0) {
        uni.showToast({ title: "请拍整改照片", icon: "none", })
        return;
      }
			
      const params: MES.SimpleWechatRectificationResultUploadParam = {
        ...formModel.value,
        rectificationRecordId: tempData.value.rectificationRecordId,
        imageUrls: [],
      } as any

      const { data, success, } = await batchUploadMedia(rectificationFiles.value)
      if(!success) return;
      params.imageUrls = data.map(item => (item.url as string))

      try {
        const { success, msg, } = await mesWechatCaptainSimpleUploadRectificationResult(params)
        uni.hideLoading()
        if (success) {
          uni.showToast({ title: "提交成功", icon: "success", })
          await new Promise((resolve) => setTimeout(resolve, 500))
          uni.navigateBack()
          channel.emit("reload")
        } else {
          uni.showToast({ title: msg, icon: "none", })
        }
      } catch (error) {
      }
    }

    return {
      tempData,
      inspectionData,
      formModel,
      rectificationFiles,
      pageMethod,
      previewImage,
      submit,
    }
  },
})
</script>
<style lang='scss'>
.problem-rectify {
	padding-bottom: 40rpx;

	&-name {
		width: 100%;
		border-top: 10rpx solid #EBEBEB;
		border-bottom: 10rpx solid #EBEBEB;
		padding: 32rpx;
		font-size: 28rpx;
		display: flex;
		box-sizing: border-box;
	}

	&-detail {
		padding: 27rpx 32rpx;
		border-bottom: 10rpx solid #EBEBEB;
				
		&-title {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			margin-bottom: 28rpx;

			&--img {
				width: 23rpx;
				height: 23rpx;
				margin-right: 15rpx;
			}
		}

		&-images {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			
			.image-list-item {
				position: relative;
				width: 201rpx;
				height: 201rpx;
				border-radius: 8rpx;
				margin: 10rpx 20rpx 10rpx 0;
				overflow: hidden;
			}
		}

		&-problem, &-remark {
			display: flex;
			font-size: 26rpx;
			color: #393939;
			margin: 20rpx 0;
		}
	}

	&-rectify {
		font-size: 28rpx;
		padding: 0 32rpx;
		
		&-item {
			padding: 37rpx 0;
			border-bottom: 1rpx solid #EBEBEB;
			display: flex;

			&--title {
				margin-right: 25rpx;
			}

			&--value {
				width: calc(100% - 150rpx);
				display: flex;
				align-items: center;
				flex-wrap: wrap;
			}

			&--textarea {
				flex: 1;
				margin: 5rpx 0 0;

				&::placeholder {
					font-size: 28rpx;
					color: #ADABB4;
				}
			}
		}
	}

	.form-page-btn {
		background-color: #1176F6;
		color: #fff;
		font-size: 28rpx;
		margin: 40rpx 32rpx 0;
		height: 80rpx;
		line-height: 80rpx;
	}
}
</style>
