/**
 * 光标位置计算 Composable
 * 
 * 管理自定义光标的位置计算
 * 使用 Canvas API 精确测量文本宽度
 * 
 * @module composables/useCursorPosition
 */

import { ref, watch } from 'vue'
import { measureTextWidth } from '@/utils/textMeasure'

/**
 * 使用光标位置管理
 * 
 * @param {Ref} inputRef - 输入框的 ref
 * @param {Ref} currentCommand - 当前命令的 ref
 * @returns {Object} 包含 cursorPosition 和 updateCursor 的对象
 * 
 * @example
 * const inputRef = ref(null)
 * const currentCommand = ref('')
 * const { cursorPosition, updateCursor } = useCursorPosition(inputRef, currentCommand)
 */
export function useCursorPosition(inputRef, currentCommand) {
  /**
   * 光标位置（像素）
   */
  const cursorPosition = ref(0)
  
  /**
   * 更新光标位置
   * 根据输入框中的光标位置计算像素位置
   */
  const updateCursor = () => {
    if (!inputRef.value) return
    
    const input = inputRef.value
    const cursorIndex = input.selectionStart || 0
    const text = currentCommand.value.substring(0, cursorIndex)
    
    // 使用工具函数测量文本宽度
    const computedStyle = window.getComputedStyle(input)
    cursorPosition.value = measureTextWidth(text, computedStyle.font)
  }
  
  /**
   * 监听命令变化，自动更新光标
   * 这样在命令历史导航或自动补全时，光标会自动更新
   */
  watch(currentCommand, () => {
    updateCursor()
  })
  
  return {
    cursorPosition,
    updateCursor
  }
}

