module.exports = {
  extends: "../../.eslintrc.js",
  parserOptions: {
    project: "./src/utils/tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "no-console": "off",
    "import/no-extraneous-dependencies": "off"
  }
}
