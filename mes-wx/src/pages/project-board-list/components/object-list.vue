<template>
  <view class="object-list">
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
              placeholder="搜索对象名称"
              cancel-button="none"
              bg-color="#F1F1F1"
              @confirm="pageListRef.reload()"
              @clear="() => (filterObject.search = '', pageListRef.reload())"
            />
          </view>
        </view>
      </template>
      <template #row="{row}: {row: MES.WechatJobObjectDTO}">
        <view
          class="project-board-list-item"
          @click="handleItem(row)"
        >
          <view class="project-board-list-item-left">
            <text>
              {{ row.objectName }}
            </text>
          </view>
          <view
            class="project-board-list-item-right"
            :class="{ 'project-board-list-item-right--info': filterObject.status !== 'shift' }"
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
import { mesWechatIndexSelectInspectionObjectList, mesWechatIndexSelectJobObjectList } from "@/api/mes/wechatController";
import PageList from "@/components/page-list/index.vue";
import PopupModal from "@/components/popup-modal/index.vue";
import { ProjectBoardFilterType } from "@/pages/project-board/index.vue";
import type { PropType, Ref } from "vue";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "ObjectList",
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
    const filterStatusData: {label: string, value: ProjectBoardFilterType | "all"}[] = [
      {label: "未整改",value: "unRectification",},
      {label: "未督查",value: "unInspection",}
    ]

    if(userRole !== "INSPECTOR") {
      filterStatusData.unshift({label: "已排班",value: "shift",})
      filterStatusData.unshift({label: "未排班",value: "noShift",})
    } else {
      filterStatusData.unshift({label: "已督查",value: "inspection",})
      filterStatusData.unshift({label: "应督查",value: "all",})
    }

    onMounted(() => {
      filterObject.status = props.filter
      pageListRef.value.load()
    })

    const getList = async () => {
      const params: any = {jobType: props.jobType, projectId, role: userRole,}
      filterObject.status !== "all" && (params.status = filterObject.status)
      filterObject.search !== "" && (params.objectName = filterObject.search)
      userRole === "INSPECTOR" && (params.role = undefined as any)
      const {data,} = await (userRole === "INSPECTOR" ? mesWechatIndexSelectInspectionObjectList(params) : mesWechatIndexSelectJobObjectList(params))
			
      return { data, }
    }

    const handleFilterStatus = (val: ProjectBoardFilterType | "all") => {
      filterObject.status = val
      pageListRef.value.load()
      popupVisible.value = false
    }

    const handleItem = (row: MES.WechatJobObjectDTO) => {
      const params = {
        pageType: "object",
        jobType: props.jobType,
        navTitle: row.objectName || "对象名称",
        objectId: row.objectId,
      }
      uni.navigateTo({url: `/pages/project-board-detail/index?data=${encodeURIComponent(JSON.stringify(params))}`,})
    }
		
    return {
      userRole,
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
