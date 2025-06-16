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
            <span class="category">{{
              getCategoryName(article.category)
            }}</span>
            <span class="date">{{ formatDate(article.publishDate) }}</span>
          </div>

          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-summary">{{ article.summary }}</p>

          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{
              tag
            }}</span>
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
            <div class="read-more">阅读全文 →</div>
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
    summary: '详细介绍Vue 3 Composition API的使用方法和最佳实践，包括响应式原理、生命周期钩子、依赖注入等核心概念。',
    content: '这里是文章的完整内容...',
    cover: '/src/assets/images/blue.png',
    author: '前端开发者',
    publishDate: '2024-01-15',
    readTime: 8,
    views: 1234,
    likes: 89,
    category: 'Vue.js',
    tags: ['Vue 3', 'Composition API', '前端框架'],
    featured: true
  },
  {
    id: 2,
    title: 'TypeScript 进阶技巧与实战',
    summary: '从基础语法到高级特性，全面掌握TypeScript在大型项目中的应用，提升代码质量和开发效率。',
    content: '这里是文章的完整内容...',
    cover: '/src/assets/images/blue.png',
    author: '前端开发者',
    publishDate: '2024-01-10',
    readTime: 12,
    views: 987,
    likes: 67,
    category: 'TypeScript',
    tags: ['TypeScript', '类型系统', '前端开发'],
    featured: true
  },
  {
    id: 3,
    title: 'Node.js 性能优化实践指南',
    summary: '深入探讨Node.js应用的性能瓶颈和优化策略，包括内存管理、异步处理、数据库优化等方面。',
    content: '这里是文章的完整内容...',
    cover: '/src/assets/images/blue.png',
    author: '后端开发者',
    publishDate: '2024-01-05',
    readTime: 15,
    views: 756,
    likes: 45,
    category: 'Node.js',
    tags: ['Node.js', '性能优化', '后端开发'],
    featured: false
  },
  {
    id: 4,
    title: 'React Native 跨平台开发经验分享',
    summary: '分享React Native在实际项目中的应用经验，包括组件设计、状态管理、原生模块集成等实用技巧。',
    content: '这里是文章的完整内容...',
    cover: '/src/assets/images/blue.png',
    author: '移动端开发者',
    publishDate: '2023-12-28',
    readTime: 10,
    views: 543,
    likes: 32,
    category: 'React Native',
    tags: ['React Native', '跨平台', '移动开发'],
    featured: false
  },
  {
    id: 5,
    title: 'Docker 容器化部署最佳实践',
    summary: '从Docker基础到生产环境部署，全面介绍容器化技术在现代Web应用中的应用和最佳实践。',
    content: '这里是文章的完整内容...',
    cover: '/src/assets/images/blue.png',
    author: '运维工程师',
    publishDate: '2023-12-20',
    readTime: 18,
    views: 432,
    likes: 28,
    category: 'DevOps',
    tags: ['Docker', '容器化', '部署'],
    featured: false
  },
  {
    id: 6,
    title: '前端算法与数据结构实战',
    summary: '结合前端开发场景，深入讲解常用算法和数据结构，提升编程思维和解决问题的能力。',
    content: '这里是文章的完整内容...',
    cover: '/src/assets/images/blue.png',
    author: '算法工程师',
    publishDate: '2023-12-15',
    readTime: 20,
    views: 321,
    likes: 19,
    category: '算法',
    tags: ['算法', '数据结构', '编程思维'],
    featured: false
  }
])

// 计算属性
const allTags = computed(() => {
  const tags = new Set<string>()
  articles.value.forEach((article) => {
    article.tags.forEach((tag) => tags.add(tag))
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
    filtered = filtered.filter(
      (article) => article.category === selectedCategory.value
    )
  }

  // 按标签过滤
  if (selectedTag.value) {
    filtered = filtered.filter((article) =>
      article.tags.includes(selectedTag.value)
    )
  }

  // 按搜索关键词过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// 方法
const getCategoryName = (categoryKey: string) => {
  const category = categories.find((cat) => cat.key === categoryKey)
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

<style>
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

/* 科技风格主题样式 */
html.theme-tech .blog-container {
  background: transparent;
}

html.theme-tech .page-title {
  background: linear-gradient(135deg, #00bfff, #87ceeb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
}

html.theme-tech .page-subtitle {
  color: #c0c0c0;
}

html.theme-tech .blog-controls {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
}

html.theme-tech .blog-controls::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  );
}

html.theme-tech .el-input__wrapper {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.15),
    rgba(135, 206, 235, 0.1)
  ) !important;
  border: 1px solid rgba(0, 191, 255, 0.4) !important;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.2) !important;
}

