import type { App } from 'vue';
import { VFG, OptionInput, UploadWrap } from "./VFG/index"
import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'
import { VueDraggable } from 'vue-draggable-plus'
import hljs from 'highlight.js';

export { VFG, SvgIcon, OptionInput, UploadWrap }
export function setupVFG(app: App<Element>) {
    app.use(VFG)
    app.component("svg-icon", SvgIcon as any)
    app.component("draggable", VueDraggable as any);
    app.directive('highlight', function (el: any) {
        let blocks = el.querySelectorAll('pre code');
        setTimeout(() => {
            blocks.forEach((block: any) => {
                hljs.highlightBlock(block)
            })
        }, 200)
    })
}