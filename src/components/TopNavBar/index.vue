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
          <span v-else-if="currentTheme === 'sakura2'">🌺</span>
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
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
// 从localStorage读取当前主题
const currentTheme = ref(localStorage.getItem('theme') || 'tech')

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
    key: 'sakura2',
    name: '樱花2风格',
    icon: '🌺',
    description: '飘落樱花雨'
  },
  {
    key: 'ink',
    name: '水墨风格',
    icon: '🎨',
    description: '中国水墨画'
  }
]

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
  const currentIndex = themes.findIndex(
    (theme) => theme.key === currentTheme.value
  )
  const nextIndex = (currentIndex + 1) % themes.length
  const newTheme = themes[nextIndex].key

  currentTheme.value = newTheme
  localStorage.setItem('theme', newTheme)
  
  // 简单的主题切换：清除所有主题类，添加新主题类
  const html = document.documentElement
  html.classList.remove('theme-tech', 'theme-sakura', 'theme-sakura2', 'theme-ink')
  html.classList.add(`theme-${newTheme}`)
  
  // 清除樱花特效
  clearSakuraEffect()
  
  // 如果是樱花2主题，启动樱花特效
  if (newTheme === 'sakura2') {
    startSakuraEffect()
  }
}

// 清除樱花特效
const clearSakuraEffect = () => {
  const sakuraCanvas = document.getElementById('canvas_sakura')
  if (sakuraCanvas) {
    sakuraCanvas.remove()
  }
}

// 启动樱花特效
const startSakuraEffect = async () => {
  try {
    const { startSakura } = await import('@/components/SakuraEffect/sakura')
    startSakura()
  } catch (error) {
    console.error('Failed to load sakura effect:', error)
  }
}

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'sakura2'
  currentTheme.value = savedTheme
  
  const html = document.documentElement
  html.classList.remove('theme-tech', 'theme-sakura', 'theme-sakura2', 'theme-ink')
  html.classList.add(`theme-${savedTheme}`)
  
  // 如果是樱花2主题，启动樱花特效
  if (savedTheme === 'sakura2') {
    startSakuraEffect()
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
  initTheme() // 初始化主题
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearSakuraEffect()
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
</style>

<style>
/* 主题样式 - 非scoped，确保能正确应用到全局 */
/* 科技风格主题 */
html.theme-tech .top-nav {
  background: rgba(5, 5, 5, 0.95) !important;
  border-bottom-color: rgba(0, 255, 255, 0.3) !important;
  backdrop-filter: blur(10px) !important;
}

html.theme-tech .top-nav.scrolled {
  background: rgba(0, 0, 0, 0.98) !important;
  box-shadow: 0 4px 20px rgba(0, 194, 255, 0.2) !important;
}

html.theme-tech .logo-title {
  color: #00ffff !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5) !important;
  font-family: 'Courier New', 'Monaco', monospace !important;
  font-weight: bold !important;
}

html.theme-tech .logo-subtitle {
  color: #e2e8f0 !important;
  font-family: 'Courier New', 'Monaco', monospace !important;
}

html.theme-tech .nav-link {
  color: #e2e8f0 !important;
  font-family: 'Courier New', 'Monaco', monospace !important;
}

html.theme-tech .nav-link:hover {
  color: #00ffff !important;
  background: rgba(0, 194, 255, 0.1) !important;
  box-shadow: 0 0 10px rgba(0, 194, 255, 0.2) !important;
}

html.theme-tech .nav-link.router-link-active {
  color: #00ffff !important;
  background: rgba(0, 194, 255, 0.2) !important;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3) !important;
}

html.theme-tech .action-btn {
  background: rgba(0, 194, 255, 0.1) !important;
  color: #00ffff !important;
  border: 1px solid rgba(0, 255, 255, 0.3) !important;
}

html.theme-tech .action-btn:hover {
  background: rgba(0, 194, 255, 0.2) !important;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4) !important;
}

html.theme-tech .nav-menu {
  background: rgba(0, 0, 0, 0.98) !important;
}

/* 樱花风格主题 */
html.theme-sakura .top-nav {
  background: rgba(255, 247, 247, 0.9) !important;
  border-bottom-color: rgba(139, 21, 56, 0.3) !important;
  backdrop-filter: blur(10px) !important;
}

html.theme-sakura .top-nav.scrolled {
  background: rgba(255, 247, 247, 0.95) !important;
  box-shadow: 0 4px 20px rgba(139, 21, 56, 0.2) !important;
}

html.theme-sakura .logo-title {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif !important;
  font-weight: bold !important;
}

html.theme-sakura .logo-subtitle {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif !important;
}

html.theme-sakura .nav-link {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif !important;
}

