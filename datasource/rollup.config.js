import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import json from "rollup-plugin-json"
import copy from "rollup-plugin-copy2"
import typescript from "@rollup/plugin-typescript"

const ignoredWarnings = [
  "unused-export-let",
  "css-unused-selector",
  "module-script-reactive-declaration",
  "a11y-no-onchange",
]

export default {
  input: "src/index.js",
  output: {
    sourcemap: false,
    format: "cjs",
    file: "dist/plugin.min.js",
    name: "plugin",
  },
  plugins: [
    typescript(),
    resolve({
      preferBuiltins: true,
      browser: false,
    }),
    json(),
    terser(),
    copy({
      assets: ["schema.json.hbs", "package.json"],
    }),
  ],
}
