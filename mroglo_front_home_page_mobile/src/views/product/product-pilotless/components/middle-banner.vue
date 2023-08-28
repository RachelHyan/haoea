<template>
  <div class="middle-banner">
    <div class="first-banner banner">
      <div class="content">
        <span class="banner-text">
          支持不同城市场景、不同环卫车型的全面覆盖
        </span>
        <span class="banner-text">
          满足L4级无人驾驶环卫场景的多样化需求
        </span>
      </div>
    </div>
    <div class="second-banner banner">
      <span class="banner-text">
        解放环卫工人，让机器服务于人类
      </span>
    </div>
    <ul class="first-list">
      <li>
        <div class="list-text">
          外形尺寸
        </div>
        <div class="list-line" />
        <div class="list-text">
          2910x1220x2070mm
        </div>
      </li>
      <li>
        <div class="list-text">
          最大行驶速度
        </div>
        <div class="list-line" />
        <div class="list-text">
          16km/h
        </div>
      </li>
      <li>
        <div class="list-text">
          工作巡航速度
        </div>
        <div class="list-line" />
        <div class="list-text">
          5~9km/h
        </div>
      </li>
      <li>
        <div class="list-text">
          清扫宽度
        </div>
        <div class="list-line" />
        <div class="list-text">
          1600mm、800mm
        </div>
      </li>
      <li>
        <div class="list-text">
          最小转弯半径
        </div>
        <div class="list-line" />
        <div class="list-text">
          1340mm
        </div>
      </li>
      <li>
        <div class="list-text">
          最大爬坡度
        </div>
        <div class="list-line" />
        <div class="list-text">
          满载15°、空载20°
        </div>
      </li>
    </ul>
    <div class="third-banner" />
    <ul class="second-list">
      <li>
        <div class="list-text">
          垃圾箱容量
        </div>
        <div class="list-line" />
        <div class="list-text">
          450L
        </div>
      </li>
      <li>
        <div class="list-text">
          水箱容量
        </div>
        <div class="list-line" />
        <div class="list-text">
          270L
        </div>
      </li>
      <li>
        <div class="list-text">
          最高倾倒垃圾高度
        </div>
        <div class="list-line" />
        <div class="list-text">
          1300mm
        </div>
      </li>
      <li>
        <div class="list-text">
          最大举升重量
        </div>
        <div class="list-line" />
        <div class="list-text">
          400kg
        </div>
      </li>
      <li>
        <div class="list-text">
          高压清洗系统最大压力
        </div>
        <div class="list-line" />
        <div class="list-text">
          80~120bar
        </div>
      </li>
      <li>
        <div class="list-text">
          净重
        </div>
        <div class="list-line" />
        <div class="list-text">
          1900kg (1750kg)
        </div>
      </li>
    </ul>
    <div class="contact">
      <div class="contents">
        <div class="b-text">
          <span>
            产品/项目经理时刻与您保持紧密联系， 
          </span>
          <br>
          <span>
            第一时间了解项目进展，确保您的需求得到满足
          </span>
        </div>
        <p class="text">
          经验丰富的项⽬经理将定期与您联系，让您了解产品最新进展，确保满⾜您的要求。
        </p>
      </div>
      <div class="image" />
    </div>
  </div>
</template>

<style scoped lang="less">
.middle-banner {
	color: #3E3A39;
	.banner {
		height: 186px;
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.banner-text {
		font-size: 15px;
		font-weight: 800;
		color: #FFF;
	}
	.first-banner {
		background-image: url(https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20c1.png);
		.content {
			width: 100%;
			height: 49px;
			background-color: rgba(0,0,0,0.4);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	.second-banner {
		background-image: url(https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20c2.png);
		margin-top: 35px;
	}
	.third-banner {
		background-image: url(https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20xq.png);
		height: 195px;
		background-size: cover;
		background-position: center center;
		margin: 10px 0;
	}
	.first-list {
		padding: 40px 22px 0;
	}
	.second-list {
		padding: 0 22px;
	}
	ul li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 24px;
		.list-line {
			border-top: 2px dotted #ccc;
			width: 100%;
			margin: 0 10px;
		}
		.list-text {
			font-size: 12px;
			white-space: nowrap;
		}
	}
	.contact {
	color: #3E3A39;
	.contents {
		padding: 40px 22px;
		.b-text {
			font-size: 15px;
			font-weight: 800;
			margin-bottom: 23px;
		}
		.text {
			font-size: 13px;
		}
	}
	.image {
		height: 185px;
		background-image: url(https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20dt.png);
		background-size: cover;
	}

}
}
</style>
