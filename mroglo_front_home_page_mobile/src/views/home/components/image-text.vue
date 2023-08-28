<template>
  <div class="image-text">
    <img
      src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fchangjing.png"
      alt=""
    >
    <div class="contents">
      <span>适用于多行业、多场景选择</span>
      <ul class="list">
        <li>能够满足城市公开道路、城中村道路、乡镇道路、港口、隧道、大型园区等市政道路、封闭、半封闭场所需求；</li>
        <li>无人驾驶模式下，可开展道路清扫、洒水降尘、喷洒消杀等多种城市环卫作业；</li>
        <li>结合不同区域、不同时段、不同环卫需求，可灵活调度，打造区域领先的无人驾驶应用示范。</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name:"ImageText",
  setup () {
		

    return {}
  },
})
</script>

<style scoped lang="less">
.image-text {
	padding: 35px 17px 45px;
	box-sizing: border-box;
	img {
		height: 222px;
	}
	.contents {
		padding: 20px 17px 0;
		background-color: #f4f4f4;
		span {
			font-size: 15px;
			font-weight: 800;
			display: block;
			margin-bottom: 23px;
		}
		.list {
			padding-left: 10px;
			font-size: 10px;
			list-style-type: disc;
			li {
				padding-bottom: 23px;
			}
		}
	}
}
</style>
