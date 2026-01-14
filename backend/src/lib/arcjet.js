import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import dotenv from "dotenv";
dotenv.config();

let aj;

if (!process.env.ARC_JET_KEY) {
  // If no key is set, provide a no-op stub so requiring this module won't throw
  // and the middleware will simply skip protection.
  // eslint-disable-next-line no-console
  console.warn('ARC_JET_KEY is not set — Arcjet protection disabled');
  aj = {
    protect: async () => ({
      isDenied: () => false,
      results: [],
    }),
  };
} else {
  aj = arcjet({
    // Get your site key from https://app.arcjet.com and set it as an environment
    // variable rather than hard coding.
    key: process.env.ARC_JET_KEY,
    rules: [
      // Shield protects your app from common attacks e.g. SQL injection
      shield({ mode: "LIVE" }),
      // Create a bot detection rule
      detectBot({
        mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
        // Block all bots except the following
        allow: [
          "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        ],
      }),
      // Create a token bucket rate limit. Other algorithms are supported.
      slidingWindow({
        mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
        max: 100, // max 100 requests
        interval: 60, // per 60 seconds
      }),
    ],
  });
}

export default aj;