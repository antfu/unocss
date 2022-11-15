import type { AstroIntegration } from 'astro'
import type { VitePluginConfig } from '@unocss/vite'
import VitePlugin from '@unocss/vite'
import type { UserConfigDefaults } from '@unocss/core'

export interface AstroIntegrationConfig<Theme extends {} = {}> extends VitePluginConfig<Theme> {
  /**
   * Include reset styles
   * When passing `true`, `@unocss/reset/tailwind.css` will be used
   * @default true
   * @deprecated use `injects` instead
   */
  injectReset?: string | boolean

  /**
   * Inject UnoCSS entry import for every astro page
   * @default true
   * @deprecated use `injects` instead
   */
  injectEntry?: boolean | string

  /**
   * Inject for every astro page, e.g., `['import "uno.css"']`
   * @default []
   */
  injects?: ReadonlyArray<string>
}

export default function UnoCSSAstroIntegration<Theme extends {}>(
  options: AstroIntegrationConfig<Theme> = {},
  defaults?: UserConfigDefaults,
): AstroIntegration {
  const {
    injectEntry = true,
    injectReset: includeReset = true,
    injects: rawInjects = [],
  } = options

  return {
    name: 'unocss',
    hooks: {
      'astro:config:setup': async ({ config, injectScript }) => {
        config.vite.plugins ||= []
        config.vite.plugins.push(...VitePlugin(options, defaults))

        const injects: string[] = []
        if (includeReset) {
          const resetPath = typeof includeReset === 'string'
            ? includeReset
            : '@unocss/reset/tailwind.css'
          injects.push(`import "${resetPath}"`)
        }
        if (injectEntry) {
          injects.push(typeof injectEntry === 'string'
            ? injectEntry
            : 'import "uno.css"')
        }
        if (rawInjects.length !== 0)
          injects.push(...rawInjects)
        if (injects?.length)
          injectScript('page-ssr', injects.join('\n'))
      },
    },
  }
}
