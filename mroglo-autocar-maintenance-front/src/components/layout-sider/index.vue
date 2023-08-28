<template>
  <div class="layout-sider">
    <ul
      class="layout-sider-menu"
      :class="{'layout-sider-menu-collapsed':collapsed}"
    >
      <li
        v-for="item in siderMenu"
        :key="item.id"
        class="layout-sider-menu-item"
        :class="{'layout-sider-menu-item-active':item.matched.includes(currentRoute)}"
        @click="routerPush(item.path)"
      >
        <component :is="item.icon" />
        <p
          v-show="!collapsed"
          class="layout-sider-menu-item-title"
        >
          {{ item.title }}
        </p>
      </li>
      <li
        class="toggle-collapsed"
        @click="$emit('update:collapsed',!collapsed)"
      >
        <icon-right
          v-if="collapsed"
          :size="20"
        />
        <icon-left
          v-else
          :size="20"
        />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { getRoutersUsingGET } from "@/api/dengluyanzheng"
import { IconEmpty, IconHome, IconLeft, IconRight, IconUser } from "@arco-design/web-vue/es/icon"
import type { Ref } from "vue"
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"

export interface MenuItem {
	id: number,
	title: string,
	name?: string,
	path: string,
	icon: string,
	matched: string[]
}

export default defineComponent({
  name: "LayoutSider",
  components: {
    IconHome,
    IconEmpty,
    IconUser,
    IconRight,
    IconLeft,
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean,
    },
  },
  emits: ["update:collapsed"],
  setup () {
    const siderMenu:Ref<MenuItem[]> = ref<MenuItem[]>([])
    const router = useRouter()
    const currentRoute:Ref<string> = ref<string>(router.currentRoute.value.path)

    const routerPush = (path:string) => {
      router.push(path)
      currentRoute.value = path
    }

    const getUserMenu =async () => {
      try {
        let {data,} = await getRoutersUsingGET()
        siderMenu.value = data
				
      } catch (error) {
				
      }
    }

    getUserMenu()
    return {
      siderMenu,
      currentRoute,
      routerPush,
    }
  },
})
</script>
<style lang="less">
.layout-sider{
	height: 100%;
	box-sizing: border-box;
}
.layout-sider-menu {
	width: 200px;
	padding: 24px 0;
	overflow-y: auto;
}
.layout-sider-menu.layout-sider-menu-collapsed {
	width: 44px;

	.layout-sider-menu-item {
		padding: 0;
		gap: 0;
		justify-content: center;
	}

}
.layout-sider-menu-item {
	height: 44px;
	padding: 0 54px;
	background-color: transparent;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 12px;

	&:hover {
		background-color: #17191F;
	}

	.arco-icon {
		color: rgba(238, 238, 238, 0.6);
	}

	&-title {
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: normal;
		color: rgba(238, 238, 238, 0.6);
	}
}
.layout-sider-menu-item.layout-sider-menu-item-active {
	background-color: #1769FA;

	.layout-sider-menu-item-title {
		color: #fff;
	}

	.arco-icon {
		color: #fff;
	}
}

.toggle-collapsed {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background-color: #20232B;
	position: absolute;
	top: calc(50% - 16px);
	right: -16px;
	z-index: 9;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
</style>
