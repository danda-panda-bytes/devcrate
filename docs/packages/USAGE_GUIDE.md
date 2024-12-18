# Standard Guide for Playwright Testing Library

## Introduction

This guide provides instructions on how to use the Playwright Testing Library for end-to-end testing of web applications. It covers setup, writing tests, and best practices.

## Prerequisites

- Node.js installed on your machine.
- Playwright installed in your project. You can install it using npm:
  ```bash
  npm install -D @playwright/test  ```

## Setting Up Your Tests

1. **Directory Structure**: Organize your tests into the following directories:
   - `components/`: For component classes.
   - `pages/`: For page classes.
   - `specs/`: For test specifications.

2. **Creating Component Classes**: Define your UI components in `.cmp.ts` files. Each class should encapsulate the locators and actions for the component.
   ```typescript
   // Example: app/e2e/components/button.cmp.ts
   import { Locator, Page } from '@playwright/test';

   export class ButtonCmp {
     constructor(private readonly page: Page) {}

     public get button(): Locator {
       return this.page.locator('button[data-testid="my-button"]');
     }

     async click(): Promise<void> {
       await this.button.click();
     }
   }   ```

3. **Creating Page Classes**: Define your pages in `.po.ts` files. These classes should aggregate component classes and provide methods for interacting with the page.
   ```typescript
   // Example: app/e2e/pages/home.po.ts
   import { Page } from '@playwright/test';
   import { ButtonCmp } from '../components/button.cmp';

   export class HomePage {
     private buttonCmp: ButtonCmp;

     constructor(private readonly page: Page) {
       this.buttonCmp = new ButtonCmp(page);
     }

     async clickButton(): Promise<void> {
       await this.buttonCmp.click();
     }
   }   ```

4. **Writing Test Specifications**: Create test files in the `specs/` directory. Use the component and page classes to perform actions and assertions.
   ```typescript
   // Example: app/e2e/specs/home.spec.ts
   import { test, expect } from '@playwright/test';
   import { HomePage } from '../pages/home.po';

   test('Home page button click', async ({ page }) => {
     const homePage = new HomePage(page);
     await page.goto('http://localhost:3000');
     await homePage.clickButton();
     // Add assertions here
   });   ```

## Best Practices

- **Always use data-testid attributes**: Use `data-testid` attributes to identify elements in your components and pages. This makes it easier to maintain and update your tests.

   ```typescript
   // Example: app/e2e/components/button.cmp.ts
   public get button(): Locator {
     return this.page.getByTestId('my-button');
   }
   ```

   Then in the html:

   ```html
   <button data-testid="my-button">Click me</button>
   ```
- **Keep Tests Isolated**: Ensure that each test is independent and does not rely on the state of other tests. Every test should create and delete its own data.
- **Use Descriptive Names**: Name your classes and methods clearly to convey their purpose.
- **Define Locators with getters**: Use getters to define locators in your component classes. This makes it easier to understand and maintain the locators. It also ensures that when you retrieve the locator, it is retrieved from the DOM in real-time. This is critical for ensuring that your tests are reliable and consistent.
- **Use Page Objects**: Use page objects to represent entire pages and provide methods for interacting with them. This promotes clarity and separation of concerns.
- **Use Component Classes**: Use component classes to define reusable UI components. This promotes reusability and maintainability.
- **Organize Tests Logically**: Group related tests together in the `specs/` directory for better organization.

## Conclusion

By following this guide, you can effectively utilize the Playwright Testing Library to create robust end-to-end tests for your web applications. Happy testing!
