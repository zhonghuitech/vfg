import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import DemoUI from "./components/demo-ui"; //导入

const app = createApp(App);
app.use(DemoUI)
app.mount('#app')
