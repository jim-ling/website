<template>
  <div class="blog-container">
    <div class="blog-header">
      <h1 class="page-title">📝 个人博客</h1>
      <p class="page-subtitle">记录技术成长路径，分享学习心得体会</p>
    </div>

    <!-- 搜索和筛选 -->
    <div class="blog-controls">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索文章标题或内容..."
          size="large"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      
      <div class="filter-controls">
        <el-select v-model="selectedCategory" placeholder="选择分类" clearable>
          <el-option label="全部分类" value="" />
          <el-option 
            v-for="category in categories" 
            :key="category.key"
            :label="category.name" 
            :value="category.key" 
          />
        </el-select>
        
        <el-select v-model="selectedTag" placeholder="选择标签" clearable>
          <el-option label="全部标签" value="" />
          <el-option 
            v-for="tag in allTags" 
            :key="tag"
            :label="tag" 
            :value="tag" 
          />
        </el-select>
      </div>
    </div>

    <!-- 文章统计 -->
    <div class="blog-stats">
      <div class="stat-item">
        <div class="stat-number">{{ articles.length }}</div>
        <div class="stat-label">总文章数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalViews }}</div>
        <div class="stat-label">总阅读量</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ categories.length }}</div>
        <div class="stat-label">分类数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ allTags.length }}</div>
        <div class="stat-label">标签数</div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="articles-list">
      <div 
        v-for="article in filteredArticles" 
        :key="article.id"
        class="article-card"
        @click="goToArticle(article.id)"
      >
        <div class="article-image" v-if="article.cover">
          <img :src="article.cover" :alt="article.title" />
          <div class="article-overlay">
            <div class="read-time">{{ article.readTime }} 分钟阅读</div>
          </div>
        </div>
        
        <div class="article-content">
          <div class="article-meta">
            <span class="category">{{ getCategoryName(article.category) }}</span>
            <span class="date">{{ formatDate(article.publishDate) }}</span>
          </div>
          
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-summary">{{ article.summary }}</p>
          
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          
          <div class="article-footer">
            <div class="article-stats">
              <span class="stat">
                <el-icon><View /></el-icon>
                {{ article.views }}
              </span>
              <span class="stat">
                <el-icon><ChatDotRound /></el-icon>
                {{ article.comments }}
              </span>
              <span class="stat">
                <el-icon><Star /></el-icon>
                {{ article.likes }}
              </span>
            </div>
            <div class="read-more">
              阅读全文 →
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredArticles.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>暂无相关文章</h3>
      <p>尝试调整搜索条件或浏览其他分类</p>
    </div>

    <!-- 分页 -->
    <div class="pagination-wrapper" v-if="filteredArticles.length > 0">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredArticles.length"
        layout="prev, pager, next, jumper"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, View, ChatDotRound, Star } from '@element-plus/icons-vue'

const router = useRouter()

// 分类数据
const categories = [
  { key: 'frontend', name: '前端开发', icon: '🌐' },
  { key: 'backend', name: '后端开发', icon: '⚙️' },
  { key: 'mobile', name: '移动开发', icon: '📱' },
  { key: 'devops', name: 'DevOps', icon: '🔧' },
  { key: 'algorithm', name: '算法数据结构', icon: '🧮' },
  { key: 'experience', name: '经验分享', icon: '💡' },
  { key: 'tools', name: '工具推荐', icon: '🛠️' },
  { key: 'thinking', name: '技术思考', icon: '🤔' }
]

