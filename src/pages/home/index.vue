<template>
  <div class="home-container">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="wave">👋</span>
            欢迎来到我的数字世界
          </h1>
          <p class="hero-description">
            这里是我的个人博客，记录技术成长、分享创意作品、收藏精品资源
          </p>
          <div class="hero-tags">
            <span class="tag">前端开发</span>
            <span class="tag">Vue.js</span>
            <span class="tag">TypeScript</span>
            <span class="tag">创意编程</span>
          </div>
          <div class="hero-actions">
            <button class="cta-btn primary" @click="$router.push('/portfolio')">
              <span>查看作品</span>
              <span class="btn-icon">🎨</span>
            </button>
            <button class="cta-btn secondary" @click="$router.push('/blog')">
              <span>阅读博客</span>
              <span class="btn-icon">📝</span>
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="floating-elements">
            <div class="float-item" style="--delay: 0s">💻</div>
            <div class="float-item" style="--delay: 0.5s">🚀</div>
            <div class="float-item" style="--delay: 1s">⚡</div>
            <div class="float-item" style="--delay: 1.5s">🎯</div>
            <div class="float-item" style="--delay: 2s">✨</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特效展示区域 -->
    <section class="effect-section">
      <div class="section-header">
        <h2 class="section-title">✨ 交互特效展示</h2>
        <p class="section-subtitle">点击图片体验破碎重组效果</p>
      </div>
      <div class="effect-container">
        <div class="main-box" @click="imageClickHandler">
          <div id="container"></div>
        </div>
      </div>
    </section>

    <!-- 快速导航卡片 -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">🌟 探索更多</h2>
        <p class="section-subtitle">发现我的数字足迹</p>
      </div>
      <div class="features-grid">
        <div class="feature-card" @click="$router.push('/portfolio')">
          <div class="card-icon">🎨</div>
          <h3 class="card-title">作品展示</h3>
          <p class="card-description">
            查看我的创意作品和项目案例，见证技术与艺术的完美结合
          </p>
          <div class="card-arrow">→</div>
        </div>

        <div class="feature-card" @click="$router.push('/blog')">
          <div class="card-icon">📝</div>
          <h3 class="card-title">技术博客</h3>
          <p class="card-description">
            分享技术心得和学习笔记，记录成长路上的点点滴滴
          </p>
          <div class="card-arrow">→</div>
        </div>

        <div class="feature-card" @click="$router.push('/bookmarks')">
          <div class="card-icon">🔗</div>
          <h3 class="card-title">精品收藏</h3>
          <p class="card-description">
            精心收藏的优质网站和资源，助力高效工作与学习
          </p>
          <div class="card-arrow">→</div>
        </div>

        <div class="feature-card" @click="$router.push('/about')">
          <div class="card-icon">👨‍💻</div>
          <h3 class="card-title">关于我</h3>
          <p class="card-description">
            了解我的技能背景和个人经历，一起探讨技术的无限可能
          </p>
          <div class="card-arrow">→</div>
        </div>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">3+</div>
          <div class="stat-label">年开发经验</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">50+</div>
          <div class="stat-label">项目经验</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">100+</div>
          <div class="stat-label">技术文章</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">10k+</div>
          <div class="stat-label">代码提交</div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

// 简化的特效展示，移除复杂的三角剖分逻辑
const container = ref<HTMLElement | null>(null)
const imageUrl = ref('/src/assets/images/blue.png')

const imageClickHandler = () => {
  // 简单的点击反馈效果
  if (container.value) {
    container.value.style.transform = 'scale(0.95)'
    container.value.style.transition = 'transform 0.15s ease'
    setTimeout(() => {
      if (container.value) {
        container.value.style.transform = 'scale(1)'
      }
    }, 150)
  }
}

onMounted(() => {
  container.value = document.getElementById('container')
  // 添加一个简单的占位图片
  if (container.value) {
    const img = document.createElement('img')
    img.src = imageUrl.value
    img.style.width = '100%'
    img.style.height = 'auto'
    img.style.borderRadius = '10px'
    img.style.cursor = 'pointer'
    container.value.appendChild(img)
  }
})
</script>
  
<style scoped>
.home-container {
  min-height: 100vh;
  background: transparent;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
}

.hero-text {
  color: white;
}

/* 科技风格主题 */
:global(.theme-tech) .home-container {
  background: transparent;
}

:global(.theme-tech) .hero-text {
  color: #00ffff !important;
}

:global(.theme-tech) .hero-title {
  color: #00ffff !important;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  font-weight: bold;
}

:global(.theme-tech) .hero-description {
  color: #e2e8f0 !important;
}

