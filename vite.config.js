import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["aws-sdk"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,

  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: {},
  }
});
