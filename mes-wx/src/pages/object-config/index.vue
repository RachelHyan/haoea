<template>
  <view class="object-config">
    <nav-bar :title="navigationTitle" />
    <view
      v-if="pageMethod !== 'add'"
      class="object-config-item"
    >
      <view class="object-config-item--label">
        <text>对象编号</text>
      </view>
      <view class="object-config-item--value">
        <text>{{ detailData.objectCode }}</text>
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>对象名称</text>
      </view>
      <view class="object-config-item--value">
        <text v-if="pageMethod === 'detail' || (userRole === 'CAPTAIN' && pageMethod === 'edit')">
          {{ formModel.objectName }}
        </text>
        <uni-easyinput
          v-else
          v-model="formModel.objectName"
          type="text"
          placeholder="请输入对象名称"
          auto-height
          :input-border="false"
          @clear="formModel.objectName = ''"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>对象类型</text>
      </view>
      <view
        class="object-config-item--value"
        @click="!(pageMethod === 'detail' || (userRole === 'CAPTAIN' && pageMethod === 'edit')) && (popupList.objectType = true)"
      >
        <text :class="{ 'color-grey': !formModel.objectType }">
          {{ objectTypeList.find(item => item.value == formModel.objectType)?.label ?? "请选择对象类型" }}
        </text>
        <image
          v-if="pageMethod === 'detail' || (userRole === 'CAPTAIN' && pageMethod === 'edit')"
          style="width: 20rpx;height: 20rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-config-item-disabled.png"
        />
        <uni-icons
          v-else
          :class="{ 'spin-top': popupList.objectType }"
          type="bottom"
          color="#999"
          size="16"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>队别</text>
      </view>
      <view
        class="object-config-item--value"
        @click="popupList.grid = true"
      >
        <text :class="{ 'color-grey': !formModel.gridName }">
          {{ formModel.gridName || '请选择队别' }}
        </text>
        <image
          v-if="false"
          style="width: 20rpx;height: 20rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-config-item-disabled.png"
        />
        <uni-icons
          v-else
          type="bottom"
          color="#999"
          size="16"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>队长</text>
      </view>
      <view
        class="object-config-item--value"
        @click="pageMethod === 'add' && (popupList.chargeUser = true)"
      >
        <text :class="{ 'color-grey': !selectedChargeUsers.length }">
          {{ selectedChargeUsers.map(item => item.chargeUserName).filter(str => Boolean(str)).toString() || '请选择队长' }}
        </text>
        <image
          v-if="pageMethod !== 'add'"
          style="width: 20rpx;height: 20rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-config-item-disabled.png"
        />
        <uni-icons
          v-else
          type="bottom"
          color="#999"
          size="16"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>督查类型</text>
      </view>
      <view
        class="object-config-item--value"
        @click="!(pageMethod === 'detail' || (userRole === 'CAPTAIN' && pageMethod === 'edit')) && (popupList.inspectionType = true)"
      >
        <text :class="{ 'color-grey': !formModel.inspectionType }">
          {{ formModel.inspectionTypeName || '请选择督查类型' }}
        </text>
        <image
          v-if="pageMethod === 'detail' || (userRole === 'CAPTAIN' && pageMethod === 'edit')"
          style="width: 20rpx;height: 20rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-config-item-disabled.png"
        />
        <uni-icons
          v-else
          type="bottom"
          color="#999"
          size="16"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>督查员</text>
      </view>
      <view
        class="object-config-item--value"
        @click="!(pageMethod === 'detail' || (userRole === 'CAPTAIN' && pageMethod === 'edit')) && (popupList.inspector = true)"
      >
        <text :class="{ 'color-grey': !formModel.inspectorUserName }">
          {{ formModel.inspectorUserName || '请选择督查员' }}
        </text>
        <image
          v-if="pageMethod === 'detail' || (userRole === 'CAPTAIN' && pageMethod === 'edit')"
          style="width: 20rpx;height: 20rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-config-item-disabled.png"
        />
        <uni-icons
          v-else
          type="bottom"
          color="#999"
          size="16"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>督查次数</text>
      </view>
      <view class="object-config-item--value">
        <uni-easyinput
          v-model="formModel.inspectionCount"
          type="number"
          placeholder="请输入督查次数"
          auto-height
          :input-border="false"
          :disabled="userRole !== 'PROJECT_MANAGER'"
          @clear="formModel.inspectionCount = undefined"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>班次</text>
      </view>
      <view
        class="object-config-item--value"
        @click="pageMethod !== 'detail' && (popupList.shift = true)"
      >
        <text :class="{ 'color-grey': !selectedShift.length }">
          {{ selectedShift.map(item => item.shiftName).toString() || '请选择班次' }}
        </text>
        <image
          v-if="pageMethod === 'detail'"
          style="width: 20rpx;height: 20rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-config-item-disabled.png"
        />
        <uni-icons
          v-else
          type="bottom"
          color="#999"
          size="16"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>作业人员</text>
      </view>
      <view
        class="object-config-item--value"
        @click="pageMethod !== 'detail' && (popupList.workUser = true)"
      >
        <text :class="{ 'color-grey': !formModel.userId }">
          {{ formModel.userName || '请选择作业人员' }}
        </text>
        <image
          v-if="pageMethod === 'detail'"
          style="width: 20rpx;height: 20rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-config-item-disabled.png"
        />
        <uni-icons
          v-else
          type="bottom"
          color="#999"
          size="16"
        />
      </view>
    </view>
    <view
      v-if="detailData.jobType === 'Vehicle_operation'"
      class="object-config-item"
    >
      <view class="object-config-item--label">
        <text>作业车辆</text>
      </view>
      <view
        class="object-config-item--value"
        @click="pageMethod !== 'detail' && (popupList.workCar = true)"
      >
        <text :class="{ 'color-grey': !formModel.carId }">
          {{ formModel.carNumber || '请选择作业车辆' }}
        </text>
        <image
          v-if="pageMethod === 'detail'"
          style="width: 20rpx;height: 20rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.5/point-config-item-disabled.png"
        />
        <uni-icons
          v-else
          type="bottom"
          color="#999"
          size="16"
        />
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>经度</text>
      </view>
      <view class="object-config-item--value">
        <text>{{ formModel.longitude }}</text>
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>纬度</text>
      </view>
      <view class="object-config-item--value">
        <text>{{ formModel.latitude }}</text>
      </view>
    </view>
    <view class="object-config-item">
      <view class="object-config-item--label">
        <text>地址</text>
      </view>
      <view class="object-config-item--value">
        <text>{{ formModel.fullAddress }}</text>
      </view>
    </view>
    <button
      v-if="pageMethod !== 'detail'"
      class="object-config-btn"
      type="button"
      @click="handleSave"
    >
      保存
    </button>
    <button
      v-if="userRole === 'PROJECT_MANAGER' && pageMethod === 'edit'"
      class="object-config-btn"
      style="background-color: #F23C30;"
      type="button"
      @click="handleDelete"
    >
      删除
    </button>
    <selector-popup
      v-if="popupList.objectType"
      v-model:visible="popupList.objectType"
      title="请选择对象类型"
      :request="getObjectTypeList"
    >
      <template #list-item="{ row, close }">
        <view
          class="list-item"
          :class="{ 'list-item--active': row.value == formModel.objectType }"
          @click="handleObjectType(row, close)"
        >
          {{ row.label }}
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-if="popupList.grid"
      v-model:visible="popupList.grid"
      title="请选择队别"
      :request="getGridList"
    >
      <template #list-item="{ row, close }">
        <view
          class="list-item"
          :class="{ 'list-item--active': row.gridId === formModel.gridId }"
          @click="handleGrid(row, close)"
        >
          {{ row.gridName ?? '空' }}
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-if="popupList.inspectionType"
      v-model:visible="popupList.inspectionType"
      title="请选择督查类型"
      :request="getInspectionTypeList"
    >
      <template #list-item="{ row, close }">
        <view
          class="list-item"
          :class="{ 'list-item--active': row.value === formModel.inspectionType }"
          @click="handleInspectionType(row, close)"
        >
          {{ row.label ?? '空' }}
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-if="popupList.inspector"
      v-model:visible="popupList.inspector"
      title="请选择督查员"
      :request="getInspectionUserList"
    >
      <template #list-item="{ row, close }">
        <view
          class="list-item"
          :class="{ 'list-item--active': formModel.inspectorUserId == row.inspectorUserId }"
          @click="handleInspector(row, close)"
        >
          {{ row.inspectorUserName ?? '空' }}
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-if="popupList.chargeUser"
      v-model:visible="popupList.chargeUser"
      title="请选择队长(可多选)"
      :request="getChargeUserList"
    >
      <template #list-item="{ row }">
        <view
          class="list-item"
          :class="{ 'list-item--active': row.checked }"
          @click="row.checked = !row.checked"
        >
          {{ row.chargeUserName ?? '空' }}
        </view>
      </template>
      <template #foot="{ close }">
        <view class="select-popup-foot">
          <button
            class="select-popup-foot-btn"
            @click="chargeUserConfirm(close)"
          >
            确认
          </button>
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-if="popupList.workUser"
      v-model:visible="popupList.workUser"
      title="请选择作业人员"
      :request="getWorkUserList"
    >
      <template #list-item="{ row, close }">
        <view
          class="list-item"
          :class="{ 'list-item--active': formModel.userId === row.userId, 'list-item-red': row.taskIds }"
          @click="handleWorkUser(row, close)"
        >
          <view>{{ (row.name ?? "空") + (row.taskIds ? "(已排班)" : '') }}</view>
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-if="popupList.workCar"
      v-model:visible="popupList.workCar"
      title="请选择作业车辆"
      :request="getWorkCarList"
    >
      <template #list-item="{ row }">
        <view
          class="list-item"
          :class="{ 'list-item--active': formModel.carId === row.carId }"
          @click="formModel.carId = row.carId, formModel.carNumber = row.carNumber, popupList.workCar = false"
        >
          {{ row.carNumber ?? '空' }}
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-if="popupList.shift"
      v-model:visible="popupList.shift"
      title="请选择班次(可多选)"
      :request="getShiftList"
    >
      <template #list-item="{ row }">
        <view
          class="list-item"
          :class="{ 'list-item--active': row.checked }"
          @click="row.checked = !row.checked"
        >
          <text>{{ row.shiftName ?? '空' }}</text>
          <text>({{ row.jobStartTime + " - " + row.jobEndTime }})</text>
        </view>
      </template>
      <template #foot="{ close }">
        <view class="select-popup-foot">
          <button
            class="select-popup-foot-btn"
            @click="shiftConfirm(close)"
          >
            确认
          </button>
        </view>
      </template>
    </selector-popup>
  </view>
