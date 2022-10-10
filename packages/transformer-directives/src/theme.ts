import type { UnoGenerator } from '@unocss/core'
import type { Declaration } from 'css-tree'
import type MagicString from 'magic-string'
import type { TransformerDirectivesOptions } from '.'

export const themeFnRE = /theme\((.*?)\)/g

export function handleThemeFn(options: TransformerDirectivesOptions, ctx: { code: MagicString; node: Declaration; uno: UnoGenerator }) {
  const { throwOnMissing = true } = options
  const { code, node, uno } = ctx

  const value = node.value
  const offset = value.loc!.start.offset
  const str = code.original.slice(offset, value.loc!.end.offset)
  const matches = Array.from(str.matchAll(themeFnRE))

  if (!matches.length)
    return

  for (const match of matches) {
    const rawArg = match[1].trim()
    if (!rawArg)
      throw new Error('theme() expect exact one argument, but got 0')

    let value: any = uno.config.theme
    const keys = rawArg.slice(1, -1).split('.')

    keys.every((key) => {
      if (value[key] != null)
        value = value[key]
      else if (value[+key] != null)
        value = value[+key]
      else
        return false
      return true
    })

    if (typeof value === 'string') {
      code.overwrite(
        offset + match.index!,
        offset + match.index! + match[0].length,
        value,
      )
    }
    else if (throwOnMissing) {
      throw new Error(`theme of "${rawArg.slice(1, -1)}" did not found`)
    }
  }
}
