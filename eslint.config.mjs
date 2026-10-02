import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { FlatCompat } = require("@eslint/eslintrc");
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "output/**"] },
  ...compat.extends("next/core-web-vitals"),
];
export default config;
