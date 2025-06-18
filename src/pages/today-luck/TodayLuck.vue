<template>
  <div class="page-wrapper">
    <div class="compass-container">
      <!-- 页面标题 -->
      <header class="compass-header">
        <div class="date-info">
          <div class="lunar-date">{{ lunarDate }}</div>
          <div class="solar-date">{{ solarDate }}</div>
        </div>
        <h1 class="main-title">道家风水罗盘</h1>
        <p class="subtitle">测风水 · 卜吉凶 · 知天命</p>
      </header>

      <!-- 罗盘主体 -->
      <div class="compass-main">
        <div class="compass-wrapper" :class="{ spinning: isSpinning }">
          <!-- 最外层：二十八宿 -->
          <div
            class="outermost-compass"
            :style="{ transform: `rotate(${outermostRotation}deg)` }"
            @mousedown="startDrag($event, 'outermost')"
            @touchstart.prevent="startDrag($event, 'outermost')"
          >
            <div class="outermost-ring">
              <div
                v-for="(constellation, index) in twentyEightConstellations"
                :key="index"
                class="constellation-item"
                :style="{
                  transform: `rotate(${
                    index * (360 / twentyEightConstellations.length)
                  }deg)`,
                  color: constellation.color
                }"
              >
                <div class="constellation-name">{{ constellation.name }}</div>
                <div class="constellation-element">
                  {{ constellation.element }}
                </div>
              </div>
            </div>
          </div>

          <!-- 分金层 -->
          <div
            class="fenjin-compass"
            :style="{ transform: `rotate(${fenjinRotation}deg)` }"
            @mousedown="startDrag($event, 'fenjin')"
            @touchstart.prevent="startDrag($event, 'fenjin')"
          >
            <div class="fenjin-ring">
              <div
                v-for="(fenjin, index) in displayFenjin"
                :key="index"
                class="fenjin-item"
                :class="[fenjin.type, fenjin.luck]"
                :style="{
                  transform: `rotate(${
                    index * (360 / displayFenjin.length)
                  }deg)`
                }"
              >
                <div class="fenjin-mark"></div>
              </div>
            </div>
          </div>

          <!-- 方位层（原外层） -->
          <div
            class="direction-compass"
            :style="{ transform: `rotate(${outerRotation}deg)` }"
            @mousedown="startDrag($event, 'outer')"
            @touchstart.prevent="startDrag($event, 'outer')"
          >
            <div class="direction-ring">
              <div
                v-for="(direction, index) in directions"
                :key="index"
                class="direction-item"
                :style="{ transform: `rotate(${index * 45}deg)` }"
              >
                <div class="direction-text">{{ direction.name }}</div>
                <div class="direction-symbol">{{ direction.symbol }}</div>
              </div>
            </div>
          </div>

          <!-- 内层罗盘：八卦 -->
          <div
            class="inner-compass"
            :style="{ transform: `rotate(${innerRotation}deg)` }"
            @mousedown="startDrag($event, 'inner')"
            @touchstart.prevent="startDrag($event, 'inner')"
          >
            <div class="inner-ring">
              <div
                v-for="(bagua, index) in baguaItems"
                :key="index"
                class="bagua-item"
                :style="{ transform: `rotate(${index * 45}deg)` }"
              >
                <div class="bagua-symbol">{{ bagua.symbol }}</div>
                <div class="bagua-name">{{ bagua.name }}</div>
              </div>
            </div>
          </div>

          <!-- 中心指针和结果显示 -->
          <div class="compass-center">
            <div class="center-needle"></div>
            <div class="center-content">
              <div class="result-title">{{ resultTitle }}</div>
              <div class="result-text">{{ resultText }}</div>
              <div class="luck-level" :class="luckClass">{{ luckLevel }}</div>
            </div>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="control-buttons">
          <button
            class="compass-btn primary"
            @click="measureFengshui"
            :disabled="isSpinning"
          >
            <span class="btn-icon">🧭</span>
            <span>测风水</span>
          </button>
          <button
            class="compass-btn secondary"
            @click="predictLuck"
            :disabled="isSpinning"
          >
            <span class="btn-icon">🔮</span>
            <span>卜吉凶</span>
          </button>
          <button
            class="compass-btn tertiary"
            @click="resetCompass"
            :disabled="isSpinning"
          >
            <span class="btn-icon">⚡</span>
            <span>重置</span>
          </button>
        </div>

        <!-- 功能说明 -->
        <div class="function-explanation">
          <div class="explanation-item">
            <strong>测风水：</strong
            >结合当前时辰、节气、方位、五行、二十八宿进行综合分析，测算环境气场与个人运势的匹配度
          </div>
          <div class="explanation-item">
            <strong>卜吉凶：</strong
            >基于八卦易理，通过卦象变化预测运势走向，给出趋吉避凶的建议
          </div>
        </div>

        <!-- 结果详情 -->
        <div class="result-details" v-if="showResult">
          <div class="detail-card">
            <h3>{{ detailResult.title }}</h3>
            <p class="detail-description">{{ detailResult.description }}</p>
            <div class="detail-advice">
              <strong>建议：</strong>{{ detailResult.advice }}
            </div>
            <div class="detail-score">
              <span class="score-label">风水评分：</span>
              <div class="score-bar">
                <div
                  class="score-fill"
                  :style="{ width: detailResult.score + '%' }"
                ></div>
              </div>
              <span class="score-value">{{ detailResult.score }}/100</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 特效粒子 -->
      <!-- <div class="particles-container">
        <div
          v-for="n in 20"
          :key="n"
          class="particle"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 2 + 's'
          }"
        ></div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  baguaItems,
  directions,
  luckLevels,
  fengshuiAdvices,
  fengshuiDescriptions,
  luckAdvices,
  getCurrentTimeInfo,
  lunarMonths,
  getZodiacAnimal,
  twentyEightConstellations,
  fenjinItems,
  type BaguaItem,
  type DirectionItem,
  type ConstellationItem,
  type FenjinItem
} from './compassData'

