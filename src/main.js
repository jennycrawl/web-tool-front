import './assets/main.css'

import { createApp } from 'vue'
import App from './MyApp.vue'
import router from './router'
import { createPinia } from 'pinia'
import JsonExcel from "vue-json-excel3";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.mount('#app')

app.component("downloadExcel", JsonExcel);

//注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
