<!--
  技能展示命令组件
  
  展示个人技能栈，包括：
  - 编程语言（带进度条）
  - 框架和工具（标签形式）
  - 特殊技能
  
  数据来源：src/config/skills.data.js
-->
<template>
  <div class="skills-section">
    <h3 class="section-title">
      <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
      技能树
    </h3>
    
    <!-- 编程语言 -->
    <div class="skill-category">
      <h4 class="category-title">编程语言</h4>
      <SkillBar
        v-for="skill in skillsData.programmingSkills"
        :key="skill.name"
        :name="skill.name"
        :level="skill.level"
      />
    </div>
    
    <!-- 框架和工具 -->
    <div class="skill-category">
      <h4 class="category-title">框架 & 工具</h4>
      <div class="skill-tags">
        <span
          v-for="tool in skillsData.tools"
          :key="tool"
          class="tag"
        >
          {{ tool }}
        </span>
      </div>
    </div>
    
    <!-- 特殊技能 -->
    <div class="skill-category">
      <h4 class="category-title">特殊技能</h4>
      <div
        v-for="skill in skillsData.specialSkills"
        :key="skill.name"
        class="special-skill"
      >
        <svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>{{ skill.name }} - {{ skill.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 技能展示命令组件
 * 
 * 使用 SkillBar 子组件展示技能进度
 * 数据从 skills.data.js 导入
 */
import { skillsData } from '@/config/skills.data'
import SkillBar from './SkillBar.vue'
</script>

<style scoped>
/**
 * 技能命令样式
 * 使用公共样式类，只定义特殊样式
 */

.skills-section {
  padding: 0.5rem 0;
}

/* 技能分类 */
.skill-category {
  margin-bottom: 1.2rem;
}

.category-title {
  color: var(--text-primary);
  font-size: 0.95rem;
  margin-bottom: 0.6rem;
  font-weight: normal;
}

/* 技能标签 - 终端风格：简洁 */
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  color: var(--text-secondary);
  padding: 0;
  font-size: 0.9rem;
}

.tag::before {
  content: '- ';
  color: var(--text-primary);
}

/* 特殊技能 - 终端风格：简洁 */
.special-skill {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  color: var(--text-secondary);
  margin: 0.4rem 0;
  padding: 0;
  line-height: 1.6;
}

.skill-icon {
  width: 0.8rem;
  height: 0.8rem;
  color: var(--text-primary);
  stroke-width: 2;
  fill: none;
  flex-shrink: 0;
  margin-top: 0.3rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-title {
    font-size: 1.1rem;
  }
  
  .category-title {
    font-size: 0.95rem;
  }
  
  .tag {
    font-size: 0.85rem;
    padding: 0.25rem 0.6rem;
  }
  
  .special-skill {
    font-size: 0.9rem;
  }
}
</style>

