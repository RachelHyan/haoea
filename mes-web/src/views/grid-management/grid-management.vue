<template>
  <default-layout>
    <router-view v-if="['grid-management-add','grid-management-edit'].includes(currentRouteName)" />
    <div
      v-else
      class="grid-management page-root"
    >
      <card-header title="网格管理" />
      <el-pro-crud
        row-key="gridId"
        :read-columns="readColumns"
        :read-request="mesGridGridPageList"
        :delete-request="handlerDelete"
        :ext-params="extParams"
        :with-menu="['delete']"
        :pro-table-props="{hiddenLabel:true}"
      >
        <template #toolbar-right="{size}">
          <el-button
            type="primary"
            :size="size"
            @click="$router.push({name:'grid-management-add'})"
          >
            新增
          </el-button>
        </template>
        <template #write-column-optional="{row}">
          <el-button
            type="primary"
            link
            @click="handlerEdit(row.gridId)"
          >
            编辑
          </el-button>
        </template>
      </el-pro-crud>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { mesGridDeleteGrid, mesGridGridPageList } from "@/api/mes/gridController";
import { mesTeamQueryTeamList } from "@/api/mes/teamController";
import { CardHeader } from "@/components";
import { DefaultLayout } from "@/layout";
import { useProject } from "@/stores/project";
import type { ProTableColumn } from "element-plus";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GridManagement",
  components: {
    CardHeader,
    DefaultLayout,
  },
  setup () {
    const router = useRouter();
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const currentRouteName = computed<string>(() => <string>router.currentRoute.value.name);

    const extParams = {
      projectId,
    };
		
    const readColumns:ProTableColumn[] = [
      {
        title:"网格名称",
        dataIndex:"gridName",
        valueType:"string",
        search:true,
        placeholder: "网格名称",
      },
      {
        title:"所属班组",
        dataIndex:"teamName",
        valueType:"string",
      },
      {
        title:"所属班组",
        dataIndex:"teamId",
        valueType:"enum",
        hidden:true,
        search:true,
        placeholder: "所属班组",
        valueEnum:[],
      },
      {
        title:"添加时间",
        dataIndex:"createTime",
        valueType:"string",
      }
    ];

    const remoteGridList = async () => {
      try {
        const { data, } = await mesTeamQueryTeamList({projectId,});
        readColumns[2].valueEnum = data.map(({teamId,teamName,}) => ({label: teamName,value: teamId,}));
      } catch (error) {
        console.error(error);
      }
    };

    const handlerEdit = (gridId:number) => {
      router.push({name:"grid-management-edit",query:{id:gridId,},});
    };

    const handlerDelete = async (params:any) => {
      return mesGridDeleteGrid({ gridIds:params.gridId,projectId,});
    };

    remoteGridList();

    return {
      extParams,
      readColumns,
      currentRouteName,
      mesGridGridPageList,
      handlerEdit,
      handlerDelete,
    }
  },
})
</script>
