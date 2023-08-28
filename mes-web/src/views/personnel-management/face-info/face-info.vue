<template>
  <div class="face-info page-root">
    <card-header title="人脸信息" />
    <el-pro-table
      ref="takeOffRef"
      row-key="userId"
      :columns="readColumns"
      :request="readRequest"
      hidden-label
    >
      <template #toolbar-right="{size}">
        <el-button
          type="primary"
          :size="size"
          @click="handleAdd"
        >
          新增
        </el-button>
      </template>
      <template #column-operation="{row}">
        <el-button
          type="primary"
          link
          @click.stop="handleEdit(row)"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          link
          @click.stop="handleDel(row)"
        >
          删除
        </el-button>
      </template>
      <template #column-urls="{ row }">
        <div
          v-if="row.urls"
          style="overflow: hidden;"
        >
          <el-image
            v-for="(img, index) in row.urls"
            :key="index"
            :src="img"
            style="width: 30px; height: 30px; margin-right: 10px; cursor: pointer;"
            :zoom-rate="1.2"
            :preview-src-list="row.urls"
            :initial-index="index"
            fit="cover"
            preview-teleported
          >
            <template #error>
              <span class="avatar-error">加载失败</span>
            </template>
          </el-image>
        </div>
      </template>
    </el-pro-table>
    <dialog-form
      ref="dialogFormRef"
      v-model="dialogFormVisible"
      :title="formMethods === 'add' ? '新增' : '编辑'"
      :form-methods="formMethods"
      :all-user-list="allUserList"
      @closed="takeOffRef.load()"
    />
  </div>
</template>

<script lang="ts">
import { mesPersonDeletePersonFromGroup } from "@/api/mes/personController";
import { mesUserQueryAllUserList } from "@/api/mes/userController";
import { mesWechatTencentPersonFaceQueryPersonFaceList } from "@/api/mes/wechatController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import { ElMessage, ElMessageBox, type ProTableColumn } from "element-plus";
import { defineComponent, ref } from "vue";
import DialogForm from "./components/dialog-form.vue";

export default defineComponent({
  name: "FaceInfo",
  components: {
    CardHeader,
    DialogForm,
  },
  setup () {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const groupId = project.$state.groupId as string;
    const takeOffRef = ref();
    const dialogFormRef = ref();
    const dialogFormVisible = ref<boolean>(false);
    const formMethods = ref<"add" | "update">("add");
    const allUserList = ref<MES.UserDTO[]>([]);

    const readColumns:ProTableColumn[] = [
      {
        title: "人脸照片",
        dataIndex: "urls",
        valueType: "slot",
      },
      {
        title: "照片数量",
        dataIndex: "imageNum",
        valueType: "string",
      },
      {
        title: "人员名称",
        dataIndex: "userName",
        valueType: "string",
        search: true,
        placeholder: "姓名",
      },
      {
        title: "性别",
        dataIndex: "gender",
        valueType: "string",
      },
      {
        title:"操作",
        dataIndex:"operation",
        valueType:"string",
      }
    ];

    const fetchAllUser = async () => {
      try {
        const {data,} = await mesUserQueryAllUserList({projectId,});
        
        allUserList.value = data
      } catch (error) {
				
      }
    }

    const readRequest = async(params:MES.WechatTencentPersonFaceQueryPersonFaceListParams) => {
      params.projectId = projectId;
      try {
        const res = await mesWechatTencentPersonFaceQueryPersonFaceList(params);
        return res
      } catch (error) {
				
      }
    }

    const handleAdd = () => {
      dialogFormVisible.value = true;
      formMethods.value = "add"
    }

    const handleEdit = (row:any) => {
      dialogFormRef.value.fetchInfo(row.userId)
      dialogFormVisible.value = true;
      formMethods.value = "update"
    }

    const handleDel = async(row:{personId:string}) => {
      ElMessageBox.confirm("确定要删除这条数据吗?","提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            try {
              await mesPersonDeletePersonFromGroup({groupId,personId: row.personId,});
              done();
              instance.confirmButtonLoading = false;
              ElMessage.success("删除成功");
              takeOffRef.value.load();
            } catch (error) {
              done();
            }
          } else {
            done();
          }
        },
      }).catch(() => {
        // 为了不让控制台报 Uncaught (in promise) cancel
      });
    }

    fetchAllUser();

    return {
      takeOffRef,
      dialogFormRef,
      dialogFormVisible,
      formMethods,
      readColumns,
      allUserList,
      readRequest,
      handleAdd,
      handleEdit,
      handleDel,
    }
  },
})
</script>

<style scoped>

</style>
