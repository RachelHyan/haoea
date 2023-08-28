<template>
  <div class="face-upload">
    <el-upload
      ref="uploadPhotoRef"
      v-model:file-list="fileList"
      class="upload"
      :limit="formMethods === 'add' ? 1 : 5"
      list-type="picture-card"
      :auto-upload="true"
      :on-exceed="handleExceed"
      :http-request="uploadRequest"
      :before-upload="beforeUpload"
    >
      <div
        ref="uploadRef"
        :style="{ display: uploadDisplayStyle}"
        class="upload-content"
      >
        <div class="file-name-text">
          点击上传
        </div>
        <div class="file-name-tip">
          请选择正脸、五官清晰无遮挡、光线均匀的图片。支持PNG、JPG、JPEG、BMP格式。若图片包含多张人脸，仅使用图片中被检测到的最大人脸。
        </div>
      </div>
      <template #file="{ file }">
        <div>
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url"
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="formMethods === 'add'"
              class="el-upload-list__item-delete"
              @click="handleRefresh"
            >
              <el-icon><Refresh /></el-icon>
            </span>
            <span
              v-if="formMethods === 'update'"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <el-dialog
      v-model="dialogVisible"
      close-on-click-modal
      class="photo-visible-dialog"
    >
      <img
        w-full
        :src="dialogImageUrl"
        alt="Preview Image"
      >
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { mesPersonAddPersonFace, mesPersonDeletePersonFace } from "@/api/mes/personController"
import { useProject } from "@/stores/project"
import { upload } from "@/utils/http"
import type { UploadFile, UploadProps, UploadRawFile, UploadUserFile } from "element-plus"
import { ElMessage, genFileId } from "element-plus"
import type { Ref } from "vue"
import { computed, defineComponent, ref } from "vue"

export default defineComponent({
  name: "UploadFile",
  props: {
    url:{
      type: String,
      default: "",
    },
    formMethods: {
      type: String,
      default: "add",
    },
  },
  emits:["update:url"],
  setup(props,{emit,}) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const personId = ref<string>("");
    const uploadPhotoRef = ref();
    const uploadRef = ref();
    const fileName = ref<string>("");
    const dialogImageUrl: Ref<string | undefined> = ref("");
    const dialogVisible = ref<boolean>(false);
    const fileList = ref<UploadUserFile[]>([]);

    const uploadDisplayStyle = computed(() => {
      return props.formMethods === "add" ? (fileList.value.length < 1 ? "block" : "none") : (fileList.value.length < 5 ? "block" : "none");
    })

    const uploadRule = (file:any) => {
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize || !/\.(png|jpg|jpeg|bmp)$/.test(file.name)) {
        ElMessage.error("请重新选择符合要求的照片");
        return false;
      }
    }

    const handleExceed: UploadProps["onExceed"] = (files) => {
      uploadRule(files[0]);
	
      uploadPhotoRef.value?.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadPhotoRef.value?.handleStart(file);
      uploadPhotoRef.value?.submit();
    };

    const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
      uploadRule(rawFile);
		
      return true;
    };

    const uploadRequest = async () => {
      const url = await uploadAttachment();
      if(url) {
        if (props.formMethods === "add") {
          emit("update:url",url);
        }else if(props.formMethods === "update") {
          const params = {
            projectId,
            personId: personId.value,
            urls: [url],
          }
          const {data,} = await mesPersonAddPersonFace(params);
          ElMessage.success("上传成功");
          // @ts-ignore
          fileList.value[fileList.value.length - 1].name = data.sucFaceIds[0];
        }
      }
    };

    const uploadAttachment = async () => {
      let raw = fileList.value.at(fileList.value.length - 1)?.raw;
      if(raw) {
        try {
          const res = await upload(<File>raw);
          return res.data;
        } catch(error) {
          console.error(error);
        }
      }
    };

    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url;
      dialogVisible.value = true;
    }

    const handleRemove = async (file: UploadFile) => {
      if (fileList.value.length === 1) {
        ElMessage.error("至少保留一张照片");
        return;
      }
      try {
        if (props.formMethods === "update") {
          const params = {
            personId: personId.value,
            faceIds: [file.name],
            projectId,
          }
          await mesPersonDeletePersonFace(params);
          ElMessage.success("删除成功");
        }
      } catch (error) {
				
      }
      fileList.value = fileList.value.filter((item) => item.uid !== file.uid);

    }

    const handleRefresh = () => {
      uploadRef.value.click();
    }

    const getPhotoUrl = (urls:MES.WechatFaceUrlVo[],id:string) => {
      urls.forEach((url) => {
        fileList.value.push({
          name: url.faceId as string,
          url:url.url,
        });
      });
      personId.value = id;
    }

    const clear = () => {
      fileList.value = []
    };

    return {
      uploadPhotoRef,
      uploadRef,
      fileName,
      fileList,
      dialogVisible,
      dialogImageUrl,
      uploadDisplayStyle,
      uploadRequest,
      handleExceed,
      beforeUpload,
      clear,
      getPhotoUrl,
      handlePictureCardPreview,
      handleRemove,
      handleRefresh,
    }
  },
})
</script>
<style lang='less'>
.face-upload {
	.upload {
	
	&-content {
		width: 200px;
		height: 200px;
		border: 1px dashed #d9d9d9;
		padding: 20px;
		box-sizing: border-box;
		cursor: pointer;

		.file-name-text {
			cursor: pointer;
			text-align: center;
			color: #3872e7;
			margin-bottom: 5px;
		}

		.file-name-tip {
			cursor: pointer;
			font-size: 12px;
			color: #909399;
			line-height: normal;
		}

	}

	.el-upload--picture-card {
		border: none !important;
		width: auto !important;
		height: 200px !important;
		margin-top: 5px;
		flex-wrap: wrap;
		background-color: transparent;

		&:hover {
			color: #606266;
		}
	}

	.el-upload-list__item {
		margin: 5px !important;
		width: 200px !important;
		height: 200px !important;
		display: flex;
		justify-content: center;
	}
}

.photo-visible-dialog {
	background-color: #fff !important;
	.el-dialog__header {
		border: 0 !important;
	}

	img {
		width: 100%;
		height: 100%;
	}
}
}
</style>
