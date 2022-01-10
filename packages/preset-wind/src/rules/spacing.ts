import type { Rule } from '@unocss/core'
import { directionSize } from '@unocss/preset-mini/utils'

export const spaces: Rule[] = [
  [/^space-?([xyik])-?(-?.+)$/, (match) => {
    const [, direction] = match

    const results = directionSize('margin')(match)?.map((item) => {
      const value = item[0].endsWith('right') || item[0].endsWith('bottom')
        ? `calc(${item[1]} * var(--un-space-${direction}-reverse))`
        : `calc(${item[1]} * calc(1 - var(--un-space-${direction}-reverse)))`
      return [item[0], value] as typeof item
    })

    if (results) {
      return [
        [`--un-space-${direction}-reverse`, 0],
        ...results,
      ]
    }
  }],

  [/^space-?([xyik])-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
]
