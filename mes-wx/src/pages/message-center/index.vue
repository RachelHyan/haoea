<template>
  <view class="message-center">
    <nav-bar title="消息中心" />
    <page-list
      ref="pageListRef"
      :request="getMessageList"
      custom-search
      laypage
    >
      <template #row="{ row }: { row: MES.WechatAllotRecordDTO }">
        <view
          class="message-center-item"
          @click="handleMessage(row)"
        >
          <view class="message-center-item-head">
            <view class="message-center-item-head-left">
              <view
                class="message-center-item-head-tag"
                :style="{background: row.status ? '#20CC8C' : '#EC1D1D'}"
              >
                {{ row.status ? '已读' : "未读" }}
              </view>
              <text class="message-center-item-head-text">
                {{ row.allotRule }}
              </text>
            </view>
            <view class="message-center-item-head-time">
              {{ row.createTime || '-' }}
            </view>
          </view>
          <view class="message-center-item-content">
            <text>{{ row.message }}</text>
          </view>
        </view>
      </template>
    </page-list>
    <view
      class="message-center-readed"
      @click="handleReaded()"
    >
      <image
        style="width: 166rpx;height: 174rpx;"
        src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v2.0/message-center-readed.png"
      />
    </view>
  </view>
</template>
<script lang='ts'>
import { mesWechatUserQueryAllotRecordPageList, mesWechatUserReadMessage } from "@/api/mes/wechatController";
import NavBar from "@/components/nav-bar/index.vue";
import type { PageListParam } from "@/components/page-list/index.vue";
import PageList from "@/components/page-list/index.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MessageCenter",
  components: { NavBar, PageList, },
  setup(){
    const projectId = uni.getStorageSync("projectInfo").projectId
    const pageListRef = ref()
		
    const getMessageList = async (params: PageListParam & MES.WechatUserQueryAllotRecordPageListParams) => {
      params.projectId = projectId
      const { data, current, total, pageSize, pages, } = await mesWechatUserQueryAllotRecordPageList(params)

      return { data, current, pages, total, pageSize, }
    }

    const handleMessage = (row: MES.WechatAllotRecordDTO) => {
      uni.showModal({
        title: row.allotRule,
        content: row.message,
        showCancel: false,
        confirmText: "我知道了",
        confirmColor: "#007aff",
      })
      if(!row.status) {
        handleReaded(row.id)
        row.status = 1
      }
    }

    /** @param {Number} id 无 id 时是全部已读，有 id 值时是单条消息已读的请求 */
    const handleReaded = async (id?: number) => {
      const params:MES.WechatUserReadMessageParams = {}
      id && (params.ids = String(id))
      try {
        await mesWechatUserReadMessage(params)
      } catch (error) {
      } finally {
        !id && pageListRef.value.reload()
      }
    }

    return {
      pageListRef,
      getMessageList,
      handleMessage,
      handleReaded,
    }
  },
})
</script>
<style lang='scss'>
.message-center {
	background: #F6F7F9;
	height: 100vh;

	&-item {
		padding: 32rpx 22rpx 24rpx 0;
		background: #fff;
		margin: 20rpx 0;

		&-head {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&-left {
				display: flex;
				align-items: center;
			}

			&-tag {
				width: 60rpx;
				height: 32rpx;
				border-radius: 0 8rpx 8rpx 0;
				font-size: 22rpx;
				color: #fff;
				text-align: center;
				display: inline-block;
			}

			&-text {
				font-size: 32rpx;
				margin-left: 28rpx;
			}

			&-time {
				color: rgba(0,0,0,0.34);
				font-size: 24rpx;
			}
		}

		&-content {
			padding: 32rpx 22rpx 0;
			font-size: 28rpx;
		}
	}

	&-readed {
		position: fixed;
		bottom: 76rpx;
		left: 32rpx;
	}
}
</style>
