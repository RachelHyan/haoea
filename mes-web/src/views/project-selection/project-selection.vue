<template>
  <div class="project-selection">
    <header class="project-selection-header">
      <el-icon
        :size="50"
        @click="handleBack"
      >
        <ArrowLeft />
      </el-icon>
    </header>
    <div class="project-selection-body">
      <div class="project-selection-body__search">
        <p class="project-selection-body__search-title">
          请选择
        </p>
        <el-input
          v-model="inputValue"
          class="project-selection-body__search-input"
          placeholder="请输入项目/角色"
          :prefix-icon="Search"
          @input="handleInputChange"
        />
      </div>
      <div class="project-selection-body__select">
        <el-button
          type="primary"
          circle
          style="width: 46px;height:46px;font-size: 28px;"
          :icon="ArrowLeft"
          :disabled="scrollToLeft"
          @click="handelScroll('prev')"
        />
        <ul
          ref="projectScroll"
          class="project-selection-wrap"
          :style="{justifyContent: projectScroll?.scrollWidth === projectScroll?.clientWidth ? 'center' : 'start'}"
        >
          <li
            v-for="item in filteredList"
            :key="item.projectId"
            class="project-selection-item"
            :class="{'project-selection-item--active': item.projectId === currentProject}"
            @click="handleSelection(item)"
          >
            <img
              class="project-selection-item-icon"
              :src="item.projectId === currentProject ? 'https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench/project-icon-active.png' : 'https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench/project-icon.png'"
              alt=""
              width="92"
              height="92"
            >
            <h5 class="project-selection-item-role">
              {{ item.roleName }}
            </h5>
            <div class="project-selection-item-name">
              {{ item.projectName }}
            </div>
          </li>
        </ul>
        <el-button
          type="primary"
          circle
          style="width: 46px;height:46px;font-size: 28px;margin-left: 0;"
          :icon="ArrowRight"
          :disabled="scrollToRight"
          @click="handelScroll('next')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { authResourceGetResourceJson } from "@/api/auth/resourceController";
import { useProject } from "@/stores/project";
import { useUserInfo } from "@/stores/userInfo";
import { ArrowLeft, ArrowRight, Search } from "@element-plus/icons-vue";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ProjectSelection",
  setup () {
    const route = useRoute();
    const router = useRouter();
    const userInfo = useUserInfo();
    const projectStore = useProject()
    const fromName = route.query.from as string;
    const projectScroll = ref<HTMLElement>();
    const scrollToRight = ref<boolean>(false);
    const scrollToLeft = ref<boolean>(false);
    const currentProject = ref();
    const projectList = ref<any[]>([]);
    const inputValue = ref<string>("");
    const filteredList = ref<any[]>([]);

    onMounted(() => {
      remoteProject()
      if (projectStore.$state.projectId) {
        currentProject.value = projectStore.$state.projectId
      }
    })


    const projectIcon = computed((projectId:number) => {
      return currentProject.value === projectId ? "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench/project-icon.png" : "https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench/project-icon-active.png"
    })

    const handleBack = () => {
      if (fromName === undefined || fromName === "login") {
        userInfo.$reset()
        router.replace("/login")
      } else {
        router.replace({name: fromName,})
      }
    } 

    const handelScroll = (type:string) => {
      if (projectScroll.value) {
        if (type === "prev") {
          projectScroll.value?.scrollTo({
            left: projectScroll.value.scrollLeft - 258,
            behavior: "smooth",
          })					
        } else {
          projectScroll.value?.scrollTo({
            left: projectScroll.value.scrollLeft + 258,
            behavior: "smooth",
          })
        }
        scrollToRight.value = (projectScroll.value?.scrollWidth - projectScroll.value?.scrollLeft) === projectScroll.value?.clientWidth
        scrollToLeft.value = projectScroll.value?.scrollLeft === 0
      }
    }

    const remoteProject = async() => {
      try {
        let { data, } = await authResourceGetResourceJson()
        projectList.value = data
        filteredList.value = data
        if (projectScroll.value) {
          scrollToRight.value = (projectScroll.value?.scrollWidth - projectScroll.value?.scrollLeft) === projectScroll.value?.clientWidth
          scrollToLeft.value = projectScroll.value?.scrollLeft === 0
        }
      } catch (error) {
        
      }
    }

    const handleInputChange = () => {
      filteredList.value = projectList.value.filter((item) => {
        const projectNameMatch = item.projectName.includes(inputValue.value);
        const roleNameMatch = item.roleName.includes(inputValue.value);
        return projectNameMatch || roleNameMatch;
      })
    }

    const handleSelection = (project:AUTH.ResourceDTO) => {
      currentProject.value = project.projectId;
      projectStore.dataFill(project)
      router.replace("/workbench")
    }
    remoteProject()

    return {
      ArrowLeft,
      ArrowRight,
      Search,
      projectIcon,
      projectScroll,
      currentProject,
      scrollToRight,
      projectList,
      inputValue,
      scrollToLeft,
      filteredList,
      handleBack,
      handelScroll,
      handleSelection,
      handleInputChange,
    }
  },
})
</script>

<style lang="less">
.project-selection {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	position: relative;
	background-image: url('https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/project/project-bg.png');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;

	&-header {
		position: absolute;
		top: 100px;
		height: 44px;
		padding: 0 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.el-icon {
			cursor: pointer;
		}
	}

	&-body {
    flex: 1;
    padding: 0 80px;
    display: flex;
		flex-direction: column;
    align-items: center;
    justify-content: center;

		&__search {
			font-size: 23px;
			color: #000000;
			text-align: center;

			.el-input__wrapper {
				width: 520px;
				height: 56px;
				background: #FFFFFF;
				border-radius: 15px;
				border: 1px solid rgba(151,151,151,0.45);
				margin: 25px 0 80px;
			}

			.el-input__inner {
				font-size: 20px;
			}

			.el-icon {
				font-size: 20px;
			}
		}

		&__select {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
  }

	&-wrap {
    flex: 1;
		height: 400px;
    margin: 0 18px;
    display: flex;
    column-gap: 18px;
    flex-wrap: nowrap;
    justify-content: center;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-item {
    min-width: 256px;
		width: 256px;
		height: 362px;
    padding: 0 20px;
		box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 15px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(138deg, #FCFDFF 0%, #D5E7FF 100%),
    linear-gradient(136deg, rgba(255, 255, 255, 1), rgba(37, 147, 255, 1));
		box-shadow: 0px 0px 8px 0px rgba(2,44,84,0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

		&-icon {
			margin-top: 89px;
		}

    &-role {
			font-size: 26px;
			font-weight: 500;
			color: #242424;
			padding-top: 25px;
			margin-bottom: 77px;
      text-align: center;
    }

    &-name {
      font-size: 16px;
      text-align: right;
      color: #2D2D2D;
    }

    &-role,&-name {
			width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    &.project-selection-item--active {
			background-image: linear-gradient(138deg, #BEEBFF 0%, #6DA1FF 100%),
			linear-gradient(136deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
			box-shadow: 0px 0px 8px 0px rgba(2,44,84,0.2);
    }
  }
}
</style>
