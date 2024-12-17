import {Locator, Page} from "@playwright/test";

export class SidePaneListCmp {
  constructor(public page: Page) {}

  public get paneItemSubtitles(): Locator {
    return this.page.getByTestId("pane-item-subtitle")
  }

  public get paneItemTitles(): Locator {
    return this.page.getByTestId("pane-item-title")
  }

  public async paneItemCount(): Promise<number> {
    return this.paneItemTitles.count()
  }

  public get sidePaneItems(): Locator {
    return this.page.getByTestId("dc-side-pane-item")
  }

  public get sidePaneItemsContainer(): Locator {
    return this.page.getByTestId("dc-side-pane-items")
  }

  public get sidePaneFourthLineItems(): Locator {
    return this.page.getByTestId("pane-item-text-fourth-line")
  }

  public selectSidePaneItemByText(text: string) {
    return this.getSidePaneItemByText(text).first().click()
  }

  public selectFirstPaneItem() {
    return this.sidePaneItems.first().click()
  }

  public getSidePaneItemByText(substanceName: string) {
    return this.paneItemTitles.getByText(substanceName)
  }
}
