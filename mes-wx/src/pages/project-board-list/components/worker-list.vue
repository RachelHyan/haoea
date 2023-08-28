<template>
  <view class="worker-list">
    <page-list
      ref="pageListRef"
      :request="getList"
      custom-search
    >
      <template #search>
        <view class="project-board-list-filter">
          <view
            class="project-board-list-filter-left"
            @click="popupVisible = true"
          >
            <text class="mr20">
              {{ filterStatusData.find(item => item.value === filterObject.status)?.label }}
            </text>
            <uni-icons
              type="bottom" 
              color="#999"
              size="16"
            />
          </view>
          <view class="project-board-list-filter-right">
            <uni-search-bar
              v-model="filterObject.search"
              placeholder="搜索人员名称"
              cancel-button="none"
              bg-color="#F1F1F1"
              @confirm="pageListRef.reload()"
              @clear="() => (filterObject.search = '', pageListRef.reload())"
            />
          </view>
        </view>
      </template>
      <template #row="{row}: {row: MES.WechatUserTaskDTO}">
        <view
          class="project-board-list-item"
          @click="handleItem(row)"
        >
          <view class="project-board-list-item-left">
            <image
              style="width: 75rpx;height: 76rpx;border-radius: 100%;"
              :src="row.headUrl ?? 'https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/test/TX_default_man.png'"
            />
            <text class="ml20">
              {{ row.userName }}
            </text>
          </view>
          <view
            class="project-board-list-item-right"
            :class="{'project-board-list-item-right--error': filterObject.status === 'abnormal'}"
          >
            {{ filterStatusData.find(item => item.value === filterObject.status)?.label }}
          </view>
        </view>
      </template>
    </page-list>
    <popup-modal
      v-if="popupVisible"
      v-model:visible="popupVisible"
      :is-border-bottom="false"
      :show-header="false"
      bottom-cancel-item
      mask
    >
      <scroll-view
        scroll-y
        style="max-height: 900rpx;padding-bottom: 20rpx;"
      >
        <view
          v-for="(item,index) in filterStatusData"
          :key="index"
          class="filter-status-item"
          @click="handleFilterStatus(item.value)"
        >
          <text>{{ item.label }}</text>
        </view>
      </scroll-view>
    </popup-modal>
  </view>
</template>
<script lang='ts'>
import { mesWechatIndexSelectJobUserList } from "@/api/mes/wechatController";
import PageList from "@/components/page-list/index.vue";
import PopupModal from "@/components/popup-modal/index.vue";
import type { ProjectBoardFilterType } from "@/pages/project-board/index.vue";
import type { PropType, Ref } from "vue";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "WorkerList",
  components: { PageList, PopupModal, },
  props: {
    filter: {
      type: String as PropType<ProjectBoardFilterType>,
      required: true,
    },
    jobType: {
      type: String as PropType<"Manual_cleaning"|"Vehicle_operation">,
      required: true,
      default: "Manual_cleaning",
    },
  },
  setup(props){
    const projectId = uni.getStorageSync("projectInfo").projectId
    const userRole = uni.getStorageSync("userRole")
    const pageListRef = ref()
    const popupVisible: Ref<boolean> = ref<boolean>(false)
    const filterObject = reactive({status: "all", search: "",})
    const filterStatusData: {label: string, value: ProjectBoardFilterType}[] = [
      {label: "已排班", value: "shift",},
      {label: "未排班", value: "noShift",},
      {label: "在岗", value: "onJob",},
      {label: "脱岗", value: "offJob",},
      {label: "离线", value: "offline",}
    ]

    onMounted(() => {
      filterObject.status = props.filter
      pageListRef.value.load()
    })

    const getList = async () => {
      const params:MES.WechatIndexSelectJobUserListParams = {jobType: props.jobType, projectId, role: userRole,}
      filterObject.status !== "all" && (params.shiftStatus = filterObject.status)
      filterObject.search !== "" && (params.userName = filterObject.search)
      const {data,} = await mesWechatIndexSelectJobUserList(params)

      return { data, }
    }

    const handleFilterStatus = (val: ProjectBoardFilterType) => {
      filterObject.status = val
      pageListRef.value.load()
      popupVisible.value = false
    }


    const handleItem = (row: MES.WechatUserTaskDTO) => {
      const params = {
        pageType: "worker",
        jobType: props.jobType,
        navTitle: row.userName || "张三",
        userId: row.userId,
      }
      uni.navigateTo({url: `/pages/project-board-detail/index?data=${encodeURIComponent(JSON.stringify(params))}`,})
    }
		
    return {
      pageListRef,
      filterObject,
      popupVisible,
      filterStatusData,
      getList,
      handleFilterStatus,
      handleItem,
    }
  },
})
</script>
