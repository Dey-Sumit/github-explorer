import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Group MUI components into their own chunk
          mui: ['@mui/material', '@mui/icons-material'],
          // Group React into its own chunk
          react: ['react', 'react-dom'],
          // Group Apollo client into its own chunk
          apollo: ['@apollo/client'],
        },
      },
    },
  },
});
