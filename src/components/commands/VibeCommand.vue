<!--
  VibeCommand.vue
  
  Vibe Coding 哲学命令组件
  展示编程哲学和原则
  
  功能：
  - 显示 Vibe Coding 理念
  - 展示核心原则
  - 使用诗意的排版
-->

<template>
  <div class="vibe-section">
    <h3 class="section-title">
      <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      Vibe Coding 哲学
    </h3>
    
    <div class="philosophy">
      <p 
        v-for="(line, index) in philosophyLines" 
        :key="index"
        class="philosophy-text"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        {{ line }}
      </p>
    </div>
    
    <div class="vibe-principles">
      <div 
        v-for="(principle, index) in principles" 
        :key="index"
        class="principle-item"
      >
        <svg class="principle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        {{ principle }}
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * VibeCommand 组件
 * 
 * 展示 Vibe Coding 编程哲学
 * 使用动画效果增强视觉体验
 */

const philosophyLines = [
  '找需求，做调研，进行成本预估',
  '选框架，写文档，确保产品具备竞争力和可行性',
  '提前划定功能实现标准，划定测试标准，做好项目结构维护',
  '使用vibe coding agent进行MVP超展开，时刻监控框架复杂度与实际需求的联系',
  '基于MVP加feature，时常提交commit备份，直到最终完成'
]

const principles = [
  '亲爱的Augment给我写了一堆酸词，只能说大部分都是扯淡',
  '开发听上去的确是一个浪漫的事请，但是一旦与现实接轨，尤其是在维护语境下，就需要更严谨的限制',
  '本质上是要时刻作为一个产品经理，同时思考项目的方方面面，权衡成本、风险、与收益',
  '当然一旦熟悉了整个流程，的确也会变得得心应手和心流'
]
</script>

<style scoped>
/**
 * Vibe Coding 哲学样式
 * 
 * 设计说明：
 * - 使用诗意的排版
 * - 渐入动画效果
 * - 柔和的配色
 */

.vibe-section {
  padding: 0.5rem 0;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
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
  fill: var(--accent);
  opacity: 0.3;
}

.philosophy {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 136, 0.05) 0%,
    rgba(0, 255, 136, 0.02) 100%
  );
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 136, 0.2);
  text-align: center;
}

.philosophy-text {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 2;
  margin: 0.5rem 0;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  font-style: italic;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.vibe-principles {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.03);
  border-radius: 4px;
}

.principle-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--text-secondary);
  margin: 0.8rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.principle-item:hover {
  background: rgba(0, 255, 136, 0.08);
  transform: translateX(5px);
  color: var(--text-primary);
}

.principle-icon {
  width: 1rem;
  height: 1rem;
  color: var(--accent);
  stroke-width: 3;
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .section-title {
    font-size: 1rem;
  }
  
  .philosophy {
    padding: 1rem;
  }
  
  .philosophy-text {
    font-size: 0.9rem;
    line-height: 1.8;
  }
  
  .principle-item {
    font-size: 0.9rem;
  }
}
</style>

