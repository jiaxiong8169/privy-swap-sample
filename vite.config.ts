import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import commonjs from "vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), commonjs(), nodePolyfills()],
  resolve: {
    alias: {
      assert: "assert",
      buffer: "buffer",
      process: "process/browser",
      stream: "stream-browserify",
      url: "url",
      src: path.resolve(__dirname, "src"),
    },
  },
});
