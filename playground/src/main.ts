import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus' // 三方依赖
import 'element-plus/theme-chalk/index.css'
import './assets/main.css'
import * as ElIcon from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createMemoryHistory, createWebHistory, createWebHashHistory, createRouter } from 'vue-router'

import Live from "/~/components/Live.vue"
import Index from "/~/pages/Index.vue"
import VueDraggableDemo from "/~/pages/VueDraggableDemo.vue"
const routes = [
    { path: '/', component: Index },
    { path: '/live', component: Live },
    { path: '/demo', component: VueDraggableDemo }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
})

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
Object.keys(ElIcon).forEach((key) => {
    app.component(key, ElIcon[key as keyof typeof ElIcon])
})

// vfg settings.
// import { setupVFG } from "vfg"
// @ts-ignore
import { setupVFG } from '/@/components/main';

// import 'vfg/dist/assets/css/style.css';
import 'virtual:svg-icons-register'
setupVFG(app)
app.use(router)
app.mount('#app')
