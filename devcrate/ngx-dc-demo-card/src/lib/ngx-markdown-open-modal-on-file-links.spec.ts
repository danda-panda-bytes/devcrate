import { describe, expect, it } from '@jest/globals'
import { joinPaths } from './ngx-markdown-open-modal-on-file-links.utils'

describe('NgxMarkdownOpenModalOnFileLinks', () => {
  it.each([
    ['should handle main.ts', 'devcrate/ngx-dc-navbar/README.md', '../../../src/main.ts', '/main.ts'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', './src/lib/navbar.service.ts', '/devcrate/ngx-dc-navbar/src/lib/navbar.service.ts'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', './src/lib/navbar.model.ts', '/devcrate/ngx-dc-navbar/src/lib/navbar.model.ts'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', './src/lib/navbar.service.ts', '/devcrate/ngx-dc-navbar/src/lib/navbar.service.ts'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', '../../../src/app/app.config.ts', '/app/app.config.ts'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', '../../../src/app/app.routes.ts', '/app/app.routes.ts'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', '../../../src/app/app.component.ts', '/app/app.component.ts'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', '../../../src/app/app.component.html', '/app/app.component.html'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', '../../../src/app/app.component.scss', '/app/app.component.scss'],
    ['should handle libPath', 'devcrate/ngx-dc-navbar/README.md', '../../../src/app/links.ts', '/app/links.ts'],
  ])('#joinPaths: %s', (_name, src, path, expected) => {
    const actual = joinPaths(path, src)
    expect(actual).toEqual(expected)
  })
})
