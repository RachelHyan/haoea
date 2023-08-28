<template>
  <div class="root-view">
    <div>
      <img
        src="@/assets/images/loading.gif"
        alt=""
        width="215"	
      >
      <div>
        加载中，稍等片刻…
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { authResourceGetRouters } from "@/api/auth/resourceController";
import { mesProjectQueryJayaTenantProjectInfo } from "@/api/mes/projectController";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { currentMenu } from "@/utils/fn";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name:"RootView",
  setup() {
    const router = useRouter();
    const userInfo = useUserInfo();
    const project = useProject();
    const projectList = ref<MES.UserProjectSwitchDTO[]>([]);

    const remoteProject = async () => {
      try {
        let { data, } = await mesProjectQueryJayaTenantProjectInfo();
        projectList.value = data.projectList;
        userInfo.$state.logo = data.logo;
        userInfo.$state.tenantName = data.tenantName;
      } catch (error) {
        console.error(error);
      }
    };

    
    const remoteRouters = async () => {
      try {
        let params:{projectId?:number} = {}
        if (project.$state.projectId) {
          params.projectId = project.$state.projectId;
        }
        const {data,} = await authResourceGetRouters(params);
        project.$state.resources = currentMenu(data,project.$state.projectId as number);
        if (project.$state.resources?.length === 0) {
          router.replace({path: "/unauthorized",});
        }
        else {
          const path = project.$state.resources?.[0].children?.[0].path ?? project.$state.resources?.[0].path;
          router.replace({path: path as string,});
        }
      } catch (error) {
        console.error(error);
      }
    };
    

    const init = async () => {
      await remoteProject();
      await remoteRouters();
    }

    if (userInfo.$state.token) {
      init();
    } else {
      router.replace({path: "/login",});
    }
  },
});
</script>
<style lang="less">
.root-view {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #F6F8FA;

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 26px;

		img {
			margin-bottom: 46px	;
		}
	}

}

</style>
