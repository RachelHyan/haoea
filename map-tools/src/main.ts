import { initAMapApiLoader } from "@vuemap/vue-amap";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

initAMapApiLoader({
  key: "a54408fe467c11d18296a928641e2639",
  version: "2.0", 
  securityJsCode: "aae910cb95aba0eabfac3bb19e167f4d",
})


const app = createApp(App)
app.use(router)
app.mount("#app")

