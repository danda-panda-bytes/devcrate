import {Locator, Page} from "@playwright/test";

export class MatCheckboxCmp {
  constructor(public element: () => Locator) {}

  public get input(): Locator {
    return this.element().locator('input[type="checkbox"]')
  }


  public check(): Promise<void> {
    return this.input.check()
  }

  public uncheck(): Promise<void> {
    return this.input.uncheck()
  }
}


export function matOption(page: Page, name: string | RegExp): Locator {
  return page.getByRole('option', { name })
}

export class MatSelectCmp {
  constructor(public page: Page, public element: () => Locator) {}
  public get valueEl(): Locator {
    return this.element().locator('.mat-mdc-select-value')
  }

  public async open(): Promise<void> {
    await this.element().locator('svg').click()
  }

  public async selectOption(text: string, strict = false) {
    await this.open();
    await this.option(text, strict).click();
  }

  public option(optionName: string, exact = false) {
    return this.page.getByRole('option', { name: optionName, exact: exact })
  }
}
