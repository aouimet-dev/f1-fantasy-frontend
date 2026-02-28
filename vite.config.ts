import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const backendTarget = (env.VITE_BACKEND_BASE_URL || 'http://localhost:8082').replace(/\/$/, '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      port: 5175,
      strictPort: true,
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
        },
        '/oauth2': {
          target: backendTarget,
          changeOrigin: true,
        },
        '/login/oauth2': {
          target: backendTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
