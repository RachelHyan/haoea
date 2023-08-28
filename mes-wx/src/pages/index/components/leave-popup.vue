<template>
  <view>
    <popup-modal
      ref="popupRef"
      :visible="visible"
      mask
      title="请假"
      @update:visible="(val) => $emit('update:visible',val)"
    >
      <view class="leave-popup">
        <view
          class="leave-popup-row"
          @click="popupList.user = true"
        >
          <view><text>请假人</text></view>
          <view>
            <text :class="{'color-grey': !leaveModel.userName}">
              {{ leaveModel.userName ?? "请选择请假人" }}
            </text>
            <uni-icons
              type="right"
              color="#999"
              size="16"
            />
          </view>
        </view>
        <view
          class="leave-popup-row"
          @click="popupList.type = true"
        >
          <view><text>请假类型</text></view>
          <view>
            <text :class="{'color-grey': !leaveModel.typeLabel}">
              {{ leaveModel.typeLabel ?? "请选择请假类型" }}
            </text>
            <uni-icons
              type="right"
              color="#999"
              size="16"
            />
          </view>
        </view>
        <view
          class="leave-popup-row"
          @click="openShiftPopup"
        >
          <view><text>请假班次</text></view>
          <view>
            <text :class="{'color-grey': !leaveModel.shiftList.length}">
              {{ leaveModel.shiftList.length ? leaveModel.shiftList.map(item => item.shiftName).toString() : "请选择请假的班次" }}
            </text>
            <uni-icons
              type="right"
              color="#999"
              size="16"
            />
          </view>
        </view>
      </view>
      <view class="popup-foot">
        <button
          class="popup-foot-cancel popup-foot-btn"
          @click="$emit('update:visible', false)"
        >
          取消
        </button>
        <button
          class="popup-foot-confirm popup-foot-btn"
          @click="leaveConfirm"
        >
          确认
        </button>
      </view>
    </popup-modal>
    <selector-popup
      ref="userSelectorRef"
      v-model:visible="popupList.user"
      :request="getUserList"
      title="请假人"
      first-load
      search
      search-placeholder="输入关键词搜索"
      background-color="#F6F7F9"
    >
      <template #row="{row, close}: {row: MES.WechatInspectionUserDTO, close: () => undefined}">
        <view
          class="list-item"
          :class="{'list-item--active': row.userId === leaveModel.userId}"
          @click="handleUser(row, close)"
        >
          <text>{{ row.name ?? '-' }}</text>
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-model:visible="popupList.type"
      :request="getLeaveTypeList"
      title="请假类型"
      search
      search-placeholder="输入关键词搜索"
      background-color="#F6F7F9"
      first-load
    >
      <template #row="{row, close}: {row: {label: string,value: string}, close: () => undefined}">
        <view
          class="list-item"
          :class="{'list-item--active': row.value === leaveModel.type}"
          @click="handleLeaveType(row, close)"
        >
          <text>{{ row.label }}</text>
        </view>
      </template>
    </selector-popup>
    <selector-popup
      v-if="popupList.shift"
      v-model:visible="popupList.shift"
      :request="getShiftList"
      title="请假班次(可多选)"
      first-load
      search
      search-placeholder="输入关键词搜索"
      background-color="#F6F7F9"
    >
      <template #row="{row}: {row: MES.WechatJobTaskShiftDTO & { checked: boolean }}">
        <view
          class="list-item"
          :class="{'list-item--active': row.checked}"
          @click="row.checked = !row.checked"
        >
          <view style="display: flex;align-items: center;">
            <radio
              :checked="row.checked"
              style="transform: scale(0.7);"
            />
            <text>{{ row.shiftName }}</text>
          </view>
          <view><text>{{ (row.startTime??'00:00:00') + " - " + (row.endTime??"00:00:00") }}</text></view>
        </view>
      </template>
      <template #foot="{ close }">
        <view class="selector-popup-foot">
          <button
            class="selector-popup-foot-btn"
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
import { mesWechatCaptainSimpleGetLeave, mesWechatCaptainSimpleSelectUserList, mesWechatJobStatusSelectShiftListByUserId } from "@/api/mes/wechatController";
import PopupModal from "@/components/popup-modal/index.vue";
import SelectorPopup from "@/components/selector-popup/index.vue";
import dayjs from "dayjs";
import type { PropType, Ref } from "vue";
import { defineComponent, reactive, ref } from "vue";

type LeaveModelType = {
	userId?: number
	userName?: string
	type?: string
	typeLabel?: string
	shiftList: (MES.WechatJobTaskShiftDTO & {checked?: boolean})[]
	shiftName?: string[]
}

