import {expect, Locator, Page} from "@playwright/test";
import {Modal} from "./modal.cmp";

export class MoveableFileViewerModalCmp extends Modal {
  constructor(page: Page) {
    super(page)
  }

  public async isPdfVisible() {
    await this.waitForLoader()
    await expect(this.error).not.toBeVisible()
    await expect(this.pdfViewer).toBeVisible()
  }

  public async isImgVisible() {
    await this.waitForLoader()
    await expect(this.error).not.toBeVisible()
    await expect(this.img).toBeVisible()
  }

  public async moveModal() {

    // Locate the drag handle
    const dragHandle = await this.page.$('.cdk-drag-handle');

    // Perform the drag action
    const boundingBox = await dragHandle.boundingBox();
    if (boundingBox) {
      await this.page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.move(boundingBox.x + 100, boundingBox.y + 100); // Move to the desired offset
      await this.page.mouse.up();
    }
  }

  public get downloadButton(): Locator {
    return this.page.getByTestId('file-viewer-download-button')
  }
  public get openNewTabButton(): Locator {
    return this.page.getByTestId('file-viewer-open-new-tab-button')
  }

  public get loader(): Locator {
    return this.page.getByTestId('file-viewer-loader')
  }

  public async waitForLoader() {
    await expect(this.loader).toBeVisible()
    await expect(this.loader).not.toBeVisible()
  }

  public get error(): Locator {
    return this.page.getByTestId('file-viewer-error')
  }

  public get pdfViewer(): Locator {
    return this.page.getByTestId('file-viewer-pdf-viewer')
  }

  public get img(): Locator {
    return this.page.getByTestId('file-viewer-img')
  }

  public get fileNotSupported(): Locator {
    return this.page.getByTestId('file-not-supported')
  }
}
