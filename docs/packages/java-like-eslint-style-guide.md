# Java-like ESLint Style Guide

*This document outlines the ESLint Style Guide adapted for Java-like syntax and conventions.*

## Overview

This guide is designed to enforce a coding style that is familiar to Java developers while maintaining the flexibility of JavaScript. The rules are based on the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) but have been modified to align with common Java practices.

## ESLint Configuration

The ESLint configuration extends the Airbnb base style guide and includes additional rules tailored for Java-like syntax. Below are the rules defined in `.eslintrc.java.js` along with the reasons for each rule.

### Rules

Its similar to DevCrate's [ESLint Style Guide](./style-guide.md#modal), but with some differences:

1. **Indentation**
   - **Rule**: `indent: ["error", 4]`
   - **Reason**: Enforces 4 spaces for indentation, which is a common practice in Java, improving readability.

2. **Semicolons**
   - **Rule**: `semi: ["error", "always"]`
   - **Reason**: Requires semicolons at the end of statements, aligning with Java syntax.

3. **Quotes**
   - **Rule**: `quotes: ["error", "double"]`
   - **Reason**: Enforces the use of double quotes for strings, which is a common convention in Java.

4. **Console Statements**
   - **Rule**: `no-console: "warn"`
   - **Reason**: Warns against the use of console statements, encouraging the use of proper logging mechanisms.

5. **Curly Braces**
   - **Rule**: `curly: ["error", "all"]`
   - **Reason**: Requires curly braces for all control statements, enhancing clarity and reducing errors.

6. **Brace Style**
   - **Rule**: `brace-style: ["error", "allman"]`
   - **Reason**: Enforces Allman style braces, which is a common style in Java.

7. **Line Break Style**
   - **Rule**: `linebreak-style: ["error", "unix"]`
   - **Reason**: Enforces Unix line endings, which is standard across many development environments.

8. **Maximum Line Length**
   - **Rule**: `max-len: ["error", { "code": 120 }]`
   - **Reason**: Limits lines to a maximum of 120 characters, promoting readability.

9. **Multiple Empty Lines**
   - **Rule**: `no-multiple-empty-lines: ["error", { "max": 1 }]`
   - **Reason**: Restricts the number of consecutive empty lines, keeping the code clean.

10. **Space Before Function Parentheses**
    - **Rule**: `space-before-function-paren: ["error", "never"]`
    - **Reason**: Disallows spaces before function parentheses, aligning with Java conventions.

11. **Object Curly Spacing**
    - **Rule**: `object-curly-spacing: ["error", "always"]`
    - **Reason**: Requires spaces inside curly braces for objects, improving readability.

12. **Array Bracket Spacing**
    - **Rule**: `array-bracket-spacing: ["error", "never"]`
    - **Reason**: Disallows spaces inside array brackets, which is a common practice in Java.

13. **Comma Dangle**
    - **Rule**: `comma-dangle: ["error", "always-multiline"]`
    - **Reason**: Requires trailing commas in multiline objects and arrays, making version control diffs cleaner.

14. **End of Line**
    - **Rule**: `eol-last: ["error", "always"]`
    - **Reason**: Enforces a newline at the end of files, which is a common convention in many programming languages.

## Conclusion

By adhering to this Java-like ESLint Style Guide, developers can ensure that the codebase remains clean, consistent, and easy to maintain, while also being familiar to those coming from a Java background. 
