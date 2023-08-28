<template>
  <div class="data-layout">
    <div class="data-layout-header">
      <slot name="data-layout-header" />
    </div>
    <div class="data-layout-body">
      <slot name="data-layout-body" />
      <div class="data-layout-left">
        <slot name="data-layout-left" />
      </div>
      <div class="data-layout-right">
        <slot name="data-layout-right" />
      </div>
      <div class="data-layout-footer">
        <slot
          name="data-layout-footer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DataLayout",
  setup () {
		

    return {}
  },
})
</script>

<style lang="less">
.data-layout {
	height: 100vh;
	display: flex;
	flex-direction: column;

	&-header {
		height: 70px;
		background-color: rgba(12, 37, 124, 0.7);
		position: relative;
	}

	&-body {
		flex: 1;
		position: relative;
	}
	&-left {
		width: 403px;
		height: calc(100% - 20px - 43px);
		position: absolute;
		left: 15px;
		top: 43px;
	}
	&-right {
		width: 403px;
		height: calc(100% - 20px - 43px);
		position: absolute;
		right: 15px;
		top: 43px;
	}

	&-footer {
		width: 760px;
		height: 155px;
		position: absolute;
		bottom: 0;
		left: calc(50vw - 380px);
	}
}
</style>
