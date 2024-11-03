// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://oauth.reddit.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy) => {
          const userAgent = "Alternative Client/1.0.0 (by /u/Im-a-developer)";

          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("User-Agent", userAgent);
          });
        },
      },
    },
  },
});
