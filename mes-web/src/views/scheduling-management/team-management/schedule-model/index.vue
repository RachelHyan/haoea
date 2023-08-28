<template>
  <el-dialog
    class="schedule-model"
    :model-value="visible"
    destroy-on-close
    align-center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="$emit('close')"
  >
    <template #header>
      <div class="text--border-left">
        新增规则
      </div>
    </template>
    <div class="schedule-model-container">
      <div class="container--right">
        <el-radio-group
          v-model="periodList.periodType"
          label="type"
          class="radio-group"
        >
          <el-radio-button
            label="week"
            @click="periodList.periodType = 'week'"
          >
            周重复
          </el-radio-button>
          <el-radio-button
            label="month"
            @click="periodList.periodType = 'month'"
          >
            月重复
          </el-radio-button>
          <el-radio-button
            label="next-day"
            @click="periodList.periodType = 'next-day'"
          >
            隔天重复
          </el-radio-button>
        </el-radio-group>
        <div class="options">
          <el-select
            v-if="periodList.periodType === 'week'"
            v-model="periodList.periodValue"
            multiple
            placeholder="请选择"
            class="week--option"
            @change="weekChange"
          >
            <el-option
              v-for="item in weekList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div
            v-show="periodList.periodType === 'month'"
            class="month--option"
          >
            <div
              v-for="n in 31"
              :key="n"
              class="month--option__item"
              :class="{ 'month--option__item--active': periodList.periodValue.includes(n)}"
              @click="monthClick(n)"
            >
              {{ n }}
            </div>
          </div>
          <div
            v-if="periodList.periodType === 'next-day'"
            class="day--option"
          >
            <el-input
              v-model="periodList.periodValue[0]"
              @input="numChange"
            >
              <template #prepend>
                <el-icon
                  style="cursor:pointer"
                  @click="numCount('minus')"
                >
                  <Minus />
                </el-icon>
              </template>
              <template #append>
                <el-icon
                  style="cursor:pointer"
                  @click="numCount('plus')"
                >
                  <Plus />
                </el-icon>
              </template>
            </el-input>
          </div>
        </div>
      </div>
      <div class="container--right">
        <preview-calendar
          ref="previewCalendarRef"
          :render-day="renderDay"
        />
      </div>
    </div>
    <template #footer>
      <el-space>
        <el-button
          type="danger"
          plain
          @click="$emit('close')"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click="submit"
        >
          确定
        </el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { PreviewCalendar } from "@/components";
import dayjs from "dayjs";
import { defineComponent, reactive, ref, watch } from "vue";
export default defineComponent({
  name: "AddUserDialog",
  components: {
    PreviewCalendar,
  },
  props:{
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    jobCreateTime: {
      type: String,
      required: true,
      default: "",
    },
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    currentData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  emits: ["close", "finish"],
  setup (props, { emit, }) {
    const addUserRef = ref();
    const previewCalendarRef = ref();
    const weekList = [
      {
        label: "周一",
        value: 1,
      },
      {
        label: "周二",
        value: 2,
      },
      {
        label: "周三",
        value: 3,
      },
      {
        label: "周四",
        value: 4,
      },
      {
        label: "周五",
        value: 5,
      },
      {
        label: "周六",
        value: 6,
      },
      {
        label: "周日",
        value: 0,
      }
    ];
    const periodList = reactive<any>({
      periodType:props.currentData.periodType || "week",
      periodValue:props.currentData.periodValue || [] as number[],
    });

    const weekChange = (value:any) => {
      periodList.periodValue = value;
    };

    const numChange = (value:any) => {
      if (value[0] === "0") {
        value = value.slice(1);
      }
      periodList.periodValue[0] = Number(value.replace(/\D/g, ""));
    };

    const numCount = (type:string) => {
      if (type === "plus") {
        periodList.periodValue[0]++;
      } else {
        if (periodList.periodValue[0] === 0) return;
        periodList.periodValue[0]--;
      }
    };

    const monthClick = (n:number) => {
      if (periodList.periodValue.includes(n)) {
        periodList.periodValue = periodList.periodValue.filter((item:any) => item !== n);
      } else {
        periodList.periodValue.push(n);
      }
    };

    const renderDay = (date:any) => {
      let startDate = dayjs(props.jobCreateTime);
      let currentDate = dayjs(`${date.year}-${date.month}-${date.day}`);
      let diffDay = currentDate.diff(startDate,"day");
      if(diffDay < 0) {
        return "";
      }
      switch (periodList.periodType) {
      case "week":
        let day = dayjs(`${date.year}-${date.month}-${date.day}`).day();
        return periodList.periodValue.includes(day) ? "preview-calendar-day--work" : "";
      case "month":
        return periodList.periodValue.includes(date.day)?"preview-calendar-day--work":"";
      case "next-day":
        let match = diffDay % (periodList.periodValue[0] + 1) === 0;
        return match?"preview-calendar-day--work":"";
      default:
        return "";
      }
    };

    const submit = () => {
      emit("finish",periodList);
    };

    watch(() => periodList.periodType,(val) => {
      switch (val) {
      case "week":
        periodList.periodValue = [];
        break;
      case "month":
        periodList.periodValue = [];
        break;
      case "next-day":
        periodList.periodValue = [0];
        break;
      default:
      }
    });

    watch(periodList,() => {
      previewCalendarRef.value.diffCalendarDays();
    });

    return {
      addUserRef,
      previewCalendarRef,
      weekList,
      periodList,
      weekChange,
      numChange,
      numCount,
      monthClick,
      renderDay,
      submit,
    }
  },
})
</script>

<style lang="less">
.schedule-model {
	height: 600px;
	width: 800px;

	.schedule-model-container {
		height: 100%;
		display: flex;

		.container--right {
			width: 40%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.radio-group {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20px;
			}

			.options {
				width: 100%;
				height: 150px;
				display: flex;
				justify-content: center;
				align-items: center;

				.month--option {
					width: 235px;
					border: 1px solid #ebeef5;
					display: grid;
					grid-template-columns: repeat(7, 1fr);

					.month--option__item {
						width: 30px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						border: 2px solid transparent;
						border-radius: 50%;
						cursor: pointer;
						&:hover {
							background-color: #ebeef5;
						}
					}

					.month--option__item--active {
						border-color: #ff0000;
					}
				}

				.day--option {
					width: 235px;
					// height: 170px;
				}
			}
		}
	}




	
}
</style>