/* 樱花风格主题 */
:global(.theme-sakura) .home-container {
  background: transparent;
}

:global(.theme-sakura) .hero-text {
  color: #8b1538 !important;
}

:global(.theme-sakura) .hero-title {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
  font-weight: bold;
}

:global(.theme-sakura) .hero-description {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 水墨风格主题 */
:global(.theme-ink) .home-container {
  background: transparent;
}

:global(.theme-ink) .hero-text {
  color: #2c3e50 !important;
}

:global(.theme-ink) .hero-title {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
  font-weight: bold;
}

:global(.theme-ink) .hero-description {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

/* 英雄区域 */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: white;
}

.wave {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-10deg);
  }
}

.hero-description {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

/* 科技风格标签 */
:global(.theme-tech) .tag {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #00ffff;
  box-shadow: 0 0 10px rgba(0, 194, 255, 0.2);
}

:global(.theme-tech) .tag:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
  transform: translateY(-2px);
}

/* 樱花风格标签 */
:global(.theme-sakura) .tag {
  background: rgba(255, 105, 180, 0.1);
  border: 1px solid rgba(255, 105, 180, 0.3);
  color: #8b1538;
  font-family: 'KaiTi', 'STKaiti', serif;
}

:global(.theme-sakura) .tag:hover {
  background: rgba(255, 105, 180, 0.2);
  transform: translateY(-2px);
}

/* 水墨风格标签 */
:global(.theme-ink) .tag {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.3);
  color: #2c3e50;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

:global(.theme-ink) .tag:hover {
  background: rgba(44, 62, 80, 0.2);
  transform: translateY(-2px);
}

.tag:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-btn.primary {
  background: white;
  color: #667eea;
}

.cta-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

/* 科技风格按钮 */
:global(.theme-tech) .cta-btn.primary {
  background: linear-gradient(135deg, #00ffff, #ff00ff);
  color: #000;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  font-family: 'Courier New', 'Monaco', monospace;
}

:global(.theme-tech) .cta-btn.primary:hover {
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.6);
  transform: translateY(-3px);
}

:global(.theme-tech) .cta-btn.secondary {
  background: rgba(0, 194, 255, 0.1);
  color: #00ffff;
  border: 2px solid rgba(0, 255, 255, 0.5);
  font-family: 'Courier New', 'Monaco', monospace;
}

:global(.theme-tech) .cta-btn.secondary:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

/* 樱花风格按钮 */
:global(.theme-sakura) .cta-btn.primary {
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  color: white;
  font-family: 'KaiTi', 'STKaiti', serif;
}

