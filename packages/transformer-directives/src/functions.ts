import type { FunctionNode, StringNode } from 'css-tree'
import type { TransformerDirectivesContext } from './types'
import { transformIconString, transformThemeString } from '@unocss/rule-utils'

export async function handleFunction({ code, uno, options }: TransformerDirectivesContext, node: FunctionNode) {
  const { throwOnMissing = true } = options

  switch (node.name) {
    case 'theme': {
      if (node.children.size !== 1)
        throw new Error('theme() expect exact one argument')

      const themeStr = (node.children.first as StringNode).value
      const value = transformThemeString(themeStr, uno.config.theme, throwOnMissing)
      if (value)
        code.overwrite(node.loc!.start.offset, node.loc!.end.offset, value)

      break
    }
    case 'icon': {
      const params = node.children.toArray().filter(i => i.type === 'String').map(i => (i as StringNode).value)

      if (params.length === 0)
        throw new Error('icon() expects at least one argument')

      // eslint-disable-next-line prefer-spread
      const value = await transformIconString.apply(null, [uno, ...params] as any)

      if (value)
        code.overwrite(node.loc!.start.offset, node.loc!.end.offset, value)

      break
    }
  }
}