html.theme-tech .el-input__inner {
  color: #c0c0c0 !important;
  background: transparent !important;
}

html.theme-tech .el-input__inner::placeholder {
  color: #a0a0a0 !important;
}

html.theme-tech .el-input__prefix-inner .el-icon {
  color: #00bfff !important;
}

html.theme-tech .el-select .el-select__wrapper {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.15),
    rgba(135, 206, 235, 0.1)
  ) !important;
  border: 1px solid rgba(0, 191, 255, 0.4) !important;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.2) !important;
}

html.theme-tech .el-select .el-select__selected-item {
  color: #c0c0c0 !important;
}

html.theme-tech .el-select .el-select__placeholder {
  color: #a0a0a0 !important;
}

html.theme-tech .el-select .el-select__suffix .el-icon {
  color: #00bfff !important;
}

html.theme-tech .stat-item {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
  color: #e2e8f0;
}

html.theme-tech .stat-item::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  );
}

html.theme-tech .stat-item:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 15px 40px rgba(0, 255, 255, 0.3);
}

html.theme-tech .stat-number {
  color: #00bfff;
  text-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
}

html.theme-tech .stat-label {
  color: #c0c0c0;
}

html.theme-tech .article-card {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
  color: #e2e8f0;
}

html.theme-tech .article-card::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  );
}

html.theme-tech .article-card:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 255, 255, 0.3);
  transform: translateY(-10px);
}

html.theme-tech .article-title {
  color: #00bfff;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.3);
  position: relative;
  z-index: 2;
}

html.theme-tech .article-summary {
  color: #c0c0c0;
  position: relative;
  z-index: 2;
}

html.theme-tech .article-meta {
  color: #a0a0a0;
  position: relative;
  z-index: 2;
}

html.theme-tech .category {
  background: linear-gradient(135deg, #00bfff, #4682b4);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
  border: none;
}

html.theme-tech .article-tags .tag {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.2),
    rgba(135, 206, 235, 0.1)
  );
  color: #c0c0c0;
  border: 1px solid rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

html.theme-tech .article-tags .tag:hover {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.3),
    rgba(135, 206, 235, 0.2)
  );
  border-color: rgba(0, 191, 255, 0.5);
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.2);
  transform: translateY(-2px);
}

html.theme-tech .read-more {
  color: #00bfff;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.3);
  position: relative;
  z-index: 2;
}

html.theme-tech .article-footer {
  border-top: 1px solid rgba(0, 255, 255, 0.3) !important;
}

html.theme-tech .stat {
  color: #c0c0c0;
  position: relative;
  z-index: 2;
}

html.theme-tech .empty-state {
  color: #c0c0c0;
}

html.theme-tech .empty-icon {
  color: #00bfff;
  text-shadow: 0 0 20px rgba(0, 191, 255, 0.4);
}

html.theme-tech .el-pagination {
  color: #c0c0c0;
}

html.theme-tech .el-pagination .el-pager li {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.15),
    rgba(135, 206, 235, 0.1)
  );
  color: #c0c0c0;
  border: 1px solid rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(10px);
}

html.theme-tech .el-pagination .el-pager li:hover {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.25),
    rgba(135, 206, 235, 0.15)
  );
  color: #00bfff;
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.2);
}

html.theme-tech .el-pagination .el-pager li.is-active {
  background: linear-gradient(135deg, #00bfff, #4682b4);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.4);
}

html.theme-tech .el-pagination .btn-prev,
html.theme-tech .el-pagination .btn-next {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.15),
    rgba(135, 206, 235, 0.1)
  );
  color: #c0c0c0;
  border: 1px solid rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(10px);
}

html.theme-tech .el-pagination .btn-prev:hover,
html.theme-tech .el-pagination .btn-next:hover {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.25),
    rgba(135, 206, 235, 0.15)
  );
  color: #00bfff;
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.2);
}

html.theme-tech .el-pagination .el-pagination__jump {
  color: #c0c0c0;
}

