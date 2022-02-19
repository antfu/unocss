import type { Plugin } from 'vite'
import type { UserConfigDefaults } from '@unocss/core'
import UnocssInspector from '@unocss/inspector'
import { createContext } from '../../plugins-common'
import { ChunkModeBuildPlugin } from './modes/chunk-build'
import { GlobalModeDevPlugin, GlobalModePlugin } from './modes/global'
import { PerModuleModePlugin } from './modes/per-module'
import { VueScopedPlugin } from './modes/vue-scoped'
import { SvelteScopedPlugin } from './modes/svelte-scoped'
import { ShadowDomModuleModePlugin } from './modes/shadow-dom'
import { ConfigHMRPlugin } from './config-hmr'
import type { VitePluginConfig } from './types'
import { transformCSSPlugin } from './transform/css'

export * from './types'
export * from './modes/chunk-build'
export * from './modes/global'
export * from './modes/per-module'
export * from './modes/vue-scoped'
export * from './modes/svelte-scoped'

export type { UnocssPluginContext } from '../../plugins-common'

export function defineConfig<Theme extends {}>(config: VitePluginConfig<Theme>) {
  return config
}

export default function UnocssPlugin(
  configOrPath?: VitePluginConfig | string,
  defaults: UserConfigDefaults = {},
): Plugin[] {
  const ctx = createContext<VitePluginConfig>(configOrPath, defaults)
  const inlineConfig = (configOrPath && typeof configOrPath !== 'string') ? configOrPath : {}
  const mode = inlineConfig.mode ?? 'global'
  const transformCSS = inlineConfig.transformCSS ?? false

  const plugins = [
    ConfigHMRPlugin(ctx),
  ]

  if (inlineConfig.inspector !== false)
    plugins.push(UnocssInspector(ctx))

  if (mode === 'per-module') {
    plugins.push(PerModuleModePlugin(ctx))
  }
  else if (mode === 'vue-scoped') {
    plugins.push(VueScopedPlugin(ctx))
  }
  else if (mode === 'svelte-scoped') {
    plugins.push(SvelteScopedPlugin(ctx))
  }
  else if (mode === 'shadow-dom') {
    plugins.push(ShadowDomModuleModePlugin(ctx))
  }
  else if (mode === 'global') {
    plugins.push(...GlobalModePlugin(ctx))
  }
  else if (mode === 'dist-chunk') {
    plugins.push(
      ChunkModeBuildPlugin(ctx),
      ...GlobalModeDevPlugin(ctx),
    )
  }
  else {
    throw new Error(`[unocss] unknown mode "${mode}"`)
  }

  // CSS transform
  if (transformCSS) {
    const cssPlugin = transformCSSPlugin(ctx)
    if (typeof transformCSS === 'string')
      cssPlugin.enforce = transformCSS

    plugins.push(cssPlugin)
  }

  return plugins.filter(Boolean) as Plugin[]
}
