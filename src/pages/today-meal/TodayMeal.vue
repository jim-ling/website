<template>
  <div class="page-wrapper">
    <div class="container">
      <header>
        <div class="date-box">
          <i class="fas fa-calendar-alt"></i> {{ formattedDate }}
        </div>
        <h1>美食推荐转盘</h1>
        <p class="subtitle">让选择美食变得简单有趣</p>
      </header>

      <div class="recommendation">
        <div class="season-box">
          <div class="season-icon" :class="seasonClass">
            <i :class="seasonIcon"></i>
          </div>
          <div class="season-info">
            <h2>{{ seasonName }} · 美食推荐</h2>
            <p>{{ seasonTip }}</p>
          </div>
        </div>

        <div class="recommend-card">
          <div class="food-icon">
            <i class="fas fa-utensils"></i>
          </div>
          <div class="recommend-text">
            <h3>{{ recommendation.title }}</h3>
            <p>{{ recommendation.description }}</p>
          </div>
        </div>
      </div>

      <div class="wheel-container">
        <h2 class="wheel-title">今天吃什么？</h2>

        <div class="wheel-wrapper">
          <div class="pointer"></div>
          <canvas
            ref="canvas"
            class="wheel-canvas"
            width="400"
            height="400"
          ></canvas>
          <div class="wheel-center" :class="{ highlight: result }">
            <div class="center-title">今日推荐</div>
            <div class="center-result">
              {{ result ? result.name : '等待选择' }}
            </div>
          </div>
        </div>

        <button class="spin-btn" @click="spinWheel">
          <i class="fas fa-redo-alt"></i> 转动转盘
        </button>

        <div class="instructions">
          <p>提示：直接拖拽转盘进行旋转 - 拖动速度越快，转盘旋转越久！</p>
        </div>
      </div>

      <footer>
        <p>用心推荐每一餐 · 愿您每天都有好胃口</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { defineComponent, ref, computed, onMounted } from 'vue'
import seasonRecipes from './seasonRecipes' // 根据实际路径调整

import wheelItems from './wheelItems' // 根据实际路径调整
import { Recipe } from './seasonRecipes'
import { WheelItem } from './wheelItems'

interface Recommendation {
  title: string
  description: string
}

const tips: Record<string, string> = {
  spring: '春暖花开，宜食清淡养肝之品，推荐新鲜蔬菜和温补食材',
  summer: '夏日炎炎，宜食清凉解暑之物，推荐富含水分和矿物质的食物',
  autumn: '秋高气爽，宜食润燥养肺之品，推荐滋润生津的食物',
  winter: '寒冬腊月，宜食温热滋补之物，推荐高能量和温补的食材'
}

const seasonNames: Record<string, string> = {
  spring: '春季',
  summer: '夏季',
  autumn: '秋季',
  winter: '冬季'
}
// 当前日期
const today = ref(new Date())
const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }
  return today.value.toLocaleDateString('zh-CN', options)
})

// 季节判断
const month = computed(() => today.value.getMonth() + 1)
const season = computed(() => {
  if (month.value >= 3 && month.value <= 5) return 'spring'
  if (month.value >= 6 && month.value <= 8) return 'summer'
  if (month.value >= 9 && month.value <= 11) return 'autumn'
  return 'winter'
})

const seasonName = computed(() => {
  return seasonNames[season.value]
})

const seasonClass = computed(() => {
  return season.value // 直接返回季节名称作为class
})

const seasonIcon = computed(() => {
  const icons: Record<string, string> = {
    spring: 'fas fa-seedling',
    summer: 'fas fa-sun',
    autumn: 'fas fa-leaf',
    winter: 'fas fa-snowflake'
  }
  return icons[season.value]
})

const seasonTip = computed(() => {
  return tips[season.value]
})
// 季节推荐
const recommendation = computed<Recommendation>(() => {
  const recipes = seasonRecipes[season.value]
  return recipes[Math.floor(Math.random() * recipes.length)]
})

const wheelItems2 = ref<WheelItem[]>(wheelItems)

const rotation = ref(0)
const result = ref<WheelItem | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

// 拖拽相关变量
let isDragging = false
let startAngle = 0
let currentAngle = 0
let lastAngle = 0
let velocity = 0
let lastTime = 0
let animationId: number | null = null

