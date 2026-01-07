import stylistic from "@stylistic/eslint-plugin";
import oxlint from "eslint-plugin-oxlint";
import { type Config, defineConfig, globalIgnores } from "eslint/config";

const _default: Config[] = defineConfig(
  globalIgnores(["node_modules", "dist"]),
  stylistic.configs.customize({
    braceStyle: "1tbs",
    semi: true,
    quotes: "double",
  }),
  oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
  {
    rules: {
      // See https://github.com/eslint/eslint/issues/20272
      "@typescript-eslint/unified-signatures": "off",
      // Namespaces are cool
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-misused-promises": ["error", {
        checksVoidReturn: false,
      }],
    },
  },
);

export default _default;
