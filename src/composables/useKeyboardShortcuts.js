/**
 * 键盘快捷键处理 Composable
 * 
 * 处理终端的各种快捷键
 * 支持 Ctrl+C, Ctrl+L, Ctrl+U, Ctrl+A, Ctrl+E 等
 * 
 * @module composables/useKeyboardShortcuts
 */

/**
 * 使用键盘快捷键
 * 
 * @param {Object} callbacks - 回调函数对象
 * @param {Function} callbacks.onCancel - Ctrl+C 取消当前输入
 * @param {Function} callbacks.onClear - Ctrl+L 清空终端
 * @param {Function} callbacks.onClearLine - Ctrl+U 清空当前行
 * @param {Function} callbacks.onMoveToStart - Ctrl+A 移到行首
 * @param {Function} callbacks.onMoveToEnd - Ctrl+E 移到行尾
 * @returns {Object} 包含 handleKeydown 的对象
 * 
 * @example
 * const { handleKeydown } = useKeyboardShortcuts({
 *   onCancel: () => console.log('Cancelled'),
 *   onClear: () => console.log('Cleared')
 * })
 */
export function useKeyboardShortcuts(callbacks) {
  /**
   * 处理键盘事件
   * 
   * @param {KeyboardEvent} event - 键盘事件对象
   */
  const handleKeydown = (event) => {
    // Ctrl+C: 取消当前输入
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault()
      callbacks.onCancel?.()
    }
    
    // Ctrl+L: 清空终端
    else if (event.ctrlKey && event.key === 'l') {
      event.preventDefault()
      callbacks.onClear?.()
    }
    
    // Ctrl+U: 清空当前行
    else if (event.ctrlKey && event.key === 'u') {
      event.preventDefault()
      callbacks.onClearLine?.()
    }
    
    // Ctrl+A: 移到行首
    else if (event.ctrlKey && event.key === 'a') {
      event.preventDefault()
      callbacks.onMoveToStart?.()
    }
    
    // Ctrl+E: 移到行尾
    else if (event.ctrlKey && event.key === 'e') {
      event.preventDefault()
      callbacks.onMoveToEnd?.()
    }
  }
  
  return {
    handleKeydown
  }
}

