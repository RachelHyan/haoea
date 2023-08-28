<template>
  <div class="card-header">
    <h5 class="card-header-title">
      {{ title }}
    </h5>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardHeader',
  props: {
    title: {
      type: String,
	  	default: '',
    },
  },
})
</script>
<style lang="less">
.card-header {
  padding: 14px 24px 12px;
  border-bottom: 1px solid #F2F3F4;

  &-title {
    height: 22px;
    font-size: 16px;
    font-weight: 500;
    color: #51565D;
    line-height: 22px;
		padding-left: 12px;
		position: relative;

		&::before {
			content: "";
			width: 4px;
			height: 14px;
			background-color: #1D51F4;
			position: absolute;
			top: 4px;
			left: 0;
		}
  }
}
</style>
