import { BetterMap, createGenerator, UserConfig } from '@unocss/core'
import { loadConfig } from '@unocss/config'
import { createUnplugin } from 'unplugin'
import { RawSource } from 'webpack-sources'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { ALL_LAYERS, resolveId } from '../../vite/src/modes/global/shared'
import { defaultExclude, defaultInclude, getPath } from '../../vite/src/utils'
import { PLACEHOLDER_RE } from '../../vite/src/modes/global/build'

export interface WebpackPluginOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

export interface UnocssPluginOptions extends UserConfig, WebpackPluginOptions {}

const unplugin = createUnplugin((configOrPath?: UnocssPluginOptions | string) => {
  const { config = {} } = loadConfig(configOrPath)

  const filter = createFilter(
    config.include || defaultInclude,
    config.exclude || defaultExclude,
  )

  const uno = createGenerator(config)

  const modules = new BetterMap<string, string>()
  const tokens = new Set<string>()
  const tasks: Promise<any>[] = []
  const entries = new Map<string, string>()

  async function scan(code: string, id?: string) {
    if (id)
      modules.set(id, code)
    await uno.applyExtractors(code, id, tokens)
  }

  return {
    name: 'unocss:webpack',
    enforce: 'pre',
    transformInclude(id) {
      return filter(id)
    },
    transform(code, id) {
      tasks.push(scan(code, id))
      return null
    },
    resolveId(id) {
      const entry = resolveId(id)
      if (entry) {
        entries.set(entry.id, entry.layer)
        return entry.id
      }
    },
    load(id) {
      const layer = entries.get(getPath(id))
      if (layer)
        return `#--unocss--{layer:${layer}}`
      const entry = resolveId(id)
      if (entry)
        return `#--unocss--{layer:${entry.layer}}`
    },
    webpack(compiler) {
      compiler.hooks.compilation.tap('unocss:injection', (compilation) => {
        compilation.hooks.optimizeChunkAssets.tapPromise(
          'unocss:injection',
          async(chunks) => {
            const files = Array.from(chunks)
              .flatMap(i => [...i.files])
              .filter(i => i.endsWith('.css'))

            await Promise.all(tasks)
            const result = await uno.generate(tokens, { layerComments: false })

            for (const file of files) {
              let code = compilation.assets[file].source().toString()
              let replaced = false
              code = code.replace(PLACEHOLDER_RE, (_, layer) => {
                replaced = true
                if (layer === ALL_LAYERS)
                  return result.getLayers(Array.from(entries.values()))
                else
                  return result.getLayer(layer) || ''
              })
              if (replaced)
                compilation.assets[file] = new RawSource(code) as any
            }
          },
        )
      })
    },
  }
})

export default unplugin.webpack
