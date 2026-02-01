import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    outDir: 'dist',
    
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-http': ['axios'],
        },
      },
    },
    
    chunkSizeWarningLimit: 500,
    
    // Copiar arquivos da pasta public para dist
    copyPublicDir: true,
  },
  
  server: {
    port: 5173,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  preview: {
    port: 4173,
  },
  
  css: {
    devSourcemap: true,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },
});
