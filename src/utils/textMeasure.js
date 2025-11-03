/**
 * 文本宽度测量工具
 * 
 * 用于计算文本在特定字体下的像素宽度
 * 主要用于光标位置的精确计算
 * 
 * @module utils/textMeasure
 */

let canvas = null

/**
 * 测量文本宽度
 * 
 * 使用 Canvas API 精确测量文本在指定字体下的宽度
 * 
 * @param {string} text - 要测量的文本
 * @param {string} font - CSS 字体字符串（如 "14px monospace"）
 * @returns {number} 文本宽度（像素）
 * 
 * @example
 * const width = measureTextWidth('hello', '14px monospace')
 * console.log(width) // 35.5
 */
export function measureTextWidth(text, font) {
  // 延迟创建 canvas，避免不必要的 DOM 操作
  if (!canvas) {
    canvas = document.createElement('canvas')
  }
  
  const context = canvas.getContext('2d')
  context.font = font
  
  const metrics = context.measureText(text)
  return metrics.width
}

