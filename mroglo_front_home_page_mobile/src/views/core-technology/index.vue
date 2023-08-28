<template>
  <div class="root-page core-technology">
    <div class="core-technology-banner">
      <img
        style="width: 100%;"
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-SY.png"
      >
      <div class="banner-title">
        <p class="banner-title-left">
          无人驾驶技术攀峰路
        </p>
        <p class="banner-title-right">
          奔赴无人之境
        </p>
      </div>
    </div>
    <div class="core-technology-introduce">
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-CJ.png"
        style="width: 100%;"
      >
      <div class="introduce-item">
        <div class="introduce-item-title">
          高级别无人驾驶
        </div>
        <div class="introduce-item-content">
          <p>
            自动驾驶是汽车工程、传感器、计算机、人工智能、通信、导航定位、模式识别、机器视觉、智能控制等多门前沿学科的综合体。高级别自动驾驶系可实现在特定区域内对车辆操作的无人接管，系统具备高度自主的环境感知、车辆定位以及决策规划能力。
          </p>
          <p>
            利用高精度地图, 定位和感知技术, 在精确估计车辆自身运动状态的同时，预测周围车辆和行人的行为，在此基础上，实现高度自主的行为决策和轨迹规划，并通过控制车辆的转向，制动和速度，实现复杂场景下高度自主的无人驾驶。
          </p>
          <p>城市之光秉承以更安全、更高效、更经济、更舒适地推动无人驾驶的商用和落地，打造更安全，更智能，更低碳环保的数字环卫全产业链解决方案。</p>
        </div>
      </div>
    </div>
    <div class="core-technology-photo">
      <div class="photo-icon">
        <div
          v-for="(item, index) in coreTechnologyPhotoes"
          :key="index"
          class="photo-icon-box"
        >
          <img :src="item.src">
          <p>{{ item.title }}</p>
        </div>
      </div>
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-CT.png"
        style="width: 100%;margin-top: 30px"
      >
    </div>
    <div class="core-technology-phototext">
      <div
        v-for="(item, index) in photoTextArr"
        :key="index"
        class="phototext-item"
      >
        <img :src="item.imgSrc">
        <div class="phototext-item-title">
          {{ item.title }}
        </div>
        <div class="phototext-item-content">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="core-technology-footer">
      <img src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-DT.png">
    </div>
    <ContactUs />
  </div>
