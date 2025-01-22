import type { RouteRecordRaw } from 'vue-router'
import { routerConfig } from '@/router/config'
import { isWhiteList } from '@/router/whitelist'
import { getToken } from '@/store/cache/cookies'
import { usePermissionStore } from '@/store/pinia/permission'
import { useUserStore } from '@/store/pinia/user'
import { createRouter } from 'vue-router'
const Layouts = () => import("@/layouts/index.vue")
/**
 * @name 常驻路由
 * @description 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置唯一的 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Layouts,
        children: [
            {
                path: ':path(.*)',
                component: () => import("@/pages/dashboard/index.vue")
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
    },
    {
        path: '/login',
        component: () => import('@/pages/login/index.vue'),
        meta: {
            hidden: true
        }
    }
]
// 左侧菜单路由
export const leftBarRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Layouts,
        // redirect: "/dashboard",
        children: [
          {
            path: "Home",
            component: () => import("@/pages/my-show/index.vue"),
            name: "Dashboard",
            meta: {
              title: "首页",
              svgIcon: "dashboard",
              affix: true
            }
          }
        ]
    },
    {
        path: '/user',
        component: Layouts,
        name: "Demo",
        redirect: "/",
        meta: {
          title: "用户管理",
          elIcon: "DataBoard"
        },
        children: [
            {
                path: 'list',
                name: 'list',
                meta: {
                    title: '用户列表',
                    icon: 'dashboard',
                    roles: ['admin', 'editor']
                },
                component: () => import('@/pages/error/403.vue')
            },
            {
                path: 'error',
                name: 'error',
                meta: {
                    title: '999',
                    icon: 'dashboard',
                    roles: ['admin', 'editor']
                },
                component: () => import('@/pages/error/404.vue')
            }
        ]
    },
    {
        path: '/file',
        component: Layouts,
        name: "File",
        redirect: "/file",
        meta: {
          title: "文件管理",
          elIcon: "DataBoard"
        },
        children: [
            {
                path: 'upload',
                name: 'upload',
                meta: {
                    title: '文件上传'
                },
                component: () => import('@/pages/aws-s3/upload.vue')
            }, {
                path: 'view',
                name: 'view',
                meta: {
                    title: '文件查询'
                },
                component: () => import('@/pages/aws-s3/upload.vue')
            }
        ]
    }
]


/** 路由实例 */
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
    // 如果没有登陆
    if (!getToken()) {
        // 如果在免登录的白名单中，则直接进入
        if (isWhiteList(to)) return true
        // 其他没有访问权限的页面将被重定向到登录页面
        return '/login'
    }
    // 如果已经登录，并准备进入 Login 页面，则重定向到主页
    if (to.path === "/login") return "/"
    // 如果用户已经获得其权限角色
    if (userStore.roles.length !== 0) return true
    // 否则要重新获取权限角色
    try {
        await userStore.getInfo()
        // 注意：角色必须是一个数组！ 例如: ["admin"] 或 ["developer", "editor"]
        const roles = userStore.roles
        // 生成可访问的 Routes
        routerConfig.dynamic ? permissionStore.setRoutes(roles) : permissionStore.setAllRoutes()
        // 将 "有访问权限的动态路由" 添加到 Router 中
        permissionStore.addRoutes.forEach(route => router.addRoute(route))
        // 设置 replace: true, 因此导航将不会留下历史记录
        return { ...to, replace: true }
    } catch (error) {
        // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
        userStore.resetToken()
        ElMessage.error((error as Error).message || '路由守卫发生错误')
        return '/login'
    }
})

// 全局后置钩子
//   router.afterEach((to) => {
//     setRouteChange(to)
//     setTitle(to.meta.title)
//     NProgress.done()
//   })