// 罗盘旋转角度
const outermostRotation = ref(0) // 二十八宿层
const fenjinRotation = ref(0) // 分金层
const outerRotation = ref(0) // 方位层
const innerRotation = ref(0) // 八卦层
const isSpinning = ref(false)

// 显示的分金（每15度显示一个，共24个）
const displayFenjin = computed(() => {
  return fenjinItems.filter((_, index) => index % 5 === 0).slice(0, 24)
})

// 结果显示
const resultTitle = ref('静心凝神')
const resultText = ref('调整罗盘方位')
const luckLevel = ref('平')
const luckClass = ref('neutral')
const showResult = ref(false)

// 拖拽相关
let isDragging = false
let dragType: 'outermost' | 'fenjin' | 'outer' | 'inner' = 'inner'
let startAngle = 0
let lastMouseAngle = 0
let lastDragTime = 0
let dragVelocity = 0
let inertiaAnimationId: number | null = null

// 日期信息
const solarDate = computed(() => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const zodiac = getZodiacAnimal(currentYear)
  const timeInfo = getCurrentTimeInfo()

  return `${now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })} ${zodiac}年 ${timeInfo.name}`
})

const lunarDate = computed(() => {
  const now = new Date()
  const month = now.getMonth()
  const day = now.getDate()
  return `农历${lunarMonths[month]}${day}日`
})

// 详细结果
const detailResult = ref({
  title: '',
  description: '',
  advice: '',
  score: 0
})

// 开始拖拽
const startDrag = (
  event: MouseEvent | TouchEvent,
  type: 'outermost' | 'fenjin' | 'outer' | 'inner'
) => {
  if (isSpinning.value) return

  isDragging = true
  dragType = type
  lastDragTime = Date.now()
  dragVelocity = 0

  // 停止之前的惯性动画
  if (inertiaAnimationId) {
    cancelAnimationFrame(inertiaAnimationId)
    inertiaAnimationId = null
  }

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

  // const rect = (event.target as Element).getBoundingClientRect()
  const compassElement = document.querySelector(
    '.compass-wrapper'
  ) as HTMLElement
  const rect = compassElement.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  startAngle =
    (Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI
  lastMouseAngle = startAngle

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag, { passive: true })

  // Vue的.prevent修饰符已经处理了preventDefault，这里不需要重复调用
  // event.preventDefault()
}

// 拖拽过程
const onDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging) return

  // 阻止touchmove的默认滚动行为
  event.preventDefault()

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

  const compassElement = document.querySelector(
    '.compass-wrapper'
  ) as HTMLElement
  const rect = compassElement.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const currentAngle =
    (Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI
  let deltaAngle = currentAngle - lastMouseAngle

  // 处理角度跳跃问题（从180度到-180度的跳跃）
  if (deltaAngle > 180) deltaAngle -= 360
  if (deltaAngle < -180) deltaAngle += 360

  // 计算拖拽速度用于惯性
  const currentTime = Date.now()
  const deltaTime = currentTime - lastDragTime
  if (deltaTime > 0) {
    dragVelocity = (deltaAngle / deltaTime) * 1000 // 转换为每秒角度
  }
  lastDragTime = currentTime

  // 降低灵敏度，使旋转更平滑
  deltaAngle *= 0.6

  if (dragType === 'outermost') {
    outermostRotation.value += deltaAngle
  } else if (dragType === 'fenjin') {
    fenjinRotation.value += deltaAngle
  } else if (dragType === 'outer') {
    outerRotation.value += deltaAngle
  } else {
    innerRotation.value += deltaAngle
  }

  lastMouseAngle = currentAngle

  // 实时更新结果
  updateResult()
}

// 停止拖拽
const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)

  // 启动惯性动画
  startInertia()
}

