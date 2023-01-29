module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "eslint-config-prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { printWidth: 120, useTab: false, tabWidth: 2, semi: true, singleQuote: false }],
  },
};
