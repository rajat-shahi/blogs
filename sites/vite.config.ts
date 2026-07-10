import { defineConfig } from "vite";

export default defineConfig(async () => {
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    publicDir: ".sites/export",
    plugins: [
      cloudflare({
        config: {
          name: "blogs",
          main: "./sites/worker/index.ts",
          compatibility_date: "2026-05-15",
          compatibility_flags: ["nodejs_compat"],
        },
      }),
    ],
  };
});
