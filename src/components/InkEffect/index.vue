<template>
  <div class="ink-container" v-if="isActive">
    <!-- 水墨晕染背景 -->
    <div class="ink-background">
      <div 
        v-for="(ink, index) in inkBlots" 
        :key="index"
        class="ink-blot"
        :style="{
          left: ink.x + '%',
          top: ink.y + '%',
          width: ink.size + 'px',
          height: ink.size + 'px',
          animationDelay: ink.delay + 's',
          animationDuration: ink.duration + 's'
        }"
      ></div>
    </div>
    
    <!-- 水墨笔触 -->
    <div class="ink-strokes">
      <div 
        v-for="(stroke, index) in inkStrokes" 
        :key="index"
        class="ink-stroke"
        :style="{
          left: stroke.x + '%',
          top: stroke.y + '%',
          width: stroke.width + 'px',
          height: stroke.height + 'px',
          transform: `rotate(${stroke.rotation}deg)`,
          animationDelay: stroke.delay + 's'
        }"
      ></div>
    </div>
    
    <!-- 水墨圆圈 -->
    <div class="ink-circles">
      <div 
        v-for="(circle, index) in inkCircles" 
        :key="index"
        class="ink-circle"
        :style="{
          left: circle.x + '%',
          top: circle.y + '%',
          width: circle.size + 'px',
          height: circle.size + 'px',
          animationDelay: circle.delay + 's',
          animationDuration: circle.duration + 's'
        }"
      ></div>
    </div>
    
    <!-- 水墨飞溅 -->
    <div class="ink-splashes">
      <div 
        v-for="(splash, index) in inkSplashes" 
        :key="index"
        class="ink-splash"
        :style="{
          left: splash.x + '%',
          top: splash.y + '%',
          animationDelay: splash.delay + 's'
        }"
      >
        <div class="splash-dot" v-for="dot in 5" :key="dot"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface InkBlot {
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

interface InkStroke {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  delay: number
}

interface InkCircle {
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

interface InkSplash {
  x: number
  y: number
  delay: number
}

const inkBlots = ref<InkBlot[]>([])
const inkStrokes = ref<InkStroke[]>([])
const inkCircles = ref<InkCircle[]>([])
const inkSplashes = ref<InkSplash[]>([])
const currentTheme = ref('tech')

const isActive = computed(() => currentTheme.value === 'ink')

const generateInkBlots = () => {
  inkBlots.value = []
  for (let i = 0; i < 15; i++) {
    inkBlots.value.push({
      x: Math.random() * 90,
      y: Math.random() * 90,
      size: 30 + Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 15
    })
  }
}

const generateInkStrokes = () => {
  inkStrokes.value = []
  for (let i = 0; i < 20; i++) {
    inkStrokes.value.push({
      x: Math.random() * 85,
      y: Math.random() * 85,
      width: 3 + Math.random() * 8,
      height: 60 + Math.random() * 200,
      rotation: Math.random() * 360,
      delay: Math.random() * 10
    })
  }
}

const generateInkCircles = () => {
  inkCircles.value = []
  for (let i = 0; i < 10; i++) {
    inkCircles.value.push({
      x: Math.random() * 85,
      y: Math.random() * 85,
      size: 40 + Math.random() * 120,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 18
    })
  }
}

const generateInkSplashes = () => {
  inkSplashes.value = []
  for (let i = 0; i < 8; i++) {
    inkSplashes.value.push({
      x: Math.random() * 90,
      y: Math.random() * 90,
      delay: Math.random() * 15
    })
  }
}

const checkTheme = () => {
  const htmlElement = document.documentElement
  if (htmlElement.classList.contains('theme-sakura')) {
    currentTheme.value = 'sakura'
  } else if (htmlElement.classList.contains('theme-tech')) {
    currentTheme.value = 'tech'
  } else if (htmlElement.classList.contains('theme-ink')) {
    currentTheme.value = 'ink'
  }
}

let observer: MutationObserver

onMounted(() => {
  generateInkBlots()
  generateInkStrokes()
  generateInkCircles()
  generateInkSplashes()
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
.ink-container {
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

.ink-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ink-blot {
  position: absolute;
  background: radial-gradient(circle, rgba(44, 62, 80, 0.08) 0%, rgba(44, 62, 80, 0.04) 50%, transparent 100%);
  border-radius: 50%;
  animation: ink-spread linear infinite;
}

.ink-strokes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ink-stroke {
  position: absolute;
  background: linear-gradient(180deg, 
    rgba(44, 62, 80, 0.12) 0%, 
    rgba(44, 62, 80, 0.08) 30%, 
    rgba(44, 62, 80, 0.04) 70%, 
    transparent 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: ink-fade 8s ease-in-out infinite;
}

.ink-circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ink-circle {
  position: absolute;
  border: 2px solid rgba(44, 62, 80, 0.1);
  border-radius: 50%;
  background: transparent;
  animation: ink-circle-expand linear infinite;
}

.ink-splashes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ink-splash {
  position: absolute;
  width: 20px;
  height: 20px;
  animation: ink-splash-appear 10s ease-in-out infinite;
}

.splash-dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(44, 62, 80, 0.15);
  border-radius: 50%;
  animation: splash-scatter 3s ease-out infinite;
}

.splash-dot:nth-child(1) {
  top: 0;
  left: 50%;
  animation-delay: 0s;
}

.splash-dot:nth-child(2) {
  top: 30%;
  right: 0;
  animation-delay: 0.2s;
}

.splash-dot:nth-child(3) {
  bottom: 0;
  left: 30%;
  animation-delay: 0.4s;
}

.splash-dot:nth-child(4) {
  top: 60%;
  left: 0;
  animation-delay: 0.6s;
}

.splash-dot:nth-child(5) {
  top: 20%;
  left: 20%;
  animation-delay: 0.8s;
}

@keyframes ink-spread {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  20% {
    transform: scale(0.6);
    opacity: 0.9;
  }
  80% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes ink-fade {
  0%, 100% {
    opacity: 0;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2) rotate(8deg);
  }
}

@keyframes ink-circle-expand {
  0% {
    transform: scale(0);
    opacity: 0;
    border-width: 3px;
  }
  30% {
    opacity: 0.8;
    border-width: 2px;
  }
  70% {
    opacity: 0.3;
    border-width: 1px;
  }
  100% {
    transform: scale(2);
    opacity: 0;
    border-width: 0px;
  }
}

@keyframes ink-splash-appear {
  0%, 90% {
    opacity: 0;
  }
  95%, 100% {
    opacity: 1;
  }
}

@keyframes splash-scatter {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--scatter-x, 15px), var(--scatter-y, 15px)) scale(0.3);
    opacity: 0;
  }
}

.splash-dot:nth-child(1) { --scatter-x: 0px; --scatter-y: -20px; }
.splash-dot:nth-child(2) { --scatter-x: 18px; --scatter-y: -8px; }
.splash-dot:nth-child(3) { --scatter-x: -12px; --scatter-y: 15px; }
.splash-dot:nth-child(4) { --scatter-x: -18px; --scatter-y: -5px; }
.splash-dot:nth-child(5) { --scatter-x: 8px; --scatter-y: 12px; }
</style> 