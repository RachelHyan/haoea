<template>
  <div class="layout-header">
    <h1 class="layout-header-title">
      Map Tools
    </h1>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ routerMenus[currentIndex].label }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item,index) in routerMenus"
            :key="index"
            :command="item.name"
            :disabled="currentIndex === index"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    ArrowDown,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const routerMenus = [
      {
        label: "算法工具",
        name: "algorithm-tool",
      },
      {
        label: "视图工具",
        name: "board-tool",
      },
      {
        label: "转换工具",
        name: "coordtransform-tool",
      },
      {
        label: "撤销/重做",
        name: "undo-redo",
      }
    ]
    const currentIndex = ref<number>(routerMenus.findIndex((item) => item.name === route.name))

    watch(() => route.name,(val) => {
      currentIndex.value = routerMenus.findIndex((item) => item.name === val)
    })

    const handleCommand = (command: string) => {
      router.push({name:command,})
    }

    return {
      currentIndex,
      routerMenus,
      handleCommand,
    }
  },
})
</script>
<style lang="less">
.layout-header {
	height: 58px;
	padding: 0 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&-title {
		font-size: 24px;
		line-height: 32px;
	}
}
</style>
