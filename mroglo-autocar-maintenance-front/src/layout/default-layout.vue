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
        :style="{paddingLeft: collapsed?'44px':'200px'}"
      >
        <layout-breadcrumb
          v-if="showBreadcrumb"
          :breadcrumb="breadcrumb"
        />
        <div
          v-if="showBreadcrumb"
          class="layout-content-inside"
        >
          <router-view />
        </div>
        <router-view v-else />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { LayoutBreadcrumb, LayoutHeader, LayoutSider } from "@/components"
import type { Ref } from "vue"
import { defineComponent, ref, watch } from "vue"
import type { RouteLocationMatched } from "vue-router"
import { useRoute } from "vue-router"
export default defineComponent({
  components: {
    LayoutHeader,
    LayoutSider,
    LayoutBreadcrumb,
  },
  setup () {
    const collapsed:Ref<boolean> = ref<boolean>(false)
    const route = useRoute()
    const showBreadcrumb:Ref<boolean> = ref(route.meta.showBreadcrumb)
    const breadcrumb:Ref = ref<[]>([])

    const filterAndFormatMatched = (matched:RouteLocationMatched[]) => {
      return matched.filter((r) => !r.meta.isRoot).map((r) => {
        return {
          title: r.meta.title,
          path: r.path,
        }
      })
    }

    breadcrumb.value = filterAndFormatMatched(route.matched)

    watch(() => route.meta.showBreadcrumb,
      (value) => {
        showBreadcrumb.value = value
      }
    )

    watch(() => route.matched,
      (matched) => {
        breadcrumb.value = filterAndFormatMatched(matched)
      }
    )

    return {
      collapsed,
      showBreadcrumb,
      breadcrumb,
    }
  },
})
</script>
<style lang="less">
.default-layout {
	color: #fff;
}
.default-layout-header {
	width: 100vw;
	height: 64px;
	background-color: #070707;
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
	padding: 24px;
	background-color: #F4F4F4;

	.page-root {
		min-height: calc(100vh - 162px);
		background-color: #fff;
	}
}

</style>
