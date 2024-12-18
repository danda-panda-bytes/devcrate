# @devcrate/eslint-config

This package provides a standardized ESLint configuration for TypeScript projects, ensuring consistent code quality and style across your codebase.

This adheres to the [DevCrate ESLint Style Guide](./style-guide.md#modal).

## Installation

To install the ESLint configuration package, run the following command:


```bash
npm install @devcrate/eslint-config
```

## Usage

To use the ESLint configuration in your project, create an `.eslintrc.js` file in the root of your project and extend the configuration:

```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    './node_modules/@devcrate/eslint-config/.eslintrc.js'
  ],
  rules: {
    // Add additional rules or overrides here
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error'
  }
};
```

If you need to have another `.eslintrc.js` file, you can extend the configuration from the main file like so:

```javascript
module.exports = {
  extends: [
    // Add the extended config
    "./node_modules/@devcrate/eslint-config/.eslintrc.js",

    // Add any additional plugins
    "plugin:playwright/recommended"
  ],
  plugins: [
    // Any additional plugins go here
    "playwright"
  ],
  rules: {
    // More overrides here
    '@typescript-eslint/no-misused-promises': 'error'
  }
}; 

```

## Features

- **Standardized Rules**: Provides a set of recommended rules for JavaScript and TypeScript.
- **Customizable**: Easily extend or override rules to fit your project's needs.
- **Integration**: Works seamlessly with popular editors and CI/CD pipelines.

## Further Help

For more information on configuring ESLint, refer to the [ESLint documentation](https://eslint.org/docs/user-guide/configuring).
