<!--
  SecretCommand.vue
  
  隐藏彩蛋命令组件
  显示隐藏的惊喜内容
  
  功能：
  - 显示祝贺信息
  - 展示 ASCII 艺术
  - 提供惊喜体验
-->

<template>
  <div class="secret-section">
    <h3 class="section-title">
      <svg class="title-icon celebration" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
      </svg>
      你发现了隐藏命令！
      <svg class="title-icon celebration" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
      </svg>
    </h3>
    
    <div class="secret-content">
      <p class="secret-text congratulations">恭喜你的好奇心！</p>
      <p class="secret-text">这里是一个小彩蛋</p>
      
      <pre class="secret-code">
    ⠀⠀⠀⠀⠀⢀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠰⡿⠿⠛⠛⠻⠿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣀⣄⡀⠀⠀⠀⠀⢀⣀⣀⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⢸⣿⣿⣷⠀⠀⠀⠀⠛⠛⣿⣿⣿⡛⠿⠷⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠘⠿⠿⠋⠀⠀⠀⠀⠀⠀⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

    Keep coding, keep vibing!
      </pre>
      
      <div class="secret-message">
        <svg class="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <p>如果你在网站里看到了什么心灵鸡汤式的文案，那是Augment留下的遗产，我没发现</p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * SecretCommand 组件
 * 
 * 隐藏彩蛋命令
 * 为好奇的用户提供惊喜
 */
</script>

<style scoped>
/**
 * 隐藏命令样式
 * 
 * 设计说明：
 * - 使用庆祝性的动画
 * - ASCII 艺术展示
 * - 特殊的配色和效果
 */

.secret-section {
  padding: 0.5rem 0;
}

.section-title {
  color: var(--accent);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  animation: titlePulse 2s ease-in-out infinite;
}

@keyframes titlePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.title-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--accent);
  stroke-width: 2;
}

.celebration {
  fill: var(--accent);
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.secret-content {
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 136, 0.1) 0%,
    rgba(0, 255, 136, 0.05) 100%
  );
  border-radius: 8px;
  border: 2px solid var(--accent);
  text-align: center;
}

.secret-text {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin: 0.8rem 0;
  animation: fadeIn 1s ease-out;
}

.congratulations {
  color: var(--accent);
  font-weight: 600;
  font-size: 1.2rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.secret-code {
  color: var(--accent);
  font-family: monospace;
  font-size: 0.8rem;
  line-height: 1.2;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow-x: auto;
  animation: codeGlow 3s ease-in-out infinite;
}

@keyframes codeGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
  }
}

.secret-message {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.05);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.message-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--accent);
  stroke-width: 2;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.secret-message p {
  color: var(--text-secondary);
  font-style: italic;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .section-title {
    font-size: 1rem;
    flex-wrap: wrap;
  }
  
  .secret-content {
    padding: 1rem;
  }
  
  .secret-text {
    font-size: 1rem;
  }
  
  .congratulations {
    font-size: 1.1rem;
  }
  
  .secret-code {
    font-size: 0.7rem;
    padding: 0.8rem;
  }
  
  .secret-message {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .secret-message p {
    font-size: 0.9rem;
  }
}
</style>

