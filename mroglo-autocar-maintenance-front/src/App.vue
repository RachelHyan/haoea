<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  components: {

  },
  setup () {
    return {

    }
  },
})
</script>

<style lang="less">
html,body{
	margin: 0;
	padding: 0;
}
</style>
