// @ts-nocheck
/** 
 * @desc 后台持续定位功能，每个一段时间上传轨迹到后端 间隔时间： 5分钟
 */
import { mesTrackAddTrack } from "@/api/mes/trackController";
import { ref } from "vue";
import { logger } from "./fn";

/** 持续上报的间隔时间 单位：分钟 */
const intervalTime = 5
/** 后台定位状态 */
const locationUpdateBackgroundStatus = ref(false)
/** 定时器 */
const timer = ref<number>()
/** 定位精度 */
export const accuracy = ref<number>()
/** 经纬度位置历史 */ 
export const trackHistory = ref<UniNamespace.OnLocationChangeCallbackResult[]>([])
/** 待上传的经纬度数据 */ 
export const trackBuffer = ref<UniNamespace.OnLocationChangeCallbackResult[]>([])

const listenerLocationChange = (res: UniNamespace.OnLocationChangeCallbackResult) => {
  const projectId = uni.getStorageSync("projectInfo").projectId
  const reportTime = new Date().getTime()
  // 获取精确度并去除小数点
  accuracy.value = res.accuracy ? Math.round(res.accuracy) : undefined

  if (!timer.value) {
    timer.value = setInterval(async () => {
      if (trackBuffer.value.length > 0) {
        try {
          const { success, msg, } = await mesTrackAddTrack({ projectId, teackList: trackBuffer.value, })
          if(success){
            uni.showToast({ title: "上传轨迹成功！", icon: "none", })
            trackBuffer.value = []
          } else {
            uni.showToast({ title: msg, icon: "none", })
            logger.error("listenerLocationChange->mesTrackAddTrack:", msg)
            logger.setFilterMsg("trackBuffer")
            console.log("listenerLocationChange:", msg, "上传失败的轨迹:",trackBuffer.value)
          }
        } catch (error) {
          logger.error("listenerLocationChange->mesTrackAddTrack->catch:", error)
          logger.setFilterMsg("trackBuffer")
        }
      }
    }, 1000 * 60 * intervalTime) // 定时器时间
  }

  if (res.accuracy as number >= 20) {
    // 当前GPS信号弱
    return uni.showToast({
      title: "当前GPS信号弱",
      icon: "none",
      duration: 1000,
    })
  }

  const lastTrackBuffer = trackHistory.value.at(trackHistory.value.length - 1)
  const longitude = parseFloat(<string>res.longitude?.toFixed(6))
  const latitude = parseFloat(<string>res.latitude?.toFixed(6))
	
  if(!(lastTrackBuffer?.latitude === latitude && lastTrackBuffer?.longitude === longitude)){
    trackBuffer.value.push({
      latitude,
      longitude,
      accuracy: res.accuracy as number,
      speed: res.speed as number,
      reportTime,
    })
    trackHistory.value.push({
      latitude,
      longitude,
      accuracy: res.accuracy as number,
      speed: res.speed as number,
      reportTime,
    })
    console.log("当前存储的坐标：", res, "待上报轨迹：",trackBuffer.value, "历史轨迹：", trackHistory.value);
  }
}

/** 
 * @desc 后台持续定位功能，每个一段时间上传轨迹到后端 间隔时间： 5分钟
 */
export const startLocationBackground =  async () => {
  const {authSetting,} = await uni.getSetting({})
  if (authSetting["scope.userLocationBackground"]) {
    const result = await uni.startLocationUpdateBackground()
    if (result.errMsg === "startLocationUpdateBackground:ok") {
      locationUpdateBackgroundStatus.value = true
      uni.onLocationChange(listenerLocationChange)
    } else {
      logger.error("getSetting->startLocationUpdateBackground:", res)
    }
  } else {
    await uni.openSetting({
      success: async (res) => {
        if (res.authSetting["scope.userLocationBackground"]) {
          const result = await uni.startLocationUpdateBackground()
          if (result.errMsg === "startLocationUpdateBackground:ok") {
            locationUpdateBackgroundStatus.value = true
            uni.onLocationChange(listenerLocationChange)
          } else {
            logger.error("openSetting->startLocationUpdateBackground: ", res)
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

/** 
 * @desc 停止持续上报功能
 */
export const stopLocationBackground = () => {
  if(locationUpdateBackgroundStatus.value) {
    uni.offLocationChange(listenerLocationChange)
    uni.stopLocationUpdate({
      success: () => {
        trackBuffer.value = []
        locationUpdateBackgroundStatus.value = false
        trackHistory.value = []
        clearInterval(timer.value)
      },
    })
  }
}
