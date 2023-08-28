<template>
  <view class="privacy-policy">
    <nav-bar title="隐私政策" />
    <view class="privacy-policy-title">
      行运创城mes小程序隐私保护指引
    </view>
    <view class="privacy-policy-head">
      本指引是行运创城mes小程序开发者 "智城物云(深圳)科技有限公司"（以下简称“开发者”）为处理你的个人信息而制定。
    </view>
    <view class="privacy-policy-body">
      <view class="privacy-policy-body-article">
        <view class="privacy-policy-body_title font_weight">
          1. 开发者处理的信息
        </view>
        <view class="privacy-policy-body_content">
          <view>
            根据法律规定，开发者仅处理实现小程序功能所必要的信息。
          </view>
          <view>为了方便微信身份快速登录系统，开发者将在获取你的明示同意后，收集你的手机号。</view>
          <view>为了匹配你的作业区域，开发者将在获取你的明示同意后，收集你的位置信息。</view>
          <view>为了检查出勤和作业情况，开发者将在获取你的明示同意后，访问你的摄像头。</view>
        </view>
      </view>
      <view class="privacy-policy-body-article">
        <view class="privacy-policy-body_title font_weight">
          2. 你的权益
        </view>
        <view class="privacy-policy-body_content">
          <view>
            <text class="font_weight">
              2.1
            </text>
            关于收集你的位置信息、访问你的摄像头，你可以通过以下路径：小程序主页右上角“…”—“设置”—点击特定信息—点击“不允许”，撤回对开发者的授权。
          </view>
          <view>
            <text class="font_weight">
              2.2
            </text>
            关于收集你的手机号，你可以通过以下路径：小程序主页右上角“...” — “设置” — “小程序已获取的信息” — 点击特定信息 — 点击“通知开发者删除”，开发者承诺收到通知后将删除信息。
          </view>
          <view>
            <text class="font_weight">
              2.3
            </text>
            关于你的个人信息，你可以通过以下方式与开发者联系，行使查阅、复制、更正、删除等法定权利。
          </view>
          <view>
            邮箱:tencent@citees.cn
          </view>
        </view>
      </view>
      <view class="privacy-policy-body-article">
        <view class="privacy-policy-body_title font_weight">
          3. 开发者对信息的存储
        </view>
        <view class="privacy-policy-body_content">
          <view>
            <text class="font_weight">
              3.1
            </text> 开发者承诺，除法律法规另有规定外，开发者对你的信息的保存期限应当为实现处理目的所必要的最短时间。
          </view>
        </view>
      </view>
      <view class="privacy-policy-body-article">
        <view class="privacy-policy-body_title font_weight">
          4. 信息的使用规则
        </view>
        <view class="privacy-policy-body_content">
          <view>
            <text class="font_weight">
              4.1
            </text> 开发者将会在本指引所明示的用途内使用收集的信息
          </view>
          <view>
            <text class="font_weight">
              4.2
            </text> 如开发者使用你的信息超出本指引目的或合理范围，开发者必须在变更使用目的或范围前，再次以站内信方式告知并征得你的明示同意。
          </view>
        </view>
      </view>
      <view class="privacy-policy-body-article">
        <view class="privacy-policy-body_title font_weight">
          5. 信息对外提供
        </view>
        <view class="privacy-policy-body_content">
          <view>
            <text class="font_weight">
              5.1
            </text> 开发者承诺，不会主动共享或转让你的信息至任何第三方，如存在确需共享或转让时，开发者应当直接征得或确认第三方征得你的单独同意。
          </view>
          <view>
            <text class="font_weight">
              5.2
            </text> 开发者承诺，不会对外公开披露你的信息，如必须公开披露时，开发者应当向你告知公开披露的目的、披露信息的类型及可能涉及的信息，并征得你的单独同意。
          </view>
        </view>
      </view>
      <view class="privacy-policy-body-article">
        <view class="privacy-policy-body_title font_weight">
          6. 你认为开发者未遵守上述约定，或有其他的投诉建议、或未成年人个人信息保护相关问题，可通过以下方式与开发者联系；或者向微信进行投诉。
        </view>
        <view class="privacy-policy-body_content">
          邮箱 : tencent@citees.cn
        </view>
      </view>
    </view>
    <view class="update-time">
      更新日期：2023-02-20<br>
      生效日期：2023-02-20
    </view>
  </view>
</template>
<script lang="ts">
import NavBar from "@/components/nav-bar/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrivacyPolicy",
  components: { NavBar, },
})
</script>
<style lang='scss'>
.privacy-policy {
	font-size: 28rpx;
	padding: 0 10rpx 40rpx;
	line-height: 50rpx;

	&-title {
		font-size: 48rpx;
		text-align: center;
		padding: 30rpx 0;
	}

	&-head {
		text-indent: 2em;
	}

	&-body {
		&_title {
			font-size: 36rpx;
			padding: 30rpx 0;
		}

		&_content {
			text-indent: 2em;
		}
	}

	.update-time {
		text-align: right;
	}

	.font_weight {
		font-weight: bold;
	}
}
</style>
