<template>
  <view class="camera-root">
    <view class="camera-body">
      <camera
        v-if="!imageSrc && showCamera"
        :device-position="switchCamera"
        flash="off"
        style="width: 100%; height: 100%;"
      />
      <view
        v-if="watermark"
        class="camera-watermark"
      >
        <view>
          <text class="camera-watermark-address">
            {{ markLocation }}
          </text>
        </view>
        <view>
          <text class="camera-watermark-time">
            {{ markTime }}
          </text>
        </view>
      </view>
      <canvas
        v-if="imageSrc"
        style="width: 100%; height: 100%;"
        canvas-id="cameraCanvas"
      />
    </view>
    <view class="camera-footer">
      <view
        v-if="!imageSrc"
        class="camera-blank"
      >
        <img
          v-if="!isFace"
          style="width: 76rpx; height: 64rpx;"
          src="https://zcwy-1314423366.cos.ap-guangzhou.myqcloud.com/mes/wx/assets/v1.9/switch-camera.png"
          @click="switchCamera = (switchCamera === 'back' ? 'front' : 'back')"
        >
      </view>
      <button
        v-if="!imageSrc"
        class="camera-take"
        @tap="takePhoto"
      >
        <uni-icons
          type="camera-filled"
          size="32"
          color="#fff"
        />
      </button>
      <view
        v-if="imageSrc"
        class="camera-refreshempty"
      >
        <uni-icons
          type="refreshempty"
          size="32"
          color="#666"
          @click="refreshempty"
        />
      </view>
      <button
        v-if="imageSrc"
        class="camera-checkmarkempty"
        @tap="savePhoto"
      >
        <uni-icons
          type="checkmarkempty"
          size="32"
          color="#fff"
        />
      </button>
      <view class="camera-closeempty">
        <uni-icons
          type="closeempty"
          size="32"
          color="#666"
          @click="backPage"
        />
      </view>
    </view>
    <view
      style="position: fixed;top: 80rpx;left: 0;min-width: 100rpx;min-height: 50rpx;color: #fff;z-index: 9999;"
      @click="showLocationInfo = !showLocationInfo"
    >
      |
      <scroll-view
        v-if="showLocationInfo"
        scroll-y
        style="max-height: 60vh;"
      >
        <text style="width: 100vw;">
          {{ loactionInfo }}
        </text>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
import { logger } from "@/utils/fn";
import { onLoad } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import type { Ref } from "vue";
import { defineComponent, getCurrentInstance, ref } from "vue";

