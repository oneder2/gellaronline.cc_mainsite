<!--
  SkillBar.vue
  
  技能进度条组件
  用于显示单个技能的名称和熟练度
  
  Props:
  - name: 技能名称
  - level: 熟练度（0-100）
  - tags: 可选的标签数组
-->

<template>
  <div class="skill-bar">
    <div class="skill-header">
      <span class="skill-name">{{ name }}</span>
      <span class="skill-level">{{ level }}%</span>
    </div>
    <div class="bar">
      <div 
        class="fill" 
        :style="{ width: level + '%' }"
      ></div>
    </div>
    <div v-if="tags && tags.length" class="skill-tags">
      <span 
        v-for="tag in tags" 
        :key="tag"
        class="mini-tag"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
/**
 * SkillBar 组件
 * 
 * 显示技能进度条
 * 支持可选的标签显示
 */

defineProps({
  /**
   * 技能名称
   */
  name: {
    type: String,
    required: true
  },
  
  /**
   * 熟练度（0-100）
   */
  level: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  
  /**
   * 可选的标签数组
   */
  tags: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
/**
 * 技能进度条样式 - 终端风格
 *
 * 简化设计，保留核心功能
 */

.skill-bar {
  margin-bottom: 0.6rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}

.skill-name {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: normal;
}

.skill-level {
  color: var(--text-primary);
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  font-weight: normal;
}

.bar {
  width: 100%;
  height: 4px;
  background: var(--bg-primary);
  overflow: hidden;
  position: relative;
}

.fill {
  height: 100%;
  background: var(--text-primary);
  transition: width 0.8s ease-out;
  position: relative;
}

/* 标签样式 */
.skill-tags {
  display: none;
}

.mini-tag {
  display: none;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .skill-name {
    font-size: 0.9rem;
  }
  
  .skill-level {
    font-size: 0.8rem;
  }
  
  .bar {
    height: 6px;
  }
  
  .mini-tag {
    font-size: 0.7rem;
  }
}
</style>

