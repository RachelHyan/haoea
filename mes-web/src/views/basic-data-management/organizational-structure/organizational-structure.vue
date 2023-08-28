<template>
  <div class="organizational-structure page-root">
    <organization-tree
      v-model:ids="ids"
      v-model:curentProjectId="curentProjectId"
    />
    <organization-table
      :ids="ids"
      :curent-project-id="curentProjectId"
    />
  </div>
</template>

<script lang="ts">
import "@amap/amap-jsapi-types";
import { defineComponent, ref } from "vue";
import { OrganizationTable, OrganizationTree } from "./components";

export default defineComponent({
  name: "OrganizationalStructure",
  components: {
    OrganizationTree,
    OrganizationTable,
  },
  setup() {
    const ids = ref<string>("");
    const curentProjectId = ref<number>(0);

    return {
      ids,
      curentProjectId,
    }
  },
})
</script>
<style lang="less">
.organizational-structure.page-root {
	display: flex;
	column-gap: 16px;
}
.layout-content-inside .organizational-structure.page-root {
	background-color: #F4F4F4;
}
</style>
