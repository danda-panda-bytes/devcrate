import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import * as readline from 'readline'
import { red, cyan } from '../packages/src/utils/color.utils'
import { mkdirpSync } from "../packages/src/utils/file.utils";

main()

/**
 * This is a tool to create a new package. It will create the necessary files and folders, and set up the package.json and tsconfig.json files.
 */
async function main() {
  const allPackages = readdirSync(join('src'))
  let validation = null
  let nameOfPackage = ''
  do {
    nameOfPackage = await askPackageName()
    validation = validatePackage(allPackages, nameOfPackage)
    if (!validation.valid) { console.log(red(validation.message)) }
  } while (!validation.valid)

  await mkdirpSync(join('src', nameOfPackage))
  writeFile(nameOfPackage, 'tsconfig.json', JSON.stringify({
    compilerOptions: {
      lib: ['ES2020'],
      target: 'es2019',
      types: ['node'],
      module: 'commonjs',
      noImplicitReturns: true,
      allowSyntheticDefaultImports: true,
      skipLibCheck: true,
      incremental: true,
      moduleResolution: 'node',
      declaration: true,
      outDir: './dist',
    },
    include: ['**/*.ts'],
    exclude: [
      '**/*.spec.ts',
      '**/*.mock.ts',
    ],
  }, null, 2))

  const packageJson = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), { encoding: 'utf-8' }) || 'null')
  if (!packageJson) { throw new Error('No package.json was found') }

  writeFile(nameOfPackage, 'package.json', JSON.stringify({
    name: `@devcrate/${nameOfPackage}`,
    version: '0.0.0',
    description: '',
    main: 'index.js',
    types: 'index.d.ts',
    author: "DevCrate",
    license: 'MIT',
    files: [
      '**/*',
    ]
  }, null, 2))

  writeFile(nameOfPackage, 'index.ts', `export * from './${nameOfPackage}'\n`)
  writeFile(nameOfPackage, `${nameOfPackage}.ts`, 'export const value = true\n')
  writeFile(nameOfPackage, '.eslintrc.js', `module.exports = ${JSON.stringify({
    extends: '../../.eslintrc.js',
    parserOptions: {
      project: `./src/${nameOfPackage}/tsconfig.json`,
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  }, null, 2)}\n`)
  writeFile(nameOfPackage, '.versionrc.js', [
    "const versionStandardShared = require('../eslint-config/.versionrc.shared.js')",
    '',
    `module.exports = versionStandardShared('${nameOfPackage}')`,
    '',
  ].join('\n'))
}

function writeFile(nameOfPackage, fileName, content) {
  writeFileSync(join('src', nameOfPackage, fileName), content + '\n')
}

function validatePackage(allPackages: string[], nameOfPackage: string): { valid: boolean, message?: string } {
  if (allPackages.includes(nameOfPackage)) {
    return { valid: false, message: `"${nameOfPackage}" is already taken` }
  }

  if (nameOfPackage.length <= 3) {
    return { valid: false, message: 'Package has to be at least 3 or more characters' }
  }

  return { valid: true }
}

async function askPackageName(): Promise<string> {
  return new Promise((resolve) => {
    const readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    readlineInterface.question(cyan('Package Name: '), (name: string) => {
      readlineInterface.close()
      resolve(name)
    })
  })
}
