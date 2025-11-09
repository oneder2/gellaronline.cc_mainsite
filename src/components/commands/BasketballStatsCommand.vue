<!--
  BasketballStatsCommand.vue
  
  篮球游戏统计命令组件
  显示详细的游戏统计数据
  
  功能：
  - 显示得分、命中率等统计
  - 显示游戏历史记录
  - 显示最高连击记录
  
  @component
-->
<template>
  <div class="basketball-stats">
    <h3 class="stats-title">[#] 篮球游戏统计</h3>

    <!-- 如果游戏还没开始 -->
    <div v-if="!gameStarted" class="no-data">
      <p>还没有开始游戏！输入 <span class="cmd">basketball shoot</span> 开始游戏。</p>
    </div>

    <!-- 游戏统计 -->
    <div v-else class="stats-container">
      <!-- 总体统计 -->
      <div class="stats-section">
        <h4 class="section-title">[+] 总体数据</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">总得分</span>
            <span class="stat-value highlight">{{ score }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">总命中率</span>
            <span class="stat-value" :class="getPercentageClass(totalPercentage)">
              {{ totalPercentage }}%
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">当前连击</span>
            <span class="stat-value" :class="streak > 0 ? 'hot' : ''">{{ streak }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">最高连击</span>
            <span class="stat-value highlight">{{ maxStreak }}</span>
          </div>
        </div>
      </div>
      
      <!-- 投篮统计 -->
      <div class="stats-section">
        <h4 class="section-title">[>] 投篮数据</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">投篮次数</span>
            <span class="stat-value">{{ shots }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">投篮命中</span>
            <span class="stat-value">{{ hits }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">投篮命中率</span>
            <span class="stat-value" :class="getPercentageClass(shootingPercentage)">
              {{ shootingPercentage }}%
            </span>
          </div>
        </div>
      </div>
      
      <!-- 扣篮统计 -->
      <div class="stats-section">
        <h4 class="section-title">[!] 扣篮数据</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">扣篮次数</span>
            <span class="stat-value">{{ dunks }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">扣篮成功</span>
            <span class="stat-value">{{ dunkHits }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">扣篮命中率</span>
            <span class="stat-value" :class="getPercentageClass(dunkPercentage)">
              {{ dunkPercentage }}%
            </span>
          </div>
        </div>
      </div>
      
      <!-- 传球统计 -->
      <div class="stats-section">
        <h4 class="section-title">[~] 传球数据</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">传球次数</span>
            <span class="stat-value">{{ passes }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">助攻次数</span>
            <span class="stat-value">{{ assists }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">助攻率</span>
            <span class="stat-value" :class="getPercentageClass(assistPercentage)">
              {{ assistPercentage }}%
            </span>
          </div>
        </div>
      </div>
      
      <!-- 最近记录 -->
      <div class="stats-section" v-if="history.length > 0">
        <h4 class="section-title">[=] 最近记录（最多显示10条）</h4>
        <div class="history-list">
          <div 
            v-for="(record, index) in history.slice(0, 10)" 
            :key="index"
            class="history-item"
          >
            <span class="history-time">{{ record.timestamp }}</span>
            <span class="history-action">{{ record.action }}</span>
            <span class="history-result">{{ record.result }}</span>
            <span class="history-points" v-if="record.points > 0">+{{ record.points }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBasketballStore } from '@/stores/basketball'

const basketballStore = useBasketballStore()

const {
  gameStarted,
  score,
  shots,
  hits,
  dunks,
  dunkHits,
  passes,
  assists,
  history,
  streak,
  maxStreak,
  shootingPercentage,
  dunkPercentage,
  assistPercentage,
  totalPercentage
} = basketballStore

const getPercentageClass = (percentage) => {
  if (percentage >= 70) return 'excellent'
  if (percentage >= 50) return 'good'
  if (percentage >= 30) return 'average'
  return 'poor'
}
</script>

<style scoped>
.basketball-stats {
  padding: 1rem 0;
}

.stats-title {
  color: var(--text-primary);
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.no-data {
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
  background: rgba(0, 255, 136, 0.05);
  border-radius: 8px;
}

.no-data .cmd {
  color: var(--accent);
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.stats-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats-section {
  border-left: 2px solid var(--border);
  padding: 0.5rem 0;
  padding-left: 1rem;
  margin-bottom: 1rem;
}

.section-title {
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.stat-value {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
}

.stat-value.highlight {
  color: var(--accent);
}

.stat-value.hot {
  color: #ff6b35;
  animation: pulse 1s infinite;
}

.stat-value.excellent {
  color: #00ff88;
}

.stat-value.good {
  color: #4ecdc4;
}

.stat-value.average {
  color: #ffe66d;
}

.stat-value.poor {
  color: #ff6464;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: grid;
  grid-template-columns: 80px 60px 1fr auto;
  gap: 1rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;
  align-items: center;
}

.history-item:last-child {
  border-bottom: none;
}

.history-time {
  color: var(--text-muted);
  font-family: 'Courier New', monospace;
}

.history-action {
  color: var(--accent);
  font-weight: 600;
}

.history-result {
  color: var(--text-secondary);
}

.history-points {
  color: var(--accent);
  font-weight: 700;
  text-align: right;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .history-item {
    grid-template-columns: 70px 50px 1fr auto;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>
