<!--
  AboutCommand.vue
  
  关于我命令组件
  显示个人信息和状态
  
  功能：
  - 显示身份信息
  - 显示爱好和理念
  - 显示在线状态
  - 显示个人格言
-->

<template>
  <div class="about-section">
    <h3 class="section-title">
      <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      关于我
    </h3>
    
    <div class="info-block">
      <p class="info-line">
        <span class="label">身份：</span>
        基于 vibe coding 的架构师、PM、页面设计师杂合体
      </p>
      <p class="info-line">
        <span class="label">爱好：</span>
        数字艺术创作 | 独立游戏开发 | 轻度科幻爱好者
      </p>
      <p class="info-line">
        <span class="label">理念：</span>
        代码是让产品回归人性的工具
      </p>
      <p class="info-line">
        <span class="label">状态：</span>
        <span class="status-online">
          <span class="status-dot"></span>
          ONLINE
        </span> 
        - 在线，至少10:00am~10:00pm(EST)，是在线的
      </p>
    </div>
    
    <p class="quote">
      <span class="quote-mark">"</span>
      回头审视过去的盲信，低头打造未来的锚定；做一个历史外的见证者，以及历史中基本无害的个人主义者
      <span class="quote-mark">"</span>
    </p>
  </div>
</template>

<script setup>
/**
 * AboutCommand 组件
 * 
 * 显示个人信息和状态
 * 纯展示组件，无需 props
 */
</script>

<style scoped>
/**
 * 关于我命令样式
 *
 * 使用公共样式类，只定义特殊样式
 */

.about-section {
  padding: 0.5rem 0;
}

.status-online {
  color: var(--accent);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 8px var(--accent);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.8);
  }
}

.quote {
  color: var(--text-muted);
  font-style: italic;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.03);
  border-radius: 4px;
  text-align: center;
  position: relative;
  line-height: 1.8;
}

.quote-mark {
  color: var(--accent);
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 0.5;
  font-style: normal;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .section-title {
    font-size: 1rem;
  }
  
  .info-block {
    padding: 0.8rem;
  }
  
  .info-line {
    font-size: 0.9rem;
  }
  
  .label {
    min-width: 3.5rem;
    font-size: 0.9rem;
  }
  
  .quote {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
}
</style>

