<template>
  <div class="sakura-container" v-if="isActive">
    <div 
      v-for="(petal, index) in petals" 
      :key="index"
      class="sakura-petal"
      :style="{
        left: petal.x + '%',
        animationDelay: petal.delay + 's',
        animationDuration: petal.duration + 's'
      }"
    >
      🌸
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Petal {
  x: number
  delay: number
  duration: number
}

const petals = ref<Petal[]>([])
const currentTheme = ref('tech')

const isActive = computed(() => currentTheme.value === 'sakura')

const generatePetals = () => {
  petals.value = []
  for (let i = 0; i < 20; i++) {
    petals.value.push({
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10
    })
  }
}

const checkTheme = () => {
  const htmlElement = document.documentElement
  if (htmlElement.classList.contains('theme-sakura')) {
    currentTheme.value = 'sakura'
  } else if (htmlElement.classList.contains('theme-sakura2')) {
    currentTheme.value = 'sakura2'
  } else if (htmlElement.classList.contains('theme-tech')) {
    currentTheme.value = 'tech'
  } else if (htmlElement.classList.contains('theme-ink')) {
    currentTheme.value = 'ink'
  } else {
    currentTheme.value = 'none'
  }
}

let observer: MutationObserver

onMounted(() => {
  generatePetals()
  checkTheme()
  
  // 监听主题变化
  observer = new MutationObserver(() => {
    checkTheme()
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.sakura-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -2;
  overflow: hidden;
  opacity: 0.4;
}

.sakura-petal {
  position: absolute;
  top: -50px;
  font-size: 16px;
  color: rgba(255, 182, 193, 0.6);
  animation: sakura-fall linear infinite;
  pointer-events: none;
}

@keyframes sakura-fall {
  0% {
    transform: translateY(-50px) translateX(0) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translateY(25vh) translateX(20px) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(50vh) translateX(-15px) rotate(180deg);
    opacity: 0.6;
  }
  75% {
    transform: translateY(75vh) translateX(25px) rotate(270deg);
    opacity: 0.4;
  }
  100% {
    transform: translateY(calc(100vh + 50px)) translateX(-10px) rotate(360deg);
    opacity: 0;
  }
}
</style> 