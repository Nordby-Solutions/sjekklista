// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MiB
      },
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallback: "index.html",
      },
      manifest: {
        name: "Sjekklista",
        short_name: "Sjekklista",
        description: "Lag og del sjekklister enkelt og raskt",
        lang: "nb",
        dir: "ltr",
        scope: "/",
        start_url: "/",
        display: "standalone",
        display_override: ["standalone", "minimal-ui", "browser"],
        theme_color: "#825bf9",
        background_color: "#825bf9",
        categories: ["productivity", "business"],
        prefer_related_applications: false,
        // Optional: Add if you have a native app
        // related_applications: [
        //   {
        //     platform: "play",
        //     id: "com.example.nativeapp"
        //   }
        // ],
        // Optional: Add if you have an IARC rating
        // iarc_rating_id: "e1234567890",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
