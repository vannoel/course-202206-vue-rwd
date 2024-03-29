import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import sassAbstractsImports from './utils/sassAbstractsImports';

// import path from 'path';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: [...sassAbstractsImports, ''].join(';\n')
      },
      sass: { charset: false },
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ],
    },
  },
})