</template>
<script lang='ts'>
import { mesJobObjectQueryJayaChargeSwitchList } from "@/api/mes/jobObjectController";
import { mesObjectAllotQueryJayaMapCarSwitchList } from "@/api/mes/objectAllotController";
import { mesPlanBindingAddPlanOrTask } from "@/api/mes/planBindingController";
import { mesPlanQueryPlanInspectorUserList } from "@/api/mes/planController";
import { mesWechatCaptainSimpleSelectUserList, mesWechatProjectManagerSelectGridListByProject, mesWechatProjectManagerSelectShiftList, mesWechatProjectManagerSimpleAddObject, mesWechatProjectManagerSimpleSelectAllUserList } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import { fetchDictList, mesJobObjectDeleteJobObject } from "@/utils/api";
import { onLoad } from "@dcloudio/uni-app";
import type { Ref } from "vue";
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
import SelectorPopup from "./components/selector-popup.vue";
// @ts-ignore
import AMap from "@/libs/amap-wx";
import { logger } from "@/utils/fn";

type FormModelType = {
	objectType?: string
	objectCode?: string
	objectId?: number
	objectName?: string
	gridName?: string
	gridId?: number
	inspectionCount?: number
	inspectionType?: string
	inspectionTypeName?: string
	inspectorUserId?: number
	inspectorUserName?: string
	carNumber?: string
	carId?: number
	planId?: number
	planIds?: string
	userId?: number
	userName?: string
	longitude?: string
	latitude?: string
	fullAddress?: string
	shiftList?: (MES.WechatDefaultShiftDTO & { checked?: boolean })[]
	gridList?: MES.WechatGridUserDTO[]
	jobType?: "Manual_cleaning" | "Vehicle_operation"
}

