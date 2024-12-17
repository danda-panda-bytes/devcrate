module.exports = {
  extends: [
    "airbnb-typescript/base",
    "plugin:deprecation/recommended"
  ],
  plugins: [
    "only-warn",
    "import"
  ],
  rules: {
    "curly": ["error", "all"],
    "brace-style": ["error", "allman"],
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", { "code": 120 }],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "space-before-function-paren": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error", "always"],

    "@typescript-eslint/consistent-type-exports": ["warn", {"fixMixedExportsWithInlineTypeSpecifier": true}],
    "@typescript-eslint/consistent-type-imports": ["warn", {"disallowTypeAnnotations": false}],
    "@typescript-eslint/indent": ["error", 4],
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/no-floating-promises": ["warn", { "ignoreIIFE": true, "ignoreVoid": true }],
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/object-curly-spacing": "off",
    "@typescript-eslint/semi": ["error", "always"],
    "array-bracket-spacing": "off",
    "arrow-body-style": "off",
    "arrow-parens": "off",
    "class-methods-use-this": "off",
    "consistent-return": "off",
    "function-paren-newline": "off",
    "import/default": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default-member": "off",
    "import/order": "off",
    "import/prefer-default-export": "off",
    "linebreak-style": "off",
    "max-classes-per-file": "off",
    "no-await-in-loop": "off",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-continue": "off",
    "no-debugger": 2,
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "object-curly-newline": "off",
    "padded-blocks": "off",
    "prefer-promise-reject-errors": "off",
    "quotes": ["warn", "double", { "avoidEscape": true }],
    "max-len": ["error", {
      "code": 120,
      "ignoreUrls": true,
      "ignoreTrailingComments": true,
      "ignoreComments": true,
      "ignoreStrings": true,
      "ignorePattern": "^import\\s.+\\sfrom\\s.+;$",
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true
    }],
    '@typescript-eslint/naming-convention': [
      'error',
      // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
      { selector: 'default', format: ['camelCase'] },
      { selector: 'parameter', format: null },
      { selector: 'parameterProperty', format: null },
      { selector: 'method', format: null },
      { selector: 'function', format: ['UPPER_CASE', 'camelCase'] },
      // Allow UPPER_CASE for variables to cater for 23.10
      { selector: 'variable', format: null },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums.
      { selector: 'typeLike', format: ['PascalCase'] },
      // Allow only PascalCase naming convention for enum members, because Airbnb has no recommendation
      { selector: ['enum', 'enumMember'], format: ['PascalCase'] },
      // Allow any naming convention for properties, because:
      // (1) Airbnb does not specify any naming conventions for properties
      // (2) The `camelcase` rule specifically disables checking properties: https://github.com/airbnb/javascript/blob/06b3ab11d9a443ff46f052dd00375e271e5146e6/packages/eslint-config-airbnb-base/rules/style.js#L24
      { selector: 'property', format: null },
    ],
  }
}
