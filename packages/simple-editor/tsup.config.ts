// @ts-nocheck
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
  ],
  esbuildOptions(options: any) {
    options.loader = {
      ...options.loader,
      ".scss": "css",
    }
  },
  banner: {
    js: '"use client";',
  },
  // CSS 파일도 번들에 포함
  outExtension({ format }: { format: string }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    }
  },
})
