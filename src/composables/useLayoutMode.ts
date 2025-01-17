import { useSettingsStore } from "@/store/pinia/settings"
import { LayoutModeEnum } from "@/store/cache/app-key"

const settingsStore = useSettingsStore()

const isLeft = computed(() => settingsStore.layoutMode === LayoutModeEnum.Left)
const isTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.Top)
const isLeftTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.LeftTop)

function setLayoutMode(mode: LayoutModeEnum) {
  settingsStore.layoutMode = mode
}

/** 布局模式 Composable */
export function useLayoutMode() {
  return { isLeft, isTop, isLeftTop, setLayoutMode }
}
