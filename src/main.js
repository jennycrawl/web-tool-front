import './assets/main.css'

import { createApp } from 'vue'
import App from './MyApp.vue'
import router from './router'
import { createPinia } from 'pinia'
import JsonExcel from "vue-json-excel3";

const app = createApp(App)

app.use(router)

app.use(createPinia())

app.mount('#app')

app.component("downloadExcel", JsonExcel);
