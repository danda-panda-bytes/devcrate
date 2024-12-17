import { type Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+[.]ts$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
    }],
  },
  modulePathIgnorePatterns: ['dist'],
  testRegex: '.+[.]spec[.]ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageDirectory: './coverage/',
  collectCoverage: !!process.env.CI,
}

export default config
