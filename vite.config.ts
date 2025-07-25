import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import SvgComponent from 'unplugin-svg-component/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import svgLoader from 'vite-svg-loader'
import { tr } from 'element-plus/es/locales.mjs'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 支持 JSX、TSX 语法
        vueJsx(),
        // 支持将 SVG 文件导入为 Vue 组件
        svgLoader({ defaultImport: 'url' }),
        // 自动生成 SvgIcon 组件和 SVG 雪碧图
        SvgComponent({
            iconDir: [resolve(__dirname, 'src/assets/icons')],
            preserveColor: resolve(__dirname, 'src/assets/icons/preserve-color'),
            dts: true,
            dtsDir: resolve(__dirname, 'types/auto')
        }),
        // 原子化 CSS
        UnoCSS(),
        // 自动按需导入 API
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            dts: 'types/auto/auto-imports.d.ts',
            resolvers: [ElementPlusResolver()]
        }),
        // 自动按需导入组件
        Components({
            dts: 'types/auto/components.d.ts',
            resolvers: [ElementPlusResolver()]
        })

    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/theme/variables.scss" as vars;`
            }
        }
    },
    server: {
        port: 5173, // 端口号
        // 端口被占用时，是否直接退出
        strictPort: false,
        // 是否自动打开浏览器
        open: true,
        host: true,
        // 是否允许跨域
        cors: true,
        proxy: {
            '/aws-s3': {
                target: 'https://phizoss-test-assets.s3.sa-east-1.amazonaws.com', // 替换为你的第三方云存储地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/aws-s3/, ''),
                headers: {
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
                }
            }
        },
        // 预热常用文件，提高初始页面加载速度
        warmup: {
            clientFiles: [
            "./src/layouts/**/*.*",
            "./src/router/**/*.*"
            ]
        }
    },
    // 构建配置
    build: {
        // 自定义底层的 Rollup 打包配置
        rollupOptions: {
            output: {
            /**
             * @name 分块策略
            * @description 1. 注意这些包名必须存在，否则打包会报错
            * @description 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
            */
            manualChunks: {
                vue: ["vue", "vue-router", "pinia"],
                element: ["element-plus", "@element-plus/icons-vue"],
                vxe: ["vxe-table"]
            }
            }
        },
        // 是否开启 gzip 压缩大小报告，禁用时能略微提高构建性能
         reportCompressedSize: false,
        // 单个 chunk 文件的大小超过 2048kB 时发出警告
        chunkSizeWarningLimit: 2048
    },
})
