import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Relative base so the build works on GitHub Pages (/portfolio/) and Vercel (/)
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  // The lazily loaded Three.js scene is ~265 kB gzipped; that's expected
  build: { chunkSizeWarningLimit: 1100 },
});
