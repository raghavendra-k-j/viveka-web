import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      '@typescript-eslint/no-unused-vars': 'off',
      "prefer-const": "off",
      "react/jsx-key": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/prefer-as-const": "off",
    },
  }),
];

export default eslintConfig;
