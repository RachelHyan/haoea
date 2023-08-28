<template>
  <el-pro-dialog
    class="on-duty-info"
    :model-value="modelValue"
    title="当班信息"
    width="494px"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
    @closed="$emit('closed')"
  >
    <div class="on-duty-info__header">
      <img
        :src="curMarkerData.avatar"
        alt=""
        width="61"
        height="61"
        class="on-duty-info__header-avatar"
      >
      <span class="on-duty-info__header-name">{{ curMarkerData.name }}</span>
      <el-tag
        size="small"
        :type="curMarkerData.type === 'Manual_cleaning' ? 'success' : ''"
      >
        {{ type }}
      </el-tag>
    </div>
    <div class="on-duty-info__task">
      <div class="on-duty-info__task-title">
        作业数据
      </div>
      <div class="on-duty-info__task-body">
        <div class="on-duty-info__task-body--item">
          <span class="on-duty-info__task-body--item-value">{{ formatSeconds(infoData?.actualJobDurationTotal || 0) }}</span>
          <span class="on-duty-info__task-body--item-label">作业时长</span>
        </div>
        <div class="on-duty-info__task-body--item">
          <span class="on-duty-info__task-body--item-value">{{ parseFloat((infoData.actualJobMileageTotal / 1000).toFixed(2)) }}km</span>
          <span class="on-duty-info__task-body--item-label">作业里程</span>
        </div>
        <div class="on-duty-info__task-body--item">
          <span class="on-duty-info__task-body--item-value">{{ infoData.allotCountTotal }}</span>
          <span class="on-duty-info__task-body--item-label">预警次数</span>
        </div>
      </div>
    </div>
    <div class="on-duty-info__shift">
      <div class="on-duty-info__shift-title">
        排班信息
      </div>
      <div
        v-for="(item,index) in infoData.list"
        :key="index"
        class="on-duty-info__shift-body"
      >
        <div class="on-duty-info__shift-body__header">
          <div class="on-duty-info__shift-body__header-time">
            {{ item.jobStartTime }}-{{ item.jobEndTime }}
          </div>
          <div
            v-show="curMarkerData.type !== 'Manual_cleaning'"
            class="on-duty-info__shift-body__header-name"
          >
            司机：{{ item.userName || '暂无' }}
          </div>
        </div>
        <div class="on-duty-info__shift-body__content">
          <div class="on-duty-info__shift-body__content--item">
            <span class="on-duty-info__shift-body__content--item-value">{{ formatSeconds(item.actualJobDuration) }}</span>
            <span class="on-duty-info__shift-body__content--item-label">作业时长</span>
          </div>
          <div class="on-duty-info__shift-body__content--item">
            <span class="on-duty-info__shift-body__content--item-value">{{ parseFloat((item.actualJobMileage / 1000).toFixed(2)) }}km</span>
            <span class="on-duty-info__shift-body__content--item-label">作业里程</span>
          </div>
          <div class="on-duty-info__shift-body__content--item">
            <span class="on-duty-info__shift-body__content--item-value">{{ item.allotCount }}</span>
            <span class="on-duty-info__shift-body__content--item-label">预警次数</span>
          </div>
        </div>
        <el-progress
          class="on-duty-info__shift-body__progress"
          :percentage="Math.round(item.finishRate * 100)"
        />
      </div>
    </div>
  </el-pro-dialog>
</template>

<script lang="ts">
import { mesIndexQueryUserOrCarCurrentShiftInfo } from "@/api/mes/indexController";
import { formatSeconds } from "@/utils/fn";
import { dayjs } from "element-plus";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "OnDutyInfo",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    curMarkerData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [ "update:modelValue", "closed" ],
  setup (props) {
    const infoData = ref<MES.UserOrCarCurrentShiftInfo | any>();

    const type = computed(() => {
      return props.curMarkerData.type === "Manual_cleaning" ? "人工清扫" : "车辆作业";
    });

    const fetchData = async(params: MES.IndexQueryUserOrCarCurrentShiftInfoParams) => {
      try {
        const {data,} = await mesIndexQueryUserOrCarCurrentShiftInfo(params);
				
        infoData.value = data;
      } catch (error) {
				
      }
    }

    return {
      dayjs,
      infoData,
      type,
      fetchData,
      formatSeconds,
    }
  },
})
</script>

<style lang="less">
.on-duty-info {

	.el-dialog__body {
		max-height: 653px;
		overflow: auto;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	&__header {
		display: flex;
		align-items: center;

		&-avatar {
			border-radius: 50%;
		}

		&-name {
			font-size: 18px;
			font-weight: bold;
			color: #000000;
			margin: 0 14px 0 10px;
		}
	}

	&__task,&__shift {
		&-title {
			font-size: 14px;
			font-weight: 500;
			color: #161B2A;
			margin: 40px 0 26px 0;
		}
	}

	&__task::after {
		content: "";
		display: block;
		width: 100%;
		height: 4px;
		background: #F6F8FA;
	}

	&__task-body,&__shift-body__content {
		display: flex;
		justify-content: space-evenly;
		align-items: center;

		&--item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;

			&-value {
				font-size: 20px;
				font-weight: 500;
				color: #181B28;
			}
		}
	}

	&__task-body {
		margin-bottom: 20px;
	}
	
	&__shift-body__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 54px 20px;

		&-time {
			font-size: 20px;
			color: #000000;
		}

		&-name {
			font-size: 14px;
			color: rgba(0, 0, 0, .6);
		}
	}

	&__shift-body__progress {
		// width: 100%;
		padding: 20px 20px 20px 60px;

		.el-progress__text {
			font-size: 12px;
			color: #0487FF;
		}
		
		.el-progress-bar__inner {
			background: linear-gradient(90deg, #03B1FC 0%, #0487FF 100%);
		}

		.el-progress-bar__outer {		
			background: #D8D8D8;
		}
	}

	&__shift-body {

		&:not(:last-child)::after {
			content: "";
			display: block;
			width: 400px;
			height: 1px;
			margin: 0 auto 30px;
			background: #EAEAEA;
		}
	}
}

</style>
