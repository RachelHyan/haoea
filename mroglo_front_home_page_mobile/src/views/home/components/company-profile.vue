<template>
  <div class="home-company-profile">
    <h1 class="company-profile-title">
      以无人驾驶技术助力数字城市服务
    </h1>
    <div class="company-profile-content">
      <h2 class="company-name">
        城市之光（深圳）无人驾驶科技有限公司
      </h2>
      <div class="company-info">
        <p>城市之光（深圳）无人驾驶有限公司是一家专注于高级别无人驾驶车研发、生产与应用的新锐前沿科技公司。公司深耕数字城市服务领域，力求解决传统城市服务如环卫等行业高危高负荷等痛点，配套AI智能化云管理平台，打造更安全，更智能，更低碳环保的数字城市服务全产业链解决方案。</p>
        <p>公司从数字智能、双碳战略、品质服务等多重角度关注数字环卫事业发展，目标三年内成为细分领域的头部企业。 </p>
        <p>公司由全球知名大学博士团队创立，与拥有丰富应用场景的环卫行业合作伙伴进行战略合作。团队骨干成员由世界一流院校博士、无人驾驶头部企业核心成员、各大主车厂初创成员、行业资深专家、大型产业集团高管组成。公司在自动驾驶方面开发了自己的先进关键技术。AutoCity推出了一系列新能源智能服务车，包括无人驾驶清扫车，无人驾驶洒水车，无人驾驶转运车等系列产品。</p>
      </div>
      <div class="company-imgBox">
        <img
          src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/frontpage%2F01%2Fhp-car.png"
        >
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue"

export default defineComponent({
  name: "CompanyProfile", // 公司简介
  setup() {
		
    return {

    }
  },
})
</script>
<style lang='less'>
.home-company-profile {
	color: #3E3A39;
	.company-profile-title {
		width: 163px;
		height: 37px;
		font-size: 15px;
		font-weight: 800;
		line-height: 21px;
		text-align: center;
		margin: 26px auto 31px;
	}
	.company-profile-content{
		width: 340px;
		margin: 0 auto;
		.company-name{
			font-size: 12px;
			font-weight: 1000;
			color: #000;
		}
		.company-info{
			font-size: 11px;
			font-weight: 500;
			line-height: 20px;
			p{
				margin: 23px 0;
			}
		}
		.company-imgBox{
			width: 80vw;
			margin: 0 auto;

			& img{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
