import {
  defineConfig
} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "path";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Listens on all network interfaces
    allowedHosts: [
     "s7l.project.crinix.us.kg"
    ],
    proxy: {
      '/api': {
        target: 'http://s7l.project.crinix.us.kg:3000', // Your backend
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname,
        "./src"),
    },
  }
}); 