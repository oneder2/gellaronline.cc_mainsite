# Gellar's Digital Space

一个独特的终端风格个人网站，展示个人信息、技能和项目。

## [+] 特性

- **纯终端风格界面** - 模拟命令行终端的交互体验，纯ASCII字符，无emoji
- **赛博朋克美学** - 暗色主题配合霓虹绿配色
- **交互式命令系统** - 通过命令探索个人信息
- **快捷键支持** - 支持 Ctrl+C/L/U/A/E 等常用终端快捷键
- **智能光标** - 实时跟随输入位置的自定义光标
- **动态视觉效果** - 粒子动画、扫描线、辉光效果
- **响应式设计** - 完美适配桌面和移动设备（1400px/1200px/768px/480px）
- **彩蛋系统** - 隐藏命令等待探索
- **纯文本终端化** - 去除所有卡片式设计，保持终端一致性

## [>] 可用命令

在终端中输入以下命令来探索网站：

- `help` - 显示所有可用命令
- `about` - 关于我的信息
- `skills` - 查看技能栈
- `projects` - 浏览项目列表
- `contact` - 获取联系方式
- `vibe` - 了解 Vibe Coding 哲学
- `basketball` - 打篮球小游戏
  - `basketball shoot` - 投篮（2分，70%命中率）
  - `basketball dunk` - 扣篮（3分，50%命中率）
  - `basketball pass` - 传球（可能助攻得1分）
  - `basketball stats` - 查看游戏统计
  - `basketball reset` - 重置游戏
- `clear` - 清空终端
- `secret` - 发现隐藏内容

### [~] 快捷键

- `Tab` - 自动补全命令
- `↑` / `↓` - 浏览命令历史
- `Ctrl+C` - 取消当前输入
- `Ctrl+L` - 清空终端屏幕
- `Ctrl+U` - 清空当前行
- `Ctrl+A` - 光标移到行首
- `Ctrl+E` - 光标移到行尾

[!] **提示**：点击终端任意位置可自动聚焦到输入框，但不会自动滚动到底部，方便复制内容。

## [#] 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **状态管理**: Pinia
- **样式**: CSS3 (CSS Variables, Animations)
- **开发语言**: JavaScript
- **设计风格**: 纯终端风格，无emoji，无卡片式设计

## [=] 项目结构

```
gellaronline/
├── src/
│   ├── components/
│   │   ├── commands/              # 命令组件（Phase 4 新增）
│   │   │   ├── HelpCommand.vue    # 帮助命令
│   │   │   ├── AboutCommand.vue   # 关于命令
│   │   │   ├── SkillsCommand.vue  # 技能命令
│   │   │   ├── SkillBar.vue       # 技能进度条子组件
│   │   │   ├── ProjectsCommand.vue# 项目命令
│   │   │   ├── ContactCommand.vue # 联系命令
│   │   │   ├── VibeCommand.vue    # Vibe 哲学命令
│   │   │   ├── SecretCommand.vue  # 隐藏彩蛋命令
│   │   │   ├── BasketballCommand.vue # 篮球游戏主界面
│   │   │   └── BasketballStatsCommand.vue # 篮球游戏统计
│   │   ├── terminal/              # 终端子组件
│   │   │   ├── TerminalHeader.vue # 终端头部
│   │   │   ├── TerminalBody.vue   # 终端主体
│   │   │   ├── TerminalInput.vue  # 输入组件
│   │   │   ├── TerminalOutput.vue # 输出组件
│   │   │   └── TerminalCursor.vue # 自定义光标
│   │   └── Terminal.vue           # 终端主组件（~160行）
│   ├── composables/               # 组合式函数（逻辑复用）
│   │   ├── useTerminal.js         # 终端核心逻辑
│   │   ├── useCommandHistory.js   # 命令历史管理
│   │   ├── useAutoComplete.js     # 自动补全
│   │   ├── useKeyboardShortcuts.js# 快捷键处理
│   │   └── useCursorPosition.js   # 光标位置计算
│   ├── stores/                    # 状态管理（Pinia）
│   │   └── basketball.js          # 篮球游戏状态管理
│   ├── config/                    # 配置文件（数据与逻辑分离）
│   │   ├── commands.js            # 命令注册表（组件化）
│   │   ├── terminal.config.js     # 终端配置
│   │   └── skills.data.js         # 技能数据
│   ├── styles/                    # 样式文件（Phase 5 新增）
│   │   └── commands.css           # 命令组件公共样式
│   ├── utils/                     # 工具函数
│   │   └── textMeasure.js         # 文本宽度测量（Canvas API）
│   ├── App.vue                    # 主应用组件（布局和粒子效果）
│   ├── main.js                    # 应用入口
│   └── style.css                  # 全局样式（配色方案和动画）
├── public/                        # 静态资源
├── index.html                     # HTML 模板
├── package.json                   # 项目依赖
├── vite.config.js                 # Vite 配置（含 @ 路径别名）
├── README.md                      # 项目文档
└── DEVELOPMENT.md                 # 开发文档
```

### 🔄 重构说明

项目已完成完整的模块化重构（2024-11-02）：

**Phase 1-3: 组件解耦**
- **从 1004 行巨型组件** → **20+ 个职责清晰的小模块**
- **单一职责原则**：每个组件/模块只负责一件事
- **逻辑复用**：使用 Composables 模式提取可复用逻辑
- **配置分离**：命令定义、数据、配置独立管理

