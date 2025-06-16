<template>
  <div class="bookmarks-container">
    <div class="bookmarks-header">
      <h1 class="page-title">🔗 精品网址收录</h1>
      <p class="page-subtitle">精心收藏的优质网站资源，助力高效工作与学习</p>
    </div>

    <!-- 搜索栏 -->
    <div class="search-section">
      <el-input
        v-model="searchQuery"
        placeholder="搜索网站名称或描述..."
        size="large"
        clearable
        class="search-input"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 分类标签 -->
    <div class="category-tabs">
      <button
        v-for="category in categories"
        :key="category.key"
        :class="['category-tab', { active: activeCategory === category.key }]"
        @click="activeCategory = category.key"
      >
        {{ category.icon }} {{ category.name }}
        <span class="count">({{ getCategoryCount(category.key) }})</span>
      </button>
    </div>

    <!-- 网址卡片网格 -->
    <div class="bookmarks-grid">
      <div
        v-for="bookmark in filteredBookmarks"
        :key="bookmark.id"
        class="bookmark-card"
        @click="openWebsite(bookmark.url)"
      >
        <div class="bookmark-header">
          <div class="bookmark-icon">
            <img
              :src="bookmark.favicon"
              :alt="bookmark.title"
              @error="handleImageError"
            />
          </div>
          <div class="bookmark-info">
            <h3 class="bookmark-title">{{ bookmark.title }}</h3>
            <p class="bookmark-url">{{ bookmark.domain }}</p>
          </div>
          <div class="bookmark-actions">
            <button class="action-btn" @click.stop="copyUrl(bookmark.url)">
              <el-icon><CopyDocument /></el-icon>
            </button>
            <button
              class="action-btn favorite"
              :class="{ active: bookmark.favorite }"
            >
              <el-icon><Star /></el-icon>
            </button>
          </div>
        </div>
        <div class="bookmark-content">
          <p class="bookmark-description">{{ bookmark.description }}</p>
          <div class="bookmark-tags">
            <span v-for="tag in bookmark.tags" :key="tag" class="tag">{{
              tag
            }}</span>
          </div>
        </div>
        <div class="bookmark-footer">
          <span class="category-badge">{{
            getCategoryName(bookmark.category)
          }}</span>
          <span class="add-date">{{ bookmark.addDate }}</span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredBookmarks.length === 0" class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>没有找到相关网站</h3>
      <p>尝试调整搜索关键词或选择其他分类</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, CopyDocument, Star } from '@element-plus/icons-vue'

// 分类数据
const categories = [
  { key: 'all', name: '全部', icon: '📁' },
  { key: 'development', name: '开发工具', icon: '💻' },
  { key: 'design', name: '设计资源', icon: '🎨' },
  { key: 'learning', name: '学习教育', icon: '📚' },
  { key: 'productivity', name: '效率工具', icon: '⚡' },
  { key: 'entertainment', name: '娱乐休闲', icon: '🎮' },
  { key: 'news', name: '新闻资讯', icon: '📰' },
  { key: 'social', name: '社交媒体', icon: '👥' }
]

// 当前选中的分类
const activeCategory = ref('all')

// 搜索关键词
const searchQuery = ref('')

