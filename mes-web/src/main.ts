import "@/assets/style/global.less";
import "@/assets/style/view-panel.less";
import * as directive from "@/directive";
import pinia from "@/stores";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { initAMapApiLoader } from "@vuemap/vue-amap";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-message.css";
import { createApp, Directive } from "vue";
import App from "./App.vue";
import router from "./router";

initAMapApiLoader({
  key: "a54408fe467c11d18296a928641e2639",
  version: "2.0",
  securityJsCode: "aae910cb95aba0eabfac3bb19e167f4d",
  plugins:["AMap.MouseTool","AMap.PolygonEditor","AMap.PolylineEditor","AMap.MarkerCluster","AMap.Geocoder","AMap.HawkEye","AMap.MoveAnimation"],
})

const app = createApp(App)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key])
})
app.use(router)
app.mount("#app")
