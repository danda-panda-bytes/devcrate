import { Page } from '@playwright/test';
import { DropdownCmp } from '@devcrate/playwright'

export class DropdownDemoPage {
  readonly page: Page
  readonly basicDropdown: DropdownCmp

  constructor(page: Page) {
    this.page = page
    this.basicDropdown = new DropdownCmp(page, () => page.locator('basic-dropdown'))
  }

  async goto(): Promise<void> {
    await this.page.goto('/dropdown-demo')
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForSelector('basic-dropdown')
  }
}
