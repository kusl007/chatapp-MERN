import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),   
    tailwindcss(),
    ],
    server: {
      allowedHosts: [
        'ea1d-110-44-115-197.ngrok-free.app',
        ' https://7589-110-44-115-197.ngrok-free.app'
        // you can also add 'localhost' or other hosts if needed
      ],
    }
  
})
