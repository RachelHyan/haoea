<template>
  <div class="layout-breadcrumb">
    <div class="layout-breadcrumb-icon" />
    <ul class="breadcrumb-list">
      <li
        v-for="item in breadcrumb"
        :key="item.path"
        class="breadcrumb-item"
      >
        <router-link
          :to="item.path"
          class="breadcrumb-item-link"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue"

export type Breadcrumb = {
	title: string
	path: string
}

export default defineComponent({
  name: "LayoutBreadcrumb",
  props: {
    breadcrumb: {
      type: Array as PropType<Breadcrumb[]>,
      default: () => [],
    },
  },
})
</script>
<style lang="less">
.layout-breadcrumb {
	height: 50px;
	padding:  0 24px;
	display: flex;
	align-items: center;

	&-icon {
		width: 16px;
		height: 16px;
		border: 3px solid #1769FA;
		border-radius: 50%;
	}
}
.breadcrumb-item {
	padding: 0 8px;
	position: relative;

	&-link {
		font-size: 16px;
		font-family: PingFang SC;
		color: #666;
	}

	&:nth-of-type(1) .breadcrumb-item-link {
		color: #000;
	}

	&::after {
		content: "/";
		position: absolute;
		right: -4.5px;
		top: -1px;
		color: #666;
		font-size: 16px;
	}

	&:nth-last-of-type(1)::after {
		display: none;
	}
}
</style>
