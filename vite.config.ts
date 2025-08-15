import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development'
  const isProduction = mode === 'production'

  return {
    plugins: [
      vue(),
      Components({
        resolvers: [PrimeVueResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      proxy: isDevelopment ? {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      } : undefined,
    },
    build: {
      outDir: 'dist',
      sourcemap: isDevelopment,
      minify: isProduction,
      rollupOptions: isProduction ? {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            primevue: ['primevue/config'],
          },
        },
      } : undefined,
    },
    define: {
      __API_BASE_URL__: isDevelopment 
        ? JSON.stringify('http://localhost:4000')
        : JSON.stringify('https://real-estate-listing-server.netlify.app/.netlify/functions'),
      __VUE_PROD_DEVTOOLS__: isDevelopment,
    },
  }
})
