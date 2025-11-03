/**
 * 命令历史管理 Composable
 * 
 * 管理命令历史记录
 * 支持上下键导航历史命令
 * 
 * @module composables/useCommandHistory
 */

import { ref } from 'vue'

/**
 * 使用命令历史管理
 * 
 * @param {Ref} currentCommand - 当前命令的 ref
 * @returns {Object} 包含历史管理相关方法的对象
 * 
 * @example
 * const currentCommand = ref('')
 * const { addToHistory, navigateHistory } = useCommandHistory(currentCommand)
 */
export function useCommandHistory(currentCommand) {
  /**
   * 命令历史数组
   * 存储所有执行过的命令
   */
  const commandHistory = ref([])
  
  /**
   * 历史索引
   * 用于上下键导航
   * -1 表示不在历史中（当前输入）
   */
  const historyIndex = ref(-1)
  
  /**
   * 添加命令到历史
   * 
   * @param {string} command - 要添加的命令
   */
  const addToHistory = (command) => {
    if (!command.trim()) return
    
    commandHistory.value.push(command)
    historyIndex.value = commandHistory.value.length
  }
  
  /**
   * 导航命令历史
   * 
   * @param {string} direction - 方向：'up' 或 'down'
   */
  const navigateHistory = (direction) => {
    if (commandHistory.value.length === 0) return
    
    if (direction === 'up') {
      // 向上：查看更早的命令
      if (historyIndex.value > 0) {
        historyIndex.value--
        currentCommand.value = commandHistory.value[historyIndex.value]
      }
    } else if (direction === 'down') {
      // 向下：查看更新的命令
      if (historyIndex.value < commandHistory.value.length - 1) {
        historyIndex.value++
        currentCommand.value = commandHistory.value[historyIndex.value]
      } else {
        // 到达最新，清空输入
        historyIndex.value = commandHistory.value.length
        currentCommand.value = ''
      }
    }
  }
  
  /**
   * 重置历史索引
   * 在执行新命令后调用
   */
  const resetHistoryIndex = () => {
    historyIndex.value = commandHistory.value.length
  }
  
  return {
    commandHistory,
    historyIndex,
    addToHistory,
    navigateHistory,
    resetHistoryIndex
  }
}

