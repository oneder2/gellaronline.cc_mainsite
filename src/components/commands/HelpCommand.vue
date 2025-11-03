<!--
  HelpCommand.vue
  
  帮助命令组件
  显示所有可用命令的列表和使用提示
  
  功能：
  - 显示命令列表
  - 显示命令描述
  - 显示使用提示
  
  @component
-->
<template>
  <div class="help-section">
    <h3 class="section-title">可用命令列表：</h3>
    <div class="command-list">
      <div 
        v-for="cmd in commands" 
        :key="cmd.name"
        class="command-item"
      >
        <span class="cmd">{{ cmd.name }}</span> - {{ cmd.description }}
      </div>
    </div>
    <p class="tip">
      <span class="tip-icon">[i]</span>
      提示：使用 Tab 键可以自动补全命令
    </p>
  </div>
</template>

<script setup>
/**
 * 导入命令注册表以动态生成命令列表
 */
import { computed } from 'vue'
import { commandRegistry } from '@/config/commands'

/**
 * 计算属性：生成命令列表
 * 从 commandRegistry 中提取命令名称和描述
 */
const commands = computed(() => {
  return Object.entries(commandRegistry).map(([name, config]) => ({
    name,
    description: config.description
  }))
})
</script>

<style scoped>
/* 帮助区域样式 */
.help-section {
  padding: 1rem 0;
}

/* 区域标题样式 */
.section-title {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* 命令列表容器 */
.command-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

/* 单个命令项 */
.command-item {
  color: var(--text-secondary);
  padding-left: 1rem;
}

/* 命令名称高亮 */
.cmd {
  color: var(--accent);
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

/* 提示信息样式 */
.tip {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
  margin-top: 1rem;
  padding: 0.5rem;
  background: rgba(0, 255, 136, 0.05);
  border-left: 2px solid var(--accent);
  border-radius: 3px;
}

.tip-icon {
  color: var(--accent);
  font-weight: bold;
  margin-right: 0.5rem;
  font-style: normal;
}
</style>