// 网址数据
const bookmarks = ref([
  {
    id: 1,
    title: 'GitHub',
    url: 'https://github.com',
    domain: 'github.com',
    description: '全球最大的代码托管平台，开发者的必备工具',
    favicon: 'https://github.com/favicon.ico',
    category: 'development',
    tags: ['代码托管', 'Git', '开源'],
    favorite: true,
    addDate: '2024-01-15'
  },
  {
    id: 2,
    title: 'Vue.js',
    url: 'https://vuejs.org',
    domain: 'vuejs.org',
    description: '渐进式JavaScript框架，用于构建用户界面',
    favicon: 'https://vuejs.org/logo.svg',
    category: 'development',
    tags: ['前端框架', 'JavaScript', 'Vue'],
    favorite: true,
    addDate: '2024-01-16'
  },
  {
    id: 3,
    title: 'Figma',
    url: 'https://figma.com',
    domain: 'figma.com',
    description: '协作式界面设计工具，支持实时协作和原型制作',
    favicon: 'https://static.figma.com/app/icon/1/favicon.png',
    category: 'design',
    tags: ['UI设计', '原型', '协作'],
    favorite: false,
    addDate: '2024-01-17'
  },
  {
    id: 4,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    domain: 'developer.mozilla.org',
    description: 'Web开发者的权威文档和学习资源',
    favicon: 'https://developer.mozilla.org/favicon-48x48.png',
    category: 'learning',
    tags: ['文档', 'Web开发', '学习'],
    favorite: true,
    addDate: '2024-01-18'
  },
  {
    id: 5,
    title: 'Notion',
    url: 'https://notion.so',
    domain: 'notion.so',
    description: '集笔记、知识库、项目管理于一体的全能工作空间',
    favicon: 'https://www.notion.so/images/favicon.ico',
    category: 'productivity',
    tags: ['笔记', '项目管理', '协作'],
    favorite: false,
    addDate: '2024-01-19'
  },
  {
    id: 6,
    title: 'Unsplash',
    url: 'https://unsplash.com',
    domain: 'unsplash.com',
    description: '高质量免费图片素材库，摄影师作品分享平台',
    favicon: 'https://unsplash.com/favicon-32x32.png',
    category: 'design',
    tags: ['图片素材', '摄影', '免费'],
    favorite: false,
    addDate: '2024-01-20'
  },
  {
    id: 7,
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    domain: 'stackoverflow.com',
    description: '程序员问答社区，解决编程问题的最佳平台',
    favicon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico',
    category: 'development',
    tags: ['问答', '编程', '社区'],
    favorite: true,
    addDate: '2024-01-21'
  },
  {
    id: 8,
    title: 'Coursera',
    url: 'https://coursera.org',
    domain: 'coursera.org',
    description: '在线学习平台，提供世界顶级大学和公司的课程',
    favicon:
      'https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/favicon-32x32.png',
    category: 'learning',
    tags: ['在线教育', '课程', '认证'],
    favorite: false,
    addDate: '2024-01-22'
  },
  {
    id: 9,
    title: 'Dribbble',
    url: 'https://dribbble.com',
    domain: 'dribbble.com',
    description: '设计师作品展示和灵感分享平台',
    favicon:
      'https://cdn.dribbble.com/assets/favicon-b38525134603b7b47b8b2b0b1e0e7e7b.ico',
    category: 'design',
    tags: ['设计灵感', '作品展示', '设计师'],
    favorite: false,
    addDate: '2024-01-23'
  },
  {
    id: 10,
    title: 'Trello',
    url: 'https://trello.com',
    domain: 'trello.com',
    description: '基于看板的项目管理工具，简单直观的任务管理',
    favicon: 'https://trello.com/favicon.ico',
    category: 'productivity',
    tags: ['项目管理', '看板', '团队协作'],
    favorite: false,
    addDate: '2024-01-24'
  }
])

// 过滤后的书签
const filteredBookmarks = computed(() => {
  let filtered = bookmarks.value

  // 按分类过滤
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(
      (bookmark) => bookmark.category === activeCategory.value
    )
  }

  // 按搜索关键词过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(query) ||
        bookmark.description.toLowerCase().includes(query) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// 获取分类名称
const getCategoryName = (categoryKey: string) => {
  const category = categories.find((cat) => cat.key === categoryKey)
  return category ? category.name : categoryKey
}

// 获取分类数量
const getCategoryCount = (categoryKey: string) => {
  if (categoryKey === 'all') {
    return bookmarks.value.length
  }
  return bookmarks.value.filter((bookmark) => bookmark.category === categoryKey)
    .length
}

// 打开网站
const openWebsite = (url: string) => {
  window.open(url, '_blank')
}

// 复制链接
const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    ElMessage.success('链接已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败，请手动复制')
  }
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzY2N0VFQSIvPgo8cGF0aCBkPSJNMTYgMjJDMTkuMzEzNyAyMiAyMiAxOS4zMTM3IDIyIDE2QzIyIDEyLjY4NjMgMTkuMzEzNyAxMCAxNiAxMEMxMi42ODYzIDEwIDEwIDEyLjY4NjMgMTAgMTZDMTAgMTkuMzEzNyAxMi42ODYzIDIyIDE2IDIyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=='
}
</script>

<style scoped>
.bookmarks-container {
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.bookmarks-header {
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

/* 科技风格主题样式 */
html.theme-tech .bookmarks-container {
  background: transparent;
}

html.theme-tech .page-title {
  color: #00ffff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
}

html.theme-tech .search-box {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #c0c0c0;
  box-shadow: 0 0 15px rgba(0, 194, 255, 0.1);
}

html.theme-tech .search-box::placeholder {
  color: #a0a0a0;
}

html.theme-tech .search-box:focus {
  border-color: rgba(0, 255, 255, 0.6);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.3);
}

html.theme-tech .category-tags .category-tag {
  background: rgba(0, 194, 255, 0.2);
  color: #c0c0c0;
  border: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 194, 255, 0.1);
}

