<!--
  TerminalBody.vue - 终端主体组件
  
  显示终端的主要内容区域
  包括：
  - 欢迎信息
  - 历史记录
  - 输入区域（通过 slot）
  
  负责管理滚动行为
-->

<template>
  <div class="terminal-body" ref="bodyRef" @click="handleBodyClick">
    <!-- 欢迎信息 -->
    <div class="welcome-message">
      <pre class="ascii-art">{{ asciiArt }}</pre>
      <div v-html="welcomeMessage"></div>
    </div>

    <!-- 历史记录 -->
    <TerminalOutput
      v-for="(item, index) in history"
      :key="index"
      :command="item.command"
      :output="item.output"
      :sub-command="item.subCommand"
      :args="item.args"
    />

    <!-- 输入区域（通过 slot 插入） -->
    <slot />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import TerminalOutput from './TerminalOutput.vue'

/**
 * Props
 */
const props = defineProps({
  /**
   * 历史记录数组
   */
  history: {
    type: Array,
    default: () => []
  },
  
  /**
   * 欢迎信息（HTML）
   */
  welcomeMessage: {
    type: String,
    default: ''
  },
  
  /**
   * ASCII 艺术字
   */
  asciiArt: {
    type: String,
    default: ''
  }
})

/**
 * Emits
 */
const emit = defineEmits(['focus-input'])

/**
 * Refs
 */
const bodyRef = ref(null)

/**
 * 滚动到底部
 */
const scrollToBottom = () => {
  if (bodyRef.value) {
    bodyRef.value.scrollTop = bodyRef.value.scrollHeight
  }
}

/**
 * 监听历史记录变化，自动滚动到底部
 */
watch(() => props.history.length, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

/**
 * 点击终端主体时，聚焦到输入框
 *
 * 注意：不自动滚动到底部，允许用户在浏览历史内容时点击复制
 * 只有在执行命令时才会自动滚动（通过 watch 监听 history 变化）
 */
const handleBodyClick = (event) => {
  // 记录当前滚动位置
  const currentScrollTop = bodyRef.value?.scrollTop || 0

  // 聚焦输入框
  emit('focus-input')

  // 在下一帧恢复滚动位置，防止浏览器自动滚动到输入框
  nextTick(() => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = currentScrollTop
    }
  })
}
</script>

<style scoped>
/**
 * 终端主体样式
 * 
 * 可滚动区域，显示所有内容
 */
.terminal-body {
  padding: 20px;
  min-height: 500px;
  max-height: 70vh;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.6;
  cursor: text;
}

/**
 * 欢迎信息样式
 */
.welcome-message {
  margin-bottom: 30px;
}

/**
 * ASCII 艺术字样式
 * 使用等宽字体确保正确对齐
 */
.ascii-art {
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.2;
  margin-bottom: 15px;
  text-shadow: 0 0 10px var(--text-secondary);
  font-family: 'Courier New', Courier, monospace;
  white-space: pre;
  overflow-x: auto;
}

/**
 * 响应式：平板设备
 */
@media (max-width: 768px) {
  .terminal-body {
    padding: 15px;
    font-size: 13px;
    max-height: 60vh;
  }

  .ascii-art {
    font-size: 8px;
  }
}

/**
 * 响应式：小屏幕手机
 */
@media (max-width: 480px) {
  .terminal-body {
    padding: 10px;
    font-size: 12px;
  }
}
</style>