html.theme-sakura .nav-link:hover {
  color: #8b1538 !important;
  background: rgba(139, 21, 56, 0.1) !important;
}

html.theme-sakura .nav-link.router-link-active {
  color: #8b1538 !important;
  background: rgba(139, 21, 56, 0.2) !important;
}

html.theme-sakura .action-btn {
  background: rgba(139, 21, 56, 0.1) !important;
  color: #8b1538 !important;
  border: 1px solid rgba(139, 21, 56, 0.3) !important;
}

html.theme-sakura .nav-menu {
  background: rgba(255, 247, 247, 0.95) !important;
}

/* 水墨风格主题 */
html.theme-ink .top-nav {
  background: rgba(248, 250, 252, 0.9) !important;
  border-bottom-color: rgba(44, 62, 80, 0.3) !important;
  backdrop-filter: blur(10px) !important;
}

html.theme-ink .top-nav.scrolled {
  background: rgba(248, 250, 252, 0.95) !important;
  box-shadow: 0 4px 20px rgba(44, 62, 80, 0.2) !important;
}

html.theme-ink .logo-title {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif !important;
  font-weight: bold !important;
}

html.theme-ink .logo-subtitle {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif !important;
}

html.theme-ink .nav-link {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif !important;
}

html.theme-ink .nav-link:hover {
  color: #2c3e50 !important;
  background: rgba(44, 62, 80, 0.1) !important;
}

html.theme-ink .nav-link.router-link-active {
  color: #2c3e50 !important;
  background: rgba(44, 62, 80, 0.2) !important;
}

html.theme-ink .action-btn {
  background: rgba(44, 62, 80, 0.1) !important;
  color: #2c3e50 !important;
  border: 1px solid rgba(44, 62, 80, 0.3) !important;
}

html.theme-ink .nav-menu {
  background: rgba(248, 250, 252, 0.95) !important;
}

/* 樱花2主题 */
html.theme-sakura2 .top-nav {
  background: rgba(255, 240, 245, 0.9) !important;
  border-bottom-color: rgba(255, 182, 193, 0.3) !important;
  backdrop-filter: blur(15px) !important;
}

html.theme-sakura2 .top-nav.scrolled {
  background: rgba(255, 228, 225, 0.95) !important;
  box-shadow: 0 4px 20px rgba(255, 182, 193, 0.2) !important;
}

html.theme-sakura2 .logo-title {
  color: #d63384 !important;
  text-shadow: 0 0 10px rgba(214, 51, 132, 0.3) !important;
  font-family: 'Georgia', 'Times New Roman', serif !important;
  font-weight: bold !important;
}

html.theme-sakura2 .logo-subtitle {
  color: #6f42c1 !important;
  font-family: 'Georgia', 'Times New Roman', serif !important;
}

html.theme-sakura2 .nav-link {
  color: #495057 !important;
  font-family: 'Georgia', 'Times New Roman', serif !important;
}

html.theme-sakura2 .nav-link:hover {
  color: #d63384 !important;
  background: rgba(214, 51, 132, 0.1) !important;
  box-shadow: 0 2px 8px rgba(255, 182, 193, 0.3) !important;
}

html.theme-sakura2 .nav-link.router-link-active {
  color: #d63384 !important;
  background: rgba(214, 51, 132, 0.15) !important;
  box-shadow: 0 2px 8px rgba(255, 182, 193, 0.4) !important;
}

html.theme-sakura2 .action-btn {
  background: rgba(214, 51, 132, 0.1) !important;
  color: #d63384 !important;
  border: 1px solid rgba(255, 182, 193, 0.3) !important;
}

html.theme-sakura2 .action-btn:hover {
  background: rgba(214, 51, 132, 0.2) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(255, 182, 193, 0.4) !important;
}

html.theme-sakura2 .hamburger span {
  background: #d63384 !important;
}

html.theme-sakura2 .mobile-overlay {
  background: rgba(255, 240, 245, 0.8) !important;
}

/* 樱花2主题的特殊动画效果 */
html.theme-sakura2 .nav-link::before {
  content: '🌺';
  position: absolute;
  left: -20px;
  opacity: 0;
  transition: all 0.3s ease;
  animation: sakura2Float 3s ease-in-out infinite;
}

html.theme-sakura2 .nav-link:hover::before {
  opacity: 1;
  left: -15px;
}

@keyframes sakura2Float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(5deg); }
  50% { transform: translateY(-6px) rotate(-5deg); }
  75% { transform: translateY(-3px) rotate(3deg); }
}

html.theme-sakura2 .page-container {
  background: rgba(255, 240, 245, 0.8) !important;
  backdrop-filter: blur(10px) !important;
}
</style> 