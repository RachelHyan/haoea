<template>
  <div class="grid-management-add page-root">
    <map-edit
      ref="mapEdit"
      v-model:area="form.area"
      v-model:polygon="gridPolygon"
      v-model:point="gridPoint"
      :shape-style="shapeStyle"
    />
    <el-card class="box-card">
      <template #header>
        <span class="card-header-title">网格信息</span>
      </template>
      <el-form
        ref="formRef"
        label-position="top"
        label-width="100px"
        :model="form"
        style="max-width: 460px"
        class="form"
        :rules="rules"
      >
        <el-space
          size="large"
          direction="vertical"
        >
          <el-form-item
            label="网格名称"
            prop="gridName"
          >
            <el-input
              v-model="form.gridName"
              placeholder="请输入"
              maxlength="12"
            />
          </el-form-item>
          <el-form-item
            label="选择班组"
            prop="teamId"
          >
            <el-select
              v-model="form.teamId"
              placeholder="请选择"
            >
              <el-option
                v-for="item in teamList"
                :key="item.teamId"
                :label="item.teamName"
                :value="item.teamId"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="颜色"
            class="form-color"
          >
            <el-color-picker
              v-model="form.color"
              @active-change="changeColor"
            />
            <el-input
              v-model="form.color"
              readonly
              class="form-color-input"
            />
          </el-form-item>
          <el-form-item label="面积">
            <el-input
              v-model="form.area"
              readonly
              placeholder="面积在绘制完成后自动生成"
            />
          </el-form-item>
        </el-space>
      </el-form>
      <el-row>
        <el-col
          :offset="14"
        >
          <el-button
            type="primary"
            class="form-submit"
            :disabled="Object.keys(form).some(key => form[key] == '0' || !form[key])"
            :loading="saveLoading"
            @click="saveDialogVisible = true"
          >
            保存
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      v-model="saveDialogVisible"
      width="424px"
      align-center
    >
      <template #header>
        <span
          class="title"
        ><WarningFilled
          class="title-icon"
        />提示</span>
      </template>
      <span>是否保存所选内容</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="saveDialogVisible = false">关闭</el-button>
          <el-button
            type="primary"
            :loading="saveLoading"
            @click="formSubmit(formRef)"
          >保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { mesGridAddGrid } from "@/api/mes/gridController";
import { mesTeamQueryTeamList } from "@/api/mes/teamController";
import { MapEdit } from "@/components";
import { useProject } from "@/stores/project";
import "@amap/amap-jsapi-types";
import { CaretBottom, Search, WarningFilled } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { Ref, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GridManagementAdd",
  components: {
    WarningFilled,
    MapEdit,
  },
  setup () {
    const router = useRouter();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const formRef = ref<FormInstance>();
    const form = reactive<any>({gridName: "",teamId:null,color:"#000000",area:"",});
    const showTeamDialog = ref<boolean>(false);
    const showOrgDialog = ref<boolean>(false);
    const saveLoading = ref<boolean>(false);
    const saveDialogVisible = ref<boolean>(false);
    const mapEdit = ref<any>();
    const gridPolygon = ref();
    const gridPoint = ref();
    const shapeStyle = reactive({strokeColor: form.color,strokeOpacity: 1,strokeWeight: 2,fillColor: form.color,fillOpacity: 0.2, });
    const orgSelection = ref<any[]>([]);
    const userOptions:Ref<{value: number,label: string}[]> = ref<{value: number,label: string}[]>([]);
    const teamList = reactive<any[]>([]);
    const rules:FormRules = {
      gridName: [
        { required: true, message: "请输入网格名称", trigger: "blur", }
      ],
      teamId: [
        { required: true, message: "请选择班组", trigger: "change", }
      ],
    };

    const getTeamList = async () => {
      try {
        const { data, } = await mesTeamQueryTeamList({
          projectId,
        });
        teamList.push(...data);
      } catch (error) {
        console.error(error);
      }
    };
		
    const changeColor = (color:string) => {
      shapeStyle.strokeColor = color;
      shapeStyle.fillColor = color;
      form.color = color;
      if(gridPolygon.value){
        gridPolygon.value.setOptions(shapeStyle);
      }
    };

    const close = () => {
      form.orgNames = orgSelection.value.map(item => item.name).join(",");
      form.orgIds = orgSelection.value.map(item => item.id);
    };

    // 选择班组
    const teamSubmit = (e:any) => {
      if(!e){
        form.teamNames = "";
        return false;
      }
      form.teamNames = e.map((item:any)=>item.teamName).join(",");
      form.teamIds = e.map((item:any)=>item.teamId);
    };

    // 提交
    const formSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          saveLoading.value = true;
          try {
            await mesGridAddGrid({
              area: form.area,
              color: form.color,
              gridName: form.gridName,
              gridPointList:gridPoint.value,
              teamId: form.teamId,
              projectId,
            });
            ElMessage({
              message: "保存成功",
              type: "success",
            });
            mapEdit.value.reset();
            saveDialogVisible.value = false;
            router.push({name:"grid-management",});
          }catch(error) {
            console.error(error);
          }finally{
            saveLoading.value = false;
          }
        }
      });
    };

    getTeamList();

    return {
      form,
      formRef,
      rules,
      showTeamDialog,
      showOrgDialog,
      saveLoading,
      saveDialogVisible,
      teamList,
      changeColor,
      formSubmit,
      Search,
      CaretBottom,
      mapEdit,
      shapeStyle,
      gridPolygon,
      gridPoint,
      orgSelection,
      userOptions,
      teamSubmit,
      close,
    }
  },
})
</script>

<style lang="less">
.grid-management-add {
	position: relative;
	.box-card {
		position: absolute;
		z-index: 2;
		top: 16px;
		left: 16px;
		width: 326px;
		box-shadow: 0px 1px 4px 2px rgba(0,0,0,0.11);
		.el-card__body {
			padding: 16px;
		}
		.form {
			&-color {
				position: relative;
				.el-color-picker__trigger {
					position: absolute;
					z-index: 999;
					top: -15px;
					width: 30px;
					height: 30px;
					border-radius: 0;
					border: none;
				}
				&-input .el-input__wrapper {
						padding-left: 35px;
						width: 245px;
					}
			}
		}
		.el-input__wrapper {
			height: 28px;
			width: 266px;
		}
		.el-form--label-top .el-form-item {
			margin:0
		}
		.form-submit {
			width: 120px;
			height: 32px;
			margin-top: 5px;
		}
	}
	.title {
		display: flex;
		align-items:center;
		font-size: 16px;
		font-weight: 500;
		color: #181B28;
		&-icon {
			width: 20px;
			color:#E16A02;
			margin-right: 5px;
		}
	}
}
</style>
