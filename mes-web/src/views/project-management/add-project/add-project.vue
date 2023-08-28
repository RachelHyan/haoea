<template>
  <div class="project-management-add page-root">
    <map-edit
      ref="mapEdit"
      v-model:area="addProjectModel.area"
      v-model:point="addProjectModel.electronicFenceList"
      v-model:polygon="gridPolygon"
      class="map-edit"
      :shape-style="shapeStyle"
    />
    <el-card
      class="box-card"
      :style="{maxHeight:panelHeight + 'px'}"
    >
      <template #header>
        <span class="card-header-title">新增项目</span>
      </template>
      <el-form
        ref="addProjectRef"
        class="add-project-dialog__form"
        :model="addProjectModel"
        :rules="rules"
        scroll-to-error
        label-position="right"
        label-width="100px"
      >
        <el-form-item
          label="项目名称"
          prop="projectName"
        >
          <el-input
            v-model="addProjectModel.projectName"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="甲方名称"
          prop="firstParty"
        >
          <el-input
            v-model="addProjectModel.firstParty"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="项目金额"
          prop="contractAmount"
        >
          <el-input
            v-model="addProjectModel.contractAmount"
            placeholder="请输入"
          >
            <template #append>
              元
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="项目负责人"
          prop="projectManagerList"
        >
          <el-select
            v-model="addProjectModel.projectManagerList"
            multiple
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in userList.projectManagerList"
              :key="item.sysUserId"
              :label="item.sysUserName"
              :value="item.sysUserId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="数据管理员"
          prop="projectClerkList"
        >
          <el-select
            v-model="addProjectModel.projectClerkList"
            multiple
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in userList.projectClerkList"
              :key="item.sysUserId"
              :label="item.sysUserName"
              :value="item.sysUserId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="地图标绘员"
          prop="projectMapMakerList"
        >
          <el-select
            v-model="addProjectModel.projectMapMakerList"
            multiple
            placeholder="请选择"
            filterable
            clearable
          >
            <el-option
              v-for="item in userList.projectMapMakerList"
              :key="item.sysUserId"
              :label="item.sysUserName"
              :value="item.sysUserId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="面积"
          prop="area"
        >
          <el-input
            v-model="addProjectModel.area"
            readonly
            placeholder="面积在绘制完成后自动生成"
          />
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        border
        height="200px"
        style="width: 100%; margin: 25px 0;"
      >
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="mobile"
          label="联系方式"
        />
      </el-table>
      <el-row>
        <el-col
          :offset="14"
        >
          <el-button
            type="primary"
            class="form-submit"
            :loading="saveLoading"
            @click="handlerSave"
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
            @click="submit"
          >保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { mesProjectAddProject, mesProjectQuerySysUserRoleList } from "@/api/mes/projectController";
