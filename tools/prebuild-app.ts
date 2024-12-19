import { copyGlob, mkdirpSync } from '@packages/utils/file.utils'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

const appPath = join(__dirname, '..', 'app')
const node_modules = join(appPath, 'node_modules')
const devcrateFolder = join(node_modules, '@devcrate')
const nodeNgxDcStylesFolder = join(devcrateFolder, 'ngx-dc-styles')

// This is a hack to get the styles to build within the demo app. This is only needed for the demo app.
mkdirpSync(nodeNgxDcStylesFolder)
copyGlob(`${appPath}/projects/devcrate/ngx-dc-styles/*.scss`, nodeNgxDcStylesFolder)
copyFileSync(join(appPath, 'projects/devcrate/ngx-dc-styles/package.json'), join(nodeNgxDcStylesFolder, 'package.json'))
