/**
 * 命令自动补全 Composable
 * 
 * 实现 Tab 键自动补全功能
 * 根据输入的前缀匹配可用命令
 * 
 * @module composables/useAutoComplete
 */

/**
 * 使用自动补全
 * 
 * @param {Ref} currentCommand - 当前命令的 ref
 * @param {Object} commandRegistry - 命令注册表
 * @returns {Object} 包含 autoComplete 方法的对象
 * 
 * @example
 * const currentCommand = ref('')
 * const { autoComplete } = useAutoComplete(currentCommand, commandRegistry)
 */
export function useAutoComplete(currentCommand, commandRegistry) {
  /**
   * 自动补全命令
   * 
   * 如果只有一个匹配项，自动补全
   * 如果有多个匹配项，不做处理（可以扩展为显示候选列表）
   * 
   * TODO: 可以扩展为显示多个候选项
   */
  const autoComplete = () => {
    const input = currentCommand.value.toLowerCase().trim()
    
    // 空输入不补全
    if (!input) return
    
    // 查找所有匹配的命令
    const matches = Object.keys(commandRegistry).filter(cmd => 
      cmd.startsWith(input)
    )
    
    // 只有一个匹配时才补全
    if (matches.length === 1) {
      currentCommand.value = matches[0]
    }
    
    // TODO: 如果有多个匹配，可以显示候选列表
    // else if (matches.length > 1) {
    //   showCandidates(matches)
    // }
  }
  
  return {
    autoComplete
  }
}