import { MapEdit } from "@/components";
import { useDict } from "@/stores/dict";
import "@amap/amap-jsapi-types";
import { WarningFilled } from "@element-plus/icons-vue";
import { ElMessage, FormRules } from "element-plus";
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProjectManagementAdd",
  components: {
    WarningFilled,
    MapEdit,
  },
  setup () {
    const dict = useDict();
    const router = useRouter();
    const panelHeight = ref(window.innerHeight - 230);
    const saveLoading = ref<boolean>(false);
    const saveDialogVisible = ref<boolean>(false);
    const mapEdit = ref<any>();
    const gridPolygon = ref();
    const gridPoint = ref();
    const shapeStyle = reactive({strokeColor: "#7B70AA",strokeOpacity: 1,strokeWeight: 8,fillColor: "#7B70AA",fillOpacity: 0.1, });
    const addProjectRef = ref();
    const projectCode = ref<string>("");
    const userList = reactive<any>({
      projectManagerList: [],
      projectClerkList: [],
      projectMapMakerList: [],
    });
    const addProjectModel = reactive<MES.ProjectInParam | any>({
      projectName: "",
      firstParty: "",
      contractAmount: "",
      projectManagerList: [],
      projectClerkList: [],
      projectMapMakerList: [],
      electronicFenceList: [],
      longitude: "",
      latitude: "",
      area: "",
    });
    const rules:FormRules = {
      projectName: [
        { required: true, message: "请输入项目名称", trigger: "blur", }
      ],
      area: [
        { required: true, message: "请绘制项目范围", trigger: "change",}
      ],
    };

    const fetchRoleList = async () => {
      try {
        const {data,} = await mesProjectQuerySysUserRoleList();
        Object.assign(userList, data);
      } catch (error) {
        console.error(error);	
      }
    };

    const handlerSave = () => {
      addProjectRef.value.validate((valid: boolean) => {
        if (!valid) return;
        saveDialogVisible.value = true;
      });
    };

    // 提交
    const submit = async() => {
      saveLoading.value = true;
      const { projectManagerList, projectClerkList,projectMapMakerList, } = addProjectModel;
      const params = {
        contractAmount:addProjectModel.contractAmount,
        firstParty:addProjectModel.firstParty,
        projectName:addProjectModel.projectName,
        projectClerkList: (userList?.projectClerkList || [])
          .filter((item: any) => projectClerkList?.includes(item.sysUserId))
          .map((item: any) => ({ sysUserId: item.sysUserId, userRoleId: item.userRoleId, })),
        projectManagerList: (userList?.projectManagerList || [])
          .filter((item: any) => projectManagerList?.includes(item.sysUserId))
          .map((item: any) => ({ sysUserId: item.sysUserId, userRoleId: item.userRoleId, })),
        projectMapMakerList: (userList?.projectMapMakerList || [])
          .filter((item: any) => projectMapMakerList?.includes(item.sysUserId))
          .map((item: any) => ({ sysUserId: item.sysUserId, userRoleId: item.userRoleId, })),
        electronicFenceList: addProjectModel.electronicFenceList,
        longitude: gridPolygon.value?.getBounds().getCenter().lng,
        latitude: gridPolygon.value?.getBounds().getCenter().lat,
        projectType:"jaya",
        area: addProjectModel.area,
      };
      try {
        await mesProjectAddProject(params);
        ElMessage.success("添加成功");
        saveLoading.value = false;
        mapEdit.value.reset();
        saveDialogVisible.value = false;
        router.push({name:"project-management",});
      } catch (error) {
        console.error(error);
      }
    };

    const tableData = computed(() => {
      const { projectManagerList, projectClerkList, projectMapMakerList, } = addProjectModel;
      const data = new Set([
      	...projectManagerList,
        ...projectClerkList,
        ...projectMapMakerList
      ]);
      const filteredData = new Set([...data].filter(value => value !== undefined));

      return userList.projectManagerList?.concat(userList.projectClerkList, userList.projectMapMakerList)
        .filter((item:any, index:number,array:[]) => {
          if (!item || !item.sysUserId) return false;
          return filteredData.has(item.sysUserId) && array.findIndex(({sysUserId,}) => sysUserId === item.sysUserId) === index;
        })
        .map((item: any) => {
          return {
            name: item.sysUserName,
            mobile: item.mobile,
          }
        });
    });

    window.addEventListener("resize", () => {
      panelHeight.value = window.innerHeight - 230;
    });

    fetchRoleList();
		
    return {
      dict,
      panelHeight,
      addProjectRef,
      rules,
      saveLoading,
      saveDialogVisible,
      mapEdit,
      shapeStyle,
      gridPolygon,
      gridPoint,
      projectCode,
      userList,
      tableData,
      addProjectModel,
      handlerSave,
      submit,
    }
  },
})
</script>

<style lang="less">
.project-management-add {
	position: relative;
	// height: calc(100vh - 160px);

	// .map-edit {
	// 	height: 100vh;
	// }
	
	.box-card {
		overflow-y:auto;
	&::-webkit-scrollbar {
		display: none;
	}
		position: absolute;
		z-index: 2;
		top: 16px;
		left: 16px;
		width: 326px;
		box-shadow: 0px 1px 4px 2px rgba(0,0,0,0.11);
		.el-card__body {
			padding: 16px;
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
