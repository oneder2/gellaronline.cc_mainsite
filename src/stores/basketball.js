/**
 * basketball.js
 * 
 * 篮球游戏状态管理
 * 使用 Pinia 管理游戏状态、得分、统计等数据
 * 
 * 功能：
 * - 游戏状态管理（进行中、暂停、结束）
 * - 得分统计
 * - 投篮记录
 * - 游戏历史
 * 
 * @store
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 篮球游戏 Store
 */
export const useBasketballStore = defineStore('basketball', () => {
  // ==================== 状态定义 ====================
  
  /**
   * 游戏是否已开始
   */
  const gameStarted = ref(false)
  
  /**
   * 当前得分
   */
  const score = ref(0)
  
  /**
   * 投篮次数
   */
  const shots = ref(0)
  
  /**
   * 命中次数
   */
  const hits = ref(0)
  
  /**
   * 扣篮次数
   */
  const dunks = ref(0)
  
  /**
   * 扣篮成功次数
   */
  const dunkHits = ref(0)
  
  /**
   * 传球次数
   */
  const passes = ref(0)
  
  /**
   * 助攻次数
   */
  const assists = ref(0)
  
  /**
   * 游戏历史记录
   * 每条记录包含：时间、动作、结果、得分
   */
  const history = ref([])
  
  /**
   * 连续命中次数（用于连击奖励）
   */
  const streak = ref(0)
  
  /**
   * 最高连击记录
   */
  const maxStreak = ref(0)
  
  // ==================== 计算属性 ====================
  
  /**
   * 投篮命中率
   */
  const shootingPercentage = computed(() => {
    if (shots.value === 0) return 0
    return Math.round((hits.value / shots.value) * 100)
  })
  
  /**
   * 扣篮命中率
   */
  const dunkPercentage = computed(() => {
    if (dunks.value === 0) return 0
    return Math.round((dunkHits.value / dunks.value) * 100)
  })
  
  /**
   * 助攻率
   */
  const assistPercentage = computed(() => {
    if (passes.value === 0) return 0
    return Math.round((assists.value / passes.value) * 100)
  })
  
  /**
   * 总投篮次数（包括普通投篮和扣篮）
   */
  const totalShots = computed(() => {
    return shots.value + dunks.value
  })
  
  /**
   * 总命中次数
   */
  const totalHits = computed(() => {
    return hits.value + dunkHits.value
  })
  
  /**
   * 总命中率
   */
  const totalPercentage = computed(() => {
    if (totalShots.value === 0) return 0
    return Math.round((totalHits.value / totalShots.value) * 100)
  })
  
  // ==================== 游戏动作 ====================
  
  /**
   * 开始游戏
   */
  const startGame = () => {
    gameStarted.value = true
    addHistory('游戏开始', '开始新的篮球游戏', 0)
  }
  
  /**
   * 投篮
   * @returns {Object} 投篮结果 { success: boolean, points: number, message: string }
   */
  const shoot = () => {
    if (!gameStarted.value) {
      startGame()
    }
    
    shots.value++
    
    // 基础命中率 70%，连击会提高命中率
    const baseRate = 0.7
    const streakBonus = Math.min(streak.value * 0.02, 0.2) // 最多+20%
    const successRate = baseRate + streakBonus
    
    const success = Math.random() < successRate
    
    if (success) {
      hits.value++
      const points = 2
      score.value += points
      streak.value++
      
      // 更新最高连击
      if (streak.value > maxStreak.value) {
        maxStreak.value = streak.value
      }
      
      const message = streak.value >= 3
        ? `>>> 投篮命中！+${points}分 [${streak.value}连击!]`
        : `[+] 投篮命中！+${points}分`
      
      addHistory('投篮', message, points)
      
      return { success: true, points, message, streak: streak.value }
    } else {
      streak.value = 0
      const message = '[X] 投篮偏出！'
      addHistory('投篮', message, 0)

      return { success: false, points: 0, message, streak: 0 }
    }
  }
  
  /**
   * 扣篮
   * @returns {Object} 扣篮结果
   */
  const dunk = () => {
    if (!gameStarted.value) {
      startGame()
    }
    
    dunks.value++
    
    // 扣篮难度更高，基础命中率 50%
    const baseRate = 0.5
    const streakBonus = Math.min(streak.value * 0.03, 0.25) // 最多+25%
    const successRate = baseRate + streakBonus
    
    const success = Math.random() < successRate
    
    if (success) {
      dunkHits.value++
      const points = 3 // 扣篮得3分
      score.value += points
      streak.value += 2 // 扣篮成功连击+2
      
      if (streak.value > maxStreak.value) {
        maxStreak.value = streak.value
      }
      
      const message = streak.value >= 5
        ? `>>>>> 扣篮成功！+${points}分 [${streak.value}连击! 火热手感!]`
        : `[!] 扣篮成功！+${points}分`
      
      addHistory('扣篮', message, points)
      
      return { success: true, points, message, streak: streak.value }
    } else {
      streak.value = 0
      const message = '[X] 扣篮失败！被防守了！'
      addHistory('扣篮', message, 0)

      return { success: false, points: 0, message, streak: 0 }
    }
  }
  
  /**
   * 传球
   * @returns {Object} 传球结果
   */
  const pass = () => {
    if (!gameStarted.value) {
      startGame()
    }
    
    passes.value++
    
    // 传球成功率 80%
    const success = Math.random() < 0.8
    
    if (success) {
      // 50% 概率形成助攻
      const isAssist = Math.random() < 0.5
      
      if (isAssist) {
        assists.value++
        const points = 1 // 助攻得1分
        score.value += points

        const message = '[~] 传球成功！队友得分，助攻+1！'
        addHistory('传球', message, points)

        return { success: true, assist: true, points, message }
      } else {
        const message = '[+] 传球成功！'
        addHistory('传球', message, 0)

        return { success: true, assist: false, points: 0, message }
      }
    } else {
      const message = '[X] 传球失误！被抢断了！'
      addHistory('传球', message, 0)

      return { success: false, assist: false, points: 0, message }
    }
  }
  
  /**
   * 添加历史记录
   * @param {string} action - 动作类型
   * @param {string} result - 结果描述
   * @param {number} points - 得分
   */
  const addHistory = (action, result, points) => {
    const timestamp = new Date().toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
    
    history.value.unshift({
      timestamp,
      action,
      result,
      points,
      totalScore: score.value
    })
    
    // 只保留最近50条记录
    if (history.value.length > 50) {
      history.value = history.value.slice(0, 50)
    }
  }
  
  /**
   * 重置游戏
   */
  const resetGame = () => {
    gameStarted.value = false
    score.value = 0
    shots.value = 0
    hits.value = 0
    dunks.value = 0
    dunkHits.value = 0
    passes.value = 0
    assists.value = 0
    history.value = []
    streak.value = 0
    maxStreak.value = 0
  }
  
  // ==================== 导出 ====================
  
  return {
    // 状态
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
    
    // 计算属性
    shootingPercentage,
    dunkPercentage,
    assistPercentage,
    totalShots,
    totalHits,
    totalPercentage,
    
    // 方法
    startGame,
    shoot,
    dunk,
    pass,
    resetGame
  }
})

