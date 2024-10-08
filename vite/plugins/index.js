import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // 添加这一句
import vueDevTools from 'vite-plugin-vue-devtools'

import createSvgIcon from './svg-icon'

export default function createVitePlugins(viteEnv, mode, isBuild = false) {
    const vitePlugins = [vue(), vueJsx(), vueDevTools()]
    vitePlugins.push(createSvgIcon(isBuild))
    return vitePlugins
}