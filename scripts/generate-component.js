import fs from "fs"
import readline from "node:readline"
import path from "path"
import process from "process"
import { fileURLToPath } from "url"

const TYPES = {
  COMPONENT: "c",
  PAGE: "p",
}

const TYPES_NAMES = {
  [TYPES.COMPONENT]: "component",
  [TYPES.PAGE]: "page",
}

const DIRS = {
  COMPONENTS: "components",
  PAGES: "pages",
}

const TEMPLATE_SOURCE_DIR = "src/templates"

const INDEX_FILENAME = "index.ts"
const COMPONENT_TEMPLATE_FILENAME = "Component.tsx"

const readlineInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function toUpperCaseFirstLetter(name) {
  return `${name.charAt(0).toUpperCase() + name.slice(1)}`
}

function toLowerCaseFirstLetter(name) {
  return `${name.charAt(0).toLowerCase() + name.slice(1)}`
}

function getSourceDir() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  return path.join(__dirname, "..", TEMPLATE_SOURCE_DIR)
}

function getTargetDir(type, name) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const baseDir = path.join(__dirname, "..", "src")
  const targetDir =
    type === TYPES.COMPONENT ? path.join(baseDir, DIRS.COMPONENTS, toLowerCaseFirstLetter(name)) : path.join(baseDir, DIRS.PAGES, toUpperCaseFirstLetter(name))
  return targetDir
}

function updateFile(sourceFile, value) {
  const sourceFileContent = fs.readFileSync(sourceFile, "utf-8")
  const sourceFileContentUpdated = sourceFileContent.replace(/Component/g, toUpperCaseFirstLetter(value))
  fs.writeFileSync(sourceFile, sourceFileContentUpdated)
}

function renameFile(sourceFile, targetDir, name) {
  const targetFile = path.join(targetDir, `${toUpperCaseFirstLetter(name)}.tsx`)
  fs.renameSync(sourceFile, targetFile)
}

function createTemplate(type, name) {
  const templatesDir = getSourceDir()

  const targetDir = getTargetDir(type, name)

  // Check if the target directory already exists
  if (fs.existsSync(targetDir)) {
    console.error(`Error: ${type} '${name}' already exists.`)
    return
  }

  // Create the target directory
  fs.mkdirSync(targetDir, { recursive: true })

  // Copy template files to the target directory
  fs.readdirSync(templatesDir).forEach((file) => {
    const templateFile = path.join(templatesDir, file)
    const targetFile = path.join(targetDir, file)
    fs.copyFileSync(templateFile, targetFile)
  })

  // Update the template files
  const indexFile = path.join(targetDir, INDEX_FILENAME)
  updateFile(indexFile, name)
  const componentTemplateFile = path.join(targetDir, COMPONENT_TEMPLATE_FILENAME)
  updateFile(componentTemplateFile, name)
  renameFile(componentTemplateFile, targetDir, name)

  console.log(`${TYPES_NAMES[type]} '\x1b[33m${name}' \x1b[0mcreated successfully.`)
}

function question1() {
  return new Promise((resolve, reject) => {
    readlineInstance.question("Select the type (component [c] or page [p]): ", (type) => {
      if (!Object.values(TYPES).includes(type)) {
        reject("Error: Invalid type selected.")
      } else {
        resolve(type)
      }
    })
  })
}

function question2() {
  return new Promise((resolve, reject) => {
    readlineInstance.question("Enter the name: ", (name) => {
      if (!name) {
        reject("Error: Empty name entered.")
      }
      resolve(name)
    })
  })
}

async function main() {
  let componentType = process.argv[2]
  let name = process.argv[3]

  try {
    if (!componentType) {
      componentType = await question1()
    }
    if (!name) {
      name = await question2()
    }
    createTemplate(componentType, name)
    readlineInstance.close()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
