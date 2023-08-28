<template>
  <div class="default-layout">
    <layout-header class="default-layout-header" />
    <div class="default-layout-body">
      <layout-sider
        v-model:collapsed="collapsed"
        class="default-layout-sider"
      />
      <div
        class="default-layout-content"
        :style="{paddingLeft: collapsed?'48px':'200px'}"
      >
        <layout-breadcrumb />
        <div
          class="layout-content-inside"
        >
          <slot v-if="slotsKeys.includes('default')" />
          <router-view v-else />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { LayoutBreadcrumb, LayoutHeader, LayoutSider } from '@/components/index';
import type { Ref } from 'vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutHeader,
    LayoutSider,
    LayoutBreadcrumb,
  },
  setup (props,{slots,}) {
    const collapsed:Ref<boolean> = ref<boolean>(false)
    const slotsKeys = Object.keys(slots)
		
    return {
      collapsed,
      slotsKeys,
    }
  },
})
</script>
<style lang="less">
.default-layout {
	color: #000;
}
.default-layout-header {
	width: 100vw;
	height: 64px;
	background-color: #fff;
	box-sizing: border-box;
	position: fixed;
	z-index: 10;
}
.default-layout-body {
	display: flex;
	box-sizing: border-box;
}
.default-layout-sider {
	padding-top: 64px;
	background-color: #0F1014;
	position: fixed;
	z-index: 9;
}
.default-layout-content {
	flex: 1;
	padding-top: 64px;
}
.layout-content-inside {
	width: calc(100vw - 247px);
	background-color: #F4F4F4;
	padding: 24px;

	.page-root {
		min-height: calc(100vh - 160px);
		background-color: #fff;
	}
}

</style>
