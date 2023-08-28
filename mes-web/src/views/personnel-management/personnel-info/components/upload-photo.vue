<template>
  <el-upload
    ref="uploadPhotoRef"
    v-model:file-list="fileList"
    class="upload-photo"
    :limit="1"
    list-type="picture-card"
    :auto-upload="true"
    :on-exceed="handleExceed"
    :http-request="uploadRequest"
    :before-upload="beforeUpload"
  >
    <div class="file-name-text">
      {{ fileList[0].name }}
    </div>
    <el-button
      type="primary"
      :link="fileList[0].name !== '' && true"
    >
      {{ fileList[0].name === "" ? '选择' + fileType : ' 重新选择' }}
    </el-button>
    <template #file="{ file }">
      <div>
        <el-image
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          :preview-src-list="file.name ? [file.url] : []"
          fit="cover"
          :hide-on-click-modal="true"
          @error="imgError"
        />
      </div>
    </template>
  </el-upload>
</template>
<script lang='ts'>
import { upload } from "@/utils/http"
import type { UploadProps, UploadRawFile, UploadUserFile } from "element-plus"
import { ElMessage, genFileId } from "element-plus"
import type { Ref } from "vue"
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "UploadFile",
  props: {
    fileType: {
      type: String,
      required: true,
    },
    getPhotoUrl: {
      type: String,
      default: undefined,
    },
    url:{
      type: String,
      default: "",
    },
  },
  emits:["update:url"],
  setup(props,{emit,}) {
    const uploadPhotoRef = ref();
    const fileName = ref<string>("");
    const dialogImageUrl: Ref<string | undefined> = ref("");
    const uploadState = ref<boolean>(true);
    const dialogVisible = ref<boolean>(false);
    const fileList = ref<UploadUserFile[]>([
      {
        name: "",
        url: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/TX-default.png",
      }
    ]);

    const handleExceed: UploadProps["onExceed"] = (files) => {
      if (!/\.(png|jpg|gif|jpeg|webp|bmp|psd|svg|tiff)$/.test(files[0].name)) {
        ElMessage.error("你选择的照片格式错误，请重新选择");
        return false;
      }
      uploadPhotoRef.value?.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadPhotoRef.value?.handleStart(file);
      uploadPhotoRef.value?.submit();
    };

    const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
      if (!/\.(png|jpg|gif|jpeg|webp|bmp|psd|svg|tiff)$/.test(rawFile.name)) {
        ElMessage.error("你选择的照片格式错误，请重新选择");
        return false;
      }
      return true;
    };

    const uploadRequest = async () => {
      const url = await uploadAttachment();
      if(url) {
        emit("update:url",url);
      }
    };

    const uploadAttachment = async () => {
      if(fileList.value.at(0)?.raw) {
        try {
          const res = await upload(<File>fileList.value.at(0)?.raw);
          return res.data;
        } catch(error) {
          console.error(error);
        }
      }
    };


    const uploadSubmit = () => {
      uploadPhotoRef.value.submit();
      return uploadState.value;
    };

    const getPhoto = (fileUrl: string) => {
      fileList.value[0].name = fileUrl !== null ? <string>fileUrl.split("/").pop() : "";
      fileList.value[0].url = fileUrl !== null ? fileUrl : "";	
    };

    const imgError = () => {
      fileList.value = [{
        name: "",
        url: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/TX-default.png",
      }];
    };


    return {
      uploadPhotoRef,
      fileName,
      fileList,
      dialogVisible,
      dialogImageUrl,
      uploadRequest,
      handleExceed,
      uploadSubmit,
      beforeUpload,
      getPhoto,
      imgError,
    }
  },
})
</script>
<style lang='less'>
.upload-photo {
	.file-name-text {
		cursor: auto;
	}

	.photo-visible-dialog {
		max-height: 550px;
		display: flex;
		justify-content: center;
	}

	.el-upload--picture-card {
		border: none !important;
		width: auto !important;
		height: 32px !important;
		margin: 5px auto;
		flex-wrap: wrap;
		background-color: transparent;

		&:hover {
			color: #606266;
		}
	}

	.el-upload-list--picture-card {
		width: 100%;
		display: flex !important;
		flex-wrap: wrap !important;
		justify-content: center;
		flex-direction: column;
		margin: 0 auto !important;

	}

	.el-upload-list__item {
		margin: 5px auto !important;
		width: 50px !important;
		height: 50px !important;
		border: none !important;
	}

	.el-upload__tip {
		text-align: center;
	}

}

// .photo-visible-dialog {
// 	background: transparent !important;
// 	padding: 30px 0;

// 	.el-dialog__header {
// 		border: 0 !important;
// 	}

// 	img {
// 		width: 50%;
// 		height: 60%;
// 	}
// }
</style>
