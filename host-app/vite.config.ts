import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
        name: 'host-app',
        remotes: {
            'reactmf-app': 'http://localhost:3001/assets/remoteEntry.js',
            'vuemf-app': 'http://localhost:4173/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom']
        }),
    ],
    build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
    preview: {
        port: 3000,
        strictPort: true,
        cors: true
    },
    server: {
        port: 3000,
        strictPort: true,
        cors: true
    }
})
