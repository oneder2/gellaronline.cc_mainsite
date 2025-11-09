/**
 * 应用入口文件
 *
 * 初始化 Vue 应用并挂载到 DOM
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './styles/commands.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
