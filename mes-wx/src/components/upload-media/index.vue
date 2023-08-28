<template>
  <view class="upload-media">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="upload-media-item"
    >
      <image
        v-if="listType === 'image'"
        class="upload-media-item-thumbnail"
        :src="item.url"
        @click="handlePreview(index)"
        @error="() => (item.url = 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png')"
      />
      <video
        v-if="listType === 'video'"
        :src="item.url"
        :poster="item.poster"
        class="upload-media-item-thumbnail"
        object-fit="cover"
      />
      <view
        v-if="!(isDetail || hideCloseBtn)"
        class="upload-media-item-close"
        @click="handleDel(index)"
      >
        <uni-icons
          type="clear"
          color="#ff0000"
          size="30"
        />
      </view>
    </view>
    <view
      v-if="!isDetail && list.length < max"
      class="upload-media-item upload-card"
      @click="getCamera()"
    >
      <uni-icons
        style="margin-bottom: 10rpx;"
        type="plusempty"
        color="#575B66"
        size="20"
      />
      <text v-if="!face">
        {{ listType === 'image' ? "拍照上传" : "视频上传" }}
      </text>
      <text v-else>
        继续采集
      </text>
    </view>
  </view>
</template>
<script lang='ts'>
import type { PropType, Ref } from "vue";
import { computed, defineComponent } from "vue";
import type { FileType } from "../typings";

export default defineComponent({
  name: "UploadMedia",
  props: {
    /** 文件类型 image | video  默认 image */
    listType: {
      type: String as PropType<"image"|"video">,
      default: "image",
    },
    /** [v-model:fileList] 文件列表 type: {type: number,url: string}[] */
    fileList: {
      type: Array as PropType<FileType[]>,
      required: true,
      default: () => ([]),
    },
    /** 最大文件数 默认 1 */
    max: {
      type: Number,
      default: 1,
    },
    /** 是否详情界面，true 为隐藏删除按钮以及上传按钮 默认 false */
    isDetail: {
      type: Boolean,
      default: false,
    },
    /** 是否隐藏删除按钮 默认 false */
    hideCloseBtn: {
      type: Boolean,
      default: false,
    },
    /** 相机是否需要水印(地点，时间) */
    watermark: {
      type: Boolean,
      default: false,
    },
    /** 自定义上传方法 (list) => ({}) list 是文件列表，必接受的参数 */
    customUploadFn: {
      type: Function as PropType<(list: FileType[]) => any>,
      default: undefined,
    },
    /** 是否为人脸采集/识别 */
    face: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:fileList"],
  options: { styleIsolation: "shared", },
  setup(props,{emit,}){
    const list:Ref<FileType[]> = computed(()=> props.fileList)

    const handlePreview = (val: number) => {
      uni.previewImage({
        current: list.value[val].url,
        urls: <string[]>list.value.map(item => item.url),
      });
    }

    const handleDel = (val: number) => {
      list.value.splice(val, 1)
    }

    const getCamera = () => {
      if(props.customUploadFn){
        props.customUploadFn(list.value)
      } else if(props.listType === "image"){
        uni.navigateTo({
          url: "/pages/camera/index?watermark=" + props.watermark + "&face=" + props.face,
          events: {
            save: (res: any) => {
              if(props.watermark){
                list.value.push({
                  type: "1",
                  url: res.tempFilePath,
                  longitude: res.location.split(",")[0],
                  latitude: res.location.split(",")[1],
                  photographTime: res.timestamp,
                  fullAddress: res.fullAddress,
                });
              } else {
                list.value.push({
                  type: "1",
                  url: res.tempFilePath,
                })
              }
              
              uni.navigateBack()
              emit("update:fileList", list.value)
            },
          },
        })
      }else if(props.listType === "video"){
        uni.chooseMedia({
          count: 9,
          mediaType: ["video"],
          sourceType: ["camera"],
          maxDuration: 30,
          camera: "back",
          success: (res) => {
            if (res.type === "video") {
              list.value.push({
                type: "2",
                url: res.tempFiles[0].tempFilePath,
                poster: res.tempFiles[0].thumbTempFilePath,
              })
              emit("update:fileList",list.value)
            }
          },
        });
      }
    }
		
    return {
      list,
      getCamera,
      handlePreview,
      handleDel,
    }
  },
})
</script>
<style lang='scss'>
.upload-media {
	flex: 1;
	display: flex;
	flex-wrap: wrap;
	
	&-item {
		position: relative;
		width: 201rpx;
		height: 201rpx;
		border-radius: 8rpx;
		margin: 10rpx 12rpx 10rpx 12rpx;
		overflow: hidden;

		&-thumbnail {
			width: 100%;
			height: 100%;
		}

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

	.upload-card {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #575B6680;
		border: 1rpx dashed #969696;
	}
}
</style>
