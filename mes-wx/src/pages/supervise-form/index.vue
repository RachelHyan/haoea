<template>
  <view class="supervise-form">
    <nav-bar :title="pageMethod === 'add' ? '督查' : detailData.objectName" />
    <view class="supervise-form-item">
      <view class="supervise-form-item--label">
        <text>对象名称</text>
      </view>
      <view class="supervise-form-item--value">
        <text>{{ detailData.objectName }}</text>
      </view>
    </view>
    <view
      v-if="pageMethod === 'detail'"
      class="supervise-form-item"
    >
      <view class="supervise-form-item--label">
        <text>督查员</text>
      </view>
      <view class="supervise-form-item--value">
        <text>{{ detailData.inspectionUserName }}</text>
      </view>
    </view>
    <view
      v-if="pageMethod === 'detail'"
      class="supervise-form-item"
    >
      <view class="supervise-form-item--label">
        <text>督查时间</text>
      </view>
      <view class="supervise-form-item--value">
        <text>{{ detailData.createTime }}</text>
      </view>
    </view>
    <view class="supervise-form-item ptb20">
      <view class="supervise-form-item--label">
        <text>督查照片</text>
      </view>
      <view class="supervise-form-item--value">
        <upload-media
          v-model:fileList="imageList"
          list-type="image"
          :max="9"
          :is-detail="pageMethod === 'detail'"
          watermark
        />
      </view>
    </view>
    <view class="supervise-form-item ptb20">
      <view class="supervise-form-item--label">
        <text>督查视频</text>
      </view>
      <view class="supervise-form-item--value">
        <upload-media
          v-model:fileList="videoList"
          list-type="video"
          :max="1"
          :is-detail="pageMethod === 'detail'"
        />
      </view>
    </view>
    <view class="supervise-form-item">
      <view class="supervise-form-item--label">
        <text>存在问题</text>
      </view>
      <view
        class="supervise-form-item--value"
        style="justify-content: flex-end;"
      >
        <switch
          :checked="switchChecked"
          :disabled="pageMethod === 'detail'"
          color="#2E74EC"
          @change="switchChange"
        />
      </view>
    </view>
    <view
      v-if="switchChecked"
      class="supervise-form-problem-list"
    >
      <checkbox-group @change="checkboxGroupChange">
        <uni-collapse :accordion="pageMethod === 'add'">
          <template
            v-for="(type,typeIndex) in problemList"
            :key="typeIndex"
          >
            <uni-collapse-item
              :open="true"
              :border="false"
              show-animation
              title-border="none"
            >
              <template #title>
                <view class="problem-title">
                  {{ type.problemType }}
                </view>
              </template>
              <template
                v-for="(item,index) in type.problemItemList"
                :key="index"
              >
                <label class="problem-item">
                  <checkbox
                    v-if="pageMethod === 'add'"
                    style="transform: scale(0.7);"
                    :value="String(item.problemItemId)"
                    :checked="item.checked"
                  />
                  <image
                    v-else
                    style="width: 26rpx;height: 26rpx;margin-right: 10rpx;"
                    src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/problem-icon.png"
                  />
                  <text>{{ item.problemItem }}</text>
                </label>
                <view
                  v-if="pageMethod === 'add' && item.checked"
                  class="problem-item-rectifier"
                >
                  <text>请选择整改员：</text>
                  <picker
                    :range="item.rectifierList"
                    range-key="rectifierName"
                    @change="({detail}:any) => pickerChange(detail,item.rectifierList)"
                  >
                    <view
                      class="problem-item-rectifier-selector"
                      :class="{'rectifier-selected': item.rectifierList.some((user:any) => user.checked === true)}"
                    >
                      {{ item.rectifierList.find((user:any) => user.checked === true) ? item.rectifierList.find((user:any) => user.checked === true).rectifierName : '点击选择整改员' }}
                    </view>
                  </picker>
                </view>
              </template>
            </uni-collapse-item>
          </template>
        </uni-collapse>
      </checkbox-group>
    </view>
    <view class="supervise-form-item ptb20">
      <view class="supervise-form-item--label">
        <text>问题备注</text>
      </view>
      <view class="supervise-form-item--value">
        <textarea
          v-model="formModel.remarks"
          :disabled="pageMethod === 'detail'"
          auto-height
          placeholder="描述详细地址、问题详情等备注"
        />
      </view>
    </view>
    <template v-if="pageMethod === 'detail'">
      <template
        v-for="(type,typeIndex) in problemList"
        :key="typeIndex"
      >
        <view
          v-for="(item,index) in type.problemItemList"
          :key="index"
          class="supervise-form-record"
        >
          <view class="supervise-form-record-head">
            <text>{{ item.problemItem }}</text>
            <text
              class="color-grey"
              style="font-size: 24rpx;"
            >
              - 整改情况
            </text>
          </view>
          <view class="supervise-form-record-body color-grey">
            <view
              class="mb10"
              style="margin-top: 20rpx;"
            >
              <text>整改人员：</text>
              <text>{{ item.rectifierName }}</text>
            </view>
            <view
              v-if="item.rectificationStatus === '1'"
              class="mb10"
            >
              <text>整改时间：</text>
              <text>{{ item.rectificationTime }}</text>
            </view>
            <view class="mb10">
              <text>整改情况：</text>
              <view
                class="record-tag"
                :style="{
                  display: 'inline-block',
                  backgroundColor: item.rectificationStatus === '1' ? '#DCF0E0CC' : '#F0DCDCCC',
                  borderColor: item.rectificationStatus === '1' ? '#6AC696' : '#C66A6A',
                  color: item.rectificationStatus === '1' ? '#6AC696' : '#C66A6A',
                }"
              >
                {{ item.rectificationStatus === "1" ? '已整改' : '未整改' }}
              </view>
            </view>
            <view class="supervise-form-record-image mb10">
              <view
                v-for="(file,fileIndex) in item.rectificationFiles"
                :key="fileIndex"
                class="supervise-form-record-image-item"
              >
                <image
                  style="width: 100%;height: 100%;"
                  :src="file.url"
                  @click="previewImage(fileIndex,item.rectificationFiles)"
                  @error="()=> (file.url = 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')"
                />
              </view>
            </view>
          </view>
        </view>
      </template>
    </template>
    <button
      v-if="pageMethod === 'add'"
      type="button"
      class="supervise-form-btn"
      @click="submit"
    >
      提交督查意见
    </button>
    <button
      v-if="detailData.isToday"
      type="button"
      class="supervise-form-btn"
      @click="openHistory"
    >
      查看历史
    </button>
  </view>
