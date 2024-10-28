import process from 'node:process'
import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { emptyDir, ensureDir, remove } from 'fs-extra'
import consola from 'consola'
import camelcase from 'camelcase'
import glob from 'fast-glob'
import { type BuiltInParserName, format } from 'prettier'
import chalk from 'chalk'

consola.info(chalk.blue('generating icon lists'))

const currentDir = process.cwd();
const iconPath = path.join(currentDir, "..", "..", "opensource/element-plus-icons/packages/svg")
const jsonPath = path.join(currentDir, "src/components/VFG/form/icon.json")

consola.log(jsonPath)
await ensureDir(iconPath)
const files = await getSvgFiles(iconPath)
const fileNames = files.map((file) => transformToFileName(file))
consola.log(fileNames)

async function getSvgFiles(iconPath: string) {
    const pkg = { dir: iconPath }
    return glob('*.svg', { cwd: pkg.dir, absolute: true })
}

function getName(file: string) {
    const filename = path.basename(file).replace('.svg', '')
    const componentName = camelcase(filename, { pascalCase: true })
    return {
        filename,
        componentName,
    }
}

async function generateEntry(fileNames: string[]) {
    const code = await formatCode(
        fileNames.toString(),
    )
    await writeFile(path.resolve(jsonPath), code, 'utf-8')
}

function formatCode(code: string, parser: BuiltInParserName = 'typescript') {
    return format(code, {
        parser,
        semi: false,
        singleQuote: true,
    })
}

function transformToFileName(file: string) {
    const { filename, componentName } = getName(file)
    return filename
}