// 绘制转盘
const drawWheel = () => {
  if (!canvas.value || !ctx.value) return

  const centerX = canvas.value.width / 2
  const centerY = canvas.value.height / 2
  const radius = canvas.value.width / 2 - 10

  // 清空画布
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // 保存当前状态
  ctx.value.save()

  // 移动坐标原点
  ctx.value.translate(centerX, centerY)

  // 旋转画布
  ctx.value.rotate((rotation.value * Math.PI) / 180)

  // 绘制扇形
  const anglePerSection = (2 * Math.PI) / wheelItems2.value.length

  wheelItems2.value.forEach((item, i) => {
    const startAngle = i * anglePerSection
    const endAngle = (i + 1) * anglePerSection

    // 绘制扇形
    ctx.value!.beginPath()
    ctx.value!.moveTo(0, 0)
    ctx.value!.arc(0, 0, radius, startAngle, endAngle)
    ctx.value!.closePath()

    // 填充颜色
    ctx.value!.fillStyle = item.color
    ctx.value!.fill()
    ctx.value!.stroke()

    // 绘制文字
    ctx.value!.save()
    ctx.value!.translate(
      Math.cos(startAngle + anglePerSection / 2) * radius * 0.7,
      Math.sin(startAngle + anglePerSection / 2) * radius * 0.7
    )
    ctx.value!.rotate(startAngle + anglePerSection / 2 + Math.PI / 2)

    ctx.value!.font = 'bold 16px "PingFang SC", "Microsoft YaHei", sans-serif'
    ctx.value!.fillStyle = 'white'
    ctx.value!.textAlign = 'center'
    ctx.value!.fillText(item.name, 0, 0)
    ctx.value!.restore()
  })

  // 恢复状态
  ctx.value.restore()
}

// 开始拖拽
const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging = true
  if (!canvas.value) return

  const rect = canvas.value.getBoundingClientRect()
  const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
  const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = clientX - centerX
  const deltaY = clientY - centerY
  startAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI - currentAngle

  lastAngle = currentAngle
  lastTime = Date.now()

  // 停止动画
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }

  document.addEventListener('mousemove', drag)
  document.addEventListener('touchmove', drag as EventListener, {
    passive: false
  })
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag, { passive: true })
}

// 拖拽中
const drag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging || !canvas.value) return

  e.preventDefault()
  const rect = canvas.value.getBoundingClientRect()
  const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
  const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = clientX - centerX
  const deltaY = clientY - centerY
  const newAngle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI
  currentAngle = newAngle - startAngle

  // 计算速度 (乘以一个系数增加动能)
  const now = Date.now()
  const deltaTime = now - lastTime
  if (deltaTime > 0) {
    velocity = ((currentAngle - lastAngle) / deltaTime) * 3
  }

  lastAngle = currentAngle
  lastTime = now

  rotation.value = currentAngle
  drawWheel()
}

// 停止拖拽
const stopDrag = () => {
  if (!isDragging) return

  isDragging = false
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('touchmove', drag as EventListener)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)

  // 应用惯性
  applyInertia()
}

// 应用惯性
const applyInertia = () => {
  const now = Date.now()
  const deltaTime = now - lastTime

  // 速度衰减 (减慢衰减速度)
  velocity *= 0.98

  if (Math.abs(velocity) > 0.01) {
    currentAngle += velocity * deltaTime
    rotation.value = currentAngle
    drawWheel()

    lastTime = now
    animationId = requestAnimationFrame(applyInertia)
  } else {
    calculateResult()
  }
}

// 计算转盘结果
const calculateResult = () => {
  // 将角度转换为0-360度范围
  let normalizedAngle = ((rotation.value % 360) + 360) % 360

  // 计算选中的区域索引 (修正指针指向)
  const anglePerSection = 360 / wheelItems2.value.length
  // 指针指向12点方向，所以需要偏移90度
  const adjustedAngle = (normalizedAngle + 90) % 360
  const index = Math.floor(adjustedAngle / anglePerSection)
  // const selectedIndex =
  //   ((wheelItems2.value.length - index) % wheelItems2.value.length) - 1
  const selectedIndex = wheelItems2.value.length - index
  // console.log(
  //   '总长度' +
  //     wheelItems2.value.length +
  //     '索引' +
  //     index +
  //     '结果' +
  //     selectedIndex
  // )
  result.value = wheelItems2.value[selectedIndex - 1]
}

