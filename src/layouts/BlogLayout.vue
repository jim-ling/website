<template>
  <div class="blog-layout">
    <!-- 顶部导航栏 -->
    <TopNavBar />
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 悬浮导航球 -->
    <FloatingNav />
  </div>
</template>

<script lang="ts" setup>
import TopNavBar from '@/components/TopNavBar/index.vue'
import FloatingNav from '@/components/FloatingNav/index.vue'
</script>

<style scoped>
.blog-layout {
  min-height: 100vh;
  position: relative;
}

.main-content {
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  padding-top: 70px; /* 为顶部导航栏留出空间 */
}

/* 确保内容不被悬浮导航遮挡 */
@media (max-width: 768px) {
  .main-content {
    padding-top: 60px;
    padding-bottom: 100px;
  }
}
</style> 