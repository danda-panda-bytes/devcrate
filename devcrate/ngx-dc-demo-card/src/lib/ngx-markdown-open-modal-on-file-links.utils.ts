export function joinPaths(path: string, src: string, relativePath: string): string {
  let srcFolder = src.split('/').slice(0, -1).join('/')

  // TODO: If its not an absolute path, then go to that url and ignore...


  // For each ../ in the path, remove a folder from the srcFolder
  // If I have devcrate/ngx-dc-navbar and the path is ../../../src/main.ts, I should have /main.ts
  // so if I have an extra ../src when its already "" for the src folder, then it should remove ../src
  path = path.replace('../src/', '')

  const pathParts = path.split('/')
  if (pathParts.includes('..')) {
    for (const p of pathParts) {
      if (p === '..') {
        // Remove the next folder
        srcFolder = srcFolder.split('/').slice(0, -1).join('/')
        // Remove the ../
        path = path.split('/').filter((_, i) => i != 0).join('/')
        continue
      }

      if (p == '.') {
        // Remove the ./
        path = path.split('/').filter((_, i) => i != 0).join('/')
        // Do nothing since ./ does nothing
        continue
      }

      const isExtensionFile = p.includes('.')
      if (!isExtensionFile) {
        if (srcFolder && p != srcFolder.split('/')[0]) {srcFolder += p }
      }
    }
  } else {
    if (path.startsWith('./')) {
      // This is a local path from the src folder
      path = path.replace('.', '')
    }
  }

  srcFolder = srcFolder.startsWith('/') ? srcFolder + path : '/' + srcFolder + path
  if (srcFolder.includes('/public/')) {
    srcFolder = srcFolder.split('/public')[1]
  }
  console.log('srcFolder', srcFolder)

  return window.location.origin.includes('localhost') ? srcFolder : `${this.relativePath}/${srcFolder}`
}
