# 个人博客系统

一个现代化的个人博客网站，采用 Vue 3 + TypeScript + Vite 构建，具有精美的UI设计和流畅的用户体验。

## ✨ 特色功能

### 🎨 现代化设计
- **悬浮导航球**: 替代传统左侧栏，提供更优雅的导航体验
- **顶部导航栏**: 毛玻璃效果，支持滚动时样式变化
- **深色模式**: 自动适配系统主题，支持手动切换
- **响应式布局**: 完美适配桌面端和移动端

### 🏠 首页展示
- **英雄区域**: 个人介绍和技能标签展示
- **交互特效**: 图片破碎重组动画效果
- **功能卡片**: 引导访问各个功能模块
- **统计数据**: 展示个人成就和经验

### 📝 博客系统
- **文章列表**: 支持搜索、分类筛选、标签筛选
- **文章详情**: 完整的阅读体验，支持点赞、分享
- **相关推荐**: 智能推荐相关文章
- **统计信息**: 阅读量、评论数、点赞数

### 🎨 作品展示
- **项目展示**: 分类展示个人作品和项目
- **详情弹窗**: 完整的项目介绍和技术栈
- **在线预览**: 支持项目演示和代码查看
- **筛选功能**: 按分类筛选作品

### 🔗 精品网址
- **网址收藏**: 精心整理的优质网站资源
- **分类管理**: 8个分类，便于查找
- **搜索功能**: 支持网站名称、描述、标签搜索
- **一键操作**: 复制链接、收藏功能

### 👨‍💻 关于我
- **个人简介**: 详细的个人信息和社交链接
- **技能展示**: 可视化技能水平展示
- **工作经历**: 时间线形式的工作经验
- **兴趣爱好**: 个人兴趣和特长展示

## 🛠️ 技术栈

### 核心框架
- **Vue 3.5.13** - 渐进式JavaScript框架
- **TypeScript 5.6.3** - 类型安全的JavaScript超集
- **Vite 6.0.3** - 下一代前端构建工具

### UI组件
- **Element Plus 2.9.0** - Vue 3组件库
- **UnoCSS** - 原子化CSS引擎
- **SCSS** - CSS预处理器

### 状态管理
- **Pinia 2.3.0** - Vue状态管理库
- **Vue Router 4.5.0** - Vue官方路由管理器

### 动画效果
- **GSAP** - 高性能动画库
- **CSS3动画** - 原生CSS动画效果

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
│   ├── FloatingNav/ # 悬浮导航球
│   └── TopNavBar/   # 顶部导航栏
├── layouts/         # 布局组件
│   └── BlogLayout.vue # 博客布局
├── pages/           # 页面组件
│   ├── home/        # 首页
│   ├── portfolio/   # 作品展示
│   ├── blog/        # 博客系统
│   ├── bookmarks/   # 精品网址
│   └── about/       # 关于我
├── router/          # 路由配置
├── store/           # 状态管理
├── styles/          # 全局样式
└── utils/           # 工具函数
```

## 🎯 设计理念

### 用户体验优先
- 简洁直观的界面设计
- 流畅的动画过渡效果
- 快速的页面加载速度
- 优秀的移动端适配

### 现代化技术
- 采用最新的前端技术栈
- 组件化开发模式
- TypeScript类型安全
- 响应式设计原则

### 个性化定制
- 可配置的主题色彩
- 灵活的布局结构
- 丰富的动画效果
- 个性化的内容展示

## 🌟 特色亮点

1. **悬浮导航球**: 创新的导航方式，美观且实用
2. **毛玻璃效果**: 现代化的视觉设计语言
3. **深色模式**: 护眼的暗色主题支持
4. **动画效果**: 丰富的交互动画和过渡效果
5. **响应式设计**: 完美适配各种设备尺寸
6. **性能优化**: 快速的加载速度和流畅的体验

## 📝 更新日志

### v2.0.0 (2024-01-XX)
- 🎨 全新的UI设计，采用悬浮导航球
- 🌙 新增深色模式支持
- 📱 优化移动端体验
- ✨ 增强动画效果和交互体验
- 🔧 重构代码结构，提升可维护性

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📞 联系方式

- 邮箱: your-email@example.com
- GitHub: https://github.com/your-username
- 博客: https://your-blog.com