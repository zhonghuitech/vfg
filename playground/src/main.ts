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
import SortableDemo from "/~/pages/SortableDemo.vue"
import TableDemo from "/~/pages/TableDemo.vue"

import SortTable from "/~/pages/SortTable.vue"
import SortTable2 from "/~/pages/SortTable2.vue"
import VfgTableDemo from './pages/VfgTableDemo.vue'
import PopoverDemo from './pages/PopoverDemo.vue'


const routes = [
    { path: '/', component: Index },
    { path: '/live', component: Live },
    { path: '/vd', component: VueDraggableDemo },
    { path: '/sd', component: SortableDemo },
    { path: '/st', component: SortTable },
    { path: '/st2', component: SortTable2 },
    { path: '/vt', component: VfgTableDemo },
    { path: '/td', component: TableDemo },
    { path: '/popover', component: PopoverDemo },
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
