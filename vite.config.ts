import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  /*
   * Build asset links relative to index.html instead of to the domain root.
   * GitHub Pages serves this project from /Living-Wonder-Taekwondo-Center/
   * rather than from /, and a root-relative link would look for the files in
   * the wrong place and 404. Relative links work from either location, so this
   * keeps working if the repo is renamed or moved to its own domain.
   */
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    // Lets us write "@/src/..." instead of long "../../" import paths.
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    // Split the libraries out of our own code. They change far less often,
    // so returning visitors can keep them cached between deployments.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined; // our own code stays in the main chunk
          }
          return id.includes('lucide-react') ? 'icons' : 'vendor';
        },
      },
    },
  },
});
