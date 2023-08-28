<script lang="ts">
import { fetchDictList } from "./utils/api";

export default {
  onLaunch: async () => {
  	// @ts-ignore
    uni.onAppRoute(() => {
    /** 监听小程序切换页面，也就是每个页面都会执行一下代码 */
      const pages = getCurrentPages()
      const view = pages[pages.length - 1]
      if(view){
        uni.showShareMenu({
          withShareTicket: false,
          menus: ["shareAppMessage"],
        })
      }
    });
    /** 获取字典数据 */
    const { data, } = await fetchDictList( {dictType: "scene_type,inspection_type", })
    uni.setStorageSync("dict", data)
  },
  globalData: {
    screenHeight: uni.getWindowInfo().screenHeight,
    statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
    navBarHeight: 55,
    customBarHeight: (uni.getSystemInfoSync().statusBarHeight ?? 20) + 55,
  },
}

</script>
<style></style>
