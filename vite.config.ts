import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ script: { defineModel: true, propsDestructure: true } })],
  server: {
    proxy: {
      "/words": {
        target: "https://pastebin.ai",
        changeOrigin: true,
        rewrite: (path) => path.replace("/words", "/raw/iys4katchh"),
      },
    },
  },
});
