<template>
  <nav class="top-nav" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <!-- Logo区域 -->
      <div class="nav-logo" @click="$router.push('/')">
        <div class="logo-icon">💻</div>
        <div class="logo-text">
          <div class="logo-title">个人博客</div>
          <div class="logo-subtitle">Personal Blog</div>
        </div>
      </div>

      <!-- 导航菜单 -->
      <div class="nav-menu" :class="{ 'mobile-open': isMobileMenuOpen }">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          @click="closeMobileMenu"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text">{{ item.title }}</span>
        </router-link>
      </div>

      <!-- 右侧操作区 -->
      <div class="nav-actions">
        <!-- 主题切换 -->
        <button
          class="action-btn theme-toggle"
          @click="toggleTheme"
          :title="`当前主题: ${
            themes.find((t) => t.key === currentTheme)?.name
          }`"
        >
          <span v-if="currentTheme === 'tech'">🚀</span>
          <span v-else-if="currentTheme === 'sakura'">🌸</span>
          <span v-else>🎨</span>
        </button>

        <!-- 移动端菜单按钮 -->
        <button class="action-btn mobile-menu-btn" @click="toggleMobileMenu">
          <div class="hamburger" :class="{ active: isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <!-- 移动端遮罩 -->
    <div
      v-if="isMobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script lang="ts" setup>
// ===== 主题初始化 - 必须在最开始执行 =====
// 立即执行主题初始化，不依赖任何其他代码
(() => {
  try {
    const savedTheme = localStorage.getItem('theme') || 'tech'
    const validThemes = ['tech', 'sakura', 'ink']
    const currentTheme = validThemes.includes(savedTheme) ? savedTheme : 'tech'

    // 清理所有可能存在的主题类（包括新旧两套主题系统）
    document.documentElement.classList.remove(
      // 新主题系统的类名
      'theme-tech', 'theme-sakura', 'theme-ink',
      // 旧主题系统的类名
      'normal', 'dark', 'dark-blue'
    )
    
    // 添加当前主题类
    document.documentElement.classList.add(`theme-${currentTheme}`)
    
    // 清理旧主题系统的 localStorage 缓存
    localStorage.removeItem('v3-admin-vite-active-theme-name-key')
    
    console.log(`主题初始化完成: theme-${currentTheme}`)
  } catch (error) {
    console.error('主题初始化失败:', error)
    document.documentElement.classList.add('theme-tech')
  }
})()

import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const currentTheme = ref('tech')

// 主题配置
const themes = [
  {
    key: 'tech',
    name: '科技风格',
    icon: '🚀',
    description: '未来科技感'
  },
  {
    key: 'sakura',
    name: '樱花风格',
    icon: '🌸',
    description: '浪漫樱花季'
  },
  {
    key: 'ink',
    name: '水墨风格',
    icon: '🎨',
    description: '中国水墨画'
  }
]

// 从 localStorage 读取当前主题
const savedTheme = localStorage.getItem('theme') || 'tech'
const isValidTheme = themes.some((theme) => theme.key === savedTheme)
currentTheme.value = isValidTheme ? savedTheme : 'tech'

// 导航项配置
const navItems = [
  {
    path: '/',
    title: '首页',
    icon: '🏠'
  },
  {
    path: '/portfolio',
    title: '作品',
    icon: '🎨'
  },
  {
    path: '/blog',
    title: '博客',
    icon: '📝'
  },
  {
    path: '/bookmarks',
    title: '收藏',
    icon: '🔗'
  },
  {
    path: '/about',
    title: '关于',
    icon: '👨‍💻'
  }
]

// 滚动监听
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 移动端菜单控制
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 主题切换
const toggleTheme = () => {
  try {
    const currentIndex = themes.findIndex(
      (theme) => theme.key === currentTheme.value
    )
    const nextIndex = (currentIndex + 1) % themes.length
    const newTheme = themes[nextIndex].key

    // 防止重复切换
    if (newTheme === currentTheme.value) return

    currentTheme.value = newTheme

    // 移除所有主题类（包括新旧两套主题系统）
    const htmlElement = document.documentElement
    htmlElement.classList.remove(
      // 新主题系统的类名
      'theme-tech', 
      'theme-sakura', 
      'theme-ink',
      // 旧主题系统的类名
      'normal',
      'dark',
      'dark-blue'
    )

    // 立即添加新主题类
    htmlElement.classList.add(`theme-${currentTheme.value}`)
    localStorage.setItem('theme', currentTheme.value)
    
    console.log(`主题切换完成: theme-${currentTheme.value}`)
  } catch (error) {
    console.error('主题切换失败:', error)
  }
}

// 监听路由变化，关闭移动端菜单
watch(
  () => route.path,
  () => {
    closeMobileMenu()
  }
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.top-nav.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

/* Logo区域 */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1;
}

.logo-subtitle {
  font-size: 0.7rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.15);
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-text {
  font-size: 0.9rem;
}

/* 右侧操作区 */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.action-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: scale(1.05);
}

.theme-toggle {
  font-size: 1.2rem;
}

.theme-toggle::after {
  content: attr(data-theme);
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  pointer-events: none;
}

.theme-toggle:hover::after {
  opacity: 1;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
}

.hamburger {
  width: 20px;
  height: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* 移动端遮罩 */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    height: 60px;
  }

  .logo-text {
    display: none;
  }

  .nav-menu {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    width: 100%;
    justify-content: center;
    padding: 1rem;
    border-radius: 15px;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .theme-toggle {
    width: 36px;
    height: 36px;
  }
}

/* 主题样式 */
/* 科技风格主题 */
:global(.theme-tech) .top-nav {
  background: rgba(5, 5, 5, 0.95);
  border-bottom-color: rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

:global(.theme-tech) .top-nav.scrolled {
  background: rgba(0, 0, 0, 0.98);
  box-shadow: 0 4px 20px rgba(0, 194, 255, 0.2);
}

:global(.theme-tech) .logo-title {
  color: #00ffff !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  font-family: 'Courier New', 'Monaco', monospace;
  font-weight: bold;
}

:global(.theme-tech) .logo-subtitle {
  color: #e2e8f0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

:global(.theme-tech) .nav-link {
  color: #e2e8f0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

:global(.theme-tech) .nav-link:hover {
  color: #00ffff !important;
  background: rgba(0, 194, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 194, 255, 0.2);
}

:global(.theme-tech) .nav-link.router-link-active {
  color: #00ffff !important;
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

:global(.theme-tech) .action-btn {
  background: rgba(0, 194, 255, 0.1);
  color: #00ffff !important;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

:global(.theme-tech) .action-btn:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
}

:global(.theme-tech) .nav-menu {
  background: rgba(0, 0, 0, 0.98);
}

/* 樱花风格主题 */
:global(.theme-sakura) .top-nav {
  background: rgba(255, 247, 247, 0.9);
  border-bottom-color: rgba(139, 21, 56, 0.3);
  backdrop-filter: blur(10px);
}

:global(.theme-sakura) .top-nav.scrolled {
  background: rgba(255, 247, 247, 0.95);
  box-shadow: 0 4px 20px rgba(139, 21, 56, 0.2);
}

:global(.theme-sakura) .logo-title {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
  font-weight: bold;
}

:global(.theme-sakura) .logo-subtitle {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
}

:global(.theme-sakura) .nav-link {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
}

:global(.theme-sakura) .nav-link:hover {
  color: #8b1538 !important;
  background: rgba(139, 21, 56, 0.1);
}

:global(.theme-sakura) .nav-link.router-link-active {
  color: #8b1538 !important;
  background: rgba(139, 21, 56, 0.2);
}

:global(.theme-sakura) .action-btn {
  background: rgba(139, 21, 56, 0.1);
  color: #8b1538 !important;
  border: 1px solid rgba(139, 21, 56, 0.3);
}

:global(.theme-sakura) .nav-menu {
  background: rgba(255, 247, 247, 0.95);
}

/* 水墨风格主题 */
:global(.theme-ink) .top-nav {
  background: rgba(248, 250, 252, 0.9);
  border-bottom-color: rgba(44, 62, 80, 0.3);
  backdrop-filter: blur(10px);
}

:global(.theme-ink) .top-nav.scrolled {
  background: rgba(248, 250, 252, 0.95);
  box-shadow: 0 4px 20px rgba(44, 62, 80, 0.2);
}

:global(.theme-ink) .logo-title {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
  font-weight: bold;
}

:global(.theme-ink) .logo-subtitle {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

:global(.theme-ink) .nav-link {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

:global(.theme-ink) .nav-link:hover {
  color: #2c3e50 !important;
  background: rgba(44, 62, 80, 0.1);
}

:global(.theme-ink) .nav-link.router-link-active {
  color: #2c3e50 !important;
  background: rgba(44, 62, 80, 0.2);
}

:global(.theme-ink) .action-btn {
  background: rgba(44, 62, 80, 0.1);
  color: #2c3e50 !important;
  border: 1px solid rgba(44, 62, 80, 0.3);
}

:global(.theme-ink) .nav-menu {
  background: rgba(248, 250, 252, 0.95);
}
</style> 