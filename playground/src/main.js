import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'; // 三方依赖
import 'element-plus/theme-chalk/index.css';
import * as ElIcon from '@element-plus/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css' //样式文件

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
app.component("draggable", VueDraggable);
Object.keys(ElIcon).forEach((key) => {
    app.component(key, ElIcon[key])
})
app.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    setTimeout(() => {
        blocks.forEach((block) => {
            hljs.highlightBlock(block)
        })
    }, 200)
})

// vfg settings.
import { setupVFG } from "vfg"
import 'vfg/dist/assets/css/style.css';
import 'virtual:svg-icons-register'

setupVFG(app)

app.mount('#app')
