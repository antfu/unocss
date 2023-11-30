import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

function patchCjs(cjsModulePath: string, name: string) {
  const cjsModule = readFileSync(cjsModulePath, 'utf-8')
  writeFileSync(
    cjsModulePath,
    cjsModule.replace(`module.exports = ${name};`, `exports.default = ${name};`),
    { encoding: 'utf-8' },
  )
}

function patchTsupCjs(cjsModuleName: string, name: string) {
  let file = resolve(`${cjsModuleName}.cjs`)
  let content = readFileSync(file, 'utf-8')
  writeFileSync(
    file,
    content.replace(`module.exports = __`, `exports.default = __`),
    { encoding: 'utf-8' },
  )
  file = resolve(`${cjsModuleName}.d.cts`)
  content = readFileSync(file, 'utf-8').replace(`, ${name} as default `, ' ')
  content += `\nexport = ${name};`
  writeFileSync(
    file,
    content,
    { encoding: 'utf-8' },
  )
}

// @unocss/eslint-config
patchCjs(resolve('./packages/eslint-config/dist/flat.cjs'), 'flat')
patchCjs(resolve('./packages/eslint-config/dist/index.cjs'), 'index')

// @unocss/eslint-plugin
patchCjs(resolve('./packages/eslint-plugin/dist/index.cjs'), 'index')

// @unocss/inspector
patchCjs(resolve('./packages/inspector/dist/index.cjs'), 'UnocssInspector')

// @unocss/postcss
patchCjs(resolve('./packages/postcss/dist/index.cjs'), 'unocss')

// @unocss/runtime
patchTsupCjs('./packages/runtime/dist/index', 'init')

// @unocss/transformer-attributify-jsx
patchCjs(resolve('./packages/transformer-attributify-jsx/dist/index.cjs'), 'transformerAttributifyJsx')

// @unocss/transformer-attributify-jsx-babel
patchCjs(resolve('./packages/transformer-attributify-jsx-babel/dist/index.cjs'), 'transformerAttributifyJsx')

// @unocss/transformer-compile-class
patchCjs(resolve('./packages/transformer-compile-class/dist/index.cjs'), 'transformerCompileClass')

// @unocss/transformer-directives
patchCjs(resolve('./packages/transformer-directives/dist/index.cjs'), 'transformerDirectives')

// @unocss/transformer-variant-group
patchCjs(resolve('./packages/transformer-variant-group/dist/index.cjs'), 'transformerVariantGroup')

// unocss
patchCjs(resolve('./packages/unocss/dist/astro.cjs'), 'UnocssAstroIntegration')
patchCjs(resolve('./packages/unocss/dist/postcss.cjs'), 'postcss__default')
