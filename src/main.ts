import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as ElIcon from '@element-plus/icons-vue'

import zhCn from 'element-plus/es/locale/lang/zh-cn';

import { setupVFG } from "./components/main"

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
setupVFG(app)

Object.keys(ElIcon).forEach((key) => {
    app.component(key, ElIcon[key as keyof typeof ElIcon])
})

app.mount('#app')
