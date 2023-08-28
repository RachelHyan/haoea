import vue from "@vitejs/plugin-vue"
import { VueAmapResolver } from "@vuemap/unplugin-resolver"
import AutoImport from "unplugin-auto-import/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({
        exclude: /^ElAmap[A-Z]*/,
      }),VueAmapResolver()],
    }),
    Components({
      globs: [],
      resolvers: [
        ElementPlusResolver({
          exclude: /^ElAmap[A-Z]*/,
        }),
        VueAmapResolver()
      ],
    })
  ],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
