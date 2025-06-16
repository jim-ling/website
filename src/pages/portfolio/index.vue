<template>
  <div class="portfolio-container">
    <div class="portfolio-header">
      <h1 class="page-title">🎨 作品展示</h1>
      <p class="page-subtitle">记录我的创意历程与技术实践</p>
    </div>

    <!-- 作品分类筛选 -->
    <div class="category-filter">
      <button
        v-for="category in categories"
        :key="category.key"
        :class="['filter-btn', { active: activeCategory === category.key }]"
        @click="activeCategory = category.key"
      >
        {{ category.icon }} {{ category.name }}
      </button>
    </div>

    <!-- 作品网格 -->
    <div class="portfolio-grid">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card"
        @click="openProject(project)"
      >
        <div class="project-image">
          <img :src="project.image" :alt="project.title" />
          <div class="project-overlay">
            <div class="project-actions">
              <button class="action-btn" @click.stop="openDemo(project.demo)">
                <i class="icon">🔗</i> 预览
              </button>
              <button class="action-btn" @click.stop="openCode(project.github)">
                <i class="icon">💻</i> 代码
              </button>
            </div>
          </div>
        </div>
        <div class="project-info">
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{
              tag
            }}</span>
          </div>
          <div class="project-meta">
            <span class="date">{{ project.date }}</span>
            <span class="category">{{
              getCategoryName(project.category)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目详情弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="selectedProject?.title"
      width="80%"
      class="project-dialog"
    >
      <div v-if="selectedProject" class="project-detail">
        <div class="detail-image">
          <img :src="selectedProject.image" :alt="selectedProject.title" />
        </div>
        <div class="detail-content">
          <h3>项目介绍</h3>
          <p>{{ selectedProject.fullDescription }}</p>

          <h3>技术栈</h3>
          <div class="tech-stack">
            <span
              v-for="tech in selectedProject.technologies"
              :key="tech"
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>

          <h3>项目特色</h3>
          <ul class="features">
            <li v-for="feature in selectedProject.features" :key="feature">
              {{ feature }}
            </li>
          </ul>

          <div class="project-links">
            <el-button type="primary" @click="openDemo(selectedProject.demo)">
              在线预览
            </el-button>
            <el-button @click="openCode(selectedProject.github)">
              查看代码
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
// import { ref, computed } from 'vue'

// 定义项目类型
interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  category: string
  tags: string[]
  technologies: string[]
  features: string[]
  date: string
  demo: string
  github: string
}

// 分类数据
const categories = [
  { key: 'all', name: '全部', icon: '📁' },
  { key: 'web', name: 'Web应用', icon: '🌐' },
  { key: 'mobile', name: '移动端', icon: '📱' },
  { key: 'creative', name: '创意编程', icon: '✨' },
  { key: 'tool', name: '工具类', icon: '🔧' }
]

// 当前选中的分类
const activeCategory = ref('all')

// 弹窗控制
const dialogVisible = ref(false)
const selectedProject = ref<Project | null>(null)

import blueImage from '@/assets/images/blue.png'

// 项目数据
const projects = ref([
  {
    id: 1,
    title: '个人博客系统',
    description: '基于Vue 3和TypeScript开发的现代化博客系统，支持文章管理、分类标签、评论系统等功能。',
    fullDescription: '这是一个功能完整的个人博客系统，采用前后端分离架构。前端使用Vue 3 + TypeScript + Element Plus构建，后端基于Node.js + Express + MongoDB。系统支持文章的增删改查、分类管理、标签系统、用户评论、文章搜索等功能。界面设计简洁美观，响应式布局适配各种设备。',
    image: blueImage,
    technologies: ['Vue 3', 'TypeScript', 'Element Plus', 'Node.js'],
    tags: ['Vue', '博客系统', '全栈'],
    category: 'web',
    demo: 'https://blog-demo.com',
    github: 'https://github.com/username/blog-system',
    date: '2024-01-15',
    features: ['响应式设计', '文章管理', '分类标签', '评论系统', '搜索功能', 'SEO优化']
  },
  {
    id: 2,
    title: '图片破碎特效',
    description: '使用Canvas和WebGL实现的炫酷图片破碎动画效果，支持多种破碎模式和自定义参数。',
    fullDescription: '这是一个基于Canvas和WebGL技术实现的图片破碎特效库。通过三角剖分算法将图片分割成多个三角形片段，然后使用物理引擎模拟破碎效果。支持多种破碎模式：爆炸式、重力式、螺旋式等。用户可以自定义破碎参数，如片段数量、动画时长、物理属性等。',
    image: blueImage,
    technologies: ['JavaScript', 'Canvas', 'WebGL', 'GSAP'],
    tags: ['动画', '特效', 'Canvas'],
    category: 'creative',
    demo: 'https://shatter-demo.com',
    github: 'https://github.com/username/image-shatter',
    date: '2023-12-20',
    features: ['多种破碎模式', '物理引擎', '自定义参数', '高性能渲染', '移动端适配', 'API友好']
  },
  {
    id: 3,
    title: '任务管理应用',
    description: '功能丰富的任务管理工具，支持项目分组、优先级设置、进度跟踪、团队协作等功能。',
    fullDescription: '一个专业的任务管理应用，帮助个人和团队更好地组织和跟踪工作进度。支持创建项目、添加任务、设置优先级、分配成员、设置截止日期等功能。提供多种视图模式：列表视图、看板视图、日历视图、甘特图等。集成了实时通知、文件附件、评论讨论等协作功能。',
    image: blueImage,
    technologies: ['React', 'Redux', 'Ant Design', 'Express'],
    tags: [],
    category: 'web',
    demo: 'https://task-demo.com',
    github: 'https://github.com/username/task-manager',
    date: '2023-11-10',
    features: ['项目管理', '多视图模式', '团队协作', '实时通知', '文件管理', '数据统计']
  },
  {
    id: 4,
    title: '天气预报应用',
    description: '基于地理位置的天气预报应用，提供详细的天气信息、预警提醒和美观的数据可视化。',
    fullDescription: '一个现代化的天气预报应用，集成了多个天气数据源，提供准确的天气信息。支持自动定位和手动搜索城市，显示当前天气、24小时预报、7天预报等信息。使用ECharts进行数据可视化，展示温度趋势、降水概率、空气质量等数据。采用PWA技术，支持离线使用和桌面安装。',
    image: blueImage,
    technologies: ['Vue 3', 'Composition API', 'ECharts', 'PWA'],
    tags: [],
    category: 'mobile',
    demo: 'https://weather-demo.com',
    github: 'https://github.com/username/weather-app',
    date: '2023-10-05',
    features: ['多数据源', '精准定位', '数据可视化', 'PWA支持', '离线缓存', '桌面通知']
  },
  {
    id: 5,
    title: '代码格式化工具',
    description: '支持多种编程语言的在线代码格式化工具，提供语法高亮、错误检测、代码美化等功能。',
    fullDescription: '一个功能强大的在线代码格式化工具，支持JavaScript、TypeScript、HTML、CSS、JSON等多种语言。集成了Monaco Editor提供专业的代码编辑体验，支持语法高亮、自动补全、错误提示等功能。使用Prettier和ESLint进行代码格式化和质量检测，帮助开发者写出更规范的代码。',
    image: blueImage,
    technologies: ['TypeScript', 'Monaco Editor', 'Prettier', 'ESLint'],
    tags: [],
    category: 'tool',
    demo: 'https://formatter-demo.com',
    github: 'https://github.com/username/code-formatter',
    date: '2023-09-15',
    features: ['多语言支持', '实时格式化', '语法检测', '代码高亮', '快捷键支持', '配置导出']
  }
])

// 过滤后的项目
const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') {
    return projects.value
  }
  return projects.value.filter(
    (project) => project.category === activeCategory.value
  )
})