</template>
<script lang="ts">
import { ContactUs } from "@/components";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CoreTechnology",
  components: {
    ContactUs,
  },
  setup() {
    const coreTechnologyPhotoes = [
      { title: "高等级无人驾驶系统", src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-01.png", },
      { title: "无间断多源融合定位SLAM技术", src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-02.png", },
      { title: "自学习演讲型复杂场景理解技术", src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-03.png", },
      { title: "云边端协同计算", src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-04.png", },
      { title: "五层安全驾驶系统", src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-05.png", },
      { title: "智能自诊断迭代技术", src: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-06.png", }
    ]
    const photoTextArr = [
      {
        title: "“维纳脑”\n—— 高级别全栈环卫无人驾驶技术",
        imgSrc: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-WNN.png",
        content: "城市之光自研环卫驾驶脑系统，具备全栈关键技术：\n\n 多模态感知融合技术：通过多模态感知融合和深度神经网络，实现不良光照和恶劣天气等工况下的鲁棒环境感知和行为预测，并具备垃圾识别、倾倒桶位检测等环卫作业特定感知能力。\n\n行为智能预测技术：可以通过观测数据和先验规则知识，准确预测判断周边移动物体运动状态，有效应对存在密集人流、随机运动等因素的复杂作业环境，保障作业安全。\n\n精准路径规划与控制技术：针对贴边清扫和垃圾倾倒等控制精度要求较高的作业任务，利用有限计算资源，实现复杂环境下的实时精准规划与控制，动态高效生成运动轨迹和高精度横纵向车辆控制指令。可在复杂动态环境中兼顾安全，高效、节能等运行要求。",
      },
      {
        title: "“司南针”\n—— 无间断多源融合高精定位技术",
        imgSrc: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-SNZ.png",
        content: "城市之光针对卫星导航信号不良和环境特征单一等极端工况，自研多源融合高精定位技术：在单车系统中，融合卫星导航、惯性导航、里程计和点云-HD地图匹配等多模态定位源，为无人环卫车提供高精度和无间断定位能力，针对车路协同系统，进一步结合V2I路侧设备辅助导航信息和V2V相对定位信息，拓展单车的定位性能。在无外部辅助导航源、环境特征稀疏等条件下，实现无间断的高精度定位。",
      },
      {
        title: "“千机变”\n—— 自学习演进型复杂场景理解技术",
        imgSrc: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-QJB.png",
        content: "为应对作业和驾驶场景的高度多样化和动态性，城市之光构建了数据驱动的“自学习型”环卫智能驾驶系统。依托环卫车辆日常作业的优势，将其作为海量数据采集移动平台，借由车端差异收集系统，辨别过往作业中未曾覆盖的场景特征，提取筛选高价值数据；构建集中式深度神经网络，基于环卫车采集的海量高价值数据，通过自监督学习实现自我演化，从而快速有效适应新场景。",
      },
      {
        title: "“智慧云”\n——智慧城市环境服务云管理平台",
        imgSrc: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-ZHY.png",
        content: "城市之光提供智慧城市环境服务云管理平台，实现系统部署、运营和维护全过程的数据化、透明化、可视化。提供一体化云端运维、调度、决策、安全控制解决方案，在运行层面，基于运维大数据实现车辆状态智能监控分析、风险接管预警和作业智能调度；在通信层面采用安全协议、数据加密智能校验等核心技术以确保信息安全；在控制层面，提供远程接管机制，在紧急情况下将控制权限由车载端转移到运维中心远程控制，全方位保障作业安全。",
      },
      {
        title: "“万物联”\n—— 智能互联，车路协同",
        imgSrc: "https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/CoreTechnology%2FCT-WWL.png",
        content: "城市之光构建了智慧环卫车-路-云网联协同架构，利用5G大连接、高带宽、低延时的特性，基于V2X打造车、路、人、云协同的新型城市智慧环卫系统。运用移动边缘计算(Mobile Edge Computing, MEC)和云-边-端协同技术，将部分计算量大的任务转移到路侧MEC服务器上，显著减少车端的处理负载，大大减少数据处理延迟和计算消耗；同时云端运行车辆状态大数据建模和优化调度算法，实现多车协同和决策优化。基于5G等先进通信技术，提供高效可靠的数据传输，解决移动设备有限的资源与无人车日益增长的计算需求之间的矛盾问题，扩展无人车的感知和决策能力，实现多车智能。",
      }
    ]
    return {
      coreTechnologyPhotoes,
      photoTextArr,
    }
  },
})
</script>
<style lang="less">
.core-technology {
	&-banner {
		position: relative;

		.banner-title {
			position: absolute;
			z-index: 1;
			width: 180px;
			top: 80px;
			left: calc(50vw - 90px);
			font-size: 17px;
			font-weight: 800;
			line-height: 30px;
			color: #fff;

			&-left {
				text-align: left;
			}

			&-right {
				text-align: right;

			}
		}
	}

	&-introduce {
		padding: 30px 22px;

		img {
			margin-bottom: 40px;
		}

		.introduce-item {
			&-title {
				font-size: 17px;
				font-weight: 800;
				color: #3E3A39;
				line-height: 35px;
			}

			&-content {
				font-size: 13px;
				font-weight: 400;
				color: #3E3A39;
				line-height: 24px;
				p{
					margin-top: 23px;
				}
			}
		}
	}

	&-photo {
		.photo-icon {
			padding: 0 22px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			&-box {
				width: 105px;
				height: 105px;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				box-shadow: 0 0 10px 0 #cccfff;
				margin: 10px 0;
				padding: 10px 5px;
				box-sizing: border-box;

				img {
					width: 50px;
					height: 50px;
				}

				p {
					font-size: 12px;
					font-weight: bold;
					line-height: 16px;
					text-align: center;
				}
			}
		}
	}

	&-phototext {
		padding: 30px 22px;

		.phototext-item {
			white-space: pre-line;

			&:not(:nth-child(1)) {
				margin-top: 60px;
			}

			img {
				width: 100%;
			}

			&-title {
				font-size: 15px;
				font-weight: 800;
				line-height: 24px;
				margin: 20px 0;
			}

			&-content {
				font-size: 13px;
				font-weight: 400;
				line-height: 24px;
			}
		}
	}

	&-footer {
		height: 185px;

		img {
			width: 100%;
		}
	}
}
</style>
