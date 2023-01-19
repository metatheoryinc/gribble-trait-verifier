import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "index.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "gtv",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write("bundle.css");
      }
    }),
    resolve(),
    commonjs(),
    production && terser()
  ]
};
