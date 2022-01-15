import type { Rule } from '@unocss/core'
import { handler as h } from '../utils'

const variablesAbbrMap: Record<string, string> = {
  backface: 'backface-visibility',
  break: 'word-break',
  case: 'text-transform',
  content: 'align-content',
  items: 'align-items',
  justify: 'justify-content',
  select: 'user-select',
  self: 'align-self',
  vertical: 'vertical-align',
  visible: 'visibility',
  whitespace: 'white-space',
}

export const cssVariables: Rule[] = [
  [/^(.+)-\$(.+)$/, ([, name, varname]) => {
    const prop = variablesAbbrMap[name]
    if (prop)
      return { [prop]: `var(--${varname})` }
  }],
]

export const cssProperty: Rule[] = [
  [/^\[(.+):(.+)\]$/, ([, prop, value]) => ({ [prop]: h.bracket(`[${value}]`) })],
]
