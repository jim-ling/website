<template>
  <div class="article-container">
    <div class="article-header">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item @click="$router.push('/')"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item @click="$router.push('/blog')"
            >博客</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ article?.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div v-if="article" class="article-content">
      <!-- 文章头部 -->
      <div class="article-meta">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-info">
          <div class="info-left">
            <span class="author">
              <el-icon><User /></el-icon>
              {{ article.author }}
            </span>
            <span class="date">
              <el-icon><Calendar /></el-icon>
              {{ formatDate(article.publishDate) }}
            </span>
            <span class="read-time">
              <el-icon><Clock /></el-icon>
              {{ article.readTime }} 分钟阅读
            </span>
          </div>
          <div class="info-right">
            <span class="category">{{
              getCategoryName(article.category)
            }}</span>
          </div>
        </div>
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{
            tag
          }}</span>
        </div>
      </div>

      <!-- 文章封面 -->
      <div v-if="article.cover" class="article-cover">
        <img :src="article.cover" :alt="article.title" />
      </div>

      <!-- 文章摘要 -->
      <div class="article-summary">
        <p>{{ article.summary }}</p>
      </div>

      <!-- 文章正文 -->
      <div class="article-body">
        <div v-html="article.content"></div>
      </div>

      <!-- 文章统计 -->
      <div class="article-stats">
        <div class="stat-item">
          <el-icon><View /></el-icon>
          <span>{{ article.views }} 次阅读</span>
        </div>
        <div class="stat-item">
          <el-icon><ChatDotRound /></el-icon>
          <span>{{ article.comments }} 条评论</span>
        </div>
        <div
          class="stat-item like-btn"
          :class="{ liked: isLiked }"
          @click="toggleLike"
        >
          <el-icon><Star /></el-icon>
          <span>{{ article.likes }} 个赞</span>
        </div>
      </div>

      <!-- 分享按钮 -->
      <div class="share-section">
        <h3>分享文章</h3>
        <div class="share-buttons">
          <button class="share-btn weibo" @click="shareToWeibo">
            <i class="icon">🐦</i> 微博
          </button>
          <button class="share-btn wechat" @click="shareToWechat">
            <i class="icon">💬</i> 微信
          </button>
          <button class="share-btn qq" @click="shareToQQ">
            <i class="icon">🐧</i> QQ
          </button>
          <button class="share-btn copy" @click="copyLink">
            <i class="icon">🔗</i> 复制链接
          </button>
        </div>
      </div>

      <!-- 相关文章推荐 -->
      <div class="related-articles">
        <h3>相关文章</h3>
        <div class="related-list">
          <div
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
            class="related-item"
            @click="goToArticle(relatedArticle.id)"
          >
            <div class="related-image">
              <img :src="relatedArticle.cover" :alt="relatedArticle.title" />
            </div>
            <div class="related-content">
              <h4>{{ relatedArticle.title }}</h4>
              <p>{{ relatedArticle.summary }}</p>
              <div class="related-meta">
                <span>{{ formatDate(relatedArticle.publishDate) }}</span>
                <span>{{ relatedArticle.readTime }} 分钟</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else class="loading-state">
      <el-icon class="loading-icon"><Loading /></el-icon>
      <p>文章加载中...</p>
    </div>

    <!-- 返回顶部按钮 -->
    <el-backtop :right="50" :bottom="50" />
  </div>
</template>

<script lang="ts" setup>
import blueImage from '@/assets/images/blue.png'

// 定义文章类型
interface Article {
  id: number
  title: string
  summary: string
  content: string
  cover: string
  category: string
  tags: string[]
  publishDate: string
  readTime: number
  views: number
  comments: number
  likes: number
  author: string
}

const route = useRoute()
const router = useRouter()

// 响应式数据
const article = ref<Article | null>(null)
const isLiked = ref(false)

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

