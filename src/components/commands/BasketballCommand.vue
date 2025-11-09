<!--
  BasketballCommand.vue
  
  篮球游戏命令组件 - 可玩版本
  在终端中实现一个真正可玩的篮球游戏
  
  功能：
  - 显示篮球场和实时游戏状态
  - 处理游戏子命令（shoot, dunk, pass, stats, reset）
  - 实时显示得分、命中率等统计
  - 连击系统和动画效果
  
  使用方法：
  - basketball shoot - 投篮（2分，基础命中率70%）
  - basketball dunk - 扣篮（3分，基础命中率50%）
  - basketball pass - 传球（可能助攻得1分）
  - basketball stats - 查看详细统计
  - basketball reset - 重置游戏
  
  @component
-->
<template>
  <div class="basketball-game">
    <!-- 游戏标题和状态 -->
    <div class="game-header">
      <h2 class="game-title">[*] 终端篮球游戏</h2>
      <div class="game-status">
        <span class="status-item">得分: <strong>{{ score }}</strong></span>
        <span class="status-item" v-if="streak > 0">>>> 连击: <strong>{{ streak }}</strong></span>
        <span class="status-item" v-if="gameStarted">命中率: <strong>{{ totalPercentage }}%</strong></span>
      </div>
    </div>

    <!-- 篮球场 ASCII 艺术 -->
    <div class="basketball-court">
      <pre class="court-art">{{ courtArt }}</pre>
    </div>

    <!-- 最近动作结果（带动画） -->
    <div v-if="lastAction" class="action-result" :class="lastAction.success ? 'success' : 'fail'">
      {{ lastAction.message }}
    </div>

    <!-- 游戏说明 -->
    <div class="game-instructions">
      <h4 class="section-title">[>] 可用命令</h4>
      <div class="command-list">
        <div class="command-item">
          <span class="cmd">basketball shoot</span>
          <span class="desc">- 投篮（2分，基础命中率70%）</span>
        </div>
        <div class="command-item">
          <span class="cmd">basketball dunk</span>
          <span class="desc">- 扣篮（3分，基础命中率50%，难度更高）</span>
        </div>
        <div class="command-item">
          <span class="cmd">basketball pass</span>
          <span class="desc">- 传球（可能助攻得1分）</span>
        </div>
        <div class="command-item">
          <span class="cmd">basketball stats</span>
          <span class="desc">- 查看详细统计数据</span>
        </div>
        <div class="command-item">
          <span class="cmd">basketball reset</span>
          <span class="desc">- 重置游戏</span>
        </div>
      </div>
    </div>

    <!-- 游戏提示 -->
    <div class="game-tips">
      <p class="tip">💡 提示：连续命中会提高命中率！保持手感！</p>
      <p class="tip">💡 扣篮难度更高，但得分更多，成功后连击+2！</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBasketballStore } from '@/stores/basketball'

const basketballStore = useBasketballStore()

const {
  gameStarted,
  score,
  streak,
  totalPercentage
} = basketballStore

const lastAction = ref(null)

const courtArt = computed(() => {
  return `
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║           ┌─────────┐                ║
    ║           │    (*)  │                ║
    ║           └─────────┘                ║
    ║               │                      ║
    ║               │                      ║
    ║          ┌────┴────┐                 ║
    ║          │         │                 ║
    ║          │    [P]  │                 ║
    ║          └─────────┘                 ║
    ║                                       ║
    ║  得分: ${score.toString().padStart(3, ' ')}     连击: ${streak.toString().padStart(2, ' ')}          ║
    ║                                       ║
    ║  ═══════════════════════════════════  ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
  `
})

onMounted(() => {
  if (!gameStarted.value) {
    lastAction.value = {
      success: true,
      message: '[*] 欢迎来到终端篮球场！输入命令开始游戏！'
    }
  }
})
</script>

<style scoped>
.basketball-game {
  padding: 1rem 0;
}

.game-header {
  margin-bottom: 1.5rem;
}

.game-title {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.game-status {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.status-item {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.status-item strong {
  color: var(--accent);
  font-size: 1.1rem;
}

.basketball-court {
  margin: 1.5rem 0;
  border: 1px solid var(--border);
  padding: 1rem;
  overflow-x: auto;
}

.court-art {
  color: var(--accent);
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.2;
  margin: 0;
  white-space: pre;
}

.action-result {
  padding: 0.5rem 0;
  margin: 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  border-left: 2px solid var(--border);
  padding-left: 1rem;
  animation: slideIn 0.3s ease-out;
}

.action-result.success {
  border-left-color: var(--accent);
  color: var(--accent);
}

.action-result.fail {
  border-left-color: #ff6464;
  color: #ff6464;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.game-instructions {
  margin: 1.5rem 0;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.command-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.command-item {
  color: var(--text-secondary);
  padding-left: 1rem;
  line-height: 1.6;
}

.cmd {
  color: var(--accent);
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.desc {
  color: var(--text-muted);
}

.game-tips {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 136, 0.05);
  border-left: 3px solid var(--accent);
  border-radius: 4px;
}

.tip {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0.5rem 0;
  font-style: italic;
}

@media (max-width: 768px) {
  .court-art {
    font-size: 0.7rem;
  }
  
  .game-status {
    gap: 1rem;
  }
}
</style>
