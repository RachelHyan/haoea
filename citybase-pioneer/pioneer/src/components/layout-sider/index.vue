<template>
  <div class="layout-sider">
    <el-menu
      :collapse="collapsed"
      :style="{ width: '200px', height: '100%' }"
      :default-active="activePath"
      router
    >
      <template
        v-for="menu in userInfo.$state.siderMenu"
        :key="menu.path"
      >
        <el-sub-menu
          v-if="menu.children"
          :index="menu.path"
        >
          <template #title>
            <component
              :is="menu.icon"
              class="layout-sider-icon"
            />
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item
            v-for="item in menu.children"
            :key="item.path"
            :index="item.path"
          >
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="menu.path"
        >
          <component
            :is="menu.icon"
            v-if="menu.icon"
            class="layout-sider-icon"
          />
          <span>{{ menu.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { authResourceGetRouters } from '@/api/auth/resourceController';
import { useUserInfo } from '@/stores/userInfo';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export interface MenuItem {
	id?: number,
	title: string,
	name?: string,
	path: string,
	icon?: string,
	matched?: string[]
	children?: MenuItem[]
}

export default defineComponent({
  name:'LayoutSider',
  components:{
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['update:collapsed'],
  setup(props,{emit,}) {
    const route = useRoute()
    const activePath = computed(() => route.path)
    const userInfo = useUserInfo()
  
    const handlerCollapsed = (value:boolean) => {
      emit('update:collapsed',value)
    }

    const getRouters = async() => {
      try {
        let params:{projectId?:number} = {}
        if (userInfo.$state.projectId) {
          params.projectId = userInfo.$state.projectId
        }
        const {data,} = await authResourceGetRouters(params)
        userInfo.$patch((state) => {
          state.siderMenu = data
        })
      } catch (error) {
      }
    }

    !userInfo.$state.siderMenu && getRouters()
		
    return {
      activePath,
      userInfo,
      handlerCollapsed,
    }
  },
})
</script>
<style lang="less">
.layout-sider {
	height: calc(100vh - 64px);
	
	& img{
		width: 16px;
	}

	&-icon{
		width: 20px;
		margin-right: 5px;
		color: #181B28;
	}

	.el-menu-item.is-active {
		.layout-sider-icon {
			color: #004EFD;
		}
	}

}
</style>
