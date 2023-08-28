<template>
  <el-pro-dialog-form
    ref="formRef"
    class="dialog-form"
    :model-value="modelValue"
    :title="title"
    :width="'50%'"
    :form-model="formModel"
    :form-rules="formRules"
    :submit="submit"
    :pro-dialog-props="{width:'50%'}"
    @closed="closed"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
  >
    <template #form="{model}">
      <el-alert
        class="picture-tip"
        :title="pictureTip"
        type="warning"
        show-icon
        :closable="false"
      />
      <el-form-item
        v-for="item in formColumns"
        :key="item.dataIndex"
        :label="item.title"
        :prop="item.dataIndex"
      >
        <upload-photo
          v-if="item.dataIndex === 'url'"
          ref="uploadRef"
          v-model:url="url"
          :form-methods="formMethods"
        />
        <el-select
          v-if="item.dataIndex === 'userId'"
          v-model="model[item.dataIndex]"
          clearable
          filterable
          placeholder="请选择"
          :disabled="formMethods === 'update'"
          @change="selectChange"
        >
          <el-option
            v-for="option in (allUserList as any)"
            :key="option.userId"
            :label="option.userName"
            :value="option.userId"
          />
        </el-select>
        <el-radio-group
          v-if="item.dataIndex === 'gender'"
          v-model="model[item.dataIndex]"
          disabled
        >
          <el-radio label="man">
            男
          </el-radio>
          <el-radio label="woman">
            女
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
  </el-pro-dialog-form>
</template>

<script lang="ts">
import { mesPersonAddPerson } from "@/api/mes/personController";
import { mesWechatTencentPersonFaceQueryPersonFaceInfo } from "@/api/mes/wechatController";
import { useProject } from "@/stores/project";
import { ElMessage, FormRules, ProTableColumn } from "element-plus";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import UploadPhoto from "./upload-photo.vue";

export default defineComponent({
  name: "DialogForm",
  components: {
    UploadPhoto,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "新增",
    },
    formMethods: {
      type: String,
      default: "add",
    },
    allUserList: {
      type: Array,
      default: () => [],
    },
  },
  emits: [ "update:modelValue", "closed" ],
  setup (props,{emit,}) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const personGroupId = project.$state.personGroupId as number;
    const formRef = ref();
    const uploadRef = ref();
    const formModel = reactive<MES.WechatUserFaceInfo | any>({});
    const url = ref<string | undefined>();

    const formColumns:ProTableColumn[] = [
      {
        title:"照片",
        dataIndex:"url",
        valueType:"slot",
      },
      {
        title:"人员名称",
        dataIndex:"userId",
        valueType:"slot",
      },
      {
        title:"性别",
        dataIndex:"gender",
        valueType:"slot",
      }
    ];

    const formRules:FormRules = {
      url: [
        { required: true, 
          validator: (rule, value, callback) => {
            if (props.formMethods === "add" && url.value === undefined) {
              callback(new Error("请上传照片"));
            } else {
              callback();
            }
          }, trigger: "change",}
      ],
      userId: [
        { required: true, message: "请选择人员", trigger: "change", }
      ],
    };

    const pictureTip = computed(() => {
      return props.formMethods === "add" ? "图片大小请勿超过5MB" : "编辑人员照片无需保存，直接生效，单个人员最多拥有5张人脸照片。图片大小请勿超过5MB";
    })

    const selectChange = (val:number) => {
      // @ts-ignore
      formModel.gender = props.allUserList.find((item:MES.UserDTO) => item.userId === val)?.gender
    }

    const fetchInfo = async(userId:number) => {
      try {
        const {data,} = await mesWechatTencentPersonFaceQueryPersonFaceInfo({userId,})
        Object.assign(formModel, data);
        uploadRef.value[0].getPhotoUrl(data.imageList,data.personId)
      } catch (error) {
				
      }
    }

    const submit = async () => {
      try {
        if (props.formMethods === "add") {
          const params = {
            projectId,			
            personGroupId,
            gender: formModel.gender === "man" ? 1 : 2,
            userId: formModel.userId,
            // @ts-ignore
            userName: props.allUserList.find((item:MES.UserDTO) => item.userId === formModel.userId)?.userName,
            url: url.value,
          }
          await mesPersonAddPerson(params);
          ElMessage.success("新增成功");
        }
      } catch (error) {
				
      } finally {
        emit("update:modelValue", false);
      }
    }

    const closed = () => {
      emit("closed");
      uploadRef.value[0].clear();
      url.value = undefined;
    }

    watch(() => url.value, () => formRef.value.formRef.validateField("url"))

    return {
      formRef,
      uploadRef,
      formModel,
      formRules,
      formColumns,
      url,
      pictureTip,
      selectChange,
      fetchInfo,
      submit,
      closed,
    }
  },
})
</script>

<style lang="less">
.dialog-form {

	.picture-tip {
		margin-bottom: 20px;
	}

	.upload {
		&-tip {
			font-size: 12px;
			color: #8c8c8c;
			line-height: normal;
			padding: 25px;

			&-text {
				font-size: 14px;
				color: #4123eb;
				text-align: center;
				margin-bottom: 5px;
			}
		}

		.el-upload--picture-card,.el-upload-list--picture-card .el-upload-list__item {
			width: 200px;
			height: 200px;
		}
	}
}
</style>