html.theme-tech .category-tags .category-tag:hover {
  background: rgba(0, 255, 255, 0.3);
  border-color: rgba(0, 255, 255, 0.5);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

html.theme-tech .category-tags .category-tag.active {
  background: #00ffff;
  color: white;
  border-color: #00ffff;
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
}

html.theme-tech .bookmark-card {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
  color: #e2e8f0;
}

html.theme-tech .bookmark-card::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  );
}

html.theme-tech .bookmark-card:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 255, 255, 0.3);
  transform: translateY(-10px);
}

html.theme-tech .bookmark-title {
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

html.theme-tech .bookmark-description {
  color: #c0c0c0;
}

html.theme-tech .bookmark-url {
  color: #a0a0a0;
}

html.theme-tech .bookmark-tags .tag {
  background: rgba(0, 194, 255, 0.2);
  color: #c0c0c0;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

html.theme-tech .bookmark-tags .tag:hover {
  background: rgba(0, 255, 255, 0.3);
  border-color: rgba(0, 255, 255, 0.5);
}

html.theme-tech .empty-state {
  color: #c0c0c0;
}

html.theme-tech .empty-icon {
  color: #00ffff;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

/* 樱花风格主题 */
:global(.theme-sakura) .bookmarks-container {
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
:global(.theme-ink) .bookmarks-container {
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

/* 搜索区域 */
.search-section {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  border-radius: 25px;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.category-tab {
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  position: relative;
  overflow: hidden;
}

.category-tab::before {
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

.category-tab:hover::before {
  left: 100%;
}

.category-tab:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.category-tab.active {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* 科技风格分类标签 */
html.theme-tech .category-tab {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
  color: #e2e8f0;
}

html.theme-tech .category-tab::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  );
}

html.theme-tech .category-tab:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
}

html.theme-tech .category-tab.active {
  background: rgba(0, 255, 255, 0.3);
  border-color: rgba(0, 255, 255, 0.5);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
}

/* 樱花风格分类标签 */
:global(.theme-sakura) .category-tab {
  background: rgba(139, 21, 56, 0.1);
  border: 1px solid rgba(139, 21, 56, 0.2);
  color: #8b1538;
}

:global(.theme-sakura) .category-tab::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(139, 21, 56, 0.1),
    transparent
  );
}

:global(.theme-sakura) .category-tab:hover {
  background: rgba(139, 21, 56, 0.2);
  box-shadow: 0 10px 30px rgba(139, 21, 56, 0.3);
}

:global(.theme-sakura) .category-tab.active {
  background: rgba(139, 21, 56, 0.3);
  border-color: rgba(139, 21, 56, 0.5);
  box-shadow: 0 10px 30px rgba(139, 21, 56, 0.4);
}

/* 水墨风格分类标签 */
:global(.theme-ink) .category-tab {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.2);
  color: #2c3e50;
}

:global(.theme-ink) .category-tab::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(44, 62, 80, 0.1),
    transparent
  );
}

:global(.theme-ink) .category-tab:hover {
  background: rgba(44, 62, 80, 0.2);
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.3);
}

:global(.theme-ink) .category-tab.active {
  background: rgba(44, 62, 80, 0.3);
  border-color: rgba(44, 62, 80, 0.5);
  box-shadow: 0 10px 30px rgba(44, 62, 80, 0.4);
}

.count {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* 书签网格 */
.bookmarks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.bookmark-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.bookmark-card::before {
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

.bookmark-card:hover::before {
  left: 100%;
}

.bookmark-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.bookmark-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.bookmark-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.bookmark-icon img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
}

.bookmark-info {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 2;
}

.bookmark-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
  line-height: 1.3;
  position: relative;
  z-index: 2;
}

.bookmark-url {
  font-size: 0.9rem;
  color: #718096;
  margin: 0;
  position: relative;
  z-index: 2;
}

.bookmark-actions {
  display: flex;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #2d3748;
}

.action-btn.favorite.active {
  color: #f6ad55;
}

.bookmark-content {
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.bookmark-description {
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  position: relative;
  z-index: 2;
}

.bookmark-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.bookmark-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  position: relative;
  z-index: 2;
}

.category-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.add-date {
  color: #a0aec0;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 1rem;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .bookmarks-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .bookmarks-grid {
    grid-template-columns: 1fr;
  }

  .category-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .category-tab {
    white-space: nowrap;
  }

  .bookmark-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  .bookmark-actions {
    align-self: flex-end;
  }
}
</style> 