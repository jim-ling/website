// 道家罗盘数据配置

// 八卦数据
export interface BaguaItem {
  symbol: string
  name: string
  meaning: string
  luck: string
  element: string
  nature: string
  description: string
}

export const baguaItems: BaguaItem[] = [
  {
    symbol: '☰',
    name: '乾',
    meaning: '天',
    luck: '大吉',
    element: '金',
    nature: '刚健',
    description: '乾为天，象征刚健、进取、领导力强'
  },
  {
    symbol: '☱',
    name: '兑',
    meaning: '泽',
    luck: '吉',
    element: '金',
    nature: '喜悦',
    description: '兑为泽，象征喜悦、沟通、人际和谐'
  },
  {
    symbol: '☲',
    name: '离',
    meaning: '火',
    luck: '中吉',
    element: '火',
    nature: '光明',
    description: '离为火，象征光明、智慧、文明发达'
  },
  {
    symbol: '☳',
    name: '震',
    meaning: '雷',
    luck: '小吉',
    element: '木',
    nature: '动',
    description: '震为雷，象征震动、奋发、积极向上'
  },
  {
    symbol: '☴',
    name: '巽',
    meaning: '风',
    luck: '平',
    element: '木',
    nature: '入',
    description: '巽为风，象征温和、顺从、渐进发展'
  },
  {
    symbol: '☵',
    name: '坎',
    meaning: '水',
    luck: '小凶',
    element: '水',
    nature: '险',
    description: '坎为水，象征险阻、智慧、需要谨慎'
  },
  {
    symbol: '☶',
    name: '艮',
    meaning: '山',
    luck: '中凶',
    element: '土',
    nature: '止',
    description: '艮为山，象征静止、稳重、需要耐心'
  },
  {
    symbol: '☷',
    name: '坤',
    meaning: '地',
    luck: '大吉',
    element: '土',
    nature: '顺',
    description: '坤为地，象征包容、承载、厚德载物'
  }
]

// 方位数据
export interface DirectionItem {
  name: string
  symbol: string
  element: string
  meaning: string
  color: string
  season: string
  time: string
  animal: string
  description: string
}

export const directions: DirectionItem[] = [
  {
    name: '正北',
    symbol: '坎',
    element: '水',
    meaning: '智慧流动',
    color: '黑',
    season: '冬',
    time: '子时',
    animal: '玄武',
    description: '北方属水，主智慧和财运，宜静心思考'
  },
  {
    name: '东北',
    symbol: '艮',
    element: '土',
    meaning: '山止静',
    color: '黄',
    season: '季冬',
    time: '丑寅时',
    animal: '土牛',
    description: '东北属土，主稳定和积累，宜踏实务实'
  },
  {
    name: '正东',
    symbol: '震',
    element: '木',
    meaning: '雷动生',
    color: '青',
    season: '春',
    time: '卯时',
    animal: '青龙',
    description: '东方属木，主生长和发展，宜积极进取'
  },
  {
    name: '东南',
    symbol: '巽',
    element: '木',
    meaning: '风入柔',
    color: '绿',
    season: '季春',
    time: '辰巳时',
    animal: '青鸟',
    description: '东南属木，主文昌和人际，宜学习交流'
  },
  {
    name: '正南',
    symbol: '离',
    element: '火',
    meaning: '火明丽',
    color: '红',
    season: '夏',
    time: '午时',
    animal: '朱雀',
    description: '南方属火，主名声和事业，宜展现才华'
  },
  {
    name: '西南',
    symbol: '坤',
    element: '土',
    meaning: '地承载',
    color: '黄',
    season: '季夏',
    time: '未申时',
    animal: '地母',
    description: '西南属土，主母性和包容，宜和谐相处'
  },
  {
    name: '正西',
    symbol: '兑',
    element: '金',
    meaning: '泽润泽',
    color: '白',
    season: '秋',
    time: '酉时',
    animal: '白虎',
    description: '西方属金，主收获和财富，宜收敛储蓄'
  },
  {
    name: '西北',
    symbol: '乾',
    element: '金',
    meaning: '天刚健',
    color: '白',
    season: '季秋',
    time: '戌亥时',
    animal: '天马',
    description: '西北属金，主权威和领导，宜统筹规划'
  }
]

