<!--
  TerminalHeader.vue - 终端头部组件
  
  显示终端窗口的头部
  包括窗口控制按钮和标题
  
  纯展示组件，不包含业务逻辑
-->

<template>
  <div class="terminal-header">
    <!-- 窗口控制按钮 -->
    <div class="terminal-buttons">
      <span class="btn-close"></span>
      <span class="btn-minimize"></span>
      <span class="btn-maximize"></span>
    </div>
    
    <!-- 终端标题 -->
    <div class="terminal-title">{{ title }}</div>
  </div>
</template>

<script setup>
/**
 * Props
 */
defineProps({
  /**
   * 终端标题
   * 显示在头部中央
   */
  title: {
    type: String,
    default: 'gellar@anonymous:~$'
  }
})
</script>

<style scoped>
/**
 * 终端头部样式
 * 
 * 模拟 macOS 风格的窗口头部
 */
.terminal-header {
  background: var(--bg-primary);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

/**
 * 窗口控制按钮容器
 */
.terminal-buttons {
  display: flex;
  gap: 8px;
  margin-right: 15px;
}

/**
 * 按钮基础样式
 */
.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

/**
 * 关闭按钮（红色）
 */
.btn-close {
  background: #ff5f56;
}

/**
 * 最小化按钮（黄色）
 */
.btn-minimize {
  background: #ffbd2e;
}

/**
 * 最大化按钮（绿色）
 */
.btn-maximize {
  background: #27c93f;
}

/**
 * 终端标题
 */
.terminal-title {
  color: var(--text-muted);
  font-size: 14px;
  flex: 1;
  text-align: center;
}

/**
 * 响应式：小屏幕优化
 */
@media (max-width: 480px) {
  .terminal-header {
    padding: 8px 12px;
  }
  
  .terminal-buttons span {
    width: 10px;
    height: 10px;
  }
}
</style>

