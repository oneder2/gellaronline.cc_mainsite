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
  secret: SecretCommand
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
  }
}

