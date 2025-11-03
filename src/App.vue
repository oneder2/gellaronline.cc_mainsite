<!--
  App.vue - 应用主组件

  这是Vue应用的根组件，包含：
  - 背景粒子效果
  - Terminal终端组件
  - 页脚信息

  整体采用终端风格的赛博朋克美学
-->

<script setup>
import { onMounted, ref } from 'vue'
import Terminal from './components/Terminal.vue'

/**
 * 粒子效果相关
 * 在背景中创建随机移动的粒子，增加视觉趣味性
 */
const particles = ref([])

// 生成随机粒子 - 增强版
const generateParticles = () => {
  const particleCount = 80  // 增加粒子数量
  particles.value = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,  // 增大粒子尺寸
    duration: Math.random() * 15 + 8,  // 加快动画速度
    delay: Math.random() * 3
  }))
}

onMounted(() => {
  generateParticles()
})
</script>

<template>
  <div class="app-container">
    <!-- 背景粒子效果 -->
    <div class="particles-container">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          width: particle.size + 'px',
          height: particle.size + 'px',
          animationDuration: particle.duration + 's',
          animationDelay: particle.delay + 's'
        }"
      ></div>
    </div>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 终端组件 -->
      <Terminal />

      <!-- 页脚信息 -->
      <footer class="footer">
        <p class="footer-text">
          <span class="footer-icon">⚡</span>
          Powered by Vibe Coding
          <span class="footer-icon">⚡</span>
        </p>
        <p class="footer-hint">
          提示：点击终端输入框开始探索
        </p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
/**
 * App组件样式
 *
 * 包含：
 * - 整体布局
 * - 粒子动画效果
 * - 页脚样式
 */

.app-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

/* 粒子容器 */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* 单个粒子样式 - 增强版 */
.particle {
  position: absolute;
  background: var(--text-primary);
  border-radius: 50%;
  opacity: 0.6;  /* 增加不透明度 */
  animation: float infinite ease-in-out;
  box-shadow: 0 0 20px var(--text-primary), 0 0 40px var(--text-primary);  /* 增强发光效果 */
}

/* 粒子浮动动画 - 增强版 */
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  25% {
    transform: translate(20px, -20px) scale(1.5);  /* 增大移动范围和缩放 */
    opacity: 0.8;
  }
  50% {
    transform: translate(-20px, 20px) scale(0.7);
    opacity: 0.4;
  }
  75% {
    transform: translate(-25px, -10px) scale(1.3);
    opacity: 0.7;
  }
}

/* 主内容区域 */
.main-content {
  position: relative;
  z-index: 2;
  padding: 10px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 页脚样式 */
.footer {
  text-align: center;
  margin-top: 0px;
  padding: 20px;
  color: var(--text-muted);
}

.footer-text {
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.footer-icon {
  color: var(--text-secondary);
  animation: pulse 2s infinite;
}

.footer-hint {
  font-size: 12px;
  opacity: 0.7;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }

  .footer {
    margin-top: 10px;
    padding: 15px;
  }

  .footer-text {
    font-size: 12px;
  }

  .footer-hint {
    font-size: 11px;
  }

  /* 移动端减少粒子数量（通过降低不透明度） */
  .particle:nth-child(n+26) {
    display: none;
  }
}
</style>
