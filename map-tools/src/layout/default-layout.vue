<template>
  <div class="default-layout">
    <layout-header />
    <router-view class="page-view" />
  </div>
</template>
<script lang="ts">
import { LayoutHeader } from "@/components";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    LayoutHeader,
  },
})
</script>
<style lang="less">
.default-layout {
	height: 100vh;
	display: flex;
	flex-direction: column;

	.page-view {
		flex: 1;
	}
}
</style>