export default defineComponent({
  name: "LeavePopup",
  components: { PopupModal, SelectorPopup, },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    jobType: {
      type: String as PropType<"Manual_cleaning"|"Vehicle_operation">,
      required: true,
    },
  },
  emits: ["update:visible", "change"],
  setup(props){
    const projectId = uni.getStorageSync("projectInfo").projectId
    const popupRef = ref()
    const userSelectorRef = ref()
    const shiftSelectorRef = ref()
    const popupList = reactive({user: false, type: false, shift: false,})
    const leaveModel = reactive<LeaveModelType>({shiftList: [],})
    const shiftList: Ref<(MES.WechatJobTaskShiftDTO & {checked?: boolean})[]> = ref<(MES.WechatJobTaskShiftDTO & {checked?: boolean})[]>([])

    const getUserList = async ({ name, }: {name: string}) => {
      const params: MES.WechatCaptainSimpleSelectUserListParams = {projectId,jobType: props.jobType,}
      const { data, } = await mesWechatCaptainSimpleSelectUserList(params)

      return {data: data.filter(item => item.name?.includes(name??"")),}
    }

    const getLeaveTypeList = ({name,}: {name: string}) => {
      const list = [
        {label: "事假", value: "personal_leave",},
        {label: "病假", value: "sick_leave",},
        {label: "工伤假", value: "work_injury_leave",},
        {label: "婚假", value: "marriage_leave",},
        {label: "产假", value: "maternity_leave",},
        {label: "丧假", value: "bereavement_leave",},
        {label: "年休假", value: "annual_leave",}
      ]
      return {data: list.filter(item => item.label.includes(name??"")),}
    }

    const getShiftList = async ({ name, }: { name: string }) => {
      const params: MES.WechatJobStatusSelectShiftListByUserIdParams = { date: dayjs().format("YYYY-MM-DD"), userId: leaveModel.userId, }
      const { data, } = await mesWechatJobStatusSelectShiftListByUserId(params)
      const list = data.map(item => ({...item, checked: false,})).filter(item => item.shiftName?.includes(name??""))
      shiftList.value = list
      list.forEach((item) => {
        leaveModel.shiftList.forEach(selected => {
          if (item.taskId === selected.taskId) {
            item.checked = true
          }
        })
      })
      return { data: list, }
    }

    const openShiftPopup = () => {
      if(leaveModel.userId) {
        popupList.shift = true
      } else {
        uni.showToast({title: "请选择请假人",icon: "none",})
      }
    }

    const handleUser = (row: MES.WechatInspectionUserDTO, close: () => undefined) => {
      leaveModel.userId = row.userId
      leaveModel.userName = row.name
      close()
    }

    const handleLeaveType = (row: { label: string, value: string }, close: () => undefined) => {
      leaveModel.type = row.value
      leaveModel.typeLabel = row.label
      close()
    }

    const shiftConfirm = (close: () => undefined) => {
      leaveModel.shiftList = shiftList.value.filter(item => Boolean(item.checked))
      close()
    }

    const leaveConfirm = async () => {
      if (!leaveModel.userId){
        uni.showToast({title: "请选择请假人员", icon: "none",})
        return false;
      } else if (!leaveModel.type) {
        uni.showToast({title: "请选择请假类型", icon: "none",})
        return false;
      } else if (!leaveModel.shiftList.length) {
        uni.showToast({title: "请选择请假班次", icon: "none",})
        return false;
      }
      const params: MES.SimpleWechatLeaveParam = { leaveType: leaveModel.type,}
      params.taskIds = leaveModel.shiftList.filter(item => Boolean(item.checked)).map(item => item.taskId).toString()
      try {
        const { success, } = await mesWechatCaptainSimpleGetLeave(params)
        if(success) {
          uni.showToast({title: "请假成功", icon: "none",})
          popupRef.value.close()
        }
      } catch (error) {
      }
    }
		
    return {
      popupRef,
      userSelectorRef,
      shiftSelectorRef,
      popupList,
      leaveModel,
      openShiftPopup,
      handleUser,
      handleLeaveType,
      shiftConfirm,
      leaveConfirm,
      getUserList,
      getLeaveTypeList,
      getShiftList,
    }
  },
})
</script>
<style lang='scss'>
.leave-popup {
	padding: 0 32rpx;

	&-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 36rpx 0;
		border-bottom: 2rpx solid #E5E5E5;
		font-size: 28rpx;

		&:last-child {
			border-bottom: none;
			margin-bottom: 10rpx;
		}
	}
}
</style>
