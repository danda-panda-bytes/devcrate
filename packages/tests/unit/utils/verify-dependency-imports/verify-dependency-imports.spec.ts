import { join } from 'path'
import { verifyMultipleDependencyImports } from '@devcrate/utils/verify-dependency-imports'

jest.setTimeout(1000 * 30)

describe('#verifyMultipleDependencyImports', () => {
  const rootPackagePath = join(__dirname, '..', '..', '..', '..', 'package.json')

  it('should show dependencies that are not necessary', async () => {
    const importResult = await verifyMultipleDependencyImports([{
      allowUpdate: false,
      path: join(__dirname, 'unnecessary-imports', 'unnecessary-imports-package.json'),
    }], rootPackagePath)
    expect(importResult[0].missingDependencies).toHaveLength(0)
    expect(importResult[0].unnecessaryDependencies.length).toEqual(2)
  })

  it('should show dependencies that are missing', async () => {
    const importResult = await verifyMultipleDependencyImports([{
      allowUpdate: false,
      path: join(__dirname, 'missing-imports', 'no-dependencies-package.json'),
    }], rootPackagePath)
    expect(importResult[0].missingDependencies).toHaveLength(1)
    expect(importResult[0].unnecessaryDependencies.length).toEqual(0)
  })

  it('should show dependencies that are missing', async () => {
    const importResult = await verifyMultipleDependencyImports([{
      allowUpdate: false,
      path: join(__dirname, 'missing-imports', 'missing-with-unnecessary-package.json'),
    }], rootPackagePath)
    expect(importResult[0].missingDependencies).toHaveLength(1)
    expect(importResult[0].unnecessaryDependencies.length).toEqual(1)
  })

  it('should ignore dependencies that are build into node', async () => {
    const importResult = await verifyMultipleDependencyImports([{
      allowUpdate: false,
      path: join(__dirname, 'no-missing-imports', 'no-missing-package.json'),
    }], rootPackagePath)
    expect(importResult[0].missingDependencies).toHaveLength(0)
    expect(importResult[0].unnecessaryDependencies.length).toEqual(0)
  })
})
