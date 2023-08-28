<template>
  <div class="prodeuct-info">
    <div class="top-content">
      <span class="title">
        环卫服务产业的“未来之星”
      </span>
      <p class="paragraph">
        城市之光依托自有研发团队的核心技术和自有应用场景发展优势，使用“人+AI”机器人(无人清扫车、无人洒水车、无人转运车、AI垃圾拾取机器人、AI视觉垃圾分类系统等)协同作业，打破传统环卫人员保障不足、机械化程度低、粗放管理等制约因素，为智慧城市建设的数字环卫带来一场电动化、数字化、可持续发展的创新革命。
      </p>
    </div>
    <div
      class="middle-imgs"
      @touchstart="start"
      @touchmove="start"
      @touchend="start"
      @click="start"
    >
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201/Product%20d.png"
        style="width:100% ; height: 100%; position:absolute ;z-index: 1;top: 0;left: 0;"
        alt=""
      >
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20s.png"
        style="width:100% ; height: 100%;top:0; position:absolute ;z-index: 4;left: 0;"
        alt=""
      >
      <div
        class="right"
        :style="{left:leftValue+'px'}"
      />
      <div :style="{left:leftValue+'px'}" />
    </div>
    <div class="icons-first">
      <div class="icon-item">
        <img
          src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20tp1.png"
          alt=""
        >
        <p>高级别自动驾驶</p>
      </div>
      <div class="icon-item">
        <img
          src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20tp2.png"
          alt=""
        >
        <p>高精度定位导航</p>
      </div>
      <div class="icon-item">
        <img
          src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20tp3.png"
          alt=""
        >
        <p>运动底盘控制</p>
      </div>
    </div>
    <div class="icons-second">
      <div class="icon-item">
        <img
          src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20tp4.png"
          alt=""
        >
        <p>动态感知避障</p>
      </div>
      <div class="icon-item">
        <img
          src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20tp5.png"
          alt=""
        >
        <p>远程管理调度</p>
      </div>
    </div>
    <div class="bottom-text">
      <p class="paragraph">
        城市之光高级别无人驾驶清扫车搭载自研“维纳脑”高等级无人驾驶系统，内置五层安全防护系统，实现车规级安全设计，可智能定制作业场景清扫与检测，保障全无人、全天时、全天候的安全运行。在无人驾驶模式下，可开展道路清扫、洒水降尘、喷洒消杀等多种城市环卫作业。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name:"ProductInfo",
  setup () {
    let leftValue = ref(document.body.clientWidth/2)

    const start = (e:any) => {
      if(e.targetTouches){
        if(e.targetTouches.length>0){
          leftValue.value=e.targetTouches[0].clientX
        }
      }else{
        leftValue.value=e.offsetX
      }
    }

    return {
      leftValue,
      start,
    }
  },
})
</script>

<style scoped lang="less">
.prodeuct-info {
	color: #3E3A39;
	padding: 0 22px;
	.top-content {
		padding: 40px 0;
		.title {
			font-size: 17px;
			font-weight: 800;
			text-align: center;
			line-height: 35px;
			display: block;
		}
	}
	.middle-imgs{
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 185px;
		.right{
			height: 100%;
			width: 100%;
			background: #fff;
			position: absolute;
			top: 0;
			z-index: 3;
			left: 0;
		}
	}
	.icons-first {
		width: 100%;
		display: flex;	
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 50px;
		margin-bottom: 15px;
	}
	.icons-second {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 40px;
		.icon-item {
			margin: 0 5px;
		}
	}
	.bottom-text {
		margin-bottom: 40px;
	}
	.icon-item {
		width: 104px;
		height: 104px;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img {
			width: 50px;
		}
		p {
			font-size: 12px;
			font-weight: bold;
		}
	}
	.paragraph {
		font-size: 13px;
		line-height: 24px;
		text-align: justify;
	}
}


</style>
