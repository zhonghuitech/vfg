import type { App } from 'vue';
import { VFG } from "./VFG/index"
import SvgIcon from '/@/components/SvgIcon/index.vue'
import { VueDraggable } from 'vue-draggable-plus'
import hljs from 'highlight.js';
import type { RequestConfig } from './VFG/core/network/request';
import requestDefault from "./VFG/core/network/request";
import { createRequest } from "./VFG/core/network/request";

export interface VFGSetupOption {
    initSvgIcon: boolean,
    reqConfig: RequestConfig
}

export const DEFAULT_OPTION: VFGSetupOption = {
    initSvgIcon: true,
    reqConfig: {
        baseURL: '',
        getToken: null
    }
}

let request = requestDefault;
export function setupVFG(app: App<Element>, option?: VFGSetupOption) {
    if (option && option.reqConfig) {
        request = createRequest(option.reqConfig)
    }

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

export { request }