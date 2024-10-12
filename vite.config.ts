import { fileURLToPath, URL } from 'node:url'
import path from "path";

import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from "./vite/plugins/index";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;

  return {
    plugins: createVitePlugins(env, mode, command === "build"),
    build: {
      lib: {
        entry: path.resolve(__dirname, "./src/components/VFG/index.ts"), //指定组件编译入口文件
        name: "vfg",
        fileName: "vfg",
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue"],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: "Vue",
          },
        },
      }, // rollup打包配置
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
