import {Page} from "@playwright/test";

export class Modal {
  constructor(public page: Page) {}

  public get closeButton() {
    // TODO
    return null
  }

  public async close() {
    await this.closeButton?.click()
  }
}
