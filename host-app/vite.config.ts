import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Load env variables for the current mode
    const env = loadEnv(mode, process.cwd(), '');
    const reactMicrofrontendUrl = env.REACT_MICROFRONTEND_URL;
    const vueMicrofrontendUrl = env.VUE_MICROFRONTEND_URL;

    return {
        plugins: [
            react(),
            tailwindcss(),
            federation({
                name: 'host-app',
                remotes: {
                    'reactmf-app': `${reactMicrofrontendUrl}assets/remoteEntry.js`,
                    'vuemf-app': `${vueMicrofrontendUrl}assets/remoteEntry.js`,
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
    }
})
