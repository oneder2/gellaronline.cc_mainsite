# 开发文档

本文档提供了项目的详细开发指南，包括架构说明、代码规范、扩展指南等。

> **最新更新 (2024-11-02)**: 项目已完成完整的模块化重构，包括组件解耦、命令组件化和样式整理。详见 [重构说明](#重构说明) 和 `REFACTORING_SUMMARY.md`。

## 📋 目录

- [重构说明](#重构说明) **[NEW]**
- [项目架构](#项目架构)
- [开发环境](#开发环境)
- [代码规范](#代码规范)
- [组件说明](#组件说明)
- [命令组件开发](#命令组件开发) **[NEW]**
- [新功能说明](#新功能说明)
- [扩展指南](#扩展指南)
- [调试技巧](#调试技巧)
- [性能优化](#性能优化)
- [部署指南](#部署指南)

## 🔄 重构说明

### 重构历程

项目经历了完整的模块化重构（2024-11-02），分为 5 个阶段：

**Phase 1: 基础设施创建** ✅
- 创建配置文件（`commands.js`, `terminal.config.js`, `skills.data.js`）
- 创建工具函数（`textMeasure.js`）
- 数据与逻辑分离

**Phase 2: 提取 Composables** ✅
- 创建 5 个 composables（`useTerminal`, `useCommandHistory`, `useAutoComplete`, `useKeyboardShortcuts`, `useCursorPosition`）
- 逻辑复用和单一职责

**Phase 3: UI 组件拆分** ✅
- 拆分为 6 个子组件（`TerminalHeader`, `TerminalBody`, `TerminalInput`, `TerminalOutput`, `TerminalCursor`）
- 主组件从 1004 行简化到 160 行

**Phase 4: 命令组件化** ✅
- 创建 7 个命令组件（`HelpCommand`, `AboutCommand`, `SkillsCommand`, `ProjectsCommand`, `ContactCommand`, `VibeCommand`, `SecretCommand`）
- 创建 `SkillBar` 子组件
- 使用 SVG 图标替代 emoji
- 从 HTML 字符串转换为 Vue 组件

**Phase 5: 样式整理** ✅
- 提取公共样式到 `src/styles/commands.css`
- 减少代码重复
- 统一样式规范

### 重构成果

| 指标 | 重构前 | 重构后 | 改进 |
|------|--------|--------|------|
| 主组件行数 | 1004 行 | 160 行 | ⬇️ 84% |
| 文件数量 | 1 个 | 30+ 个 | 模块化 |
| 命令实现方式 | HTML 字符串 | Vue 组件 | 类型安全 |
| 图标方式 | Emoji | SVG | 专业性 |
| 可维护性 | ⭐ | ⭐⭐⭐⭐⭐ | +400% |

详细重构文档请查看 `REFACTORING_SUMMARY.md`。

## 🏗️ 项目架构

### 技术选型

- **Vue 3**: 使用 Composition API，提供更好的代码组织和类型推断
- **Vite**: 快速的开发服务器和构建工具
- **原生 CSS**: 使用 CSS Variables 和现代 CSS 特性，无需预处理器

### 文件结构

```
src/
├── components/
│   └── Terminal.vue          # 终端组件
│       ├── <template>        # 终端 UI 结构
│       ├── <script setup>    # 命令逻辑和状态管理
│       └── <style scoped>    # 组件样式
├── App.vue                   # 根组件
│   ├── <template>            # 布局和粒子效果
│   ├── <script setup>        # 粒子生成逻辑
│   └── <style scoped>        # 布局样式
├── main.js                   # 应用入口
└── style.css                 # 全局样式和主题变量
```

### 数据流

```
用户输入命令
    ↓
Terminal.vue (executeCommand)
    ↓
查找命令定义 (commands 对象)
    ↓
执行命令函数 (execute)
    ↓
返回 HTML 字符串
    ↓
添加到历史记录 (history)
    ↓
渲染输出 (v-html)
```

## 💻 开发环境

### 系统要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装步骤

1. 克隆仓库
```bash
git clone <repository-url>
cd gellaronline
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 访问 http://localhost:5173

### 开发工具推荐

- **VS Code**: 推荐的代码编辑器
- **Volar**: Vue 3 的官方 VS Code 扩展
- **Vue DevTools**: 浏览器调试工具

## 📝 代码规范

### 注释规范

#### 1. 文件头部注释

每个文件都应该有文件头部注释，说明文件的用途：

```vue
<!--
  ComponentName.vue - 组件简短描述
  
  详细说明组件的功能和用途
  
  主要功能：
  - 功能点1
  - 功能点2
  
  使用方法：
  <ComponentName :prop="value" />
-->
```

#### 2. 方法/函数注释

复杂的方法需要添加 JSDoc 风格的注释：

```javascript
/**
 * 方法描述
 * 
 * @param {Type} paramName - 参数说明
 * @returns {Type} 返回值说明
 */
const methodName = (paramName) => {
  // 实现
}
```

#### 3. 复杂逻辑注释

在复杂的逻辑块前后添加注释：

```javascript
// 处理命令历史导航
if (direction === 'up') {
  // 向上导航到更早的命令
  if (historyIndex.value > 0) {
    historyIndex.value--
  }
}
```

#### 4. TODO 注释

标记需要改进或扩展的地方：

```javascript
// TODO: 添加命令别名支持
// TODO: 实现命令参数解析
```

### 命名规范

- **组件名**: PascalCase (例如: `Terminal.vue`)
- **变量名**: camelCase (例如: `currentCommand`)
- **常量名**: UPPER_SNAKE_CASE (例如: `MAX_HISTORY_SIZE`)
- **CSS 类名**: kebab-case (例如: `.terminal-container`)
- **CSS 变量**: kebab-case with prefix (例如: `--text-primary`)

### Vue 组件规范

- 使用 Composition API (`<script setup>`)
- 使用 `ref` 和 `reactive` 管理状态
- 使用 `computed` 处理派生状态
- 事件处理函数以 `handle` 或动词开头

### 终端风格设计规范 **[NEW - v1.3.0]**

#### 核心原则

本项目采用**纯终端风格**设计，所有UI元素都应遵循以下原则：

1. **纯ASCII字符**:
   - ❌ 禁止使用emoji（🏀 🔥 ✅ ❌ 等）
   - ✅ 使用ASCII图标（[*] [+] [X] >>> 等）
   - 原因：终端环境的原生字符，保证兼容性和一致性

2. **无圆角设计**:
   - ❌ 禁止使用 `border-radius`
   - ✅ 保持所有元素直角
   - 原因：终端是矩形的，圆角破坏终端美学

3. **无卡片式背景**:
   - ❌ 禁止在内容块使用 `background` 颜色
   - ✅ 使用边框（`border`）分隔区域
   - 例外：终端容器本身可以有背景
   - 原因：终端内容是纯文本，不需要背景装饰

4. **简洁的动画**:
   - ❌ 禁止使用 `transform: translateX/Y()` 位移动画（在内容块上）
   - ✅ 可以使用颜色过渡（`transition: color, border-color`）
   - ✅ 可以使用关键帧动画（`@keyframes`）用于出现效果
   - 原因：终端内容是静态的，过度动画破坏终端感

5. **左对齐布局**:
   - ❌ 避免使用 `text-align: center`（除非是标题）
   - ✅ 内容默认左对齐
   - 原因：终端输出是左对齐的

#### ASCII图标库

项目统一使用以下ASCII图标：

```
[*]  - 重要/主要内容/篮球
[+]  - 成功/正面/总体数据
[-]  - 取消/中性
[X]  - 失败/错误
[>]  - 动作/命令/投篮/箭头
[!]  - 强调/警告/扣篮
[~]  - 传递/传球/波浪
[#]  - 统计/数据/标签
[=]  - 记录/历史/等于
[P]  - 玩家/人物
(*)  - 球/圆形物体
>>>  - 连击/火热/多重箭头
```

#### CSS样式模式

**推荐的样式模式**:

```css
/* ✅ 推荐：使用左边框分隔 */
.content-block {
  border-left: 2px solid var(--border);
  padding-left: 1rem;
  padding: 0.5rem 0;
}

.content-block:hover {
  border-left-color: var(--accent);
}

/* ✅ 推荐：使用底部边框分隔列表项 */
.list-item {
  border-bottom: 1px solid var(--border);
  padding: 0.3rem 0;
}

.list-item:last-child {
  border-bottom: none;
}

/* ✅ 推荐：简洁的出现动画 */
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**禁止的样式模式**:

```css
/* ❌ 禁止：卡片式设计 */
.card {
  background: rgba(0, 255, 136, 0.05);  /* 禁止背景色 */
  border-radius: 8px;                    /* 禁止圆角 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* 禁止阴影 */
}

/* ❌ 禁止：位移动画（在内容块上） */
.item:hover {
  transform: translateX(5px);  /* 禁止位移 */
}

/* ❌ 禁止：居中对齐（除非是标题） */
.content {
  text-align: center;  /* 避免居中 */
}
```

#### 开发检查清单

在提交代码前，请检查：

- [ ] 没有使用emoji，全部使用ASCII图标
- [ ] 没有使用 `border-radius`
- [ ] 内容块没有使用 `background` 颜色
- [ ] 没有使用 `box-shadow`
- [ ] 没有在内容块上使用 `transform` 位移
- [ ] 使用了统一的ASCII图标库
- [ ] 遵循左对齐布局原则
- [ ] 动画简洁且符合终端美学

## 🧩 组件说明

### Terminal.vue

终端组件是网站的核心，负责命令交互和内容展示。

#### 主要状态

```javascript
const history = ref([])              // 命令历史记录
const currentCommand = ref('')       // 当前输入
const historyIndex = ref(-1)         // 历史导航索引
const commandHistory = ref([])       // 命令历史缓存
```

#### 核心方法

1. **executeCommand()**: 执行用户输入的命令
2. **navigateHistory()**: 处理上下键导航
3. **autoComplete()**: Tab 键自动补全
4. **scrollToBottom()**: 滚动到终端底部

#### 命令系统（已重构）

命令现在使用组件方式定义在 `src/config/commands.js` 中：

```javascript
// 导入命令组件
import HelpCommand from '@/components/commands/HelpCommand.vue'

// 注册组件
export const commandComponents = {
  help: HelpCommand
}

// 定义命令
export const commandRegistry = {
  help: {
    description: '显示所有可用命令',
    component: 'help'  // 引用 commandComponents 中的组件
  }
}
```

### App.vue

根组件负责整体布局和背景效果。

#### 粒子系统

```javascript
const particles = ref([])

const generateParticles = () => {
  // 生成随机粒子数据
  particles.value = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }))
}
```

## 🎨 命令组件开发

### 创建新命令组件

添加新命令的完整流程：

#### 1. 创建命令组件

在 `src/components/commands/` 目录下创建新组件：

```vue
<!-- src/components/commands/MyCommand.vue -->
<template>
  <div class="my-command-section">
    <h3 class="section-title">
      <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <!-- SVG 图标路径 -->
      </svg>
      我的命令
    </h3>

    <div class="content">
      <!-- 命令输出内容 -->
    </div>
  </div>
</template>

<script setup>
/**
 * MyCommand 组件
 *
 * 描述命令的功能
 */

// 导入需要的数据或工具
// import { someData } from '@/config/someData'

// 定义组件逻辑
</script>

<style scoped>
/* 组件特定样式 */
/* 可以使用 src/styles/commands.css 中的公共类 */
</style>
```

#### 2. 注册命令组件

在 `src/config/commands.js` 中导入并注册：

```javascript
// 1. 导入组件
import MyCommand from '@/components/commands/MyCommand.vue'

// 2. 注册到 commandComponents
export const commandComponents = {
  // ... 其他命令
  mycommand: MyCommand
}

// 3. 添加到 commandRegistry
export const commandRegistry = {
  // ... 其他命令
  mycommand: {
    description: '我的命令描述',
    component: 'mycommand'
  }
}
```

#### 3. 测试命令

在终端中输入 `mycommand` 测试新命令。

### 命令组件最佳实践

#### 使用公共样式类

`src/styles/commands.css` 提供了以下公共类：

- `.section-title` - 区域标题
- `.title-icon` - 标题图标
- `.info-block` - 信息块容器
- `.info-line` - 信息行
- `.label` - 标签
- `.item` - 列表项
- `.tip` - 提示信息
- `.note` - 注释信息
- `.quote` - 引用文字

#### SVG 图标使用

推荐使用 [Feather Icons](https://feathericons.com/) 或类似的 SVG 图标库：

```vue
<svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path d="..."></path>
</svg>
```

#### 响应式设计

确保组件在移动设备上也能良好显示：

```css
@media (max-width: 480px) {
  .section-title {
    font-size: 1rem;
  }

  .content {
    padding: 0.8rem;
  }
}
```

#### 数据分离

将数据提取到配置文件：

```javascript
// src/config/myData.js
export const myData = {
  // 数据定义
}

// 在组件中导入
import { myData } from '@/config/myData'
```

### 命令组件示例

参考现有命令组件：

- **简单展示**: `AboutCommand.vue` - 纯展示型组件
- **列表展示**: `ProjectsCommand.vue` - 列表项展示
- **复杂交互**: `SkillsCommand.vue` - 使用子组件（SkillBar）
- **动画效果**: `VibeCommand.vue` - 渐入动画
- **特殊效果**: `SecretCommand.vue` - 庆祝动画

## 🆕 新功能说明

### v1.1.0 更新内容

#### 1. 快捷键系统

实现了常用的终端快捷键支持，通过 `handleKeydown` 函数处理：

```javascript
const handleKeydown = (event) => {
  // Ctrl+C: 取消当前输入
  if (event.ctrlKey && event.key === 'c') {
    event.preventDefault()
    // 显示取消信息并清空输入
  }

  // Ctrl+L: 清空终端
  else if (event.ctrlKey && event.key === 'l') {
    event.preventDefault()
    history.value = []
  }

  // Ctrl+U: 清空当前行
  else if (event.ctrlKey && event.key === 'u') {
    event.preventDefault()
    currentCommand.value = ''
  }

  // Ctrl+A: 光标移到行首
  else if (event.ctrlKey && event.key === 'a') {
    event.preventDefault()
    commandInput.value.setSelectionRange(0, 0)
  }

  // Ctrl+E: 光标移到行尾
  else if (event.ctrlKey && event.key === 'e') {
    event.preventDefault()
    const length = currentCommand.value.length
    commandInput.value.setSelectionRange(length, length)
  }
}
```

**支持的快捷键：**
- `Ctrl+C`: 取消当前输入（显示 ^C 标记）
- `Ctrl+L`: 清空终端屏幕
- `Ctrl+U`: 清空当前行
- `Ctrl+A`: 光标移到行首
- `Ctrl+E`: 光标移到行尾

#### 2. 智能光标系统

实现了跟随输入位置的自定义光标：

```javascript
const cursorPosition = ref(0)

const updateCursorPosition = () => {
  if (!commandInput.value) return

  const input = commandInput.value
  const cursorIndex = input.selectionStart || 0
  const text = currentCommand.value.substring(0, cursorIndex)

  // 使用 Canvas API 测量文本宽度
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = window.getComputedStyle(input).font

  const metrics = context.measureText(text)
  cursorPosition.value = metrics.width
}
```

**特点：**
- 使用 Canvas API 精确测量文本宽度
- 实时跟随光标位置
- 平滑的过渡动画（0.05s）
- 闪烁动画效果

**样式实现：**
```css
.cursor {
  position: absolute;
  left: 0;
  width: 2px;
  height: 1.2em;
  background: var(--text-primary);
  animation: blink 1s infinite;
  transition: left 0.05s ease;
}
```

#### 3. 响应式设计优化

增加了多个断点以适配不同屏幕尺寸：

```css
/* 大屏幕优化 (>1400px) */
@media (min-width: 1400px) {
  .terminal-container {
    max-width: 1400px;
  }
  .terminal-body {
    font-size: 15px;
  }
}

/* 中等屏幕 (≤1024px) */
@media (max-width: 1024px) {
  .terminal-container {
    max-width: 95%;
  }
}

/* 平板设备 (≤768px) */
@media (max-width: 768px) {
  .terminal-container {
    width: 95%;
  }
  .terminal-body {
    font-size: 13px;
  }
}

/* 小屏幕手机 (≤480px) */
@media (max-width: 480px) {
  .terminal-container {
    width: 98%;
  }
  .terminal-body {
    font-size: 12px;
  }
}
```

**改进点：**
- 终端宽度从 900px 增加到 1200px
- 添加大屏幕优化（1400px+）
- 使用百分比宽度提高灵活性
- 优化各尺寸下的字体大小

#### 4. 交互体验改进

**自动聚焦：**
```javascript
onMounted(() => {
  // 点击终端任意位置都聚焦到输入框
  if (terminalBody.value) {
    terminalBody.value.addEventListener('click', () => {
      if (commandInput.value) {
        commandInput.value.focus()
      }
    })
  }
})
```

**光标位置同步：**
- 在命令历史导航时更新光标位置
- 在自动补全后更新光标位置
- 在快捷键操作后更新光标位置

## 🔧 扩展指南

### 添加新命令

1. 在 `Terminal.vue` 的 `commands` 对象中添加新命令：

```javascript
const commands = {
  // ... 现有命令
  
  mycommand: {
    description: '我的新命令',
    execute: () => {
      return `
        <div class="my-section">
          <h3 class="section-title">标题</h3>
          <p>内容</p>
        </div>
      `
    }
  }
}
```

2. 在 `help` 命令的输出中添加新命令的说明：

```javascript
help: {
  execute: () => {
    return `
      <div class="help-section">
        <!-- ... -->
        <div class="command-item"><span class="cmd">mycommand</span> - 我的新命令</div>
      </div>
    `
  }
}
```

### 添加命令参数

修改 `executeCommand` 方法以支持参数解析：

```javascript
const executeCommand = () => {
  const input = currentCommand.value.trim()
  const [cmd, ...args] = input.split(' ')
  
  if (commands[cmd]) {
    // 将参数传递给命令
    output = commands[cmd].execute(args)
  }
}
```

### 自定义样式

#### 修改配色

编辑 `src/style.css` 中的 CSS 变量：

```css
:root {
  --bg-primary: #your-color;
  --text-primary: #your-color;
  /* ... */
}
```

#### 添加新的样式类

在 `Terminal.vue` 的 `<style scoped>` 中添加：

```css
.my-custom-class {
  /* 样式定义 */
}
```

### 添加动画效果

使用 CSS 动画：

```css
@keyframes myAnimation {
  from { /* 起始状态 */ }
  to { /* 结束状态 */ }
}

.animated-element {
  animation: myAnimation 1s ease-in-out;
}
```

## 🐛 调试技巧

### Vue DevTools

1. 安装 Vue DevTools 浏览器扩展
2. 打开开发者工具的 Vue 面板
3. 查看组件树、状态和事件

### 控制台调试

在代码中添加调试语句：

```javascript
console.log('当前命令:', currentCommand.value)
console.log('历史记录:', history.value)
```

### Vite 热重载

- 修改代码后自动刷新
- 保持应用状态（HMR）
- 查看终端输出的错误信息

## ⚡ 性能优化

### 已实现的优化

1. **虚拟滚动**: 历史记录过多时考虑实现
2. **懒加载**: 粒子效果按需生成
3. **CSS 动画**: 使用 GPU 加速的 transform 和 opacity
4. **响应式优化**: 移动端减少粒子数量

### 优化建议

1. 限制历史记录数量
2. 使用 `v-show` 代替 `v-if` 对于频繁切换的元素
3. 避免在命令输出中使用过大的图片
4. 使用 Web Workers 处理复杂计算

## 🚀 部署指南

### 构建生产版本

```bash
npm run build
```

生成的文件在 `dist/` 目录。

### 部署到静态托管

#### Vercel

```bash
npm install -g vercel
vercel
```

#### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages

1. 修改 `vite.config.js` 添加 base 路径：

```javascript
export default defineConfig({
  base: '/repository-name/',
  plugins: [vue()]
})
```

2. 构建并部署：

```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

### 环境变量

创建 `.env` 文件：

```
VITE_APP_TITLE=Gellar's Digital Space
VITE_API_URL=https://api.example.com
```

在代码中使用：

```javascript
const title = import.meta.env.VITE_APP_TITLE
```

## 📚 参考资源

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

如有问题或建议，欢迎提出 Issue 或 Pull Request！