html.theme-tech .el-pagination .el-pagination__jump .el-input__inner {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 0.15),
    rgba(135, 206, 235, 0.1)
  );
  border: 1px solid rgba(0, 191, 255, 0.3);
  color: #c0c0c0;
  backdrop-filter: blur(10px);
}

/* 樱花风格主题 */
.theme-sakura .blog-container {
  background: transparent;
}

.theme-sakura .page-title {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
  font-weight: bold;
}

.theme-sakura .page-subtitle {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 水墨风格主题 */
.theme-ink .blog-container {
  background: transparent;
}

.theme-ink .page-title {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
  font-weight: bold;
}

.theme-ink .page-subtitle {
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
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.blog-controls::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.blog-controls:hover::before {
  left: 100%;
}

/* 科技风格控制区域 */
html.theme-tech .blog-controls {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
}

html.theme-tech .blog-controls::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  );
}

/* 樱花风格控制区域 */
.theme-sakura .blog-controls {
  background: rgba(139, 21, 56, 0.1);
  border: 1px solid rgba(139, 21, 56, 0.2);
}

.theme-sakura .blog-controls::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(139, 21, 56, 0.1),
    transparent
  );
}

/* 水墨风格控制区域 */
.theme-ink .blog-controls {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.2);
}

.theme-ink .blog-controls::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(44, 62, 80, 0.1),
    transparent
  );
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-box .el-input__wrapper {
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
  backdrop-filter: blur(20px);
  padding: 1.5rem;
  border-radius: 20px;
  text-align: center;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.stat-item:hover::before {
  left: 100%;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

/* 科技风格统计项 */
html.theme-tech .stat-item {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
  color: #e2e8f0;
}

html.theme-tech .stat-item::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  );
}

html.theme-tech .stat-item:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 15px 40px rgba(0, 255, 255, 0.3);
}

/* 樱花风格统计项 */
.theme-sakura .stat-item {
  background: rgba(139, 21, 56, 0.1);
  border: 1px solid rgba(139, 21, 56, 0.2);
  color: #8b1538;
}

.theme-sakura .stat-item::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(139, 21, 56, 0.1),
    transparent
  );
}

.theme-sakura .stat-item:hover {
  background: rgba(139, 21, 56, 0.2);
  box-shadow: 0 15px 40px rgba(139, 21, 56, 0.3);
}

/* 水墨风格统计项 */
.theme-ink .stat-item {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.2);
  color: #2c3e50;
}

.theme-ink .stat-item::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(44, 62, 80, 0.1),
    transparent
  );
}

.theme-ink .stat-item:hover {
  background: rgba(44, 62, 80, 0.2);
  box-shadow: 0 15px 40px rgba(44, 62, 80, 0.3);
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.article-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
  z-index: 1;
}

.article-card:hover::before {
  left: 100%;
}

.article-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

/* 科技风格文章卡片 */
html.theme-tech .article-card {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
  color: #e2e8f0;
}

html.theme-tech .article-card::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  );
}

html.theme-tech .article-card:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 255, 255, 0.3);
  transform: translateY(-10px);
}

/* 樱花风格文章卡片 */
.theme-sakura .article-card {
  background: rgba(139, 21, 56, 0.1);
  border: 1px solid rgba(139, 21, 56, 0.2);
  color: #8b1538;
}

.theme-sakura .article-card::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(139, 21, 56, 0.1),
    transparent
  );
}

.theme-sakura .article-card:hover {
  background: rgba(139, 21, 56, 0.2);
  box-shadow: 0 20px 60px rgba(139, 21, 56, 0.3);
  transform: translateY(-10px);
}

/* 水墨风格文章卡片 */
.theme-ink .article-card {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.2);
  color: #2c3e50;
}

.theme-ink .article-card::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(44, 62, 80, 0.1),
    transparent
  );
}

.theme-ink .article-card:hover {
  background: rgba(44, 62, 80, 0.2);
  box-shadow: 0 20px 60px rgba(44, 62, 80, 0.3);
  transform: translateY(-10px);
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
html.theme-tech .empty-state {
  color: #c0c0c0;
}

/* 樱花风格空状态 */
.theme-sakura .empty-state {
  color: #881337;
}

/* 水墨风格空状态 */
.theme-ink .empty-state {
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