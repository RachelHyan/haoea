module.exports = {
  globals: {
    AMap: "readonly",
    Loca: "readonly",
  },
  root: true,
  env: { node: true, },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended"
  ],
  rules: {
    "comma-dangle": ["error", {
      arrays: "never",
      objects: "always",
      imports: "never",
      exports: "never",
      functions: "never",
    }],
    "no-lonely-if": "error",
    quotes: ["error", "double"],
    "no-tabs": ["off"],
    indent: ["error", 2],
    semi: ["off"],
    "vue/no-multiple-template-root": ["off"],
    "vue/no-v-model-argument": ["off"],
    "@typescript-eslint/ban-ts-comment": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
  },
};
