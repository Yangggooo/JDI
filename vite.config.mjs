import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/JDI/" : "/",
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [
    {
      name: "jdi-embedded-home",
      transformIndexHtml() {
        return readFileSync(new URL("./public/jdi-embedded.html", import.meta.url), "utf8");
      },
    },
    react(),
  ],
});