**Phase 4: 命令组件化** ✅
- 所有命令从 HTML 字符串转换为 Vue 组件
- 创建 7 个命令组件（Help, About, Skills, Projects, Contact, Vibe, Secret）
- 创建 SkillBar 子组件用于技能展示
- 使用 SVG 图标替代 emoji，提升专业性

**Phase 5: 样式整理** ✅
- 提取公共样式到 `src/styles/commands.css`
- 减少代码重复，保持样式一致性
- 完善响应式设计

**易于扩展**：
- 添加新命令：在 `src/components/commands/` 创建组件
- 注册命令：在 `src/config/commands.js` 中导入并注册
- 无需修改核心代码

详细重构文档请查看 `REFACTORING_SUMMARY.md` 和 `DEVELOPMENT.md`。
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173/` 查看网站。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## 🎨 自定义配置

### 修改配色方案

编辑 `src/style.css` 中的 CSS 变量：

```css
:root {
  --bg-primary: #0a0e27;        /* 主背景色 */
  --bg-secondary: #1a1f3a;      /* 次背景色 */
  --text-primary: #00ff41;      /* 主文本色（霓虹绿）*/
  --text-secondary: #00d4aa;    /* 次文本色（青色）*/
  --text-muted: #4a9eff;        /* 弱化文本色（蓝色）*/
  --accent: #ff006e;            /* 强调色（粉红）*/
  --border: #00ff4133;          /* 边框色 */
}
```

### 添加新命令

在 `src/components/Terminal.vue` 中的 `commands` 对象添加新命令：

```javascript
const commands = {
  // ... 现有命令

  newcommand: {
    description: '新命令描述',
    execute: () => {
      return `
        <div class="custom-section">
          <h3 class="section-title">命令标题</h3>
          <p>命令输出内容</p>
        </div>
      `
    }
  }
}
```

### 修改个人信息

编辑 `src/components/Terminal.vue` 中各个命令的 `execute` 函数返回的 HTML 内容。

主要需要修改的命令：
- `about` - 个人简介
- `skills` - 技能列表
- `projects` - 项目展示
- `contact` - 联系方式

## 🎯 设计理念

### Vibe Coding 哲学

这个网站体现了 "Vibe Coding" 的理念：

- 🎵 **跟随直觉，但不失严谨** - 代码结构清晰，注释完善
- 🎨 **追求美感，但不忘功能** - 视觉效果与用户体验并重
- 🌊 **保持流动，但不失方向** - 灵活的架构，易于扩展
- ✨ **享受过程，但不忘目标** - 开发过程充满创意和乐趣

### 视觉设计

- **终端美学**：模拟经典的命令行界面，唤起技术人员的共鸣
- **赛博朋克风格**：暗色背景配合霓虹色彩，营造未来感
- **动态效果**：粒子、扫描线、辉光等效果增加视觉趣味性
- **交互反馈**：悬停、点击等操作都有明确的视觉反馈

## 📝 更新日志

### v1.3.0 (2025-11-08)

- 🎮 **完整实现篮球游戏功能**
  - 使用 Pinia 进行状态管理
  - 实现投篮、扣篮、传球等游戏机制
  - 连击系统：连续命中提高命中率
  - 详细的统计系统：得分、命中率、历史记录
  - 支持子命令：shoot, dunk, pass, stats, reset
  - 实时动画效果和视觉反馈
  - 完整的游戏文档（BASKETBALL_GAME_GUIDE.md）

### v1.2.0 (2025-11-08)

- 🐛 **修复 skills 命令显示问题**
  - 修复框架和工具部分显示为类似 `-` 标志图案的问题
  - 现在正确显示所有工具名称（Vue.js, Next.js, Django 等）
- ✨ **优化终端点击交互**
  - 点击终端区域不再自动滚动到底部
  - 允许用户在浏览历史内容时点击复制，不被打断
  - 只有执行命令时才会自动滚动到底部

### v1.1.0 (2025-11-02)

- ✨ **新增快捷键支持**
  - Ctrl+C: 取消当前输入
  - Ctrl+L: 清空终端
  - Ctrl+U: 清空当前行
  - Ctrl+A: 光标移到行首
  - Ctrl+E: 光标移到行尾
- ✨ **智能光标系统**
  - 光标实时跟随输入位置
  - 平滑的位置过渡动画
  - 准确的像素级定位
- 🎨 **响应式设计优化**
  - 终端宽度增加到 1200px（原 900px）
  - 新增大屏幕优化（>1400px）
  - 改善平板和手机显示效果
  - 添加多个断点适配（1400px/1024px/768px/480px）
- 💫 **交互体验改进**
  - 点击终端任意位置自动聚焦输入框
  - 优化光标闪烁动画
  - 改善整体视觉流畅度

### v1.0.0 (2025-11-01)

- ✅ 初始版本发布
- ✅ 实现终端风格界面
- ✅ 添加基础命令系统（help, about, skills, projects, contact, vibe, clear, secret）
- ✅ 实现粒子背景动画
- ✅ 添加扫描线和辉光效果
- ✅ 实现命令历史和自动补全功能
- ✅ 响应式设计支持移动设备
- ✅ 完善项目文档

## 🤝 贡献

欢迎提出建议和改进意见！

## 📄 许可证

MIT License

## 👤 作者

**Gellar**

- 身份：基于 vibe coding 的软件工程师
- 爱好：数字艺术创作 | 游戏开发
- 理念：代码是艺术，bug 是特性

---

⚡ Powered by Vibe Coding ⚡
