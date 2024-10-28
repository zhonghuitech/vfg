import process from 'node:process'
import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { emptyDir, ensureDir, remove } from 'fs-extra'
import consola from 'consola'
import camelcase from 'camelcase'
import glob from 'fast-glob'
import { type BuiltInParserName, format } from 'prettier'
import chalk from 'chalk'

const currentDir = process.cwd();
const jsonPath = path.join(currentDir, "src/components/VFG/form/icon.json")
consola.info(chalk.blue(`delete file: ${jsonPath}`))
await remove(jsonPath, err => {
    if (err) return consola.error(err)
    consola.log('success!')
})

consola.info(chalk.blue('generating icon lists'))
const iconPath = path.join(currentDir, "..", "..", "opensource/element-plus-icons/packages/svg")
await ensureDir(iconPath)

const files = await getSvgFiles(iconPath)
const fileNames = files.map((file) => transformToFileName(file))
await generateEntry(fileNames)

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
    const fNameR = fileNames.map(i=>`\"${i}\"`)
    const content = ["[", fNameR.join(","), "]"].join("");
    consola.log(content)
    const code = await formatCode(content, 'json')
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