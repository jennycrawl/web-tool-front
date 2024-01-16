import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3030,
    proxy: {
      '/proxyapi': {
        target: 'http://jennycrawl2.jerehu.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxyapi/, '')
      },
    }
  },
  // devServer: {
  //   open: true,// vue项目启动时自动打开浏览器
  //   proxy: {
  //     '/api': {
  //       target: 'http://jennycrawl2.jerehu.com/',
  //       changeOrigin: true, //是否跨域
  //       rewrite:path => path.replace(/^\/api/,'')
  //     }
  //   }
  // },
  preview: {
    port: 8080,
  }
})
