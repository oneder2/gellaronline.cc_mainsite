/**
 * 终端核心逻辑 Composable
 * 
 * 管理终端的核心功能：
 * - 命令执行
 * - 历史记录
 * - 命令历史导航
 * - 自动补全
 * 
 * @module composables/useTerminal
 */

import { ref } from 'vue'
import { commandRegistry } from '@/config/commands'
import { useCommandHistory } from './useCommandHistory'
import { useAutoComplete } from './useAutoComplete'

/**
 * 使用终端
 * 
 * @returns {Object} 终端相关的状态和方法
 * 
 * @example
 * const {
 *   history,
 *   currentCommand,
 *   executeCommand,
 *   navigateHistory,
 *   autoComplete
 * } = useTerminal()
 */
export function useTerminal() {
  /**
   * 终端历史记录
   * 每项包含 command 和 output
   */
  const history = ref([])
  
  /**
   * 当前输入的命令
   */
  const currentCommand = ref('')
  
  /**
   * 使用命令历史管理
   */
  const { 
    addToHistory, 
    navigateHistory,
    resetHistoryIndex,
    commandHistory 
  } = useCommandHistory(currentCommand)
  
  /**
   * 使用自动补全
   */
  const { autoComplete } = useAutoComplete(currentCommand, commandRegistry)
  
  /**
   * 执行命令
   * 
   * @param {Object} options - 执行选项
   * @param {string} options.command - 要执行的命令
   * @param {boolean} options.cancelled - 是否被取消（Ctrl+C）
   */
  const executeCommand = ({ command, cancelled = false }) => {
    const cmd = command.trim().toLowerCase()
    
    // 空命令不处理
    if (!cmd) return
    
    // 处理被取消的命令（Ctrl+C）
    if (cancelled) {
      history.value.push({
        command: cmd,
        output: '<span class="error">^C (已取消)</span>'
      })
      currentCommand.value = ''
      return
    }
    
    // 特殊命令：clear
    if (cmd === 'clear') {
      history.value = []
      currentCommand.value = ''
      return
    }
    
    // 添加到命令历史
    addToHistory(cmd)
    
    // 查找并执行命令
    const commandConfig = commandRegistry[cmd]
    
    if (commandConfig) {
      // 命令存在
      history.value.push({
        command: cmd,
        output: commandConfig.execute ? commandConfig.execute() : '',
        component: commandConfig.component
      })
    } else {
      // 命令不存在
      history.value.push({
        command: cmd,
        output: `<p class="error">命令未找到: ${cmd}</p><p class="hint">输入 'help' 查看可用命令</p>`
      })
    }
    
    // 清空当前输入
    currentCommand.value = ''
    
    // 重置历史索引
    resetHistoryIndex()
  }
  
  return {
    history,
    currentCommand,
    commandHistory,
    executeCommand,
    navigateHistory,
    autoComplete
  }
}

