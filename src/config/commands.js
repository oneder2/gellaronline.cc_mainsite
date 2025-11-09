/**
 * 命令注册表
 *
 * 集中管理所有可用命令
 * 每个命令可以有：
 * - description: 命令描述
 * - component: Vue 组件名称（推荐，用于复杂输出）
 *
 * 添加新命令的步骤：
 * 1. 创建命令组件在 src/components/commands/
 * 2. 在此文件中导入组件
 * 3. 在 commandComponents 中注册组件
 * 4. 在 commandRegistry 中添加命令配置
 *
 * @module config/commands
 */

// 导入所有命令组件
import HelpCommand from '@/components/commands/HelpCommand.vue'
import AboutCommand from '@/components/commands/AboutCommand.vue'
import SkillsCommand from '@/components/commands/SkillsCommand.vue'
import ProjectsCommand from '@/components/commands/ProjectsCommand.vue'
import ContactCommand from '@/components/commands/ContactCommand.vue'
import VibeCommand from '@/components/commands/VibeCommand.vue'
import SecretCommand from '@/components/commands/SecretCommand.vue'
import BasketballCommand from '@/components/commands/BasketballCommand.vue'
import BasketballStatsCommand from '@/components/commands/BasketballStatsCommand.vue'
import { useBasketballStore } from '@/stores/basketball'

/**
 * 命令组件映射
 * 用于 TerminalOutput 组件动态渲染
 */
export const commandComponents = {
  help: HelpCommand,
  about: AboutCommand,
  skills: SkillsCommand,
  projects: ProjectsCommand,
  contact: ContactCommand,
  vibe: VibeCommand,
  secret: SecretCommand,
  basketball: BasketballCommand,
  'basketball-stats': BasketballStatsCommand
}

/**
 * 命令配置对象
 * 现在使用组件方式而非 execute 函数
 */
export const commandRegistry = {
  help: {
    description: '显示所有可用命令',
    component: 'help'
  },

  about: {
    description: '关于我',
    component: 'about'
  },

  skills: {
    description: '技能栈',
    component: 'skills'
  },

  projects: {
    description: '项目展示',
    component: 'projects'
  },

  contact: {
    description: '联系方式',
    component: 'contact'
  },

  vibe: {
    description: 'Vibe Coding 哲学',
    component: 'vibe'
  },

  secret: {
    description: '隐藏命令',
    component: 'secret'
  },

  basketball: {
    description: '打篮球小游戏',
    component: 'basketball',
    /**
     * 执行篮球游戏命令
     * @param {string} subCommand - 子命令（shoot, dunk, pass, stats, reset）
     * @param {Array} args - 额外参数
     * @returns {string} 命令执行结果的HTML字符串
     */
    execute: (subCommand, args) => {
      const store = useBasketballStore()

      // 如果没有子命令，显示游戏界面
      if (!subCommand) {
        return ''
      }

      // 处理子命令
      switch (subCommand) {
        case 'shoot': {
          const result = store.shoot()
          return `<p class="${result.success ? 'success' : 'error'}">${result.message}</p>`
        }

        case 'dunk': {
          const result = store.dunk()
          return `<p class="${result.success ? 'success' : 'error'}">${result.message}</p>`
        }

        case 'pass': {
          const result = store.pass()
          return `<p class="${result.success ? 'success' : 'error'}">${result.message}</p>`
        }

        case 'stats': {
          // 使用stats组件显示统计
          return ''
        }

        case 'reset': {
          store.resetGame()
          return '<p class="success">[+] 游戏已重置！输入 basketball shoot 开始新游戏。</p>'
        }

        default: {
          return `<p class="error">未知的子命令: ${subCommand}</p><p class="hint">可用命令: shoot, dunk, pass, stats, reset</p>`
        }
      }
    }
  }
}