// 搜索和筛选
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTag = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// 文章数据
const articles = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 深度解析',
    summary: '深入探讨 Vue 3 Composition API 的设计理念、使用方法和最佳实践，帮助开发者更好地理解和应用这一新特性。',
    content: '...',
    cover: 'https://via.placeholder.com/400x200/42b883/ffffff?text=Vue+3',
    category: 'frontend',
    tags: ['Vue3', 'Composition API', 'JavaScript'],
    publishDate: '2024-01-15',
    readTime: 8,
    views: 1250,
    comments: 23,
    likes: 89,
    author: '博主'
  },
  {
    id: 2,
    title: 'TypeScript 高级类型系统实战',
    summary: '通过实际案例学习 TypeScript 的高级类型特性，包括泛型、条件类型、映射类型等，提升代码的类型安全性。',
    content: '...',
    cover: 'https://via.placeholder.com/400x200/3178c6/ffffff?text=TypeScript',
    category: 'frontend',
    tags: ['TypeScript', '类型系统', '前端'],
    publishDate: '2024-01-20',
    readTime: 12,
    views: 980,
    comments: 15,
    likes: 67,
    author: '博主'
  },
  {
    id: 3,
    title: 'Node.js 性能优化实践指南',
    summary: '分享 Node.js 应用性能优化的实用技巧，包括内存管理、异步处理、数据库优化等方面的最佳实践。',
    content: '...',
    cover: 'https://via.placeholder.com/400x200/339933/ffffff?text=Node.js',
    category: 'backend',
    tags: ['Node.js', '性能优化', '后端'],
    publishDate: '2024-01-25',
    readTime: 15,
    views: 1580,
    comments: 31,
    likes: 124,
    author: '博主'
  },
  {
    id: 4,
    title: 'React Native 跨平台开发经验总结',
    summary: '基于实际项目经验，总结 React Native 开发中的常见问题、解决方案和性能优化技巧。',
    content: '...',
    cover: 'https://via.placeholder.com/400x200/61dafb/ffffff?text=React+Native',
    category: 'mobile',
    tags: ['React Native', '跨平台', '移动开发'],
    publishDate: '2024-02-01',
    readTime: 10,
    views: 756,
    comments: 18,
    likes: 45,
    author: '博主'
  },
  {
    id: 5,
    title: 'Docker 容器化部署最佳实践',
    summary: '详细介绍 Docker 在项目部署中的应用，包括镜像构建、容器编排、CI/CD 集成等实用技巧。',
    content: '...',
    cover: 'https://via.placeholder.com/400x200/2496ed/ffffff?text=Docker',
    category: 'devops',
    tags: ['Docker', '容器化', 'DevOps'],
    publishDate: '2024-02-05',
    readTime: 13,
    views: 1120,
    comments: 27,
    likes: 78,
    author: '博主'
  },
  {
    id: 6,
    title: '算法刷题心得：动态规划专题',
    summary: '系统总结动态规划算法的解题思路和常见模式，通过经典题目分析帮助理解核心概念。',
    content: '...',
    cover: 'https://via.placeholder.com/400x200/ff6b6b/ffffff?text=Algorithm',
    category: 'algorithm',
    tags: ['算法', '动态规划', 'LeetCode'],
    publishDate: '2024-02-10',
    readTime: 20,
    views: 892,
    comments: 12,
    likes: 56,
    author: '博主'
  }
])