// 旋转转盘
const spinWheel = () => {
  // 随机旋转角度（至少5圈以上）
  const extraRotation = 1800 + Math.floor(Math.random() * 1800)
  const selectedIndex = Math.floor(Math.random() * wheelItems2.value.length)

  // 计算最终位置，使指针指向选中的项目
  const anglePerSection = 360 / wheelItems2.value.length
  // 指针指向12点方向，所以需要偏移90度
  const finalRotation =
    extraRotation - selectedIndex * anglePerSection - anglePerSection / 2 + 90

  // 设置目标角度
  const startRotation = rotation.value
  const startTime = Date.now()
  const duration = 4000 // 4秒

  // 停止之前的动画
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  // 动画函数
  const animateSpin = () => {
    const now = Date.now()
    const elapsed = now - startTime

    if (elapsed < duration) {
      // 缓动函数
      const progress = elapsed / duration
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      rotation.value =
        startRotation + (finalRotation - startRotation) * easeProgress
      drawWheel()

      animationId = requestAnimationFrame(animateSpin)
    } else {
      rotation.value = finalRotation
      drawWheel()
      calculateResult()
      // result.value = wheelItems2.value[selectedIndex]
    }
  }

  animationId = requestAnimationFrame(animateSpin)
}

// 初始化
onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    drawWheel()

    // 添加事件监听器
    canvas.value.addEventListener('mousedown', startDrag)
    canvas.value.addEventListener('touchstart', startDrag as EventListener, {
      passive: false
    })
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  user-select: none;
}

.page-wrapper {
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  color: #333;
}

.container {
  max-width: 900px;
  width: 100%;
  background: rgb(255 255 255 0);
  border-radius: 25px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 auto;
}

header {
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
  padding: 30px 40px;
  color: white;
  text-align: center;
  position: relative;
}

.date-box {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  backdrop-filter: blur(5px);
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.recommendation {
  padding: 30px 40px;
  background: rgb(255 255 254 0);
  border-bottom: 1px solid #eee;
}

.season-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.season-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-right: 20px;
  flex-shrink: 0;
}

.spring {
  background: linear-gradient(to right, #a8e063, #56ab2f);
}
.summer {
  background: linear-gradient(to right, #36d1dc, #5b86e5);
}
.autumn {
  background: linear-gradient(to right, #ff9966, #ff5e62);
}
.winter {
  background: linear-gradient(to right, #8e9eab, #eef2f3);
}

.season-info h2 {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #2c3e50;
}

.season-info p {
  color: #555;
  line-height: 1.6;
}

.recommend-card {
  background: rgba(255, 253, 253, 30%);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
  display: flex;
  align-items: center;
  border-left: 5px solid #ff9a9e;
  animation: fadeIn 0.8s ease-out;
}

.food-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(to right, #ffecd2, #fcb69f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-right: 20px;
  color: #ff6b6b;
}

.recommend-text h3 {
  font-size: 1.3rem;
  color: #ff6b6b;
  margin-bottom: 8px;
}

.recommend-text p {
  color: #666;
  line-height: 1.6;
}

.wheel-container {
  padding: 30px 40px 40px;
  text-align: center;
}

.wheel-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.wheel-wrapper {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto 40px;
}

.wheel-canvas {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 10px solid #fff;
  cursor: grab;
  touch-action: none;
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  background: white;
  border-radius: 50%;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border: 6px solid #ff9a9e;
}

.center-title {
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
}

.center-result {
  font-size: 18px;
  font-weight: 700;
  color: #ff6b6b;
  padding: 0 10px;
  text-align: center;
  min-height: 28px;
}

.pointer {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 40px;
  z-index: 25;
  filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.2));
}

.pointer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #ff6b6b;
}

.spin-btn {
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(255, 154, 158, 0.5);
  transition: all 0.3s ease;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
}

.spin-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(255, 154, 158, 0.6);
}

.spin-btn:active {
  transform: translateY(1px);
}

.instructions {
  margin-top: 20px;
  color: #777;
  font-size: 0.95rem;
}

footer {
  text-align: center;
  padding: 20px;
  color: #888;
  font-size: 14px;
  background: rgba(255, 253, 253, 30%);
  border-top: 1px solid #eee;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes highlight {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.highlight {
  animation: highlight 0.5s ease;
}

@media (max-width: 600px) {
  .page-wrapper {
    padding: 10px;
    min-height: calc(100vh - 60px);
  }

  header,
  .recommendation,
  .wheel-container {
    padding: 20px;
  }

  h1 {
    font-size: 1.8rem;
  }

  .wheel-wrapper {
    width: 300px;
    height: 300px;
  }

  .wheel-center {
    width: 100px;
    height: 100px;
  }

  .center-title {
    font-size: 12px;
  }

  .center-result {
    font-size: 16px;
  }
}
</style>