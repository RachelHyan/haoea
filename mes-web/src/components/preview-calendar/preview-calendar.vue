<template>
  <div class="preview-calendar">
    <div class="preview-calendar-header">
      <div class="calendar-header-prev">
        <el-icon
          :size="24"
          @click="prevYear"
        >
          <DArrowLeft />
        </el-icon>
        <el-icon
          :size="24"
          @click="prevMonth"
        >
          <ArrowLeft />
        </el-icon>
      </div>
      <div class="calendar-header-info">
        <span class="header-info-year">{{ calendarYear }}</span> 年 <span class="header-info-month"> {{ calendarMonth }} </span> 月
      </div>
      <div class="calendar-header-next">
        <el-icon
          :size="24"
          @click="nextMonth"
        >
          <ArrowRight />
        </el-icon>
        <el-icon
          :size="24"
          @click="nextYear"
        >
          <DArrowRight />
        </el-icon>
      </div>
    </div>
    <ul class="preview-calendar-weeks">
      <li class="preview-calendar-week">
        日
      </li>
      <li class="preview-calendar-week">
        一
      </li>
      <li class="preview-calendar-week">
        二
      </li>
      <li class="preview-calendar-week">
        三
      </li>
      <li class="preview-calendar-week">
        四
      </li>
      <li class="preview-calendar-week">
        五
      </li>
      <li class="preview-calendar-week">
        六
      </li>
    </ul>
    <ul class="preview-calendar-days">
      <li
        v-for="(item,index) in calendarDays"
        :key="index"
        class="preview-calendar-day"
        :class="item.className"
      >
        <span class="calendar-day-item">{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ArrowLeft, ArrowRight, DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import type { PropType } from "vue";
import { defineComponent, ref } from "vue";
import type { PreviewCalendarRenderDay } from "./preview-calendar";

type DayItem = {
	value: number,
	className: string
}

export default defineComponent({
  name: "PreviewCalendar",
  components: {
    DArrowLeft,
    DArrowRight,
    ArrowLeft,
    ArrowRight,
  },
  props: {
    renderDay: {
      type: Function as PropType<(date:PreviewCalendarRenderDay) => string>,
      required: true,
    },
  },
  setup (props) {
    const calendarYear = ref<number>(dayjs().year())
    const calendarMonth = ref<number>(dayjs().month() + 1)
    const calendarDays = ref<DayItem[]>([])

    const diffPrevDays = (startWeek:number) => {
      let date = dayjs(`${calendarYear.value}-${calendarMonth.value}`)
      let start = date.subtract(1, "month").daysInMonth() - startWeek;
      let end = date.subtract(1, "month").daysInMonth();
      for (let index = start; index <= end; index++) {
        calendarDays.value.push({
          value: index,
          className: "preview-calendar-day--prev",
        })
      }
    }

    const diffCurrentDays = () => {
      let date = dayjs(`${calendarYear.value}-${calendarMonth.value}`)
      let start = 1;
      let end = date.daysInMonth();
      for (let index = start; index <= end; index++) {
        let isCurrentDay = dayjs().isSame(dayjs(`${calendarYear.value}-${calendarMonth.value}-${index}`),"day");
        let className = props.renderDay({
          year: calendarYear.value,
          month: calendarMonth.value,
          day: index,
        })
        calendarDays.value.push({
          value: index,
          className: isCurrentDay?"preview-calendar-day--current " + className:"" + className,
        })
      }
    }

    const diffNextDays = (lastWeek:number) => {
      let start = 1;
      let end = 6 - lastWeek;
      for (let index = start; index <= end; index++) {
        calendarDays.value.push({
          value: index,
          className: "preview-calendar-day--next",
        })
      }
    }

    const diffCalendarDays = () => {
      calendarDays.value = []
      let startWeek = dayjs(`${calendarYear.value}-${calendarMonth.value}`).startOf("month").day()
      let lastWeek = dayjs(`${calendarYear.value}-${calendarMonth.value}`).endOf("month").day()
      if (startWeek > 0) {
        diffPrevDays(startWeek - 1)
      }
      diffCurrentDays()
      if (lastWeek < 6) {
        diffNextDays(lastWeek)
      }
    }

    diffCalendarDays()

    const prevYear = () => {
      let date = dayjs(`${calendarYear.value}-${calendarMonth.value}`).subtract(1, "year")
      calendarYear.value = date.get("year");
      calendarMonth.value = date.get("month") + 1;
      diffCalendarDays();
    }

    const nextYear = () => {
      let date = dayjs(`${calendarYear.value}-${calendarMonth.value}`).add(1, "year");
      calendarYear.value = date.get("year");
      calendarMonth.value = date.get("month") + 1;
      diffCalendarDays();
    }

    const prevMonth = () => {
      let date = dayjs(`${calendarYear.value}-${calendarMonth.value}`).subtract(1, "month")
      calendarYear.value = date.get("year");
      calendarMonth.value = date.get("month") + 1;
      diffCalendarDays();
    }

    const nextMonth = () => {
      let date = dayjs(`${calendarYear.value}-${calendarMonth.value}`).add(1, "month")
      calendarYear.value = date.get("year");
      calendarMonth.value = date.get("month") + 1;
      diffCalendarDays();
    }

    return {
      calendarYear,
      calendarMonth,
      calendarDays,
      prevYear,
      nextYear,
      prevMonth,
      nextMonth,
      diffCalendarDays,
    }
  },
})

</script>
<style lang="less">
.preview-calendar {
	width: 294px;
	padding: 0 16px;
	background-color: #fff;
	margin-top: 24px;

	&-header {
		height: 32px;
		padding: 8px 6px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.calendar-header-info {
			font-size: 18px;
			color: #333;
			user-select: none;
		}

		.calendar-header-prev,.calendar-header-next {
			display: flex;
			align-items: center;
			gap: 4px;

			.el-icon {
				font-size: 24px;
				cursor: pointer;
			}
		}
	}

	&-weeks {
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid #999;
	}

	&-week {
		width: 42px;
		padding: 12px 0;
		font-size: 14px;
		text-align: center;
	}

	&-days {
		padding: 14px 0;
		display: flex;
		flex-wrap: wrap;
	}

	&-day {
		width: 42px;
		height: 42px;
		font-size: 14px;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	&-day--prev, &-day--next {
		color: #666;
	}

	&-day--current {
		color: #409EFF;
	}

	&-day--work::after {
		content: " ";
		width: 36px;
		height: 36px;
		border: 1px solid brown;
		border-radius: 50%;
		position: absolute;
		top: 3px;
		left: 3px;
	}
}
</style>
