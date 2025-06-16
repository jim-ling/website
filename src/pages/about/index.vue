<template>
  <div class="article-container">
    <!-- 页面头部信息卡片 -->
    <div class="content-card">
      <h2>👨‍💻 关于我</h2>
      <!-- <h1 class="article-title">关于我</h1> -->
      <div class="article-meta">
        <div class="article-info">
          <div class="info-left">
            <span class="author">
              <el-icon><User /></el-icon>
              超级飞行员
            </span>
            <span class="date">
              <el-icon><Calendar /></el-icon>
              20+ 年工作经验
            </span>
            <span class="read-time">
              <el-icon><Clock /></el-icon>
              持续战斗中
            </span>
          </div>
          <div class="info-right">
            <span class="category">个人简介</span>
          </div>
        </div>
        <div class="article-tags">
          <span class="tag">外星人</span>
          <span class="tag">超级胜利对</span>
          <span class="tag">超级飞行员</span>
          <span class="tag">全能</span>
        </div>
      </div>

      <!-- 个人简介摘要 -->
      <div class="article-summary">
        <p>
          热爱技术，追求极致，永远保持学习的心态。专注于现代化Web应用开发，拥有丰富的前端开发经验。
        </p>
      </div>
    </div>

    <!-- 个人介绍卡片 -->
    <div class="content-card">
      <div class="intro-section">
        <div class="intro-content">
          <div class="avatar-section">
            <div class="avatar">
              <img src="/src/assets/images/avatar.png" alt="头像" />
            </div>
            <div class="social-links">
              <a
                href="https://github.com"
                target="_blank"
                class="social-link github"
              >
                <i class="icon">💻</i> GitHub
              </a>
              <a href="mailto:example@email.com" class="social-link email">
                <i class="icon">📧</i> Email
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                class="social-link twitter"
              >
                <i class="icon">🐦</i> Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                class="social-link linkedin"
              >
                <i class="icon">💼</i> LinkedIn
              </a>
            </div>
          </div>

          <div class="intro-text">
            <h2>你好，我是来自超级胜利队核心成员</h2>
            <p>
              为了防止世界被破坏，为了爱与和平，我长期致力于地球的和平与安全。毕业3年却有
              二十多年的丰富工作经验，我主导了多项关键任务，包括外星生命体研究、防卫系统建设以及星际飞行任务支持。
            </p>
            <p>
              我擅长飞行器操控、异星环境适应性开发、外星科技解析等领域，具备极强的实战经验与战略思维。
              同时我也是一名技术探索者，热衷于将先进的太空科技应用到日常任务中，提升团队作战效率和生存能力。
            </p>

            <div class="highlight-stats">
              <div class="stat">
                <div class="stat-number">20+</div>
                <div class="stat-label">年工作经验</div>
              </div>
              <div class="stat">
                <div class="stat-number">50+</div>
                <div class="stat-label">战斗经验</div>
              </div>
              <div class="stat">
                <div class="stat-number">10+</div>
                <div class="stat-label">开源贡献</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能栈卡片 -->
    <div class="content-card">
      <div class="skills-section">
        <h2>🛠️ 技能栈</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <h3>基本技能</h3>
            <div class="skills-list">
              <div
                class="skill-item"
                v-for="skill in frontendSkills"
                :key="skill.name"
              >
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div
                    class="skill-progress"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3>进阶技能</h3>
            <div class="skills-list">
              <div
                class="skill-item"
                v-for="skill in backendSkills"
                :key="skill.name"
              >
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div
                    class="skill-progress"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3>资源与武器</h3>
            <div class="skills-list">
              <div
                class="skill-item"
                v-for="skill in toolSkills"
                :key="skill.name"
              >
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div
                    class="skill-progress"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作经历卡片 -->
    <div class="content-card">
      <div class="experience-section">
        <h2>💼 工作经历</h2>
        <div class="timeline">
          <div
            v-for="(exp, index) in experiences"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="experience-header">
                <h3>{{ exp.position }}</h3>
                <span class="company">{{ exp.company }}</span>
                <span class="period">{{ exp.period }}</span>
              </div>
              <p class="experience-description">{{ exp.description }}</p>
              <div class="experience-achievements">
                <h4>主要成就：</h4>
                <ul>
                  <li
                    v-for="achievement in exp.achievements"
                    :key="achievement"
                  >
                    {{ achievement }}
                  </li>
                </ul>
              </div>
              <div class="experience-tech">
                <span
                  v-for="tech in exp.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教育背景卡片 -->
    <div class="content-card">
      <div class="education-section">
        <h2>🎓 教育背景</h2>
        <div class="education-list">
          <div
            v-for="edu in education"
            :key="edu.school"
            class="education-item"
          >
            <div class="education-icon">🎓</div>
            <div class="education-content">
              <h3>{{ edu.degree }}</h3>
              <p class="school">{{ edu.school }}</p>
              <p class="period">{{ edu.period }}</p>
              <p class="description">{{ edu.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 兴趣爱好卡片 -->
    <div class="content-card">
      <div class="interests-section">
        <h2>🎯 兴趣爱好</h2>
        <div class="interests-grid">
          <div
            v-for="interest in interests"
            :key="interest.name"
            class="interest-item"
          >
            <div class="interest-icon">{{ interest.icon }}</div>
            <h3>{{ interest.name }}</h3>
            <p>{{ interest.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系方式卡片 -->
    <div class="content-card">
      <div class="contact-section">
        <h2>📞 联系我</h2>
        <div class="contact-content">
          <p>
            如果你对我的工作感兴趣，或者想要进行技术交流，欢迎通过以下方式联系我：
          </p>
          <div class="contact-methods">
            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div class="contact-info">
                <h4>邮箱</h4>
                <p>feixingyuan@chaojishenlidui.com</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">💬</div>
              <div class="contact-info">
                <h4>微信</h4>
                <p>feixingyuan_super</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">📱</div>
              <div class="contact-info">
                <h4>电话</h4>
                <p>+86 10086-666666-66</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 个人统计 -->
        <div class="article-stats">
          <div class="stat-item">
            <el-icon><View /></el-icon>
            <span>持续更新中</span>
          </div>
          <div class="stat-item">
            <el-icon><ChatDotRound /></el-icon>
            <span>欢迎交流</span>
          </div>
          <div class="stat-item">
            <el-icon><Star /></el-icon>
            <span>感谢关注</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <el-backtop :right="50" :bottom="50" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  User,
  Calendar,
  Clock,
  View,
  ChatDotRound,
  Star
} from '@element-plus/icons-vue'

// 技能数据
// const frontendSkills = ref([
//   { name: 'Vue.js', level: 90 },
//   { name: 'React', level: 85 },
//   { name: 'TypeScript', level: 88 },
//   { name: 'JavaScript', level: 92 },
//   { name: 'HTML/CSS', level: 95 },
//   { name: 'Webpack', level: 80 }
// ])
// const backendSkills = ref([
//   { name: 'Node.js', level: 75 },
//   { name: 'Express', level: 70 },
//   { name: 'MongoDB', level: 65 },
//   { name: 'MySQL', level: 70 },
//   { name: 'Redis', level: 60 }
// ])
// const toolSkills = ref([
//   { name: 'Git', level: 90 },
//   { name: 'Docker', level: 75 },
//   { name: 'Linux', level: 70 },
//   { name: 'Figma', level: 80 },
//   { name: 'Photoshop', level: 75 }
// ])

const frontendSkills = ref([
  { name: '飞行驾驶技术', level: 95 },
  { name: '飞行器控制编程', level: 90 },
  { name: '外星生物分析', level: 88 },
  { name: '地球防卫系统架构', level: 92 },
  { name: '紧急应对协议设计', level: 90 },
  { name: '星际通讯协议', level: 85 }
])

const backendSkills = ref([
  { name: '外星基因数据库构建', level: 85 },
  { name: '异星环境模拟系统', level: 80 },
  { name: 'AI战术推演引擎', level: 75 },
  { name: '地球防御调度平台', level: 90 },
  { name: '星际能源管理系统', level: 80 }
])

const toolSkills = ref([
  { name: '外星设备逆向工程', level: 90 },
  { name: '星际地图导航系统', level: 85 },
  { name: '宇宙战备资源调度', level: 88 },
  { name: '异星语言识别工具', level: 80 },
  { name: '空间站维护与调试', level: 85 }
])

// 工作经历
const experiences = ref([
  {
    position: '地球和平联合武装部负责人',
    company: '超级胜利队外星人研究基地北京分部',
    period: '2000.03 - 至今',
    description: '负责宇宙和平，保卫家园，研究未知生命体',
    achievements: [
      '主导了外星人解剖、基因组学和基因修饰技术',
      '建立了完善地球防卫系统',
      '指导初级战斗人员的训练',
      '参与多个重要的飞行项目，并且平安落地'
    ],
    technologies: [
      '飞行驾驶技术',
      '飞行理论知识',
      '导航技能​​',
      '应急处理能力​​',
      '通信技能​​',
      '维修技能'
    ]
  }
])

// 教育背景
const education = ref([
  {
    degree: '计算超级技术 超级学位',
    school: '超级胜利大学',
    period: '2017.09 - 2021.06',
    description:
      '主修计算超级技术专业，学习了扎实的超级知识，包括数超级结构、算超级法、操作超级系统、计算超级网络等超级课程。'
  }
])

// 兴趣爱好
const interests = ref([
  {
    name: '开源贡献',
    icon: '💻',
    description: '积极参与开源项目，为社区贡献变身代码'
  },
  {
    name: '技术写作',
    icon: '✍️',
    description: '喜欢分享技术心得，贡献外星人相关文档'
  },
  {
    name: '摄影',
    icon: '📸',
    description: '用镜头记录解剖外星人的美好瞬间，培养审美能力'
  },
  {
    name: '阅读',
    icon: '📚',
    description: '广泛阅读各类技能文章，这样能直接加点自己'
  },
  {
    name: '健身',
    icon: '💪',
    description: '保持规律运动，维持健康的身体状态，方便随时战斗'
  },
  {
    name: '旅行',
    icon: '🌍',
    description: '探索不同的城市和文化，防止地球被入侵'
  }
])
</script>

<style>
.article-container {
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

/* 科技风格主题 */
html.theme-tech .article-container {
  background: transparent;
  color: #c0c0c0;
  font-family: 'Courier New', 'Monaco', monospace;
}

/* 樱花风格主题 */
.theme-sakura .article-container {
  background: transparent;
  color: #8b1538;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 水墨风格主题 */
.theme-ink .article-container {
  background: transparent;
  color: #2c3e50;
  font-family: 'STSong', 'SimSun', 'KaiTi', serif;
}

/* 文章头部 */
.article-header {
  margin-bottom: 2rem;
}

.breadcrumb {
  margin-bottom: 1rem;
}

html.theme-tech .breadcrumb .el-breadcrumb__item {
  color: #c0c0c0 !important;
}

html.theme-tech .breadcrumb .el-breadcrumb__item:hover {
  color: #00ffff !important;
}

/* 内容卡片容器 */
.content-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.15);
}

/* 科技风格内容卡片 */
html.theme-tech .content-card {
  background: rgba(0, 194, 255, 0.1) !important;
  border: 1px solid rgba(0, 194, 255, 0.2) !important;
  box-shadow: 0 20px 60px rgba(0, 255, 255, 0.2) !important;
}

html.theme-tech .content-card:hover {
  box-shadow: 0 25px 70px rgba(0, 255, 255, 0.3) !important;
}

/* 樱花风格内容卡片 */
.theme-sakura .content-card {
  background: rgba(139, 21, 56, 0.1) !important;
  border: 1px solid rgba(139, 21, 56, 0.2) !important;
  box-shadow: 0 20px 60px rgba(139, 21, 56, 0.2) !important;
}

.theme-sakura .content-card:hover {
  box-shadow: 0 25px 70px rgba(139, 21, 56, 0.3) !important;
}

/* 水墨风格内容卡片 */
.theme-ink .content-card {
  background: rgba(44, 62, 80, 0.1) !important;
  border: 1px solid rgba(44, 62, 80, 0.2) !important;
  box-shadow: 0 20px 60px rgba(44, 62, 80, 0.2) !important;
}

.theme-ink .content-card:hover {
  box-shadow: 0 25px 70px rgba(44, 62, 80, 0.3) !important;
}

/* 文章元信息 */
.article-meta {
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

html.theme-tech .article-meta {
  border-bottom-color: rgba(0, 255, 255, 0.3) !important;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

html.theme-tech .article-title {
  color: #00ffff !important;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
  font-family: 'Courier New', 'Monaco', monospace;
}

.article-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
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

/* 内容区域通用样式 */
.intro-section,
.skills-section,
.experience-section,
.education-section,
.interests-section,
.contact-section {
  padding: 2rem;
  line-height: 1.8;
  color: #2d3748;
}

html.theme-tech .intro-section,
html.theme-tech .skills-section,
html.theme-tech .experience-section,
html.theme-tech .education-section,
html.theme-tech .interests-section,
html.theme-tech .contact-section {
  color: #c0c0c0 !important;
  font-family: 'Courier New', 'Monaco', monospace;
}

/* 区块标题 */
.intro-section h2,
.skills-section h2,
.experience-section h2,
.education-section h2,
.interests-section h2,
.contact-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

html.theme-tech .intro-section h2,
html.theme-tech .skills-section h2,
html.theme-tech .experience-section h2,
html.theme-tech .education-section h2,
html.theme-tech .interests-section h2,
html.theme-tech .contact-section h2 {
  color: #00ffff !important;
  border-bottom-color: rgba(0, 255, 255, 0.3) !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

/* 文章统计 */
.article-stats {
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 2rem;
}

html.theme-tech .article-stats {
  border-top-color: rgba(0, 255, 255, 0.3) !important;
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
}

.stat-item:hover {
  color: #667eea;
}

html.theme-tech .stat-item:hover {
  color: #00ffff !important;
}

/* 个人简介区域 */
.intro-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: start;
}

.avatar-section {
  text-align: center;
}

.avatar {
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

html.theme-tech .avatar {
  border-color: rgba(0, 255, 255, 0.3) !important;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3) !important;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  text-decoration: none;
  color: #4a5568;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

html.theme-tech .social-link {
  background: rgba(0, 194, 255, 0.1) !important;
  border-color: rgba(0, 255, 255, 0.2) !important;
  color: #c0c0c0 !important;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

html.theme-tech .social-link:hover {
  background: rgba(0, 194, 255, 0.2) !important;
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2) !important;
  color: #00ffff !important;
}

.intro-text h2 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  border: none;
  padding: 0;
}

html.theme-tech .intro-text h2 {
  color: #00ffff !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.intro-text p {
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: justify;
}

html.theme-tech .intro-text p {
  color: #c0c0c0 !important;
}

.highlight-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.stat {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

html.theme-tech .stat {
  background: rgba(0, 194, 255, 0.1) !important;
  border-color: rgba(0, 255, 255, 0.2) !important;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

html.theme-tech .stat-number {
  color: #00ffff !important;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.stat-label {
  font-size: 0.9rem;
  color: #718096;
}

html.theme-tech .stat-label {
  color: #c0c0c0 !important;
}

/* 技能栈 */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

html.theme-tech .skill-category {
  background: rgba(0, 194, 255, 0.05) !important;
  border-color: rgba(0, 255, 255, 0.1) !important;
}

.skill-category h3 {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 1rem;
  text-align: center;
}

html.theme-tech .skill-category h3 {
  color: #00ffff !important;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-weight: 500;
  color: #2d3748;
}

html.theme-tech .skill-name {
  color: #c0c0c0 !important;
}

.skill-level {
  font-size: 0.9rem;
  color: #718096;
}

html.theme-tech .skill-level {
  color: #00ffff !important;
}

.skill-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

html.theme-tech .skill-bar {
  background: rgba(0, 194, 255, 0.1) !important;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.8s ease;
}

html.theme-tech .skill-progress {
  background: linear-gradient(90deg, #00ffff, #00bfff) !important;
}

/* 工作经历 */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
}

html.theme-tech .timeline::before {
  background: linear-gradient(to bottom, #00ffff, #00bfff) !important;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -1.5rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.1);
}

html.theme-tech .timeline-marker {
  background: #00ffff !important;
  border-color: rgba(0, 255, 255, 0.3) !important;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

html.theme-tech .timeline-content {
  background: rgba(0, 194, 255, 0.05) !important;
  border-color: rgba(0, 255, 255, 0.1) !important;
}

.experience-header {
  margin-bottom: 1rem;
}

.experience-header h3 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

html.theme-tech .experience-header h3 {
  color: #00ffff !important;
}

.company {
  color: #667eea;
  font-weight: 500;
  margin-right: 1rem;
}

html.theme-tech .company {
  color: #00ffff !important;
}

.period {
  color: #718096;
  font-size: 0.9rem;
}

html.theme-tech .period {
  color: #c0c0c0 !important;
}

.experience-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

html.theme-tech .experience-description {
  color: #c0c0c0 !important;
}

.experience-achievements h4 {
  color: #2d3748;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

html.theme-tech .experience-achievements h4 {
  color: #00ffff !important;
}

.experience-achievements ul {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

html.theme-tech .experience-achievements ul {
  color: #c0c0c0 !important;
}

.experience-tech {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

html.theme-tech .tech-tag {
  background: rgba(0, 194, 255, 0.2) !important;
  color: #c0c0c0 !important;
  border-color: rgba(0, 255, 255, 0.3) !important;
}

/* 教育背景 */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.education-item {
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

html.theme-tech .education-item {
  background: rgba(0, 194, 255, 0.05) !important;
  border-color: rgba(0, 255, 255, 0.1) !important;
}

.education-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.education-content h3 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

html.theme-tech .education-content h3 {
  color: #00ffff !important;
}

.school {
  color: #667eea;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

html.theme-tech .school {
  color: #00ffff !important;
}

.education-content .period {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

html.theme-tech .education-content .period {
  color: #c0c0c0 !important;
}

.education-content .description {
  color: #4a5568;
  line-height: 1.6;
}

html.theme-tech .education-content .description {
  color: #c0c0c0 !important;
}

/* 兴趣爱好 */
.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.interest-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

html.theme-tech .interest-item {
  background: rgba(0, 194, 255, 0.05) !important;
  border-color: rgba(0, 255, 255, 0.1) !important;
}

.interest-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

html.theme-tech .interest-item:hover {
  background: rgba(0, 194, 255, 0.1) !important;
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2) !important;
}

.interest-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.interest-item h3 {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

html.theme-tech .interest-item h3 {
  color: #00ffff !important;
}

.interest-item p {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
}

html.theme-tech .interest-item p {
  color: #c0c0c0 !important;
}

/* 联系方式 */
.contact-content p {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
}

html.theme-tech .contact-content p {
  color: #c0c0c0 !important;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

html.theme-tech .contact-item {
  background: rgba(0, 194, 255, 0.05) !important;
  border-color: rgba(0, 255, 255, 0.1) !important;
}

.contact-item:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

html.theme-tech .contact-item:hover {
  background: rgba(0, 194, 255, 0.1) !important;
  box-shadow: 0 5px 20px rgba(0, 255, 255, 0.2) !important;
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contact-info h4 {
  color: #2d3748;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

html.theme-tech .contact-info h4 {
  color: #00ffff !important;
}

.contact-info p {
  color: #4a5568;
  font-size: 0.9rem;
  margin: 0;
}

html.theme-tech .contact-info p {
  color: #c0c0c0 !important;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .article-container {
    max-width: 100%;
    padding: 1.5rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .interests-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .contact-methods {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .article-container {
    padding: 1rem;
  }

  .content-card {
    margin-bottom: 1.5rem;
  }

  .article-meta {
    padding: 1.5rem;
  }

  .article-title {
    font-size: 2rem;
  }

  .article-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .info-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .intro-section,
  .skills-section,
  .experience-section,
  .education-section,
  .interests-section,
  .contact-section {
    padding: 1.5rem;
  }

  .intro-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .social-links {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .highlight-stats {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline::before {
    left: 0.75rem;
  }

  .timeline-marker {
    left: -1.25rem;
  }

  .interests-grid {
    grid-template-columns: 1fr;
  }

  .contact-methods {
    grid-template-columns: 1fr;
  }
}
</style> 