// 吉凶等级
export const luckLevels = {
  '大吉': {
    score: 90,
    color: '#ffeb3b',
    textColor: '#e65100',
    description: '运势极佳，诸事顺利，是难得的好时机'
  },
  '吉': {
    score: 75,
    color: '#4caf50',
    textColor: 'white',
    description: '运势良好，多有贵人相助，宜积极进取'
  },
  '中吉': {
    score: 65,
    color: '#8bc34a',
    textColor: 'white',
    description: '运势平稳向上，稳中求进为宜'
  },
  '小吉': {
    score: 55,
    color: '#cddc39',
    textColor: '#333',
    description: '运势略有起色，需谨慎把握机会'
  },
  '平': {
    score: 50,
    color: '#9e9e9e',
    textColor: 'white',
    description: '运势平稳，宜守成待时'
  },
  '小凶': {
    score: 40,
    color: '#ff9800',
    textColor: 'white',
    description: '运势略有波折，需小心谨慎'
  },
  '中凶': {
    score: 30,
    color: '#ff5722',
    textColor: 'white',
    description: '运势欠佳，宜低调行事'
  },
  '大凶': {
    score: 20,
    color: '#f44336',
    textColor: 'white',
    description: '运势不利，需静心修养'
  }
}

// 风水建议库
export const fengshuiAdvices = [
  '可在此方位摆放绿植或水晶，增强正能量',
  '建议保持此方位整洁明亮，避免杂物堆积',
  '可考虑在此方位设置办公或学习区域',
  '适合摆放招财或镇宅物品',
  '注意通风采光，保持气场流动',
  '可放置五行相生的装饰品调和气场',
  '宜摆放符合方位属性的装饰品',
  '保持此方位的安静和谐，避免噪音干扰',
  '可使用相应颜色的装饰来增强方位能量',
  '定期清理和净化此方位的负能量'
]

// 风水描述库
export const fengshuiDescriptions = [
  '气场流通顺畅，有利于聚财纳福',
  '地势稳固，适宜安居乐业',
  '生机勃勃，有助于事业发展',
  '阴阳调和，利于身心健康',
  '光明磁场强烈，贵人运旺盛',
  '水势环抱，智慧财富双收',
  '山环水抱，藏风聚气良好',
  '龙脉走向清晰，主事业兴旺',
  '明堂开阔，有利于发展前景',
  '左右护卫得力，安全感强'
]

// 运势建议库
export const luckAdvices = {
  '大吉': [
    '把握良机，大胆行动，但不可过于张扬',
    '积极拓展人脉，寻求合作机会',
    '投资理财可适当进取，但需分散风险',
    '事业发展正当时，可制定长远规划'
  ],
  '吉': [
    '积极进取，广结善缘，多做善事积德',
    '学习新技能，提升自身竞争力',
    '感情方面有良好发展，可主动表达',
    '健康状况良好，可适当增加运动'
  ],
  '中吉': [
    '稳扎稳打，循序渐进，不急不躁',
    '保持现有的良好状态，稳中求进',
    '人际关系和谐，可多参与社交活动',
    '财运平稳，适合储蓄和理财'
  ],
  '小吉': [
    '小心谨慎，见好就收，避免贪心',
    '机会虽小但要把握，积少成多',
    '工作中保持低调，避免锋芒太露',
    '健康需要关注，预防小病小痛'
  ],
  '平': [
    '保持平常心，修身养性，等待时机',
    '专注于自我提升和能力建设',
    '维护现有的关系和资源',
    '规律作息，保持身心平衡'
  ],
  '小凶': [
    '谨言慎行，避免冲突，多做反思',
    '暂缓重大决策，观望为上',
    '注意身体健康，避免过度劳累',
    '理财要保守，避免高风险投资'
  ],
  '中凶': [
    '低调处事，韬光养晦，静待转机',
    '避免与人发生争执，以和为贵',
    '工作中多听少说，避免出错',
    '健康是重点，及时检查治疗'
  ],
  '大凶': [
    '静心修养，行善积德，化解不利',
    '暂停所有重大计划，以静制动',
    '多行善事，积累正能量',
    '寻求专业帮助，化解困难'
  ]
}

