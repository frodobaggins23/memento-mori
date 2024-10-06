import fs from "fs"
import readline from "node:readline"
import path from "path"
import process from "process"
import { fileURLToPath } from "url"

const PARAM_COMPONENT = "-c"
const PARAM_PAGE = "-p"

const TYPES = {
  COMPONENT: PARAM_COMPONENT,
  PAGE: PARAM_PAGE,
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

const KEBAB_CASE_SEPARATOR = "-"
const SNAKE_CASE_SEPARATOR = "_"

const readlineInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function printUsage() {
  console.log("Usage: generate-component [type] [name]")
  console.log("    type: -c (component) or -p (page)")
  console.log("    name: the name of the component or page")
  console.log("or without arguments to be prompted")
}

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

function otherCaseToCamelCase(value, separator) {
  return value.replace(new RegExp(`${separator}([a-z])`, "g"), (g) => g[1].toUpperCase())
}

function createTemplate(type, name) {
  const templatesDir = getSourceDir()

  const targetDir = getTargetDir(type, name)

  // Check if the target directory already exists
  if (fs.existsSync(targetDir)) {
    console.error(`Error: ${TYPES_NAMES[type]} '${name}' already exists.`)
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

  // normalize kebab case
  let normalizedName = name
  if (name.includes(KEBAB_CASE_SEPARATOR)) {
    console.info("Kebab case detected. Will be used for folder name only.")
    normalizedName = otherCaseToCamelCase(name, KEBAB_CASE_SEPARATOR)
  }
  // normalize snake case
  if (name.includes(SNAKE_CASE_SEPARATOR)) {
    console.info("Snake case detected. Will be used for folder name only.")
    normalizedName = otherCaseToCamelCase(name, SNAKE_CASE_SEPARATOR)
  }

  // Update the template files
  const indexFile = path.join(targetDir, INDEX_FILENAME)
  updateFile(indexFile, normalizedName)
  const componentTemplateFile = path.join(targetDir, COMPONENT_TEMPLATE_FILENAME)
  updateFile(componentTemplateFile, normalizedName)
  renameFile(componentTemplateFile, targetDir, normalizedName)

  console.log(`${TYPES_NAMES[type]} '\x1b[33m${normalizedName}' \x1b[0mcreated successfully.`)
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

  // validate arguments
  if (componentType && !Object.values(TYPES).includes(componentType)) {
    console.error(`Error: Invalid type selected. (${componentType})`)
    printUsage()
    process.exit(1)
  }

  if (name && !name.trim()) {
    console.error("Error: Empty name entered.")
    printUsage()
    process.exit(1)
  }

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
