# @devcrate/playwright

The Playwright Testing Library is designed to facilitate end-to-end testing of web applications using Playwright. This library provides a structured approach to organizing components and pages, making it easier to write, maintain, and scale tests.

## Features

- **Component-Based Structure**: Encapsulates UI components in dedicated classes for better reusability and maintainability.
- **Angular Material Helpers**: Provides utility functions for common Angular Material interactions.
- **Easy Integration**: Seamlessly integrates with Playwright for robust testing capabilities in Angular 17+ with Angular Material and DevCrate.


## Directory Structure

- **components/**: Contains component classes (e.g., `*.cmp.ts`) that define the behavior of individual UI components.
- **utils/**: Contains utility functions for common tasks such as reading configuration files, waiting for elements to load, and handling class lists.

## Standard Guide

To learn good standards, please refer to the [Standard Guide](USAGE_GUIDE.md#modal).

## Installation

1. Install the package using npm:
   ```bash
   npm install -D @devcrate/playwright
   ```

2. Install peer dependencies:
   ```bash
   npm install -D @playwright/test
   ```


3. Ensure you initialized Playwright in your project

   For end-to-end testing with Playwright, please refer to the official Playwright documentation on getting started: [Playwright Angular Testing Guide](https://playwright.dev/docs/intro)

## Available Components

The library exports the following components and utilities:

- [MaterialHelpers](https://github.com/danda-panda-bytes/devcrate/tree/main/packages/src/playwright/src/components/material-helpers.utils.ts): Utility functions for Angular Material components
  - [@angular/material](https://material.angular.io/)
- [DropdownCmp](https://github.com/danda-panda-bytes/devcrate/tree/main/packages/src/playwright/src/components/dropdown.cmp.ts): Test helper for interacting with dropdown elements
  - [@devcrate/ngx-dc-dropdown](../../../projects/devcrate/ngx-dc-dropdown/README.md#modal)
- [MoveableFileViewerCmp](https://github.com/danda-panda-bytes/devcrate/tree/main/packages/src/playwright/src/components/moveable-file-viewer.cmp.ts): Test helper for file viewer interactions
  - [@devcrate/ngx-dc-file-viewer](../../../projects/devcrate/ngx-dc-file-viewer/README.md#modal)
- [SidePaneListCmp](https://github.com/danda-panda-bytes/devcrate/tree/main/packages/src/playwright/src/components/side-pane-list.cmp.ts): Test helper for side pane list interactions
  - [@devcrate/ngx-dc-side-pane-list](../../../projects/devcrate/ngx-dc-side-pane-list/README.md#modal)
- [UploadFileButtonCmp](https://github.com/danda-panda-bytes/devcrate/tree/main/packages/src/playwright/src/components/upload-file-button.cmp.ts): Test helper for file upload interactions
  - [@devcrate/ngx-dc-upload-file-button](../../../projects/devcrate/ngx-dc-file-viewer/upload-file-button.md#modal)
- [Utils](https://github.com/danda-panda-bytes/devcrate/blob/main/packages/src/playwright/src/utils/utils.ts): General utility functions for testing

## Usage Examples

### Using the DropdownCmp

To test the [`NgxDcDropdown`](../../../projects/devcrate/ngx-dc-dropdown/README.md#modal) component in your e2e test, do the following:

#### 1. Define the DropdownCmp in your page object

```typescript
import { Page } from '@playwright/test';
import { DropdownCmp } from '../components/dropdown.cmp';

export class HomePage {
  private dropdownCmp: DropdownCmp;

  constructor(private readonly page: Page) {
    this.dropdownCmp = new DropdownCmp(page);
  }

  public async visit(): Promise<void> {
    await this.page.goto('/');
  }
}
```

#### 2. Writing Tests

Write tests using the page objects and component classes:

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.po';

test('dropdown selection works', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.visit();
  await homePage.dropdownCmp.selectOption('Option 1');
});
```

### Using the ModalCmp

To test modal interactions, use the `ModalCmp` class:

#### 1. Define the ModalCmp in your page object

```typescript
import { Page } from '@playwright/test';
import { ModalCmp } from '../components/modal.cmp';

export class ModalPage {
  private modalCmp: ModalCmp;

  constructor(private readonly page: Page) {
    this.modalCmp = new ModalCmp(page);
  }

  public async visit(): Promise<void> {
    await this.page.goto('/modal');
  }
}
```

#### 2. Writing Tests

```typescript
import { test, expect } from '@playwright/test';
import { ModalPage } from '../pages/modal.po';

test('modal close button works', async ({ page }) => {
  const modalPage = new ModalPage(page);
  await modalPage.visit();
  await modalPage.modalCmp.close();
});
```

### Using the MoveableFileViewerCmp

To test file viewer interactions, use the `MoveableFileViewerCmp` class:

#### 1. Define the MoveableFileViewerCmp in your page object

```typescript
import { Page } from '@playwright/test';
import { MoveableFileViewerCmp } from '../components/moveable-file-viewer.cmp';

export class FileViewerPage {
  private fileViewerCmp: MoveableFileViewerCmp;

  constructor(private readonly page: Page) {
    this.fileViewerCmp = new MoveableFileViewerCmp(page);
  }

  public async visit(): Promise<void> {
    await this.page.goto('/file-viewer');
  }
}
```

#### 2. Writing Tests

```typescript
import { test, expect } from '@playwright/test';
import { FileViewerPage } from '../pages/file-viewer.po';

test('file viewer loads correctly', async ({ page }) => {
  const fileViewerPage = new FileViewerPage(page);
  await fileViewerPage.visit();
  // Add assertions to verify file viewer functionality
});
```

### Using the SidePaneListCmp

To test side pane list interactions, use the `SidePaneListCmp` class:

#### 1. Define the SidePaneListCmp in your page object

```typescript
import { Page } from '@playwright/test';
import { SidePaneListCmp } from '../components/side-pane-list.cmp';

export class SidePanePage {
  private sidePaneListCmp: SidePaneListCmp;

  constructor(private readonly page: Page) {
    this.sidePaneListCmp = new SidePaneListCmp(page);
  }

  public async visit(): Promise<void> {
    await this.page.goto('/side-pane');
  }
}
```

#### 2. Writing Tests

```typescript
import { test, expect } from '@playwright/test';
import { SidePanePage } from '../pages/side-pane.po';

test('side pane item selection works', async ({ page }) => {
  const sidePanePage = new SidePanePage(page);
  await sidePanePage.visit();
  await sidePanePage.sidePaneListCmp.selectFirstPaneItem();
});
```

### Using the UploadFileButtonCmp

To test file upload interactions, use the `UploadFileButtonCmp` class:

#### 1. Define the UploadFileButtonCmp in your page object

```typescript
import { Page } from '@playwright/test';
import { UploadFileButtonCmp } from '../components/upload-file-button.cmp';

export class UploadPage {
  private uploadFileButtonCmp: UploadFileButtonCmp;

  constructor(private readonly page: Page) {
    this.uploadFileButtonCmp = new UploadFileButtonCmp(page);
  }

  public async visit(): Promise<void> {
    await this.page.goto('/upload');
  }
}
```

#### 2. Writing Tests

```typescript
import { test, expect } from '@playwright/test';
import { UploadPage } from '../pages/upload.po';

test('file upload button works', async ({ page }) => {
  const uploadPage = new UploadPage(page);
  await uploadPage.visit();
  await uploadPage.uploadFileButtonCmp.uploadFile('path/to/file');
});
```