// 惯性动画
const startInertia = () => {
  // 只有当速度足够大时才启动惯性
  if (Math.abs(dragVelocity) < 2) return

  const animate = () => {
    // 速度衰减
    dragVelocity *= 0.95

    // 计算这一帧的角度变化
    const deltaAngle = dragVelocity / 60 // 假设60fps

    if (dragType === 'outermost') {
      outermostRotation.value += deltaAngle
    } else if (dragType === 'fenjin') {
      fenjinRotation.value += deltaAngle
    } else if (dragType === 'outer') {
      outerRotation.value += deltaAngle
    } else {
      innerRotation.value += deltaAngle
    }

    // 实时更新结果
    updateResult()

    // 如果速度还够大，继续动画
    if (Math.abs(dragVelocity) > 1) {
      inertiaAnimationId = requestAnimationFrame(animate)
    } else {
      inertiaAnimationId = null
    }
  }

  inertiaAnimationId = requestAnimationFrame(animate)
}

// 测风水 - 结合道家风水学原理
const measureFengshui = () => {
  if (isSpinning.value) return

  isSpinning.value = true
  showResult.value = false

  // 获取当前时间信息用于风水分析
  const now = new Date()
  const currentHour = now.getHours()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()

  // 根据时辰调整罗盘指向 - 道家风水重视时间因素
  const timeBasedRotation = getTimeBasedRotation(currentHour)

  // 根据节气调整外层星宿 - 二十八宿与时令相关
  const seasonBasedRotation = getSeasonBasedRotation(currentMonth, currentDay)

  // 综合当前时空因素进行风水测算
  const fengshuiRotation = (timeBasedRotation + Math.random() * 90 - 45) % 360
  const constellationRotation =
    (seasonBasedRotation + Math.random() * 60 - 30) % 360

  // 旋转到风水最佳位置
  innerRotation.value += fengshuiRotation
  outermostRotation.value += constellationRotation

  // 分金层根据当前日期微调
  fenjinRotation.value += (currentDay * 15) % 360

  setTimeout(() => {
    isSpinning.value = false
    updateResult()
    showDetailResult('fengshui')
  }, 3000)
}

// 根据时辰获取风水方位
const getTimeBasedRotation = (hour: number): number => {
  // 十二时辰对应方位（道家风水学）
  const timeDirections = {
    23: 0, // 子时 - 正北
    1: 0, // 子时 - 正北
    3: 45, // 丑时 - 东北
    5: 90, // 寅时 - 正东
    7: 135, // 卯时 - 东南
    9: 180, // 辰时 - 正南
    11: 225, // 巳时 - 西南
    13: 270, // 午时 - 正西
    15: 315, // 未时 - 西北
    17: 0, // 申时 - 正北
    19: 45, // 酉时 - 东北
    21: 90 // 戌时 - 正东
  }

  // 找到最接近的时辰
  const timeKeys = Object.keys(timeDirections)
    .map(Number)
    .sort((a, b) => a - b)
  let closestTime = timeKeys[0]

  for (const time of timeKeys) {
    if (Math.abs(hour - time) < Math.abs(hour - closestTime)) {
      closestTime = time
    }
  }

  return timeDirections[closestTime as keyof typeof timeDirections] || 0
}

// 根据节气获取星宿方位
const getSeasonBasedRotation = (month: number, day: number): number => {
  // 二十四节气对应的星宿角度
  const seasonAngles = {
    1: 270, // 冬季 - 玄武七宿当值
    2: 315, // 立春后
    3: 0, // 春分 - 青龙七宿当值
    4: 45, // 清明后
    5: 90, // 立夏
    6: 135, // 夏至 - 朱雀七宿当值
    7: 180, // 小暑后
    8: 225, // 立秋
    9: 270, // 秋分 - 白虎七宿当值
    10: 315, // 寒露后
    11: 0, // 立冬
    12: 45 // 冬至
  }

  return seasonAngles[month as keyof typeof seasonAngles] || 0
}

// 卜吉凶
const predictLuck = () => {
  if (isSpinning.value) return

  isSpinning.value = true
  showResult.value = false

  // 减慢旋转速度，只旋转内圈
  const innerSpin = Math.random() * 540 + 360 // 减少旋转角度

  innerRotation.value += innerSpin
  // outerRotation.value 保持不变，外圈固定
  outerRotation.value -= innerSpin
  setTimeout(() => {
    isSpinning.value = false
    updateResult()
    showDetailResult('luck')
  }, 4000) // 增加动画时长
}

// 重置罗盘
const resetCompass = () => {
  if (isSpinning.value) return

  outermostRotation.value = 0
  fenjinRotation.value = 0
  outerRotation.value = 0
  innerRotation.value = 0
  resultTitle.value = '静心凝神'
  resultText.value = '调整罗盘方位'
  luckLevel.value = '平'
  luckClass.value = 'neutral'
  showResult.value = false
}

