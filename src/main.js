/**
 * 应用入口文件
 *
 * 初始化 Vue 应用并挂载到 DOM
 */

import { createApp } from 'vue'
import './style.css'
import './styles/commands.css'
import App from './App.vue'

createApp(App).mount('#app')