export default defineComponent({
  name: "CameraPage",
  setup() {
    const imageSrc: Ref<string> = ref<string>("")
    const ctx: Ref<UniApp.CanvasContext | undefined> = ref<UniApp.CanvasContext | undefined>(undefined)
    const timer: Ref<number> = ref<number>(0)
    const markTime: Ref<string> = ref<string>(dayjs().format("YYYY-MM-DD HH:mm:ss"))
    const markLocation: Ref<string> = ref<string>("")
    const location: Ref<string> = ref<string>("")
    // @ts-ignore
    const channel = getCurrentInstance()?.proxy?.getOpenerEventChannel()
    const showCamera: Ref<boolean> = ref<boolean>(false)
    const fullAddress = ref<string>("")
    const switchCamera = ref<"front"| "back">("back")
    const watermark: Ref<boolean> = ref<boolean>(false)
    const loactionInfo = ref<any>("")
    const showLocationInfo = ref<boolean>(false)
    const isFace = ref<boolean>(false)
		
    onLoad((options)=>{
      watermark.value = options.watermark === "true" ? true : false
      isFace.value = options.face === "true" ? true : false
      isFace.value === true && (switchCamera.value = "front")
      if(watermark.value){
        setMarkTime()
        setMarkLocation()
      }
    })

    const setMarkTime = () => {
      timer.value = setInterval(() => {
        markTime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }, 1000)
    }

    const clearMarkTime = () => {
      clearInterval(timer.value)
      markTime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
    }

    const setMarkLocation = async () => {
      uni.getLocation({
        type: "gcj02",
        success (res) {
          location.value = `${res.longitude.toFixed(6)},${res.latitude.toFixed(6)}`;
          uni.request({
            url: `https://restapi.amap.com/v3/geocode/regeo?key=e6c965454dbbec902b7909b11986c088&location=${res.longitude.toFixed(6)},${res.latitude.toFixed(6)}`,
            success: ({data,}: any) => {
              loactionInfo.value = {data,WxLocation: location.value,}
              const { city, } = data.regeocode.addressComponent
              const index = data.regeocode.formatted_address.lastIndexOf(city)
              markLocation.value = data.regeocode.formatted_address.slice(index)
              fullAddress.value = data.regeocode.formatted_address
            },
            fail: (err) => logger.error("setMarkLocation->request:", err),
          })
        },
        fail: (err) => {
          loactionInfo.value = JSON.stringify(err)
          // logger.error("setMarkLocation->getLocation:", err)
          console.log("setMarkLocation->getLocation:", err)
          if(err.errMsg && err.errCode && err.errCode === 404 && err.errMsg === "getLocation:fail:ERROR_SERVER_NOT_LOCATION"){
            uni.showModal({title: "提示", content: ".请检查手机的位置信息.,", showCancel: false, success: ({confirm,}) => (confirm && uni.navigateBack()),})
          } else if (err.errno && err.errno === 104 && err.errMsg === "getLocation:fail privacy permission is not authorized") {
            uni.showModal({title: "提示", content: ".您未同意隐私协议，无法使用位置信息.,", showCancel: false, success: ({confirm,}) => (confirm && uni.navigateBack()),})
          } else {
            getLocationAuthorize()
          }
        },
      })
    }

    const takePhoto = () => {
      let camera = uni.createCameraContext();
      camera.takePhoto({
        success: (res) => {
          imageSrc.value = res.tempImagePath;
          uni.getSystemInfo({ //获取屏幕宽度
            success: (res) => {
              if (!ctx.value) {
                ctx.value = uni.createCanvasContext("cameraCanvas")
              }
              ctx.value.drawImage(imageSrc.value, 0, 0, res.screenWidth, (res.screenHeight * 0.9))
              if(watermark.value){
                ctx.value.setFontSize(16) //注意：设置文字大小必须放在填充文字之前，否则不生效
                ctx.value.setFillStyle("white")
                ctx.value.fillText(markLocation.value, 10, (res.screenHeight * 0.9) - 38)
                ctx.value.setFontSize(16) //注意：设置文字大小必须放在填充文字之前，否则不生效
                ctx.value.setFillStyle("white")
                ctx.value.fillText(markTime.value, 10, (res.screenHeight * 0.9) - 15)
              }
              ctx.value.draw()
              clearMarkTime()
            },
          })
        },
        fail: (err) => {logger.error("takePhoto:Err=>", err); console.log("takePhoto:Err=>", err);},
      })
    }

    const refreshempty = () => {
      imageSrc.value = ""
      setMarkTime()
    }

    const savePhoto = () => {
      uni.authorize({
        scope: "scope.writePhotosAlbum",
        success: () => {
          if (ctx.value) {
            uni.canvasToTempFilePath({
              canvasId: "cameraCanvas",
              fileType: "jpg",
              quality: 1,
              success: (res) => {
                if(watermark.value){
                  if(markLocation.value && markLocation.value.length) {
                    channel.emit("save", {
                      tempFilePath: res.tempFilePath,
                      location: location.value,
                      timestamp: dayjs(markTime.value).format("YYYY-MM-DD HH:mm:ss"),
                      fullAddress: fullAddress.value,
                      rephotograph: refreshempty,
                    })
                  } else {
                    uni.showModal({ title: "提示", content: "未获取到当前位置，请稍后重试", icon: "none", showCancel: false, success: ({confirm,}) => (confirm && uni.navigateBack()),})
                  }
                } else {
                  channel.emit("save", {
                    tempFilePath: res.tempFilePath,
                    rephotograph: refreshempty,
                  })
                }
              },
              fail: (err) => { logger.error("savePhoto", err); console.log("takePhoto:Err=>", err); },
            })
          }
        },
        fail: () => {
          uni.showModal({
            title: "提示",
            content: "您拒绝授权，将无法提交，是否前往设置重新授权？",
            confirmText: "去授权",
            success: ({ confirm, }) => confirm && uni.openSetting({}),
          })
        },
      })
    }
		
    /** 判断相关权限是否授权 */
    const getLocationAuthorize = () => {
      let locationEnabled = uni.getSystemSetting().locationEnabled ?? false
      let locationAuthorized = uni.getAppAuthorizeSetting().locationAuthorized === "authorized" ? true : false
      uni.getSystemInfoSync().deviceBrand === "devtools" && (locationAuthorized = true)
			
      if(locationEnabled === false){
        uni.showModal({
          title: "提示",
          content: "请检查你的手机定位/位置信息是否开启？",
          showCancel: false,
          confirmText: "返回",
          success: ({ confirm, }) => confirm && uni.navigateBack(),
        })
      }else if(locationAuthorized === false){
        uni.showModal({
          title: ".提示.",
          content: "您未授权定位权限，是否前往设置授权？",
          showCancel: true,
          confirmText: "去授权",
          success: ({ confirm,cancel, }) => {
            if(confirm){
              uni.openAppAuthorizeSetting({ // 系统应用授权
                success: () => setMarkLocation(),
              })
            }
            if(cancel){
              uni.navigateBack()
            }
          },
        })
      }else{
        uni.getSetting({
          success:(res) => {
            const locationStatus = res.authSetting["scope.userLocation"]
            if(locationStatus){
              setMarkLocation()
            }else{
              uni.showModal({
                title: "提示",
                content: "您未授权定位权限，是否前往设置授权？",
                showCancel: true,
                confirmText: "去授权",
                success: ({ confirm,cancel, }) => {
                  confirm && uni.openSetting({ success: () => setMarkLocation(), fail: () => getLocationAuthorize(),})
                  cancel && uni.navigateBack()
                },
              })
            }
          },
        })
      }
    }

    /** 对相机未授权摄像头时做优化处理 */
    uni.authorize({
      scope: "scope.camera",
      success: () => showCamera.value = true,
      fail: () => {
        uni.showModal({
          title: "提示",
          content: "您拒绝授权，将无法使用相机，是否前往设置重新授权？",
          showCancel: true,
          confirmText: "去授权",
          success: ({ confirm,cancel, }) => {
            cancel && uni.navigateBack()
            confirm && uni.openSetting({
              success: (res) => {
                if(res.authSetting["scope.camera"]){
                  showCamera.value = true
                }
              },
            })
          },
        })
      },
    })

    const backPage = () => {
      uni.navigateBack()
    }

    return {
      loactionInfo,
      showLocationInfo,
      showCamera,
      imageSrc,
      markTime,
      markLocation,
      switchCamera,
      watermark,
      isFace,
      takePhoto,
      refreshempty,
      savePhoto,
      backPage,
    }
  },
})
</script>

<style lang="scss">
.camera-root {
	height: 100vh;
}

.camera-body {
	width: 100vw;
	height: 90vh;
	position: relative;

	.camera-watermark {
		position: absolute;
		bottom: 10px;
		left: 10px;
		color: #fff;
	}
}

.camera-footer {
	height: 10vh;
	padding: 0 24px;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.camera-take,
.camera-checkmarkempty {
	width: 8vh;
	height: 8vh;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.camera-take {
	background-color: $color-blue;
}

.camera-checkmarkempty {
	background-color: $color-green;
}

.camera-blank {
	width: 60px;
	display: flex;
	justify-content: center;
}

.camera-refreshempty,
.camera-closeempty {
	padding: 0 14px;
}
</style>