// 更新结果显示
const updateResult = () => {
  const outerIndex = Math.floor(
    (((outerRotation.value % 360) + 360) % 360) / 45
  )
  const innerIndex = Math.floor(
    (((innerRotation.value % 360) + 360) % 360) / 45
  )

  const direction = directions[outerIndex]
  const bagua = baguaItems[innerIndex]

  resultTitle.value = `${direction.name}${bagua.name}`
  resultText.value = `${direction.element}${bagua.meaning}`
  luckLevel.value = bagua.luck

  // 设置吉凶等级样式
  if (bagua.luck.includes('大吉')) {
    luckClass.value = 'excellent'
  } else if (bagua.luck.includes('吉')) {
    luckClass.value = 'good'
  } else if (bagua.luck.includes('平')) {
    luckClass.value = 'neutral'
  } else if (bagua.luck.includes('小凶')) {
    luckClass.value = 'bad'
  } else {
    luckClass.value = 'terrible'
  }
}

// 显示详细结果
const showDetailResult = (type: 'fengshui' | 'luck') => {
  const outerIndex = Math.floor(
    (((outerRotation.value % 360) + 360) % 360) / 45
  )
  const innerIndex = Math.floor(
    (((innerRotation.value % 360) + 360) % 360) / 45
  )

  // 获取二十八宿信息
  const constellationIndex = Math.floor(
    (((outermostRotation.value % 360) + 360) % 360) /
      (360 / twentyEightConstellations.length)
  )
  const constellation = twentyEightConstellations[constellationIndex]

  // 获取分金信息
  const fenjinIndex = Math.floor(
    (((fenjinRotation.value % 360) + 360) % 360) /
      (360 / displayFenjin.value.length)
  )
  const fenjin = displayFenjin.value[fenjinIndex]

  const direction = directions[outerIndex]
  const bagua = baguaItems[innerIndex]

  if (type === 'fengshui') {
    // 综合风水分析
    const fengshuiAnalysis = analyzeFengshui(
      direction,
      bagua,
      constellation,
      fenjin
    )

    detailResult.value = {
      title: `风水测评：${direction.name}${bagua.name}位`,
      description: `${constellation.name}星当值，${direction.element}${bagua.meaning}之地，${fengshuiAnalysis.description}`,
      advice: fengshuiAnalysis.advice,
      score: fengshuiAnalysis.score
    }
  } else {
    detailResult.value = {
      title: `运势预测：${bagua.luck}`,
      description: `根据${direction.name}${
        bagua.name
      }卦象显示，${getLuckDescription(bagua)}`,
      advice: getLuckAdvice(bagua),
      score: calculateLuckScore(bagua)
    }
  }

  showResult.value = true

  // 检查是否是不好的运势，显示科学提醒
  if (bagua.luck.includes('凶')) {
    setTimeout(() => {
      showScienceReminder()
    }, 1000)
  }
}

// 综合风水分析
const analyzeFengshui = (
  direction: any,
  bagua: any,
  constellation: any,
  fenjin: any
) => {
  const now = new Date()
  const currentHour = now.getHours()
  const currentSeason = Math.floor((now.getMonth() + 1) / 3)

  let score = 50 // 基础分数
  let description = ''
  let advice = ''

  // 1. 方位与时辰的配合分析
  const timeScore = analyzeTimeDirection(direction, currentHour)
  score += timeScore

  // 2. 五行生克关系分析
  const elementScore = analyzeElementHarmony(direction, bagua)
  score += elementScore

  // 3. 星宿影响分析
  const constellationScore = analyzeConstellation(constellation, currentSeason)
  score += constellationScore

  // 4. 分金精确度分析
  const fenjinScore = analyzeFenjin(fenjin)
  score += fenjinScore

  // 生成描述
  if (score >= 80) {
    description = `此时此地，天时地利人和，${constellation.name}星照耀，${direction.element}气旺盛，${bagua.meaning}卦象大吉，是极佳的风水宝地`
    advice = `当前风水格局极佳，可在此方位进行重要决策、签约、开业等大事。建议摆放${
      direction.element
    }属性的吉祥物品，如${getElementItems(direction.element)}，以增强正能量场`
  } else if (score >= 65) {
    description = `风水格局良好，${constellation.name}星位得当，${direction.element}${bagua.meaning}相得益彰，气场和谐流通`
    advice = `此方位风水较好，适合日常办公、学习、休息。建议保持整洁，可适当摆放绿植或水晶来调和气场`
  } else if (score >= 50) {
    description = `风水格局平稳，${direction.element}气平和，${bagua.meaning}卦象中正，无大吉大凶`
    advice = `此方位风水平稳，宜守成待时。建议定期清理和净化，保持空间的通风采光`
  } else {
    description = `风水格局欠佳，${constellation.name}星位不利，${direction.element}${bagua.meaning}相冲，气场混乱`
    advice = `此方位风水不利，建议避免在此进行重要决策。可通过摆放化煞物品、调整布局来改善，如${getRemedyItems(
      direction.element
    )}`
  }

  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    description,
    advice
  }
}

