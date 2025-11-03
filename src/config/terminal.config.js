/**
 * 终端配置文件
 * 
 * 集中管理终端的所有配置项
 * 包括标题、欢迎信息、ASCII 艺术等
 * 
 * @module config/terminal.config
 */

/**
 * 终端配置对象
 */
export const terminalConfig = {
  /**
   * 终端标题
   * 显示在终端头部
   */
  title: 'gellar@anonymous:~$',
  
  /**
   * 命令提示符
   * 显示在每个输入行前面
   */
  prompt: 'visitor@gellar:~$',
  
  /**
   * ASCII 艺术字
   * 显示在欢迎信息的顶部
   */
  asciiArt: `
 ██████╗ ███████╗██╗     ██╗      █████╗ ██████╗ 
██╔════╝ ██╔════╝██║     ██║     ██╔══██╗██╔══██╗
██║  ███╗█████╗  ██║     ██║     ███████║██████╔╝
██║   ██║██╔══╝  ██║     ██║     ██╔══██║██╔══██╗
╚██████╔╝███████╗███████╗███████╗██║  ██║██║  ██║
 ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
  `,
  
  /**
   * 欢迎信息
   * 显示在终端启动时
   */
  welcomeMessage: `
    <p class="welcome-text">欢迎来到 Gellar 的数字空间 v1.1.0</p>
    <p class="hint">输入 '<span class="command-hint">help</span>' 查看可用命令</p>
    <p class="hint">输入 '<span class="command-hint">about</span>' 了解更多关于我的信息</p>
  `,
  
  /**
   * 版本号
   */
  version: '1.1.0'
}

