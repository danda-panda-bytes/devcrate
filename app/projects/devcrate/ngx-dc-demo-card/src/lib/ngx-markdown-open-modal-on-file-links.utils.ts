export function joinPaths(path: string, src: string): string {
  // First off, remove the origin path so we can handle relative paths
  const originPath = window.location.origin + window.location.pathname
  if (src.includes(originPath)) {
    src = src.replace(originPath, '')
    if (!src.startsWith('/')) {
      src = `/${src}`
    }
  }

  let srcFolder = src.split('/').slice(0, -1).join('/')

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

      if (srcFolder != "") {
        const isExtensionFile = p.includes('.')
        if (!isExtensionFile) {
          if (srcFolder && p != srcFolder.split('/')[0]) {
            srcFolder += (!p.startsWith("/") ? `/${p}` : p)
          }
          if (path?.startsWith(p)) {
            path = path.split('/').filter((_, i) => i != 0).join('/')
          }
        }
      }
    }
  } else if (path.startsWith('./')) {
    // This is a local path from the src folder
    path = path.replace('.', '')
  }

  if (srcFolder.startsWith('/')) {
    srcFolder = path.startsWith('/') ? srcFolder + path : srcFolder + "/" + path
  } else {
    srcFolder = path.startsWith('/') ? '/' + srcFolder + "/" + path : '/' + srcFolder + path
  }

  if (srcFolder.includes('/public/')) {
    srcFolder = srcFolder.split('/public')[1]
  }

  if (srcFolder.includes('/projects/')) {
    srcFolder = srcFolder.split('/projects')[1]
  }
  while (srcFolder.includes('//')) {
    // Ensure there are no extra // - replace with /
    srcFolder = srcFolder.replace(/\/\//g, '/')
  }
  console.log('srcFolder', srcFolder)

  // NOTE: This only works for SPA that use the hash for routing
  srcFolder = window.location.origin.includes('localhost') ? srcFolder : `${originPath}/${srcFolder}`
  return srcFolder
}
