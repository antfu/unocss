import { dirname, resolve } from 'node:path'
import fs from 'node:fs'
import process from 'node:process'
import type { UserConfig, UserConfigDefaults } from '@unocss/core'
import type { LoadConfigResult, LoadConfigSource } from 'unconfig'
import { createConfigLoader as createLoader } from 'unconfig'

export type { LoadConfigResult, LoadConfigSource }

async function loadConfig<U extends UserConfig>(
  cwd = process.cwd(),
  configOrPath: string | U = cwd,
  extraConfigSources: LoadConfigSource[] = [],
  defaults: UserConfigDefaults = {},
): Promise<LoadConfigResult<U>> {
  let inlineConfig = {} as U
  if (typeof configOrPath !== 'string') {
    inlineConfig = configOrPath
    if (inlineConfig.configFile === false) {
      return {
        config: inlineConfig as U,
        sources: [],
      }
    }
    else {
      configOrPath = inlineConfig.configFile || process.cwd()
    }
  }

  const resolved = resolve(configOrPath)

  let isFile = false
  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
    isFile = true
    cwd = dirname(resolved)
  }

  const loader = createLoader<U>({
    sources: isFile
      ? [
          {
            files: resolved,
            extensions: [],
          },
        ]
      : [
          {
            files: [
              'unocss.config',
              'uno.config',
            ],
          },
          ...extraConfigSources,
        ],
    cwd,
    defaults: inlineConfig,
  })

  const result = await loader.load()
  result.config = Object.assign(defaults, result.config || inlineConfig)
  if (result.config.configDeps) {
    result.sources = [
      ...result.sources,
      ...result.config.configDeps.map(i => resolve(cwd, i)),
    ]
  }

  return result
}

export function createCachedConfigLoader() {
  const loadConfigCache = new Map<string, LoadConfigResult<UserConfig>>()
  return async <U extends UserConfig>(cwd = process.cwd(), configOrPath: string | U = cwd, extraConfigSources: LoadConfigSource[] = [], defaults: UserConfigDefaults = {}): Promise<LoadConfigResult<U>> => {
    try {
      const config = await loadConfig(cwd, configOrPath, extraConfigSources, defaults)
      loadConfigCache.set(cwd, config)

      return config
    }
    catch (e) {
      if (loadConfigCache.has(cwd)) {
        console.error(e)
        return loadConfigCache.get(cwd) as LoadConfigResult<U>
      }
      throw e
    }
  }
}
