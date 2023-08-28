<template>
  <div
    class="grid-panel panel"
    :style="{maxHeight:panelHeight + 'px'}"
  >
    <div
      class="grid"
    >
      <div class="panel-header">
        <el-icon
          :size="20"
          @click="$emit('back')"
        >
          <ArrowLeftBold />
        </el-icon>
        <span class="panel-header-title">网格信息</span>
      </div>
      <div
        v-loading="loading"
        class="panel-info"
      >
        <card-header :title="'网格名称：' + gridInfoData.gridName" />
        <div class="panel-info-content">
          <div class="panel-info-content--shift">
            <div class="panel-info-content--shift-title">
              班次：
            </div>
            <div class="panel-info-content--shift-select">
              <el-select
                v-model="currentShift.shiftId"
                placeholder="请选择"
                @change="shiftChange"
              >
                <el-option
                  v-for="item in gridInfoData.planShiftList"
                  :key="item.shiftId"
                  :label="item.shiftName"
                  :value="item.shiftId"
                />
              </el-select>
              <el-input
                v-model="currentShift.shiftTime"
                readonly
              />
            </div>
            <el-dropdown
              ref="dropdown"
              trigger="contextmenu"
              size="small"
            >
              <el-icon
                class="el-dropdown-link"
                @click="dropdown.handleOpen()"
              >
                <Operation />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="generativeSchedule">
                    生成当天排班
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div>
            <div>
              <div>作业人员{{ userPagination.total }}人</div>
              <div
                v-if="userPagination.total > 0"
                class="panel-info-content--item"
              >
                <div class="panel-info-content--item__btn">
                  <el-button
                    class="panel-info-content--item__btn--left"
                    link
                    :disabled="userPagination.current <= 1 ? true : false"
                    @click="handlePageChange('prev')"
                  >
                    <el-icon
                      size="24px"
                      :color="
                        userPagination.current <= 1 ? 'rgba(0,0,0,0.11)' : '#409eff'
                      "
                    >
                      <ArrowLeftBold />
                    </el-icon>
                  </el-button>
                </div>
                <div class="panel-info-content--item-personnal">
                  <div
                    v-for="(item, index) in currentUserList"
                    :key="item.userId"
                    :class="item.userId === currentUserId ? 'item--active' : ''"
                    @click="showInspector(item)"
                  >
                    <el-badge
                      :value="item.count !== 0 ? item.count : ''"
                      :max="99"
                      class="item"
                    >
                      <img
                        style="width: 36px; height: 36px; border-radius: 50%"
                        :src="
                          item.headUrl ||
                            'https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/TX_19912345678.png'
                        "
                      >
                    </el-badge>
                    <el-tooltip
                      class="personnal-user-name"
                      effect="light"
                      :content="item.userName"
                      placement="right"
                      :disabled="isShowTooltip"
                    >
                      <p @mouseenter="onMouseOver(userNameRef, index)">
                        <span ref="userNameRef">{{ item.userName }}</span>
                      </p>
                    </el-tooltip>
                  </div>
                </div>
                <div class="panel-info-content--item__btn">
                  <el-button
                    class="panel-info-content--item__btn--right"
                    link
                    :disabled="
                      userPagination.current >= userPagination.pages ? true : false
                    "
                    @click="handlePageChange('next')"
                  >
                    <el-icon
                      size="24px"
                      :color="
                        userPagination.current >= userPagination.pages
                          ? 'rgba(0,0,0,0.11)'
                          : '#409eff'
                      "
                    >
                      <ArrowRightBold />
                    </el-icon>
                  </el-button>
                </div>
              </div>
              <div
                v-else
                style="text-align: center; padding: 20px 0; color: rgba(0,0,0,0.45);"
              >
                暂无数据
              </div>
            </div>
          </div>
        </div>
        <div
          class="inspector-container"
        >
          <div
            class="panel-tabs"
          >
            <div
              class="panel-tab-pane"
              :class="activeTab === 1 ? 'panel-tab-pane--active' : ''"
              @click="activeTab = 1, qualityEditStatus = checkinEditStatus = false"
            >
              考勤督查
            </div>
            <div
              class="panel-tab-pane"
              :class="activeTab === 2 ? 'panel-tab-pane--active' : ''"
              @click="activeTab = 2, qualityEditStatus = checkinEditStatus = false"
            >
              质量督查
            </div>
          </div>
          <div
            v-if="activeTab === 1"
            class="inspector-container--checkin"
          >
            <div v-if="currentUserData.count > 0">
              <div
                class="item--container"
              >
                <span class="title">{{ cardType === 'Vehicle_operation' ? '作业对象' : '作业对象/督查点' }}：</span>
                <el-select
                  v-model="currentUserData.planId"
                  placeholder="请选择"
                  style="width: 150px"
                  @change="handleCheckingChange"
                >
                  <el-option
                    v-for="item in currentUserData.checkingPointList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="item--container">
                <span class="title">督查员：</span>
                <el-select
                  v-model="currentUserData.checkingInspectorUserId"
                  placeholder="请选择"
                  style="width: 150px"
                  filterable
                  :disabled="!checkinEditStatus"
                >
                  <el-option
                    v-for="item in inspectorList"
                    :key="item.inspectorUserId"
                    :label="item.inspectorUserName"
                    :value="item.inspectorUserId"
                  />
                </el-select>
              </div>
              <div class="item--container">
                <span class="title">督查时间：</span>
                <div>
                  <time-picker-list
                    :data="currentUserData.checkingInspectorTime"
                    :edit-status="checkinEditStatus"
                    @delete="handlerDelete"
                    @add="handlerAdd"
                  />
                </div>
              </div>
              <el-button
                v-if="currentUserData.count > 0"
                type="primary"
                style="margin-top: 20px; width: 100%"
                :loading="submitLoading"
                @click="checkinEditStatus ? saveInspector() : checkinEditStatus = true"
              >
                {{ checkinEditStatus ? '保存' : '编辑' }}
              </el-button>
            </div>
            <div
              v-else
              class="empty-message"
            >
              {{ cardType === 'Vehicle_operation' ? '请先绑定对象' : '请先绑定对象/督查点' }}
            </div>
          </div>
          <div
            v-if="activeTab === 2"
            class="inspector-container--quality"
          >
            <div v-if="currentUserData.count > 0">
              <div
                class="item--container"
              >
                <span class="title">{{ cardType === 'Vehicle_operation' ? '作业对象' : '作业对象/督查点' }}：</span>
                <el-select
                  v-model="currentUserData.planPointId"
                  placeholder="请选择"
                  style="width: 150px"
                  @change="handleQualityChange"
                >
                  <el-option
                    v-for="item in currentUserData.qualityPointList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div
                v-if="cardType === 'Vehicle_operation'"
                class="item--container"
              >
                <span class="title">作业车辆：</span>{{ currentUserData.carNumber }}
              </div>
              <div class="item--container">
                <span class="title">督查员：</span>
                <el-select
                  v-model="currentUserData.qualityInspectorUserId"
                  placeholder="请选择"
                  style="width: 150px;"
                  filterable
                  :disabled="!qualityEditStatus"
                >
                  <el-option
                    v-for="item in inspectorList"
                    :key="item.inspectorUserId"
                    :label="item.inspectorUserName"
                    :value="item.inspectorUserId"
                  />
                </el-select>
              </div>
              <div class="item--container">
                <span class="title">督查时间：</span>
                <div>
                  <time-picker-list
                    :data="currentUserData.qualityInspectorTime"
                    :edit-status="qualityEditStatus"
                    @delete="handlerDelete"
                    @add="handlerAdd"
                  />
                </div>
              </div>
              <el-button
                type="primary"
                style="margin-top: 20px; width: 100%"
                :loading="submitLoading"
                @click="qualityEditStatus ? editInspector() : qualityEditStatus = true"
              >
                {{ qualityEditStatus ? '保存' : '编辑' }}
              </el-button>
            </div>
            <div
              v-else
              class="empty-message"
            >
              {{ cardType === 'Vehicle_operation' ? '请先绑定对象' : '请先绑定对象/督查点' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  mesPlanFillShift,
  mesPlanQueryPlanInspectorUserList,
  mesPlanQueryPlanViewGridInfoShift,
  mesPlanQueryPlanViewShiftCar,
  mesPlanQueryPlanViewShiftUser,
  mesPlanUpdatePlanInspectorBindingInfo
} from "@/api/mes/planController";
import { CardHeader } from "@/components";
import { useProject } from "@/stores/project";
import { ElMessage, ElMessageBox, dayjs } from "element-plus";
import { Ref, defineComponent, reactive, ref, watch } from "vue";
import TimePickerList from "./time-picker-list.vue";

interface CurrentUserData {
  userId?: number;
  count: number;
  checkingInspectorTime?: any;
  checkingInspectorUserId?: number;
  planId?: number;
  planPointId?: number;
  qualityInspectorTime?: any;
  qualityInspectorUserId?: number;
  qualityInspectorUserName?: string;
  inspectorPointList: any[];
	carNumber?: string;
	carId?: number;
	checkingPointList?: any[];
	qualityPointList?:any[];
	checkingList?:any[];
}

export default defineComponent({
  name: "GridPanel",
  components: {
    CardHeader,
    TimePickerList,
  },
  props: {
    currentData: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    },
    cardType: {
      type: String,
      default: "Manual_cleaning",
    },
  },
  emits: ["shiftUserList", "currentShift","back","currentPoint","shiftCarList","currentObject"],
  setup(props, { emit, }) {
    const project = useProject();
    const projectId = project.$state.projectId as number;
    const panelHeight = ref(window.innerHeight - 230);
    const userNameRef = ref();
    const dropdown = ref();
    const activeTab: Ref<number> = ref(1);
    const currentUserId = ref<number>();
    const currentCarId = ref<number>();
    const currentShiftId = ref<number>();
    const operationActiveName = ref<string>("");
    const loading = ref<boolean>(false);
    const remoteUserLoading = ref<boolean>(false);
    const submitLoading = ref<boolean>(false);
    const checkinEditStatus = ref<boolean>(true);
    const qualityEditStatus = ref<boolean>(true);
    const shiftUserList = ref<MES.PlanUserDTO[]>([]);
    const shiftCarList = ref<MES.PlanCarDTO[]>([]);
    const currentUserList = ref<MES.PlanUserDTO[]>([]);
    const inspectorList = ref<MES.PlanInspectorUserDTO[]>([]);
    const isShowTooltip = ref<boolean>(false);
    const gridInfoData = ref<any>({current: 0,pages: 0,total: 0,pageSize: 0,gridName: "",});
    const currentShift = reactive({shiftId: 0,shiftName:"",shiftTime: "",jobStartTime: "",jobDuration: "",currentSchedule:undefined,});
    const userPagination = reactive({ pageSize: 12, current: 1, pages: 0, total: 0, });
    const currentPoint = ref<number[]>([]);
    const currentObject = ref<number[]>([]);
    const currentUserData = reactive<CurrentUserData>({count:0,inspectorPointList:[],});

    const getGridInfo = async () => {
      loading.value = true;
      try {
        let { data, } = await mesPlanQueryPlanViewGridInfoShift({
          gridId: props.currentData.gridId,
          teamId: props.currentData.teamId,
          projectId,
          type:props.cardType,
        });
        gridInfoData.value = data;
				
        if(gridInfoData.value.planShiftList.length > 0) {
          currentShiftId.value ??= gridInfoData.value.planShiftList[0].shiftId;

          const currentShiftItem = gridInfoData.value.planShiftList.find(
            (item:any) => item.shiftId === currentShiftId.value
          );

          if (currentShiftItem) {
            currentShift.shiftId = currentShiftItem.shiftId;
            currentShift.shiftTime = `${currentShiftItem.jobStartTime}-${currentShiftItem.jobEndTime}`;
            currentShift.jobStartTime = currentShiftItem.jobStartTime;
            currentShift.jobDuration = currentShiftItem.jobDuration;
            currentShift.currentSchedule = currentShiftItem.currentSchedule;
            currentShift.shiftName = currentShiftItem.shiftName;
          } else {
            resetCurrentShift();
          }
        } else {
          resetCurrentShift();
        }
				
        await getShiftUserData();
        await getShiftCarData();
        emit("currentShift", currentShift);
      } catch (error) {
        console.error(error);
				
      }finally{
        loading.value = false;
      }
    };

    const resetCurrentShift = () => {
      currentShiftId.value = undefined;
      currentShift.currentSchedule = undefined;
      currentShift.shiftId = 0;
      currentShift.shiftName = "";
      currentShift.shiftTime = "";
      currentShift.jobStartTime = "";
      currentShift.jobDuration = "";
    };

    const getShiftUserData = async () => {
      try {
        let { data, } = await mesPlanQueryPlanViewShiftUser({
          gridId: props.currentData.gridId,
          projectId,
          shiftId: currentShift.shiftId,
        });

        if (data.length === 0) {
          shiftUserList.value = [];
          currentUserList.value = [];
          currentUserData.count = 0;
          emit("shiftUserList", data);
          emit("currentPoint", []);
          emit("currentObject", []);
          return;
        }
        shiftUserList.value = data;
				
        currentUserId.value ??= shiftUserList.value[0].userId;

        userPagination.total = data.length;
        userPagination.pages = Math.ceil(data.length / userPagination.pageSize);
        userPagination.current ??= 1;

        currentUserList.value = shiftUserList.value.slice((userPagination.current - 1) * userPagination.pageSize, userPagination.current * userPagination.pageSize);
				
        showInspector(shiftUserList.value.find((item) => item.userId === currentUserId.value) as MES.PlanUserDTO);
				
        qualityEditStatus.value = false;
        checkinEditStatus.value = false;
				
        emit("shiftUserList", shiftUserList.value);
      } catch (e) {
        console.error(e);
      }
    };

    const getShiftCarData = async () => {
      try {
        let { data, } = await mesPlanQueryPlanViewShiftCar({
          projectId,
          shiftId: currentShift.shiftId,
        });
        if (data.length === 0) {
          shiftCarList.value = [];
          emit("shiftCarList", data);
          return;
        }
        shiftCarList.value = data;
        emit("shiftCarList", data);
				
        currentCarId.value ??= shiftCarList.value[0].carId;

        showInspector(shiftCarList.value.find((item) => item.carId === currentUserId.value) as MES.PlanUserDTO);
				
        qualityEditStatus.value = false;
        checkinEditStatus.value = false;
      } catch (e) {
        console.error(e);	
      }
    };

    const handlePageChange = (type:"prev" | "next") => {
      userPagination.current += type === "prev" ? -1 : 1;
      currentUserList.value = shiftUserList.value.slice((userPagination.current - 1) * userPagination.pageSize, userPagination.current * userPagination.pageSize);
    }

    const shiftChange = async (val: number) => {
      currentUserId.value = undefined;
      userPagination.current = 1;
      userPagination.total = 0;

      activeTab.value = 1;

      loading.value = true;
      await getShiftUserData();
      await getShiftCarData();
      loading.value = false;
			
      const selectedShift = gridInfoData.value.planShiftList.find((item:any) => item.shiftId === val);

      if (selectedShift) {
        currentShift.shiftTime = `${selectedShift.jobStartTime}-${selectedShift.jobEndTime}`;
        currentShift.jobStartTime = selectedShift.jobStartTime;
        currentShift.jobDuration = selectedShift.jobDuration;
        currentShift.currentSchedule = selectedShift.currentSchedule;
        currentShift.shiftName = selectedShift.shiftName;

        emit("currentShift", currentShift);
      }
    };

    const showInspector = (data: any) => {
      let qualityPointList:any[] = [];
      let pointList:any[] = [];
      qualityEditStatus.value = checkinEditStatus.value = false;

      currentUserData.checkingPointList = data.userPointList.map((item: any) => ({
        value: item.planId,
        label: item.bindName,
      }));
			
      data.userPointList.forEach((item: any) => {
				
        currentUserData.checkingInspectorTime = item.checkingInspectorTime.split(",").map((item: string) => ({ ruleValue: item.split(":").slice(0, 2).join(":"), }));

        qualityPointList.push(...item.inspectorPointList.map((point: any) => ({
          value: point.planPointId,
          label: point.bindName,
        })));
				
        pointList.push(...item.inspectorPointList.map((item: any) => ({
          ...item, 
          qualityInspectorTime: item.qualityInspectorTime.split(",").map((time: string) => ({ ruleValue: time.split(":").slice(0, 2).join(":"), })),
        })));
      });

      currentUserData.qualityPointList = qualityPointList;
      currentUserData.inspectorPointList = pointList;
      currentUserData.checkingList = data.userPointList.map((item: any) => ({
        ...item,
        checkingInspectorTime: item.checkingInspectorTime.split(",").map((time: string) => ({ ruleValue: time.split(":").slice(0, 2).join(":"), })),
      }));

      const firstPoint = currentUserData.inspectorPointList[0];
      const firstCheckingPoint = data.userPointList[0];
			
      currentUserId.value = data.userId;
      currentUserData.userId = data.userId;
      currentUserData.count = data.count || 0;
			
      currentUserData.planId = firstCheckingPoint.planId;
      currentUserData.checkingInspectorUserId = firstCheckingPoint.checkingInspectorUserId;
      currentUserData.planPointId = firstPoint.planPointId;
      currentUserData.qualityInspectorUserName = firstPoint.qualityInspectorUserName;
      currentUserData.qualityInspectorTime = firstPoint.qualityInspectorTime;
      currentUserData.qualityInspectorUserId = firstPoint.qualityInspectorUserId;
      currentUserData.carNumber = firstPoint.carNumber;
			
      handleQualityChange(currentUserData.planPointId);
      handleCheckingChange(currentUserData.planId);
      currentPoint.value = currentUserData.inspectorPointList.map((item:any) => {
        if (item.bindType === "point") {
          return item.bindId;
        }
      });
      currentObject.value = currentUserData.inspectorPointList.map((item:any) => {
        if (item.bindType === "object") {
          return item.bindId;
        }
      });
      emit("currentPoint", currentPoint.value);
      emit("currentObject", currentObject.value);
    };

    const remoteUser = async () => {
      remoteUserLoading.value = true;
      try {
        const { data, } = await mesPlanQueryPlanInspectorUserList({projectId, });
        inspectorList.value = data;
      } catch (e) {
        console.error(e);
				
      }finally{
        remoteUserLoading.value = false;
      }
    };

    const handlerAdd = () => {
      const data = activeTab.value === 1 ? currentUserData.checkingInspectorTime : currentUserData.qualityInspectorTime;
      data.push({ ruleValue: "", });
    };

    const handlerDelete = (index: number) => {
      const data = activeTab.value === 1 ? currentUserData.checkingInspectorTime : currentUserData.qualityInspectorTime;
      data.splice(index, 1);
    };
		
    const saveInspector = async () => {
      if (currentUserData.checkingInspectorTime.some((item:any) => !item.ruleValue)) {
        ElMessage.warning("请选择时间");
        return;
      }
      const params = {
        planId:currentUserData.planId,
        checkingInspectorTime: currentUserData.checkingInspectorTime
          .filter((item:any) => Boolean(item.ruleValue))
          .map((item: any) => item.ruleValue + ":00")
          .join(","),
        checkingInspectorUserId: currentUserData.checkingInspectorUserId,
        carId: currentUserData.carId,
      };
      submitLoading.value = true;

      try {
        const { code, } = await mesPlanUpdatePlanInspectorBindingInfo(params);

        code === 200 && ElMessage.success("保存成功");
        getShiftUserData();
      } catch (e) {
        console.error(e);
				
      } finally {
        checkinEditStatus.value = false;
        submitLoading.value = false;
      }
    };

    const editInspector = async () => {
      if (currentUserData.qualityInspectorTime.some((item:any) => !item.ruleValue)) {
        ElMessage.warning("请选择时间");
        return;
      }
      const params = {
        planPointId: currentUserData.planPointId,
        qualityInspectorTime: currentUserData.qualityInspectorTime
          .filter((item:any) => Boolean(item.ruleValue))
          .map((item: any) => item.ruleValue + ":00")
          .join(","),
        qualityInspectorUserId: currentUserData.qualityInspectorUserId,
      };
      submitLoading.value = true;
			
      try {
        const { code, } = await mesPlanUpdatePlanInspectorBindingInfo(params);

        code === 200 && ElMessage.success("保存成功");
        getShiftUserData();
      } catch (e) {
        console.error(e);
      } finally {
      	qualityEditStatus.value = false;
        submitLoading.value = false;
      }
    }

    const onMouseOver = (ref: any, index: number) => {
      let parentWidth = ref[index].parentNode.offsetWidth;
      let contentWidth = ref[index].offsetWidth;
      isShowTooltip.value = contentWidth <= parentWidth;
    };

    const handleCheckingChange = (val:any) => {
      const inspectorPoint = currentUserData.checkingList?.find(item => item.planId === val);

      if (inspectorPoint) {
        currentUserData.checkingInspectorUserId = inspectorPoint.checkingInspectorUserId;
        currentUserData.checkingInspectorTime = inspectorPoint.checkingInspectorTime;
      }
    };

    const handleQualityChange = (val:any) => {
			
      const inspectorPoint = currentUserData.inspectorPointList?.find(item => item.planPointId === val);
      if (inspectorPoint) {
        currentUserData.qualityInspectorUserId = inspectorPoint.qualityInspectorUserId;
        currentUserData.qualityInspectorUserName = inspectorPoint.qualityInspectorUserName;
        currentUserData.qualityInspectorTime = inspectorPoint.qualityInspectorTime;
      }
    };

    const generativeSchedule = () => {
      if (dayjs().isAfter(dayjs(currentShift.jobStartTime, "HH:mm"), "minute")) {
        ElMessage.warning("作业已开始，无法生成今日排班！");
        return;
      }	
			
      const confirmText = currentShift.currentSchedule
        ? "请确认是否重新生成今日排班？"
        : "请确认是否立即生成今日排班？";

      ElMessageBox.confirm(confirmText, `今日班次排班状态：${currentShift.currentSchedule ? "已排班" : "未排班"}`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          currentShiftId.value = currentShift.shiftId;

          try {
            const params = {
              projectId,
              gridId: gridInfoData.value.gridId,
              gridName: gridInfoData.value.gridName,
              shiftId: currentShift.shiftId,
              shiftName: currentShift.shiftName,
            };

            const { code, } = await mesPlanFillShift(params);

            code === 200 && ElMessage.success("生成成功");
            getGridInfo();
          } catch (e) {
            console.error(e);
          }
        })
        .catch(() => {
          ElMessage.info("已取消生成");
        });
    };
		
    window.addEventListener("resize", () => {
      panelHeight.value = window.innerHeight - 230;
    });

    watch(props.currentData,() => {
      currentShiftId.value = undefined;
      currentUserId.value = undefined;
    },{deep:true,});

    watch(() => activeTab.value,() => {
      getShiftUserData();
    });
		
    getGridInfo();
    remoteUser();

    return {
      userNameRef,
      dropdown,
      activeTab,
      gridInfoData,
      currentShift,
      shiftUserList,
      shiftCarList,
      currentUserList,
      isShowTooltip,
      userPagination,
      currentUserId,
      operationActiveName,
      inspectorList,
      loading,
      remoteUserLoading,
      currentUserData,
      submitLoading,
      qualityEditStatus,
      checkinEditStatus,
      panelHeight,
      editInspector,
      shiftChange,
      onMouseOver,
      handlerAdd,
      handlerDelete,
      showInspector,
      handlePageChange,
      saveInspector,
      remoteUser,
      getShiftUserData,
      handleCheckingChange,
      handleQualityChange,
      generativeSchedule,
      getGridInfo,
    };
  },
});
</script>

<style lang="less">
.grid-panel {
	overflow-y:auto;
	&::-webkit-scrollbar {
		display: none;
	}
	
	
	.panel-header {
		display: flex;
		align-items: center;

		.el-icon {
			cursor: pointer;
		}

		&-title {
			flex: 1;
				text-align: center;
				font-size: 18px;
		}
	}

	.panel-info-content--shift {
		display: flex;
		align-items: center;

		&-title {
			width: 50px;
		}

		&-select {
			display: flex;
			width: 250px;
		}

			
			.el-dropdown-link {
				cursor: pointer;
				margin-left: 40px;
			}

	}

	.panel-info-content--item-personnal {
		overflow: visible;
		margin: 10px 0;
		cursor: pointer;

		.item--active {
			background: #f5f5f5;
		}
	}

	.inspector-container {
		margin-bottom: 10px;

		&--checkin,
		&--quality {
			padding: 10px;
			display: flex;
			flex-direction: column;

			.item--container {
				padding: 10px;
				display: flex;
			}
		}

		.title {
			display: inline-block;
			width: 120px;
			text-align: right;
		}

		.empty-message {
			height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20px;
			color: #D50000;
		}
	}
}
</style>
