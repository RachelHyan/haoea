<template>
  <div class="calendar">
    <div style="padding:16px 48px">
      <div class="calendar--header">
        <el-button
          plain
          style="padding: 3px;height: 22px;"
          :icon="ArrowLeft"
          @click="selectDate('prev-month')"
        />
        <el-button
          plain
          style="padding: 3px;height: 22px;"
          :icon="ArrowRight"
          @click="selectDate('next-month')"
        />
        <span class="calendar--header--date">{{ year }}年{{ `${month > 9 ? month : '0' + month}` }}月</span>
      </div>
      <div
        class="calendar--body"
      >
        <ul class="calendar--body--week">
          <li
            v-for="week in weeks"
            :key="week"
          >
            {{ week }}
          </li>
        </ul>
        <table class="calendar--table">
          <tr
            v-for="(dates, i) in daysArr"
            :key="i"
            class="calendar--table--date"
          >
            <td
              v-for="(item, index) in dates"
              :key="index"
              class="calendar--table--date--item"
              :class="{'notCurMonth':!item.isCurMonth,'isSelect':item.isSlected,'disabled':range(item.timestamp)}"
              @click="handleItemClick(item)"
            >
              <div>{{ item.day }}</div>
              <div style="font-size:14px">
                {{ item.tips }}
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <el-divider style="margin:0 0 16px 0;" />
    <el-row
      :gutter="24"
      style="padding:0 35px 0 48px"
      class="calendar--footer"
    >
      <el-col :span="13">
        <el-button @click="reset">
          重置
        </el-button>
      </el-col>
      <slot name="handle" />
    </el-row>
  </div>
</template>

