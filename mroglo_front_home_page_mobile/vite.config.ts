import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vitest/config"
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://cszg-dev.littaro.cn", // 后台接口域名
        ws: true, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
  },
})
