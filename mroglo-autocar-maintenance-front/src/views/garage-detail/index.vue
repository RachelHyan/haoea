<template>
  <div class="dashboard-garage-detail page-root">
    <div class="garage-detail-header">
      <p class="detail-header-item">
        车辆编号: {{ carInfo.carNumber }}
      </p>
      <p class="detail-header-item">
        操作员: {{ carInfo.principal }}
      </p>
    </div>
    <div class="garage-detail-wrap">
      <div class="garage-detail-status">
        <div class="detail-status-car">
          <div class="detail-status-header">
            <p class="detail-status-title">
              车辆状态
            </p>
            <p class="detail-status-ts">
              {{ carStatus.ts }}
            </p>
          </div>
          <div class="status-car-body">
            <img
              alt="car"
              class="status-car-img"
              :src="carStatus.deviceStatus === 'online' ?'https://i.328888.xyz/2023/01/11/CBeCX.png':'https://i.328888.xyz/2023/01/11/CBdRA.png'"
            >
            <div class="status-car-full">
              <ul class="car-full-list">
                <li class="car-full-item">
                  <img
                    alt="icon"
                    class="car-full-item-icon"
                    src="@/assets/icons/details/icon-car-fault-none.png"
                  >
                  <p
                    :class="carStatus ? 'car-full-item-text-fault' : ''"
                    class="car-full-item-text"
                  >
                    {{ carStatus.fault ? '故障' : '正常' }}
                  </p>
                </li>
                <li class="car-full-item">
                  <img
                    alt="icon"
                    class="car-full-item-icon"
                    src="@/assets/icons/details/icon-car-working.png"
                  >
                  <p class="car-full-item-text">
                    {{ carStatus.vehicleStatus }}
                  </p>
                </li>
                <li class="car-full-item">
                  <img
                    alt="icon"
                    class="car-full-item-icon"
                    src="@/assets/icons/details/icon-car-pattern.png"
                  >
                  <p class="car-full-item-text">
                    {{ carStatus.vehicleModel }}
                  </p>
                </li>
                <li class="car-full-item">
                  <img
                    alt="icon"
                    class="car-full-item-icon"
                    src="@/assets/icons/details/icon-car-parking.png"
                  >
                  <p class="car-full-item-text">
                    {{ carStatus.parkBrakeStatus }}
                  </p>
                </li>
              </ul>
              <div class="status-car-power">
                <img
                  alt=""
                  class="status-car-power-icon"
                  src="@/assets/icons/details/icon-car-power.png"
                >
                <p class="status-car-power-text">
                  上电状态
                </p>
                <a-switch
                  v-model="carElectrify"
                  :checked-value="1"
                  :unchecked-value="0"
                  size="small"
                  :disabled="electrifyOffline"
                  @change="triggerElectrify"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="detail-status-work">
          <div class="detail-status-header">
            <p class="detail-status-title">
              运行状态
            </p>
            <p class="detail-status-ts">
              {{ runStatus.ts }}
            </p>
          </div>
          <div class="status-work-body">
            <ul class="status-work-condition">
              <li class="work-condition-item condition-item-carspeed">
                <div class="work-condition-item-value">
                  {{ runStatus.carSpeed }}
                </div>
                <p class="work-condition-item-name">
                  车速(km/h)
                </p>
              </li>
              <li class="work-condition-item condition-item-acceleratorPedal">
                <div class="work-condition-item-value">
                  {{ runStatus.acceleratorPedal }}
                </div>
                <p class="work-condition-item-name">
                  油门踏板(%)
                </p>
              </li>
              <li class="work-condition-item condition-item-dustbin">
                <div class="work-condition-item-value">
                  {{ runStatus.dustbin }}
                </div>
                <p class="work-condition-item-name">
                  垃圾箱(%)
                </p>
              </li>
              <li class="work-condition-item condition-item-waterTank">
                <div class="work-condition-item-value">
                  {{ runStatus.waterTank }}
                </div>
                <p class="work-condition-item-name">
                  水箱(%)
                </p>
              </li>
              <li class="work-condition-item condition-item-currentMileage">
                <div class="work-condition-item-value">
                  {{ runStatus.currentMileage }}
                </div>
                <p class="work-condition-item-name">
                  当前里程(km)
                </p>
              </li>
              <li class="work-condition-item condition-item-totalMileage">
                <div class="work-condition-item-value">
                  {{ runStatus.totalMileage }}
                </div>
                <p class="work-condition-item-name">
                  总里程(km)
                </p>
              </li>
            </ul>
            <ul class="status-work-lighting">
              <li class="work-lighting-row">
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    制动灯
                  </p>
                  <i
                    :style="{ color: runStatus.brakeLamp ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-stoplight"
                  />
                </div>
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    紧急制动开关
                  </p>
                  <i
                    :style="{ color: runStatus.bigLamp ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-stoplight"
                  />
                </div>
              </li>
              <li class="work-lighting-row">
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    大灯
                  </p>
                  <i
                    :style="{ color: runStatus.bigLamp ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-headlight"
                  />
                </div>
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    车内急停开关
                  </p>
                  <i
                    :style="{ color: runStatus.insideStopSwitch ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-stoplight"
                  />
                </div>
              </li>
              <li class="work-lighting-row">
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    作业灯
                  </p>
                  <i
                    :style="{ color: runStatus.workLamp ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-worklight"
                  />
                </div>
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    车外急停开关
                  </p>
                  <i
                    :style="{ color: runStatus.outsideStopSwitch ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-stoplight"
                  />
                </div>
              </li>
              <li class="work-lighting-row">
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    位置灯
                  </p>
                  <i
                    :style="{ color: runStatus.placeLamp ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-positionlight"
                  />
                </div>
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    制动踏板
                  </p>
                  <p class="work-lighting-item-brakePedal">
                    踩下{{ runStatus.brakePedal }}%
                  </p>
                </div>
              </li>
              <li class="work-lighting-row">
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    左转向灯
                  </p>
                  <i
                    :style="{ color: runStatus.leftTurnLamp ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-turnlight-left"
                  />
                </div>
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    钥匙
                  </p>
                  <p
                    :class="`work-lighting-item-key-${runStatus.key}`"
                    class="work-lighting-item-key"
                  >
                    {{
                      runStatus.key
                    }}
                  </p>
                </div>
              </li>
              <li class="work-lighting-row">
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    右转向灯
                  </p>
                  <i
                    :style="{ color: runStatus.rightTurnLamp ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-turnlight-right"
                  />
                </div>
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    雨刮器
                  </p>
                  <i
                    :style="{ color: runStatus.wiper ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-positionlight"
                  />
                </div>
              </li>
              <li class="work-lighting-row">
                <div class="work-lighting-item" />
                <div class="work-lighting-item">
                  <p class="work-lighting-item-text">
                    EPB开关
                  </p>
                  <i
                    :style="{ color: runStatus.epb ? '#FAC517' : '#A4A6AA', fontSize: '14px' }"
                    class="iconfont icon-ac-positionlight"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="garage-detail-content">
        <div class="garage-detail-trajectory">
          <work-trajectory :car-id="carId" />
        </div>
        <div class="garage-detail-fault">
          <div class="detail-fault-battery">
            <div class="detail-fault-header">
              <p class="detail-fault-title">
                电池状态
              </p>
              <p class="detail-fault-ts">
                {{ batteryStatus.ts }}
              </p>
            </div>
            <div class="fault-battery-body">
              <div class="fault-battery-column">
                <div class="fault-battery-item">
                  <p class="fault-battery-item-name">
                    电量:
                  </p>
                  <p class="fault-battery-item-value">
                    {{ batteryStatus.electric }}%
                  </p>
                  <img
                    alt="电池电量"
                    class="fault-battery-item-icon"
                    src="@/assets/icons/details/icon-fault-battery.png"
                    style="width: 7px;height:12px"
                  >
                </div>
                <div class="fault-battery-item">
                  <p class="fault-battery-item-name">
                    电池温度:
                  </p>
                  <p class="fault-battery-item-value">
                    {{ batteryStatus.batteryTemperature }}℃
                  </p>
                  <img
                    alt="电池温度"
                    class="fault-battery-item-icon"
                    src="@/assets/icons/details/icon-fault-temperature.png"
                    style="width: 14px;height:14px"
                  >
                </div>
              </div>
              <div class="fault-battery-column">
                <div class="fault-battery-item">
                  <p class="fault-battery-item-name">
                    电流:
                  </p>
                  <p class="fault-battery-item-value">
                    {{ batteryStatus.current }}A
                  </p>
                  <img
                    alt="电流"
                    class="fault-battery-item-icon"
                    src="@/assets/icons/details/icon-fault-electricity.png"
                    style="width: 14px;height:12px"
                  >
                </div>
                <div class="fault-battery-item">
                  <p class="fault-battery-item-name">
                    电压:
                  </p>
                  <p class="fault-battery-item-value">
                    {{ batteryStatus.voltage }}V
                  </p>
                  <img
                    alt="电压"
                    class="fault-battery-item-icon"
                    src="@/assets/icons/details/icon-fault-voltage.png"
                    style="width: 14px;height:14px"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="detail-fault-car">
            <div class="detail-fault-title">
              车辆故障
              <p class="detail-fault-ts">
                {{ faultCarTs }}
              </p>
              <p
                class="detail-fault-title-extra"
                @click="faultVisible = true"
              >
                查看所有故障 >
              </p>
            </div>
            <div class="fault-car-body">
              <div class="fault-car-header">
                <div class="fault-car-header-column">
                  <span
                    class="fault-car-header-name"
                    :class="hasUnread?'header-name-unread':''"
                  >故障类型</span>
                </div>
                <div class="fault-car-header-column">
                  <span class="fault-car-header-name">故障次数</span>
                </div>
                <div class="fault-car-header-column">
                  <span class="fault-car-header-name">当前状态</span>
                </div>
              </div>
              <div
                v-for="(item,index) in faultCarList"
                :key="index"
                class="fault-car-row"
              >
                <div class="fault-car-column">
                  <span
                    class="fault-car-column-value"
                    :class="item.checkNum?'column-value-unread':''"
                  >{{ item.incidentName }}</span>
                </div>
                <div class="fault-car-column">
                  <span class="fault-car-column-value">{{ item.num }}</span>
                </div>
                <div class="fault-car-column">
                  <i
                    class="iconfont icon-ac-jinggao"
                    :style="{color:item.fault?'#F98C25':'#A4A6AA'}"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="detail-fault-camera">
            <div class="detail-fault-header">
              <p class="detail-fault-title">
                摄像头故障
              </p>
              <p class="detail-fault-ts">
                {{ faultCameraTs }}
              </p>
            </div>
            
            <div class="fault-camera-body">
              <div
                v-for="(item,index) in faultCameraList"
                :key="index"
                class="fault-camera-item"
              >
                <img
                  v-if="item.fault"
                  src="@/assets/icons/details/icon-fault-camera-error.png"
                  alt="摄像头"
                  class="fault-camera-item-icon"
                >
                <img
                  v-else
                  src="@/assets/icons/details/icon-fault-camera.png"
                  alt="摄像头"
                  class="fault-camera-item-icon"
                >
                <p class="fault-camera-item-name">
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
          <div class="detail-domain-controller">
            <p class="domain-controller-name">
              自动驾驶域控制器
            </p>
            <p
              class="domain-controller-ota"
              @click="otaVisible = true"
            >
              更新
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ota-modal
    :visible="otaVisible"
    :car-id="carId"
    @close="otaVisible = false;"
  />
  <fault-modal
    :visible="faultVisible"
    :car-id="carId"
    @close="faultVisible = false;"
  />
