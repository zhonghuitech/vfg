import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: command === 'build' ? '/vfg/' : '',
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [
          path.resolve(process.cwd(), 'node_modules/vfg/dist/assets/icons'),
          path.resolve(process.cwd(), 'src/assets/icons')
        ],
        symbolId: 'icon-[dir]-[name]',
      })
    ]
  }
})
