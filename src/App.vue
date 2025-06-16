<script lang="ts" setup>
import { useGreyAndColorWeakness } from '@/composables/useGreyAndColorWeakness'
import SakuraEffect from '@/components/SakuraEffect/index.vue'
import TechEffect from '@/components/TechEffect/index.vue'
import InkEffect from '@/components/InkEffect/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const { initGreyAndColorWeakness } = useGreyAndColorWeakness()

// 初始化灰色模式和色弱模式
initGreyAndColorWeakness()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
    <SakuraEffect />
    <TechEffect />
    <InkEffect />
  </el-config-provider>
</template>
