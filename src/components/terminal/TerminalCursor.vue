<!--
  TerminalCursor.vue - 自定义光标组件
  
  显示一个跟随输入位置的自定义光标
  替代浏览器默认的光标，提供更好的视觉效果
  
  特性：
  - 闪烁动画
  - 平滑的位置过渡
  - 像素级精确定位
-->

<template>
  <span class="cursor" :style="{ left: position + 'px' }"></span>
</template>

<script setup>
/**
 * Props
 */
defineProps({
  /**
   * 光标位置（像素）
   */
  position: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
/**
 * 光标样式
 * 
 * 使用绝对定位，通过 left 属性控制位置
 * 闪烁动画模拟真实光标效果
 */
.cursor {
  position: absolute;
  left: 0;
  width: 2px;
  height: 1.2em;
  background: var(--text-primary);
  animation: blink 1s infinite;
  pointer-events: none;
  z-index: 2;
  transition: left 0.05s ease;
}

/**
 * 闪烁动画
 * 1秒周期，前半秒可见，后半秒不可见
 */
@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}
</style>

