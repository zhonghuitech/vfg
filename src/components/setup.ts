import type { App } from 'vue';
import { VFG } from "./VFG/index"
import SvgIcon from '/@/components/SvgIcon/index.vue'
import { VueDraggable } from 'vue-draggable-plus'
import hljs from 'highlight.js';

export interface VFGSetupOption {
    initSvgIcon: boolean,
}

export const DEFAULT_OPTION: VFGSetupOption = {
    initSvgIcon: true
}

export function setupVFG(app: App<Element>, option?: VFGSetupOption) {
    const options = option ? { ...DEFAULT_OPTION, ...option } : DEFAULT_OPTION;

    app.use(VFG)
    if (options.initSvgIcon) {
        app.component("svg-icon", SvgIcon as any)
    }

    app.component("draggable", VueDraggable as any);
    app.directive('highlight', function (el: any) {
        let blocks = el.querySelectorAll('pre code');
        setTimeout(() => {
            blocks.forEach((block: any) => {
                hljs.highlightElement(block)
            })
        }, 200)
    })
}