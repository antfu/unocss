import { resolve } from 'path'
import fs from 'fs-extra'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { startCli } from '../packages/cli/src/cli-start'

export const tempDir = resolve('.temp')
export const cli = resolve(__dirname, '../packages/cli/src/cli.ts')

beforeAll(async () => {
  await fs.remove(tempDir)
})

afterAll(async () => {
  await fs.remove(tempDir)
})

describe('cli', () => {
  it('builds uno.css', async () => {
    const { output } = await runCli({
      'views/index.html': '<div class="p-4 max-w-screen-md"></div>',
    })

    expect(output).toMatchSnapshot()
  })

  it('supports unocss.config.js', async () => {
    const { output } = await runCli({
      'views/index.html': '<div class="box"></div>',
      'unocss.config.js': `
import { defineConfig } from 'unocss'
export default defineConfig({
  shortcuts: [{ box: 'max-w-7xl mx-auto bg-gray-100 rounded-md shadow-sm p-4' }]
})
    `.trim(),
    })

    expect(output).toMatchSnapshot()
  })

  it('supports variantGroup transformer', async () => {
    const { output, transform } = await runCli({
      'views/index.html': '<div class="p-4 border-(solid red)"></div>',
      'unocss.config.js': `
import { defineConfig, transformerVariantGroup } from 'unocss'
export default defineConfig({
  transformers: [transformerVariantGroup()]
})
    `.trim(),
    }, 'views/index.html')
    expect(output).toMatchSnapshot()
    expect(transform).toMatchSnapshot()
  })

  it('supports directives transformer', async () => {
    const { output, transform } = await runCli({
      'views/index.css': '.btn-center{@apply text-center my-0 font-medium;}',
      'unocss.config.js': `
import { defineConfig, transformerDirectives } from 'unocss'
export default defineConfig({
  transformers: [transformerDirectives()]
})
    `.trim(),
    }, 'views/index.css')
    expect(output).toMatchSnapshot()
    expect(transform).toMatchSnapshot()
  })

  it('uno.css exclude initialized class after changing file', async () => {
    const fileName = 'views/index.html'
    const initializedContent = '<div class="bg-blue"></div>'
    const changedContent = '<div class="bg-red"></div>'
    const testDir = getTestDir()
    const absolutePathOfFile = resolve(testDir, fileName)
    await fs.outputFile(absolutePathOfFile, initializedContent)
    await runAsyncChildProcess(testDir, './views/**/*', '-w')
    const outputPath = resolve(testDir, 'uno.css')
    for (let i = 50; i >= 0; i--) {
      await sleep(50)
      if (fs.existsSync(outputPath))
        break
    }
    await fs.writeFile(absolutePathOfFile, changedContent)
    // polling until update
    for (let i = 100; i >= 0; i--) {
      await sleep(100)
      const output = await readFile(testDir)
      if (i === 0 || output.includes('.bg-red')) {
        expect(output).toContain('.bg-red')
        break
      }
    }
  })

  it('supports unocss.config.js cliOptions CliEntryItem array', async () => {
    const testDir = getTestDir()
    const fileName1 = 'views/index1.html'
    const fileName2 = 'views/index2.html'
    const Content1 = '<div class="bg-blue"></div>'
    const Content2 = '<div class="bg-red"></div>'
    const absolutePathOfFile1 = resolve(testDir, fileName1)
    const absolutePathOfFile2 = resolve(testDir, fileName2)
    await fs.outputFile(absolutePathOfFile1, Content1)
    await fs.outputFile(absolutePathOfFile2, Content2)
    await fs.outputFile(resolve(testDir, 'unocss.config.js'), `
 import { defineConfig } from 'unocss'
export default defineConfig({
   cli:{
    entry:[
      {
        patterns:['views/index1.html'],
        outFile:'./uno1.css',
      },
      {
        patterns:['views/index2.html'],
        outFile:'./test/uno2.css',
      },
    ],
  }
})
  `.trim())
    await runAsyncChildProcess(testDir, '', '')
    const outputFile1 = './uno1.css'
    const outputFile2 = './test/uno2.css'
    const outputPath1 = resolve(testDir, outputFile1)
    const outputPath2 = resolve(testDir, outputFile2)
    for (let i = 50; i >= 0; i--) {
      await sleep(50)
      if (fs.existsSync(outputPath1))
        break
    }
    for (let i = 50; i >= 0; i--) {
      await sleep(50)
      if (fs.existsSync(outputPath2))
        break
    }
    // polling until update
    for (let i = 100; i >= 0; i--) {
      await sleep(100)
      const output1 = await readFile(testDir, outputFile1)
      const output2 = await readFile(testDir, outputFile2)
      if (i === 0 || output1.includes('.bg-blue')) {
        expect(output1).toContain('.bg-blue')
        break
      }
      if (i === 0 || output2.includes('.bg-red')) {
        expect(output2).toContain('.bg-red')
        break
      }
    }

    for (let i = 100; i >= 0; i--) {
      await sleep(100)
      const output2 = await readFile(testDir, outputFile2)
      if (i === 0 || output2.includes('.bg-red')) {
        expect(output2).toContain('.bg-red')
        break
      }
    }
  })

  it('supports unocss.config.js cliOptions CliEntryItem Object', async () => {
    const testDir = getTestDir()
    const fileName1 = 'views/index1.html'
    const Content1 = '<div class="bg-blue"></div>'
    const absolutePathOfFile1 = resolve(testDir, fileName1)
    await fs.outputFile(absolutePathOfFile1, Content1)
    await fs.outputFile(resolve(testDir, 'unocss.config.js'), `
 import { defineConfig, transformerVariantGroup } from 'unocss'
export default defineConfig({
    cli:{
    entry:{
      patterns: ['views/index1.html'],
      outFile: 'uno1.css',
    }
  },
})
  `)
    await runAsyncChildProcess(testDir, '', '')
    const outputFile1 = './uno1.css'
    const outputPath1 = resolve(testDir, outputFile1)
    for (let i = 50; i >= 0; i--) {
      await sleep(50)
      if (fs.existsSync(outputPath1))
        break
    }
    // polling until update
    for (let i = 100; i >= 0; i--) {
      await sleep(100)
      const output1 = await readFile(testDir, outputFile1)
      if (i === 0 || output1.includes('.bg-blue')) {
        expect(output1).toContain('.bg-blue')
        break
      }
    }
  })
})
// ----- Utils -----
function sleep(time = 300) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

function getTestDir() {
  return resolve(tempDir, Math.round(Math.random() * 100000).toString())
}

function initOutputFiles(testDir: string, files: Record<string, string>) {
  return Promise.all(
    Object.entries(files).map(([path, content]) =>
      fs.outputFile(resolve(testDir, path), content, 'utf8'),
    ),
  )
}

function runAsyncChildProcess(cwd: string, ...args: string[]) {
  return startCli(cwd, ['', '', ...args, '--no-preflights'])
}

function readFile(testDir: string, targetFile?: string) {
  return fs.readFile(resolve(testDir, targetFile ?? 'uno.css'), 'utf8')
}

async function runCli(files: Record<string, string>, transformFile?: string) {
  const testDir = getTestDir()

  await initOutputFiles(testDir, files)
  await runAsyncChildProcess(testDir, 'views/**/*')

  const output = await readFile(testDir)

  if (transformFile) {
    const transform = await readFile(testDir, transformFile)
    return {
      output,
      transform,
    }
  }

  return {
    output,
  }
}
