import App from '@/App.vue'
import { installPlugins } from '@/plugins'
import { router } from '@/router'
import { createApp } from 'vue'

// css
import 'normalize.css'
import 'nprogress/nprogress.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'vxe-table/lib/style.css'
import '@/assets/styles/index.scss'
import 'virtual:uno.css'

if (typeof (window as any).global === 'undefined') {
    (window as any).global = window
}

const app = createApp(App)

// 安装插件（全局组件、自定义指令等）
installPlugins(app)

const pinia = createPinia()
// 安装 pinia 和 router
app.use(pinia).use(router)

// router 准备就绪后挂载应用
router.isReady().then(() => {
    app.mount('#app')
})