export default defineComponent({
  name: "ObjectConfig",
  components: { SelectorPopup, NavBar, },
  setup() {
    // @ts-ignore
    const channel = getCurrentInstance()?.proxy?.getOpenerEventChannel()
    const projectId = uni.getStorageSync("projectInfo").projectId
    const projectCode = uni.getStorageSync("projectInfo").projectCode
    const userRole = uni.getStorageSync("userRole")
    const navigationTitle: Ref<string> = ref<string>("对象名称")
    const pageMethod: Ref<"add" | "edit" | "detail"> = ref<"add" | "edit" | "detail">("add")
    const objectTypeList: { label: string, value: string }[] = uni.getStorageSync("dict").scene_type
    const AMapUtil = new AMap.AMapWX({ key: "f6a73d4ba0bb8415376f2c6549e65a23", })
    const formModel: Ref<FormModelType> = ref<FormModelType>({})
    /** 用于存储督察员和作业人员，判断督察员是否有变动，如无变动则不传参数给后端 */
    const detailData: Ref<FormModelType & MES.WechatObjectPlanInfo> = ref<FormModelType & MES.WechatObjectPlanInfo>({})
    const popupList = reactive({ objectType: false, grid: false, inspectionType: false, inspector: false, workUser: false, chargeUser: false, workCar: false, shift: false, })
    const chargeUserList: Ref<(MES.JayaChargeSwitchDTO & {checked?: boolean})[]> = ref<(MES.JayaChargeSwitchDTO & {checked?: boolean})[]>([])
    const selectedChargeUsers: Ref<(MES.JayaChargeSwitchDTO & {checked?: boolean})[]> = ref<(MES.JayaChargeSwitchDTO & {checked?: boolean})[]>([])
    const shiftList: Ref<(MES.WechatDefaultShiftDTO & { checked?: boolean })[]> = ref<(MES.WechatDefaultShiftDTO & { checked?: boolean })[]>([])
    const selectedShift: Ref<(MES.WechatDefaultShiftDTO & { checked?: boolean })[]> = ref<(MES.WechatDefaultShiftDTO & { checked?: boolean })[]>([])

    onLoad((option) => {
      const res = JSON.parse(decodeURIComponent(<any>option.data))
      pageMethod.value = res.pageMethod
      navigationTitle.value = pageMethod.value === "add" ? "新增对象" : res.objectName
      detailData.value = res
      if (res.pageMethod === "add") {
        formModel.value = {
          jobType: res.jobType,
          longitude: res.routePointList[0][0],
          latitude: res.routePointList[0][1],
        }
        getFullAddress()
      } else {
        let defaultData = {
          jobType: res.jobType,
          objectId: res.objectId,
          objectName: res.objectName,
          objectType: res.objectType,
          longitude: res.routePointList[0][0],
          latitude: res.routePointList[0][1],
          fullAddress: res.addr,
          inspectionType: res.inspectionType,
          inspectionTypeName: res.inspectionTypeName,
        }
        if (res.planBindingList && res.planBindingList.length) {
          formModel.value = {
            ...defaultData,
            planIds: res.planBindingList.at(0).planIds,
            gridId: res.planBindingList.map((item: any) => item.gridId)[0],
            gridName: res.planBindingList.map((item: any) => item.gridName)[0],
            inspectorUserId: res.planBindingList.length ? res.planBindingList.at(0).inspectionUserList.map((item: any) => item.inspectionUserId)[0] : null,
            inspectorUserName: res.planBindingList.length ? res.planBindingList.at(0).inspectionUserList.map((item: any) => item.inspectionUserName).toString() : null,
            userId: res.planBindingList.length ? res.planBindingList?.at(0)?.userId : null,
            userName: res.planBindingList.length ? res.planBindingList?.at(0)?.userName : null,
            carId: res.planBindingList.length ? res.planBindingList?.at(0)?.carId : null,
            carNumber: res.planBindingList.length ? res.planBindingList?.at(0)?.carNumber : null,
          }
          selectedShift.value = res.planBindingList.length && res.planBindingList.at(0).shiftList.map((item: any) => ({ ...item, checked: true, }))
        } else {
          formModel.value = defaultData
        }
        selectedChargeUsers.value = res.chargeUserList ?  res.chargeUserList.map((item: any) => ({ ...item, checked: true, })) : []
      }
    })

    const getFullAddress = () => {
      AMapUtil.getRegeo({
        location: `${formModel.value.longitude}, ${formModel.value.latitude}`,
        success: (res: any) => {
          formModel.value.fullAddress = res.at(0).regeocodeData.formatted_address;
        },
        fail: (err: any) => logger.error("getFullAddress", err),
      })
    }
		
    const getObjectTypeList = async ({ name, }: { name?: string }) => {
      const list = objectTypeList.filter(item => item.label.includes(name ?? ""))
      return { data: list, }
    }

    const getGridList = async ({ name, }: { name: string }) => {
      let list: { gridId: number, gridName: string }[] = []
      const params: MES.WechatProjectManagerSelectGridListByProjectParams = { projectId: projectId, jobType: <string>detailData.value.jobType, }
      name !== "" && (params.gridName = name)
      if (pageMethod.value === "add") {
        const { data, } = await mesWechatProjectManagerSelectGridListByProject(params)
        data.unshift({ gridId: <any>null, gridName: <any>null, gridPointList: [], })
        list = data as any
      } else {
        list = detailData.value.planBindingList?.map(item => ({ gridId: item.gridId, gridName: item.gridName, })) as any
      }

      return { data: list, }
    }

    const getInspectionTypeList = async ({ name, }: { name: string }) => {
      const { data, } = await fetchDictList({ dictType: "inspection_type", })
      let list = data["inspection_type"].filter(item => item.label.includes(name ?? ""))
      list.unshift({ label: <any>null, value: <any>null, })
      return { data: list, }
    }

    const getInspectionUserList = async ({ name, }: { name: string }) => {
      const params: any = { projectId: projectId, }
      const { data, } = await mesPlanQueryPlanInspectorUserList(params)
      const list = data.filter(item => item.inspectorUserName.includes(name ?? ""))
      list.unshift({ inspectorUserId: <any>null, inspectorUserName: <any>null, })
      return { data: list, }
    }

    const getChargeUserList = async ({ name, }: { name: string }) => {
      const params: any = { projectId: projectId, }
      const { data, } = await mesJobObjectQueryJayaChargeSwitchList(params)
      const list = data.filter(item => item.chargeUserName.includes(name ?? "")).map(item => ({ ...item, checked: false, }))
      list.unshift({ chargeUserId: <any>null, chargeUserName: <any>null, checked: false, })
      chargeUserList.value = list
      list.forEach(item => {
        selectedChargeUsers.value.forEach(selected => {
          if (item.chargeUserId === selected.chargeUserId) {
            item.checked = true
          }
        })
      })
      return { data: list, }
    }

    const getWorkUserList = async ({ name, }: { name: string }) => {
      const params: any = { projectId: projectId, jobType: formModel.value.jobType, }
      userRole !== "CAPTAIN" && (selectedChargeUsers.value.length && (params.chargeUserIds = selectedChargeUsers.value.map(item => item.chargeUserId).filter(str => Boolean(str)).toString()));
      const { data, } = await (userRole === "CAPTAIN" ? mesWechatCaptainSimpleSelectUserList(params) : mesWechatProjectManagerSimpleSelectAllUserList(params))
      const list = data.filter(item => item.name?.includes(name ?? ""))
      list.unshift({ userId: <any>null, name: <any>null, })
      return { data: list, }
    }

    const getWorkCarList = async ({ name, }: { name: string }) => {
      const params: MES.ObjectAllotQueryJayaMapCarSwitchListParams = { projectId: projectId, }
      const { data, } = await mesObjectAllotQueryJayaMapCarSwitchList(params)
      const list = data.filter(item => item.carNumber.includes(name ?? ""))
      list.unshift({ carId: <any>null, carNumber: <any>null, })
      return { data: list, }
    }

    const getShiftList = async ({ name, }: { name: string }) => {
      const params: MES.WechatProjectManagerSelectShiftListParams = { projectId: projectId, objectId: <number>formModel.value.objectId, jobType: <string>detailData.value.jobType, }
      const { data, } = await mesWechatProjectManagerSelectShiftList(params)
      const list = data.map((item) => ({ ...item, checked: false, })).filter(item => item.shiftName?.includes(name ?? ""))
      shiftList.value = list
      if(pageMethod.value !== "add"){
        // 高亮已选的班次
        list.forEach((item) => {
          selectedShift.value.forEach(selected => {
            if (item.shiftId === selected.shiftId) {
              item.checked = true
            }
          })
        })
      }
      return { data: list, }
    }
		
    const handleObjectType = (row: { label: string, value: string }, close: () => undefined) => {
      formModel.value.objectType = row.value
      close()
    }

    const handleGrid = (row: MES.WechatGridUserDTO, close: () => undefined) => {
      formModel.value.gridId = row.gridId,
      formModel.value.gridName = row.gridName
      if (pageMethod.value === "edit") {
        const data = detailData.value.planBindingList?.find(item => item.gridId === row.gridId) || {}
        formModel.value.carId = data?.carId
        formModel.value.carNumber = data?.carNumber
        formModel.value.planIds = data?.planIds
        formModel.value.inspectorUserId = data?.inspectionUserList?.map((item: any) => item.inspectionUserId)[0],
        formModel.value.inspectorUserName = data?.inspectionUserList?.map((item: any) => item.inspectionUserName)[0]
        selectedShift.value = data?.shiftList?.map((item: any) => ({ ...item, checked: true, })) as any
        formModel.value.userId = data.userId
        formModel.value.userName = data.userName
      }
      close()
    }

    const handleInspectionType = (row: { label: string, value: string }, close: () => undefined) => {
      formModel.value.inspectionType = row.value
      formModel.value.inspectionTypeName = row.label
      close()
    }

    const handleInspector = (row: MES.PlanInspectorUserDTO, close: () => undefined) => {
      formModel.value.inspectorUserId = row.inspectorUserId
      formModel.value.inspectorUserName = row.inspectorUserName
      close()
    }

    const chargeUserConfirm = (close: () => undefined) => {
      selectedChargeUsers.value = chargeUserList.value.filter(item => Boolean(item.checked))
      close()
    }

    const handleWorkUser = (row: MES.WechatInspectionUserDTO, close: () => undefined) => {
      formModel.value.userId = row.userId
      formModel.value.userName = row.name
      close()
    }

    const handleWorkCar = (row: MES.JayaMapCarSwitchDTO,close: () => undefined) => {
      formModel.value.carId = row.carId
      formModel.value.carNumber = row.carNumber
      close()
    }

    const shiftConfirm = (close: () => undefined) => {
      selectedShift.value = shiftList.value.filter(item => Boolean(item.checked))
      close()
    }

    const formValidator = () => {
      if (!formModel.value.objectType) {
        uni.showToast({ title: "请选择对象类型", icon: "none", })
        return false
      } else if ((!formModel.value.objectName) || (!formModel.value.objectName.length)) {
        uni.showToast({ title: "对象名称不能空", icon: "none", })
        return false
      } else if (!selectedShift.value.length) {
        uni.showToast({ title: "请选择班次", icon: "none", })
        return false
      } else if (detailData.value.jobType === "Vehicle_operation" && (formModel.value.userId && (!formModel.value.carId))) {
        uni.showToast({ title: "请选择作业车辆", icon: "none", })
        return false
      } else if (formModel.value.carId && (!formModel.value.userId)) {
        uni.showToast({ title: "请选择作业人员", icon: "none", })
        return false
      } else if (!formModel.value.inspectionType) {
        uni.showToast({ title: "请选择督查类型", icon: "none", })
        return false
      } else {
        return true
      }
    }

    const handleSave = async () => {
      if (!formValidator()) return;
      uni.showLoading({ title: "正在提交", mask: true, })
      const shiftList = selectedShift.value
      shiftList?.forEach(item => {
        if (pageMethod.value === "edit") {
          detailData.value.planBindingList?.find(plan => plan.gridId === formModel.value.gridId)?.shiftList?.forEach(shift => {
            if (shift.shiftId === item.shiftId) {
              item.planId = shift.planId
            }
          })
        }
        delete item.checked;
      })
      const params: MES.WechatInspectionPointSaveParam & any = {
        objectId: detailData.value.objectId,
        sceneType: formModel.value.objectType,
        objectName: formModel.value.objectName,
        projectId,
        type: detailData.value.jobType,
        inspectionType: formModel.value.inspectionType,
        planBindingInParams: {
          carId: formModel.value.carId,
          gridId: formModel.value.gridId,
          inspectorUserId: formModel.value.inspectorUserId,
          planIds: formModel.value.planIds,
          shiftList,
          userId: formModel.value.userId,
        },
      }
      formModel.value.inspectionCount && (params.planBindingInParams.inspectionCount = formModel.value.inspectionCount)
      try {
        let flag = false
        if (pageMethod.value === "add") {
          const chargeUserIds = selectedChargeUsers.value.map(item => item.chargeUserId).filter(str => Boolean(str)).toString()
          params.projectCode = projectCode
          params.addr = formModel.value.fullAddress
          params.chargeUserIds = chargeUserIds.length ? chargeUserIds : undefined
          params.routePointList = [[Number(formModel.value.longitude), Number(formModel.value.latitude)]] as any
          const { success, } = await mesWechatProjectManagerSimpleAddObject({ ...params, })
          flag = success
        } else if (pageMethod.value === "edit") {
          // if((!formModel.value.inspectorUserId) && (!formModel.value.userId)) params.planBindingInParams = undefined
          const { success, } = await mesPlanBindingAddPlanOrTask({ isCreateTask: true, isEditObject: true, ...params, }) as any
          flag = success
        }
        uni.hideLoading()
        if (flag) {
          uni.showToast({ title: pageMethod.value === "add" ? "添加成功" : "编辑成功", icon: "none", })
          await new Promise((resolve) => setTimeout(resolve, 300))
          channel.emit("reload")
          uni.navigateBack()
        }
      } catch (error) {
      }
    }

    const handleDelete = async () => {
      uni.showModal({
        title: "提示",
        content: "确定删除该对象？",
        showCancel: true,
        success: async ({ confirm, }) => {
          if (confirm) {
            try {
              const { success, } = await mesJobObjectDeleteJobObject({ objectId: Number(detailData.value.objectId), })
              if (success) {
                uni.showToast({ title: "删除成功", icon: "success", })
                await new Promise((resolve) => setTimeout(resolve, 300))
                channel.emit("reload")
                uni.navigateBack()
              }
            } catch (error) { }
          }
        },
      })
    }

    return {
      formModel,
      detailData,
      navigationTitle,
      pageMethod,
      popupList,
      objectTypeList,
      userRole,
      chargeUserList,
      shiftList,
      selectedChargeUsers,
      selectedShift,
      handleObjectType,
      handleGrid,
      handleInspectionType,
      handleInspector,
      chargeUserConfirm,
      handleWorkUser,
      handleWorkCar,
      shiftConfirm,
      handleSave,
      handleDelete,
      getObjectTypeList,
      getGridList,
      getInspectionTypeList,
      getInspectionUserList,
      getChargeUserList,
      getWorkUserList,
      getWorkCarList,
      getShiftList,
      
    }
  },
})
</script>
<style lang='scss'>
.object-config {
	padding: 0 32rpx 60rpx;

	&-item {
		border-bottom: 2rpx solid #e5e5e5;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		padding: 30rpx 0;

		&--label {
			width: 130rpx;
		}

		&--value {
			width: calc(100% - 130rpx);
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	&-btn {
		background-color: #3E79F7;
		font-size: 30rpx;
		color: #fff;
		margin-top: 30rpx;
	}

	.spin-top {
		transform: rotateX(20deg);
		transition: all 0.5s;
	}

	.uni-easyinput {
		.uni-easyinput__content-input {
			padding-left: 0 !important;
			font-size: 28rpx !important;

			.uni-easyinput__placeholder-class {
				padding: 0 !important;
				font-size: 28rpx !important;
			}
		}

		.is-disabled {
			color: #000 !important;
			background: #fff !important;
		}
	}

	.select-popup-foot-btn {
		width: 90vw;
		height: 60rpx;
		background: #2E7BFD;
		border-radius: 8rpx;
		font-size: 24rpx;
		color: #fff;
		padding: 0;
		margin: 0 auto;
	}
}
</style>
