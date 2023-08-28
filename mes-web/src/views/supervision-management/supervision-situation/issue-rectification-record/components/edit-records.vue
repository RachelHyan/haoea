<template>
  <el-pro-dialog
    class="edit-records"
    :model-value="modelValue"
    title="修改问题整改记录"
    @update:model-value="(val:boolean) => {$emit('update:modelValue',val)}"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="writeRules"
      :label-width="90"	
    >
      <el-row :gutter="20">
        <el-col
          v-for="item in writeColumns"
          :key="item.dataIndex"
          :span="item.dataIndex === 'rectifierAfterPictureList' ? 24 : 12"
        >
          <el-form-item
            :label="item.title"
            :prop="item.dataIndex"
          >
            <el-input
              v-if="item.valueType === 'string'"
              v-model="formModel[item.dataIndex]"
              placeholder="请输入"
              clearable
              :disabled="item.disabled === 'all'"
            />
            <el-date-picker
              v-else-if="item.dataIndex === 'inspectionTime' || item.dataIndex === 'rectifierTime'"
              v-model="formModel[item.dataIndex]"
              type="datetime"
              placeholder="请选择"
              :disabled="item.dataIndex === 'inspectionTime'"
            />
            <el-select
              v-else-if="item.valueType === 'enum'"
              v-model="formModel[item.dataIndex]"
              :clearable="true"
              :filterable="true"
              style="width: 100%;"
              placeholder="请选择"
            >
              <el-option
                v-for="option in item.valueEnum"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <el-input
              v-else-if="item.dataIndex === 'problemDesc' || item.dataIndex === 'remarks'"
              v-model="formModel[item.dataIndex]"
              :rows="2"
              type="textarea"
              placeholder="请输入"
              :disabled="item.dataIndex === 'problemDesc'"
            />
            <el-upload
              v-else-if="item.dataIndex === 'rectifierAfterPictureList'"
              ref="uploadPhotoRef"
              v-model:file-list="fileList"
              class="upload-photo"
              list-type="picture-card"
              :auto-upload="false"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :before-upload="beforeUpload"
            >
              <el-icon class="el-icon--upload">
                <Plus />
              </el-icon>
              <template #tip>
                <div class="el-upload__tip text-red">
                  请上传大小不超过 5MB 格式为 png/jpg/jpeg 的图片
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>	
    <template #footer>
      <div class="organization-dialog-footer">
        <el-button
          type="danger"
          plain
          @click="$emit('update:modelValue',false)"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="submitLoading"
          @click="updateRequest"
        >
          提交
        </el-button>
      </div>
    </template>
  </el-pro-dialog>
  <el-dialog
    v-model="dialogVisible"
    title="预览"
    width="35%"
    style="padding: 10;"
  >
    <div>
      <el-image
        style="max-width: 100%;margin: 0 auto;display: block;"
        :src="dialogImageUrl"
      />
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { mesProblemItemQueryRectifierUserList } from "@/api/mes/problemItemController"
import { mesRectifierQueryRectifierRecordInfo, mesRectifierUpdateRectifierRecord } from "@/api/mes/rectifierController"
import { useProject } from "@/stores/project"
import { upload } from "@/utils/http"
import dayjs from "dayjs"
import { ElMessage, FormRules, ProCrudWriteColumn, UploadProps, UploadRawFile, UploadUserFile, genFileId } from "element-plus"
import { defineComponent, reactive, ref } from "vue"