// 分析时辰与方位的配合
const analyzeTimeDirection = (direction: any, hour: number): number => {
  const timeDirectionMap: { [key: string]: number[] } = {
    正北: [23, 0, 1], // 子时
    东北: [1, 2, 3], // 丑时
    正东: [3, 4, 5], // 寅时
    东南: [5, 6, 7], // 卯时
    正南: [11, 12, 13], // 午时
    西南: [13, 14, 15], // 未时
    正西: [15, 16, 17], // 申时
    西北: [17, 18, 19] // 酉时
  }

  const favorableHours = timeDirectionMap[direction.name] || []
  return favorableHours.includes(hour) ? 15 : -5
}

// 分析五行和谐度
const analyzeElementHarmony = (direction: any, bagua: any): number => {
  const elementRelations: { [key: string]: { [key: string]: number } } = {
    金: { 金: 5, 水: 10, 木: -10, 火: -15, 土: 8 },
    木: { 金: -10, 水: 8, 木: 5, 火: 10, 土: -8 },
    水: { 金: 8, 水: 5, 木: 10, 火: -15, 土: -10 },
    火: { 金: -15, 水: -15, 木: 8, 火: 5, 土: 10 },
    土: { 金: 10, 水: -10, 木: -8, 火: 8, 土: 5 }
  }

  return elementRelations[direction.element]?.[bagua.element] || 0
}

// 分析星宿影响
const analyzeConstellation = (constellation: any, season: number): number => {
  // 根据季节和星宿的匹配度评分
  const seasonConstellationBonus: { [key: string]: number[] } = {
    角: [1, 0, 0, 0], // 春季最佳
    亢: [1, 0, 0, 0],
    氐: [1, 0, 0, 0],
    房: [1, 0, 0, 0],
    心: [1, 0, 0, 0],
    尾: [1, 0, 0, 0],
    箕: [1, 0, 0, 0],
    井: [0, 1, 0, 0], // 夏季最佳
    鬼: [0, 1, 0, 0],
    柳: [0, 1, 0, 0],
    星: [0, 1, 0, 0],
    张: [0, 1, 0, 0],
    翼: [0, 1, 0, 0],
    轸: [0, 1, 0, 0]
  }

  const bonus = seasonConstellationBonus[constellation.name]?.[season] || 0
  return bonus ? 10 : 0
}

// 分析分金精确度
const analyzeFenjin = (fenjin: any): number => {
  return fenjin.luck === '吉' ? 8 : fenjin.luck === '凶' ? -8 : 0
}

// 获取五行对应的吉祥物品
const getElementItems = (element: string): string => {
  const items: { [key: string]: string } = {
    金: '金属饰品、白水晶、铜钱',
    木: '绿植、木雕、竹制品',
    水: '鱼缸、水晶球、流水摆件',
    火: '红色装饰、蜡烛、向阳花',
    土: '陶瓷、玉石、黄水晶'
  }
  return items[element] || '天然水晶'
}

// 获取化煞物品
const getRemedyItems = (element: string): string => {
  const remedies: { [key: string]: string } = {
    金: '木制品、绿植来化解金煞',
    木: '红色装饰、火属性物品来化解木煞',
    水: '土属性装饰、陶瓷来化解水煞',
    火: '水属性装饰、黑曜石来化解火煞',
    土: '金属装饰、白水晶来化解土煞'
  }
  return remedies[element] || '五行调和摆件'
}

// 显示科学提醒弹窗
const showScienceReminder = () => {
  ElMessage.warning(
    '本罗盘仅供娱乐参考，请勿相信封建迷信，相信科学，热爱生活！！'
  )
}

// 获取风水描述
const getFengshuiDescription = () => {
  return fengshuiDescriptions[
    Math.floor(Math.random() * fengshuiDescriptions.length)
  ]
}

// 获取风水建议
const getFengshuiAdvice = () => {
  return fengshuiAdvices[Math.floor(Math.random() * fengshuiAdvices.length)]
}

// 获取运势描述
const getLuckDescription = (bagua: BaguaItem) => {
  const level = luckLevels[bagua.luck as keyof typeof luckLevels]
  return level ? level.description : '运势变化莫测，需顺应自然'
}

// 获取运势建议
const getLuckAdvice = (bagua: BaguaItem) => {
  const advices = luckAdvices[bagua.luck as keyof typeof luckAdvices]
  return advices
    ? advices[Math.floor(Math.random() * advices.length)]
    : '顺应天道，修身养性'
}

// 计算风水评分
const calculateScore = (bagua: BaguaItem) => {
  const baseScore = Math.random() * 30 + 40
  const level = luckLevels[bagua.luck as keyof typeof luckLevels]
  const bonus = level ? (level.score - 50) * 0.6 : 0
  return Math.min(100, Math.max(0, Math.round(baseScore + bonus)))
}

// 计算运势评分
const calculateLuckScore = (bagua: BaguaItem) => {
  const level = luckLevels[bagua.luck as keyof typeof luckLevels]
  return level ? level.score : 50
}

onMounted(() => {
  // 初始化随机位置
  outermostRotation.value = Math.random() * 360
  fenjinRotation.value = Math.random() * 360
  outerRotation.value = Math.random() * 360
  innerRotation.value = Math.random() * 360
  updateResult()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)

  // 清理惯性动画
  if (inertiaAnimationId) {
    cancelAnimationFrame(inertiaAnimationId)
    inertiaAnimationId = null
  }
})
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.compass-container {
  max-width: 1200px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto;
}

