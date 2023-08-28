<template>
  <div class="department-management page-root">
    <card-header title="部门管理" />
    <el-pro-table
      ref="proTableRef"
      row-key="id"
      :columns="readColumns"
      :request="readRequest"
      :table-props="{'default-expand-all': isExpandAll}"
      :hidden-label="true"
    >
      <template #toolbar-left="{size}">
        <el-button
          type="primary"
          :size="size"
          @click="handlerExpandAll"
        >
          展开/折叠
        </el-button>
      </template>
      <template #toolbar-right="{size}">
        <el-button
          type="primary"
          :size="size"
          @click="handlerItemCreate()"
        >
          新增
        </el-button>
      </template>
      <template #column-status="{row}">
        <el-tag :type="row.status === 0 ? 'success' : 'danger'">
          {{ row.status === 0 ? '正常' : '停用' }}
        </el-tag>
      </template>
      <template #column-optional="{row}">
        <el-button
          type="primary"
          link
          @click="handlerItemCreate(row)"
        >
          新增
        </el-button>
        <el-button
          type="primary"
          link
          @click="handlerItemUpdate(row)"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          link
          @click="handlerDelete(row)"
        >
          删除
        </el-button>
      </template>
    </el-pro-table>
    <el-pro-dialog-form
      ref="writeFormRef"
      v-model="dialogVisible"
      :form-model="writeModel"
      class="dialog"
      :title="dialogMethod === 'update' ? '编辑部门' : '新增部门'"
      :width="'50%'"
      :label-width="'110px'"
      :form-rules="writeRules"
      :submit="writeSubmit"
      @closed="writeClosed"
    >
      <template #form="{model}">
        <el-row :gutter="10">
          <template
            v-for="(item,index) in writeColumns"
            :key="index"
          >
            <el-col
              v-if="!(dialogMethod === 'update' && item.dataIndex === 'parentId')"
              :span="index === 0 && dialogMethod === 'create' ? 24 : 12"
            >
              <el-form-item
                :label="item.title"
                :prop="item.dataIndex"
              >
                <el-tree-select
                  v-if="dialogMethod === 'create' && item.dataIndex === 'parentId'"
                  v-model="model[item.dataIndex]"
                  :data="treeSelectData"
                  check-strictly
                  filterable
                  :render-after-expand="false"
                  placeholder="请选择上级部门"
                  node-key="id"
                  :props="{label: 'deptName', children: 'children' }"
                  @current-change="treeSelectChange"
                />
                <el-input
                  v-if="item.valueType === 'string'"
                  v-model="model[item.dataIndex]"
                  :placeholder="item.placeholder"
                  :maxlength="item.dataIndex === 'contactPhone' ? 11 : ''"
                />
                <el-input-number
                  v-if="item.valueType === 'number'"
                  v-model="model[item.dataIndex]"
                  :placeholder="item.placeholder"
                  controls-position="right"
                  :min="0"
                />
                <el-radio-group
                  v-if="item.dataIndex === 'status'"
                  v-model="model[item.dataIndex]"
                >
                  <el-radio
                    v-for="(state,key) in item.valueEnum"
                    :key="key"
                    :label="state.value"
                  >
                    {{ state.label }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </template>
    </el-pro-dialog-form>
  </div>
</template>

<script lang="ts">
import { mesSysDeptAddSysDept, mesSysDeptDeleteSysDept, mesSysDeptSelectDeptList, mesSysDeptSelectDeptTree, mesSysDeptUpdateSysDept } from "@/api/mes/sysDeptController";
import { useProject } from "@/stores/project";
import { coverTreeData } from "@/utils/fn";
import { ElMessage, ElMessageBox, FormRules, ProCrudWriteColumn, ProTableColumn } from "element-plus";
import { defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "DepartmentManagement",
  setup () {
    const proTableRef = ref();
    const projectId = useProject().$state.projectId as number;
    const isExpandAll = ref<boolean>(true);
    const departmentList = ref<MES.SysDeptDTO[]>([]);
    const treeSelectData = ref<MES.SysDeptDTO[]>([]);
    const dialogVisible = ref<boolean>(false);
    const dialogMethod = ref<"create" | "update">("create");
    const writeFormRef = ref();
    const writeModel = reactive<MES.Pinyin__ & {[key:string]:any}>({status: 0,parentId: undefined,});
    const readColumns: ProTableColumn[] = [
      {
        title: "部门名称",
        dataIndex: "deptName",
        valueType: "string",
        search: true,
        placeholder: "部门名称",
      },
      {
        title: "排序",
        dataIndex: "sort",
        valueType: "string",
      },
      {
        title: "状态",
        dataIndex: "status",
        valueType: "enum",
        valueEnum: [{label: "正常", value: 0,},{label: "停用",value: 1,}],
        search: true,
        placeholder: "部门状态",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        valueType: "string",
      },
      {
        title: "操作",
        dataIndex: "optional",
        valueType: "slot",
      }
    ];
    const writeColumns: (ProCrudWriteColumn)[] = [
      {
        title: "上级部门",
        dataIndex: "parentId",
        valueType: "slot",
      },
      {
        title: "部门名称",
        dataIndex: "deptName",
        valueType: "string",
      },
      {
        title: "显示排序",
        dataIndex: "sort",
        valueType: "number",
      },
      {
        title: "负责人",
        dataIndex: "contactPerson",
        valueType: "string",
      },
      {
        title: "联系电话",
        dataIndex: "contactPhone",
        valueType: "string",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        valueType: "string",
      },
      {
        title: "部门状态",
        dataIndex: "status",
        valueType: "enum",
        valueEnum: [{label: "正常",value: 0,},{label: "停用", value: 1,}],
      }
    ];

    const writeRules:FormRules = {
      deptName: [
        {required: true,message: "部门名称不能为空哦！",trigger: "blur",}
      ],
      sort: [
        {required: true,message: "显示排序不能为空哦！",trigger: "blur",}
      ],
      contactPhone: [
        {pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,message: "请输入正确的手机号哦！",trigger: "blur",}
      ],
      email: [
        {pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message: "请输入正确的邮箱地址哦！",trigger: "blur",}
      ],
    };

    const getDeptTreeData = async () => {
      try {
        const {data,} = await mesSysDeptSelectDeptTree({projectId,});
        treeSelectData.value = data;
      } catch (error) {
        console.error(error);
				
      }
    };

    const readRequest = async (params: any) => {
      try {
        params.current = undefined;
        params.pageSize = undefined;
        params.projectId = projectId;
        const {data,} = await mesSysDeptSelectDeptList(params);
        departmentList.value = data.length ? coverTreeData(data) : data;
        return {data: departmentList.value,current: 1,pageSize: 10, total: 1,};
      } catch (error) {
        //console.log(error);
      }
    };

    const handlerDelete = async ({ id,}: {id: number}) => {
      ElMessageBox.confirm(
        "确定要删除这条数据吗?",
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          beforeClose: async (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              try {
                await mesSysDeptDeleteSysDept({ id, });
                done();
                instance.confirmButtonLoading = false;
                ElMessage.success("删除成功");
                proTableRef.value.load();
              } catch (error) {
                done();
              }
            } else {
              done();
            }
          },
        }
      ).catch(() => undefined);
    };

    const handlerItemCreate = async (row?: MES.SysDeptDTO) => {
      dialogVisible.value = true;
      dialogMethod.value = "create";
      await new Promise((resolve) => setTimeout(resolve, 10));
      if(row){
        writeModel.level = Number(row.level) + 1;
        writeModel.parentId = row.id;
      }
    };

    const handlerItemUpdate = async (row: MES.SysDeptDTO) => {
      dialogVisible.value = true;
      dialogMethod.value = "update";
      await new Promise((resolve) => setTimeout(resolve, 10));
      writeModel.id = row.id;
      writeModel.deptName = row.deptName;
      writeModel.sort = row.sort;
      writeModel.contactPerson = row.contactPerson;
      writeModel.contactPhone = row.contactPhone;
      writeModel.email = row.email;
      writeModel.status = row.status;
    };

    const handlerExpandAll = () => {
      isExpandAll.value = !isExpandAll.value;
      tableExpandAll(departmentList.value);
    };

    /** 表格全部展开/折叠（递归） */
    const tableExpandAll = (list: MES.SysDeptDTO[]) => {
      if(!(list && list.length)) return [];
      list.forEach(element => {
        proTableRef.value.tableRef.toggleRowExpansion(element,isExpandAll.value);
        tableExpandAll(<any[]>element.children);
      });
    };

    const treeSelectChange = (val: MES.SysDeptDTO) => {
      writeModel.level = Number(val.level) + 1;
    };

    const writeClosed = () => {
      writeModel.id = undefined;
      writeModel.level = undefined;
    };

    const writeSubmit = async () => {
      dialogMethod.value === "create" && (writeModel.level === undefined && (writeModel.level = 1),
      writeModel.parentId === undefined && (writeModel.parentId = -1));
      writeModel.projectId = projectId;
      try {
        const {success,} = await (dialogMethod.value === "create" ? mesSysDeptAddSysDept({...writeModel,}) : mesSysDeptUpdateSysDept({...writeModel,}));
        success && ElMessage.success(dialogMethod.value === "create" ? "添加成功" : "编辑成功");
        proTableRef.value.load();
        dialogVisible.value = false;
      } catch (error) {
        console.error(error);
      }
    };

    watch(dialogVisible, (val) => val && getDeptTreeData());

    return {
      proTableRef,
      isExpandAll,
      readColumns,
      writeColumns,
      writeRules,
      dialogVisible,
      dialogMethod,
      writeFormRef,
      writeModel,
      treeSelectData,
      handlerExpandAll,
      readRequest,
      handlerDelete,
      handlerItemCreate,
      handlerItemUpdate,
      treeSelectChange,
      writeSubmit,
      writeClosed,
      getDeptTreeData,
    }
  },
})
</script>

<style lang="less">
.department-management {
	.el-pagination {
		display: none;
	}
}
</style>
