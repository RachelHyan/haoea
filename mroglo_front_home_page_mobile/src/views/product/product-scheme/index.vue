<template>
  <div class="root-page product-scheme">
    <div class="scheme-banner">
      <div class="scheme-banner-title">
        数字城市大管家
      </div>
      <div class="scheme-banner-content">
        <p>数字城市大管家，是全国首个数字城市综合服务体系，围绕智能环卫、应急保障、市政道路桥梁养护等公共数字城市服务智慧解决方案。 </p>
        <p>
          城市之光深度贯彻国家政策“数字经济+双碳战略”行动，围绕“数字城市大管家”的企业责任，作为"数字城市"部分，致力成为环卫、市政服务无人智能化设备的研发、生产、应用的“专精特新”企业，部署城市智能环卫领域的车联网系统，助力城市可持续发展的绿色之路，努力成为承担城市重大市政服务的主力军。
        </p>
      </div>
    </div>
    <div class="scheme-phototext">
      <div>
        <div class="phototext-title">
          构建环卫治理新模式
        </div>
        <div class="phototext-content">
          以打造“更有序、更干净、更智能、更经济”的城市建设为总目标，用先进核心科技，科学的治理策略，维护城市环节，扮靓城市容颜，推动城市共生发展下的绿色环保蝶变。
        </div>
      </div>
      <div>
        <div class="phototext-bgimg">
          <div class="phototext-title">
            开创智能<br>
            无人化环卫新时代
          </div>
          <ul class="phototext-content">
            <li>提高环卫作业效率</li>
            <li>提升环卫智能水平</li>
            <li>降低环卫作业风险</li>
            <li>降低环卫综合成本</li>
          </ul>
        </div>
        <div
          class="phototext-content"
          style="margin: 10px 23px;"
        >
          城市大管家以实现环卫场景中的无人化作业和智能环卫管理为目标，布局城市环卫全产业链，通过调度系统进行统一调度和任务规划，替代人工执行高效率的环卫作业 。
        </div>
      </div>
      <div>
        <div class="phototext-title">
          数字环卫智能化云管理平台
        </div>
        <img
          src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/Product2%2FProduct2-02.png"
          style="width: 100%;"
        >
        <div class="phototext-content">
          <span>以更精细智能的方式实现环卫管理决策的智能化</span>
          <ul>
            <div class="phototext-content-grey">
              <li>
                利用感知、测量的设备系统，实现对人、车、垃圾等环卫要素的透彻感知。
              </li>
            </div>
            <div class="phototext-content-grey">
              <li>
                结合4G/5G通讯技术，将环卫系统中的工作信息进行交互和共享，实现更全面的互联互通。
              </li>
            </div>
            <div class="phototext-content-grey">
              <li>
                利用云服务的模式建立面向环卫业务应用系统，实现更智慧的决策。
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div class="scheme-middle-banner">
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/Product2%2FProduct2-03.png"
        style="width:100%;"
      >
    </div>
    <div class="scheme-video-introduce">
      <video
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/Product2%2FIntroduction%20video.mp4"
        style="width: 100%;"
        controls
      />
      <div class="video-introduce-content">
        <span>数字环卫大管家</span>
        <ul>
          <li>环卫治理精细化</li>
          <li>业务管理规范化</li>
          <li>管理决策科学化</li>
        </ul>
      </div>
    </div>
    <ContactUs />
  </div>
</template>
<script lang="ts">
import { ContactUs } from "@/components";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductScheme",
  components: {
    ContactUs,
  },
})
</script>
<style lang="less">
.product-scheme {
	ul {
		list-style: inside;
	}

	.scheme-banner {
		padding: 23px 0;
		height: 510px;
		background-image: url("https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/Product2%2FProduct2-st.png");
		background-size: 100% 100%;
		color: #fff;

		.scheme-banner-title {
			text-align: center;
			font-size: 17px;
			font-weight: 800;
			padding-top: 25px;
		}

		.scheme-banner-content {
			font-size: 12px;
			font-weight: 400;
			line-height: 20px;
			p{
				margin: 23px;
			}
		}
	}

	.scheme-phototext {
		padding: 23px 0;

		&>div:not(:nth-child(2)) {
			margin: 30px 23px 0;
		}

		.phototext-title {
			font-size: 15px;
			font-weight: 800;
			line-height: 24px;
			margin: 10px 0;
		}

		.phototext-content {
			font-size: 13px;
			font-weight: 400;
			line-height: 24px;

			span {
				font-weight: bold;
				line-height: 40px;
			}

			.phototext-content-grey {
				background-color: #f5f5f5;
				padding: 10px 16px 10px 32px;
				margin-top: 10px;
				list-style: outside;
			}
		}

		.phototext-bgimg {
			margin-top: 30px;
			padding: 23px;
			height: 200px;
			background-image: url("https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/Product2%2FProduct2-01.png");
			background-size: 100% 100%;
		}
	}

	.scheme-video-introduce {
		margin: 0 20px;
		padding: 23px 0;

		.video-introduce-content {
			span {
				font-size: 17px;
				font-weight: 800;
				line-height: 50px;
			}

			ul {
				background-color: #f2f2f3;
				padding: 10px 15px;

				li {
					font-size: 13px;
					font-weight: 400;
					line-height: 35px;
				}
			}
		}
	}
}
</style>
