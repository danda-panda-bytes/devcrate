# DevCrate ESLint Style Guide

*A comprehensive guide to maintaining code quality and consistency in the DevCrate project.*

## Overview

This document outlines the ESLint Style Guide used in the DevCrate project. This guide is based on [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript) but has been adapted to fit the specific needs and conventions of our codebase.

The ESLint configuration for the DevCrate project is designed to ensure consistent code quality and style across all JavaScript and TypeScript files. The configuration is defined in the [`.eslintrc.js`](../.eslintrc.js) file located in the `packages/src/eslint-config` directory.

## ESLint Configuration

The ESLint configuration extends the Airbnb style guide and includes additional rules tailored for our project. Below are the rules defined in [`packages/src/eslint-config/.eslintrc.js`](../.eslintrc.js) along with the reasons for each rule.


## Why Linter?

By adhering to this ESLint Style Guide, developers can ensure that the codebase remains clean, consistent, and easy to maintain. The rules outlined above are designed to promote best practices while allowing for flexibility where necessary.

## Prefer Java-esque Style?

See [Java-like ESLint Style Guide](./java-like-eslint-style-guide.md#modal) for more information on the Java-like style guide.


---

### Rules I changed and brief reasons why

1. **@typescript-eslint/consistent-type-exports**
   - **Reason**: This rule enforces a consistent style for exporting types. This helps export only what is necessary and decreases bundle size.

   ```javascript
   // bad export
   export { MyType } from './my-module';

   // good export
   export type { MyType } from './my-module';
   ```

2. **@typescript-eslint/consistent-type-imports**
   - **Reason**: This rule ensures that type imports are consistent throughout the codebase. It helps prevent confusion between type and value imports, making the code easier to read and maintain. It also helps with tree-shaking.

   ```javascript
   // bad import
   import { MyType } from './my-module';

   // good import
   import { type MyType } from './my-module';
   ```

3. **@typescript-eslint/indent**
   - **Reason**: Enforcing consistent indentation (2 spaces) improves readability and helps developers quickly understand the structure of the code without too much spacing (like 4 spaces).

4. **@typescript-eslint/lines-between-class-members**
   - **Reason**: This rule is turned off to allow flexibility in how class members are organized. It can be beneficial in certain cases to have members closely grouped together for better readability, but it can also be more difficult to read when there are too many members.

5. **@typescript-eslint/member-ordering**
   - **Reason**: This rule is turned off to allow developers to organize class members in a way that makes the most sense for their specific use case, rather than enforcing a strict order.

6. **@typescript-eslint/no-floating-promises**
   - **Reason**: This rule is set to warn developers about unhandled promises, which can lead to unintentional errors in asynchronous code. It encourages proper error handling and improves code reliability.

7. **@typescript-eslint/no-throw-literal**
   - **Reason**: This rule is turned off to allow throwing literals. In some cases, developers may want to throw simple values for error handling, and this rule can be overly restrictive.

8. **@typescript-eslint/no-unused-vars**
   - **Reason**: This rule is set to error for unused variables, helping to keep the code clean and free of unnecessary clutter.

9. **@typescript-eslint/no-use-before-define**
   - **Reason**: This rule is turned off to allow more flexibility in variable and function declarations, which can be useful in certain coding patterns.

10. **@typescript-eslint/object-curly-spacing**
    - **Reason**: This rule is turned off to allow developers to choose their preferred spacing style for object literals, providing flexibility in code formatting.

11. **@typescript-eslint/semi**
    - **Reason**: This rule enforces the use of NO semicolons, which cleans up the code and makes it more readable.

12. **array-bracket-spacing**
    - **Reason**: This rule is turned off to allow developers to choose their preferred spacing style for array literals, providing flexibility in code formatting.

13. **arrow-body-style**
    - **Reason**: This rule is turned off to allow developers to choose their preferred style for arrow function bodies, providing flexibility in code formatting.

14. **arrow-parens**
    - **Reason**: This rule is turned off to allow developers to choose their preferred style for arrow function parameter parentheses, providing flexibility in code formatting.

15. **class-methods-use-this**
    - **Reason**: This rule is turned off to allow methods that do not use `this` to be defined without requiring the use of `this`, which can be useful in certain coding patterns.

16. **consistent-return**
    - **Reason**: This rule is turned off to allow flexibility in return statements, which can be useful in certain coding patterns.

17. **function-paren-newline**
    - **Reason**: This rule is turned off to allow developers to choose their preferred style for function parameter newlines, providing flexibility in code formatting.

18. **import/default**
    - **Reason**: This rule is turned off to allow for more flexibility in how default exports are handled, which can be useful in certain coding patterns.

19. **import/named**
    - **Reason**: This rule is turned off to allow for more flexibility in how named imports are handled, which can be useful in certain coding patterns.

20. **import/namespace**
    - **Reason**: This rule is turned off to allow for more flexibility in how namespace imports are handled, which can be useful in certain coding patterns.

21. **import/no-extraneous-dependencies**
    - **Reason**: This rule is turned off to allow for more flexibility in how dependencies are managed, which can be useful in certain coding patterns.

22. **import/no-named-as-default-member**
    - **Reason**: This rule is turned off to allow for more flexibility in how default exports are handled, which can be useful in certain coding patterns.

23. **import/order**
    - **Reason**: This rule is turned off to allow developers to organize their imports in a way that makes the most sense for their specific use case, rather than enforcing a strict order.

24. **linebreak-style**
    - **Reason**: This rule is turned off to allow for flexibility in line break styles, accommodating different operating systems and developer preferences.

25. **max-classes-per-file**
    - **Reason**: This rule is turned off to allow for more flexibility in how classes are organized within files, which can be useful in certain coding patterns.

26. **no-await-in-loop**
    - **Reason**: This rule is turned off to allow for more flexibility in how asynchronous code is structured, which can be useful in certain coding patterns.

27. **no-console**
    - **Reason**: This rule is set to error for console statements, encouraging developers to use proper logging mechanisms instead of relying on console output.

28. **no-continue**
    - **Reason**: This rule is turned off to allow for more flexibility in how loops are structured, which can be useful in certain coding patterns.

29. **no-debugger**
    - **Reason**: This rule is set to error to prevent the use of debugger statements in production code, promoting cleaner and more maintainable code.

30. **no-param-reassign**
    - **Reason**: This rule is turned off to allow for more flexibility in how function parameters are handled, which can be useful in certain coding patterns.

31. **no-restricted-syntax**
    - **Reason**: This rule is turned off to allow for more flexibility in how certain syntax is used, which can be useful in certain coding patterns.

32. **object-curly-newline**
    - **Reason**: This rule is turned off to allow developers to choose their preferred style for object literal newlines, providing flexibility in code formatting.

33. **padded-blocks**
    - **Reason**: This rule is turned off to allow for more flexibility in how blocks are padded, which can be useful in certain coding patterns.

34. **prefer-promise-reject-errors**
    - **Reason**: This rule is turned off to allow for more flexibility in how promise rejection errors are handled, which can be useful in certain coding patterns.

35. **quotes**
    - **Reason**: This rule enforces the use of single quotes for strings, which is a common convention in JavaScript and helps maintain consistency across the codebase.

36. **max-len**
    - **Reason**: This rule is set to error for lines exceeding a certain length (120 characters), promoting readability and maintainability of the code.

37. **@typescript-eslint/naming-convention**
    - **Reason**: This rule enforces consistent naming conventions for various types of identifiers, which helps improve code readability and maintainability.
