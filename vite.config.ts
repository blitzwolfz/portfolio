import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'Sam_Qureshi.pdf') {
            return 'assets/Sam_Qureshi.pdf'; // Specify the original directory
          }
          return 'assets/[name].[ext]'; // Default pattern for other assets
        },
      },
    },
  },
})
