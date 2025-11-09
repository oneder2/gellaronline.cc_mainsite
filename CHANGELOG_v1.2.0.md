# 更新日志 v1.2.0

**发布日期：** 2025-11-08

## 📋 概述

本次更新主要包含三个方面的改进：
1. 修复 skills 命令的显示问题
2. 优化终端点击交互体验
3. 新增篮球小游戏功能

---

## 🐛 Bug 修复

### 1. 修复 skills 命令显示问题

**问题描述：**
- 在 `skills` 命令的"框架 & 工具"部分，工具名称没有正确显示
- 显示为类似 `-` 标志的图案或空白

**根本原因：**
- `src/components/commands/SkillsCommand.vue` 中的代码期望 `tool` 是一个对象并访问 `tool.name`
- 但在 `src/config/skills.data.js` 中，`tools` 是一个字符串数组

**修复方案：**
- 修改 `SkillsCommand.vue` 第 36-40 行
- 将 `v-for="tool in skillsData.tools"` 的 `:key="tool.name"` 改为 `:key="tool"`
- 将 `{{ tool.name }}` 改为 `{{ tool }}`

**修改文件：**
- `src/components/commands/SkillsCommand.vue`

**代码变更：**
```vue
<!-- 修改前 -->
<span
  v-for="tool in skillsData.tools"
  :key="tool.name"
  class="tag"
>
  {{ tool.name }}
</span>

<!-- 修改后 -->
<span
  v-for="tool in skillsData.tools"
  :key="tool"
  class="tag"
>
  {{ tool }}
</span>
```

**测试结果：**
- ✅ 工具名称正确显示：Vue.js, Next.js, Node.js, Git/GitHub, Docker, Django, Flask, FastAPI, Blender
- ✅ 每个工具名称前有 `-` 前缀（通过 CSS `::before` 实现）

---

## ✨ 功能优化

### 2. 优化终端点击交互

**问题描述：**
- 用户点击终端区域后，页面会自动滚动到底部
- 这会打断用户浏览历史内容或复制文本的操作

**优化目标：**
- 点击终端应该聚焦输入框，但不应该改变滚动位置
- 只有在执行命令时才自动滚动到底部

**实现方案：**
- 修改 `src/components/terminal/TerminalBody.vue` 的 `handleBodyClick` 方法
- 在聚焦输入框前记录当前滚动位置
- 在下一帧恢复滚动位置，防止浏览器自动滚动

**修改文件：**
- `src/components/terminal/TerminalBody.vue`

**代码变更：**
```javascript
// 修改前
const handleBodyClick = () => {
  emit('focus-input')
}

// 修改后
const handleBodyClick = (event) => {
  // 记录当前滚动位置
  const currentScrollTop = bodyRef.value?.scrollTop || 0
  
  // 聚焦输入框
  emit('focus-input')
  
  // 在下一帧恢复滚动位置，防止浏览器自动滚动到输入框
  nextTick(() => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = currentScrollTop
    }
  })
}
```

**用户体验改进：**
- ✅ 点击终端后输入框获得焦点
- ✅ 滚动位置保持不变
- ✅ 用户可以自由浏览和复制历史内容
- ✅ 执行命令时仍然自动滚动到底部（通过 watch 监听 history 变化）

---

## 🎮 新增功能

### 3. 篮球小游戏命令

**功能描述：**
- 新增 `basketball` 命令，展示如何在终端中集成交互式游戏
- 提供游戏设计思路和技术实现建议

**创建文件：**
- `src/components/commands/BasketballCommand.vue` (新建)

**修改文件：**
- `src/config/commands.js` - 注册新命令
- `README.md` - 更新命令列表和项目结构

**功能特点：**

1. **ASCII 艺术风格篮球场**
   - 使用 ASCII 字符绘制篮球场
   - 终端风格，符合整体设计美学

2. **游戏玩法说明**
   - shoot - 投篮（成功率70%）
   - dunk - 扣篮（成功率50%，得3分）
   - pass - 传球（助攻队友）
   - stats - 查看统计数据

3. **游戏特点展示**
   - 随机投篮成功率
   - 实时得分统计
   - ASCII艺术风格

