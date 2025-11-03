<!--
  TerminalOutput.vue - 终端输出组件
  
  渲染单条命令的输出
  支持两种渲染方式：
  1. 组件方式（推荐）- 使用 Vue 组件渲染
  2. HTML 方式 - 使用 v-html 渲染 HTML 字符串
  
  组件方式提供更好的类型检查和可维护性
-->

<template>
  <div class="terminal-line">
    <!-- 输入行：显示用户输入的命令 -->
    <div class="input-line">
      <span class="prompt">visitor@gellar:~$</span>
      <span class="command-text">{{ command }}</span>
    </div>
    
    <!-- 输出行：显示命令执行结果 -->
    <div class="output-line">
      <!-- 如果有组件，使用组件渲染 -->
      <component :is="outputComponent" v-if="outputComponent" />
      
      <!-- 否则使用 HTML 渲染 -->
      <div v-else v-html="output"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { commandComponents } from '@/config/commands'

/**
 * Props
 */
const props = defineProps({
  /**
   * 执行的命令
   */
  command: {
    type: String,
    required: true
  },
  
  /**
   * 命令输出（HTML 字符串）
   */
  output: {
    type: String,
    default: ''
  }
})

/**
 * 计算输出组件
 * 如果命令有对应的组件，使用组件渲染；否则使用 HTML
 */
const outputComponent = computed(() => {
  return commandComponents[props.command] || null
})
</script>

<style scoped>
/**
 * 终端行样式
 * 
 * 每条命令输出占一行
 * 包含渐入动画
 */
.terminal-line {
  margin-bottom: 15px;
  animation: fadeIn 0.3s ease-in;
}

/**
 * 渐入动画
 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/**
 * 输入行样式
 * 显示用户输入的命令
 */
.input-line {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

/**
 * 命令提示符
 */
.prompt {
  color: var(--text-secondary);
  font-weight: bold;
  flex-shrink: 0;
}

/**
 * 命令文本
 */
.command-text {
  color: var(--text-primary);
}

/**
 * 输出行样式
 * 显示命令执行结果
 */
.output-line {
  margin-left: 20px;
  color: var(--text-primary);
}
</style>

