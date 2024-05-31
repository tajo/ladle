import react from "eslint-plugin-react/configs/recommended.js";
import prettier from "eslint-plugin-prettier/recommended";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  react,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "no-useless-escape": "off",
      "no-empty": "off",
      "no-global-assign": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);
