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
    typescript({
      compilerOptions: {
        target: "es6",
        module: "esnext",
        lib: ["es2020"],
        allowJs: true,
        strict: true,
        noImplicitAny: true,
        esModuleInterop: true,
        resolveJsonModule: true,
        types: ["node"],
        skipLibCheck: true,
        moduleResolution: "node",
      },
      include: ["./src/**/*"],
      exclude: ["node_modules", "dist", "**/*.spec.ts", "**/*.spec.js"],
    }),
    commonjs(),
    json(),
    terser(),
    copy({
      assets: ["schema.json", "package.json"],
    }),
  ],
}