// 获取分类名称
const getCategoryName = (categoryKey: string) => {
  const category = categories.find((cat) => cat.key === categoryKey)
  return category ? category.name : categoryKey
}

// 打开项目详情
const openProject = (project: Project) => {
  selectedProject.value = project
  dialogVisible.value = true
}

// 打开演示链接
const openDemo = (url: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}

// 打开代码链接
const openCode = (url: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.portfolio-container {
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0;
}

/* 主题样式 */
/* 科技风格主题 */
:global(.theme-tech) .portfolio-container {
  background: transparent;
}

:global(.theme-tech) .page-title {
  color: #00ffff !important;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  font-weight: bold;
}

:global(.theme-tech) .page-subtitle {
  color: #e2e8f0 !important;
}

/* 樱花风格主题 */
:global(.theme-sakura) .portfolio-container {
  background: transparent;
}

:global(.theme-sakura) .page-title {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
  font-weight: bold;
}

:global(.theme-sakura) .page-subtitle {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 水墨风格主题 */
:global(.theme-ink) .portfolio-container {
  background: transparent;
}

:global(.theme-ink) .page-title {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
  font-weight: bold;
}

:global(.theme-ink) .page-subtitle {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

/* 分类筛选 */
.category-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  backdrop-filter: blur(10px);
}

.filter-btn:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
}

/* 科技风格筛选按钮 */
:global(.theme-tech) .filter-btn {
  border-color: rgba(0, 255, 255, 0.3);
  background: rgba(0, 194, 255, 0.1);
  color: #e2e8f0;
}

:global(.theme-tech) .filter-btn:hover {
  border-color: rgba(0, 255, 255, 0.5);
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

:global(.theme-tech) .filter-btn.active {
  background: rgba(0, 255, 255, 0.3);
  border-color: rgba(0, 255, 255, 0.5);
  color: #00ffff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
}

/* 樱花风格筛选按钮 */
:global(.theme-sakura) .filter-btn {
  border-color: rgba(139, 21, 56, 0.3);
  background: rgba(139, 21, 56, 0.1);
  color: #8b1538;
}

:global(.theme-sakura) .filter-btn:hover {
  border-color: rgba(139, 21, 56, 0.5);
  background: rgba(139, 21, 56, 0.2);
}

:global(.theme-sakura) .filter-btn.active {
  background: rgba(139, 21, 56, 0.3);
  border-color: rgba(139, 21, 56, 0.5);
  color: #8b1538;
}

/* 水墨风格筛选按钮 */
:global(.theme-ink) .filter-btn {
  border-color: rgba(44, 62, 80, 0.3);
  background: rgba(44, 62, 80, 0.1);
  color: #2c3e50;
}

:global(.theme-ink) .filter-btn:hover {
  border-color: rgba(44, 62, 80, 0.5);
  background: rgba(44, 62, 80, 0.2);
}

:global(.theme-ink) .filter-btn.active {
  background: rgba(44, 62, 80, 0.3);
  border-color: rgba(44, 62, 80, 0.5);
  color: #2c3e50;
}

/* 作品网格 */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 20px;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.action-btn:hover {
  background: white;
  transform: scale(1.05);
}

.project-info {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.project-description {
  color: #718096;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #a0aec0;
}

/* 项目详情弹窗 */
.project-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.detail-image img {
  width: 100%;
  border-radius: 10px;
}

.detail-content h3 {
  color: #2d3748;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

.detail-content h3:first-child {
  margin-top: 0;
}

.tech-stack {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.features {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  padding-left: 1.5rem;
}

.features li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #48bb78;
  font-weight: bold;
}

.project-links {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .portfolio-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .project-detail {
    grid-template-columns: 1fr;
  }

  .category-filter {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .filter-btn {
    white-space: nowrap;
  }
}

/* 科技风格作品卡片 */
:global(.theme-tech) .project-card {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 194, 255, 0.1);
}

:global(.theme-tech) .project-card:hover {
  box-shadow: 0 20px 40px rgba(0, 194, 255, 0.2);
}

:global(.theme-tech) .project-title {
  color: #00ffff !important;
}

:global(.theme-tech) .project-description {
  color: #e2e8f0 !important;
}

:global(.theme-tech) .tag {
  background: rgba(0, 194, 255, 0.2);
  color: #e2e8f0 !important;
}

:global(.theme-tech) .project-meta {
  color: #e2e8f0 !important;
}

/* 樱花风格作品卡片 */
:global(.theme-sakura) .project-card {
  background: rgba(139, 21, 56, 0.1);
  border: 1px solid rgba(139, 21, 56, 0.2);
  box-shadow: 0 10px 30px rgba(139, 21, 56, 0.1);
}

:global(.theme-sakura) .project-card:hover {
  box-shadow: 0 20px 40px rgba(139, 21, 56, 0.2);
}

:global(.theme-sakura) .project-title {
  color: #8b1538 !important;
}

:global(.theme-sakura) .project-description {
  color: #8b1538 !important;
}

:global(.theme-sakura) .tag {
  background: rgba(139, 21, 56, 0.2);
  color: #8b1538 !important;
}

:global(.theme-sakura) .project-meta {
  color: #8b1538 !important;
}

/* 水墨风格作品卡片 */
:global(.theme-ink) .project-card {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.2);
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
}

:global(.theme-ink) .project-card:hover {
  box-shadow: 0 20px 40px rgba(44, 62, 80, 0.2);
}

:global(.theme-ink) .project-title {
  color: #2c3e50 !important;
}

:global(.theme-ink) .project-description {
  color: #2c3e50 !important;
}

:global(.theme-ink) .tag {
  background: rgba(44, 62, 80, 0.2);
  color: #2c3e50 !important;
}

:global(.theme-ink) .project-meta {
  color: #2c3e50 !important;
}
</style>