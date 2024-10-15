import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as ElIcon from '@element-plus/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css'

import { setupVFG } from "./components/main"

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
setupVFG(app)

app.component("draggable", VueDraggable);
Object.keys(ElIcon).forEach((key) => {
    app.component(key, ElIcon[key as keyof typeof ElIcon])
})

app.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    setTimeout(() => {
        blocks.forEach((block: any) => {
            hljs.highlightBlock(block)
        })
    }, 200)
})
app.mount('#app')
