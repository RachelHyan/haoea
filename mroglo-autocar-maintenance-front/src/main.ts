import "@/assets/style/global.less"
import "@/assets/style/iconfont.css"
import "@arco-design/web-vue/es/message/style/index.less"
import { initAMapApiLoader } from "@vuemap/vue-amap"
import "@vuemap/vue-amap/dist/style.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

// https://at.alicdn.com/t/c/font_3580189_zodqw4q3i8b.js?spm=a313x.7781069.1998910419.50&file=font_3580189_zodqw4q3i8b.js
// const IconFont = Icon.addFromIconFontCn({ src: "https://at.alicdn.com/t/c/font_3580189_zodqw4q3i8b.js?spm=a313x.7781069.1998910419.50&file=font_3580189_zodqw4q3i8b.js", })

initAMapApiLoader({
  key: "d81951db97a9d71763a4fa482185d91a",
  version: "2.0",
  plugins: ["AMap.MarkerCluster","AMap.MoveAnimation"],
  Loca:{
    version: "2.0.0",
  },
  securityJsCode: "7398d2cf7784da851b304ed68004bc9c",
})

const app = createApp(App)
app.use(router)
// app.component("IconFont", IconFont)
app.mount("#app")
