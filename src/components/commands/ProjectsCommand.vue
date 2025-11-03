<!--
  ProjectsCommand.vue
  
  项目展示命令组件
  显示个人项目列表
  
  功能：
  - 显示项目列表
  - 显示项目描述和技术栈
  - 支持项目编号
-->

<template>
  <div class="projects-section">
    <h3 class="section-title">
      <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      项目集
    </h3>
    
    <div 
      v-for="(project, index) in projects" 
      :key="index"
      class="project-item"
    >
      <h4 class="project-title">
        <span class="project-number">[ {{ index + 1 }} ]</span>
        {{ project.title }}
      </h4>
      <p class="project-desc">{{ project.description }}</p>
      <p class="project-tech">
        <span class="tech-label">技术栈:</span>
        {{ project.tech }}
      </p>
    </div>
    
    <p class="note">
      <svg class="note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      更多项目正在路上...
    </p>
  </div>
</template>

<script setup>
/**
 * ProjectsCommand 组件
 * 
 * 显示项目列表
 * 
 * TODO: 将项目数据提取到配置文件
 */

const projects = [
  {
    title: '个人作品集网站',
    description: '你现在正在浏览的这个终端风格网站',
    tech: 'Vue 3 + Vite'
  },
  {
    title: '数字艺术作品',
    description: '探索像素艺术与生成艺术的边界',
    tech: 'Krita / Photoshop / Adobe Illustrator / In Design / Premiere Pro / Processor'
  },
  {
    title: '独立游戏原型',
    description: '正在开发中的神秘项目...',
    tech: 'Unity / Godot'
  }
]
</script>

<style scoped>
/**
 * 项目展示命令样式
 * 
 * 设计说明：
 * - 使用卡片式布局
 * - 项目编号使用方括号
 * - 技术栈使用特殊标签
 */

.projects-section {
  padding: 0.5rem 0;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--accent);
  stroke-width: 2;
}

.project-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.05);
  border-left: 3px solid var(--accent);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.project-item:hover {
  background: rgba(0, 255, 136, 0.08);
  transform: translateX(5px);
}

.project-title {
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-number {
  color: var(--accent);
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.project-desc {
  color: var(--text-secondary);
  margin: 0.5rem 0;
  line-height: 1.6;
  padding-left: 1rem;
}

.project-tech {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  font-family: 'Courier New', monospace;
}

.tech-label {
  color: var(--accent);
  font-weight: 600;
}

.note {
  color: var(--text-muted);
  font-style: italic;
  margin-top: 1rem;
  padding: 0.5rem;
  background: rgba(0, 255, 136, 0.03);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.note-icon {
  width: 1rem;
  height: 1rem;
  color: var(--accent);
  stroke-width: 2;
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .section-title {
    font-size: 1rem;
  }
  
  .project-item {
    padding: 0.8rem;
  }
  
  .project-title {
    font-size: 0.95rem;
  }
  
  .project-desc {
    font-size: 0.9rem;
  }
  
  .project-tech {
    font-size: 0.85rem;
  }
  
  .note {
    font-size: 0.85rem;
  }
}
</style>