// 模拟文章数据
const articles = [
  {
    id: 1,
    title: 'Vue 3 Composition API 深度解析',
    summary:
      '深入探讨 Vue 3 Composition API 的设计理念、使用方法和最佳实践，帮助开发者更好地理解和应用这一新特性。',
    content: `
      <h2>引言</h2>
      <p>Vue 3 带来了许多令人兴奋的新特性，其中最重要的就是 Composition API。这个新的 API 为我们提供了一种更灵活、更强大的方式来组织和复用组件逻辑。</p>
      
      <h2>什么是 Composition API</h2>
      <p>Composition API 是 Vue 3 中引入的一套新的 API，它允许我们使用函数的方式来定义组件的逻辑。与传统的 Options API 相比，Composition API 提供了更好的逻辑复用、更清晰的代码组织和更好的 TypeScript 支持。</p>
      
      <h3>核心概念</h3>
      <ul>
        <li><strong>setup 函数</strong>：组件的入口点，所有的组合式 API 都在这里使用</li>
        <li><strong>响应式引用</strong>：ref() 和 reactive() 用于创建响应式数据</li>
        <li><strong>计算属性</strong>：computed() 用于创建计算属性</li>
        <li><strong>侦听器</strong>：watch() 和 watchEffect() 用于侦听数据变化</li>
      </ul>
      
      <h2>基础用法</h2>
      <p>让我们从一个简单的例子开始：</p>
      
      <pre><code class="language-javascript">
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式状态
    const count = ref(0)
    const name = ref('Vue 3')
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 生命周期钩子
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 返回模板需要的数据和方法
    return {
      count,
      name,
      doubleCount,
      increment
    }
  }
}
      </code></pre>
      
      <h2>高级特性</h2>
      
      <h3>1. 逻辑复用</h3>
      <p>Composition API 最大的优势之一就是逻辑复用。我们可以将相关的逻辑提取到可复用的组合式函数中：</p>
      
      <pre><code class="language-javascript">
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}
      </code></pre>
      
      <h3>2. 响应式系统深入</h3>
      <p>Vue 3 的响应式系统基于 Proxy，提供了更好的性能和更完整的拦截能力：</p>
      
      <ul>
        <li><code>ref()</code>：用于基本类型的响应式包装</li>
        <li><code>reactive()</code>：用于对象的响应式包装</li>
        <li><code>readonly()</code>：创建只读的响应式对象</li>
        <li><code>toRefs()</code>：将响应式对象转换为普通对象，其中每个属性都是 ref</li>
      </ul>
      
      <h2>最佳实践</h2>
      
      <h3>1. 组织代码</h3>
      <p>使用 Composition API 时，建议按功能而不是按选项类型来组织代码：</p>
      
      <pre><code class="language-javascript">
export default {
  setup() {
    // 用户相关逻辑
    const { user, login, logout } = useUser()
    
    // 购物车相关逻辑
    const { cart, addToCart, removeFromCart } = useCart()
    
    // 搜索相关逻辑
    const { searchQuery, searchResults, search } = useSearch()
    
    return {
      user, login, logout,
      cart, addToCart, removeFromCart,
      searchQuery, searchResults, search
    }
  }
}
      </code></pre>
      
      <h3>2. TypeScript 支持</h3>
      <p>Composition API 与 TypeScript 配合得非常好：</p>
      
      <pre><code class="language-typescript">
import { ref, computed, Ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export function useUser() {
  const user: Ref&lt;User | null&gt; = ref(null)
  const isLoggedIn = computed(() =&gt; user.value !== null)
  
  const login = async (email: string, password: string): Promise&lt;void&gt; =&gt; {
    // 登录逻辑
  }
  
  return {
    user: readonly(user),
    isLoggedIn,
    login
  }
}
      </code></pre>
      
      <h2>总结</h2>
      <p>Composition API 为 Vue 3 带来了更强大的逻辑复用能力和更好的 TypeScript 支持。虽然学习曲线可能比 Options API 稍陡一些，但它提供的灵活性和可维护性使得它成为大型项目的理想选择。</p>
      
      <p>在实际开发中，你可以根据项目的复杂度和团队的熟悉程度来选择使用 Options API 还是 Composition API，甚至可以在同一个项目中混合使用两种 API。</p>
    `,
    cover: blueImage,
    category: 'frontend',
    tags: ['Vue 3', 'Composition API', '前端框架'],
    publishDate: '2024-01-15',
    readTime: 8,
    views: 1234,
    comments: 23,
    likes: 89,
    author: '前端开发者'
  },
  {
    id: 2,
    title: 'TypeScript 高级类型系统实战',
    summary:
      '通过实际案例学习 TypeScript 的高级类型特性，包括泛型、条件类型、映射类型等，提升代码的类型安全性。',
    content: `
      <h2>TypeScript 高级类型概述</h2>
      <p>TypeScript 的类型系统非常强大，除了基础类型外，还提供了许多高级类型特性，帮助我们编写更安全、更可维护的代码。</p>
      
      <h2>泛型 (Generics)</h2>
      <p>泛型是 TypeScript 中最重要的特性之一，它允许我们创建可重用的组件。</p>
      
      <pre><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}

// 使用
let output = identity&lt;string&gt;("myString");
let output2 = identity&lt;number&gt;(123);</code></pre>

      <h2>条件类型 (Conditional Types)</h2>
      <p>条件类型允许我们根据条件选择类型，语法类似于三元运算符。</p>
      
      <pre><code>type NonNullable&lt;T&gt; = T extends null | undefined ? never : T;

type Example = NonNullable&lt;string | null&gt;; // string</code></pre>

      <h2>映射类型 (Mapped Types)</h2>
      <p>映射类型允许我们基于现有类型创建新类型。</p>
      
      <pre><code>type Readonly&lt;T&gt; = {
  readonly [P in keyof T]: T[P];
}

type Optional&lt;T&gt; = {
  [P in keyof T]?: T[P];
}</code></pre>

      <h2>实际应用案例</h2>
      <p>让我们通过一个实际的例子来看看如何组合使用这些高级类型特性。</p>
      
      <pre><code>// API 响应类型
interface ApiResponse&lt;T&gt; {
  data: T;
  status: number;
  message: string;
}

// 用户类型
interface User {
  id: number;
  name: string;
  email: string;
}

// 创建用户的参数类型（排除 id）
type CreateUserParams = Omit&lt;User, 'id'&gt;;

// API 函数
async function createUser(params: CreateUserParams): Promise&lt;ApiResponse&lt;User&gt;&gt; {
  // 实现...
}</code></pre>

      <h2>总结</h2>
      <p>掌握 TypeScript 的高级类型特性可以显著提升代码质量和开发效率。建议在实际项目中逐步应用这些特性，积累经验。</p>
    `,
    cover: blueImage,
    category: 'frontend',
    tags: ['TypeScript', '类型系统', '前端'],
    publishDate: '2024-01-20',
    readTime: 12,
    views: 980,
    comments: 15,
    likes: 67,
    author: '博主'
  }
]

