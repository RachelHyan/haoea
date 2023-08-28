<template>
  <div class="contact-us">
    <div class="contact-us-title">
      联系我们
    </div>
    <p>
      如果您对城市之光提供的产品或技术感兴趣，请您随时与我们取得联系。
    </p>
    <p>
      我们期待与全球跨领域的企业、组织、个人建立合作，共同致力于无人驾驶产业与数字环卫的创新变革。
    </p>
    <div class="contact-us-detail">
      ⽣态合作：mengqi@mroglo.com<br>
      商务合作：mengqi@mroglo.com<br>
      媒体报道：mengqi@mroglo.com<br><br>
      <p>获得更多关于产品的信息：</p>
      <img
        src="https://mroglo-1309338970.cos.ap-guangzhou.myqcloud.com/%20Product%201%2FProduct%20wx.png"
        class="contact-us-qrcode"
      >
    </div><br>
    <p>请于表单留下简单信息，以便团队获得更多详细信息与您取得联系。</p>
    <van-form
      ref="contactUsRef"
      class="contact-form"
      validate-trigger="onSubmit"
      @submit="onSubmit"
    >
      <van-cell-group inset>
        <van-field
          v-model="contactUsModel.name"
          type="text"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写' }]"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="contactUsModel.email"
          type="text"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写' }]"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="contactUsModel.address"
          type="text"
          placeholder="公司/组织/学校"
          :rules="[{ required: true, message: '请填写' }]"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="contactUsModel.business"
          readonly
          placeholder="业务类型"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPicker.business = true"
        />
        <van-popup
          v-model:show="showPicker.business"
          position="bottom"
        >
          <van-picker
            :columns="businessList"
            @confirm="businessConfirm"
            @cancel="showPicker.business = false"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="contactUsModel.industry"
          readonly
          placeholder="所属行业"
          :rules="[{ required: true, message: '请选择' }]"
          @click="showPicker.industry = true"
        />
        <van-popup
          v-model:show="showPicker.industry"
          position="bottom"
        >
          <van-picker
            :columns="industryList"
            @confirm="industryConfirm"
            @cancel="showPicker.industry = false"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group inset>
        <van-field
          v-model="contactUsModel.introduction"
          style="min-height: 76px;"
          :rules="[{ required: true, message: '请填写' }]"
          autosize
          type="textarea"
          placeholder="项目介绍"
        />
      </van-cell-group>
      <van-button
        class="contact-form-submit"
        :style="{backgroundColor: Object.keys(contactUsModel).length === 0 ? '#A4A5A5' : '#507beb'}"
        native-type="submit"
        :loading="loading"
        loading-text="SEND"
        :icon="loading?'success':''"
      >
        SEND
      </van-button>
    </van-form>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import type { FormInstance, PickerColumn } from "vant";
import { Toast } from "vant";
import "vant/es/toast/style";
import type { Ref } from "vue";
import { defineComponent, reactive, ref } from "vue";

interface ContactUsType {
	name?: string
	email?: string
	address?: string
	business?: string | number
	industry?: string
	introduction?: string
}

export default defineComponent({
  name: "ContactUs",
  setup() {
    const showPicker = reactive({ business: false, industry: false, })
    const contactUsRef = ref<FormInstance>()
    const contactUsModel:Ref<ContactUsType> = ref<ContactUsType>({})
    const loading:Ref<boolean> = ref<boolean>(false)

    const businessList: PickerColumn = ["无人驾驶", "高级别无人驾驶清扫车", "无人洒水车", "数字环卫解决方案", "新车研发"]
    const industryList: PickerColumn = ["园区/景区", "无人驾驶行业", "政府", "其他"]

    const businessConfirm = (value: string) => {
      contactUsModel.value.business = value
      showPicker.business = false
    }

    const industryConfirm = (value: string) => {
      contactUsModel.value.industry = value
      showPicker.industry = false
    }
    const onSubmit = async () => {
      loading.value = true
      try {
        const { data, } = await axios.post("https://feishu-cs.littaro.cn/api/feishu/news/add", {
          ...contactUsModel.value,
        })
        if (data.code === 0) {
          Toast({
            message: "操作成功",
            position: "bottom",
          })
          contactUsModel.value = {}
          loading.value = false
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      contactUsRef,
      contactUsModel,
      businessList,
      industryList,
      showPicker,
      loading,
      businessConfirm,
      industryConfirm,
      onSubmit,
    }
  },
})
</script>
<style lang="less">
.contact-us {
	background: #1A1C20;
	padding: 40px 22px;
	color: #AAABAB;
	font-size: 12px;
	font-weight: 400;
	line-height: 22px;

	&-title {
		font-size: 17px;
		font-weight: 800;
		margin: 15px 0;
	}

	p {
		line-height: 22px;
		padding: 8px 0;
	}

	&-detail {
		margin-top: 20px;
	}

	&-qrcode {
		width: 72px;
		height: 72px;
	}

	.contact-form {
		&-submit {
			background-color: #A4A5A5;
			color: #fff;
			width: 100%;
			height: 26px;
			border: none;
			font-size: 12px;
		}

		.van-cell-group {
			margin: 10px 0;
			border-radius: 2px;
		}

		.van-field {
			padding: 0 13px;
			min-height: 26px;
		}

		.van-field__control {
			&::placeholder {
				font-size: 12px;
			}
		}
	}
}
</style>
