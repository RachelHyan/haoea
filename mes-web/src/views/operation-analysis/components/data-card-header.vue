<template>
  <div class="data-card-header">
    <img
      class="data-card-header__img"
      src="https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/data-toggle.png"
      alt=""
    >
    <div class="data-card-header__title">
      <div
        class="data-card-header__title-item"
        :class="{'active': activeTab === 0}"
        @click="handleTabClick(0)"
      >
        {{ title }}
      </div>
      <div
        class="data-card-header__title-item"
        :class="{'active': activeTab === 1}"
        @click="handleTabClick(1)"
      >
        {{ tabTitle }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DataCardHeader",
  props: {
    title: {
      type: String,
      default: "",
    },
    tabTitle: {
      type: String,
      default: "",
    },
  },
  emits: ["update:headerClick"],
  setup (props,{ emit, }) {
    const activeTab = ref(0);

    const handleTabClick = (tab: number) => {
      activeTab.value = tab;

      emit("update:headerClick", tab);
    }
		

    return {
      activeTab,
      handleTabClick,
    }
  },
})
</script>

<style lang="less">
.data-card-header {
	display: flex;
	align-items: center;
	width: 100%;
	padding: 20px 0 0 20px;
	box-sizing: border-box;
	margin-bottom: 10px;

	&__img {
		width: 11px;
		height: 23px;
		margin-right: 12px;
	}

	&__title {
		flex: 1;
		color: rgba(226, 235, 241, .6);
		font-size: 18px;
		font-weight: bold;
		position: relative;
		display: flex;
		align-items: end;

		&-item {
			cursor: pointer;
		}

		&-item:last-child {
			margin-left: 10px;
		}


		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 2px;
			background: linear-gradient(to right, #1F9ECC 0%, #1F9ECC 22%, rgba(31, 158, 204, .2) 22%, rgba(31, 158, 204, .2) 100%);
			position: absolute;
			bottom: -10px;
			left: 0;
		}

		.active {
			font-size: 24px;
			font-weight: bold;
			color: #E2EBF1;
		}
		
	}
}
</style>