:global(.theme-sakura) .cta-btn.secondary {
  background: rgba(255, 105, 180, 0.1);
  color: #8b1538;
  border: 2px solid rgba(255, 105, 180, 0.3);
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 水墨风格按钮 */
:global(.theme-ink) .cta-btn.primary {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

:global(.theme-ink) .cta-btn.secondary {
  background: rgba(44, 62, 80, 0.1);
  color: #2c3e50;
  border: 2px solid rgba(44, 62, 80, 0.3);
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-icon {
  font-size: 1.2rem;
}

/* 英雄视觉区域 */
.hero-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.floating-elements {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
}

.float-item {
  position: absolute;
  font-size: 3rem;
  animation: float 6s ease-in-out infinite;
  animation-delay: var(--delay);
  will-change: transform;
}

/* 科技风格浮动元素 */
:global(.theme-tech) .float-item {
  color: #60a5fa;
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
}

/* 樱花风格浮动元素 */
:global(.theme-sakura) .float-item {
  color: #f43f5e;
  text-shadow: 0 0 10px rgba(251, 113, 133, 0.3);
}

/* 水墨风格浮动元素 */
:global(.theme-ink) .float-item {
  color: #475569;
  text-shadow: 0 0 10px rgba(71, 85, 105, 0.2);
}

.float-item:nth-child(1) {
  top: 20%;
  left: 20%;
}
.float-item:nth-child(2) {
  top: 10%;
  right: 20%;
}
.float-item:nth-child(3) {
  bottom: 30%;
  left: 10%;
}
.float-item:nth-child(4) {
  bottom: 20%;
  right: 10%;
}
.float-item:nth-child(5) {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

/* 通用区块样式 */
.effect-section,
.features-section,
.stats-section {
  padding: 6rem 2rem;
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  color: white;
}

/* 科技风格区块标题 */
:global(.theme-tech) .section-header {
  color: #e2e8f0;
}

:global(.theme-tech) .section-title {
  color: #00ffff !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

/* 樱花风格区块标题 */
:global(.theme-sakura) .section-header {
  color: #8b1538;
}

:global(.theme-sakura) .section-title {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 水墨风格区块标题 */
:global(.theme-ink) .section-header {
  color: #2c3e50;
}

:global(.theme-ink) .section-title {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.section-subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
}

/* 特效展示区域 */
.effect-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

/* 科技风格特效区域 */
:global(.theme-tech) .effect-section {
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(20px);
}

/* 樱花风格特效区域 */
:global(.theme-sakura) .effect-section {
  background: rgba(251, 113, 133, 0.1);
  backdrop-filter: blur(20px);
}

/* 水墨风格特效区域 */
:global(.theme-ink) .effect-section {
  background: rgba(71, 85, 105, 0.1);
  backdrop-filter: blur(20px);
}

.effect-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.main-box {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: auto;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.main-box:hover {
  transform: scale(1.02);
}

#container {
  position: relative;
  width: 100%;
  height: auto;
}

canvas {
  position: absolute;
  opacity: 1;
  transition: all 1s ease;
}

/* 功能卡片 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

/* 科技风格功能卡片 */
:global(.theme-tech) .feature-card {
  background: rgba(0, 194, 255, 0.1);
  border: 1px solid rgba(0, 194, 255, 0.2);
  color: #e2e8f0 !important;
}

:global(.theme-tech) .feature-card:hover {
  background: rgba(0, 194, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 255, 255, 0.3);
}

/* 樱花风格功能卡片 */
:global(.theme-sakura) .feature-card {
  background: rgba(139, 21, 56, 0.1);
  border: 1px solid rgba(139, 21, 56, 0.2);
  color: #8b1538 !important;
}

:global(.theme-sakura) .feature-card:hover {
  background: rgba(139, 21, 56, 0.2);
  box-shadow: 0 20px 60px rgba(139, 21, 56, 0.3);
}

/* 水墨风格功能卡片 */
:global(.theme-ink) .feature-card {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.2);
  color: #2c3e50 !important;
}

:global(.theme-ink) .feature-card:hover {
  background: rgba(44, 62, 80, 0.2);
  box-shadow: 0 20px 60px rgba(44, 62, 80, 0.3);
}

.feature-card::before {
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

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.card-description {
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-arrow {
  font-size: 1.5rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.feature-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(5px);
}

/* 统计数据 */
.stats-section {
  background: rgba(0, 0, 0, 0.1);
}

/* 科技风格统计区域 */
:global(.theme-tech) .stats-section {
  background: rgba(59, 130, 246, 0.1);
}

/* 樱花风格统计区域 */
:global(.theme-sakura) .stats-section {
  background: rgba(251, 113, 133, 0.1);
}

/* 水墨风格统计区域 */
:global(.theme-ink) .stats-section {
  background: rgba(71, 85, 105, 0.1);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 1.5rem;
  border-radius: 20px;
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
  background: rgba(0, 194, 255, 0.1) !important;
  border: 1px solid rgba(0, 194, 255, 0.2) !important;
  color: #e2e8f0 !important;
}

html.theme-tech .stat-item::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 194, 255, 0.1),
    transparent
  ) !important;
}

html.theme-tech .stat-item:hover {
  background: rgba(0, 194, 255, 0.2) !important;
  box-shadow: 0 15px 40px rgba(0, 255, 255, 0.3) !important;
}

html.theme-tech .stat-number {
  color: #00ffff !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

/* 樱花风格统计项 */
html.theme-sakura .stat-item {
  background: rgba(139, 21, 56, 0.1) !important;
  border: 1px solid rgba(139, 21, 56, 0.2) !important;
  color: #8b1538 !important;
}

html.theme-sakura .stat-item::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(139, 21, 56, 0.1),
    transparent
  ) !important;
}

html.theme-sakura .stat-item:hover {
  background: rgba(139, 21, 56, 0.2) !important;
  box-shadow: 0 15px 40px rgba(139, 21, 56, 0.3) !important;
}

html.theme-sakura .stat-number {
  color: #8b1538 !important;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 水墨风格统计项 */
html.theme-ink .stat-item {
  background: rgba(44, 62, 80, 0.1) !important;
  border: 1px solid rgba(44, 62, 80, 0.2) !important;
  color: #2c3e50 !important;
}

html.theme-ink .stat-item::before {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(44, 62, 80, 0.1),
    transparent
  ) !important;
}

html.theme-ink .stat-item:hover {
  background: rgba(44, 62, 80, 0.2) !important;
  box-shadow: 0 15px 40px rgba(44, 62, 80, 0.3) !important;
}

html.theme-ink .stat-number {
  color: #2c3e50 !important;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.stat-label {
  font-size: 1.1rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    padding: 2rem;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 