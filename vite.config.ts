import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	publicDir: 'public',
	resolve: {
        alias: {
            '~bootstrap': path.resolve('node_modules/bootstrap'),
        }
    }
})