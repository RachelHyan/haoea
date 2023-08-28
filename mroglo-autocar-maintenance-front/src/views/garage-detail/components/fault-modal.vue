<template>
  <a-modal
    :visible="visible"
    unmount-on-close
    width="600px"
    title="故障列表"
    title-align="start"
    :footer="false"
    :ok-button-props="{loading:true}"
    :cancel-button-props="{type:'outline'}"
    class="fault-modal"
    @before-open="getFaultData"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :model="model"
      label-align="left"
      layout="inline"
      class="fault-modal-form"
    >
      <a-form-item
        label="故障类型"
        field="incidentType"
      >
        <a-select
          v-model="model.incidentType"
          allow-clear
          @change="getFaultData"
        >
          <a-option value="DOMAIN_CONTROLLER">
            域控制器故障
          </a-option>
          <a-option value="CRANE_BRAKE">
            行车制动故障
          </a-option>
          <a-option value="PARKING_BRAKE">
            驻车制动故障
          </a-option>
          <a-option value="PRIMARY_LIDAR">
            主激光雷达故障
          </a-option>
          <a-option value="STEERING_SYSTEM">
            转向系统故障
          </a-option>
          <a-option value="JOB_AGENCIES">
            作业机构故障
          </a-option>
          <a-option value="WALKING_MOTOR">
            行走电机故障
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="状态"
        field="isCheck"
      >
        <a-select
          v-model="model.isCheck"
          allow-clear
          @change="getFaultData"
        >
          <a-option :value="1">
            已查看
          </a-option>
          <a-option :value="0">
            未查看
          </a-option>
        </a-select>
      </a-form-item>
    </a-form>
    <ul class="fault-modal-container">
      <li
        v-for="item in faultData"
        :key="item.incidentId"
        class="fault-modal-item"
      >
        <div class="fault-modal-item-info">
          <div class="item-info-left">
            <p
              class="item-info-name"
              :class="item.isCheck?'':'unread'"
            >
              {{ item.incidentName }}
            </p>
            <p class="item-info-time">
              {{ item.createTime }}
            </p>
          </div>
          <p
            class="fault-modal-item-unfold"
            @click="triggerUnfold(item)"
          >
            {{ item.unfold?'收起':'展开' }}
            <icon-caret-up
              v-if="item.unfold"
              style="color:#1769FA"
            />
            <icon-caret-down
              v-else
              style="color:#1769FA"
            />
          </p>
        </div>
        <p
          v-show="item.unfold"
          class="fault-modal-item-detail"
        >
          {{ item.incidentInfo }}
        </p>
      </li>
    </ul>
  </a-modal>
</template>
<script lang="ts">
import { checkMsgUsingPOST, queryIncidentPageListUsingGET } from "@/api/shijianguanli";
import { IconCaretDown, IconCaretUp } from "@arco-design/web-vue/es/icon";
import type { Ref } from "vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name:"FaultModal",
  components:{
    IconCaretDown,
    IconCaretUp,
  },
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
    const model = reactive<{incidentType?:string,isCheck?:number}>({incidentType:undefined,isCheck:undefined,})
    const faultData:Ref<(API.shijianliebiaoduixiang & {unfold?:boolean})[]> = ref<(API.shijianliebiaoduixiang & {unfold?:boolean})[]>([])
    const pagination = reactive<{current:number,pageSize:number}>({current:1,pageSize:10,})

    const getFaultData = async () => {
      try {
        let {data,} = await queryIncidentPageListUsingGET({carId:props.carId,...pagination,...model,})
        faultData.value = data
      } catch (error) {
				
      }
    }

    const triggerUnfold = async (item:API.shijianliebiaoduixiang & {unfold?:boolean}) => {
      item.unfold = !item.unfold
      item.isCheck = 1
      try {
        let { data, } = await checkMsgUsingPOST({incidentId:item.incidentId,})
        console.log(data);
      } catch (error) {
				
      }
    }

    const handleOk = async () => {
      emit("close")
    }

    const handleCancel = () => {
      emit("close")
    }

    return {
      model,
      faultData,
      triggerUnfold,
      handleOk,
      handleCancel,
      getFaultData,
    }
  },
})
</script>
<style lang="less">
.fault-modal {
	.arco-modal-body {
		padding: 24px;
	}

	&-form {
		width: 504px;
		padding: 9px 24px;
		background-color: #f3f7fb;
		justify-content: space-between;
		flex-wrap: nowrap;

		.arco-form-item-wrapper-col {
			width: 160px;
		}
	}
}

.fault-modal-container {
	border: 1px solid #E6E6E6;
}

.fault-modal-item {
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid #E6E6E6;

	&-info {
		height: 54px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 16px 0 24px;

		.item-info-name {
			font-size: 14px;
			color: #000;
			line-height: 18px;
			margin-bottom: 5px;
			&.unread {
				position: relative;

				&::before {
					content: "";
					width: 4px;
					height: 4px;
					background-color: #f61414;
					border-radius: 50%;
					position: absolute;
					top: 7px;
					left: -12px;
				}
			}
		}

		.item-info-time {
			font-size: 12px;
			color: rgba(0,0,0,0.6);
			line-height: 12px;
		}
	}

	&-unfold {
		font-size: 14px;
		color: #000;
		line-height: 20px;
		cursor: pointer;
	}

	&-detail {
		padding: 12px 16px 12px 24px;
		background-color: #F4F4F5;
		font-size: 14px;
		line-height: 20px;
		color: #000;
	}

	&:nth-last-of-type(1) {
		border: none;
	}
}
</style>
