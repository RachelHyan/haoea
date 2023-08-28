<template>
  <div class="default-layout">
    <layout-header />
    <router-view />
  </div>
</template>
<script lang="ts">
import { LayoutHeader } from "@/components";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
  components:{
    LayoutHeader,
  },
})
</script>
<style lang="less">
	.default-layout {
		background-color: #fff;
	}

	.root-page {
		padding-top: 57px;
	}
</style>