// 计算属性
const allTags = computed(() => {
  const tags = new Set<string>()
  articles.value.forEach(article => {
    article.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

const totalViews = computed(() => {
  return articles.value.reduce((total, article) => total + article.views, 0)
})

const filteredArticles = computed(() => {
  let filtered = articles.value

  // 按分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }

  // 按标签过滤
  if (selectedTag.value) {
    filtered = filtered.filter(article => article.tags.includes(selectedTag.value))
  }

  // 按搜索关键词过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// 方法
const getCategoryName = (categoryKey: string) => {
  const category = categories.find(cat => cat.key === categoryKey)
  return category ? category.name : categoryKey
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goToArticle = (id: number) => {
  router.push(`/blog/article/${id}`)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.blog-container {
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0;
}

/* 主题样式 */
/* 科技风格主题 */
:global(.theme-tech) .blog-container {
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
:global(.theme-sakura) .blog-container {
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
:global(.theme-ink) .blog-container {
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

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

/* 搜索和筛选 */
.blog-controls {
  max-width: 800px;
  margin: 0 auto 3rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

/* 科技风格控制区 */
:global(.theme-tech) .blog-controls {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.3);
}

/* 樱花风格控制区 */
:global(.theme-sakura) .blog-controls {
  background: rgba(251, 113, 133, 0.1);
  border: 1px solid rgba(251, 113, 133, 0.2);
}

/* 水墨风格控制区 */
:global(.theme-ink) .blog-controls {
  background: rgba(71, 85, 105, 0.1);
  border: 1px solid rgba(71, 85, 105, 0.2);
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-box :deep(.el-input__wrapper) {
  border-radius: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.filter-controls {
  display: flex;
  gap: 1rem;
}

.filter-controls .el-select {
  flex: 1;
}

/* 统计信息 */
.blog-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  color: white;
  backdrop-filter: blur(10px);
}

/* 科技风格统计项 */
:global(.theme-tech) .stat-item {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.2);
  color: #e2e8f0;
}

:global(.theme-tech) .stat-number {
  color: #00ffff !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

/* 樱花风格统计项 */
:global(.theme-sakura) .stat-item {
  background: rgba(139, 21, 56, 0.1);
  border: 1px solid rgba(139, 21, 56, 0.2);
  color: #8b1538;
}

:global(.theme-sakura) .stat-number {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 水墨风格统计项 */
:global(.theme-ink) .stat-item {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.2);
  color: #2c3e50;
}

:global(.theme-ink) .stat-number {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 文章列表 */
.articles-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

/* 科技风格文章卡片 */
:global(.theme-tech) .article-card {
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.1);
}

:global(.theme-tech) .article-card:hover {
  box-shadow: 0 20px 40px rgba(0, 255, 255, 0.3);
  border-color: rgba(0, 255, 255, 0.5);
}

:global(.theme-tech) .article-title {
  color: #00ffff !important;
}

:global(.theme-tech) .article-summary {
  color: #e2e8f0 !important;
}

:global(.theme-tech) .category {
  background: #00ffff;
  color: #000;
}

:global(.theme-tech) .date {
  color: #e2e8f0 !important;
}

:global(.theme-tech) .tag {
  background: rgba(0, 255, 255, 0.2);
  color: #e2e8f0 !important;
}

:global(.theme-tech) .stat {
  color: #e2e8f0 !important;
}

:global(.theme-tech) .read-more {
  color: #00ffff !important;
}

/* 樱花风格文章卡片 */
:global(.theme-sakura) .article-card {
  background: rgba(255, 247, 247, 0.9);
  border: 1px solid rgba(139, 21, 56, 0.2);
  box-shadow: 0 10px 30px rgba(139, 21, 56, 0.1);
}

:global(.theme-sakura) .article-card:hover {
  box-shadow: 0 20px 40px rgba(139, 21, 56, 0.2);
}

:global(.theme-sakura) .article-title {
  color: #8b1538 !important;
}

:global(.theme-sakura) .article-summary {
  color: #8b1538 !important;
}

:global(.theme-sakura) .category {
  background: #8b1538;
  color: white;
}

:global(.theme-sakura) .date {
  color: #8b1538 !important;
}

:global(.theme-sakura) .tag {
  background: rgba(139, 21, 56, 0.2);
  color: #8b1538 !important;
}

:global(.theme-sakura) .stat {
  color: #8b1538 !important;
}

:global(.theme-sakura) .read-more {
  color: #8b1538 !important;
}

/* 水墨风格文章卡片 */
:global(.theme-ink) .article-card {
  background: rgba(248, 250, 252, 0.9);
  border: 1px solid rgba(44, 62, 80, 0.2);
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
}

:global(.theme-ink) .article-card:hover {
  box-shadow: 0 20px 40px rgba(44, 62, 80, 0.2);
}

:global(.theme-ink) .article-title {
  color: #2c3e50 !important;
}

:global(.theme-ink) .article-summary {
  color: #2c3e50 !important;
}

:global(.theme-ink) .category {
  background: #2c3e50;
  color: white;
}

:global(.theme-ink) .date {
  color: #2c3e50 !important;
}

:global(.theme-ink) .tag {
  background: rgba(44, 62, 80, 0.2);
  color: #2c3e50 !important;
}

:global(.theme-ink) .stat {
  color: #2c3e50 !important;
}

:global(.theme-ink) .read-more {
  color: #2c3e50 !important;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.read-time {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.article-content {
  padding: 2rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.date {
  color: #718096;
  font-size: 0.9rem;
}

.article-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.article-summary {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

/* 科技风格文章底部 */
:global(.theme-tech) .article-footer {
  border-top-color: rgba(59, 130, 246, 0.2);
}

/* 樱花风格文章底部 */
:global(.theme-sakura) .article-footer {
  border-top-color: rgba(251, 113, 133, 0.2);
}

/* 水墨风格文章底部 */
:global(.theme-ink) .article-footer {
  border-top-color: rgba(71, 85, 105, 0.2);
}

.article-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #718096;
  font-size: 0.9rem;
}

.read-more {
  color: #667eea;
  font-weight: 500;
  font-size: 0.9rem;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: white;
}

/* 科技风格空状态 */
:global(.theme-tech) .empty-state {
  color: #e2e8f0;
}

/* 樱花风格空状态 */
:global(.theme-sakura) .empty-state {
  color: #881337;
}

/* 水墨风格空状态 */
:global(.theme-ink) .empty-state {
  color: #334155;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .blog-controls {
    padding: 1.5rem;
  }
  
  .filter-controls {
    flex-direction: column;
  }
  
  .blog-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .article-content {
    padding: 1.5rem;
  }
  
  .article-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style> 