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
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
        pathGroups: [
          {
            pattern: '**',
            group: 'external',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        warnOnUnassignedImports: true,
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'class',
        filter: {
          regex: 'Component$',
          match: true
        },
        format: ['PascalCase'],
        suffix: ['Component']
      },
      {
        selector: 'class',
        filter: {
          regex: 'Service$',
          match: true
        },
        format: ['PascalCase'],
        suffix: ['Service']
      },
      {
        selector: 'class',
        filter: {
          regex: 'DataSource$',
          match: true
        },
        format: ['PascalCase'],
        suffix: ['DataSource']
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
          properties: 'explicit',
          methods: 'explicit'
        }
      }
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error'
  }
};