/* 页面标题 */
.compass-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.date-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.lunar-date,
.solar-date {
  background: rgba(139, 69, 19, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #8b4513;
  border: 1px solid rgba(139, 69, 19, 0.2);
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: #2c1810;
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'KaiTi', 'STKaiti', serif;
}

.subtitle {
  font-size: 1.2rem;
  color: #8b4513;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 罗盘主体 */
.compass-main {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.compass-wrapper {
  position: relative;
  width: 600px;
  height: 600px;
  margin: 0 auto 3rem;
  transition: filter 0.3s ease;
  touch-action: none; /* 禁用默认触摸手势 */
  user-select: none; /* 防止文字选择 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.compass-wrapper.spinning {
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
}

/* 最外层：二十八宿 */
.outermost-compass {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #f4e4bc 0deg,
    #e8d5a3 12.86deg,
    #f4e4bc 25.71deg,
    #e8d5a3 38.57deg,
    #f4e4bc 51.43deg,
    #e8d5a3 64.29deg,
    #f4e4bc 77.14deg,
    #e8d5a3 90deg,
    #f4e4bc 102.86deg,
    #e8d5a3 115.71deg,
    #f4e4bc 128.57deg,
    #e8d5a3 141.43deg,
    #f4e4bc 154.29deg,
    #e8d5a3 167.14deg,
    #f4e4bc 180deg,
    #e8d5a3 192.86deg,
    #f4e4bc 205.71deg,
    #e8d5a3 218.57deg,
    #f4e4bc 231.43deg,
    #e8d5a3 244.29deg,
    #f4e4bc 257.14deg,
    #e8d5a3 270deg,
    #f4e4bc 282.86deg,
    #e8d5a3 295.71deg,
    #f4e4bc 308.57deg,
    #e8d5a3 321.43deg,
    #f4e4bc 334.29deg,
    #e8d5a3 347.14deg,
    #f4e4bc 360deg
  );
  border: 8px solid #8b4513;
  cursor: grab;
  transition: transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 0 0 4px #d2b48c, 0 0 0 8px #8b4513,
    0 15px 40px rgba(0, 0, 0, 0.3), inset 0 0 50px rgba(139, 69, 19, 0.2);
  user-select: none; /* 防止文字选择 */
}

.outermost-compass:active {
  cursor: grabbing;
}

.outermost-ring {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 简化的文字定位系统 */
.constellation-item {
  position: absolute;
  /* 固定尺寸，足够容纳所有文字 */
  width: 100px;
  height: 80px;
  /* 简单的居中定位 */
  top: 50%;
  left: 50%;
  /* 向上偏移到圆盘边缘，调整到更靠外的位置 */
  margin-top: -310px; /* 大幅增加负值，让二十八宿文字更靠外 */
  margin-left: -50px; /* 负值让文字水平居中 */
  /* 围绕圆盘中心旋转 */
  transform-origin: 50px 310px; /* 相应调整旋转中心 */
  /* 文字样式 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* 确保文字不被遮挡 */
  z-index: 100;
}

.constellation-name {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  font-family: 'KaiTi', 'STKaiti', serif;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  line-height: 1.2;
  color: #2c1810;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.constellation-element {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.9;
  line-height: 1.2;
  color: #8b4513;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 分金层 - 简化版 */
.fenjin-compass {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    #fff8dc 0deg 7.5deg,
    #f5f5dc 7.5deg 15deg
  );
  border: 4px solid #a0522d;
  cursor: grab;
  transition: transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 0 0 2px #d2b48c, 0 5px 15px rgba(0, 0, 0, 0.2),
    inset 0 0 20px rgba(160, 82, 45, 0.1);
  user-select: none; /* 防止文字选择 */
}

.fenjin-compass:active {
  cursor: grabbing;
}

.fenjin-ring {
  position: relative;
  width: 100%;
  height: 100%;
}

.fenjin-item {
  position: absolute;
  width: 4px;
  height: 20px;
  top: 50%;
  left: 50%;
  margin-top: -245px; /* 调整到更靠外 */
  margin-left: -2px; /* 居中 */
  transform-origin: 2px 245px; /* 相应调整旋转中心 */
}

.fenjin-mark {
  width: 100%;
  height: 15px;
  background: #8b4513;
  border-radius: 1px;
}

.fenjin-item.正针 .fenjin-mark {
  background: #8b4513;
  height: 18px;
}

.fenjin-item.缝针 .fenjin-mark {
  background: #a0522d;
  height: 12px;
}

.fenjin-item.吉 .fenjin-mark {
  box-shadow: 0 0 3px #4caf50;
}

.fenjin-item.凶 .fenjin-mark {
  box-shadow: 0 0 3px #f44336;
}

/* 方位层 - 简化版 */
.direction-compass {
  position: absolute;
  top: 80px;
  left: 80px;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #f4e4bc 0deg,
    #e8d5a3 45deg,
    #f4e4bc 90deg,
    #e8d5a3 135deg,
    #f4e4bc 180deg,
    #e8d5a3 225deg,
    #f4e4bc 270deg,
    #e8d5a3 315deg,
    #f4e4bc 360deg
  );
  border: 6px solid #8b4513;
  cursor: grab;
  transition: transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 0 0 3px #d2b48c, 0 0 0 6px #8b4513,
    0 8px 25px rgba(0, 0, 0, 0.2), inset 0 0 40px rgba(139, 69, 19, 0.15);
  user-select: none; /* 防止文字选择 */
}

.direction-compass:active {
  cursor: grabbing;
}

.direction-ring {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.direction-item {
  position: absolute;
  width: 80px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-top: -215px; /* 进一步增加负值，确保底部文字不被遮挡 */
  margin-left: -40px; /* 居中 */
  transform-origin: 40px 215px; /* 相应调整旋转中心 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 90;
}

.direction-text {
  font-size: 1rem;
  font-weight: bold;
  color: #2c1810;
  margin-bottom: 0.2rem;
  font-family: 'KaiTi', 'STKaiti', serif;
  line-height: 1.2;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.direction-symbol {
  font-size: 1.1rem;
  color: #8b4513;
  font-weight: bold;
  line-height: 1.2;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 内层罗盘 - 简化版 */
.inner-compass {
  position: absolute;
  top: 140px;
  left: 140px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #fff8dc 0deg,
    #f5f5dc 45deg,
    #fff8dc 90deg,
    #f5f5dc 135deg,
    #fff8dc 180deg,
    #f5f5dc 225deg,
    #fff8dc 270deg,
    #f5f5dc 315deg,
    #fff8dc 360deg
  );
  border: 5px solid #8b4513;
  cursor: grab;
  transition: transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 0 0 2px #d2b48c, 0 0 0 4px #8b4513,
    0 5px 20px rgba(0, 0, 0, 0.2), inset 0 0 30px rgba(139, 69, 19, 0.1);
  user-select: none; /* 防止文字选择 */
}

.inner-compass:active {
  cursor: grabbing;
}

.inner-ring {
  position: relative;
  width: 100%;
  height: 100%;
}

.bagua-item {
  position: absolute;
  width: 70px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-top: -150px; /* 调整到更靠外，避免被中心区域遮挡 */
  margin-left: -35px; /* 居中 */
  transform-origin: 35px 150px; /* 相应调整旋转中心 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 80;
}

.bagua-symbol {
  font-size: 1.6rem;
  color: #2c1810;
  margin-bottom: 0.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.bagua-name {
  font-size: 0.85rem;
  color: #8b4513;
  font-weight: bold;
  font-family: 'KaiTi', 'STKaiti', serif;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 中心区域 */
.compass-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff8dc 0%, #f4e4bc 70%, #8b4513 100%);
  border: 4px solid #8b4513;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px #d2b48c, 0 0 20px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  z-index: 10;
}

.center-needle {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 30px;
  background: linear-gradient(to bottom, #ff4444, #cc0000);
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.center-content {
  text-align: center;
  z-index: 1;
}

.result-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c1810;
  margin-bottom: 0.3rem;
  font-family: 'KaiTi', 'STKaiti', serif;
}

.result-text {
  font-size: 0.9rem;
  color: #8b4513;
  margin-bottom: 0.5rem;
}

.luck-level {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.2rem 0.8rem;
  border-radius: 15px;
  font-family: 'KaiTi', 'STKaiti', serif;
}

.luck-level.excellent {
  background: #ffeb3b;
  color: #e65100;
  box-shadow: 0 0 10px rgba(255, 235, 59, 0.6);
}

.luck-level.good {
  background: #4caf50;
  color: white;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.6);
}

.luck-level.neutral {
  background: #9e9e9e;
  color: white;
}

.luck-level.bad {
  background: #ff9800;
  color: white;
}

.luck-level.terrible {
  background: #f44336;
  color: white;
  box-shadow: 0 0 10px rgba(244, 67, 54, 0.6);
}

/* 控制按钮 */
.control-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.compass-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'KaiTi', 'STKaiti', serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.compass-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.compass-btn.primary {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
}

.compass-btn.primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #ff5722, #e68900);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.compass-btn.secondary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.compass-btn.secondary:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a6fd8, #6a4190);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.compass-btn.tertiary {
  background: linear-gradient(135deg, #8b4513, #a0522d);
  color: white;
}

.compass-btn.tertiary:hover:not(:disabled) {
  background: linear-gradient(135deg, #7a3f12, #8b4513);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-hint {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-left: 0.3rem;
  font-weight: normal;
}

/* 结果详情 */
.result-details {
  margin-bottom: 3rem;
}

.detail-card {
  background: rgba(255, 248, 220, 0.9);
  border: 2px solid #8b4513;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.detail-card h3 {
  color: #2c1810;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'KaiTi', 'STKaiti', serif;
}

.detail-description {
  color: #8b4513;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.detail-advice {
  background: rgba(139, 69, 19, 0.1);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  color: #2c1810;
  border-left: 4px solid #8b4513;
}

.detail-score {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.score-label {
  font-weight: bold;
  color: #2c1810;
  min-width: 80px;
}

.score-bar {
  flex: 1;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b35, #ffeb3b, #4caf50);
  border-radius: 10px;
  transition: width 1s ease;
}

.score-value {
  font-weight: bold;
  color: #2c1810;
  min-width: 60px;
}

/* 功能说明 */
.function-explanation {
  background: rgba(255, 248, 220, 0.8);
  border: 1px solid rgba(139, 69, 19, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.explanation-item {
  color: #8b4513;
  line-height: 1.6;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
}

.explanation-item:last-child {
  margin-bottom: 0;
}

.explanation-item strong {
  color: #2c1810;
  font-family: 'KaiTi', 'STKaiti', serif;
}

/* 特效粒子 */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #ffd700, #ffeb3b);
  border-radius: 50%;
  animation: float-particle 4s infinite ease-in-out;
  opacity: 0.7;
}

@keyframes float-particle {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 10px;
    min-height: calc(100vh - 60px);
  }

  .compass-container {
    padding: 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .compass-wrapper {
    width: 400px;
    height: 400px;
  }

  /* 最外层：二十八宿 - 移动端适配 */
  .outermost-compass {
    border-width: 6px;
  }

  .constellation-item {
    width: 80px;
    height: 60px;
    /* 移动端使用相同的居中定位逻辑，但调整距离 */
    top: 50%;
    left: 50%;
    margin-top: -200px; /* 适应400px罗盘的比例 */
    margin-left: -50px;
    transform-origin: 50px 200px;
  }

  .constellation-name {
    font-size: 0.8rem;
  }

  .constellation-element {
    font-size: 0.6rem;
  }

  /* 分金层 - 移动端适配 */
  .fenjin-compass {
    top: 35px;
    left: 35px;
    width: 330px;
    height: 330px;
    border-width: 3px;
  }

  .fenjin-item {
    width: 3px;
    height: 15px;
    top: 50%;
    left: 50%;
    margin-top: -160px; /* 适应330px圆盘 */
    margin-left: -1.5px;
    transform-origin: 1.5px 160px;
  }

  /* 方位层 - 移动端适配 */
  .direction-compass {
    top: 55px;
    left: 55px;
    width: 290px;
    height: 290px;
    border-width: 4px;
  }

  .direction-item {
    width: 65px;
    height: 50px;
    top: 50%;
    left: 50%;
    margin-top: -150px; /* 适应290px圆盘 */
    margin-left: -30px;
    transform-origin: 30px 150px;
  }

  .direction-text {
    font-size: 0.9rem;
    margin-bottom: 0.1rem;
  }

  .direction-symbol {
    font-size: 1rem;
  }

  /* 内层八卦 - 移动端适配 */
  .inner-compass {
    top: 95px;
    left: 95px;
    width: 210px;
    height: 210px;
    border-width: 3px;
  }

  .bagua-item {
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    margin-top: -100px; /* 适应210px圆盘 */
    margin-left: -25px;
    transform-origin: 25px 100px;
  }

  .bagua-symbol {
    font-size: 1.4rem;
  }

  .bagua-name {
    font-size: 0.7rem;
  }

  /* 中心区域 */
  .compass-center {
    width: 100px;
    height: 100px;
  }

  .result-title {
    font-size: 0.8rem;
  }

  .result-text {
    font-size: 0.7rem;
  }

  .luck-level {
    font-size: 0.9rem;
    padding: 0.1rem 0.5rem;
  }

  .control-buttons {
    flex-direction: column;
    align-items: center;
  }

  .compass-btn {
    width: 200px;
    justify-content: center;
  }

  .date-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* 金属反光特效 */
@keyframes metallic-shine {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

/* 为旋转中的罗盘添加特效 */
.compass-wrapper.spinning .outermost-compass {
  animation: edge-glow 2s ease-in-out infinite;
}

/* 金属反光效果 */
.compass-wrapper.spinning .outermost-compass::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  background-size: 200% 200%;
  animation: metallic-shine 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

/* 为其他层添加轻微特效 */
.compass-wrapper.spinning .fenjin-compass {
  animation: edge-glow 2.5s ease-in-out infinite reverse;
}

.compass-wrapper.spinning .direction-compass {
  animation: edge-glow 3s ease-in-out infinite;
}

.compass-wrapper.spinning .inner-compass {
  animation: edge-glow 1.5s ease-in-out infinite;
}

/* 内圈额外的脉冲特效 */
.compass-wrapper.spinning .inner-compass::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 215, 0, 0.2) 0%,
    rgba(255, 215, 0, 0.1) 30%,
    transparent 60%
  );
  animation: pulse-glow 1s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: -1;
}

@keyframes pulse-glow {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.6;
  }
}
</style>