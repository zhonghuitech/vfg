# VFG
[![docs](https://github.com/zhonghuitech/vfg/actions/workflows/docs.yml/badge.svg)](https://github.com/zhonghuitech/vfg/actions/workflows/docs.yml)
<p>
     <a href="https://www.npmjs.com/package/vfg"><img src="https://badgen.net/npm/dm/vfg" alt="Download"></a>
     <a href="https://www.npmjs.com/package/vfg"><img src="https://badgen.net/npm/v/vfg" alt="Version"></a>
     <a href="https://www.npmjs.com/package/vfg"><img src="https://badgen.net/npm/license/vfg" alt="License"></a> 
</p>

VFG: Vue3 Form Generator (based Element-Plus).

## Usage
Install vfg
```sh
pnpm install vfg
```

Config `main.js`
```js
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'; // 三方依赖
import 'element-plus/theme-chalk/index.css';
import * as ElIcon from '@element-plus/icons-vue'
import { VueDraggableNext } from "vue-draggable-next";

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css' //样式文件

import { VFG, SvgIcon, DraggableWarp, OptionInput, UploadWarp } from "vfg"
import 'vfg/dist/style.css';

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});

app.use(VFG)
app.component("svg-icon", SvgIcon);
app.component("draggable", VueDraggableNext);
app.component("draggable-warp", DraggableWarp);
app.component("option-input", OptionInput);
import 'virtual:svg-icons-register'
Object.keys(ElIcon).forEach((key) => {
    app.component(key, ElIcon[key])
})
app.component("upload-warp", UploadWarp);

app.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    setTimeout(() => {
        blocks.forEach((block) => {
            hljs.highlightBlock(block)
        })
    }, 200)
})
app.mount('#app')
```

example: [vfg-usage-demo](https://github.com/zhonghuitech/vfg-usage-demo)


## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```
