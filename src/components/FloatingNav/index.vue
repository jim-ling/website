<template>
  <div class="floating-nav">
    <!-- 主导航球 -->
    <div 
      class="nav-ball" 
      :class="{ active: isOpen }"
      @click="toggleNav"
    >
      <div class="nav-icon">
        <transition name="icon-rotate" mode="out-in">
          <div v-if="!isOpen" class="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div v-else class="close-icon">×</div>
        </transition>
      </div>
    </div>

    <!-- 导航菜单 -->
    <transition name="nav-expand">
      <div v-if="isOpen" class="nav-menu">
        <div 
          v-for="(item, index) in navItems" 
          :key="item.path"
          class="nav-item"
          :style="{ '--delay': index * 0.1 + 's' }"
          @click="navigateTo(item.path)"
        >
          <div class="nav-item-content">
            <div class="nav-item-icon">{{ item.icon }}</div>
            <div class="nav-item-text">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 背景遮罩 -->
    <transition name="overlay">
      <div v-if="isOpen" class="nav-overlay" @click="closeNav"></div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

// 导航项配置
const navItems = [
  {
    path: '/',
    title: '首页',
    icon: '🏠',
    description: '回到主页'
  },
  {
    path: '/portfolio',
    title: '作品展示',
    icon: '🎨',
    description: '查看我的作品'
  },
  {
    path: '/blog',
    title: '个人博客',
    icon: '📝',
    description: '技术文章分享'
  },
  {
    path: '/bookmarks',
    title: '精品网址',
    icon: '🔗',
    description: '优质资源收藏'
  },
  {
    path: '/about',
    title: '关于我',
    icon: '👨‍💻',
    description: '了解更多信息'
  }
]

const toggleNav = () => {
  isOpen.value = !isOpen.value
}

const closeNav = () => {
  isOpen.value = false
}

const navigateTo = (path: string) => {
  router.push(path)
  closeNav()
}

// 监听路由变化，自动关闭导航
watch(() => router.currentRoute.value.path, () => {
  closeNav()
})
</script>

<style scoped>
.floating-nav {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
}

/* 主导航球 */
.nav-ball {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.nav-ball:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
}

.nav-ball.active {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  transform: scale(1.05);
}

/* 导航图标 */
.nav-icon {
  position: relative;
  width: 24px;
  height: 24px;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 16px;
}

.menu-icon span {
  width: 20px;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.close-icon {
  color: white;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

/* 导航菜单 */
.nav-menu {
  position: absolute;
  bottom: 80px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-item {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  animation: navItemAppear 0.4s ease forwards;
  animation-delay: var(--delay);
}

@keyframes navItemAppear {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.nav-item-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  min-width: 160px;
}

.nav-item-content:hover {
  transform: translateX(8px) scale(1.05);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.nav-item-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.nav-item-text {
  font-weight: 500;
  color: #2d3748;
  white-space: nowrap;
}

/* 背景遮罩 */
.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: -1;
}

/* 动画效果 */
.icon-rotate-enter-active,
.icon-rotate-leave-active {
  transition: all 0.3s ease;
}

.icon-rotate-enter-from {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

.icon-rotate-leave-to {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.nav-expand-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-expand-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.nav-expand-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .floating-nav {
    bottom: 1.5rem;
    left: 1.5rem;
  }
  
  .nav-ball {
    width: 56px;
    height: 56px;
  }
  
  .nav-item-content {
    padding: 0.75rem 1rem;
    min-width: 140px;
  }
  
  .nav-item-text {
    font-size: 0.9rem;
  }
}

/* 主题样式 */
/* 科技风格主题 */
:global(.theme-tech) .nav-ball {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
}

:global(.theme-tech) .nav-ball:hover {
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.6);
}

:global(.theme-tech) .nav-ball.active {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

:global(.theme-tech) .nav-item-content {
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #e2e8f0;
}

:global(.theme-tech) .nav-item-content:hover {
  background: rgba(15, 23, 42, 1);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.2);
}

:global(.theme-tech) .nav-item-text {
  color: #e2e8f0;
}

/* 樱花风格主题 */
:global(.theme-sakura) .nav-ball {
  background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
  box-shadow: 0 8px 32px rgba(251, 113, 133, 0.4);
}

:global(.theme-sakura) .nav-ball:hover {
  box-shadow: 0 12px 40px rgba(251, 113, 133, 0.6);
}

:global(.theme-sakura) .nav-ball.active {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

:global(.theme-sakura) .nav-item-content {
  background: rgba(255, 242, 242, 0.95);
  border: 1px solid rgba(251, 113, 133, 0.3);
  color: #881337;
}

:global(.theme-sakura) .nav-item-content:hover {
  background: rgba(255, 242, 242, 1);
  border-color: rgba(251, 113, 133, 0.5);
  box-shadow: 0 12px 40px rgba(251, 113, 133, 0.2);
}

:global(.theme-sakura) .nav-item-text {
  color: #881337;
}

/* 水墨风格主题 */
:global(.theme-ink) .nav-ball {
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  box-shadow: 0 8px 32px rgba(71, 85, 105, 0.4);
}

:global(.theme-ink) .nav-ball:hover {
  box-shadow: 0 12px 40px rgba(71, 85, 105, 0.6);
}

:global(.theme-ink) .nav-ball.active {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
}

:global(.theme-ink) .nav-item-content {
  background: rgba(248, 250, 252, 0.95);
  border: 1px solid rgba(71, 85, 105, 0.3);
  color: #334155;
}

:global(.theme-ink) .nav-item-content:hover {
  background: rgba(248, 250, 252, 1);
  border-color: rgba(71, 85, 105, 0.5);
  box-shadow: 0 12px 40px rgba(71, 85, 105, 0.2);
}

:global(.theme-ink) .nav-item-text {
  color: #334155;
}
</style> 