<template>
  <el-pro-dialog
    class="monitor-model"
    :model-value="modelValue"
    width="80%"
    @update:model-value="(value:boolean) => $emit('update:modelValue',value)"
    @closed="closeDialog"
  >
    <template #header>
      <div class="monitor-model__header">
        <img
          v-for="item in monitorIconList"
          :key="item.value"
          class="monitor-model__header-item"
          :src="monitorActiveTab === item.value ? item.activeIcon : item.icon"
          alt=""
          width="24"
          height="24"
          @click="changeTab(item.value)"
        >
      </div>
    </template>
    <div
      class="monitor-model__body"
      :style="monitorBodyStyle"
    >
      <div
        v-for="(_,index) in monitorActiveTab"
        :key="index"
        class="monitor-model__body-item"
      >
        <div v-if="!isPlayer.includes(index)">
          <div
            v-if="curMonitorData[index]"
            class="monitor-model__body-item__header"
            :style="videoHeaderBoxStyle"
          >
            <span :style="videoHeaderTextStyle">{{ curMonitorData[index].deviceSerial }}:{{ curMonitorData[index].channelNo }}</span>
            <!-- <img
              src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-full-icon.png"
              alt=""
              :style="videoHeaderIconStyle"
            > -->
          </div>
          <img
            v-if="curMonitorData[index]"
            class="monitor-model__body-item__center"
            src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/jaya/data-dashboard/map/track-playback-icon.png"
            alt=""
            :style="videoCenterIconStyle"
            @click="playVideo(curMonitorData[index].liveUrl, index)"
          >
        </div>
        <div
          :id="'video-container' + index"
        />
        <span
          v-if="!curMonitorData[index]"
          class="monitor-model__body-item__center"
        >暂无信号源</span>
      </div>
    </div>
  </el-pro-dialog>
</template>

<script lang="ts">
import EZUIKit from "ezuikit-js";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "MonitorModel",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    curMonitorData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: [ "update:modelValue", "closed" ],
  setup (props, { emit, }) {
    const monitorActiveTab = ref(4);
    const isPlayer = ref<any>([]);
    let player = null as any;
    let players = [] as any;

    const monitorIconList = [
      {value:1,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-one-icon.png",activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-one-icon-active.png",},
      {value:4,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-four-icon.png",activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-four-icon-active.png",},
      {value:9,icon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-nine-icon.png",activeIcon:"https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/monitor-nine-icon-active.png",}
    ]

    const monitorBodyStyle = computed(() => {
      const num = Math.sqrt(monitorActiveTab.value)
      return {
        gridTemplateColumns: `repeat(${num}, 1fr)`,
        gridTemplateRows: `repeat(${num}, 1fr)`,
        gap: "10px",
      }
    })

    const videoHeaderBoxStyle = computed(() => {
      const boxStyle = {
        1: {height: "45px",lineHeight:"45px",paddingLeft:"14px",},
        4: {height: "31px",lineHeight:"31px",paddingLeft:"16px",},
        9: {height: "20px",lineHeight:"20px",paddingLeft:"10px",},
      } as any

      return boxStyle[monitorActiveTab.value] || {}
    })

    const videoHeaderTextStyle = computed(() => {
      const fontSize = {
        1: "16px",
        4: "14px",
        9: "12px",
      } as any;

      return { fontSize: fontSize[monitorActiveTab.value] || "", };
    });

    const videoHeaderIconStyle = computed(() => {
      const imageSize = {
        1: { width: "24px", height: "24px", },
        4: { width: "18px", height: "18px", },
        9: { width: "11px", height: "11px", },
      } as any;

      return imageSize[monitorActiveTab.value] || {};
    });

    const videoCenterIconStyle = computed(() => {
      const iconSize = {
        1: { width: "57px", height: "67px", },
        4: { width: "36px", height: "42px", },
        9: { width: "23px", height: "26px", },
      } as any;

      return iconSize[monitorActiveTab.value] || ""
    });
		
    const videoStyle = computed(() => {
      return {
        1: { width: 835, height: 551, },
        4: { width: 412.5, height: 270.5, },
        9: { width: 271.66, height: 177, },
      } as any
    })

    const getVideo = (i:number) => {
      player = new EZUIKit.EZUIKitPlayer({
        id: "video-container" + i,
        accessToken: props.curMonitorData[i].accessToken,
        url: props.curMonitorData[i].liveUrl,
        width: videoStyle.value[monitorActiveTab.value].width,
        height: videoStyle.value[monitorActiveTab.value].height,
        header: [],
        template: "security",
      });
      players.push(player);
    }

    const changeTab = async (value:number) => {
      for (const item of players) {
        if (item) {
          await item.stop();
        }
      }

      document.querySelectorAll("[id^=\"video-container\"]").forEach((item) => {
        item.remove();
      });
			
      const videoContainer = document.querySelectorAll(".monitor-model__body-item");
      videoContainer.forEach((item, index) => {
        if (!item.querySelector("#video-container" + index)) {
          const div = document.createElement("div");
          div.setAttribute("id", "video-container" + index);
          item.appendChild(div);
        }
      });
      isPlayer.value = [];
      monitorActiveTab.value = value;
    }
		
    // 播放视频
    const playVideo = (url:string, index:number) => {
      setTimeout(() => {
        getVideo(index)
      }, 0);
      isPlayer.value.push(index);
    }

    // 关闭弹窗
    const closeDialog = async () => {
      for (const item of players) {
        if (item) {
          await item.stop();
        }
      }
      // 销毁播放器
      document.querySelectorAll("[id^=\"video-container\"]").forEach((item) => {
        item.remove();
      });
      isPlayer.value = [];

      emit("update:modelValue", false);
      emit("closed");
    }
			

    return {
      monitorActiveTab,
      monitorIconList,
      monitorBodyStyle,
      videoHeaderTextStyle,
      videoHeaderBoxStyle,
      videoHeaderIconStyle,
      videoCenterIconStyle,
      isPlayer,
      changeTab,
      getVideo,
      closeDialog,
      playVideo,
    }
  },
})
</script>

<style lang="less">
.monitor-model {
	width: 883px;
	height: 649px;
	background: rgba(14,51,116,0.7);
	box-shadow: 0px 2px 15px 0px rgba(6,110,255,0.5);
	border-radius: 10px;
	border: 2px solid #006CFF;
	backdrop-filter: blur(5px);

	&__header {

		img {
			cursor: pointer;
		}

		img:nth-child(2) {
			margin: 0 34px;
		}
	}

	&__body {
		width: 100%;
		height: calc(649px - 50px - 48px);
		display: grid;
		box-sizing: border-box;

		&-item {
			height: 100%;
			background: #1C4996;
			border-radius: 5px;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			background-image: url(https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/web/resource/operation-analysis/monitor/model-bg.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: center center;
			
			&__header {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				background: #235FC6;
				color: #fff;
				box-sizing: border-box;
			}

			&__center {
				color: #fff;
				font-size: 14px;
			}

			img {
				cursor: pointer;
			}
		}
	}

	.el-dialog__header {
		border: none;
		padding: 14px 25px;
		width: 100%;
		height: 50px;
		box-sizing: border-box;
		background: linear-gradient(90deg, #184DAB 0%, rgba(15,84,197,0.16) 100%);
	}

	.el-drawer__close-btn {
		height: 24px;
		width: 24px;
		border-radius: 50%;
		background: #0FB0E2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.el-dialog__body {
		padding: 22px;
	}
}
</style>
