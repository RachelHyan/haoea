<template>
  <div class="basic-overview">
    <data-card-header title="项目基础概况" />
    <div class="basic-overview__body">
      <div class="basic-overview__body-project">
        {{ projectName }}
      </div>
      <div class="basic-overview__body-data">
        <div>城市：{{ city }}</div>
        <div>人数：<span style="color:#25E3FF">{{ projectPersonTotal }}人</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataCardHeader from "../data-card-header.vue";

export default defineComponent({
  name: "BasicOverview",
  components: {
    DataCardHeader,
  },
  props: {
    projectName: {
      type: String,
      default: "项目名称",
    },
    city: {
      type: String,
      default: "城市",
    },
    projectPersonTotal: {
      type: Number,
      default: 0,
    },
  },
  setup () {

    return {}
  },
})
</script>

<style lang="less">
.basic-overview {
	width: 100%;
	height: 17.5%;
	box-sizing: border-box;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__body {
		padding: 25px 20px 0px;

		&-project {
			font-size: 20px;
			color: #C9D9DB;
			margin-bottom: 16px;
		}

		&-data {
			display: flex;
			justify-content: space-between;
			font-size: 18px;
			color: #8F9AAC;
		}
	}
}
</style>
