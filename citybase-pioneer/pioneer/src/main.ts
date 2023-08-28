import '@/assets/styles/base.less';
import '@/assets/styles/css-var.less';
import '@/assets/styles/global.less';
import router from '@/router';
import pinia from '@/stores';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(router)
app.mount('#app')
