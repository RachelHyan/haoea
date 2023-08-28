<template>
  <div class="layout-footer">
    <p class="layout-footer-copyright">
      Copyright 智城物云（深圳）有限公司
    </p>
    <p class="layout-footer-gov">
      Copyright 深圳市未来之光发展有限公司 网站备案号：<a
        href="https://beian.miit.gov.cn"
        target="_blank"
      >粤ICP备2021175791号</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutFooter",
  setup () {
		

    return {}
  },
})
</script>

<style lang="less">
.layout-footer {
	padding: 8px 0;

	&-copyright {
		text-align: center;
	}

	&-gov {
		text-align: center;
	}
}
</style>
