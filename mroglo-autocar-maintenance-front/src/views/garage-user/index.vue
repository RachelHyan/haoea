<template>
  <div class="dashboard-garage-user page-root">
    <search-form
      :columns="searchColumns"
      @search="getGarageData"
    />
    <div class="garage-user-body">
      <a-list
        :data="garageData"
        :bordered="false"
      >
        <template #item="{item}">
          <div class="garage-user-item">
            <div class="garage-item-info">
              <p class="garage-item-info-num">
                {{ item.carNumber }}
              </p>
              <p class="garage-item-info-work">
                {{ item.workStatus??'—' }}
              </p>
            </div>
            <div class="garage-item-extra">
              <p class="garage-item-extra-area">
                {{ item.workArea }}
              </p>
              <p class="garage-item-extra-mileage">
                {{ item.totalMileage??'—' }}
              </p>
            </div>
            <div class="garage-item-state">
              <div class="garage-item-state-item">
                <p class="garage-item-state-item-value">
                  {{ item.electric??'-/-' }}
                </p>
                <div class="garage-item-state-item-name">
                  <img
                    src="@/assets/icons/garage/icon-electricity.webp"
                    alt=""
                    class="garage-item-state-item-icon"
                  >
                  电量
                </div>
              </div>
              <div class="garage-item-state-item">
                <p class="garage-item-state-item-value">
                  {{ item.waterTank??'-/-' }}
                </p>
                <div class="garage-item-state-item-name">
                  <img
                    src="@/assets/icons/garage/icon-water.webp"
                    alt=""
                    class="garage-item-state-item-icon"
                  >
                  水量
                </div>
              </div>
              <div class="garage-item-state-item">
                <p class="garage-item-state-item-value">
                  {{ item.dustbin??'-/-' }}
                </p>
                <div class="garage-item-state-item-name">
                  <img
                    src="@/assets/icons/garage/icon-delete.webp"
                    alt=""
                    class="garage-item-state-item-icon"
                  >
                  垃圾箱
                </div>
              </div>
            </div>
            <div
              class="garage-item-detail"
              @click="toDetail(item.carId)"
            >
              查看详情
            </div>
          </div>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts">
import { queryUserCarPageListUsingGET } from "@/api/chekuguanli";
import type { ColumnProps } from "@/components";
import { SearchForm } from "@/components";
import type { Ref } from "vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "DashboardGarageUser",
  components:{
    SearchForm,
  },
  setup() {
    const searchColumns:Ref<ColumnProps[]> = ref<ColumnProps[]>([])
    const garageData:Ref<API.yonghucheliangliebiaoduixiang[]> = ref<API.yonghucheliangliebiaoduixiang[]>([])
    const router = useRouter()

    searchColumns.value.push({
      title:"车辆编号",
      dataIndex: "carNumber",
      valueType: "string",
      search: true,
    })
    searchColumns.value.push({
      title: "故障",
      dataIndex: "fault",
      valueType: "enmu",
      valueEnum: [
        {
          value: "true",
          label: "是",
        },
        {
          value: "false",
          label: "否",
        }
      ],
      search: true,
    })
    searchColumns.value.push({
      title: "状态",
      dataIndex: "workStatus",
      valueType: "enmu",
      valueEnum:[
        {
          valeu:"作业中",
          label:"作业中",
        },
        {
          valeu:"驾驶中",
          label:"驾驶中",
        },
        {
          valeu:"静止",
          label:"静止",
        }
      ],
      search: true,
    })

    const toDetail = (carId:number) => {
      router.push({ name: "garage-detail", query: { carId, },})
    }

    const getGarageData = async (params:Record<string, any>) => {
      try {
        let {data,} = await queryUserCarPageListUsingGET({pageSize:8,current:1,...params,})
        garageData.value = data
      } catch (error) {
				
      }
    }

    getGarageData({})

    return {
      searchColumns,
      garageData,
      toDetail,
      getGarageData,
    }
  },
});
</script>
<style lang="less">
.dashboard-garage-user {
	min-height: 100%;
	background-color: #fff;
	display: flex;
	flex-direction: column;
}
.garage-user-body {
	flex: 1;
	padding: 24px;

	.arco-list-content {
		display: flex;
	}
}
.garage-user-item {
	padding: 16px;
	border: 1px solid #E3E8EE;
	border-radius: 3px;
	
	.garage-item-info {
		display: flex;
		align-items: center;

		&-num {
			font-size: 16px;
			font-family: PingFang ;
			font-weight: normal;
			color: #000;
			margin-right: 4px;
			line-height: 16px;
		}

		&-work {
			width: 48px;
			height: 16px;
			background: #d8d8d8;
			border-radius: 8px;
			text-align: center;
			line-height: 16px;
		}
	}

	.garage-item-extra {
		display: flex;
		font-size: 12px;
		color: #666;
		line-height: 12px;
		margin-top: 8px;
		
		&-area {
			padding-right: 8px;
			border-right: 1px solid #D6D6D6;
		}

		&-mileage {
			padding-left: 8px;
		}
	}

	.garage-item-state {
		display: flex;
		justify-content: space-between;
		margin: 24px 0;

		.garage-item-state-item-value {
			font-size: 20px;
			line-height: 20px;
			margin-bottom: 12px;
		}

		.garage-item-state-item-name {
			height: 12px;
			font-size: 12px;
			color: #333;
			line-height: 12px;
		}

		.garage-item-state-item-icon {
			height: 12px;
			margin-right: 3px;
		}
	}

	.garage-item-detail {
		width: 196px;
		height: 32px;
		background-color: #1769FA;
		border-radius: 4px;
		font-size: 14px;
		color: #fff;
		text-align: center;
		line-height: 32px;
		cursor: pointer;
	}
}
</style>
