<!--
  ContactCommand.vue
  
  联系方式命令组件
  显示各种联系方式
  
  功能：
  - 显示邮箱、GitHub等联系方式
  - 使用SVG图标替代emoji
  - 提供修改提示
-->

<template>
  <div class="contact-section">
    <h3 class="section-title">
      <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
      联系方式
    </h3>
    
    <div class="contact-info">
      <div class="contact-line">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <span class="contact-label">Email:</span>
        <span class="contact-value">gellar0703@gmail.com</span>
      </div>
      
      <div class="contact-line">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        <span class="contact-label">GitHub:</span>
        <span class="contact-value">@oneder2</span>
      </div>
      
      <div class="contact-line">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span class="contact-label">Art Portfolio:</span>
        <span class="contact-value coming-soon">coming soon...</span>
      </div>
      
      <div class="contact-line">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="contact-label">Discord:</span>
        <span class="contact-value">gellar#0000</span>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * ContactCommand 组件
 * 
 * 显示联系方式
 * 使用 SVG 图标替代 emoji
 * 
 * TODO: 将联系方式数据提取到配置文件
 */
</script>

<style scoped>
/**
 * 联系方式命令样式
 * 
 * 设计说明：
 * - 使用 SVG 图标
 * - 清晰的标签和值分离
 * - 悬停效果
 */

.contact-section {
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

.contact-info {
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.05);
  border-left: 3px solid var(--accent);
  border-radius: 4px;
}

.contact-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.8rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.contact-line:hover {
  background: rgba(0, 255, 136, 0.08);
  transform: translateX(5px);
}

.contact-icon {
  width: 1rem;
  height: 1rem;
  color: var(--accent);
  stroke-width: 2;
  flex-shrink: 0;
}

.contact-label {
  color: var(--accent);
  font-weight: 600;
  min-width: 7rem;
}

.contact-value {
  color: var(--text-primary);
  font-family: 'Courier New', monospace;
}

.coming-soon {
  color: var(--text-muted);
  font-style: italic;
}

.note {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.8rem;
  background: rgba(255, 136, 0, 0.1);
  border-left: 3px solid rgba(255, 136, 0, 0.5);
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.6;
}

.note-icon {
  width: 1rem;
  height: 1rem;
  color: rgba(255, 136, 0, 0.8);
  stroke-width: 2;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .section-title {
    font-size: 1rem;
  }
  
  .contact-info {
    padding: 0.8rem;
  }
  
  .contact-line {
    flex-wrap: wrap;
    font-size: 0.9rem;
  }
  
  .contact-label {
    min-width: 5rem;
    font-size: 0.9rem;
  }
  
  .contact-value {
    font-size: 0.85rem;
  }
  
  .note {
    font-size: 0.85rem;
    padding: 0.6rem;
  }
}
</style>

