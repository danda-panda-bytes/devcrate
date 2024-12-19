const fs = require('fs')
const path = require('path')

// Get param from first argument
const dir = process.argv[2]

// Ensure path is absolute
const absolutePath = path.resolve(dir)

if (fs.existsSync(absolutePath)) {
  return
}
fs.mkdirSync(absolutePath, { recursive: true })
