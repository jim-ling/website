<template>
  <div class="about-container">
    <div class="about-header">
      <h1 class="page-title">👨‍💻 关于我</h1>
      <p class="page-subtitle">热爱技术，追求极致，永远保持学习的心态</p>
    </div>

    <!-- 个人简介 -->
    <div class="intro-section">
      <div class="intro-content">
        <div class="avatar-section">
          <div class="avatar">
            <img src="https://via.placeholder.com/200x200/667eea/ffffff?text=Avatar" alt="头像" />
          </div>
          <div class="social-links">
            <a href="https://github.com" target="_blank" class="social-link github">
              <i class="icon">💻</i> GitHub
            </a>
            <a href="mailto:example@email.com" class="social-link email">
              <i class="icon">📧</i> Email
            </a>
            <a href="https://twitter.com" target="_blank" class="social-link twitter">
              <i class="icon">🐦</i> Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" class="social-link linkedin">
              <i class="icon">💼</i> LinkedIn
            </a>
          </div>
        </div>
        
        <div class="intro-text">
          <h2>你好，我是一名前端开发工程师</h2>
          <p>
            我是一名充满热情的前端开发工程师，专注于现代化Web应用开发。
            拥有丰富的Vue.js、React、TypeScript开发经验，热衷于探索新技术，
            追求代码质量和用户体验的完美平衡。
          </p>
          <p>
            在工作中，我注重团队协作，善于沟通，能够快速理解业务需求并转化为技术方案。
            同时，我也是一个终身学习者，持续关注前端技术发展趋势，
            通过博客分享和开源项目贡献来回馈技术社区。
          </p>
          
          <div class="highlight-stats">
            <div class="stat">
              <div class="stat-number">3+</div>
              <div class="stat-label">年开发经验</div>
            </div>
            <div class="stat">
              <div class="stat-number">50+</div>
              <div class="stat-label">项目经验</div>
            </div>
            <div class="stat">
              <div class="stat-number">10+</div>
              <div class="stat-label">开源贡献</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能栈 -->
    <div class="skills-section">
      <h2 class="section-title">🛠️ 技能栈</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <h3>前端框架</h3>
          <div class="skills-list">
            <div class="skill-item" v-for="skill in frontendSkills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="skill-category">
          <h3>后端技术</h3>
          <div class="skills-list">
            <div class="skill-item" v-for="skill in backendSkills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="skill-category">
          <h3>工具与其他</h3>
          <div class="skills-list">
            <div class="skill-item" v-for="skill in toolSkills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工作经历 -->
    <div class="experience-section">
      <h2 class="section-title">💼 工作经历</h2>
      <div class="timeline">
        <div v-for="(exp, index) in experiences" :key="index" class="timeline-item">
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
                <li v-for="achievement in exp.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>
            <div class="experience-tech">
              <span v-for="tech in exp.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教育背景 -->
    <div class="education-section">
      <h2 class="section-title">🎓 教育背景</h2>
      <div class="education-list">
        <div v-for="edu in education" :key="edu.school" class="education-item">
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

    <!-- 兴趣爱好 -->
    <div class="interests-section">
      <h2 class="section-title">🎯 兴趣爱好</h2>
      <div class="interests-grid">
        <div v-for="interest in interests" :key="interest.name" class="interest-item">
          <div class="interest-icon">{{ interest.icon }}</div>
          <h3>{{ interest.name }}</h3>
          <p>{{ interest.description }}</p>
        </div>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="contact-section">
      <h2 class="section-title">📞 联系我</h2>
      <div class="contact-content">
        <p>如果你对我的工作感兴趣，或者想要进行技术交流，欢迎通过以下方式联系我：</p>
        <div class="contact-methods">
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div class="contact-info">
              <h4>邮箱</h4>
              <p>example@email.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">💬</div>
            <div class="contact-info">
              <h4>微信</h4>
              <p>your-wechat-id</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📱</div>
            <div class="contact-info">
              <h4>电话</h4>
              <p>+86 138-0000-0000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 技能数据
const frontendSkills = ref([
  { name: 'Vue.js', level: 90 },
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 88 },
  { name: 'JavaScript', level: 92 },
  { name: 'HTML/CSS', level: 95 },
  { name: 'Webpack', level: 80 }
])

const backendSkills = ref([
  { name: 'Node.js', level: 75 },
  { name: 'Express', level: 70 },
  { name: 'MongoDB', level: 65 },
  { name: 'MySQL', level: 70 },
  { name: 'Redis', level: 60 }
])

const toolSkills = ref([
  { name: 'Git', level: 90 },
  { name: 'Docker', level: 75 },
  { name: 'Linux', level: 70 },
  { name: 'Figma', level: 80 },
  { name: 'Photoshop', level: 75 }
])

// 工作经历
const experiences = ref([
  {
    position: '高级前端开发工程师',
    company: 'ABC科技有限公司',
    period: '2022.03 - 至今',
    description: '负责公司核心产品的前端开发工作，参与产品架构设计和技术选型。',
    achievements: [
      '主导重构了公司主要产品的前端架构，性能提升40%',
      '建立了完善的前端开发规范和CI/CD流程',
      '指导初级开发人员，提升团队整体技术水平',
      '参与多个重要项目的技术攻关，按时交付高质量产品'
    ],
    technologies: ['Vue 3', 'TypeScript', 'Element Plus', 'Vite', 'Docker']
  },
  {
    position: '前端开发工程师',
    company: 'XYZ互联网公司',
    period: '2021.06 - 2022.02',
    description: '参与多个Web应用的开发，负责用户界面设计和交互实现。',
    achievements: [
      '独立完成3个中型项目的前端开发工作',
      '优化页面加载速度，首屏渲染时间减少50%',
      '参与组件库的设计和开发，提升开发效率',
      '协助后端团队进行API设计和联调工作'
    ],
    technologies: ['React', 'JavaScript', 'Ant Design', 'Webpack', 'Jest']
  }
])

