import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      langs: [],
    },
  },
  site: "https://hengin-eer.github.io/",
  vite: {
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
  },
});
