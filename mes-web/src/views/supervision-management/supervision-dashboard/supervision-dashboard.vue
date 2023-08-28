<template>
  <div class="supervision-dashboard">
    <dashboard-items />
    <supervision-statistics />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dashboardItems from "./components/dashboard-items.vue";
import SupervisionStatistics from "./components/supervision-statistics.vue";

export default defineComponent({
  name: "SupervisionDashboard",
  components: {
    SupervisionStatistics,
    dashboardItems,
  },
  setup () {
		

    return {}
  },
})
</script>

<style scoped>

</style>
