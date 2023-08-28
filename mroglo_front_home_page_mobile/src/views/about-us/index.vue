<template>
  <div class="root-page about-us">
    <div class="top-banner">
      <div class="text">
        开放 创新 坦诚 无限
      </div>
    </div>
    <div class="company-profile contents first-contents">
      <span class="cn-title">公司介绍</span>
      <span class="en-title">COMPANY PROFILE</span>
      <p class="paragraph">
        城市之光（深圳）无人驾驶有限公司（以下简称“城市之光”）是一家专注于高级别无人驾驶车研发、生产与应用的新锐前沿科技公司。公司深耕城市数字环卫领域，力求解决传统环卫行业高危高负荷等痛点，配套AI智能化云管理平台，打造更安全，更智能，更低碳环保的数字环卫全产业链解决方案。
        <span class="space" />
        公司从数字智能、双碳战略、品质服务等多重角度关注数字环卫事业发展，目标三年内成为细分领域的头部企业。
        <span class="space" />
        公司由全球知名高校博士团队与自有场景产业集团共同创建，自研多元算法，在细分技术领域，高级别无人驾驶领域处于全球领先水平。公司陆续推出无人驾驶小型清扫车、无人驾驶环卫车、无人洒水车等AI智能产品。
      </p>
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20aboutus%2Faboutus-01.png"
        alt=""
      >
    </div>
    <div class="team-introduction contents">
      <span class="cn-title">团队介绍</span>
      <span class="en-title">TEAM INTRODUCTION</span>
      <p class="paragraph">
        城市之光研发团队拥有深厚的技术积累，技术核心由来自麻省理工、加州伯克利、斯坦福、瑞士联邦理工、清华、香港中文等世界一流学府的精英组成，公司硕、博占比高达70%以上。
        <span class="space" />
        研发成员多次荣获全球顶级期刊最佳论文奖（IEEE ISPA，IEEE ICAL，Nature Communication），国家部级科技成果一等奖等国际大奖，先后参与了多项国家级重点科研项目。
        <span class="space" />
        团队骨干成员由世界一流院校博士、无人驾驶头部企业核心成员、各大主车厂初创成员、行业资深专家、大型产业集团高管组成。
      </p>
    </div>
    <div class="social-responsibility contents">
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20aboutus%2Faboutus-02.png"
        alt=""
      >
      <span class="cn-title">社会责任</span>
      <span class="en-title">SOCIAL RESPONSIBILITY</span>
      <p class="paragraph">
        垃圾分类的号角已全面吹响，环卫领域在清洁化、智能化、高效率的市场需求下，对于环卫产品的性能要求逐渐提高，搭乘智慧数字环卫，城市之光深耕城市数字环卫领域，力求解决传统环卫行业高危高负荷等痛点，在构建“零碳无废”城市中扮演着重要的角色。
        <span class="space" />
        城市之光深度贯彻国家政策“数字经济+双碳战略”行动，围绕“数字城市大管家”的企业责任，致力成为环卫、市政服务无人智能化设备的研发、生产、应用的“专精特新”企业。部署城市智能环卫领域的车联网系统， 助力城市可持续发展的绿色之路，努力成为承担城市重大市政服务的主力军。
      </p>
    </div>
    <div class="join-us contents">
      <video
        controls
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20aboutus%2Faboutus-sp.mp4"
      />
      <span class="cn-title">加入我们</span>
      <span class="en-title">JOIN US</span>
      <p class="paragraph">
        城市之光是一支充满朝气的年轻团队，崇尚自由、开放创新、无限、创新是我们的标签。我们怀着“让驾驶更智能，让出行更简单”的统一目标，一起共创安全、智能、美好的智能驾驶新世界。
      </p>
    </div>
    <div class="expectation contents last-contents">
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20aboutus%2Faboutus-03.png"
        alt=""
      >
      <span class="cn-title">期待与您相遇，共创无人驾驶蓝图</span>
      <p class="paragraph">
        城市之光一直期待与全球跨领域、产业的企业建立合作，共同致力于无人驾驶与数字环卫的产业变革，我们希望与政府、社区、地产、产业园区等机构合作，把无人驾驶与智能汽车设计制造应用于各行各业，共同探索无人驾驶的创新应用和规模化商业落地。
      </p>
    </div>
    <ContactUs />
  </div>
</template>
<script lang="ts">
import { ContactUs } from "@/components";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutUs",
  components: { ContactUs, },
})
</script>

<style scoped lang="less">
.about-us {
	.top-banner {
		background-image: url(https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20aboutus%2Faboutus.png);
		background-size: cover;
		height: 265px;
		background-position: bottom center;
		.text {
			font-size: 17px;
			font-weight: 800;
			color: #FFF;
			word-spacing: 5px;
			text-align: center;
			padding-top: 52px;
		}
	}
	.contents {
		padding: 0 22px;
		.cn-title {
			font-size: 15px;
			color: #333;
			display: block;
			margin-top: 28px;
			font-weight: 800;
		}
		.en-title {
			font-size: 12px;
			color: #333;
			display: block;
			font-weight: 800;
		}
		.paragraph {
			font-size:13px;
			text-align: justify;
			margin-top: 23px;
		}
		img, video {
			width: 100%;
			margin-top: 53px;
		}
		.space {
			height: 23px;
			display: block;
		}
	}
	.first-contents {
		padding-top: 15px;
	}
	.last-contents {
		padding-bottom: 71px;
	}
}
</style>
