## Using Playwright for E2E Tests in the API and UI

- If using @angular/material or @devcrate, use the node library [`@devcrate/playwright`](./packages/playwright.md#modal)
- Using playwright to test both your API and UI in an effective way
  - **Use data-id** to select components for **consistency**
  - Use **playwright test generator** to quickly get the boilerplate
  - **Wait for network requests** to return and validate they give 200s
  - Connect to your **database** in Playwright so you can prepare and clean your test
  - Create an endpoint to log into app through POST request
  - Use playwright to test your API in a full e2e way (basically allowing you to automate a format like postman)
    - Make a POST request
    - Check its response
    - Go to the database to make sure the request finished with its proper result
  