<script lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AppCalendar",
  emits: ["dateSelected","update:visible"],
  setup (props,{emit,}) {
    const year = ref(); // 年
    const month = ref(); // 月
    const days = ref(); // 日
    const daysArr = ref(); // 日历二维数组
    const weeks = ref(["日", "一", "二", "三", "四", "五", "六"]); // 周
    const moveIndex = ref<number[]>([]); // 滑动的索引
    const canMove = ref(false); // 当moveIndex数组有一个值时，可以触发滑动
    const chooseDateList = ref<number[]>([]) // 选择的日期列表
    const chooseDate = ref() // 选择的日期

    // 获取当前年月有多少天
    const getDays = (year:any, month:any) => {
      return new Date(year, month, 0).getDate();
    };

    // 获取当前年月的第一天是星期几
    const getWeek = (year:any, month:any) => {
      return new Date(year, month - 1, 1).getDay();
    };

    // 获得当前月份的日期列表
    const pushDays = () => {
      days.value = [];
      // 将这个月多少天加入数组days
      const m = `${month.value > 9 ? month.value : "0" + month.value}`;
      for (let i = 1; i <= getDays(year.value, month.value); i++) {
        const d = `${i > 9 ? i : "0" + i}`,
          date = `${year.value}-${m}-${d}`;
        days.value.push({
          day: d,
          month: m,
          year: `${year.value}`,
          date,
          timestamp: new Date(date).getTime(),//转换时间戳
          tips:"",
          isCurMonth: true,
          isSlected: false,
        })
      }
      //获取上个月的日期
      getLastMonthDays()
      //获取下个月的日期
      getNextMonthDays()

      daysArr.value = handleFormatDate(days.value)
      activeStyle()
    }

    // 获得下个月的日期列表
    const getNextMonthDays = () => {
      const m = month.value < 12 ? month.value + 1 : 1,
        y = month.value < 12 ? year.value : year.value + 1,
        len = 42 - getDays(year.value, month.value) - getWeek(year.value, month.value),
        _m = `${m > 9 ? m : "0" + m}`;
      //将下个月要显示的天数加入days
      for (let i = 1; i <= len; i++) {
        const _d = `${i > 9 ? i : "0" + i}`,
          date = `${y}-${_m}-${_d}`
        days.value.push({
          day: _d,
          month: _m,
          year: `${y}`,
          date,
          timestamp: new Date(date).getTime(),
          tips:"",
          isCurMonth: false,
          isSlected: false,
        })
      }
    }

    // 获得上个月的日期列表
    const getLastMonthDays = () => {
      const m = month.value > 1 ? month.value - 1 : year.value > 1970 ? 12 : 1,
        y = month.value > 1 ? year.value : year.value > 1970 ? year.value - 1 : 1970,
        len = getWeek(year.value, month.value),
        lastMonthDays = getDays(year.value, month.value - 1);
      //将上个月要显示的天数加入days
      for (let i = 0; i < len; i++) {
        const _m = `${m > 9 ? m : "0" + m}`,
          date = `${y}-${_m}-${lastMonthDays - i}`
        days.value.unshift({
          day: `${lastMonthDays - i}`,
          month: _m,
          year: `${y}`,
          date,
          timestamp: new Date(date).getTime(),
          tips:"",
          isCurMonth: false,
          isSlected: false,
        })
      }
    }

    // 选择日期
    const selectDate = (type: string) => {
      if (type === "prev-month") { // 上个月
        if (month.value > 1) {
          month.value = month.value - 1;
        } else if (year.value > 1970) {
          month.value = 12;
          year.value = year.value - 1;
        }
        pushDays()
      } else if (type === "next-month") { // 下个月
        if (month.value < 12) {
          month.value = month.value + 1;
        } else {
          month.value = 1;
          year.value = year.value + 1;
        }
        pushDays()
      } else if (type === "today") { // 今天
        const date = new Date();
        year.value = date.getFullYear();
        month.value = date.getMonth() + 1;
        days.value = date.getDate();
        pushDays();
      }
    }

    // 处理日期
    const handleFormatDate = (arr: any) => {
      let arr2 = [];
      for (let i = 0; i < 7; i++) {
        let temp:any = arr.slice(i * 7, i * 7 + 7);
        arr2.push(temp);
      }
      return arr2;
    }

    const handleItemClick = (item: any) => {
      // 滑动模式下，第一次点击是开始，第二次点击是结束
      if(chooseDateList.value.length === 0){
        chooseDate.value = item.date;
      }
      if(chooseDateList.value.length === 1) {
        canMove.value = false;
      }
      if(chooseDateList.value.length === 2) {
        chooseDate.value = item.date;
        range()
        days.value.forEach((item:any) => {
          item.isSlected = false;
          item.isRengeSlected = false;
        })
        chooseDateList.value.length = 0;
        moveIndex.value.length = 0;
      }
      chooseDateList.value.push(item.date);
      moveIndex.value.push(item.timestamp);
      moveIndex.value.sort((a, b) => a - b)
      activeStyle()
      chooseDateList.value.length !== 0 && emit("dateSelected",chooseDateList.value)
    }

    // 选中样式
    const activeStyle = () => {
      days.value.forEach((item:any) => {
        item.tips = "";
        item.timestamp === moveIndex.value[0] && (item.tips = "开始",item.isSlected = true);
        item.timestamp === moveIndex.value[1] && (item.tips = "结束",item.isSlected = true);
        if(moveIndex.value.length === 2 && item.timestamp >= moveIndex.value[0] && item.timestamp <= moveIndex.value[1]){
          item.isSlected = true;
        }
      })
    }

    // 重置
    const reset = () => {
      days.value.forEach((item:any) => {
        item.isSlected = false;
        item.tips = "";
      })
      moveIndex.value.length = 0;
      chooseDateList.value.length = 0;
      chooseDate.value = undefined;
      range();
    }

    // 范围限制
    const range = (times = 0) => {
      if(chooseDateList.value.length === 0) {
        return false;
      }else {
        const timestamp = new Date(chooseDate.value).getTime();
        if(times - timestamp < 0 || times - timestamp > 30 * 24 * 60 * 60 * 1000) {
          return true;
        }
      }
    }

		
    selectDate("today")
		
    return {
      year,
      month,
      days,
      daysArr,
      weeks,
      ArrowLeft,
      ArrowRight,
      selectDate,
      handleItemClick,
      reset,
      range,
    }
  },
})
</script>

<style lang="less">
.calendar {

	&--header {
		margin-bottom: 13px;
		display: flex;
		align-items: center;

		&--date {
			font-size: 20px;
			font-weight: 500;
			display: inline-block;
			margin-left: 8px;
		}
	}

	&--body {
		width: 100%;
		height: 100%;
			
		&--week {
			width: 100%;
			display: flex;
			font-size: 16px;
			box-sizing: border-box;
			background: rgba(47,84,235,0.04);
			border:none;

			li {
				width: 100%;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
		}
	}

	&--table {
		width: 100%;
		height: 100%;
		border-collapse:collapse;
		border-spacing:0;
		border-left:1px solid #DDE0E3;
		border-top:1px solid #DDE0E3;

		&--date {
			width: 100%;
			height: 100%;
			display: flex;
			font-size: 16px;
			flex-wrap: wrap;
			box-sizing: border-box;


			td {
				position: relative;
				cursor: pointer;
				width: 14.28%;
				height: 48px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				border-right:1px solid #DDE0E3;
				border-bottom:1px solid #DDE0E3;
			}

			.notCurMonth {
				color: #90929D;
			}

			.isSelect {
				background: #1D51F4;
				color: #fff;
			}

			.disabled {
				background: rgba(192, 196, 204, 0.2);
  			color: #c0c4cc;
				pointer-events: none;
			}
		}
	}


}

</style>
