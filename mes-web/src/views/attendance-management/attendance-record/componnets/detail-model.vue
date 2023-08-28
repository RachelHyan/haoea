<template>
  <el-pro-dialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    class="dialog"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
    @closed="handlerClosed"
  >
    <div
      class="dialog-row"
    >
      <div class="dialog-row-item">
        <span class="dialog-row-item--title">作业人员</span>
        <el-input
          :placeholder="detailData.userName"
          disabled
        />
      </div>
      <div
        class="dialog-row-item"
      >
        <span class="dialog-row-item--title">人员类型</span>
        <el-input
          :placeholder="detailData.userType"
          disabled
        />
      </div>
    </div>
    <div
      class="dialog-row"
    >
      <div class="dialog-row-item">
        <span class="dialog-row-item--title">所属组织</span>
        <el-input
          :placeholder="detailData.orgNames"
          disabled
          type="textarea"
          autosize
        />
      </div>
      <div class="dialog-row-item">
        <span class="dialog-row-item--title">队长</span>
        <el-input
          :placeholder="detailData.captainUserName"
          disabled
        />
      </div>
    </div>
    <div class="dialog-list">
      <div
        v-for="(item,index) in detailData.list"
        :key="index"
      >
        <div class="dialog-list-item">
          <span
            class="dialog-list-item--title"
          >打卡时间</span>
          <span>{{ item.clockingTime }}</span>
        </div>
        <div class="dialog-list-item">
          <span
            class="dialog-list-item--title"
          >打卡人</span>
          <span>{{ item.clockingUserName }}</span>
        </div>
        <div class="dialog-list-item image-item">
          <div
            class="dialog-list-item--title"
            style="margin-right: 0;"
          >
            人脸打卡
          </div>
          <div class="dialog-list-item-images">
            <el-image
              v-if="item.faceUrl"
              class="image-item"
              :src="item.faceUrl"
              :preview-src-list="item.faceUrl"
              :initial-index="1"
              fit="cover"
            />
          </div>
        </div>
        <div class="dialog-list-item image-item">
          <div
            class="dialog-list-item--title"
            style="margin-right: 0;"
          >
            辅助打卡
          </div>
          <div class="dialog-list-item-images">
            <el-image
              v-for="(url,i) in item.clockingPhotoUrls"
              :key="i"
              class="image-item"
              :src="url"
              :preview-src-list="item.clockingPhotoUrls"
              :initial-index="i"
              fit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  </el-pro-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DetailModel",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "详情",
    },
    width: {
      type: String,
      default: "50%",
    },
    detailData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [ "update:modelValue", "closed" ],
  setup (props,{emit,}) {
    const handlerClosed = () => {
      emit("closed");
    };

    return {
      handlerClosed,
    }
  },
})
</script>

<style lang="less">
.dialog {
	&-row {
		margin-bottom: 20px;
		display: flex;

		&-item {
			display: flex;
			align-items: center;
			flex: 1;

			&--title {
				width: 80px;
				text-align: right;
				margin-right: 10px;
			}
		}
	}

	&-list {
		height: 500px;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 2px;
			background-color: #efefef;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #999;
			border-radius: 2px;
		}

		&-item {
			display: flex;
			align-items: center;
			margin-bottom: 20px;

			&--title {
				width: 65px;
				text-align: right;
				margin-right: 10px;
				white-space: nowrap;
			}

			&-images {
				display: flex;
				flex-wrap: wrap;
			}
			
			.image-item {
				width: 100px;
				height: 100px;
				border-radius: 5px;
				margin: 0 0 10px 10px;
			}
		}

		.image-item {
			display: block;

			.dialog-list-item-images {
				margin-left: 70px;
			}
		}
	}
}

</style>
