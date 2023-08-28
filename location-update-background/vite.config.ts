import uni from "@dcloudio/vite-plugin-uni";
import { defineConfig } from "vite";
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://zcmes-dev.littaro.cn", // 后台接口域名
        ws: true, // 如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域 
        // rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        // drop_console: true,
      },
    },
  },
});
