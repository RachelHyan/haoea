<template>
  <a-modal
    :visible="visible"
    unmount-on-close
    width="400px"
    title="域控制器版本更新"
    title-align="start"
    :ok-button-props="{loading:true}"
    :cancel-button-props="{type:'outline'}"
    class="ota-modal"
    :on-before-ok="handleBeforeOk"
    @before-open="getOTAInfo"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="ota-current">
      <p class="ota-current-version">
        当前版本: {{ currentVersion }}
      </p>
      <p class="ota-last-date">
        上次更新: {{ lastDate }}
      </p>
    </div>
    <div class="ota-newest">
      <p class="ota-newest-info">
        已检测到新版本：{{ newestVersion }} {{ newestDate }}
      </p>
      <p class="ota-newest-log">
        {{ newestLog }}
      </p>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { queryCarVersionInfoUsingGET, upgradeUsingPOST } from "@/api/chekuguanli";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name:"OtaModal",
  props:{
    visible: {
      type: Boolean,
      required: true,
    },
    carId:{
      type: Number,
      required: true,
    },
  },
  emits:["close"],
  setup(props,{emit,}) {
    const currentVersion:Ref<string> = ref("")
    const lastDate:Ref<string> = ref("")
    const newestVersion:Ref<string> = ref("")
    const newestDate:Ref<string> = ref("")
    const newestLog:Ref<string> = ref("")
    const newestUrl:Ref<string> = ref("")
    const updateLoading:Ref<boolean> = ref<boolean>(true)

    const getOTAInfo = async () => {
      try {
        let {data,} = await queryCarVersionInfoUsingGET({carId:props.carId,})
        let { updateTime, newVersion, describe,url, } = data
        currentVersion.value = "V" + data.currentVersion
        lastDate.value = updateTime??"-/-"
        newestVersion.value = "V" + newVersion
        newestLog.value = describe
        newestUrl.value = url
      } catch (error) {
				
      }
    }

    const handleOk = async () => {
      emit("close")
    }

    const handleBeforeOk = (done:(closed:boolean) => void) => {
      upgradeUsingPOST({carId:props.carId,newVersion:newestVersion.value,url:newestUrl.value,}).then(() => {
        done(true)
      }).catch(() => {
        done(false)
      })
    };

    const handleCancel = () => {
      emit("close")
    }

    return {
      currentVersion,
      lastDate,
      newestVersion,
      newestDate,
      newestLog,
      updateLoading,
      handleOk,
      handleCancel,
      handleBeforeOk,
      getOTAInfo,
    }
  },
})
</script>
<style lang="less">
.ota-modal {

	.arco-modal-header {
		padding: 0 25px;
		background-color: #F3F7FB;
	}
	.arco-modal-title {
		font-weight: normal;
		color: #333;
		line-height: 16px;
	}

	.arco-modal-body {
		padding: 24px;
	}

	.ota-current {
		padding-bottom: 12px;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #000;
		line-height: 14px;
		border-bottom: 1px solid #F3F7FB;
	}

	.ota-newest-info {
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: normal;
		color: #000;
		line-height: 14px;
		padding-top: 12px;
	}

	.ota-newest-log {
		font-size: 14px;
		font-family: PingFang SC;
		font-weight: normal;
		color: #666;
		line-height: 22px;
		margin-top: 8px;
	}

	.arco-modal-footer {
		border: none;
		padding: 11px 24px;
		background-color: #F3F7FB;
	}
}
</style>
