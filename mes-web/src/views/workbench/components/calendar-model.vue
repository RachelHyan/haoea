<template>
  <div class="calendar-model">
    <div class="calendar-model__header">
      <div class="calendar-model__header-left">
        <img
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/workbench/calendar-icon.png"
          alt=""
          width="20"
          height="20"
        >日历
      </div>
      <div class="calendar-model__header-center">
        {{ curDate }}
      </div>
      <div class="calendar-model__header-right">
        <el-button
          style="padding: 1px;height: 16px;"
          :icon="ArrowLeft"
          @click="selectDate('prev-month')"
        />
        <el-button
          style="padding: 1px;height: 16px;"
          :icon="ArrowRight"
          @click="selectDate('next-month')"
        />
      </div>
    </div>
    <div class="calendar-model__content">
      <div class="week-header">
        <div
          v-for="d in weekHeader"
          :key="d"
        >
          {{ d }}
        </div>
      </div>
      <div class="week-day">
        <div
          v-for="(item, index) in 42"
          :key="index"
          class="every-day"
        >
          <div
            :class="{'other-day': isOtherDay(item), 'now-day': isNowDay(item)}"
          >
            {{ getDate(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "CalendarModel",
  setup () {
    const year = ref(); // 年
    const month = ref(); // 月
    const day = ref(); // 日
    const curDate = ref(""); // 当前日期
    const weekHeader = ref(["周日", "周一", "周二", "周三", "周四", "周五", "周六"])

    const padZero = (num: number) => {
      return num < 10 ? `0${num}` : `${num}`;
    };

    const getInitDate = () => { // 得到初始日期 减低date数据的复杂度 给个初始值为null 只调用一次new Date();
      const date = new Date();
      year.value = date.getFullYear();
      month.value = date.getMonth() + 1;
      day.value = date.getDate();

      curDate.value = `${year.value}-${padZero(month.value)}-${padZero(day.value)}`;
    }

    const selectDate = (type: string) => {
      if (type === "prev-month") {
        if(month.value === 1) {
          month.value = 12;
          year.value --;
        }else {
          month.value --;
        }
      } else if (type === "next-month") {
        if(month.value === 12) {
          month.value = 1;
          year.value ++;
        }else {
          month.value ++;
        }
      }
    }

    const isOtherDay = (item: number) => {
      if (item - beginDay.value <= 0 || item - beginDay.value > curDays.value) {
        return true;
      }
      return false;
    };

    const isNowDay = (item: number) => {
      if (item - beginDay.value > 0 && item - beginDay.value <= curDays.value) {
        return (
          `${year.value}-${padZero(month.value)}-${padZero(item - beginDay.value)}` ===
          curDate.value
        );
      }
      return false;
    };

    const getDate = (item: number) => {
      if (item - beginDay.value <= 0) {
        return item - beginDay.value + preDays.value;
      } else if (item - beginDay.value > 0 && item - beginDay.value <= curDays.value) {
        return item - beginDay.value;
      } else {
        return item - beginDay.value - curDays.value;
      }
    };

		 // 当月第一天是周日
		 const beginDay = computed(() => {
      return new Date(year.value, month.value - 1, 1).getDay();
    })
    // 当月有多少天
    const curDays = computed(() => {
      return new Date(year.value, month.value, 0).getDate();
    })
    // 上月有多少天
    const preDays = computed(() => {
      return new Date(year.value, month.value - 1, 0).getDate();
    })


    onMounted(getInitDate)

    return {
      ArrowLeft,
      ArrowRight,
      year,
      month,
      day,
      curDate,
      selectDate,
      isOtherDay,
      isNowDay,
      getDate,
      beginDay,
      curDays,
      preDays,
      weekHeader,
    }
  },
})
</script>

<style lang="less">
.calendar-model {
	width: 444px;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 46px;

		&-left {
			font-size: 20px;
			font-weight: 500;
			letter-spacing: 5px;
			display: flex;
			align-items: center;

			img {
				margin-right: 5px;
			}
		}

		&-center {
			font-size: 20px;
			font-weight: 600;
		}
	}

	&__content {

		.week-header {
			display: flex;
			justify-content: space-between;
			margin-bottom: 16px;
		}

		.week-header > div{
			flex: 1;
			line-height: 29px;
			text-align: center;
		}

		.week-day {
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			// 内容居中
			justify-items: center;
		}

		.every-day{
			display: inline-block;
			width: 29px;
			height: 29px;
			line-height: 29px;
			text-align: center;
			cursor: pointer;
			font-weight: 500;
			padding-bottom: 16px;
		}

		.other-day{
				color: #999898;
		}
		/* 当前日期  */
		.now-day{
			border-radius: 50%;
			background: #6EA1FF;
			color: #fff;
		}
	}
}
</style>
