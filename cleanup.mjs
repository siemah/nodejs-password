import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from 'fs'
import Path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const deleteDirRecursive = (/** @type string */ path) => {
  if (existsSync(path)) {
    readdirSync(path).forEach((file) => {
      const curPath = Path.join(path, file)
      if (lstatSync(curPath).isDirectory()) {
        deleteDirRecursive(curPath)
      } else {
        unlinkSync(curPath)
      }
    })
    rmdirSync(path)
  }
}
const dir = process.argv.slice(2)[0]
if (dir) {
  deleteDirRecursive(Path.join(__dirname, 'lib', dir))
} else {
  deleteDirRecursive(Path.join(__dirname, 'lib/cjs'))
  deleteDirRecursive(Path.join(__dirname, 'lib/esm'))
  deleteDirRecursive(Path.join(__dirname, 'lib/types'))
}