</template>
<script lang='ts'>
import { mesWechatCaptainSimpleAddInspectionRecord, mesWechatCaptainSimpleSelectInspectionRecordInfoById, mesWechatCaptainSimpleSelectProblemList } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import type { FileType } from "@/components/typings";
import UploadMedia from "@/components/upload-media/index.vue";
import { upload } from "@/libs/cos";
import { batchUploadMedia, previewImage } from "@/utils/fn";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";

/**
 * 新增传：pageMethod,name,objectType,inspectionTaskId,inspectionUserName,objectId
 * 详情传：pageMethod,name,createTime,isProblem,recordId,inspectionUserName,objectId
 */
type TempDataType = {
	objectId?: number,
	objectType?: string,
	objectName?: string,
	inspectionTaskId?: number,
	createTime?: string,
	inspectionUserName?: string,
	isProblem?: number,
	recordId?: string,
	isToday?: boolean,
	pageMethod?: "add"|"detail",
}

export default defineComponent({
  name: "SuperviseForm",
  components: { NavBar, UploadMedia, },
  setup(){
    // @ts-ignore
    const channel = getCurrentInstance()?.proxy?.getOpenerEventChannel()
    const projectId = uni.getStorageSync("projectInfo").projectId
    const pageMethod: Ref<"add"|"detail"> = ref<"add"|"detail">("add")
    const formModel = reactive({remarks:"", longitude: "", latitude: "",})
    const imageList: Ref<FileType[]> = ref<FileType[]>([])
    const videoList: Ref<FileType[]> = ref<FileType[]>([])
    const problemList: Ref<any[]|MES.SimpleWechatProblemDTO[]> = ref<any[]|MES.SimpleWechatProblemDTO[]>([])
    const detailData: Ref<TempDataType> = ref<TempDataType>({})
    const loading: Ref<boolean> = ref<boolean>(false)
    const switchChecked: Ref<boolean> = ref<boolean>(false);

    onLoad((option) => {
      const data = JSON.parse(decodeURIComponent(<any>option.data))
      pageMethod.value = data.pageMethod ?? "add"
      detailData.value = data
      pageMethod.value === "add" && getProblemList()
      if(pageMethod.value === "detail"){
        getDetailData()
      }
    })

    const getDetailData = async () => {
      try {
        const {data,} = await mesWechatCaptainSimpleSelectInspectionRecordInfoById({recordId: <string>detailData.value.recordId,})
        formModel.remarks = data.remarks ?? " "
        problemList.value = <any>data.problemList
        switchChecked.value = data.problemList?.length ? true : false
        imageList.value = data.inspectionFiles?.filter((item: any) => item.type === "1") ?? []
        videoList.value = data.inspectionFiles?.filter((item: any) => item.type === "2") ?? []
      } catch (error) {
      }
    }

    const getProblemList = async () => {
      try {
        const {data,} = await mesWechatCaptainSimpleSelectProblemList({projectId,objectType: <string>detailData.value.objectType,})

        problemList.value = data.map(type => {
          const problemItemList = type.problemItemList?.map(item => {
            const rectifierList = item.rectifierList?.map(rectifier => ({...rectifier,checked: false,}))
            return {...item, rectifierList, checked: false,}
          })
          return {...type,problemItemList,}
        })
      } catch (error) {
      }
    }

    const switchChange = (e: any) => {
      switchChecked.value = e.detail.value;
    }

    const delImage = (index: number) => {
      imageList.value.splice(index, 1);
    }

    const checkboxGroupChange = ({detail,}: any) => {
      problemList.value.forEach(type => {
        type.problemItemList.forEach((item:any) => {
          item.checked = false
          detail.value.forEach((val:string) => {
            if(item.problemItemId == val){
              item.checked = true
            }
          })
        })
      })
    }

    const pickerChange = (detail: {value: number},list: any[]) => {
      if(!list.length) return;
      list.forEach(item => item.checked = false)
      list[detail.value].checked = true
    }

    const problemItemValidator = () => {
      const problemItemList: MES.SimpleWechatRectificationRecordAddParam[] = []
      let valid = true
      problemList.value.forEach(type => {
        type.problemItemList.forEach((item:any) => {
          const state = item.rectifierList.some((rectifier:any) => {
            if(item.checked && rectifier.checked){
              problemItemList.push({
                problemItem: item.problemItem,
                problemItemId: item.problemItemId,
                rectifierId: rectifier.rectifierId,
              })
            }
            return rectifier.checked === true
          })
          if(item.checked && state === false && switchChecked.value){
            uni.showToast({ title: "存在的问题请选择整改员", icon: "none", })
            valid = false
          }
        })
      })
      if(switchChecked.value && (!problemItemList.length)) {
        uni.showToast({ title: "请勾选问题项", icon: "none", })
        valid = false
      }
      return {problemItemList,valid,}
    }

    const submit = async () => {
      uni.showLoading({ title: "正在提交...",mask: true, })
      if (imageList.value.length === 0) {
        uni.showToast({ title: "请拍照督查照片", icon: "none", })
        return;
      }
      const { problemItemList, valid, } = problemItemValidator()
      if(!valid) return;
			
      const params: MES.SimpleWechatInspectionResultUploadParam = {
        imageUrls: [],
        longitude: imageList.value[imageList.value.length - 1].longitude,
        latitude: imageList.value[imageList.value.length - 1].latitude,
        inspectionTaskId: <number>detailData.value.inspectionTaskId,
        inspectionIsProblem: switchChecked.value ? 1 : 0,
        objectId: detailData.value.objectId,
        objectName: detailData.value.objectName,
        projectId,
      } as any
      problemItemList.length > 0 && (params.problemItemList = problemItemList)
      formModel.remarks.trim().length > 0 && (params.remarks = formModel.remarks)

      const { data, success, } = await batchUploadMedia(imageList.value)
      if(!success) return;
      params.imageUrls = data.map(item => (item.url as string))

      if (videoList.value.length) {
        try {
          const { code, data, } = await upload(<string>videoList.value[0].url)
          if (code == 200) {
            params.videoUrl = data
          } else {
            uni.showToast({ title: "上传视频失败", icon: "none", })
          }
        } catch (error) {
        }
      }

      try {
        const { success, msg, } = await mesWechatCaptainSimpleAddInspectionRecord(params)
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


    const openHistory = () => {
      const params = {
        objectName: detailData.value.objectName,
        objectId: detailData.value.objectId,
      }
      uni.navigateTo({url: `/pages/history-list/index?data=${encodeURIComponent(JSON.stringify(params))}`,})
    }
		
    return {
      loading,
      pageMethod,
      detailData,
      formModel,
      imageList,
      videoList,
      problemList,
      switchChecked,
      previewImage,
      switchChange,
      delImage,
      checkboxGroupChange,
      submit,
      pickerChange,
      openHistory,
    }
  },
})
</script>
<style lang='scss'>
.supervise-form {
	font-size: 28rpx;
	padding: 0 32rpx 50rpx;
	
	&-item {
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #e5e5e5;
		padding: 27rpx 0;

		&--label {
			width: 150rpx;
		}
		
		&--value {
			width: calc(100% - 150rpx);
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}
	}

	.image-list-item,
	.video-item {
		position: relative;
		width: 201rpx;
		height: 201rpx;
		border-radius: 8rpx;
		margin: 10rpx 20rpx 10rpx 0;
		overflow: hidden;

		&-close {
			position: absolute;
			right: 0;
			top: 0;
			width: 60rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 1;
			
			&::before {
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				width: 40rpx;
				height: 40rpx;
				border-radius: 100%;
				background-color: #fff;
				z-index: -1;
			}
		}
	}

	.camera {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #575B6680;
		border: 1rpx dashed #969696;
	}

	.problem-title {
		margin: 20rpx 0;
	}

	.problem-item {
		display: flex;
		padding: 10rpx 0;
		color: #828386;
		font-size: 28rpx;
		align-items: center;

		&-rectifier {
			margin-left: 56rpx;
    	display: flex;
			align-items: center;
			color: #828386;


			&-selector {
				border: 2rpx solid #EECFCD;
				border-radius: 10rpx;
				background-color: #FDEEEE;
				padding: 6rpx 10rpx;
				color: #EA4E47;
				font-size: 24rpx;
			}
		}
	}

	.ptb20 {
		padding: 20rpx 0;
		box-sizing: border-box;
	}

	&-btn {
		background-color: #1176F6;
		color: #fff;
		font-size: 28rpx;
		margin-top: 40rpx;
		height: 80rpx;
	}

	&-record{
		font-size: 28rpx;
    padding: 24rpx 12rpx;
    border-radius: 10rpx;
    box-shadow: 0 0 10px #ccc;
    margin-top: 30rpx;

		.record-tag {
			padding: 5rpx 12rpx;
			border-radius: 5rpx;
			font-size: 24rpx;
		}

		&-head {
			padding: 24rpx 0;
			border-bottom: 2rpx solid #E5E5E5;
		}

		&-body {
			.record-tag {
				padding: 5rpx 12rpx;
				border-radius: 5rpx;
				font-size: 24rpx;
			}
		}

		&-image {
			display: flex;
			flex-wrap: wrap;

			&-item {
				width: 201rpx;
				height: 201rpx;
				border-radius: 8rpx;
				margin: 10rpx 20rpx 10rpx 0;
			}
		}
	}
}
</style>
