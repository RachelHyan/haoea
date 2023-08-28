<template>
  <div
    class="basic-information"
    :style="footerTab === 'Manual_cleaning' ? {height:'15%'} : {height: '21%'}"
  >
    <data-card-header title="基本情况" />
    <div
      class="basic-information__body"
      :style="style"
    >
      <div
        v-for="(item,index) in data"
        :key="index"
        class="basic-information__body-item"
        :style="footerTab === 'Manual_cleaning' ? {width: '114px'} : {width:'147px'}"
      >
        {{ item.name + '：' }}<label>{{ item.number }}</label>{{ item.unit }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import DataCardHeader from "../data-card-header.vue";

export default defineComponent({
  name: "BasicInformation",
  components: {
    DataCardHeader,
  },
  props: {
    footerTab: {
      type: String,
      default: "Manual_cleaning",
    },
  },
  setup (props) {
    const manualData = [
      {name:"网格", number: 16, unit:"个",},
      {name:"作业对象", number: 178, unit:"个",},
      {name:"今日排班", number: 198, unit:"个",}
    ]

    const vehicleData = [
      {name:"网格", number: 1, unit:"个",},
      {name:"作业对象", number: 60, unit:"个",},
      {name:"排班人员", number: 30, unit:"人",},
      {name:"排班车辆", number: 30, unit:"辆",}
    ]

    const data = computed(() => {
      return props.footerTab === "Manual_cleaning" ? manualData : vehicleData
    })

    const style = computed(() => {
      return props.footerTab === "Manual_cleaning" ? {gridTemplateColumns: "1fr 1fr 1fr",padding: "17px 20px",} : {gridTemplateColumns: "1fr 1fr",gridTemplateRows: "1fr 1fr",padding: "17px 50px",}
    })
		

    return {
      data,
      style,
    }
  },
})
</script>

<style lang="less">
.basic-information {
	width: 100%;
	height: 21%;
	box-sizing: border-box;
	background: #0B2955;	
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&__body {
		display: grid;
		grid-row-gap: 10px;
		grid-column-gap: 10px;
		

		&-item {
			height: 45px;
			background: linear-gradient(138deg, rgba(36, 219, 247, .2) 0%, rgba(72, 150, 255, .2) 100%);
			border-radius: 5px;
			color: rgba(225, 255, 255, .8);
			font-size: 13px;
			line-height: 45px;
			text-align: center;

			label {
				font-size: 20px;
				color: #fff;
			}
		}
	}
}
</style>