</template>

<script lang="ts">
import { electrifyOperateUsingPOST, queryCarInfoUsingGET, queryElectrifyStatusUsingGET, queryInfoByIdUsingGET } from "@/api/chekuguanli";
import { queryCarFarultStatiInfoUsingGET } from "@/api/shijianguanli";
import { Message } from "@arco-design/web-vue";
import dayjs from "dayjs";
import type { Ref } from "vue";
import { computed, defineComponent, onUnmounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import FaultModal from "./components/fault-modal.vue";
import OtaModal from "./components/ota-modal.vue";
import WorkTrajectory from "./components/work-trajectory.vue";

export default defineComponent({
  name: "DashboardGarageDetail",
  components:{
    WorkTrajectory,
    OtaModal,
    FaultModal,
  },
  setup() {
    const route = useRoute();
    const carId = parseInt(<string>route.query.carId);
    const carInfo = reactive<{carNumber:string,principal:string,vinCode:string}>({carNumber:"",principal:"",vinCode:"",});
    const carElectrify:Ref<number> = ref<number>(1)
    const electrifyOffline:Ref<boolean> = ref<boolean>(false)
    const carStatus = reactive<API.cheliangzhuangtai | any>({});
    const runStatus = reactive<API.yunxingzhuangtai | any>({});
    const batteryStatus = reactive<API.dianchizhuangtai | any>({});
    const faultCarList: Ref<API.IncidentStatiVo[]> = ref<API.IncidentStatiVo[]>([]);
    const faultCarTs: Ref<string> = ref<string>("");
    const faultCameraTs: Ref<string> = ref<string>("");
    const faultCameraList: Ref<API.shexiangtouguzhangxinxi[]> = ref<API.shexiangtouguzhangxinxi[]>([]);
    const interval:Ref<string | number | NodeJS.Timeout | undefined> = ref<string | number | NodeJS.Timeout | undefined>(undefined);
    const otaVisible:Ref<boolean> = ref<boolean>(false)
    const faultVisible:Ref<boolean> = ref<boolean>(false)
    const statusOfCarLoading:Ref<boolean> = ref<boolean>(false)
    const faultOfCarLoading:Ref<boolean> = ref<boolean>(false)
    const electrifyLoading:Ref<boolean> = ref<boolean>(false)

    const hasUnread = computed(() => {
      let fault = faultCarList.value.findIndex(({checkNum,}) => checkNum > 0);
      return fault !== -1;
    }); 

    // 获取车辆信息

    const getCarInfo = async () => {
      try {
        let {data,} = await queryInfoByIdUsingGET({carId,})
        carInfo.carNumber = data.carNumber
        carInfo.principal = data.principal
        carInfo.vinCode = data.vinCode
        getElectrify()
      } catch (error) {
				
      }
    }
		
    // 获取车辆状态
    const getStatusOfCar = async () => {
      try {
        statusOfCarLoading.value = true
        const {data,} = await queryCarInfoUsingGET({carId,});
        statusOfCarLoading.value = false
        carStatus.fault = data.carStatusDTO?.fault;
        carStatus.parkBrakeStatus = data.carStatusDTO?.parkBrakeStatus;
        carStatus.vehicleModel = data.carStatusDTO?.vehicleModel;
        carStatus.vehicleStatus = data.carStatusDTO?.vehicleStatus;
        carStatus.ts = data.carStatusDTO?.ts?dayjs(data.carStatusDTO.ts).format("YYYY-MM-DD HH:mm:ss"):"";
        carStatus.deviceStatus = data?.deviceStatus;
				
        Object.keys(data.runStatusDTO).forEach((key: string) => {
          // @ts-ignore
          runStatus[key] = data.runStatusDTO[key];
        });
        runStatus.ts = runStatus.ts?dayjs(runStatus.ts).format("YYYY-MM-DD HH:mm:ss"):"";
				
        batteryStatus.batteryTemperature = data.batteryStatusDTO.batteryTemperature;
        batteryStatus.current = data.batteryStatusDTO.current;
        batteryStatus.electric = data.batteryStatusDTO.electric;
        batteryStatus.voltage = data.batteryStatusDTO.voltage;
        batteryStatus.ts = data.batteryStatusDTO?.ts?dayjs(data.batteryStatusDTO?.ts).format("YYYY-MM-DD HH:mm:ss"):"";

      } catch (error) {
        statusOfCarLoading.value = false
      }
    };

    // 电池状态和获取车辆故障
    const getFaultOfCar = async () => {
      try {
        faultOfCarLoading.value = true
        let {data,} = await queryCarFarultStatiInfoUsingGET({carId,});
        faultOfCarLoading.value = false
        faultCarList.value = data.list??[];
        faultCarTs.value =  data?.incidentTs?dayjs(data?.incidentTs).format("YYYY-MM-DD HH:mm:ss"):"";
        faultCameraList.value = data.info??[];
        faultCameraTs.value = data?.cameraFaultTs?dayjs(data?.cameraFaultTs).format("YYYY-MM-DD HH:mm:ss"):"";
      } catch (error) {
        faultOfCarLoading.value = false
      }
    };

    const getElectrify = async () => {
      try {
        electrifyLoading.value = true
        let {data,} = await queryElectrifyStatusUsingGET({vinCode:carInfo.vinCode,});
        electrifyLoading.value = false
        if (data === "-1") {
          electrifyOffline.value = true
        } else {
          carElectrify.value = parseInt(data)
        }
      } catch (error) {
        electrifyLoading.value = false
      }
    };

    const initAndInterval = () => {
      !statusOfCarLoading.value && getStatusOfCar()
      !faultOfCarLoading.value && getFaultOfCar()
      !electrifyLoading.value && getElectrify()
    }

    interval.value = setInterval(initAndInterval,3000)

    if (carId) {
      initAndInterval()
      getCarInfo()
    }

    onUnmounted(()=>{
      clearInterval(interval.value)
    })

    const triggerElectrify = async (value:string | number | boolean) => {
      try {
        await electrifyOperateUsingPOST({carId,electrifyStatus:<number>value,})
        Message.success(`${value?"上":"下"}电操作成功!`)
      } catch (error) {
				
      }
    }

    
    return {
      carId,
      carInfo,
      carStatus,
      runStatus,
      batteryStatus,
      faultCarList,
      faultCarTs,
      faultCameraTs,
      faultCameraList,
      hasUnread,
      otaVisible,
      faultVisible,
      carElectrify,
      electrifyOffline,
      triggerElectrify,
    };
  },
});
</script>
<style lang="less">
.layout-content-inside .page-root.dashboard-garage-detail {
	min-height: calc(100vh - 190px);
	display: flex;
}

.dashboard-garage-detail {
	padding-top: 28px;
	position: relative;
}

.garage-detail-header {
	width: 100%;
	padding: 16px 0;
	background-color: #F4F4F4;
	position: absolute;
	top: -24px;
	display: flex;
	gap: 24px;
}

.detail-header-item {
	font-size: 14px;
	color: #333;
	line-height: 20px;
}

.garage-detail-wrap {
	display: flex;
	flex-direction: column;
	flex: 1;
}

.garage-detail-status {
	height: 240px;
	display: flex;
	border-bottom: 1px solid #E3E8EE;
}

.detail-status-car,
.detail-status-work {
	padding: 24px;

	.detail-status-header {
		display: flex;
		justify-content: space-between;
	}

	.detail-status-title {
		height: 18px;
		padding-left: 10px;
		font-size: 16px;
		font-family: PingFang, serif;
		color: #000;
		position: relative;
	}

	.detail-status-title::before {
		content: "";
		width: 2px;
		height: 16px;
		background: #1769fa;
		position: absolute;
		left: 0;
		top: 1px;
	}

	.detail-status-ts {
		color: #333;
	}
}

.detail-status-car {
	border-right: 1px solid #E3E8EE;

	.status-car-body {
		display: flex;
		column-gap: 50px;
		margin-top: 16px;
	}

	.status-car-img {
		width: 190px;
	}

	.status-car-full {
		width: 122px;
	}

	.car-full-list {
		display: flex;
		flex-direction: column;
		row-gap: 16px;
		padding-bottom: 16px;
		border-bottom: 1px dashed #D6D6D6;
	}

	.car-full-item {
		display: flex;
		align-items: center;

		&-icon {
			width: 14px;
		}

		&-text {
			font-size: 14px;
			font-family: PingFang SC;
			color: #000;
			line-height: 14px;
			padding-left: 8px;
		}
	}

	.status-car-power {
		display: flex;
		align-items: center;
		margin-top: 16px;

		&-icon {
			width: 14px;
		}

		&-text {
			font-size: 14px;
			font-family: PingFang SC;
			color: #000;
			line-height: 14px;
			padding-left: 10px;
			padding-right: 8px;
		}
	}
}

.detail-status-work {
	flex: 1;
	display: flex;
	flex-direction: column;

	.status-work-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-top: 16px;
		justify-content: space-between;
	}

	.status-work-condition {
		display: flex;
		justify-content: space-between;
	}

	.work-condition-item {
		display: flex;
		flex-direction: column;
		row-gap: 8px;

		.work-condition-item-value {
			font-size: 22px;
			font-family: PingFang SC;
			font-weight: 600;
			line-height: 64px;
			text-align: center;
			user-select: none;
			cursor: text;
		}

		&-name {
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: normal;
			color: #666;
			text-align: center;
			user-select: none;
			cursor: text;
		}
	}

	.condition-item-carspeed .work-condition-item-value {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		color: #0F74F6;
		background-image: url("@/assets/icons/details/icon-work-speed.png"), linear-gradient(180deg, rgba(107, 203, 255, 0.21) 0%, rgba(120, 177, 255, 0.3) 100%);
		background-size: 44px 38px, 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.condition-item-acceleratorPedal .work-condition-item-value {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		color: #643FA6;
		background-image: url("@/assets/icons/details/icon-work-pedal.png"), linear-gradient(180deg, rgba(170, 143, 255, 0.16) 0%, rgba(124, 92, 243, 0.3) 100%);
		background-size: 36px, 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.condition-item-dustbin .work-condition-item-value {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		color: #DE5B00;
		background: url("@/assets/icons/details/icon-work-dustbin.png") center no-repeat #FEE4CB;
		background-size: 35px 42px;
	}

	.condition-item-waterTank .work-condition-item-value {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		color: #05823A;
		background: url("@/assets/icons/details/icon-work-water.png") center no-repeat #D9F2E9;
		background-size: 32px 42px;
	}

	.condition-item-currentMileage .work-condition-item-value {
		width: 110px;
		height: 64px;
		border-radius: 32px;
		color: #0051EC;
		background-image: url("@/assets/icons/details/icon-work-short-map.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}

	.condition-item-totalMileage .work-condition-item-value {
		width: 145px;
		height: 64px;
		border-radius: 32px;
		color: #0051EC;
		background-image: url("@/assets/icons/details/icon-work-long-map.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}
}

.status-work-lighting {
	display: flex;
	justify-content: space-between;

	.work-lighting-row {
		display: flex;
		flex-direction: column;
		row-gap: 16px;
	}

	.work-lighting-item {
		height: 14px;
		display: flex;
		align-items: center;

		&-icon {
			width: 14px;
			height: 14px;
		}

		&-text {
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: normal;
			color: #333;
			margin-right: 4px;
		}

		&-brakePedal {
			height: 14px;
			background-color: #12af3c;
			border-radius: 7px;
			font-size: 12px;
			line-height: 14px;
			padding: 0 4px;
		}

		&-key {
			height: 14px;
			background-color: #12af3c;
			border-radius: 7px;
			font-size: 12px;
			line-height: 14px;
			padding: 0 4px;
		}

		&-key-IGOFF {
			background-color: #A4A6AA;
		}

		&-key-IGON {
			background-color: #F34922;
		}

		&-key-ACC {
			background-color: #12af3c;
		}
	}
}

.garage-detail-content {
	display: flex;
	padding-bottom: 24px;
	flex: 1;
}

.garage-detail-trajectory {
	flex: 1;
  padding: 24px;
  padding-bottom: 0;
}

.garage-detail-fault {
	width: 357px;
	padding: 0 24px;
	border-left: 1px solid #E3E8EE;

	.detail-fault-header {
		display: flex;
		justify-content: space-between;
	}

	.detail-fault-title {
		font-size: 16px;
		font-family: PingFang;
		font-weight: normal;
		color: #000;
		line-height: 18px;
		padding-left: 10px;
		position: relative;

		&::before {
			content: "";
			width: 2px;
			height: 16px;
			background: #1769fa;
			position: absolute;
			left: 0;
			top: 1px;
		}
	}

	.detail-fault-ts {
		color: #333;
		font-size: 14px;
	}

	.detail-fault-battery,
	.detail-fault-car,
	.detail-fault-camera {
		padding-top: 24px;
	}
}

.fault-battery-body {
	height: 76px;
	background: #f2f3f6;
	border-radius: 6px;
	padding: 16px 0;
	padding-left: 24px;
	padding-right: 30px;
	margin-top: 16px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;

	&::before {
		content: "";
		width: 1px;
		height: 44px;
		background-color: #D6D6D6;
		position: absolute;
		top: 16px;
		left: calc(50% - 0.5px);
	}

	.fault-battery-column {
		display: flex;
		justify-content: space-between;
	}

	.fault-battery-item {
		display: flex;
		align-items: center;

		&-name {
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: normal;
			color: #333;
			line-height: 14px;
		}

		&-value {
			width: 42px;
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: normal;
			color: #000;
			line-height: 14px;
			margin-left: 8px;
			margin-right: 5px;
		}
	}
}

.detail-fault-car {

	.detail-fault-title {
		display: flex;
		justify-content: space-between;
	}

	.detail-fault-title-extra {
		height: 18px;
		font-size: 16px;
		font-family: PingFang SC;
		font-weight: normal;
		color: #1769fa;
		cursor: pointer;
	}

	.fault-car-body {
		height: 211px;
		background: #fafbff;
		margin-top: 16px;

		.header-name-unread,.column-value-unread {
			position: relative;

			&::after {
				content: "";
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background-color: #F61414;
				position: absolute;
				right: -8px;
			}
		}

	}
}

.fault-car-header {
	height: 34px;
	padding: 0 16px;
	display: flex;
	background: #eef1fd;

	.fault-car-header-column {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.fault-car-header-column:nth-of-type(1) {
		flex: 1.5;
	}

	.fault-car-header-name {
		font-size: 14px;
		font-family: PingFang;
		font-weight: normal;
		color: rgba(0, 0, 0, 0.7);
	}

}

.fault-car-row {
	height: 32px;
	display: flex;
	padding: 0 16px;
	cursor: grabbing;

	&:hover {
		background: #e6f0ff;
	}

	&:hover .fault-car-column:nth-of-type(1) {
		color: #1769FA;
	}

	&:hover .fault-car-column:nth-of-type(2) {
		color: #000;
	}
}

.fault-car-column {
	flex: 1;
	display: flex;
	align-items: center;
	font-size: 14px;
	font-family: PingFang SC;
	font-weight: normal;
	color: rgba(0,0,0,0.6);

	&:nth-of-type(1) {
		flex: 1.5;
	}

	&:nth-last-of-type(1) {
		justify-content: center;
	}

}

.fault-camera-body {
	padding: 16px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #E3E8EE;
}

.fault-camera-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-icon {
    width: 40px;
    height: 40px;
  }

  &-name {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: normal;
    color: #333;
    margin-top: 4px;
  }
}

.detail-domain-controller {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  .domain-controller-name {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: normal;
    color: #000;
    line-height: 22px;
  }

  .domain-controller-ota {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: normal;
    color: #1769FA;
    line-height: 22px;
    cursor: pointer;
  }
}
</style>
