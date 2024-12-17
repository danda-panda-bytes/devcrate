import { yellow, green } from './color.utils'
import type { SyncOptions } from 'cpx'
import { copySync } from 'cpx'
import { readFileSync, writeFileSync } from 'fs'
import { cp } from 'fs/promises'
import * as mkdirpPackage from 'mkdirp'

const logger = console

export async function mkdirpSync(path: string): Promise<void> {
  if (!path) { return }
  logger.info(yellow(`Ensuring folder path exists: ${path}...`))
  try {
    await mkdirpPackage.sync(path)
  } catch (err) {
    logger.error(err)
    throw new Error(`Unable to ensure folder path: ${path}`)
  }
  logger.info(green(`Path exists for '${path}'!`))
}

export async function copyGlob(
  src: string,
  dest: string,
  options: SyncOptions = {},
): Promise<void> {
  try {
    return copySync(src, dest, options)
  } catch (err) {
    logger.error(err)
    throw new Error(`Unable to copy glob '${src}' to '${dest}'`)
  }
}

export async function copyFolder(src: string, dest: string, options = {}): Promise<void> {
  try {
    await cp(src, dest, options)
  } catch (err) {
    logger.error(err)
    throw new Error(`Unable to copy folder contents from ${src} to ${dest}`)
  }
}
