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
      '5173-crinix-labs-s7l-client-ii2g2i9g8q.app.codeanywhere.com', // Add your CodeAnywhere host
      '5173-crinix-labs-s7l-client-ii2g2i9g8q.app.codeanywhere.com',
      'localhost',
      'wanted-man-sterling.ngrok-free.app'
    ],
    proxy: {
      '/api': {
        target: 'http://director-cameroon.gl.at.ply.gg:56190', // Your backend
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