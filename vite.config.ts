import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap' // 1. 引入外掛

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 2. 設定 Sitemap
    Sitemap({
      hostname: 'https://ruisse.cc/',
      dynamicRoutes: [
        '/',
        '/about',
        '/testimonials',
        '/work/outdoor',
        '/work/modelcard',
        '/work/light',
        '/work/exquisite',
        '/work/birthday',
        '/work/customized',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})