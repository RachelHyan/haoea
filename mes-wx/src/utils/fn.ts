import type { FileType } from "@/components/typings";
import { upload } from "@/libs/cos";
// @ts-ignore
import AMap from "@/libs/amap-wx";

/** @desc 当前微信版本：{"develop": 开发版, "trial": 体验版, "release": 正式版 }*/
export const envVersion = uni.getAccountInfoSync().miniProgram.envVersion

const log = uni.getRealtimeLogManager ? uni.getRealtimeLogManager() : null
/** 实时日志对象 */
export const logger = {
  info: (...args: any[]) => log?.info([envVersion, uni.getStorageSync("userPhone"), ...args]),
  error: (...args: any[]) => log?.error([envVersion, uni.getStorageSync("userPhone"), ...args]),
  warn: (...args: any[]) => log?.warn([envVersion, uni.getStorageSync("userPhone"), ...args]),
  setFilterMsg: (e: string) => log?.setFilterMsg(e),
  addFilterMsg: (e: string) => log?.addFilterMsg(e),
  tag: (e: string) => log?.tag(e),
  in: (e: any) => log?.in(e),
}

let deboTimeout: any = null;
/**
 * @desc 防抖
 * @param {Function} fn 回调函数
 * @param {Number} delay 延时时间(毫秒/ms) 默认 300
 */
export function debounce(fn: () => any, delay = 300) {
  if (deboTimeout !== null) clearTimeout(deboTimeout);
  deboTimeout = setTimeout(fn, delay);
}

let throTimeout: any = null;
/** 
 * @desc 节流
 * @param {Function} fn 回调函数
 * @param {Number} delay 延时时间(毫秒/ms) 默认 300
 */
export function throttle(fn: () => any, delay = 300) {
  if (throTimeout === null) {
    throTimeout = setTimeout(() => {
      fn();
      throTimeout = null;
    }, delay);
  }
}
 
/** 
 * @desc 打开系统自带呼叫电话
 * @param {{name,phone}} row 人的数据(row = {name,phone,headUrl})
 */
export const makePhoneCall = (row: {name: string, phone: string}) => {
  if (!row.phone) return;
  uni.showModal({
    title: "提示",
    content: (row.name ?? "") + " 电话：" + row.phone,
    showCancel: true,
    confirmText: "确认呼叫",
    success: ({ confirm, }) => {
      if (confirm) {
        uni.makePhoneCall({
          phoneNumber: row.phone,
        });
      }
    },
  })
}

/**
 * @desc 调用系统自带的图片预览功能
 * @param index 当前图片的下标
 * @param list 当前图片所在的数组
 */
export const previewImage = (index: number,list: MES.WechatSysFileVo[]) => {
  uni.previewImage({
    current: list[index].url,
    urls: <string[]>list.map(item => item.url),
  });
}

/**
 * @desc 批量上传文件
 * @param fileList 文件列表
 * @returns 返回的数组 {type,url,longitude,latitude,photographTime,fullAddress,poster,}[]
 */
export const batchUploadMedia = async (fileList: FileType[]): Promise<{ data: FileType[], success: boolean }> => {
  const result: FileType[] = []
  let success = false
  try {
    const promiseList: Promise<{ code: number, data: string, }>[] = []
    fileList.forEach(item => promiseList.push(upload(item.url as string)))
    const res = await Promise.all(promiseList)
    success = res.every(item => item.code === 200)
    res.forEach(({ code, data, }: {code: number, data: string, }, index: number) => {
      if (code == 200) {
        fileList.forEach((item, key) => {
          index === key && result.push({
            ...item,
            url: data,
          })
        })
      } else {
        uni.showToast({
          title: `第 ${index + 1} 个文件上传失败,请稍后再试`,
          icon: "none",
        })
      }
    })
  } catch (err) { console.error("batchUploadMedia",err) }

  return { data: result, success, }
}

/**
 * @desc seconds 转换为 HH:mm:ss
 * @param {Number} seconds 秒数
 * @return {String} 转后后的时分秒
 */
export const secondsFormat = (seconds?: number): string => {
  if(!seconds) return "00:00:00"
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    remainingSeconds.toString().padStart(2, "0")
  ].join(":");

  return formattedTime;
}

/**
 * @desc 通过高德api获取所给的位置信息
 * @param longitude 经度
 * @param latitude 纬度
 * @returns 详细的地理位置
 */
export const getFullAddress = async ({longitude,latitude,}: {longitude: string|number,latitude: string|number}) => {
  const AMapUtil = new AMap.AMapWX({ key: "f6a73d4ba0bb8415376f2c6549e65a23", })
  return new Promise<any>((resolve) => {
    AMapUtil.getRegeo({
      location: `${longitude}, ${latitude}`,
      success: (res: any) => resolve({data: res.at(0),}),
      fail: (err: any) => logger.error("getFullAddress", err),
    })
  })
   
}
