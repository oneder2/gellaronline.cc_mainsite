<!--
  Terminal.vue - 终端风格的交互组件（重构版）

  这是网站的核心组件，模拟一个命令行终端界面
  用户可以通过输入命令来探索个人信息

  重构后的架构：
  - 使用组合式 API (Composables) 管理逻辑
  - 拆分为多个子组件，职责清晰
  - 配置和逻辑分离，易于维护和扩展

  主要子组件：
  - TerminalHeader: 终端头部
  - TerminalBody: 终端主体
  - TerminalInput: 输入组件
  - TerminalOutput: 输出组件
  - TerminalCursor: 自定义光标

  添加新命令：
  1. 在 src/config/commands.js 中注册命令
  2. （可选）创建命令组件放在 src/components/commands/
-->

<template>
  <div class="terminal-container">
    <!-- 终端头部 -->
    <TerminalHeader :title="config.title" />

    <!-- 终端主体 -->
    <TerminalBody
      :history="history"
      :welcome-message="config.welcomeMessage"
      :ascii-art="config.asciiArt"
      @focus-input="focusInput"
    >
      <!-- 输入组件 -->
      <TerminalInput
        ref="inputRef"
        v-model="currentCommand"
        :prompt="config.prompt"
        @execute="executeCommand"
        @navigate="navigateHistory"
        @autocomplete="autoComplete"
      />
    </TerminalBody>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTerminal } from '@/composables/useTerminal'
import { terminalConfig } from '@/config/terminal.config'
import TerminalHeader from './terminal/TerminalHeader.vue'
import TerminalBody from './terminal/TerminalBody.vue'
import TerminalInput from './terminal/TerminalInput.vue'

/**
 * 配置
 */
const config = terminalConfig

/**
 * 使用终端逻辑
 */
const {
  history,
  currentCommand,
  executeCommand,
  navigateHistory,
  autoComplete
} = useTerminal()

/**
 * Refs
 */
const inputRef = ref(null)

/**
 * 聚焦到输入框
 * 当点击终端主体时调用
 */
const focusInput = () => {
  // 通过访问子组件的 inputRef 来聚焦
  // 注意：这需要子组件暴露 inputRef
  if (inputRef.value && inputRef.value.$el) {
    const input = inputRef.value.$el.querySelector('input')
    if (input) {
      input.focus()
    }
  }
}
</script>

<style scoped>
/**
 * Terminal 容器样式
 *
 * 只保留容器的基础样式
 * 其他样式已分散到各个子组件中
 */
.terminal-container {
  max-width: 800px;
  width: 50%;
  margin: 50px auto;
  background: var(--bg-secondary);
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.2);
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

/**
 * 响应式设计
 */

/* 大屏幕优化 */
@media (min-width: 1600px) {
  .terminal-container {
    max-width: 900px;
    width: 50%;
  }
}

/* 中等屏幕 */
@media (max-width: 1024px) {
  .terminal-container {
    width: 70%;
    max-width: 700px;
    margin: 30px auto;
  }
}

/* 平板设备 */
@media (max-width: 768px) {
  .terminal-container {
    width: 90%;
    max-width: 600px;
    margin: 20px auto;
    border-radius: 5px;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .terminal-container {
    width: 95%;
    max-width: none;
    margin: 10px auto;
  }
}
</style>

<!--
  旧代码已被移除

  命令定义已移至：src/config/commands.js
  Composables 已移至：src/composables/
  子组件已移至：src/components/terminal/

  这个文件现在只有 ~150 行，相比之前的 1004 行大幅简化
-->

