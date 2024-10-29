import { VFG, OptionInput, UploadWrap } from "./VFG/index"
import SvgIcon from '/@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'
import 'highlight.js/styles/googlecode.css'
import type { VFGSetupOption } from "./setup"
import { setupVFG } from "./setup"
import { request } from "./setup";

export { VFG, SvgIcon, OptionInput, UploadWrap, request }
export type * from "/@/components/VFG/core/types/type"
export { setupVFG }
export type { VFGSetupOption }