module.exports = {
  env: {
    browser: true,
    es6: true
  },

  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },

  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },

  plugins: ["react"],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/camelcase": "off",
    "no-console": "off"
  }
};
