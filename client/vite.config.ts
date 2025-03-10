import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "s7l.project.crinix.us.kg"
    ],
    proxy: {
      "/api": {
        target: "http://s7l.project.crinix.us.kg:3000"
      }
    },
  }
})