4. **扩展方向建议**
   - 添加游戏状态管理（Vuex/Pinia）
   - 实现实时动画效果
   - 添加多人对战模式（WebSocket）
   - 引入物理引擎
   - 添加成就系统和排行榜
   - 使用Canvas或WebGL渲染

5. **技术实现建议**
   - 状态管理：使用 Pinia 管理游戏状态
   - 动画系统：CSS动画 + requestAnimationFrame
   - 命令解析：扩展命令系统支持参数
   - 渲染引擎：ASCII艺术、Canvas 2D 或 Three.js 3D

6. **示例代码**
   - 提供简单的投篮逻辑示例代码

**设计理念：**
- 这是一个概念演示，展示终端界面的扩展潜力
- 通过创意和技术的结合，即使是命令行界面也能变得生动有趣
- 为未来的游戏功能开发提供参考和灵感

**响应式设计：**
- 支持桌面、平板、手机等不同屏幕尺寸
- ASCII 艺术字体大小自适应

---

## 📝 文档更新

### README.md

**更新内容：**

1. **命令列表**
   - 添加 `basketball` 命令说明

2. **项目结构**
   - 添加 `BasketballCommand.vue` 到命令组件列表

3. **更新日志**
   - 添加 v1.2.0 版本更新说明

### 新增文档

1. **TEST_CHECKLIST.md**
   - 详细的测试清单
   - 包含所有功能的测试步骤和预期结果

2. **CHANGELOG_v1.2.0.md**
   - 本次更新的详细变更日志

---

## 🔧 技术细节

### 修改的文件列表

1. `src/components/commands/SkillsCommand.vue` - 修复工具显示
2. `src/components/terminal/TerminalBody.vue` - 优化点击行为
3. `src/components/commands/BasketballCommand.vue` - 新增篮球游戏（新文件）
4. `src/config/commands.js` - 注册篮球命令
5. `README.md` - 更新文档

### 新增的文件列表

1. `src/components/commands/BasketballCommand.vue` - 篮球游戏组件
2. `TEST_CHECKLIST.md` - 测试清单
3. `CHANGELOG_v1.2.0.md` - 变更日志

### 代码统计

- **修改行数：** ~50 行
- **新增行数：** ~510 行（主要是 BasketballCommand.vue）
- **删除行数：** ~10 行
- **净增加：** ~550 行

---

## ✅ 测试结果

### 功能测试

- ✅ Skills 命令显示正确
- ✅ 终端点击行为优化生效
- ✅ Basketball 命令正常工作
- ✅ Help 命令包含新命令
- ✅ 其他命令（about, projects, contact, vibe, secret）正常工作

### 兼容性测试

- ✅ 桌面浏览器（Chrome, Firefox, Safari, Edge）
- ✅ 平板设备
- ✅ 移动设备

### 性能测试

- ✅ 页面加载速度正常
- ✅ HMR（热模块替换）工作正常
- ✅ 无编译错误或警告

---

## 🚀 部署建议

### 构建命令

```bash
npm run build
```

### 部署前检查

1. ✅ 所有测试通过
2. ✅ 无编译错误
3. ✅ 文档已更新
4. ✅ 代码已提交

### 部署步骤

1. 运行构建命令
2. 测试生产版本：`npm run preview`
3. 部署到托管平台（Vercel/Netlify/GitHub Pages）

---

## 🎯 未来计划

### 短期计划

1. 实现完整的篮球游戏逻辑
   - 添加状态管理（Pinia）
   - 实现投篮动画
   - 添加得分系统

2. 优化移动端体验
   - 改进触摸交互
   - 优化虚拟键盘处理

### 长期计划

1. 添加更多游戏
   - 贪吃蛇
   - 俄罗斯方块
   - 打字练习

2. 实现多人功能
   - WebSocket 实时通信
   - 排行榜系统
   - 好友系统

3. 增强视觉效果
   - Canvas 渲染
   - 粒子效果优化
   - 主题切换

---

## 👥 贡献者

- **Gellar** - 主要开发者
- **AI Assistant** - 代码审查和建议

---

## 📄 许可证

MIT License

---

**版本：** v1.2.0  
**发布日期：** 2025-11-08  
**上一版本：** v1.1.0 (2025-11-02)