// 教育背景
const education = ref([
  {
    degree: '计算机科学与技术 学士学位',
    school: '某某大学',
    period: '2017.09 - 2021.06',
    description: '主修计算机科学与技术专业，学习了扎实的计算机基础知识，包括数据结构、算法、操作系统、计算机网络等核心课程。'
  }
])

// 兴趣爱好
const interests = ref([
  {
    name: '开源贡献',
    icon: '💻',
    description: '积极参与开源项目，为社区贡献代码和文档'
  },
  {
    name: '技术写作',
    icon: '✍️',
    description: '喜欢分享技术心得，在博客和技术社区发表文章'
  },
  {
    name: '摄影',
    icon: '📸',
    description: '用镜头记录生活中的美好瞬间，培养审美能力'
  },
  {
    name: '阅读',
    icon: '📚',
    description: '广泛阅读技术书籍和人文社科类作品，拓展知识面'
  },
  {
    name: '健身',
    icon: '💪',
    description: '保持规律运动，维持健康的身体状态'
  },
  {
    name: '旅行',
    icon: '🌍',
    description: '探索不同的城市和文化，开阔视野'
  }
])
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
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
:global(.theme-tech) .about-container {
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
:global(.theme-sakura) .about-container {
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
:global(.theme-ink) .about-container {
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

/* 个人简介 */
.intro-section {
  max-width: 1000px;
  margin: 0 auto 4rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 科技风格简介区块 */
:global(.theme-tech) .intro-section {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 255, 255, 0.1);
}

:global(.theme-tech) .intro-text h2 {
  color: #00ffff !important;
}

:global(.theme-tech) .intro-text p {
  color: #e2e8f0 !important;
}

:global(.theme-tech) .stat-number {
  color: #00ffff !important;
}

:global(.theme-tech) .stat-label {
  color: #e2e8f0 !important;
}

/* 樱花风格简介区块 */
:global(.theme-sakura) .intro-section {
  background: rgba(139, 21, 56, 0.1);
  border: 1px solid rgba(139, 21, 56, 0.2);
  box-shadow: 0 20px 40px rgba(139, 21, 56, 0.1);
}

:global(.theme-sakura) .intro-text h2 {
  color: #8b1538 !important;
}

:global(.theme-sakura) .intro-text p {
  color: #8b1538 !important;
}

:global(.theme-sakura) .stat-number {
  color: #8b1538 !important;
}

:global(.theme-sakura) .stat-label {
  color: #8b1538 !important;
}

/* 水墨风格简介区块 */
:global(.theme-ink) .intro-section {
  background: rgba(44, 62, 80, 0.1);
  border: 1px solid rgba(44, 62, 80, 0.2);
  box-shadow: 0 20px 40px rgba(44, 62, 80, 0.1);
}

:global(.theme-ink) .intro-text h2 {
  color: #2c3e50 !important;
}

:global(.theme-ink) .intro-text p {
  color: #2c3e50 !important;
}

:global(.theme-ink) .stat-number {
  color: #2c3e50 !important;
}

:global(.theme-ink) .stat-label {
  color: #2c3e50 !important;
}

/* 通用区块样式 */
.skills-section,
.experience-section,
.education-section,
.interests-section,
.contact-section {
  max-width: 1000px;
  margin: 0 auto 4rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
}

/* 技能栈 */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category h3 {
  font-size: 1.3rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
  text-align: center;
}

.skill-item {
  margin-bottom: 1.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 500;
  color: #2d3748;
}

.skill-level {
  color: #667eea;
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 1s ease;
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
  background: #e2e8f0;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 3px #e2e8f0;
}

.timeline-content {
  background: #f7fafc;
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid #667eea;
}

.experience-header {
  margin-bottom: 1rem;
}

.experience-header h3 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.company {
  color: #667eea;
  font-weight: 600;
  margin-right: 1rem;
}

.period {
  color: #718096;
  font-size: 0.9rem;
}

.experience-description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.experience-achievements h4 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.experience-achievements ul {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.experience-tech {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-tag {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

/* 教育背景 */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.education-item {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 15px;
  border-left: 4px solid #667eea;
}

.education-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.education-content h3 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.school {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.period {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.description {
  color: #4a5568;
  line-height: 1.6;
}

/* 兴趣爱好 */
.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.interest-item {
  text-align: center;
  padding: 2rem;
  background: #f7fafc;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.interest-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.interest-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.interest-item h3 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.interest-item p {
  color: #4a5568;
  line-height: 1.5;
}

/* 联系方式 */
.contact-content p {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 15px;
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contact-info h4 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.contact-info p {
  color: #667eea;
  font-weight: 600;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .intro-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .avatar-section {
    order: -1;
  }
  
  .social-links {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .highlight-stats {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline {
    padding-left: 1rem;
  }
  
  .timeline-marker {
    left: -1.5rem;
  }
  
  .timeline-content {
    padding: 1.5rem;
  }
  
  .education-item {
    flex-direction: column;
    text-align: center;
  }
  
  .interests-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
}
</style> 