<!--
  TerminalInput.vue - 终端输入组件
  
  处理用户输入和交互
  包括：
  - 命令输入
  - 快捷键处理
  - 光标位置管理
  - 命令历史导航
  - 自动补全
  
  这是一个复杂的交互组件，整合了多个 composables
-->

<template>
  <div class="input-line-container">
    <!-- 命令提示符 -->
    <span class="prompt">{{ prompt }}</span>
    
    <!-- 输入包装器 -->
    <div class="input-wrapper">
      <!-- 输入框 -->
      <input
        ref="inputRef"
        v-model="localCommand"
        @keydown="handleKeydown"
        @keydown.enter="handleExecute"
        @keydown.up.prevent="handleNavigate('up')"
        @keydown.down.prevent="handleNavigate('down')"
        @keydown.tab.prevent="handleAutoComplete"
        @input="updateCursor"
        @click="updateCursor"
        class="command-input"
        type="text"
        autofocus
      />
      
      <!-- 自定义光标 -->
      <TerminalCursor :position="cursorPosition" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import { useCursorPosition } from '@/composables/useCursorPosition'
import TerminalCursor from './TerminalCursor.vue'

/**
 * Props
 */
const props = defineProps({
  /**
   * 当前命令（v-model）
   */
  modelValue: {
    type: String,
    default: ''
  },
  
  /**
   * 命令提示符
   */
  prompt: {
    type: String,
    default: 'visitor@gellar:~$'
  }
})

/**
 * Emits
 */
const emit = defineEmits([
  'update:modelValue',  // v-model 更新
  'execute',            // 执行命令
  'navigate',           // 导航历史
  'autocomplete'        // 自动补全
])

/**
 * Refs
 */
const inputRef = ref(null)
const localCommand = ref(props.modelValue)

/**
 * 光标位置管理
 */
const { cursorPosition, updateCursor } = useCursorPosition(inputRef, localCommand)

/**
 * 快捷键处理
 */
const { handleKeydown } = useKeyboardShortcuts({
  // Ctrl+C: 取消当前输入
  onCancel: () => {
    if (localCommand.value) {
      emit('execute', { command: localCommand.value, cancelled: true })
      localCommand.value = ''
      nextTick(() => updateCursor())
    }
  },
  
  // Ctrl+L: 清空终端
  onClear: () => {
    emit('execute', { command: 'clear' })
    localCommand.value = ''
    nextTick(() => updateCursor())
  },
  
  // Ctrl+U: 清空当前行
  onClearLine: () => {
    localCommand.value = ''
    nextTick(() => updateCursor())
  },
  
  // Ctrl+A: 移到行首
  onMoveToStart: () => {
    if (inputRef.value) {
      inputRef.value.setSelectionRange(0, 0)
      nextTick(() => updateCursor())
    }
  },
  
  // Ctrl+E: 移到行尾
  onMoveToEnd: () => {
    if (inputRef.value) {
      const length = localCommand.value.length
      inputRef.value.setSelectionRange(length, length)
      nextTick(() => updateCursor())
    }
  }
})

/**
 * 处理命令执行
 */
const handleExecute = () => {
  emit('execute', { command: localCommand.value })
  // 注意：不在这里清空 localCommand，由父组件控制
}

/**
 * 处理历史导航
 */
const handleNavigate = (direction) => {
  emit('navigate', direction)
  nextTick(() => updateCursor())
}

/**
 * 处理自动补全
 */
const handleAutoComplete = () => {
  emit('autocomplete')
  nextTick(() => updateCursor())
}

/**
 * 双向绑定：本地 -> 父组件
 */
watch(localCommand, (val) => {
  emit('update:modelValue', val)
})

/**
 * 双向绑定：父组件 -> 本地
 */
watch(() => props.modelValue, (val) => {
  localCommand.value = val
  nextTick(() => updateCursor())
})

/**
 * 组件挂载时聚焦输入框
 */
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
    updateCursor()
  }
})
</script>

<style scoped>
/**
 * 输入行容器
 */
.input-line-container {
  display: flex;
  align-items: center;
  gap: 10px;
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
 * 输入包装器
 * 使用相对定位，为光标提供定位上下文
 */
.input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

/**
 * 命令输入框
 * 
 * 隐藏原生光标（caret-color: transparent）
 * 使用自定义光标替代
 */
.command-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-family: inherit;
  font-size: inherit;
  caret-color: transparent;
  position: relative;
  z-index: 1;
}

/**
 * 响应式：小屏幕优化
 */
@media (max-width: 480px) {
  .prompt {
    font-size: 11px;
  }
}
</style>

