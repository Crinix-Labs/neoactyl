import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       host: '0.0.0.0', // Listens on all network interfaces
       allowedHosts: [
         '5173-crinix-labs-s7l-client-ii2g2i9g8q.app.codeanywhere.com' // Add your CodeAnywhere host
       ]
     }
   }); 