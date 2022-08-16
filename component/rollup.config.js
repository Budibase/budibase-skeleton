import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import svelte from "rollup-plugin-svelte"
import { terser } from "rollup-plugin-terser"
import postcss from "rollup-plugin-postcss"
import svg from "rollup-plugin-svg"
import json from "rollup-plugin-json"
import nodePolyfills from "rollup-plugin-polyfill-node"
import copy from "rollup-plugin-copy2"
import tar from "tar"
import fs from "fs"
import pkg from "./package.json"

const ignoredWarnings = [
  "unused-export-let",
  "css-unused-selector",
  "module-script-reactive-declaration",
  "a11y-no-onchange",
]

// Custom plugin to bundle up our files after building
const bundle = () => ({
  async writeBundle() {
    const bundleName = `${pkg.name}-${pkg.version}.tar.gz`
    return tar
        .c({ gzip: true, cwd: "dist" }, [
          "plugin.min.js",
          "schema.json",
          "package.json",
        ])
        .pipe(fs.createWriteStream(`dist/${bundleName}`))
  },
})

export default {
  input: "src/index.js",
  output: {
    sourcemap: false,
    format: "iife",
    file: "dist/plugin.min.js",
    name: "plugin",
    globals: {
      svelte: "svelte",
      "svelte/internal": "svelte_internal",
    },
  },
  external: ["svelte", "svelte/internal"],
  plugins: [
    svelte({
      emitCss: true,
      onwarn: (warning, handler) => {
        // Ignore some warnings
        if (!ignoredWarnings.includes(warning.code)) {
          handler(warning)
        }
      },
    }),
    postcss(),
    commonjs(),
    nodePolyfills(),
    resolve({
      preferBuiltins: true,
      browser: true,
      skip: ["svelte", "svelte/internal"],
    }),
    svg(),
    json(),
    terser(),
    copy({
      assets: ["schema.json", "package.json"],
    }),
    bundle(),
  ],
}
