import type { App } from 'vue';
import { VFG, OptionInput, UploadWrap } from "./VFG/index"
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'

export { VFG, SvgIcon, OptionInput, UploadWrap }
export function setupVFG(app: App<Element>) {
  app.use(VFG)
  app.component("svg-icon", SvgIcon as any)
}