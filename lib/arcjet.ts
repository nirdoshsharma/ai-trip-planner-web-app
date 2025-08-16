import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    tokenBucket({
      mode: "LIVE", // "LIVE" blocks requests, "DRY_RUN" only logs
      characteristics: ["userId"], // track requests by userId
      refillRate: 5, // add 5 tokens per interval
      interval: 86400, // interval in seconds (1 day)
      capacity: 10, // bucket capacity (max tokens)
    }),
  ],
});
