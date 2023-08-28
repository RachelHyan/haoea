<template>
  <el-sub-menu
    v-if="node.children"
    :index="node.path"
  >
    <template #title>
      <img
        v-if="node.icon"
        :src="menuIcon(node.path, node.icon)"
        alt=""
        class="layout-sider-icon"
      >
      <span>{{ node.title }}</span>
    </template>
    <menu-item
      v-for="children in node.children"
      :key="children.path"
      :node="children"
      :active-path="activePath"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="node.path"
    :data-title="node.title"
  >
    <img
      v-if="node.icon"
      :src="menuIcon(node.path, node.icon)"
      alt=""
      class="layout-sider-icon"
    >
    <template #title>
      <span>{{ node.title }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuItem",
  props: {
    node: {
      type: Object,
      required: true,
    },
    activePath: {
      type: String,
      required: true,
    },
  },
  setup (props) {    
    const menuIcon = (path: string,icon: string) => {
      const suffix = props.activePath === path ? "-active.png" : ".png"
      // const suffix = ".png"
      return `https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jieya-menu/${icon}${suffix}`
    }

    return {
      menuIcon,
    }
  },
})
</script>

<style scoped>

</style>
