import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env variables based on mode (development / production)
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'custom-main',
        remotes: {
          userManagement: env.VITE_USER_REMOTE,
          tariff: env.VITE_TARIFF_REMOTE,
        },
        shared: ['react', 'react-dom'],
      }),
    ],

    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },

    server: {
      port: 5000,
      strictPort: true,
    },

    preview: {
      port: 5000,
      strictPort: true,
    },
  }
})
