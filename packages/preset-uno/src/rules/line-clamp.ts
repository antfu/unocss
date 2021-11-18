import { Rule } from '@unocss/core'

export const lineClamps: Rule[] = [
  [/^line-clamp-(\d+)$/, ([, v]) => ({
    'overflow': 'hidden',
    'display': '-webkit-box',
    'word-break': 'break-all',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': v,
    'line-clamp': v,
  })],
  ['line-clamp-none', {
    '-webkit-line-clamp': 'unset',
    'line-clamp': 'unset',
  }],
]
