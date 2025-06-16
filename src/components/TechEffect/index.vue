<template>
  <div class="tech-container" v-if="isActive">
    <!-- 网格背景 -->
    <div class="tech-grid"></div>
    
    <!-- 霓虹线条 -->
    <div class="neon-lines">
      <div 
        v-for="(line, index) in neonLines" 
        :key="index"
        class="neon-line"
        :style="{
          top: line.y + '%',
          left: line.x + '%',
          width: line.width + 'px',
          animationDelay: line.delay + 's',
          '--neon-color': line.color
        }"
      ></div>
    </div>
    
    <!-- 浮动粒子 -->
    <div class="particles">
      <div 
        v-for="(particle, index) in particles" 
        :key="index"
        class="particle"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          animationDelay: particle.delay + 's',
          animationDuration: particle.duration + 's'
        }"
      ></div>
    </div>
    
    <!-- 数字雨效果 -->
    <div class="digital-rain">
      <div 
        v-for="(rain, index) in digitalRains" 
        :key="index"
        class="rain-column"
        :style="{
          left: rain.x + '%',
          animationDelay: rain.delay + 's',
          animationDuration: rain.duration + 's'
        }"
      >
        <span v-for="char in rain.chars" :key="char" class="rain-char">{{ char }}</span>
      </div>
    </div>
    
    <!-- 电路板线条 -->
    <div class="circuit-lines">
      <div 
        v-for="(circuit, index) in circuitLines" 
        :key="index"
        class="circuit-line"
        :style="{
          top: circuit.y + '%',
          left: circuit.x + '%',
          width: circuit.width + 'px',
          height: circuit.height + 'px',
          transform: `rotate(${circuit.rotation}deg)`,
          animationDelay: circuit.delay + 's'
        }"
      ></div>
    </div>
    
    <!-- 发光节点 -->
    <div class="glow-nodes">
      <div 
        v-for="(node, index) in glowNodes" 
        :key="index"
        class="glow-node"
        :style="{
          left: node.x + '%',
          top: node.y + '%',
          animationDelay: node.delay + 's'
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface NeonLine {
  x: number
  y: number
  width: number
  delay: number
  color: string
}

interface Particle {
  x: number
  y: number
  delay: number
  duration: number
}

interface DigitalRain {
  x: number
  delay: number
  duration: number
  chars: string[]
}

interface CircuitLine {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  delay: number
}

interface GlowNode {
  x: number
  y: number
  delay: number
}

const neonLines = ref<NeonLine[]>([])
const particles = ref<Particle[]>([])
const digitalRains = ref<DigitalRain[]>([])
const circuitLines = ref<CircuitLine[]>([])
const glowNodes = ref<GlowNode[]>([])
const currentTheme = ref('tech')

const isActive = computed(() => currentTheme.value === 'tech')

const colors = ['#00bfff', '#87ceeb', '#4682b4', '#5f9ea0', '#b0c4de']
const digitalChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

const generateNeonLines = () => {
  neonLines.value = []
  for (let i = 0; i < 12; i++) {
    neonLines.value.push({
      x: Math.random() * 80,
      y: Math.random() * 80,
      width: 150 + Math.random() * 300,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }
}

const generateParticles = () => {
  particles.value = []
  for (let i = 0; i < 50; i++) {
    particles.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 2 + Math.random() * 3
    })
  }
}

const generateDigitalRain = () => {
  digitalRains.value = []
  for (let i = 0; i < 15; i++) {
    const chars = []
    for (let j = 0; j < 8; j++) {
      chars.push(digitalChars[Math.floor(Math.random() * digitalChars.length)])
    }
    digitalRains.value.push({
      x: Math.random() * 95,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      chars
    })
  }
}

const generateCircuitLines = () => {
  circuitLines.value = []
  for (let i = 0; i < 20; i++) {
    circuitLines.value.push({
      x: Math.random() * 90,
      y: Math.random() * 90,
      width: 2 + Math.random() * 4,
      height: 50 + Math.random() * 150,
      rotation: Math.random() * 360,
      delay: Math.random() * 8
    })
  }
}

const generateGlowNodes = () => {
  glowNodes.value = []
  for (let i = 0; i < 25; i++) {
    glowNodes.value.push({
      x: Math.random() * 95,
      y: Math.random() * 95,
      delay: Math.random() * 12
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
  generateNeonLines()
  generateParticles()
  generateDigitalRain()
  generateCircuitLines()
  generateGlowNodes()
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
.tech-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -2;
  overflow: hidden;
  opacity: 0.6;
}

.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: grid-move 15s linear infinite;
}

.neon-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.neon-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--neon-color), transparent);
  box-shadow: 
    0 0 10px var(--neon-color),
    0 0 20px var(--neon-color),
    0 0 30px var(--neon-color);
  animation: neon-pulse 2s ease-in-out infinite;
  opacity: 0.8;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #00bfff;
  border-radius: 50%;
  box-shadow: 
    0 0 6px #00bfff,
    0 0 12px #00bfff;
  animation: particle-float linear infinite;
  opacity: 0.7;
}

.digital-rain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.rain-column {
  position: absolute;
  top: -100px;
  width: 20px;
  animation: rain-fall linear infinite;
}

.rain-char {
  display: block;
  color: #87ceeb;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  text-shadow: 0 0 8px #87ceeb;
  opacity: 0.6;
  line-height: 1.2;
}

.circuit-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.circuit-line {
  position: absolute;
  background: linear-gradient(180deg, 
    rgba(0, 191, 255, 0.8) 0%, 
    rgba(0, 191, 255, 0.4) 50%, 
    transparent 100%);
  box-shadow: 0 0 4px rgba(0, 191, 255, 0.6);
  animation: circuit-pulse 4s ease-in-out infinite;
}

.glow-nodes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glow-node {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #00bfff;
  border-radius: 50%;
  box-shadow: 
    0 0 10px #00bfff,
    0 0 20px #00bfff,
    0 0 30px #00bfff;
  animation: node-pulse 3s ease-in-out infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 40px);
  }
}

@keyframes neon-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scaleX(0.8);
  }
  50% {
    opacity: 1;
    transform: scaleX(1.2);
  }
}

@keyframes particle-float {
  0% {
    transform: translateY(0px) translateX(0px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

@keyframes rain-fall {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 100px));
    opacity: 0;
  }
}

@keyframes circuit-pulse {
  0%, 100% {
    opacity: 0.3;
    box-shadow: 0 0 4px rgba(0, 191, 255, 0.3);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 8px rgba(0, 191, 255, 0.8);
  }
}

@keyframes node-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
    box-shadow: 
      0 0 10px #00bfff,
      0 0 20px #00bfff;
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    box-shadow: 
      0 0 15px #00bfff,
      0 0 30px #00bfff,
      0 0 45px #00bfff;
  }
}
</style> 