import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  redirects: {
    "/talks": "/talks/day-1"
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), react()]
  // adapter: vercel({
  //   edgeMiddleware: true
  // }),
  ,

  adapter: netlify({})
});
