const svelte = require("rollup-plugin-svelte");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const polyfillNode = require("rollup-plugin-polyfill-node");
const svelteConfig = require("./svelte.config.js");

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  input: "src/main.js",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "dist/main.js",
    globals: {
      events: "EE", // Global variable name for 'events'
    },
  },
  plugins: [
    svelte({
      ...svelteConfig,
      compilerOptions: { dev: !production },
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    polyfillNode(),
    production && terser(),
  ],
};
