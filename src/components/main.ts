import { VFG, OptionInput, UploadWrap, request } from "./VFG/index"
import SvgIcon from '/@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'
import 'highlight.js/styles/googlecode.css'
import type { VFGSetupOption } from "./setup"
import { setupVFG } from "./setup"

export { VFG, SvgIcon, OptionInput, UploadWrap, request }
export { setupVFG }
export type { VFGSetupOption }