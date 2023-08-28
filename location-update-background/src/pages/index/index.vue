<template>
  <view class="container">
    <map
      class="container-map"
      :scale="18"
      :polyline="polyline"
      :latitude="latlng.lat"
      :longitude="latlng.lng"
    />
    <view class="button">
      <button
        class="camera"
        type="primary"
        :disabled="locationUpdateBackgroundStatus"
        @tap="startLocationBackground"
      >
        开启定位
      </button>
      <view> 精确度:{{ accuracy }}</view>
      <button
        class="camera"
        type="primary"
        :disabled="!locationUpdateBackgroundStatus"
        @tap="stopLocationBackground"
      >
        关闭定位
      </button>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const locationUpdateBackgroundStatus = ref(false)
    const locationChangeStatus = ref(false)
    const timer = ref()
    const latlng = reactive<{lat?:number,lng?: number}>({})
    const accuracy = ref<number>()
    // 经纬度位置历史
    const trackHistory = ref<UniNamespace.OnLocationChangeCallbackResult[]>([])
    // 待上传的经纬度数据
    const trackBuffer = ref<UniNamespace.OnLocationChangeCallbackResult[]>([])

    const polyline = computed(() => {
      return [{
        points: trackHistory.value.length >= 2 ? trackHistory.value.map((item) => ({
          latitude: item.latitude,
          longitude: item.longitude,
        })):[],
        color: "#F00",
        width: 4,
      }]
    })

    const startLocationBackground = async () => {
      const {authSetting,} = await uni.getSetting({})
      if (authSetting["scope.userLocationBackground"]) {
        const {errMsg,} = await uni.startLocationUpdateBackground()
        if (errMsg === "startLocationUpdateBackground:ok") {
          locationUpdateBackgroundStatus.value = true
          uni.onLocationChange(listenerLocationChange)
        }
      } else {
        await uni.openSetting({
          success: async (res) => {
            if (res.authSetting["scope.userLocationBackground"]) {
              const {errMsg,} = await uni.startLocationUpdateBackground()
              if (errMsg === "startLocationUpdateBackground:ok") {
                locationUpdateBackgroundStatus.value = true
                uni.onLocationChange(listenerLocationChange)
              }
            } else {
              // 授权失败
              uni.showToast({
                title: "授权失败，点击右上角设置位置为使用时和离开后!",
                icon: "none",
                duration: 5000,
                mask: true,
              })
            }
          },
      	})
      }
    }

    const stopLocationBackground = () => {
      uni.offLocationChange(listenerLocationChange)
      locationChangeStatus.value = false
      uni.stopLocationUpdate({
        success: () => {
          locationUpdateBackgroundStatus.value = false
          clearInterval(timer.value)
        },
      })
    }

    const listenerLocationChange = (res: UniNamespace.OnLocationChangeCallbackResult) => {
      locationChangeStatus.value = true;
      const reportTime = new Date().getTime()
      latlng.lat = res.latitude as number
      latlng.lng = res.longitude as number
      // 获取精确度并去除小数点
      accuracy.value = res.accuracy ? Math.round(res.accuracy) : undefined

      if (accuracy.value as number >= 20) {
        // 当前GPS信号弱
        return uni.showToast({
          title: "当前GPS信号弱",
          icon: "none",
          duration: 1000,
        })
      }
			
      trackHistory.value.push({
        latitude: res.latitude as number,
        longitude: res.longitude as number,
        accuracy: res.accuracy as number,
        speed: res.speed as number,
        reportTime,
      })

      trackBuffer.value.push({
        latitude: res.latitude as number,
        longitude: res.longitude as number,
        accuracy: res.accuracy as number,
        speed: res.speed as number,
        reportTime,
      })
      if (!timer.value) {
        timer.value = setInterval(() => {
          if (trackBuffer.value.length > 0) {
            // 上传数据
            console.log("上传数据", trackBuffer.value)
            trackBuffer.value = []
          }
        }, 1000 * 60)
      }
    }

    const getLocation = async () => {
      try {
        const {latitude,longitude,} = await uni.getLocation({
          type: "gcj102",
        })
        latlng.lat = latitude as number
        latlng.lng = longitude as number   
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(getLocation)

    return {
      startLocationBackground,
      stopLocationBackground,
      locationUpdateBackgroundStatus,
      latlng,
      polyline,
      accuracy,
    }
  },
})


</script>
 
<style lang="less">
.container {
  width: 100vw;
	height: 100vh;
	position: relative;
  &-map {
    width: 100vw;
    height: 100vh;
    position: absolute;
  }

	.button {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
    position: absolute;
    bottom: 26px;
	}
}

</style>
