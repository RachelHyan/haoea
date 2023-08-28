import "@/assets/font/index.css"
import "amfe-flexible/index.js"
import "vant/lib/index.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./style.css"

const app = createApp(App)
app.use(router)
app.mount("#app")