// 相关文章
const relatedArticles = computed(() => {
  if (!article.value) return []

  return articles
    .filter(
      (a) =>
        a.id !== article.value!.id && a.category === article.value!.category
    )
    .slice(0, 3)
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

const toggleLike = () => {
  if (!article.value) return

  isLiked.value = !isLiked.value
  if (isLiked.value) {
    article.value.likes++
    ElMessage.success('感谢你的点赞！')
  } else {
    article.value.likes--
  }
}

const shareToWeibo = () => {
  if (!article.value) return

  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(article.value.title)
  window.open(
    `https://service.weibo.com/share/share.php?url=${url}&title=${title}`
  )
}

const shareToWechat = () => {
  ElMessage.info('请使用微信扫码分享')
}

const shareToQQ = () => {
  if (!article.value) return

  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(article.value.title)
  window.open(
    `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`
  )
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    ElMessage.success('链接已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败，请手动复制')
  }
}

const goToArticle = (id: number) => {
  router.push(`/blog/article/${id}`)
}

// 生命周期
onMounted(() => {
  const articleId = parseInt(route.params.id as string)
  article.value = articles.find((a) => a.id === articleId) || null

  if (!article.value) {
    ElMessage.error('文章不存在')
    router.push('/blog')
  }
})
</script>

<style>
.article-container {
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.article-header {
  max-width: 800px;
  margin: 0 auto 2rem;
}

.breadcrumb .el-breadcrumb__item {
  color: #4a5568;
}

.breadcrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #2d3748;
  font-weight: 500;
}

.article-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* 科技风格主题样式 */
html.theme-tech .article-content {
  background: rgba(0, 194, 255, 0.1) !important;
  border: 1px solid rgba(0, 255, 255, 0.3) !important;
  box-shadow: 0 10px 30px rgba(0, 194, 255, 0.1) !important;
}

html.theme-tech .breadcrumb .el-breadcrumb__item {
  color: #c0c0c0 !important;
}

html.theme-tech
  .breadcrumb
  .el-breadcrumb__item:last-child
  .el-breadcrumb__inner {
  color: #00ffff !important;
}

/* 文章头部 */
.article-meta {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

html.theme-tech .article-meta {
  border-bottom-color: rgba(0, 255, 255, 0.3) !important;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1rem;
  line-height: 1.3;
}

html.theme-tech .article-title {
  color: #00ffff !important;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  font-family: 'Courier New', 'Monaco', monospace;
}

.article-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.info-left {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.info-left span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.9rem;
}

html.theme-tech .info-left span {
  color: #c0c0c0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

.category {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

html.theme-tech .category {
  background: #00ffff !important;
  color: #000 !important;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

html.theme-tech .tag {
  background: rgba(0, 194, 255, 0.2) !important;
  color: #c0c0c0 !important;
}

/* 文章封面 */
.article-cover {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 文章摘要 */
.article-summary {
  padding: 2rem;
  background: #f7fafc;
  border-left: 4px solid #667eea;
  margin: 0;
}

html.theme-tech .article-summary {
  background: rgba(0, 194, 255, 0.1) !important;
  border-left-color: #00ffff !important;
}

.article-summary p {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

html.theme-tech .article-summary p {
  color: #c0c0c0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

/* 文章正文 */
.article-body {
  padding: 2rem;
  line-height: 1.8;
  color: #2d3748;
}

html.theme-tech .article-body {
  color: #c0c0c0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

.article-body h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

html.theme-tech .article-body h2 {
  color: #00ffff !important;
  border-bottom-color: rgba(0, 255, 255, 0.3) !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.article-body h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: #4a5568;
}

html.theme-tech .article-body h3 {
  color: #00ffff !important;
}

.article-body p {
  margin-bottom: 1rem;
  text-align: justify;
}

.article-body ul,
.article-body ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.article-body li {
  margin-bottom: 0.5rem;
}

.article-body pre {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

html.theme-tech .article-body pre {
  background: rgba(0, 194, 255, 0.1) !important;
  border-color: rgba(0, 255, 255, 0.3) !important;
}

.article-body code {
  background: #edf2f7;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

html.theme-tech .article-body code {
  background: rgba(0, 194, 255, 0.2) !important;
  color: #87ceeb !important;
}

.article-body pre code {
  background: none;
  padding: 0;
}

/* 文章统计 */
.article-stats {
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

html.theme-tech .article-stats {
  border-top-color: rgba(0, 255, 255, 0.3) !important;
  border-bottom-color: rgba(0, 255, 255, 0.3) !important;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  cursor: pointer;
  transition: color 0.3s ease;
}

html.theme-tech .stat-item {
  color: #c0c0c0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

.stat-item:hover {
  color: #4a5568;
}

html.theme-tech .stat-item:hover {
  color: #00ffff !important;
}

.like-btn.liked {
  color: #e53e3e;
}

html.theme-tech .like-btn.liked {
  color: #00ffff !important;
}

/* 分享区域 */
.share-section {
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

html.theme-tech .share-section {
  border-bottom-color: rgba(0, 255, 255, 0.3) !important;
}

.share-section h3 {
  margin-bottom: 1rem;
  color: #2d3748;
}

html.theme-tech .share-section h3 {
  color: #00ffff !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

.share-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

html.theme-tech .share-btn {
  font-family: 'Courier New', 'Monaco', monospace;
  border: 1px solid rgba(0, 255, 255, 0.3) !important;
}

.share-btn.weibo {
  background: #ff6b6b;
  color: white;
}

.share-btn.wechat {
  background: #51cf66;
  color: white;
}

.share-btn.qq {
  background: #339af0;
  color: white;
}

.share-btn.copy {
  background: #868e96;
  color: white;
}

html.theme-tech .share-btn.weibo,
html.theme-tech .share-btn.wechat,
html.theme-tech .share-btn.qq,
html.theme-tech .share-btn.copy {
  background: rgba(0, 194, 255, 0.1) !important;
  color: #00ffff !important;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

html.theme-tech .share-btn:hover {
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3) !important;
}

/* 相关文章 */
.related-articles {
  padding: 2rem;
}

.related-articles h3 {
  margin-bottom: 1.5rem;
  color: #2d3748;
}

html.theme-tech .related-articles h3 {
  color: #00ffff !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

html.theme-tech .related-item {
  border-color: rgba(0, 255, 255, 0.3) !important;
  background: rgba(0, 255, 255, 0.05) !important;
}

.related-item:hover {
  background: #f7fafc;
  transform: translateY(-2px);
}

html.theme-tech .related-item:hover {
  background: rgba(0, 194, 255, 0.1) !important;
  box-shadow: 0 5px 15px rgba(0, 194, 255, 0.2) !important;
}

.related-image {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-content {
  flex: 1;
}

.related-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

html.theme-tech .related-content h4 {
  color: #00ffff !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

.related-content p {
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

html.theme-tech .related-content p {
  color: #c0c0c0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

.related-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #a0aec0;
}

html.theme-tech .related-meta {
  color: #c0c0c0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #4a5568;
}

html.theme-tech .loading-state {
  color: #c0c0c0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

.loading-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-container {
    padding: 1rem;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .info-left {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .article-meta,
  .article-summary,
  .article-body,
  .share-section,
  .related-articles {
    padding: 1.5rem;
  }

  .article-stats {
    padding: 1rem 1.5rem;
    flex-wrap: wrap;
  }

  .share-buttons {
    justify-content: center;
  }

  .related-item {
    flex-direction: column;
  }

  .related-image {
    width: 100%;
    height: 150px;
  }
}
</style> 