import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// import viteImagemin from 'vite-plugin-imagemin'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      swiper: path.resolve(__dirname, 'node_modules/swiper/'),
    },
  },

  build: {
    minify: 'esbuild',
  },

  plugins: [
    vue({
      css: false, // 重要：vue 单文件中的样式提取为单个文件
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon__[dir]/[name]',

      /**
       * 自定义插入位置
       * @default: body-last
       */
      inject: 'body-last',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),

    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 8,
    //     interlaced: false,
    //   },
    //   optipng: {
    //     optimizationLevel: 9,
    //   },
    //   mozjpeg: {
    //     quality: 85,
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox',
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false,
    //       },
    //     ],
    //   },
    // }),

  ],

  ssr: {
    format: 'cjs',

    // 重要
    // noExternal: ['swiper'],

    external: ['@amap/amap-jsapi-loader'],
  },

  server: {
    host: '0.0.0.0',
  },
})
