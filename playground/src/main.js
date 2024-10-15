import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'; // 三方依赖
import 'element-plus/theme-chalk/index.css';
import * as ElIcon from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
Object.keys(ElIcon).forEach((key) => {
    app.component(key, ElIcon[key])
})

// vfg settings.
import { setupVFG } from "vfg"
import 'vfg/dist/assets/css/style.css';
import 'virtual:svg-icons-register'
setupVFG(app)

app.mount('#app')
