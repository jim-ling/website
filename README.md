prepare

<!-- 初始化项目 -->

npm init vite@latest test
npm install vue-router@4 -S
npm install element-plus
npm install @element-plus/icons-vue

<!-- 引入自动引入插件 可以防止反复import xxx from vue-->

npm i unplugin-auto-import -D
npm i unplugin-svg-component -D
npm i unplugin-vue-components -D
npm install -D unocss

<!-- 引入pinia 类似vueX 全局缓存组件 -->

npm install pinia

<!-- css 预处理器 -->

npm install -D sass
npm install -D sass-loader

npm install js-cookie

npm install vite-svg-loader --save

npm install --save-dev @vitejs/plugin-vue @babel/core @babel/preset-env
