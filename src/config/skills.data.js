/**
 * 技能数据配置
 * 
 * 将技能数据从组件中分离出来，便于维护和更新
 * 可以轻松添加、修改或删除技能项
 * 
 * @module config/skills.data
 */

/**
 * 技能数据对象
 */
export const skillsData = {
  /**
   * 编程语言技能
   * 每项包含名称和熟练度（0-100）
   */
  programmingSkills: [
    { 
      name: 'Python', 
      level: 100
    },
    { 
      name: 'C#/Unity', 
      level: 90
    }, 
    { 
      name: 'Java', 
      level: 85 
    },
  ],
  
  /**
   * 框架和工具
   * 标签形式展示
   */
  tools: [
    'Vue.js',
    'Next.js',
    'Node.js',
    'Git/GitHub',
    'Docker',
    "Django",
    "Flask",
    "FastAPI",
    'Blender',
  ],
  
  /**
   * 特殊技能
   * 包含图标、名称和描述
   */
  specialSkills: [
    {
      icon: '✨',
      name: 'Vibe Coding',
      description: '这条命都是AI给的'
    },
    {
      icon: '🎨',
      name: '数字艺术',
      description: '画画，偏好绘画炭笔风格的数码绘画，喜欢Krita'
    },
    {
      icon: '🎮',
      name: '游戏开发',
      description: 'Unity功能全不好用，Godot好用功能不全，最后还是变成了Unity的形状'
    }
  ]
}

