<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="video-modal"
    >
      <video
        ref="player"
        class="video-modal-player"
        preload="auto"
        autoplay
        @click="headelPlayer"
      >
        <source :src="videoSrc">
      </video>
      <icon-close-circle
        class="video-modal-close"
        @click="headelClose"
      />
      <icon-pause
        v-if="isPlay"
        class="video-modal-pause"
        @click="headelPlayer"
      />
      <icon-play-arrow
        v-else
        class="video-modal-play"
        @click="headelPlayer"
      />
    </div>
  </Teleport>
</template>
<script lang="ts">
import { IconCloseCircle, IconPause, IconPlayArrow } from "@arco-design/web-vue/es/icon";
import axios from "axios";
import { defineComponent, ref, Teleport } from "vue";

export default defineComponent({
  components: {
    IconCloseCircle,
    IconPlayArrow,
    IconPause,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible"],
  setup(props,{emit,}) {
    const isPlay = ref(false)
    const player = ref<HTMLVideoElement>()
    const videoSrc = ref<string>("https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/2.mp4")

    const headelPlayer = () => {
      if (isPlay.value) {
        player.value?.pause()
      } else {
        player.value?.play()
      }
      isPlay.value = !isPlay.value
    }

    const headelClose = () => {
      isPlay.value = false;
      emit("update:visible",false)
    }

    axios({
      url: "https://zx-1301451990.cos.ap-guangzhou.myqcloud.com/test/2.mp4",
      responseType: "blob",
    }).then((res) => {
      console.log(res);
      videoSrc.value = URL.createObjectURL(res.data);
      console.log(videoSrc.value);
			
    })
		
    return {
      Teleport,
      isPlay,
      player,
      videoSrc,
      headelPlayer,
      headelClose,
    }
  },
})

</script>
<style lang="less">
.video-modal {
	width: 34.3vw;
	height: 19.3vw;
	background-color: #fff;
	position: absolute;
	top: 30%;
	left: 30%;

	&:hover .video-modal-close {
		visibility: visible;
	}
	&:hover .video-modal-play {
		visibility: visible;
	}
	&:hover .video-modal-pause {
		visibility: visible;
	}

	&-player {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}

	&-close {
		width: 1.25vw;
		color: #054E81;
		position: absolute;
		top: 8px;
		right: 8px;
		cursor: pointer;
		visibility: hidden;
	}

	&-play,&-pause {
		width: 2.5vw;
		height: 2.5vw;
		color: #054E81;
		position: absolute;
		top: calc(50% - 1.25vw);
		left: calc(50% - 1.25vw);
		cursor: pointer;
		visibility: hidden;
	}
}
</style>
