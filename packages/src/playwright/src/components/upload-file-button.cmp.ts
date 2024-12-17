import {expect, Locator, Page} from "@playwright/test";
import {join} from "node:path";
import { waitUntil } from "../utils/utils";

export class UploadFileButtonCmp {
  constructor(readonly page: Page, readonly baseUrl: string, public hiddenAttachInput: string, public attachButton: () => Locator, private parentEl?: () => Locator | Page) {
    if (!parentEl) { this.parentEl = () => this.page }
  }

  public async attachHiddenInput() {
    await waitUntil({
      interval: 100,
      timeout: 30000,
      check: async () => {
        const element = await this.page.$(`[data-testid="${this.hiddenAttachInput}"]`)
        return !!element
      },
      error: () => {throw new Error('Unable to get input to attach files')},
    })
    return this.page.$(`[data-testid="${this.hiddenAttachInput}"]`)
  }

  /**
   * ```
   * const file: Arguments<UploadFileButtonCmp["attachFile"]>[0] = { fileName: 'chat-message.jpg', type: 'image' }
   * ```
   * @param options
   */
  public async attachFile(options: { fileName: string, type?: 'pdf' | 'image' }) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.attachButton().click()
    await fileChooserPromise
    await (await this.attachHiddenInput()).setInputFiles(join(__dirname, '..', 'example-assets', options.fileName));
  }
}
