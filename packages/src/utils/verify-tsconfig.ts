import { readFileSync } from 'fs'
import * as glob from 'glob'
import { green } from './color.utils'
import { join } from 'path'
import { parse } from 'jsonc-parser'

const logger = console

export async function verifyTsconfig(rootDir: string, ignorePaths = [
  `${rootDir}/**/node_modules/**`,
  `${rootDir}/node_modules/**`,
  `${rootDir}/dist/**`,
  `${rootDir}/**/dist/**`,
]) {
  const files = await new Promise<string[]>((resolve, reject) => {
    glob(join(rootDir, '**/*tsconfig*.json'), {
      cwd: rootDir,
      ignore: ignorePaths,
    }, (err, data) => {
      if (err) { return reject(err) }
      return resolve(data)
    })
  })

  const errors = []
  for (const file of files) {
    try {
      const content = readFileSync(file, { encoding: 'utf-8' })
      parse(content)
    } catch (err) {
      errors.push(file)
    }
  }

  if (errors.length > 0) {
    throw new Error(`These tsconfig files don't have valid json:\n\t${errors.join('\n\t')}`)
  }

  logger.info(green('All tsconfig files are valid!'))
}
