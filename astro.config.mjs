import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://hengin-eer.github.io/timtim-tech-v1',
  vite: {
    optimizeDeps: {
      noDiscovery: true,
      include: []
    }
  }
});