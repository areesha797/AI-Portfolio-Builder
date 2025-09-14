// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/AI-Portfolio-Builder/", // <-- REPO_NAME with leading & trailing slash
  plugins: [react()],
});
