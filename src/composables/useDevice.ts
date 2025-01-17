import { useAppStore } from "@/store/pinia/app"
import { DeviceEnum } from "@/store/cache/app-key"

const appStore = useAppStore()

const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)

/** 设备类型 Composable */
export function useDevice() {
  return { isMobile, isDesktop }
}
