import type { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import { defaultExclude, UnocssPluginContext } from '../../../plugins-common'

export function SveltePlugin({ uno, ready }: UnocssPluginContext): Plugin[] {
  let filter = createFilter([/\.svelte$/], defaultExclude)
  const classMatcher = /^\[class:(.+)=/
  const preprocess: (matcher: string) => string | undefined = (matcher) => {
    const match = matcher.match(classMatcher)
    // todo@userquin: this is not working!!!
    if (match)
      return match[1]

    return matcher
  }
  return [
    {
      name: 'unocss:svelte',
      enforce: 'pre',
      async configResolved() {
        const { config } = await ready
        filter = createFilter(
          config.include || [/\.svelte$/],
          config.exclude || defaultExclude,
        )
        if (!uno.config.preprocess)
          uno.config.preprocess = preprocess

        // todo@userquin: this is not working!!!
        uno.config.shortcuts = uno.config.shortcuts || []
        uno.config.shortcuts.push([/^class:(.+)$/, ([g, s], ctx) => {
          console.log(`class => ${g} => ${s} => ${ctx.rawSelector} => ${ctx.rawSelector === g}`)
          return ctx.rawSelector === g ? s : undefined
        }])

        uno.config.blocklist = uno.config.blocklist || []
        // remove global styles and attribute styles
        if (uno.config.blocklist.length === 0)
          uno.config.blocklist.push(/^\.\\!//*, /^\[/ */)
      },
      transform(code, id) {
        if (!filter(id))
          return

        return code.includes('@unocss-include')
          ? code
          : `<!-- @unocss-include -->
${code}`
      },
    },
  ]
}
