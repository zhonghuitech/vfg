import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import FormGenerator from "./components/form-generator"; //导入

const app = createApp(App);
app.use(FormGenerator)
app.mount('#app')
