import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3001, // Replace 3001 with your desired port number
  },
  plugins: [react()],
});
