import {Locator, Page, expect} from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import * as ini from 'ini'
import { resolve } from "node:path";

export interface TestUser { role: string, oun: string, password: string }

export class GenericPage {
  constructor(public page: Page, public baseUrl: string) {}

  public async logIntoApp(user: TestUser) {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' })
    await this.page.waitForLoadState('networkidle')
    if (this.page.url().startsWith(this.baseUrl)) {
      return
    }
    await this.page.locator('#username').fill(user.oun)
    await this.page.locator('#password').fill(user.password)
    await this.page.waitForLoadState('networkidle')
    await this.page.locator('#password').press('Enter')
    await this.page.waitForLoadState('networkidle')
  }

  // TODO: Add methods to login with ping without going to the login page
}

export function readExternalConfIfExists<T>(externalConfFilePath: string, confFilePath: string): T {
  return existsSync(externalConfFilePath)
    ? readConfFile(externalConfFilePath)
    : readConfFile(confFilePath)
}

export function readConfFile<T>(filePath: string): T {
  try {
    const fileContent = readFileSync(resolve(filePath), 'utf-8')
    return ini.parse(fileContent);
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function waitForRequest(page: Page, urlRegex: string, method: string, status: number, validateBody: (body?: any) => boolean = () => true): Promise<void> {
  // Convert normal url into regex form
  urlRegex = urlRegex.replace('?', '[?]').replace('=', '[=]').replace('&', '[&]').replace('*', '.*')
  try {
    await page.waitForResponse(async request => {
      const actualMethod = request.request().method()
      let body = null
      try {
        if (actualMethod === 'POST' || actualMethod === 'PATCH') {
          body = request.request().postDataJSON()
        }
      } catch (err) {
        console.error(err)
      }

      const lastStatusCheck = request.status()
      const urlRegexCheck = new RegExp(urlRegex).exec(request.url())
      const methodMatches = !!urlRegexCheck?.length && actualMethod === method
      if (methodMatches) {
        expect(lastStatusCheck, `Expected request (${method} ${urlRegex.toString()}) to reach status code ${status}, but got ${lastStatusCheck}`).toBe(status)
        expect(validateBody(body)).toBeTruthy()
      }
      return methodMatches && lastStatusCheck === status
    }, { timeout: 30000 })
  } catch (err) {
    if (err.name === 'TimeoutError') {
      throw new Error(`Timed out after waiting 30 seconds for request (${method} ${urlRegex.toString()}) to reach status code ${status}`)
    }
    throw err
  }
}

export async function waitUntil(options: { interval: number, timeout: number, check: () => Promise<boolean>, error: () => Promise<void> }) {
  const { interval, timeout, check, error } = options
  let elapsed = 0
  let value = await check()
  while (!value && elapsed < timeout) {
    await new Promise(resolve => setTimeout(resolve, interval))
    value = await check()
    elapsed += interval
  }
  if (!value) {
    await error()
  }
}

export function appGlobalLoader(page: Page): Locator {
  return page.getByTestId('app-global-loader')
}

export async function classList(locator: Locator): Promise<string[]> {
  const value = await locator.evaluateHandle(e => {
    return e ? Array.from(e.classList || []) : []
  })

  return (await value.jsonValue()) as string[]
}

export type LocatorFilterOptions = Parameters<Locator["filter"]>[0]
