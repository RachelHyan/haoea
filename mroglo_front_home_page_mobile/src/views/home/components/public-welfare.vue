<template>
  <div class="public-welfare">
    <div>
      <span class="title">
        社会责任
      </span>
      <span class="brief">
        践行环保理念，实现绿色发展
      </span>
    </div>
    <div class="article">
      城市之光深度贯彻国家政策“数字经济+双碳战略”行动，为全球资源和环境可持续发展贡献力量。
      <span class="space" />
      助力智慧城市发展建设的绿色之路，努力承担城市重大环境治理任务的主力军。
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "PublicWelfare",
  setup () {
		

    return {}
  },
})
</script>

<style scoped lang="less">
.public-welfare{
	height: 201px;
	width: 100%;
	background-image: url(https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2Fshehuizeren.png);
	background-size: cover;
	background-position: center center;
	color: #fff;
	padding: 0 17px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.title{
		font-size: 15px;
		font-weight: 800;
	}
	.brief, .article{
		font-size: 12px;
	}
	.brief {
		display: block;
		margin-bottom: 23px;
	}
	.space {
		height: 13px;
		display: block;
	}
}
</style>
