import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import DemoUI from "./components/demo-ui"; //导入
import FormGenerator from "./components/form-generator"

const app = createApp(App);
app.use(DemoUI)
app.use(FormGenerator)
app.mount('#app')