export default defineComponent({
  name: "EditRecords",
  props:{
    modelValue:{
      type:Boolean,
      default:false,
    },
    id:{
      type:Number,
      default:0,
    },
  },
  emits:["update:modelValue","closed"],
  setup (props,{emit,}) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const formRef = ref();
    const uploadPhotoRef = ref();
    const formModel = reactive<any>({});
    const fileList = ref<UploadUserFile[]>([]);
    const dialogImageUrl = ref("");
    const dialogVisible = ref<boolean>(false);
    const submitLoading = ref<boolean>(false);

    const writeColumns:ProCrudWriteColumn[] = [
      {
        title: "问题对象",
        dataIndex: "pointName",
        valueType: "string",
        disabled: "all",
      },
      {
        title: "发生时间",
        dataIndex: "inspectionTime",
        valueType: "slot",
      },
      {
        title: "整改员",
        dataIndex: "rectifierUserId",
        valueType: "enum",
        valueEnum:[],
      },
      {
        title: "整改时间",
        dataIndex: "rectifierTime",
        valueType: "slot",
      },
      {
        title: "问题描述",
        dataIndex: "problemDesc",
        valueType: "slot",
      },
      {
        title: "整改描述",
        dataIndex: "remarks",
        valueType: "slot",
      },
      {
        title: "整改拍照",
        dataIndex: "rectifierAfterPictureList",
        valueType: "slot",
      }
    ];

    const writeRules:FormRules = {
      rectifierUserId: [
        { required: true, message: "请选择整改员", trigger: "change", }
      ],
      rectifierTime: [
        { required: true, validator: (rule:any, value:any, callback:any) => {
          const rectifierTime = formModel.rectifierTime
          if (rectifierTime === "Invalid Date") {
            callback(new Error("请选择整改时间"))
          } else {
            callback()
          }
        }, trigger: "change",}
      ],
      remarks: [
        { required: true, message: "请输入整改描述", trigger: "blur", }
      ],
    };

    const fetchRectifierUser = async () => {
      try {
        const { data, } = await mesProblemItemQueryRectifierUserList({projectId,});
        writeColumns[2].valueEnum = data.map((item:any) => {
          return {
            label: item.userName,
            value: item.userId,
          };
        });
        fetchInfo();
      } catch (error) {
        console.error(error);
				
      }
    };

    const fetchInfo = async () => {
      try {
        const {data,} = await mesRectifierQueryRectifierRecordInfo({recordId:props.id,});
        Object.assign(formModel, data);
        if (data.rectifierAfterPictureList) {
          fileList.value = data.rectifierAfterPictureList.map((item:any) => {
            return {
              name: item.replace(/https:\/\/zx-1301451990.cos.ap-guangzhou.myqcloud.com/,""),
              url: item,
            };
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url as string;
      dialogVisible.value = true;
    };

    const handleExceed: UploadProps["onExceed"] = (files) => {
      if (!/\.(png|jpg|gif|jpeg|webp|bmp|psd|svg|tiff)$/.test(files[0].name)) {
        ElMessage.error("你选择的照片格式错误，请重新选择");
        return false;
      }
      uploadPhotoRef.value?.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      uploadPhotoRef.value?.handleStart(file);
    };

    const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
      if (!/\.(png|jpg|gif|jpeg|webp|bmp|psd|svg|tiff)$/.test(rawFile.name)) {
        ElMessage.error("你选择的照片格式错误，请重新选择");
        return false;
      }
      return true;
    };

    const uploadAttachment = async () => {
      const list = [];
      for (let i = 0; i < fileList.value.length; i++) {
        const file = fileList.value[i];
        const rawData = file?.raw;
        try {
          const res = await upload(<File>rawData);
          list.push(res.data);
        } catch(error) {
          console.error(error);
        }
      }
      return list;
    };

    const updateRequest = async () => {
      if (fileList.value.length) {
        const uploadResult =  await uploadAttachment();
        const fileNames = fileList.value.map((item) => item.url).filter((item) => item?.includes("https://zx-1301451990.cos.ap-guangzhou.myqcloud.com")).map((item) => item?.replace(/https:\/\/zx-1301451990.cos.ap-guangzhou.myqcloud.com/,""));
        fileNames.push(...uploadResult);
        formModel.rectifierAfterPictureList = fileNames;
      } else {
        formModel.rectifierAfterPictureList = [];
      }
      formModel.inspectionTime = dayjs(formModel.inspectionTime).format("YYYY-MM-DD HH:mm:ss");
      formModel.rectifierTime = dayjs(formModel.rectifierTime).format("YYYY-MM-DD HH:mm:ss");
      formRef.value?.validate(async (valid:any) => {
        if (valid) {
          submitLoading.value = true;
          try {
            await mesRectifierUpdateRectifierRecord(formModel);
            ElMessage.success("编辑成功");
            emit("closed");
            emit("update:modelValue",false);
          } catch (error) {
            console.error(error);
          } finally {
            submitLoading.value = false;
          }
        }
      });
    };

		
    fetchRectifierUser();
    
		
    return {
      formRef,
      formModel,
      writeColumns,
      fileList,
      dialogImageUrl,
      dialogVisible,
      submitLoading,
      writeRules,
      handlePictureCardPreview,
      handleExceed,
      beforeUpload,
      updateRequest,
    }
  },
})
</script>

<style scoped>

</style>
