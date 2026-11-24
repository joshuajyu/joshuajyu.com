// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://joshuajyu.com",
  output: "static",
  // Astro 7's compiler strips newline whitespace next to inline elements
  // when compressing ("at<a>Ada</a>" → "atAda"); keep source whitespace.
  compressHTML: false,
  vite: {
    plugins: [tailwindcss()],
  },
});
