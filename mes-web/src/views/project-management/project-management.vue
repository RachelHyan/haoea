<template>
  <default-layout>
    <router-view v-if="['add-project','edit-project'].includes(currentRouteName)" />
    <div
      v-else
      class="project-management page-root"
    >
      <card-header title="项目管理" />
      <el-pro-crud
        :read-columns="readColumns"
        :read-request="mesProjectProjectPageList"
        row-key="projectId"
        :pro-table-props="{hiddenLabel:true}"
        :with-menu="[]"
      >
        <template
          #toolbar-right="{size}"
        >
          <el-button
            type="primary"
            :size="size"
            @click="$router.push({name:'add-project'})"
          >
            新增
          </el-button>
        </template>
        <template #write-column-optional="{row}">
          <el-space>
            <el-button
              type="primary"
              link
              @click="handlerEdit(row.projectId)"
            >
              编辑
            </el-button>
          </el-space>
        </template>
      </el-pro-crud>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { mesProjectProjectPageList } from "@/api/mes/projectController";
import { CardHeader } from "@/components";
import { DefaultLayout } from "@/layout";
import { ProTableColumn } from "element-plus";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProjectManagement",
  components:{
    CardHeader,
    DefaultLayout,
  },
  setup () {
    const router = useRouter()
    const currentRouteName = computed<string>(() => <string>router.currentRoute.value.name)
    const tableRef = ref();
		
    const readColumns:ProTableColumn[] = [
      {
        title:"项目编号",
        dataIndex:"projectCode",
        valueType:"string",
        search:true,
        placeholder: "项目编号",
      },
      {
        title:"项目名称",
        dataIndex:"projectName",
        valueType:"string",
        search:true,
        placeholder: "项目名称",
      },
      {
        title:"甲方名称",
        dataIndex:"firstParty",
        valueType:"string",
      },
      {
        title:"项目负责人",
        dataIndex:"projectManagerName",
        valueType:"string",
      },
      {
        title:"数据管理员",
        dataIndex:"projectClerkName",
        valueType:"string",
      }
    ]

    const handlerEdit = (projectId:number) => {
      router.push({name:"edit-project",query:{id:projectId,},})
    }

    return {
      currentRouteName,
      tableRef,
      readColumns,
      mesProjectProjectPageList,
      handlerEdit,
    }
  },
})
</script>

<style scoped>

</style>
