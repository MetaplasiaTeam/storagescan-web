import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      _: resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
    },
  },
  base: './',
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 100,
          propList: ['*'],
          unitPrecision: 5,
          replace: true,
          mediaQuery: false,
        }),
      ],
    },
  },
})
