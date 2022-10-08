import fs, { promises } from 'fs'
import { minify } from 'terser'
import path from 'path'

const BASE_PATH = 'src'
const DIST_FOLDER = 'lib'
const { readFile, writeFile, mkdir } = promises
/**
 *
 * @param {String} dirPath path to read files
 * @param {String[]} arrayOfFiles files inside dirPath
 * @returns String[]
 */
const getFilesToMinify = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    const filePath = `${dirPath}/${file}`

    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getFilesToMinify(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(filePath)
    }
  })

  return arrayOfFiles
};

(async () => {
  const filesToMinify = getFilesToMinify(BASE_PATH)

  for (const file of filesToMinify) {
    const dirsToMake = path.dirname(file).replace(BASE_PATH, '')

    try {
      const fileContent = await readFile(file, { encoding: 'utf-8' })
      const minifiedContent = await minify(fileContent)
      const replacedPath = file.replace(BASE_PATH, DIST_FOLDER)

      await mkdir(`${DIST_FOLDER}/${dirsToMake}`, { recursive: true })
      await writeFile(replacedPath, minifiedContent.code)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
})()
