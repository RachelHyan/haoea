import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { createSSRApp } from "vue";
import App from "./App.vue";
import "./uni.scss";

dayjs.locale("zh-cn")

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
