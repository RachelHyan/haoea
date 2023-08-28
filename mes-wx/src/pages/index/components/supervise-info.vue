<template>
  <popup-modal
    ref="popupRef"
    class="supervise-info"
    :visible="visible"
    :is-mask-click="false"
    @update:visible="(val: boolean) => $emit('update:visible', val)"
    @close="$emit('close')"
  >
    <template #header>
      <view class="supervise-info-head">
        <view class="mr20">
          <image
            class="supervise-info-head-img"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.7/tag-icon.png"
          />
        </view>
        <view>
          <view class="supervise-info-head-name">
            <text>{{ data.objectName ?? '对象名称' }}</text>
          </view>
          <view class="supervise-info-head-status">
            <template v-if="detailData.userNames?.length">
              <view
                v-if="userRole === 'CAPTAIN' || userRole === 'PROJECT_MANAGER'"
                class="supervise-info-head-status-item"
                :style="{
                  backgroundColor: data.status === 'none' ? '#A1A1A11A' : '#DCF0E0CC',
                  borderColor: data.status === 'none' ? '#A1A1A1' : '#6AC696',
                  color: data.status === 'none' ? '#A1A1A1' : '#6AC696'
                }"
              >
                <text>{{ data.status === 'none' ? '未排班' : '已排班' }}</text>
              </view>
            </template>
            <template v-if="detailData.inspectionNames?.length">
              <view
                v-if="!(userRole === 'CAPTAIN' || data.status === 'none')"
                class="supervise-info-head-status-item"
                :style="{
                  backgroundColor: data.count ? '#E9F3FE' : '#DCF0E0CC',
                  borderColor: data.count ? '#3C86EA' : '#6AC696',
                  color: data.count ? '#3C86EA' : '#6AC696'
                }"
              >
                <text>{{ data.count ? `待督查${data.count}次` : '已督查' }}</text>
              </view>
              <view
                v-if="data.isRectification === 1 || userRole === 'RECTIFIER'"
                class="supervise-info-head-status-item"
                :style="{
                  backgroundColor: '#F0DCDCCC',
                  borderColor: '#C66A6A',
                  color: '#C66A6A'
                }"
              >
                <text>{{ '存在问题未整改' }}</text>
              </view>
            </template>
          </view>
        </view>
      </view>
    </template>
    <view class="supervise-info-body">
      <scroll-view
        scroll-y
        class="supervise-info-scroll"
      >
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>类型</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ objectTypeList.find(item => item.value == data.objectType)?.label }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>编号</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ data.objectCode }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>队别</text>
          </view>
          <view class="supervise-info-item--value">
            <!-- <text>{{ data.gridName }}</text> -->
            <text>{{ detailData.gridNames || "无" }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>队长</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ detailData.chargeUserNames || "无" }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>督查类型</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ data.inspectionTypeName || '无' }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>督查员</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ detailData.inspectionNames || "无" }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>班次</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ detailData.shiftNames || "无" }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>作业人员</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ detailData.userNames || '无' }}</text>
          </view>
        </view>
        <view
          v-if="data.jobType === 'Vehicle_operation'"
          class="supervise-info-item"
        >
          <view class="supervise-info-item--label">
            <text>作业车辆</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ detailData.carNumbers || '无' }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>经度</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ data.routePointList?.at(0)?.at(0) || 0 }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>纬度</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ data.routePointList?.at(0)?.at(1) || 0 }}</text>
          </view>
        </view>
        <view class="supervise-info-item">
          <view class="supervise-info-item--label">
            <text>地址</text>
          </view>
          <view class="supervise-info-item--value">
            <text>{{ data.addr }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view
      class="supervise-info-foot"
      :style="{margin: userRole === 'CAPTAIN' ? '0 160rpx' : '0 10rpx'}"
    >
      <button
        class="supervise-info-foot-btn"
        type="button"
        @click="handleDetail"
      >
        {{ userRole === "PROJECT_MANAGER" || userRole === "CAPTAIN" ? "编辑对象" : "查看详情" }}
      </button>
      <button
        class="supervise-info-foot-btn"
        type="button"
        @click="handleNavigation"
      >
        导航对象
      </button>
      <button
        v-if="userRole !== 'CAPTAIN'"
        class="supervise-info-foot-btn"
        type="button"
        :class="{'button-disabled': userRole === 'PROJECT_MANAGER' && inspectionTimeList.length === 0}"
        :disabled="(userRole === 'PROJECT_MANAGER' && inspectionTimeList.length === 0)"
        @click="handleInspection"
      >
        {{ userRole === 'INSPECTOR' ? "开始督查" : userRole === 'PROJECT_MANAGER' ? "今日情况" : "开始整改" }}
      </button>
      <button
        v-if="userRole !== 'CAPTAIN'"
        class="supervise-info-foot-btn"
        type="button"
        @click="handleHistory"
      >
        督查历史
      </button>
    </view>
  </popup-modal>
  <popup-modal
    v-model:visible="inspectionTimeVisible"
    :show-header="false"
    :is-border-bottom="false"
    :show-close-icon="false"
    bottom-cancel-item
    mask
    @close="inspectionTimeVisible = false"
  >
    <view class="suoervise-info-inspection-time">
      <view
        v-for="(item, index) in inspectionTimeList"
        :key="index"
        class="suoervise-info-inspection-time-item"
        @click="handleInspectionTime(item)"
      >
        <text>{{ item.createTime }}</text>
      </view>
    </view>
  </popup-modal>
</template>
<script lang='ts'>
import { mesWechatCaptainSimpleSelectInspectionRecordList, mesWechatProjectManagerSelectObjectPlanInfo } from "@/api/mes/wechatController";
import PopupModal from "@/components/popup-modal/index.vue";
import dayjs from "dayjs";
import type { PropType, Ref } from "vue";
import { computed, defineComponent, ref, watch } from "vue";

type DetailDataType = {
	data?: MES.WechatObjectPlanInfo,
	gridNames?: string,
	chargeUserNames?: string,
	inspectionNames?: string,
	shiftNames?: string,
	userNames?: string,
	carNumbers?: string,
}

export default defineComponent({
  name: "SuperviseInfo",
  components: { PopupModal, },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    data: {
      type: Object as PropType<MES.SimpleWechatObjectDTO>,
      required: true,
      default: () => ({}),
    },
  },
  emits: ["update:visible", "close", "markerReload"],
  options: { styleIsolation: "shared", },
  setup(props, { emit, }) {
    const userRole = uni.getStorageSync("userRole")
    const projectId = uni.getStorageSync("projectInfo").projectId
    const popupRef = ref()
    const objectTypeList: {label: string, value: string}[] = uni.getStorageSync("dict").scene_type
    const inspectionTimeVisible: Ref<boolean> = ref<boolean>(false)
    const inspectionTimeList: Ref<MES.SimpleWechatInspectionRecordDTO[]> = ref<MES.SimpleWechatInspectionRecordDTO[]>([])
    const detailData: Ref<DetailDataType> = ref<DetailDataType>({})
			
    const getDetailData = async () => {
      try {
        const {data,} = await mesWechatProjectManagerSelectObjectPlanInfo({objectId: <number>props.data.objectId,})
				
        detailData.value = computed(()=> {
          const gridNames = data.planBindingList?.map(item => item.gridName).filter(str => Boolean(str)) ?? []
          const chargeUserNames = data.chargeUserList?.map(item => item.chargeUserName).filter(str => Boolean(str)) ?? []
          const inspectionNames = data.planBindingList?.map(item => item.inspectionUserList?.map(user => user.inspectionUserName).filter(str => Boolean(str))).filter(str => Boolean(str?.length)) ?? []
          const shiftNames = data.planBindingList?.map(item => item.shiftList?.map(shift => (`${shift.shiftName}（${shift.jobStartTime} - ${shift.jobEndTime}）`)).filter(str => Boolean(str))).filter(str => Boolean(str?.length)) ?? []
          const userNames = data.planBindingList?.map(item => item.userName).filter(str => Boolean(str)) ?? []
          const carNumbers = data.planBindingList?.map(item => item.carNumber).filter(str => Boolean(str)) ?? []
					
          return {
            data,
            gridNames: gridNames.toString(),
            chargeUserNames: chargeUserNames.toString(),
            inspectionNames: inspectionNames.toString(),
            shiftNames: shiftNames?.toString(),
            userNames: userNames?.toString(),
            carNumbers: carNumbers?.toString(),
          }
        }).value

      } catch (error) { }
    }

    const getInspectionTimeList = async () => {
      const params: any = { projectId, objectId: <number>props.data.objectId, date: dayjs().format("YYYY-MM-DD"), }
      try {
        const { data, } = await mesWechatCaptainSimpleSelectInspectionRecordList(params);
        inspectionTimeList.value = data ?? []
      } catch (error) {
      }
    }

    /** 查看详情/编辑对象 */
    const handleDetail = () => {
      const {objectId,objectName,objectCode,objectType,addr,routePointList,jobType,inspectionType,inspectionTypeName,} = props.data
      const params = {
        ...detailData.value.data,
        objectId,objectName,objectCode,objectType,addr,routePointList,jobType,inspectionType,inspectionTypeName,
        pageMethod: userRole === "PROJECT_MANAGER" || userRole === "CAPTAIN" ? "edit" : "detail",
      }
      uni.navigateTo({
        url: `/pages/object-config/index?data=${encodeURIComponent(JSON.stringify(params))}`,
        events: { reload: () => emit("markerReload"), },
        success: () => {popupRef.value.close(), emit("close")},
      })
    }

    /** 导航 */
    const handleNavigation = () => {
      uni.openLocation({
        longitude: Number(props.data.routePointList?.at(0)?.at(0)),
        latitude: Number(props.data.routePointList?.at(0)?.at(1)),
        name: props.data.objectName,
        address: props.data.addr,
      })
    }

    /** 开始督查/今日情况 */
    const handleInspection = () => {
      const params: any = {
        objectName: props.data.objectName,
        objectId: props.data.objectId,
        inspectionTaskId: undefined,
        objectType: props.data.objectType,
      }
      if (userRole === "INSPECTOR") {
        if (props.data.inspectionTaskList?.length && props.data.status === "done") {
          let lastIndex = props.data.inspectionTaskList?.length - 1
          params.inspectionTaskId = props.data.inspectionTaskList[lastIndex].inspectionTaskId
          uni.showModal({
            title: "提示",
            content: "当前督查任务已完成，是否继续督查？",
            showCancel: true,
            cancelText: "今日情况",
            cancelColor: "#000",
            confirmText: "继续督查",
            confirmColor: "#666E9B",
            success: ({ confirm, cancel, }) => {
              if (cancel) {
                inspectionTimeVisible.value = true
              } else if (confirm) {
                uni.navigateTo({
                  url: `/pages/supervise-form/index?data=${encodeURIComponent(JSON.stringify({ ...params, pageMethod: "add", }))}`,
                  events: { reload: () => emit("markerReload"), },
                  success: () => {popupRef.value.close(), emit("close")},
                })
              }
            },
          })
        } else {
          params.inspectionTaskId = props.data.inspectionTaskList?.filter(item => item.inspectionStatus === "undone")[0].inspectionTaskId
          uni.navigateTo({
            url: `/pages/supervise-form/index?data=${encodeURIComponent(JSON.stringify({ ...params, pageMethod: "add", }))}`,
            events: { reload: () => emit("markerReload"), },
            success: () => {popupRef.value.close(), emit("close")},
          })
        }
      }else if (userRole === "PROJECT_MANAGER" || userRole === "CAPTAIN") {
        inspectionTimeVisible.value = true
      }
    }

    /** 督查历史 */
    const handleHistory = () => {
      const params = {
        objectName: props.data.objectName,
        objectId: props.data.objectId,
      }
      uni.navigateTo({ url: `/pages/history-list/index?data=${encodeURIComponent(JSON.stringify(params))}`,
        success: () => { popupRef.value.close(), emit("close")}, })
    }

    /** 今日情况列表的点击事件 */
    const handleInspectionTime = (val: MES.SimpleWechatInspectionRecordDTO) => {
      const params = {
        ...val,
        objectName: props.data.objectName,
        objectId: props.data.objectId,
        pageMethod: "detail",
        isToday: true,
      }
      uni.navigateTo({ url: `/pages/supervise-form/index?data=${encodeURIComponent(JSON.stringify(params))}`,success: () => {popupRef.value.close(), emit("close")}, })
    }
    getDetailData()
    getInspectionTimeList()

    watch (() => props.data.objectId, () => {
      getDetailData()
      getInspectionTimeList()
    })
		
    return {
      userRole,
      popupRef,
      objectTypeList,
      inspectionTimeVisible,
      inspectionTimeList,
      detailData,
      handleDetail,
      handleNavigation,
      handleInspection,
      handleHistory,
      handleInspectionTime,
    }
  },
})
</script>
<style lang='scss' scoped>
.supervise-info {
	&-head {
		display: flex;

		&-img {
			width: 28rpx;
			height: 28rpx;
			vertical-align: middle;
		}

		&-name {
			font-size: 36rpx;
			margin-bottom: 20rpx;
			width: 75vw;
			overflow: hidden;
			text-overflow: ellipsis; //文本溢出显示省略号
			white-space: nowrap; //文本不会换行
		}

		&-status {
			&-item {
				display: inline-block;
				width: fit-content;
				padding: 4rpx 12rpx;
				font-size: 20rpx;
				margin-bottom: 6rpx;
				border-radius: 5rpx;
				border: 1rpx solid;
				margin-right: 20rpx;
			}
		}
	}

	&-scroll {
		height: 544rpx;
	}

	&-grid-item {
		width: fit-content;
		position: relative;
		height: 70rpx;
		margin: 0 20rpx;
		
		&::after {
			position: absolute;
			bottom: -12rpx;
			left: 0;
			right: 0;
			content: "";
			width: 46rpx;
			height: 6rpx;
			margin: auto;
			background: linear-gradient(139deg, #02B2FC 0%, #017AF8 100%);
			border-radius: 4rpx;
		}
	}

	&-item {
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #e5e5e5;
		font-size: 28rpx;
		margin: 0 32rpx;
		padding: 37rpx 0;

		&--label {
			margin-right: 20rpx;
			width: 120rpx;
		}

		&--value {
			width: calc(100% - 120rpx);
		}
	}

	&-foot {
		display: flex;
		justify-content: space-between;
		border-top: 2rpx solid #e5e5e5;
		padding-top: 20rpx;

		&-btn {
			width: 165rpx;
			height: 60rpx;
			background: #2E7BFD;
			border-radius: 8rpx;
			font-size: 24rpx;
			color: #fff;
			padding: 0;
			margin: 0;
		}
	}
}

.suoervise-info-inspection-time {
	&-item {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
	}
}
</style>