// 时辰对应
export const timeMapping = {
  '子时': { hour: [23, 1], description: '夜半时分，宜静心修养' },
  '丑时': { hour: [1, 3], description: '鸡鸣时分，宜反思总结' },
  '寅时': { hour: [3, 5], description: '平旦时分，宜制定计划' },
  '卯时': { hour: [5, 7], description: '日出时分，宜积极行动' },
  '辰时': { hour: [7, 9], description: '食时时分，宜营养补充' },
  '巳时': { hour: [9, 11], description: '隅中时分，宜专注工作' },
  '午时': { hour: [11, 13], description: '日中时分，宜休息调整' },
  '未时': { hour: [13, 15], description: '日昳时分，宜社交活动' },
  '申时': { hour: [15, 17], description: '晡时时分，宜总结收获' },
  '酉时': { hour: [17, 19], description: '日入时分，宜家庭团聚' },
  '戌时': { hour: [19, 21], description: '黄昏时分，宜娱乐放松' },
  '亥时': { hour: [21, 23], description: '人定时分，宜准备休息' }
}

// 获取当前时辰
export const getCurrentTimeInfo = () => {
  const now = new Date()
  const hour = now.getHours()
  
  for (const [timeName, timeInfo] of Object.entries(timeMapping)) {
    const [startHour, endHour] = timeInfo.hour
    if (startHour <= endHour) {
      if (hour >= startHour && hour < endHour) {
        return { name: timeName, ...timeInfo }
      }
    } else {
      // 跨天的情况（如子时）
      if (hour >= startHour || hour < endHour) {
        return { name: timeName, ...timeInfo }
      }
    }
  }
  
  return { name: '子时', ...timeMapping['子时'] }
}

// 农历月份名称
export const lunarMonths = [
  '正月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月'
]

// 天干地支
export const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
export const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 生肖
export const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

// 获取生肖
export const getZodiacAnimal = (year: number) => {
  return zodiacAnimals[(year - 4) % 12]
}

// 五行相生相克
export const fiveElements = {
  '金': { generates: '水', destroys: '木', color: '#ffffff' },
  '木': { generates: '火', destroys: '土', color: '#4caf50' },
  '水': { generates: '木', destroys: '火', color: '#2196f3' },
  '火': { generates: '土', destroys: '金', color: '#f44336' },
  '土': { generates: '金', destroys: '水', color: '#ff9800' }
}

// 二十八宿数据
export interface ConstellationItem {
  name: string
  angle: number
  element: string
  animal: string
  description: string
  color: string
}

