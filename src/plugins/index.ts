import type { App } from 'vue'
import SvgIcon from '~virtual/svg-component'
import { installElementPlusIcons } from './element-plus-icons'
import { installPermissionDirective } from './permission-directive'

export function installPlugins(app: App) {
    installElementPlusIcons(app)
    installPermissionDirective(app)
    app.component('SvgIcon', SvgIcon)
}
