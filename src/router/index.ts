import type { RouteRecordRaw } from 'vue-router'
import { routerConfig } from '@/router/config'
import { isWhiteList } from '@/router/whitelist'
import { getToken } from '@/store/cache/cookies'
import { usePermissionStore } from '@/store/pinia/permission'
import { useUserStore } from '@/store/pinia/user'
import { createRouter } from 'vue-router'
const BlogLayout = () => import("@/layouts/BlogLayout.vue")
/**
 * @name 常驻路由
 * @description 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置唯一的 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: BlogLayout,
        children: [
            {
                path: '',
                component: () => import("@/pages/home/index.vue"),
                name: "Home",
                meta: {
                    title: "首页"
                }
            }
        ]
    },
    {
        path: '/redirect',
        meta: {
            hidden: true
        },
        children: [
            {
                path: ':path(.*)',
                component: () => import('@/pages/error/403.vue')
            }
        ]
    },
    {
        path: '/403',
        component: () => import('@/pages/error/403.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/404',
        component: () => import('@/pages/error/404.vue'),
        meta: {
            hidden: true
        },
        alias: '/:pathMatch(.*)*'
    }
]

// 个人博客路由
export const leftBarRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: BlogLayout,
        children: [
          {
            path: "",
            component: () => import("@/pages/home/index.vue"),
            name: "HomePage",
            meta: {
              title: "🏠 首页",
              affix: true
            }
          }
        ]
    },
    {
        path: '/portfolio',
        component: BlogLayout,
        children: [
            {
                path: '',
                name: 'Portfolio',
                meta: {
                    title: '🎨 作品展示'
                },
                component: () => import('@/pages/portfolio/index.vue')
            }
        ]
    },
    {
        path: '/blog',
        component: BlogLayout,
        name: "BlogSection",
        meta: {
          title: "📝 个人博客"
        },
        children: [
            {
                path: '',
                name: 'BlogList',
                meta: {
                    title: '博客列表'
                },
                component: () => import('@/pages/blog/index.vue')
            },
            {
                path: 'article/:id',
                name: 'BlogArticle',
                meta: {
                    title: '文章详情',
                    hidden: true
                },
                component: () => import('@/pages/blog/article.vue')
            }
        ]
    },
    {
        path: '/bookmarks',
        component: BlogLayout,
        children: [
            {
                path: '',
                name: 'Bookmarks',
                meta: {
                    title: '🔗 精品网址'
                },
                component: () => import('@/pages/bookmarks/index.vue')
            }
        ]
    },
    {
        path: '/today-meal',
        component: BlogLayout,
        children: [
            {
                path: '',
                name: 'Meal',
                meta: {
                    title: '🥙 吃什么'
                },
                component: () => import('@/pages/today-meal/TodayMeal.vue')
            }
        ]
    },
    {
        path: '/today-luck',
        component: BlogLayout,
        children: [
            {
                path: '',
                name: 'Luck',
                meta: {
                    title: '🥙 今日运势'
                },
                component: () => import('@/pages/today-luck/TodayLuck.vue')
            }
        ]
    },
    {
        path: '/about',
        component: BlogLayout,
        children: [
            {
                path: '',
                name: 'About',
                meta: {
                    title: '👨‍💻 关于我'
                },
                component: () => import('@/pages/about/index.vue')
            }
        ]
    }
]

/** 路由实例 */
export const router = createRouter({
    history: routerConfig.history,
    routes: [...constantRoutes,...leftBarRoutes]
})

/** 重置路由 */
export function resetRouter() {
    try {
        // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
        router.getRoutes().forEach((route) => {
            const { name, meta } = route
            if (name && meta.roles?.length) {
                router.hasRoute(name) && router.removeRoute(name)
            }
        })
    } catch {
        // 强制刷新浏览器也行，只是交互体验不是很好
        location.reload()
    }
}

// 全局前置守卫
router.beforeEach(async (to, _from) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    
    // 个人博客不需要登录验证，直接允许访问
    return true
})

// 全局后置钩子
router.afterEach((to) => {
    // 设置页面标题
    document.title = to.meta.title ? `${to.meta.title} - 个人博客` : '个人博客'
})