export const twentyEightConstellations: ConstellationItem[] = [
  // 东方青龙七宿
  { name: '角', angle: 0, element: '木', animal: '蛟', description: '东方青龙首宿，主生机', color: '#4caf50' },
  { name: '亢', angle: 12.86, element: '金', animal: '龙', description: '龙颈之宿，主权威', color: '#ffd700' },
  { name: '氐', angle: 25.71, element: '土', animal: '貉', description: '龙胸之宿，主根基', color: '#ff9800' },
  { name: '房', angle: 38.57, element: '日', animal: '兔', description: '龙腹之宿，主居所', color: '#ff5722' },
  { name: '心', angle: 51.43, element: '月', animal: '狐', description: '龙心之宿，主情感', color: '#e91e63' },
  { name: '尾', angle: 64.29, element: '火', animal: '虎', description: '龙尾之宿，主变化', color: '#f44336' },
  { name: '箕', angle: 77.14, element: '水', animal: '豹', description: '龙尾末宿，主收藏', color: '#2196f3' },
  
  // 北方玄武七宿
  { name: '斗', angle: 90, element: '木', animal: '獬', description: '北方玄武首宿，主智慧', color: '#4caf50' },
  { name: '牛', angle: 102.86, element: '金', animal: '牛', description: '牛宿主勤劳', color: '#ffd700' },
  { name: '女', angle: 115.71, element: '土', animal: '蝠', description: '女宿主织造', color: '#ff9800' },
  { name: '虚', angle: 128.57, element: '日', animal: '鼠', description: '虚宿主空灵', color: '#ff5722' },
  { name: '危', angle: 141.43, element: '月', animal: '燕', description: '危宿主险阻', color: '#e91e63' },
  { name: '室', angle: 154.29, element: '火', animal: '猪', description: '室宿主居室', color: '#f44336' },
  { name: '壁', angle: 167.14, element: '水', animal: '貐', description: '壁宿主防护', color: '#2196f3' },
  
  // 西方白虎七宿
  { name: '奎', angle: 180, element: '木', animal: '狼', description: '西方白虎首宿，主文昌', color: '#4caf50' },
  { name: '娄', angle: 192.86, element: '金', animal: '狗', description: '娄宿主聚集', color: '#ffd700' },
  { name: '胃', angle: 205.71, element: '土', animal: '雉', description: '胃宿主仓储', color: '#ff9800' },
  { name: '昴', angle: 218.57, element: '日', animal: '鸡', description: '昴宿主光明', color: '#ff5722' },
  { name: '毕', angle: 231.43, element: '月', animal: '乌', description: '毕宿主网罗', color: '#e91e63' },
  { name: '觜', angle: 244.29, element: '火', animal: '猴', description: '觜宿主言语', color: '#f44336' },
  { name: '参', angle: 257.14, element: '水', animal: '猿', description: '参宿主武勇', color: '#2196f3' },
  
  // 南方朱雀七宿
  { name: '井', angle: 270, element: '木', animal: '犴', description: '南方朱雀首宿，主水源', color: '#4caf50' },
  { name: '鬼', angle: 282.86, element: '金', animal: '羊', description: '鬼宿主神秘', color: '#ffd700' },
  { name: '柳', angle: 295.71, element: '土', animal: '獐', description: '柳宿主柔美', color: '#ff9800' },
  { name: '星', angle: 308.57, element: '日', animal: '马', description: '星宿主光辉', color: '#ff5722' },
  { name: '张', angle: 321.43, element: '月', animal: '鹿', description: '张宿主张扬', color: '#e91e63' },
  { name: '翼', angle: 334.29, element: '火', animal: '蛇', description: '翼宿主辅助', color: '#f44336' },
  { name: '轸', angle: 347.14, element: '水', animal: '蚓', description: '轸宿主载物', color: '#2196f3' }
]

// 分金数据（120分金，每3度一个分金）
export interface FenjinItem {
  name: string
  angle: number
  type: '正针' | '缝针'
  luck: '吉' | '凶' | '平'
}

export const fenjinItems: FenjinItem[] = []

// 生成120个分金
for (let i = 0; i < 120; i++) {
  const angle = i * 3
  const isZhengzhen = i % 2 === 0
  const luckTypes: ('吉' | '凶' | '平')[] = ['吉', '凶', '平']
  const luck = luckTypes[i % 3]
  
  fenjinItems.push({
    name: `${i + 1}分金`,
    angle: angle,
    type: isZhengzhen ? '正针' : '缝针',
    luck: luck
  })
}

// 六十甲子纳音
export const sixtyJiazi = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
]

// 罗盘层级配置
export const compassLayers = {
  outermost: {
    name: '二十八宿层',
    radius: 280,
    items: twentyEightConstellations
  },
  outer: {
    name: '分金层', 
    radius: 250,
    items: fenjinItems.slice(0, 24) // 只显示24个主要分金
  },
  middle: {
    name: '方位层',
    radius: 240,
    items: directions
  },
  inner: {
    name: '八卦层',
    radius: 170,
    items: baguaItems
  }
} 