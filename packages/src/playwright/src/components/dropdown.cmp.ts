import {Locator, Page, expect} from "@playwright/test";
import {classList, LocatorFilterOptions, appGlobalLoader} from "../utils/utils";

export class DropdownCmp {
  constructor(public page: Page, public parent: () => Locator) {
  }

  public get dropdownHeader(): Locator {
    return this.parent().getByTestId("ngx-dc-dropdown")
  }

  public get items(): Locator {
    return this.parent().getByTestId('ngx-dc-dropdown-item')
  }

  public async itemClasses(filterOptions?: LocatorFilterOptions): Promise<string[]> {
    if (filterOptions == null) return classList(this.items)
    return classList(this.items.filter(filterOptions))
  }

  public async selectItem(filterOptions?: LocatorFilterOptions) {
    return await this.items.filter(filterOptions).first().click()
  }

  public async isHeaderItemActivated(activeItemText: string): Promise<void> {
    await this.assertHeaderItem(activeItemText)
    await expect.poll(() => appGlobalLoader(this.page).isVisible(), `Unable to find active item by text: ${activeItemText}`).toBeFalsy()
    // Check again in case the loading somehow changed the active item (race conditions)
    await this.assertHeaderItem(activeItemText)
  }

  public async assertHeaderItem(activeItemText: string): Promise<void> {
    await expect(this.dropdownHeader, `Expected active item to have text: ${activeItemText}`).toContainText(activeItemText)
  }

  public async isOpenedActiveItemLoaded(activeItemText: string): Promise<void> {
    await this.assertActiveItem(activeItemText)
    await expect.poll(() => appGlobalLoader(this.page).isVisible(), `Unable to find active item by text: ${activeItemText}`).toBeFalsy()
    // Check again in case the loading somehow changed the active item (race conditions)
    await this.assertActiveItem(activeItemText)
  }

  public async assertActiveItem(activeItemText: string): Promise<void> {
    await expect(this.activatedItems.filter({ hasText: activeItemText }), `Expected active item to have text: ${activeItemText}`).toBeVisible()
  }

  public get noItems(): Locator {
    return this.parent().getByTestId('ngx-dc-dropdown-no-item')
  }

  public get activatedItemFilter(): LocatorFilterOptions {
    return <LocatorFilterOptions>{
      has: this.parent().locator('[aria-activated="true"]'),
    }
  }

  public get activatedItems(): Locator {
    return this.items.filter(this.activatedItemFilter)
  }

  public async dropdownHeaderClasses(filterOptions?: LocatorFilterOptions): Promise<string[]> {
    if (filterOptions == null) return classList(this.dropdownHeader)
    return classList(this.dropdownHeader.filter(filterOptions))
  }

  public async waitUntilOpened() {
    await expect.poll(async () => await this.isOpen(), { timeout: 10000 }).toBeTruthy()
  }

  public async waitUntilClosed() {
    await expect.poll(async () => !(await this.isOpen()), { timeout: 10000 }).toBeTruthy()
  }

  public async isOpen() {
    const classes = await this.dropdownHeaderClasses()
    return classes.includes("opened")
  }

  public async open() {
    if (await this.isOpen()) return
    await this.dropdownHeader.click()
  }

  public async closed() {
    const closed = !await this.isOpen()
    if (closed) return
    await this.dropdownHeader.click()
  }
}
