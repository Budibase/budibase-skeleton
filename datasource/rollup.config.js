import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import json from "rollup-plugin-json"
import copy from "rollup-plugin-copy2"
import typescript from "@rollup/plugin-typescript"

export default {
  input: "src/index.ts",
  output: {
    sourcemap: false,
    format: "cjs",
    file: "dist/plugin.min.js",
    inlineDynamicImports: true,
    exports: "default",
  },
  plugins: [
    resolve({
      preferBuiltins: true,
      browser: false,
    }),
    typescript(),
    commonjs(),
    json(),
    terser(),
    copy({
      assets: ["schema.json", "package.json"],
    }),
  ],
}
