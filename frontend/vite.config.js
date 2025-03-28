import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Expose the app to the local network
    port: 5173, // Default port (you can change it if needed)
    open: true, // Open the app automatically in the browser when the server starts
    strictPort: true, // Ensures Vite doesn't try to use a different port if 5173 is busy
  },
})
