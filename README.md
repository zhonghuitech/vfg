# VFG

<p>
     <a href="https://github.com/zhonghuitech/vfg/actions/workflows/docs.yml"><img src="https://github.com/zhonghuitech/vfg/actions/workflows/docs.yml/badge.svg" alt="Docs"></a>
     <a href="https://www.npmjs.com/package/vfg"><img src="https://badgen.net/npm/dm/vfg" alt="Download"></a>
     <a href="https://www.npmjs.com/package/vfg"><img src="https://badgen.net/npm/v/vfg" alt="Version"></a>
     <a href="https://www.npmjs.com/package/vfg"><img src="https://badgen.net/npm/license/vfg" alt="License"></a> 
</p>

VFG: Vue3 Form Generator (based on Element-Plus).

## Usage

1. Install `vfg`

```sh
pnpm install vfg
```

2. Config `main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus"; // based on element-plus.
import "element-plus/theme-chalk/index.css";
import * as ElIcon from "@element-plus/icons-vue";
import { VueDraggable } from 'vue-draggable-plus'

import zhCn from "element-plus/es/locale/lang/zh-cn";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css"; // hl style.

import { VFG, SvgIcon, OptionInput, UploadWrap } from "vfg";
import "vfg/dist/style.css";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});

app.use(VFG);
app.component("svg-icon", SvgIcon);
app.component("draggable", VueDraggable);
app.component("option-input", OptionInput);
import "virtual:svg-icons-register";
Object.keys(ElIcon).forEach((key) => {
  app.component(key, ElIcon[key]);
});
app.component("upload-wrap", UploadWrap);

app.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  setTimeout(() => {
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  }, 200);
});
app.mount("#app");
```

3. Page use vfg
```vue
<template>
  <div>
    <FormGenerator device="pc" />
  </div>
</template>

<script lang="ts" setup>
</script>
``` 

4. Full example
[vfg-usage-demo](https://github.com/zhonghuitech/vfg-usage-demo)

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
