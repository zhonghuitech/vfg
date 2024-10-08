import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'; // 三方依赖
import 'element-plus/theme-chalk/index.css';
import SvgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon'
import { VueDraggableNext } from "vue-draggable-next";
import DraggableWarp from "@/components/form-generator/form/DraggableWarp.vue";
import OptionInput from "@/components/form-generator/form/OptionInput.vue";
import UploadWarp from "@/components/form-generator/form/elementWarp/UploadWarp.vue";

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css' //样式文件

import DemoUI from "./components/demo-ui"; //导入
import FormBuilder from "./components/form-generator"

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});

app.use(DemoUI)
app.use(FormBuilder)

app.component("draggable", VueDraggableNext);
app.component("draggable-warp", DraggableWarp);
app.component("option-input", OptionInput);
app.use(elementIcons)
app.component("svg-icon", SvgIcon);
app.component("upload-warp", UploadWarp);

app.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    setTimeout(() => {
        blocks.forEach((block: any) => {
            hljs.highlightBlock(block)
        })
    }, 200)
})
app.mount('#app')
