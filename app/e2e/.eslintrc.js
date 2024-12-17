module.exports = {
  extends: [
    './node_modules/@devcrate/eslint-config/.eslintrc.js',
    "plugin:playwright/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    "playwright"
  ],
  rules: {
    // Additional naming conventions for e2e
    '@typescript-eslint/naming-convention': [
      'error',
      // Enforce Cmp suffix for component test classes
      {
        selector: 'class',
        filter: {
          regex: 'Cmp$',
          match: true
        },
        format: ['PascalCase'],
        suffix: ['Cmp']
      },
      // Enforce Page suffix for page objects
      {
        selector: 'class',
        filter: {
          regex: 'Page$',
          match: true
        },
        format: ['PascalCase'],
        suffix: ['Page']
      }
    ],

    // Playwright specific rules
    'playwright/no-conditional-in-test': 'off',
    'playwright/no-force-option': 'warn',
    'playwright/prefer-web-first-assertions': 'warn',

    // Stricter async/await rules for tests
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error'
  }
};
