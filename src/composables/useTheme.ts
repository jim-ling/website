import { getActiveThemeName, setActiveThemeName } from "@/store/cache/local-storage"

const DEFAULT_THEME_NAME = "normal"

type DefaultThemeName = typeof DEFAULT_THEME_NAME

/** 注册的主题名称, 其中 DefaultThemeName 是必填的 */
export type ThemeName = DefaultThemeName | "dark" | "dark-blue"

interface ThemeList {
  title: string
  name: ThemeName
}

/** 主题列表 */
const themeList: ThemeList[] = [
  {
    title: "默认",
    name: DEFAULT_THEME_NAME
  },
  {
    title: "黑暗",
    name: "dark"
  },
  {
    title: "深蓝",
    name: "dark-blue"
  }
]

/** 正在应用的主题名称 - 禁用自动初始化，防止与TopNavBar主题系统冲突 */
const activeThemeName = ref<ThemeName>(DEFAULT_THEME_NAME)

/** 设置主题 */
function setTheme(value: ThemeName) {
  activeThemeName.value = value
}

/** 在 html 根元素上挂载 class - 已禁用，使用TopNavBar的主题系统 */
function addHtmlClass(value: ThemeName) {
  // 不执行任何操作，防止与TopNavBar主题系统冲突
  console.warn('useTheme.addHtmlClass 已禁用，请使用TopNavBar的主题系统')
}

/** 在 html 根元素上移除其他主题 class - 已禁用，使用TopNavBar的主题系统 */
function removeHtmlClass(value: ThemeName) {
  // 不执行任何操作，防止与TopNavBar主题系统冲突
  console.warn('useTheme.removeHtmlClass 已禁用，请使用TopNavBar的主题系统')
}

/** 初始化 - 已禁用，使用TopNavBar的主题系统 */
function initTheme() {
  console.warn('useTheme.initTheme 已禁用，请使用TopNavBar的主题系统')
  // 不执行任何操作，防止与TopNavBar主题系统冲突
}

/** 主题 Composable */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
