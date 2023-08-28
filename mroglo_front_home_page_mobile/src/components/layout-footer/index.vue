<template>
  <div class="layout-footer">
    备案号：粤ICP备2022101959号
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutFooter",
})

</script>
<style lang="less">
.layout-footer {
	height: 32px;
	color: #3E3A39;
	text-align: center;
	font-size: 16px;
	line-height: 32px;
	background-color: #E6E6E6;
}
</style>
